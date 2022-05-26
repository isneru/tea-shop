## [Tea Shop](https://vast-garden-39328.herokuapp.com/)

- The main goal of this project is to code a mockup website for upcoming projects.
- It is also based around this "newborn" local tea shop at Porto, Portugal.

## Install dependencies

In your terminal after you clone your project down, remember to run either `yarn` or `npm install` to build all the dependencies in the project.

## Start the Project

In your terminal after you are done installing the dependencies run `npm install -g nodemon` > `nodemon app.js`

## Seeding the Database

If you want to seed the database, make sure you have mongoDB set up in your machine.
Run `mongod` in the terminal, then on the project folder you can run ./seeds/index.js by using the following command `node ./seeds/index.js`. After the 'Database connected' console log, you may exit the bash and get the server running again.

## Auth

If you want to add products yourself, create an user and, in the code with these paths:

1. `tea-shop/middleware.js`

![Before Changes](https://res.cloudinary.com/djmmemi6j/image/upload/v1653558635/Screenshot_2022-05-26_104747_oxxqhe.png)

Turn this ⬆️ into this ➡️
![After Changes](https://res.cloudinary.com/djmmemi6j/image/upload/v1653558635/Screenshot_2022-05-26_104828_tbqd2t.png)

---

2. `tea/views/partials/navbar.ejs`

![Before Changes](https://res.cloudinary.com/djmmemi6j/image/upload/v1653559193/Screenshot_2022-05-26_105804_vpystk.png)

Turn this ⬆️ into this ➡️
![After Changes](https://res.cloudinary.com/djmmemi6j/image/upload/v1653559193/Screenshot_2022-05-26_105925_h0wf9b.png)
