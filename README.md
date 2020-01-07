## Lost in a Postcard

A photography portfolio site built with React on the front-end. It uses GraphQL and Apollo Client to communicate with the back-end. The server was built with Apollo Server, Mongoose and MongoDB. It features JWT authentication and takes advantage of an image hosting service called Cloudinary via its API.

## Development

Install dependencies using `npm i && npm i --prefix src/client`. This command will install both sever and client side dependencies.

To configure the app, create `.env` file in the root directory and provide:

`DATABASE_URL`, `JWT_SECRET`, `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`.

If you do not have a Cloudinary account, create one [here](https://cloudinary.com/).

To boot the app in the development mode, run script `npm run dev`.
Open [http://localhost:7000](http://localhost:7000) to view it in the browser.

## Production

The app has not been deployed yet.
