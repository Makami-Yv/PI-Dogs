// Importamos los modelos y dependencias necesarias
const { Temperament } = require('../db.js')
const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds'

// Obtenemos los temperamentos desde las razas de perros de la API
async function getAllTemperaments () {
    try {
        const response = await axios.get(URL)
        const temperaments = await response.data?.map(temp => temp.temperament)
        
        const allTemps = temperaments.join(',').split(',').sort()
        const newTemps = new Set(allTemps)
        
        newTemps.forEach(temp => {
            if(temp.length >= 1) {
                Temperament.findOrCreate({
                    where: {
                        name: temp.replace(' ', '')
                    }
                })
            } else null
        })
        
        const getTemperaments = await Temperament.findAll()
        return getTemperaments

    } catch (error) {
        console.error(error)
        throw new Error ("There's no temperaments to show")
    }
}

module.exports = {
    getAllTemperaments
}