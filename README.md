[](https://supertokens.com/static/blog/52bcf5012e1602405cfceb568c17f1cb/isolated-alone.gif)

## Tenants Embedding Example

Simple container application that uses jwt to authenticate with a metabase instance with 2 controls in the header to allow you to create new users, or to log in as a user that already exists.

### Setup

On your Metabase instance:

1. Enable JWT auth, generate a JWT key and copy it to `JWT_TOKEN` in `server.js`
2. Generate an API key with admin rights and copy it to `API_KEY` in `server.js`
3. Go to Embedding -> Interactive Embedding -> configure. Enable Interactive Embedding, and add `http://localhost:4000` to `Authorized Origins`

### Running the Embedding App

To run the app, run `yarn start` in the terminal. If you don't have `yarn`, you should be able to use `npm install` and `node server.js`

### Updating the Embedding App Interface

This application has a dedicated BE to more closely mimic a customer setting up interactive embedding for their use case. The FE is built using vite. cd to `/frontend`, run `yarn` to install dependencies and use `vite build --watch` to have the FE build when you make changes. Note that there is no hot module reloading, so you'll need to refresh the page after changes are made.

Also if anyone actually looks at that code, don't judge me too harshly. This is very much a "function over form" project haha.
