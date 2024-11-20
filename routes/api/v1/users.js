const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/api/v1/users');

/* api/v1/users */
router.get("/", usersController.getAll);

router.post("/", usersController.create);



//router.get("/:id", usersController.update);
router.put('/:id', usersController.update);

// router.passwordUpdate("/:id", usersController.passwordUpdate);
router.patch('/:id/password', usersController.passwordUpdate);

module.exports = router;
