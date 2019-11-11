# Plaid Demo App

This app uses Plaid to display the recent categories a user has spent money on.

## Dependencies
* npm >= 5.6.0

## Quick Start

0. Modify `src/config/ConfigGlobal.ts` with your own Plaid credentials, and save it. Scroll down for an example of how this should look.
1. Run `npm i` from the root. 
2. You must disable CORS in your browser for the app to run. You can download a plugin from the chrome store, or (*recommended*) launch a temporary instance of chrome with CORS disabled. For Linux users, that command is `google-chrome --disable-web-security`. On OSX, it's `open -a Google\ Chrome --args --disable-web-security --user-data-dir`
3. `npm run start`
4. App should be running in your browser on `http://localhost:3000/`

## Project Organization
Here's a brief overview of how the project is organized:

* `Screens` - This is where our screens live.
* `Components` - This is used to separate our front-end components into more manageable chunks.
* `Services` - This contains all of our network requests.
* `Hooks` - This is where we house the reusable rendering logic for our components (e.g. displaying a signout button when a user is logged in)

## Sample Config File
```
export const PLAID_ENV = 'sandbox';
export const PLAID_CLIENT_ID = '402988902309832932903903209139';
export const PLAID_PUBLIC_KEY = '45785478290423498329430933109';
export const PLAID_SECRET = '324894285429822489023943298438923';
```
