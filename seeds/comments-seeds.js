const { Comment } = require("../models");

const commentData = [
    {
        comment_text: "I loved reading your blog!",
        entry_id: 2,
        user_id: 3
    },
    {
        comment_text: "Keep up the good work!",
        entry_id: 1,
        user_id: 3
    },
    {
        comment_text: "What inspired you to write this blog?",
        entry_id: 2,
        user_id: 2
    },
    {
        comment_text: "It looks like you have put a lot of effort arranging this. Well done!",
        entry_id: 1,
        user_id: 2
    },
    {
        comment_text: "Great job!",
        entry_id: 2,
        user_id: 1
    },
    {
        comment_text: "Fantastic!",
        entry_id: 1,
        user_id: 1
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;