const { Comment } = require("../models");

const commentData = [
    {
        comment_txt: "I loved reading your blog!",
        entry_id: 2,
        user_id: 3
    },
    {
        comment_txt: "Keep up the good work!",
        entry_id: 1,
        user_id: 3
    },
    {
        comment_txt: "What inspired you to write this blog?",
        entry_id: 2,
        user_id: 2
    },
    {
        comment_txt: "It looks like you have put a lot of effort arranging this. Well done!",
        entry_id: 1,
        user_id: 2
    },
    {
        comment_txt: "Great job!",
        entry_id: 2,
        user_id: 1
    },
    {
        comment_txt: "Fantastic!",
        entry_id: 1,
        user_id: 1
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;