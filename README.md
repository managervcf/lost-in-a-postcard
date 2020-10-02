## Lost in a Postcard

A photography portfolio site built with React on the front-end. It uses GraphQL and Apollo Client to communicate with the back-end. The server exposes a single GraphQL endpoint and it is built with Apollo Server, Mongoose and MongoDB. It features JWT authentication and uses the AWS S3 cloud storage.

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

## Production

To view the app in production, visit [lostinapostcard.herokuapp.com](https://lostinapostcard.herokuapp.com/).
