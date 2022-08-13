// Importamos los modelos y dependencias necesarias
const { Dog, Temperament, Op } = require('../db.js')
const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds'
const URL_Name = 'https://api.thedogapi.com/v1/breeds/search?q='

// Obtenemos los perros desde la API
const dogApi = async () => {
    try {
        const response = await axios.get(URL)
        const dogs = response.data?.map(doggo => {
            return {
                id: doggo.id,
                name: doggo.name,
                image: doggo.image.url,
                life_span: doggo.life_span,
                temperament: doggo.temperament,
                height: doggo.height.metric,
                weight: doggo.weight.metric,
            }
        })

        return dogs

    } catch (error) {
        console.error(error);
        throw new Error ("There's no Dogs to show in the API")
    }
}

// Obtenemos los perros desde la DB
const dogDB = async () => {
    try { 
        const response = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
            }
        })
        const dogs = response.data

        return dogs

    } catch (error) {
        console.error(error)
        throw new Error ("There's no Dogs to show in the DB")
    }
}

// Mandamos todos los perros
async function getAllDogs () {
    try {
        const apiDoggo = await dogApi()
        const dbDoggo = await dogDB()
        let doggos = [...apiDoggo, dbDoggo]

        return doggos

    } catch (error) {
        console.error(error)
        throw new Error ("There's no Dogs to show right now")
    }
}

// Buscamos perros por nombre
async function getDogByName (doggo) {
    try {
        const response = await axios.get(URL_Name+ doggo)
        const dog = response.data?.map(dg => {
            return {
                id: dg.id,
                name: dg.name,
                image: `https://cdn2.thedogapi.com/images/${dg.reference_image_id}.jpg`,
                life_span: dg.life_span,
                temperament: dg.temperament,
                height: dg.height.metric,
                weight: dg.weight.metric,
            }
        })
        return dog
    
    } catch (error) {
        console.error(error) 
        throw new Error ("There's no Dog with that name")
    }
}

// Buscamos perros por ID
async function getDogByID (doggo) {
    try {
        const apiDog = await dogApi();
        const dog = apiDog.filter(dg => dg.id == doggo)

        return dog

    } catch (error) {
        console.error(error)
        throw new Error ("There's no Dog with that ID")
    }
}

// Creamos una nueva raza
async function createDog (doggoData) {
        try {
            if(doggoData) {
                const { name, image, life_span, temperament, height, weight } = doggoData
                if( !name || !image || !life_span || !temperament || !height || !weight )
                    return res.status(404).send("There's incompleted data to register a new breed")
                let dogFound = await Dog.findOne({
                    where: {
                        name: name.toLowerCase()
                    }
                })
                if(dogFound) {
                    throw new Error ("This Dog Name alredy Exists, try another")
                }
                const newDog = await Dog.create({
                    name: name.toLowerCase(),
                    image: image,
                    life_span: life_span + ' years',
                    height: height,
                    weight: weight
                })

                const temperamentDB = await Temperament.findAll({
                    where: {
                        name: temperament
                    }
                })
                const dogTemp = await newDog.addTemperament(temperamentDB)
                const dogCreated = await Dog.findOne({
                    where: {
                        id: dogTemp[0].dataValues.dogId
                    },
                    include: {
                        model: Temperament,
                        attributes: ['name'],
                    }
                })
                return dogCreated
            }


        } catch (error) {
            console.error(error)
            throw new Error ("The new dog breed can't be created")
        }
}

module.exports = {
    getAllDogs,
    getDogByName,
    getDogByID,
    createDog
}