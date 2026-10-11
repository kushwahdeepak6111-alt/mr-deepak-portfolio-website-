export interface StudioLocationInfo {
  name: string;
  postOffice: string;
  subDistrict: string;
  district: string;
  state: string;
  country: string;
  pinCode: string;
  shortAddress: string;
  fullAddress: string;
  formattedAddress: string;
  mapsUrl: string;
  directionsUrl: string;
}

export const STUDIO_LOCATION: StudioLocationInfo = {
  name: 'Mr Deepak Web Studio HQ',
  postOffice: 'Post Office Jaitpura Madhi',
  subDistrict: 'Roun',
  district: 'Bhind',
  state: 'Madhya Pradesh',
  country: 'India',
  pinCode: '477335',
  shortAddress: 'Post Office Jaitpura Madhi, Roun, Bhind (M.P.) - 477335',
  fullAddress: 'Post Office Jaitpura Madhi, Roun, Bhind, Madhya Pradesh, PIN Code: 477335',
  formattedAddress: 'Post office jaitpura madhi roun bhind Madhya Pradesh pin code - 477335',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Post+Office+Jaitpura+Madhi+Roun+Bhind+Madhya+Pradesh+477335',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Post+Office+Jaitpura+Madhi+Roun+Bhind+Madhya+Pradesh+477335',
};

