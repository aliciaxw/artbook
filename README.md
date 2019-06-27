# Artbook

Artbook is a React app for sharing art with your friends in the form of a friendly competition. It was originally designed for a one month sketchbook challenge with the winner being the one who drew the most pages.

## Getting Started
Artbook uses the PostgreSQL database matching your user account name, which is set up as a part of installing PostgreSQL. Export the environment variable `DATABASE_URL=postgres://$(whoami)`. Artbook also uses Cloudinary as an image service, so create a Cloudinary cloud account and set environment variables `CLOUDINARY_UPLOAD_PRESET` to be an unsigned cloud preset and `CLOUDINARY_UPLOAD_URL` to be `http://api.cloudinary.com/v1_1/[CLOUD_NAME]/image/upload`. 

Clone this repo and install server dependencies with `npm install` in the main directory. Also `npm install` the dependencies in the `client` folder, which contains the React client. To start the server, run `npm start` in the main directory. To start the React app, run `npm start` in the `client` folder. If you're running this locally, make sure to comment out `ssl: true` in the pool initialization in `index.js`. 

