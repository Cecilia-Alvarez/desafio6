class ContenedorMensajes {
    constructor() {
        this.elementos = []
        this.id = 0
    }

    displayAll() {
        return [...this.elementos]
    }

    saveAll(elem) {
        const newElem = { ...elem, id: ++this.id }
        this.elementos.push(newElem)
        return newElem
    }
}

module.exports = ContenedorMensajes