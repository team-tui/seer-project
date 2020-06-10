const router = require('express').Router();
const articleRoutes = require('./articles');
const path = require('path');

// API routes
router.use('/api/articles', articleRoutes);

// If no API routes are hit, send the React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;