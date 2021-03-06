const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

//Middlewares

app.use(express.json());
app.use(cors());

morgan.token("content", (request) => {
    return request.method === "POST" ? JSON.stringify(request.body) : " ";
});

app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :content"
    )
);

app.use(express.static("build"));

// Data

let data = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

// GET Requests

// Info page
app.get("/info", (request, response) => {
    response.send(
        `<p>Phonebook has info for ${data.length} people.</p>
        <p>${new Date()}</p>`
    );
});

// Persons
app.get("/api/persons", (request, response) => {
    response.json(data);
});

app.get("/api/persons/:id", (request, response) => {
    let person = data.find((person) => person.id === Number(request.params.id));
    return person ? response.json(person) : response.status(404).end();
});

// POST Requests

app.post("/api/persons", (request, response) => {
    let body = request.body;

    if (!(body.name && body.number)) {
        return response.status(400).json({ error: "name or number missing" });
    }

    if (data.find((person) => person.name == body.name)) {
        return response.status(400).json({ error: "number already exists" });
    }

    let id = Math.floor(Math.random() * 999999999);
    data = data.concat({ id: id, name: body.name, number: body.number });
    response.status(201).json({ id: id, name: body.name, number: body.number });
});

// DELETE Requests

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    data = data.filter((person) => person.id !== id);
    response.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);

console.log(`Now listening on PORT ${PORT}`);
