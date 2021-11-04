const { Entry } = require("../models");

const entryData = [
    {
        title: "why MVC is so important",
        entry_text: "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
        user_id: 1,
    },
    {
        title: "Authentication vs. Authorization",
        entry_text: "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.",
        user_id: 2,
    },
    {
        title: "Object-Relational Mapping",
        entry_text: "I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!",
        user_id: 3,
    }
];

const seedEntries = () => Entry.bulkCreate(entryData);

module.exports = seedEntries; 