const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route Get api/items
// @desc Get All Items
// @access Public
// router.get('/', (req,  res) => {
//     Item.find()
//         .sort({date: -1})
//         .then(items => res.json(items));
// });

// @route Get api/items
// @desc Get All Items
// @access Public
router.post('/', auth, (req,  res) => {
    const { email } = req.body;
    Item.find( { email: email })
        .sort({date: -1})
        .then(items => res.json(items));
});

// @route POST api/items
// @desc Create a Item
// @access Private
router.post('/new', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        email: req.body.email
    });

    newItem.save().then(item => res.json(item));
});

// @route DELETE api/items
// @desc Delete a Item
// @access Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;