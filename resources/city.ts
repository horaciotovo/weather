type LocalNames = {
  [key: string]: string; // Allows for dynamic keys like 'fa', 'ko', 'en', etc.
};

type CityLocation = {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
};

export type CityData = CityLocation[];
