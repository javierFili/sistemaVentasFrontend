let modal = document.getElementById('modal');
let instanciaModal = new bootstrap.Modal(modal);
let ventas = localStorage.getItem('ventas') != null ? JSON.parse(localStorage.getItem('ventas')) : [];
let clientes = localStorage.getItem('clientes') != null ? JSON.parse(localStorage.getItem('clientes')) : [];
let productos = localStorage.getItem('productos') != null ? JSON.parse(localStorage.getItem('productos')) : [];
const listar = () => {
    let tabla = document.querySelector('#tabla tbody');
    let filas = '';
    if (ventas.length > 0) {
        ventas.forEach((item, indice) => {
            filas += `<tr>
                        <td>${indice + 1}</td>
                        <td>${clientes[item.cliente].nombre} ${clientes[item.cliente].apellido}</td>
                        <td>${clientes[item.cliente].identificacion}</td>
                        <td>${item.total}</td>
                        <td><span class="badge bg-${item.estado ? 'success' : 'danger'}">${item.estado ? 'Activo' : 'Inactivo'}</span></td>
                        <td class="text-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-warning btn-sm" onclick="mostrar(${indice})"><i class="fas fa-list"></i></button>
                                <button type="button" class="btn btn-${item.estado ? 'danger' : 'success'} btn-sm" onclick="estado(${indice})">${item.estado ? '<i class="fas fa-times"></i>' : '<i class="fas fa-check"></i>'}</button>
                            </div>
                        </td>
                    </tr>`;
        });
    } else {
        filas += `<tr>
                    <td colspan="6" class="text-center"><span class="badge bg-danger"><i class="fas fa-times me-2"></i>Ningun registro encontrado</span></td>        
                </tr>`;
    }
    tabla.innerHTML = filas;
}
listar();
const cerrarModal = () => {
    instanciaModal.hide();
}
const estado = param => {
    Swal.fire({
        title: "¿Esta seguro?",
        text: "Está a punto de modificar el estado del registro!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, modificar",
        cancelButtonText: "No, cancelar"
    }).then(function (result) {
        if (result.isConfirmed) {
            ventas[param].estado = !ventas[param].estado;
            listar();
            localStorage.setItem('ventas', JSON.stringify(ventas));
        }
    });
}
const mostrar = param => {
    let tabla = document.querySelector('#tablaDetalle tbody');
    let fila = '';
    ventas[param].detalle.forEach(item => {
        fila += `<tr>
                    <td>${productos[item.producto].nombre}</td>
                    <td>${productos[item.producto].codigo}</td>
                    <td>${productos[item.producto].marca}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.precio_unitario}</td>
                    <td>${item.subtotal}</td>
                </tr>`;
    });
    document.getElementById('total').value = ventas[param].total;
    instanciaModal.show();
    tabla.innerHTML = fila;
}
