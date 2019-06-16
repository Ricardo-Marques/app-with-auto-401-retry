Proof of concept for an app that tracks http requests that resulted in a 401 status and automatically retries those requests when the user successfully logs in. Also trying to get acquainted with mobx.

Setup

1. `yarn install` / `npm install`
2. `yarn start` / `npm run start`

Once the application starts, it renders a list of 3 todos. It then starts fetching more todos using the http store, on a set interval.

If the "start failing requests" button is clicked, the http store will start rejecting all requests with a 401.

These failed requests get saved and automatically retried once a user logs in successfully (by using "ok" as the username).
This can be verified by waiting a few seconds before logging in and seeing the list expand with multiple items at once.
