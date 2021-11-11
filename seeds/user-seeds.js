const { User } = require('../models');

const userData = [
    {
        name: "John Doe",
        email: "johndoe@hotmail.com",
        password: "john1234"
    },
    {
        name: "Chuck Norris",
        email: "chucknorris@yahoo.com",
        password: "chuc4569"
    },
    {
        name: "Aishwarya Rai",
        email: "aishwaryarai@abc.com",
        password: "arai1234"
    },

];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers; 