const { promises: fs } = require('fs')

class ContenedorProductos {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async displayAll() {
        try {
            const objects = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objects)
        } catch (error) {
            return []
        }
    }

    async saveAll(object) {
        const objects = await this.displayAll()

        let newId
        if (objects.length == 0) {
            newId = 1
        } else {
            newId = objects[objects.length - 1].id + 1
        }

        const newObject = { ...object, id: newId }
        objects.push(newObject)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objects, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
}

module.exports = ContenedorProductos