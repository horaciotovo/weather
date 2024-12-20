# Testing Project

This project uses Playwright with TypeScript for API tests of the Weather API.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/Testing_Project.git
   cd Testing_Project
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Install Playwright:
   ```sh
   npx playwright install
   ```

## Running Tests

To execute the tests, run:

```sh
npm run test
```

## Test Coverage

This project covers:

- Data validation: Ensuring the data returned by the Weather API is accurate and meets the expected criteria.
- Data schemas: Verifying that the API responses conform to the predefined JSON schemas.

## Code Quality

This project integrates ESLint and Prettier for code quality and formatting.

To check for linting errors, run:

```sh
npm run lint
```

To format the code, run:

```sh
npm run format
```
