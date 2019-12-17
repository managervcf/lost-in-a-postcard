## Lost in a Postcard

This project was built with React front-end. It utilizes GraphQL and Apollo Client to communicate with back-end. Advanced server wa built with Express, Mongoose and MongoDB. It takes advantage a third party image hosting service called Cloudinary via its API.

It is a photography portfolio featuring my own photographs.

## Development

Install dependencies using `npm i && npm i --prefix src/client`. This command will install both sever and client dependencies.

To configure app correctly, create `.env` file in root directory and provide:

`DATABASE_URL, JWT_SECRET, CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET`.

If you do not have Cloudinary account, create one [here](https://cloudinary.com/).

To boot the app in the development mode, run script `npm run dev`.
Open [http://localhost:7000](http://localhost:7000) to view it in the browser.

## Production

App has not been deployed yet.
