let clientes = localStorage.getItem('clientes') != null ? JSON.parse(localStorage.getItem('clientes')) : [];
/*const guardar = async () => {
    let confirmacion = await successConfirmation('Registro guardado exitosamente')
    console.log(confirmacion.isConfirmed);
}*/
const guardar = () => {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let identificacion = document.getElementById('identificacion').value;
    if (nombre != "" && apellido != "" && identificacion != "") {
        let objeto = {
            nombre,
            apellido,
            identificacion,
            estado: true,
        }
        clientes.push(objeto);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        successConfirmation('Registro guardado exitosamente', 'clientes-lista.html');
    } else {
        danger('No puede guardar informacion vacía');
    }
}