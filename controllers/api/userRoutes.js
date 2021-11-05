const router = require("express").Router();
const { User, Entry, Comment } = require("../../models");
const session = require("express-session");
const withAuth = require("../../utils/auth");
const sequelizeStore = require("connect-session-sequelize")(session.Store);

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: "You've entered an incorrect email or password, please try again!" });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: "You've entered an incorrect email or password, please try again!" });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: "You are now logged in!" });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: [password] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Entry,
                attributes: ['title', 'entry_text', 'created_at']
            },
            {
                model: Comment,
                attributes: ['comment_text', 'user_id', 'comment_id', 'created_at'],
                include: {
                    model: Entry,
                    attributes: ['title']
                }
            }
        ]
    })
        .then(userData => {
            try {
                if (!userData) {
                    res.status(404).json({ message: 'Sorry! no User was found with this id' });
                    return;
                }
                res.json(userData);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;