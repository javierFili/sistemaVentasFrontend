let productos = localStorage.getItem('productos') != null ? JSON.parse(localStorage.getItem('productos')) : [];
let carritoCompra = localStorage.getItem('carritoCompra') != null ? JSON.parse(localStorage.getItem('carritoCompra')) : [];
let compras = localStorage.getItem('compras') != null ? JSON.parse(localStorage.getItem('compras')) : [];
let proveedores = localStorage.getItem('proveedores') != null ? JSON.parse(localStorage.getItem('proveedores')) : [];
let total = 0;
const listarProductos = () => {
    let tabla = document.querySelector('#tablaProductos tbody');
    let filas = '';
    if (productos.length > 0) {
        productos.forEach((item, indice) => {
            if (item.estado) {
                filas += `<tr>
                            <td>${item.nombre}</td>
                            <td>${item.codigo}</td>
                            <td>${item.marca}</td>
                            <td>${item.cantidad}</td>
                            <td>${item.precio_compra}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-primary btn-sm" onclick="addCarrito(${indice})"><i class="fas fa-plus"></i></button>
                                </div>
                            </td>
                        </tr>`;
            }
        });
    } else {
        filas += `<tr>
                    <td colspan="6" class="text-center"><span class="badge bg-danger"><i class="fas fa-times me-2"></i>Ningun registro encontrado</span></td>        
                </tr>`;
    }
    tabla.innerHTML = filas;
}
listarProductos();
const listarProveedores = () => {
    let proveedor = document.getElementById('proveedor');
    let opciones = '<option value="">Seleccione</option>';
    proveedores.forEach((item, indice) => {
        if (item.estado) {
            opciones += `<option value="${indice}">${item.nombre} ${item.apellido}</option>`;
        }
    });
    proveedor.innerHTML = opciones;
}
listarProveedores();
const addCarrito = param => {
    if (!validarProducto(param)) {
        let objeto = {
            producto: param,
            cantidad: 1,
            precio_unitario: productos[param].precio_compra,
            subtotal: productos[param].precio_compra,
        }
        carritoCompra.push(objeto);
        localStorage.setItem('carritoCompra', JSON.stringify(carritoCompra));
        listarCarrito();
    } else {
        warning('El producto ya se encuentra registrado en el carrito');
    }
}
const listarCarrito = () => {
    let tabla = document.querySelector('#tablaCarrito tbody');
    let filas = '';
    total = 0;
    if (carritoCompra.length > 0) {
        carritoCompra.forEach((item, indice) => {
            total += item.subtotal;
            filas += `<tr>
                        <td>${productos[item.producto].nombre}</td>
                        <td>${productos[item.producto].codigo}</td>
                        <td>${productos[item.producto].marca}</td>
                        <td>
                            <div class="btn-group">
                                <button type="button" class="btn btn-outline-danger btn-sm" onclick="decrementar(${indice})"><i class="fa-solid fa-circle-minus"></i></button>
                                <button type="button" class="btn btn-primary btn-sm">${item.cantidad}</button>
                                <button type="button" class="btn btn-outline-success btn-sm" onclick="incrementar(${indice})"><i class="fa-solid fa-circle-plus"></i></button>
                            </div>
                        </td>
                        <td>${item.precio_unitario}</td>
                        <td>${item.subtotal}</td>
                        <td>
                            <button type="button" class="btn btn-danger btn-sm" onclick="eliminarCarrito(${indice})">🚫</button>
                        </td>
                    </tr>`;
        });
    } else {
        filas += `<tr>
                    <td colspan="7" class="text-center"><span class="badge bg-danger"><i class="fas fa-times me-2"></i>Ningun registro encontrado</span></td>        
                </tr>`;
    }
    document.getElementById('total').value = total;
    tabla.innerHTML = filas;
}
listarCarrito();
const eliminarCarrito = param => {
    carritoCompra.splice(param, 1);
    localStorage.setItem('carritoCompra', JSON.stringify(carritoCompra));
    listarCarrito();
    if (carritoCompra.length < 1) {
        localStorage.removeItem('carritoCompra');
    }
}
const validarProducto = param => {
    let existe = false;
    carritoCompra.forEach(elemento => {
        if (param === elemento.producto) {
            existe = true;
        }
    });
    return existe;
}
const incrementar = param => {
    carritoCompra[param].cantidad += 1;
    carritoCompra[param].subtotal += carritoCompra[param].precio_unitario;
    localStorage.setItem('carritoCompra', JSON.stringify(carritoCompra));
    listarCarrito();
}
const decrementar = param => {
    if (carritoCompra[param].cantidad > 1) {
        carritoCompra[param].cantidad -= 1;
        carritoCompra[param].subtotal -= carritoCompra[param].precio_unitario;
        localStorage.setItem('carritoCompra', JSON.stringify(carritoCompra));
        listarCarrito();
    } else {
        warning('El producto debe tener almenos una unidad');
    }
}
const guardar = () => {
    let proveedor = document.getElementById('proveedor').value;
    console.log(carritoCompra)
    if (proveedor != "") {
        if (carritoCompra.length > 0) {
            let objeto = {
                proveedor,
                total,
                estado: true,
                detalle: carritoCompra,
            };
            Swal.fire({
                title: "¿Esta seguro?",
                text: "Está a punto de concluir la compra!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, terminar",
                cancelButtonText: "No, cancelar"
            }).then(function (result) {
                if (result.isConfirmed) {
                    carritoCompra.forEach(item => {
                        productos[item.producto].cantidad += item.cantidad;
                    });
                    compras.push(objeto);
                    localStorage.setItem('compras', JSON.stringify(compras));
                    localStorage.setItem('productos', JSON.stringify(productos));
                    localStorage.removeItem('carritoCompra');
                    successConfirmation('Registro guardado exitosamente', 'compras-lista.html');
                }
            });
        } else {
            warning('Necesitas agregar datos al carrito de compras');
        }
    } else {
        danger('Necesitas seleccionar un proveedor');
    }
}