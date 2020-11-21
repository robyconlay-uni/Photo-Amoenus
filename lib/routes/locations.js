const express = require('express');
const router = express.Router();

const LocationFunctions = require("../functions/locations");



router.get('/', LocationFunctions.locations_get_all);

router.get('/:locationId', LocationFunctions.locations_get_one);


router.post('/', LocationFunctions.locations_create_location);

router.delete('/:locationId', LocationFunctions.locations_delete_location);

module.exports = router;
