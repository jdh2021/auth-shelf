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
  console.log('/shelf POST');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "item" ("description", "image_url", "user_id")
                      VALUES ($1, $2, $3);`;
    pool.query(queryText, [req.body.description, req.body.image_url, req.user.id]).then(() => {
      res.sendStatus(201);
    }).catch((e) => {
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});


/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  console.log('Id to delete is:', req.params.id);
  if (req.isAuthenticated()) {
    const queryText = `DELETE FROM "item" WHERE "id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [req.params.id, req.user.id]).then(() => {
      res.sendStatus(201);
    }).catch((e) => {
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});
  // endpoint functionality

module.exports = router;
