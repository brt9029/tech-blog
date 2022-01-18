const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Vote, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// DELETE a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
})

// CREATE a post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
<<<<<<< HEAD
        post_url: req.body.post_url,
=======
        post_body: req.body.post_body,
>>>>>>> 0d91b605a1456ced72fcf43cbc89782d12408204
        user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// PUT /api/posts/upvote
router.put('/upvote', withAuth, (req, res) => {
    // make sure the session exists first
    if (req.session) {
        // custom static method created in models/Post.js
        Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
          .then(updatedPostData => res.json(updatedPostData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }

});

// UPDATE post
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// GET a single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
<<<<<<< HEAD
            'post_url',
=======
            'post_body',
>>>>>>> 0d91b605a1456ced72fcf43cbc89782d12408204
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['Username']
                }
            },
            {
                model: User,
                attributes: ['Username']
            }
        ]
    })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
<<<<<<< HEAD
          res.json(dbPostData);
=======
          res.render('post');
>>>>>>> 0d91b605a1456ced72fcf43cbc89782d12408204
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// GET all posts
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
<<<<<<< HEAD
            'post_url',
=======
            'post_body',
>>>>>>> 0d91b605a1456ced72fcf43cbc89782d12408204
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;