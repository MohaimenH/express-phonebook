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

app.get("/api/persons", (request, response) => {
    response.send(data);
});

app.get("/info", (request, response) => {
    response.send(
        `<p>Phonebook has info for ${data.length} people.</p>
        <p>${new Date()}</p>`
    );
});

const PORT = 3001;

app.listen(PORT);

console.log(`Now listening on PORT ${PORT}`);
