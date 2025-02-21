import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import basicAuth from 'express-basic-auth';

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Config basic Auth
app.use(basicAuth({
    users: { 'duacoders': 'duacoders' }, // Cambia 'password' por la contraseña que desees
    challenge: true
}));

// MongoDB init (In memmory for testing)
const mongo = await MongoMemoryServer.create();
const uri = mongo.getUri();
mongoose.connect(uri)
    .then(() => console.log('Connected to in-memory MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// BBDD Schema
const duacoderSchema = new mongoose.Schema({
    nif: { type: String, required: true },
    nombre: { type: String, required: true },
    biografia: String,
    departamento: String,
    puesto: String,
    skills: [String],
    foto: String,
    tortillaConCebolla: { type: Boolean, required: true },
    fechaNacimiento: Date
});

// MongoDB model for duacoders colection
const Duacoder = mongoose.model('Duacoder', duacoderSchema);

// API Route GET all duacorders
app.get('/duacoders', async (req, res) => {
    try {
        const duacoders = await Duacoder.find();
        res.send(duacoders);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API Route LIST by NIF with pagination
app.get('/duacoders/list', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const duacoders = await Duacoder.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        res.send(duacoders);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API Route GET by NIF
app.get('/duacoders/:nif', async (req, res) => {
    try {
        const duacoder = await Duacoder.findOne({ nif: req.params.nif });
        if (!duacoder) {
            return res.status(404).send('Duacoder not found');
        }
        res.send(duacoder);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API Route DELETE by NIF
app.delete('/duacoders/:nif', async (req, res) => {
    try {
        const duacoder = await Duacoder.findOneAndDelete({ nif: req.params.nif });
        if (!duacoder) {
            return res.status(404).send('Duacoder not found');
        }
        res.send(duacoder);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API Route CREATE
app.post('/duacoders', async (req, res) => {
    console.log(req.body);
    const { nif, nombre, biografia, departamento, puesto, skills, foto, tortillaConCebolla, fechaNacimiento } = req.body;

    const duacoder = new Duacoder({
        nif,
        nombre,
        biografia,
        departamento,
        puesto,
        skills,
        foto,
        tortillaConCebolla,
        fechaNacimiento
    });

    try {
        const result = await duacoder.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});