const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  console.log('user id', req.user.id);
  if(req.isAuthenticated()) {
    let queryText = `SELECT * FROM "item" WHERE "user_id" = $1;`;
    pool.query(queryText, [req.user.id]).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  } else {
    // if not logged in, send forbidden
    res.sendStatus(403);
  }
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  // endpoint functionality
});

/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
