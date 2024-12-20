import { test, expect } from "@playwright/test";
import { Locations } from "../utils/locations";
import { CityData } from "../resources/city";
import { Wheather } from "../utils/weatherRequests";
import { WeatherData } from "../resources/weather";

let locations: Locations;
let wheather: Wheather;
let weatherResponse: WeatherData;
let coordinates: CityData;

const cityTestData = [{ city: "New York", state: "NY", country: "US" }];

const coordTestData = [{ lon: "-74.006", lat: "40.7143" }];

test.describe("Weather Feature Tests - Response and Schema Validator", () => {
  for (const data of cityTestData) {
    test("Getting weather by city name", async ({ request }) => {
      locations = new Locations(request);
      wheather = new Wheather(request);

      coordinates = await locations.getCoordinates(
        data.city,
        data.state,
        data.country,
      );
      weatherResponse = await wheather.getWheatherByCity(
        data.city,
        data.country,
      );

      expect(weatherResponse.name).toBe(data.city);
      expect(weatherResponse.sys.country).toBe(data.country);
      expect(weatherResponse.coord.lat.toFixed(2)).toBe(
        coordinates[0].lat.toFixed(2),
      );
      expect(weatherResponse.coord.lon.toFixed(2)).toBe(
        coordinates[0].lon.toFixed(2),
      );
      console.log(
        `Weather in ${data.city}, ${data.state}, ${data.country} is ${weatherResponse.main.temp} but will feel like ${weatherResponse.main.feels_like}`,
      );
    });
  }

  for (const data of coordTestData) {
    test("Getting weather by longitude and latitude", async ({ request }) => {
      locations = new Locations(request);
      wheather = new Wheather(request);

      coordinates = await locations.getCoordinates("New York", "NY", "US");
      weatherResponse = await wheather.getWheatherByCoordinates(
        data.lat,
        data.lon,
      );

      expect(weatherResponse.name).toBe("New York");
      expect(weatherResponse.sys.country).toBe("US");
      expect(weatherResponse.coord.lat.toFixed(2)).toBe(
        coordinates[0].lat.toFixed(2),
      );
      expect(weatherResponse.coord.lon.toFixed(2)).toBe(
        coordinates[0].lon.toFixed(2),
      );
      console.log(
        `Weather in City with Coordinates ${data.lon}, ${data.lat} with name ${weatherResponse.name} is ${weatherResponse.main.temp} but will feel like ${weatherResponse.main.feels_like}`,
      );
    });
  }

  test.fail(
    "Getting weather by wrong longitude and latitude",
    {
      annotation: {
        type: "Negative-Test",
        description:
          "This test is expected that Fails due to its a negative scenario for this reasson is marked as Failed. On the Report Should be Passed due to Its the expected result, we are waiting that this test failed",
      },
      tag: "@NEGATIVE",
    },
    async ({ request }) => {
      locations = new Locations(request);
      wheather = new Wheather(request);
      const lat = "10.7143";
      const lon = "-14.006";
      coordinates = await locations.getCoordinates("New York", "NY", "US");
      weatherResponse = await wheather.getWheatherByCoordinates(lat, lon);

      expect(weatherResponse.name, `City is ${weatherResponse.name}`).toBe(
        "New York",
      );
      expect(weatherResponse.coord.lat.toFixed(2)).toBe(
        coordinates[0].lat.toFixed(2),
      );
      expect(weatherResponse.coord.lon.toFixed(2)).toBe(
        coordinates[0].lon.toFixed(2),
      );
      console.log(
        `Weather in City with Coordinates ${lon}, ${lat} with name ${weatherResponse.name} is ${weatherResponse.main.temp} but will feel like ${weatherResponse.main.feels_like}`,
      );
    },
  );
});
