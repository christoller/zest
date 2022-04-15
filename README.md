# React App with Express Backend

https://strawberry-surprise-11875.herokuapp.com/

This structure can be used to build a React front end with an ExpressJS back end and provides a way to work in development by running a React Dev Server along with the API backend, and also to run a unified back end/front end when pushed to Heroku. It also includes TypeScript for both client and server.

For more explanation, see [this](https://gist.github.com/imaginetheheadline/a51bbdc5b53e58fff472997166616452).

## For development

Auto install all dependencies for client and server:
```
npm install
```

Run a development server for React and an Express Back end with `nodemon` auto re-start and `ts-node`
```
npm run dev
```

Head to `localhost:3000` for development. The Express API runs on port 3001 and is proxied through the React App on port 3000. Any changes to server or client automatically update and reflect in the app with a page refresh. Make sure that the `"proxy"` property in the client `package.json` file is set to the local URL of your Express Backend.

## Production

You can mimic what Heroku will do in production by running the following.

Auto install all dependencies for client and server:
```
npm install
```

Build a production React App
```
npm build
```

Start a production server:
```
npm run start:local
```

Head to `localhost:3000`. Both the API and the built React front end are now running on the same server. No code gets auto-updated in this mode.

Note that the line `const port = process.env.PORT || (process.env.NODE_ENV === 'production' && 3000) || 3001;` is particularly important in `server/server.ts` as this will allow us to change the port in production to 3000, and run by default on 3001 for development mode. It basically says that if the PORT is set directly, we should use it; otherwise, if we're in production use port 3000. Otherwise, use port 3001.

## Check the Node version

This project uses `.nvmrc` to determine the node version for development and `package.json` for Heroku. You can run the following to install and use the version locally:

```
nvm install
nvm use
```

Heroku will use the version defined in `package.json` `"engines"` property. Make sure `.nvmrc` and `package.json` versions of Node match.