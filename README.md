# PlanIt

Authors: Luke Melton, Kelly Dangora, Dan Leibensperger, Chris Bevevino

# Description

This app allows users to review planets.

## Features

- Users can view reviews of planets.
- User can add a review for an existing planet.
- User can edit their review for an existing planet.
- User can add a new planet for review.
- User can upvote and/or downvote reviews.

## Technologies Used

- Javascript
- React.js
- Express.js
- Postgres
- Objection.js
- SQL

## License

This program is available as open source under the terms of the MIT License.


## Installation

For a copy of this repository please `Download ZIP` (found under the green `Code` button).

After unpacking the ZIP you can rename the folder/ directory for your new project.


## Usage

1. Install necessary dependencies with `yarn`:

   ```sh
   yarn install
   ```

2. In the root of the `server` folder, create a `.env` file to hold the session secret. This will allow Passport to keep track of the currently signed-in user in session. Include a SESSION_SECRET in the `.env`:

   ```env
   SESSION_SECRET="ff521741-6d5a-48d2-96a9-b95bbcf60bc4"
   ```

3. Create your base PostgreSQL database. Check the `server/src/config/getDatabaseUrl` file for the name of the `development` database. For example:

   ```sh
   createdb planIt_development
   ```

4. Run the included `users` table migration:

   ```sh
   cd server
   yarn migrate:latest
   ```

5. Start up the application, from the root folder:

   ```sh
   cd .. # if in the server folder

   yarn run dev
   ```

6. Navigate to <http://localhost:3000>. You should see the program running.
