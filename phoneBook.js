const express = require("express");
const app = express();

app.use(express.json());

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

const PORT = 3001;

app.listen(PORT);

console.log(`Now listening on PORT ${PORT}`);
