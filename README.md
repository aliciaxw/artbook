# Artbook

Artbook is a React app for sharing art with your friends in the form of a friendly competition. It was originally designed for a one month sketchbook challenge with the winner being the one who drew the most pages.

## Getting Started
Artbook uses the PostgreSQL database matching your user account name, which is set up as a part of installing PostgreSQL. Export the environment variable:

```
DATABASE_URL=postgres://$(whoami)
```

Artbook also uses Cloudinary as an image service, so create a Cloudinary cloud account and set environment variables


```
REACT_APP_CLOUDINARY_UPLOAD_PRESET=[unsigned cloud preset]
```
and
```
REACT_APP_CLOUDINARY_UPLOAD_URL=[API base url]
```

The preset key and API url can be found on your Cloudinary console.

Clone this repo and install server dependencies with `npm install` in the main directory. Also `npm install` the dependencies in the `client` folder, which contains the React client. To start the server, run `npm start` in the main directory. To start the React app, run `npm start` in the `client` folder.
