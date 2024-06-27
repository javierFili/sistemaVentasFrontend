let modal = document.getElementById('modal');
let instanciaModal = new bootstrap.Modal(modal);
let proveedores = localStorage.getItem('proveedores') != null ? JSON.parse(localStorage.getItem('proveedores')) : [];
let posicion = null;
const listar = () => {
    let tabla = document.querySelector('#tabla tbody');
    let filas = '';
    if (proveedores.length > 0) {
        proveedores.forEach((item, indice) => {
            filas += `<tr>
                            <td>${indice + 1}</td>
                            <td>${item.nombre}</td>
                            <td>${item.apellido}</td>
                            <td>${item.identificacion}</td>
                            <td>${item.contacto}</td>
                            <td><span class="badge bg-${item.estado ? 'success' : 'danger'}">${item.estado ? 'Activo' : 'Inactivo'}</span></td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-warning btn-sm" onclick="mostrar(${indice})"><i class="fas fa-pencil"></i></button>
                                    <button type="button" class="btn btn-${item.estado ? 'danger' : 'success'} btn-sm" onclick="estado(${indice})">${item.estado ? '<i class="fas fa-times"></i>' : '<i class="fas fa-check"></i>'}</button>
                                </div>
                            </td>
                        </tr>`
        });
    } else {
        filas += `<tr>
                    <td colspan="7" class="text-center"><span class="badge bg-danger"><i class="fas fa-times me-2"></i>Ningun registro encontrado</span></td>        
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
            proveedores[param].estado = !proveedores[param].estado;
            listar();
            localStorage.setItem('proveedores', JSON.stringify(proveedores));
        }
    });
}
const mostrar = param => {
    document.getElementById('nombre').value = proveedores[param].nombre;
    document.getElementById('apellido').value = proveedores[param].apellido;
    document.getElementById('identificacion').value = proveedores[param].identificacion;
    document.getElementById('contacto').value = proveedores[param].contacto;
    posicion = param;
    instanciaModal.show();
}
const editar = () => {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let identificacion = document.getElementById('identificacion').value;
    let contacto = document.getElementById('contacto').value;
    if (nombre != "" && apellido != "" && identificacion != "" && contacto != "") {
        proveedores[posicion].nombre = nombre;
        proveedores[posicion].apellido = apellido;
        proveedores[posicion].identificacion = identificacion;
        proveedores[posicion].contacto = contacto;
        localStorage.setItem('proveedores', JSON.stringify(proveedores));
        listar();
        cerrarModal();
        success('Registro modificado exitosamente');
    } else {
        danger('No puede enviar datos vacios.');
    }
}
