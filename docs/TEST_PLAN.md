Nowadays the AI is impacting in all areas of the development cycle, quality is not the exception, so I used ChatGPT to create the Test Cases Documentation, a task that would take a lot of time that I can invest to be more efficient in my daily work.

As we know, AI is a helper, but it is not 100% accurate. So, taking the input of ChatGPT, I can design my own Test Plan with the following Test Cases:

## Selected Test Cases:

- **Test Case 1**: Verify API Key Requirement
- **Test Case 2**: Validate Response for a Valid API Key
- **Test Case 4**: Validate Mandatory Parameters
- **Test Case 5**: Validate Data Accuracy for Known Location
- **Test Case 6**: Test Data Exclusions
- **Test Case 11**: Validate Negative Scenarios

The other test cases are combinations that, in my point of view, do not have enough priority or are included in other tests.  
Regarding **Test Case 12: Validate Performance**, it is not a functional test. I would skip it because, in order to be able to run this kind of test, we need to identify user requirements, define baselines, deploy a prod-like environment, develop performance scripts, and perform other tasks that are not part of this scope.

---

# Bugs and Release Criteria

## Bugs Classification

### Critical Bugs

- **Severity 1**: Bugs that block the expected behavior.
  - **Example**: Entering a negative value outside the range on the Longitude attribute causes the service to crash.
- **Severity 2**: Bugs that break the functionality but the system can recover.
  - **Example**: Entering a negative value inside the range on the Longitude attribute causes the service to return an HTTP ERROR 500.

### Medium Bugs

- **Severity 3**: Bugs that do not affect the main functionality.

### Lower Bugs

- **Severity 4 and 5**: Cosmetic bugs or enhancements.

---

## Release Criteria

- **Production deploy**: Can only be performed without bugs of Severity 1 and 2.
- **Automation Tests**: Must run and pass with a 100% pass/fail ratio.
- **User Acceptance Testing (UAT)**: Should be conducted.

---

## CI/CD and Frameworks

### Framework Recommendation

Currently, there are many frameworks in the market to choose from, but the correct framework depends on the project's needs. For automating this API, a Postman collection should be sufficient. However, if we are part of the company developing this API, I would recommend using:

- **Playwright with TypeScript**

**Reasons**:

1. Playwright is capable of API Testing and supports mocking data, enabling the emulation and creation of specific data for edge cases.
2. Playwright offers browser support, which allows for integrated testing if we decide to implement front-end features in the future.

---

### CI/CD Pipeline Design

#### Non-Production Environment

- A pipeline in GitHub Actions should run each time a developer performs a commit to a non-production environment.
- This pipeline will:

  - Execute the entire test suite.
  - Clean the data created during the execution.

- **If a non-production environment is unavailable**: The pipeline can deploy a Docker container running the backend services and the test suite.

#### Production Deploy

- In each production deployment, a subset of test cases (smoke tests) should be executed:
  - **Test Case 4**: Validate Mandatory Parameters
  - **Test Case 11**: Validate Negative Scenarios
- These test cases should not create data since they run in a production environment and are intended to confirm the deployment was successful.

---

# Test Cases Documentation:

## Test Case 1: Verify API Key Requirement

- **Test Objective**: Ensure that the API returns an appropriate error when an API key is missing.
- **Preconditions**: None
- **Steps**:
  1. Send a request to the One Call API 3.0 endpoint without an API key.
- **Expected Result**: The API should return an error message indicating that the API key is required (e.g., HTTP 401 Unauthorized).

---

## Test Case 2: Validate Response for a Valid API Key

- **Test Objective**: Verify that the API returns weather data when a valid API key is provided.
- **Preconditions**: A valid API key.
- **Steps**:
  1. Send a request to the API with a valid API key and valid latitude and longitude parameters.
- **Expected Result**: The API should return a 200 OK status with valid weather data in JSON format.

---

## Test Case 3: Test Response for Invalid API Key

- **Test Objective**: Ensure the API handles invalid API keys correctly.
- **Preconditions**: An invalid API key.
- **Steps**:
  1. Send a request to the API with an invalid API key.
- **Expected Result**: The API should return an error message (e.g., HTTP 401 Unauthorized).

---

## Test Case 4: Validate Mandatory Parameters

- **Test Objective**: Verify that the API enforces mandatory parameters (e.g., `lat`, `lon`).
- **Preconditions**: A valid API key.
- **Steps**:
  1. Send a request with the API key but omit the `lat` and/or `lon` parameters.
- **Expected Result**: The API should return an error indicating missing mandatory parameters.

---

## Test Case 5: Validate Data Accuracy for Known Location

- **Test Objective**: Ensure the API returns accurate weather data for a known location.
- **Preconditions**: A valid API key and known latitude/longitude coordinates.
- **Steps**:
  1. Send a request to the API with the coordinates of a known city (e.g., `lat=37.7749`, `lon=-122.4194` for San Francisco).
- **Expected Result**: The API should return weather data matching the current conditions for the specified location.

---

## Test Case 6: Test Data Exclusions

- **Test Objective**: Verify the functionality of the `exclude` parameter.
- **Preconditions**: A valid API key.
- **Steps**:
  1. Send a request with the `exclude` parameter (e.g., `exclude=minutely,hourly`).
- **Expected Result**: The API response should exclude the specified sections of the weather data.

---

## Test Case 11: Validate Negative Scenarios

- **Test Objective**: Test API behavior with invalid input parameters.
- **Preconditions**: A valid API key.
- **Steps**:
  1. Send requests with invalid latitude and longitude values (e.g., `lat=9999`, `lon=-9999`).
  2. Send requests with an invalid `dt` parameter for historical data.
- **Expected Result**: The API should return appropriate error messages.
