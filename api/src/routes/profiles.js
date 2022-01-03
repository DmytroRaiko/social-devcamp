const router = require('express').Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
  res.send(await db.select().from('profile'));
});

module.exports = router;
