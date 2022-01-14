# TYPESCRIPT BASE PROJECT WITH MONGOOSE AND MOCHA TESTS

This is a basic Typescript project configuration with mongoose and Mocha tests.

## USAGE 

1. Clone the repository on your machine.
2. Open a terminal and move to the root of the project in the folder created by cloning repository.
3. In the terminal, type "npm i" and press enter (you have to get [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [nodejs](https://nodejs.org/en/download/) installed).
3. In the terminal, type "npm run test" and press enter for launching mocha test or "npm run build" to create a dist folder containing the javascript native code.
4. Be shure to have [mongodb](https://www.mongodb.com/) installed on your local machine and accessible.


## TEST NOTES

Mongoose reset the database before launching all tests.
It should drop all the collections and indexes in the index.data.spec.ts to avoid problems with indexes.

## EXAMPLE

You can find an example of using and testing mongodb in example.data.ts and example.data.spec.ts.