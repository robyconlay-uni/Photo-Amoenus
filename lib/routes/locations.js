const express = require('express');
const router = express.Router();

const LocationFunctions = require("../functions/locations");



router.get('/', LocationFunctions.locations_get_all);

router.get('/:id', LocationFunctions.locations_get_one);


router.post('/', LocationFunctions.locations_create_location);

router.delete('/', LocationFunctions.locations_delete_location);

module.exports = router;
