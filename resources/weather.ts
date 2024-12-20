export type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number; // Optional as not always present
    grnd_level?: number; // Optional as not always present
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number; // Optional as not always present
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number; // Optional as not always present
    id?: number; // Optional as not always present
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
