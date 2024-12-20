import { APIRequestContext, expect } from "@playwright/test";
import { Env } from "./environment";
import { WeatherData } from "../resources/weather";
import { validateSchema } from "./schemaValidations";
import weatherSchema from "../schemas/weatherSchema";

export class Wheather {
  private apiKey: string;
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.apiKey = Env.API_KEY;
    this.requestContext = requestContext;
  }

  async getWheatherByCity(city: string, state: string): Promise<WeatherData> {
    const url = `${Env.BASE_URL}${Env.WEATHER_PATH}q=${city},${state}&appid=${this.apiKey}`;
    const response = await this.requestContext.get(url);
    expect(
      response.status(),
      `Expected status 200 but got ${response.status()} ${await response.body()}`,
    ).toBe(200);
    await validateSchema(response, weatherSchema);
    return (await response.json()) as WeatherData;
  }

  async getWheatherByCoordinates(
    lat: string,
    lon: string,
  ): Promise<WeatherData> {
    const url = `${Env.BASE_URL}${Env.WEATHER_PATH}lat=${lat}&lon=${lon}&&appid=${this.apiKey}`;
    const response = await this.requestContext.get(url);
    expect(
      response.status(),
      `Expected status 200 but got ${response.status()} ${await response.body()}`,
    ).toBe(200);
    await validateSchema(response, weatherSchema);
    return (await response.json()) as WeatherData;
  }
}
