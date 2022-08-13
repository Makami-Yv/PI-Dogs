// Importamos los controllers y dependencias necesarias
const { Router } = require("express");
const {
    getAllTemperaments
} = require ('../controllers/temperamentController')

const temperamentRouter = Router();

//Configuramos los Routers

    //GET
    temperamentRouter.get('/', async (req, res) => {
        try {
            const response = await getAllTemperaments()
            return res.status(200).send(response)

        } catch(error) {
            console.error(error)
            throw new Error("There's no Temperaments to show right now")
        }
    })

module.exports = temperamentRouter;