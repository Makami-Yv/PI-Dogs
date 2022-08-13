// Importamos los controllers y dependencias necesarias
const { Router, response } = require("express");
const { getAllDogs, 
        getDogByName, 
        getDogByID,
        createDog 
    } = require ('../controllers/dogsController')

const dogRouter = Router();

// Configuramos los Routers
    // GET
    dogRouter.get('/', async (req, res) => {
        try {
            const { name } = req.query;
            if(!name) {
                const response = await getAllDogs();
                return res.status(200).send(response)
            } else {
                const response = await getDogByName(name);
                if (response) {
                    return res.status(200).send(response)
                }
            }

        } catch (error) {
            console.error(error)
            throw new Error ("There's no Dogs to show now")
        }
    });

    dogRouter.get('/:id', async (req, res) => {
        try {
            const { id } = req.params
            const response = await getDogByID(id);
            return res.status(200).send(response)

        } catch (error) {
            console.error(error)
            throw new Error ("There's no Dog to show with this ID")
        }
    })

    // POST
    dogRouter.post('/create', async (req, res) => {
        try {
            const doggoData = req.body
            if(doggoData) {
                const dogPost = await createDog(doggoData)
                if(dogPost) {
                    return res.status(200).json(dogPost)
                }
            }

        } catch (error) {
            console.error(error) 
            throw new Error ("The new Dog breed can't be created")
        }
    })

module.exports = dogRouter;