import { APIRequestContext, expect } from "@playwright/test";
import { Env } from "./environment";
import { CityData } from "../resources/city";

export class Locations {
  private apiKey: string;
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.apiKey = Env.API_KEY;
    this.requestContext = requestContext;
  }

  async getCoordinates(
    city: string,
    state: string,
    country: string,
    limit: number = 1,
  ): Promise<CityData> {
    const url = `${Env.BASE_URL}${Env.LOCATION_PATH}q=${city},${state},${country}&limit=${limit}&appid=${this.apiKey}`;
    const response = await this.requestContext.get(url);
    await expect(
      response.status(),
      `Expected status 200 but got ${response.status()} ${await response.body()}`,
    ).toBe(200);
    return (await response.json()) as CityData;
  }
}
