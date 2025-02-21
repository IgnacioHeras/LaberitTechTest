# Technical test for LABERIT
This consists in a test for Laberit. Here i have created an API with a MongoDB secured by basic auth, i will show you how to instal this to be able to test it in your own.

# Installation
## 1 Download the code
You should git clone https://github.com/IgnacioHeras/LaberitTechTest
Then follow these steps
```bash
cd LaberitTechTest
npm install
```
In case you get any errors from modules not found or something similar, you should do
```bash
npm i mongoose express mongodb-memory-server express-basic-auth
```
Now just run it!
```bash
node .\index.js
```
## 2 Test API

You need to CURL the API to TEST it, as its Database (MongoDB) its created on memory it will flush completely every time you run a new instance of the project, please be aware of this.

Example Request you can do:

### Create a Duacoder
```bash
curl -X POST http://localhost:3000/duacoders \
-H "Content-Type: application/json" \
-d '{
    "nif": "0000",
    "nombre": "Nacho",
    "biografia": "esto es una biografía",
    "departamento": "Desarrollo",
    "puesto": "Desarrollador FullStack",
    "skills": ["Node", "API"],
    "foto": "imagen",
    "tortillaConCebolla": true,
    "fechaNacimiento": 22071997
}'
```

### GET All Duacoders
```bash
curl -X GET http://localhost:3000/duacoders
```

### Get a Duacoder by NIF
0000 can be overwritten with the NIF you want
```bash
curl -X GET http://localhost:3000/duacoders/0000
```

### List All Duacoders with Pagination
```bash
curl -X GET "http://localhost:3000/duacoders/list"
```

### Delete a duacoder
0000 can be overwritten with the NIF you want
```bash
curl -X DELETE http://localhost:3000/duacoders/0000
```