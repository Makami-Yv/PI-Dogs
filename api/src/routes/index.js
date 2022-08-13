const { Router } = require('express');

// Importar todos los routers
const dogRouter = require('./dogsRoutes')
const temperamentRouter = require('./temperamentRoutes')

const router = Router();

// Configurar los routers
router.use('/dogs', dogRouter)
router.use('/temperaments', temperamentRouter)

module.exports = router;
