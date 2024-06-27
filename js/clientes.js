let modal = document.getElementById('modal');
let instanciaModal = new bootstrap.Modal(modal);
let clientes = localStorage.getItem('clientes') != null ? JSON.parse(localStorage.getItem('clientes')) : [];
let posicion = null;
const listar = () => {
    let tabla = document.querySelector('#tabla tbody');
    let filas = '';
    if (clientes.length > 0) {
        clientes.forEach((item, indice) => {
            filas += `<tr>
                            <td>${indice + 1}</td>
                            <td>${item.nombre}</td>
                            <td>${item.apellido}</td>
                            <td>${item.identificacion}</td>
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
            clientes[param].estado = !clientes[param].estado;
            listar();
            localStorage.setItem('clientes', JSON.stringify(clientes));
        }
    });
}
const mostrar = param => {
    document.getElementById('nombre').value = clientes[param].nombre;
    document.getElementById('apellido').value = clientes[param].apellido;
    document.getElementById('identificacion').value = clientes[param].identificacion;
    posicion = param;
    instanciaModal.show();
}
const editar = () => {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let identificacion = document.getElementById('identificacion').value;
    if (nombre != "" && apellido != "" && identificacion != "") {
        clientes[posicion].nombre = nombre;
        clientes[posicion].apellido = apellido;
        clientes[posicion].identificacion = identificacion;
        localStorage.setItem('clientes', JSON.stringify(clientes));
        listar();
        cerrarModal();
        success('Registro modificado exitosamente');
    } else {
        danger('No puede enviar datos vacios.');
    }
}


/*let compras = [
    {
        proveedor: 0, //registramos posicion del proveedor
        total: 1050,    //suma total
        estado: true,
        detalle: [
            {
                producto: 0,    //registramos la posicion del producto
                cantidad: 5,    
                precio_unitario: 10,
                subtotal: 50,
            },
            {
                producto: 2,
                cantidad: 1,
                precio_unitario: 1000,
                subtotal: 1000,
            }
        ]
    },
    {
        proveedor: 2,
        total: 250,
        estado: true,
        detalle: [
            {
                producto: 1,
                cantidad: 5,
                precio_unitario: 50,
                subtotal: 250,
            }
        ]
    }
]*/