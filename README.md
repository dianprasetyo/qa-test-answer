# qa-test-answer

i'm using wdio,javascript and mocha framework for this api automation task.

## Pre-requisite

-   must have node.js installed on your computer, min version for this repo is v18.7.0
-   confirm the node.js version

```bash
node -v
```

-   follow the instruction in https://nodejs.org/en/download if there is no node.js installed
-   if node.js is already installed then we can continue to install the dependencies, run this on terminal (mac)/ command prompt (win)

```bash
npm install
```

## How to run the test

```bash
npm run wdio
```

## Test structure

-   test case can be found in test/spec folder.
-   user credential is stored in .env file

#### Test result

-   The test to remove the country from the list has failed as it returned a status code 500. I have already tried executing the test manually on localhost:8080 swagger web, and it produced the same result.
