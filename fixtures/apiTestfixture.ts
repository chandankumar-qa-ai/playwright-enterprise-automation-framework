import { APIRequestContext, request as playwrightRequest, test as base } from '@playwright/test';

export type Fixtures = {
  apiRequest: APIRequestContext;
};

export const test = base.extend<Fixtures>({
  // Playwright requires the first fixture argument to use object destructuring.
  // eslint-disable-next-line no-empty-pattern
  apiRequest: async ({}, use) => {
    const apiRequest = await playwrightRequest.newContext({
      baseURL: 'https://restful-booker.herokuapp.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
    await use(apiRequest);
    await apiRequest.dispose();
  },
});


