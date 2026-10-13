// Client-side Push, Sound & Mobile Notification Utility for Mr Deepak Web Studio
// Notifies Mr Deepak on mobile & browser immediately upon lead submission or database changes

export interface NotificationSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  pushEnabled: boolean;
  whatsappAutoAlert: boolean;
  adminPhone: string;
}

const SETTINGS_KEY = 'mrdeepak_notification_settings';
export const DEFAULT_ADMIN_PHONE = '+919343795715';
export const DEFAULT_ADMIN_WHATSAPP = '919343795715';

export function getNotificationSettings(): NotificationSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      return {
        soundEnabled: true,
        vibrationEnabled: true,
        pushEnabled: true,
        whatsappAutoAlert: true,
        adminPhone: DEFAULT_ADMIN_PHONE,
        ...JSON.parse(raw),
      };
    }
  } catch (e) {
    console.warn('Failed to parse notification settings:', e);
  }
  return {
    soundEnabled: true,
    vibrationEnabled: true,
    pushEnabled: true,
    whatsappAutoAlert: true,
    adminPhone: DEFAULT_ADMIN_PHONE,
  };
}

export function saveNotificationSettings(settings: NotificationSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save notification settings:', e);
  }
}

// Synthesize pleasant mobile alert chime using Web Audio API (zero external asset dependency)
export function playChimeSound() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Create sequence of soft luxury notification chimes (C6 -> E6 -> G6)
    const notes = [1046.5, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.36);
    });
  } catch (err) {
    console.warn('Web Audio playback failed or blocked:', err);
  }
}

// Request Notification Permission from Browser / Phone
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }
  try {
    const perm = await Notification.requestPermission();
    return perm;
  } catch (err) {
    console.warn('Notification permission error:', err);
    return Notification.permission;
  }
}

// Trigger Mobile & Browser notification for a new lead
export async function triggerLeadMobileAlert(lead: {
  name: string;
  phone?: string;
  email: string;
  projectType?: string;
  budget?: string;
  message?: string;
}): Promise<boolean> {
  const settings = getNotificationSettings();

  // 1. Play auditory alert chime
  if (settings.soundEnabled) {
    playChimeSound();
  }

  // 2. Hardware vibration on supported mobile devices
  if (settings.vibrationEnabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      // Vibrate pattern: pulse, pause, pulse (classic incoming message haptic)
      navigator.vibrate([200, 100, 200, 100, 300]);
    } catch (e) {
      // vibration silently ignored on non-supporting devices
    }
  }

  // 3. System Push Notification on Mobile / Desktop
  if (settings.pushEnabled && 'Notification' in window && Notification.permission === 'granted') {
    try {
      const title = `🔔 New Inbound Lead: ${lead.name}`;
      const body = `📱 ${lead.phone || 'No phone'} | 💼 ${lead.projectType || 'Project'}\n💰 Budget: ${lead.budget || 'Flexible'}\n✉️ ${lead.email}`;

      // Try Service Worker registration showNotification first (best for Android/mobile push)
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        const reg = await navigator.serviceWorker.ready;
        await reg.showNotification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: 'new-lead-' + Date.now(),
          vibrate: [200, 100, 200],
          data: {
            url: '/admin',
            lead,
          },
        } as any);
      } else {
        // Fallback to standard web Notification
        new Notification(title, {
          body,
          icon: '/favicon.ico',
        });
      }
    } catch (err) {
      console.warn('Error triggering system notification:', err);
    }
  }

  return true;
}

// Generate instant WhatsApp direct lead alert link for Mr Deepak's phone
export function createWhatsAppLeadAlertUrl(lead: {
  name: string;
  phone?: string;
  email: string;
  projectType?: string;
  budget?: string;
  message?: string;
}): string {
  const text = `🔔 *NEW CLIENT INQUIRY SAVED TO SUPABASE*\n\n` +
    `👤 *Client Name:* ${lead.name}\n` +
    `📞 *Client Phone:* ${lead.phone || 'N/A'}\n` +
    `✉️ *Client Email:* ${lead.email}\n` +
    `💼 *Project Type:* ${lead.projectType || 'General Inquiries'}\n` +
    `💰 *Estimated Budget:* ${lead.budget || 'Flexible'}\n` +
    `📝 *Project Brief:* ${lead.message || 'No description'}\n\n` +
    `⚡ *Database Status:* Synced to Supabase DB & Admin Portal`;

  return `https://wa.me/${DEFAULT_ADMIN_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

// Generate direct SMS alert link
export function createSmsLeadAlertUrl(lead: {
  name: string;
  phone?: string;
  email: string;
  projectType?: string;
  budget?: string;
}): string {
  const body = `[Mr Deepak Studio] New Lead: ${lead.name} (${lead.phone || lead.email}). Project: ${lead.projectType || 'Web'}. Budget: ${lead.budget || 'Flexible'}`;
  return `sms:${DEFAULT_ADMIN_PHONE}?body=${encodeURIComponent(body)}`;
}
