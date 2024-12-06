const express = require('express');
const bodyParser = require('body-parser');
const { filterDrivers } = require('./service/filter_drivers');
const { authenticate } = require('./utils/auth');
const { buildResponse } = require('./utils/util');

const router = express.Router();
router.use(bodyParser.json());

// Añadir autenticación a la ruta del marketplace
router.post('/filter-drivers', authenticate, async (req, res) => {
    const filters = req.body;
    try {
        const drivers = await filterDrivers(filters);
        res.status(200).json(buildResponse(200, { response: drivers }));
    } catch (error) {
        res.status(500).json(buildResponse(500, { message: 'Error procesando la solicitud', error: error.message }));
    }
});

module.exports = router;
