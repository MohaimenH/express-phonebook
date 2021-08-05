const express = require("express");
const app = express();

app.use(express.json());

// Data

const data = [
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

    person ? response.json(person) : response.status(404).end();
});

const PORT = 3001;

app.listen(PORT);

console.log(`Now listening on PORT ${PORT}`);
