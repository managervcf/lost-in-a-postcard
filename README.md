## Lost in a Postcard

A photography portfolio site built with React on the front-end. It uses GraphQL and Apollo Client to communicate with the back-end. The server is built with Apollo Server, Mongoose and MongoDB and exposes a single GraphQL endpoint. It features JWT authentication and uses the AWS S3 cloud storage.

## Development

Install dependencies using `npm i && npm i --prefix src/client`. This command will install both sever and client side dependencies.

To run the app, create `.env` file in the root directory and provide:

```
PORT
DATABASE_URL
JWT_SECRET
ADMIN_PASSWORD=<random_string>
S3_ACCESS_KEY_ID
S3_SECRET_ACCESS_KEY
S3_BUCKET_NAME
S3_FOLDER_NAME=<random_string>
```

To boot the app in the development mode, run `npm run dev`.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Test

The app uses `jest` and `puppeteer` to perfom integration tests in order to make sure all the separate parts of the app are working nicely with each other. To run tests in your development environment, run `npm run test` script.

## Continuous Integration

The app uses the `Travis CI` as the CI provider. The script responsible for testing is `npm run test:ci`.

## Production

To view the app in production, visit [lostinapostcard.herokuapp.com](https://lostinapostcard.herokuapp.com/).
