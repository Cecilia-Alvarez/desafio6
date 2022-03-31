const socket = io.connect();

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: formAgregarProducto[0].value,
        author:formAgregarProducto[1].value,
        price: formAgregarProducto[2].value,
    }
    socket.emit('update', producto);
    formAgregarProducto.reset()
})

socket.on('productos', productos => {
    displayTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function displayTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = { autor: inputUsername.value, texto: inputMensaje.value }
    socket.emit('nuevoMensaje', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', mensajes => {
    console.log(mensajes);
    const html = renderMessages(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function renderMessages(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div>
                <b style="color:red;">${mensaje.autor}</b>
                [<span style="color:blue;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const correoElectronico = inputUsername.value.length
    const textoMensaje = inputMensaje.value.length
    inputMensaje.disabled = !correoElectronico
    btnEnviar.disabled = !correoElectronico || !textoMensaje
})

inputMensaje.addEventListener('input', () => {
    const textoMensaje = inputMensaje.value.length
    btnEnviar.disabled = !textoMensaje
})
