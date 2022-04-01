const { promises: fs } = require('fs')

class ContenedorProductos {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async displayAll() {
        try {
            const products = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(products)
        } catch (error) {
            console.log("No se pudo leer el archivo.");
        }
    }

    async saveAll(product) {
        const products = await this.displayAll()

        let newId
        if (products.length == 0) {
            newId = 1
        } else {
            newId = products[products.length - 1].id + 1
        }

        const newProduct = { ...product, id: newId }
        products.push(newProduct)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(products, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
}

module.exports = ContenedorProductos