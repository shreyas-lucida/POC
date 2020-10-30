# Agl - Master

## Repo Structure

The repo has both backend code for Alg Front End.

## How to run

After pulling the repository follow these steps in order to run the solution end-to-end.


### Run backend (API endpoints)

Goto project root folder and run the following commands:

    $ npm install
    $ tsc
    $ cd dist
    $ node server.js

### To run backend in debug mode

Step 1: Open server.ts
Step 2: Goto Debug (Ctrl+Shift+D) mode in Visual Studio Code  
Step 3: Click on Start Debugging button (Play button at the top of explorer window)  
Step 4: Put break points in your code and wait (optional)


## To create a migration script
node node_modules\db-migrate\bin\db-migrate create <table_name>

## To run migration scripts
node node_modules\db-migrate\bin\db-migrate up

## To run perticualr migration scripts
node node_modules\db-migrate\bin\db-migrate <file_name>