let productos = localStorage.getItem('productos') != null ? JSON.parse(localStorage.getItem('productos')) : [];
let carritoVenta = localStorage.getItem('carritoVenta') != null ? JSON.parse(localStorage.getItem('carritoVenta')) : [];
let ventas = localStorage.getItem('ventas') != null ? JSON.parse(localStorage.getItem('ventas')) : [];
let clientes = localStorage.getItem('clientes') != null ? JSON.parse(localStorage.getItem('clientes')) : [];
let ventasTotales = localStorage.getItem('ventasTotales') != null ? JSON.parse(localStorage.getItem('ventasTotales')) : [];
let total = 0;
const listarProductos = () => {
    let tabla = document.querySelector('#tablaProductos tbody');
    let filas = '';
    if (productos.length > 0) {
        productos.forEach((item, indice) => {
            if (item.estado && item.cantidad > 0) {
                filas += `<tr>
                            <td>${item.nombre}</td>
                            <td>${item.codigo}</td>
                            <td>${item.marca}</td>
                            <td>${item.cantidad}</td>
                            <td>${item.precio_venta}</td>
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
const listarClientes = () => {
    let cliente = document.getElementById('cliente');
    let opciones = '<option value="">Seleccione</option>';
    clientes.forEach((item, indice) => {
        if (item.estado) {
            opciones += `<option value="${indice}">${item.nombre} ${item.apellido}</option>`;
        }
    });
    cliente.innerHTML = opciones;
}
listarClientes();
const addCarrito = param => {    
    //addTotalesVenta(2, 5);
    if (!validarProducto(param)) {
        let objeto = {
            producto: param,
            cantidad: 1,
            stock: productos[param].cantidad,
            precio_unitario: productos[param].precio_venta,
            subtotal: productos[param].precio_venta,
        }
        carritoVenta.push(objeto);
        localStorage.setItem('carritoVenta', JSON.stringify(carritoVenta));
        listarCarrito();
    } else {
        warning('El producto ya se encuentra registrado en el carrito');
    }
}
const listarCarrito = () => {
    let tabla = document.querySelector('#tablaCarrito tbody');
    let filas = '';
    total = 0;
    if (carritoVenta.length > 0) {
        carritoVenta.forEach((item, indice) => {
            total += item.subtotal;
            filas += `<tr>
                        <td>${productos[item.producto].nombre}</td>
                        <td>${productos[item.producto].codigo}</td>
                        <td>${productos[item.producto].marca}</td>
                        <td>
                            <input type="text" class="form-control" id="cantidad${indice}" value="${item.cantidad}" onchange="cambarCantidad(${indice})">
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
    carritoVenta.splice(param, 1);
    localStorage.setItem('carritoVenta', JSON.stringify(carritoVenta));
    listarCarrito();
    if (carritoVenta.length < 1) {
        localStorage.removeItem('carritoVenta');
    }
}
const validarProducto = param => {
    let existe = false;
    carritoVenta.forEach(elemento => {
        if (param === elemento.producto) {
            existe = true;
        }
    });
    return existe;
}
const guardar = () => {
    let cliente = document.getElementById('cliente').value;
    if (cliente != "") {
        if (carritoVenta.length > 0) {
            let objeto = {
                cliente: cliente,
                total,
                estado: true,
                detalle: carritoVenta,
            };
            Swal.fire({
                title: "¿Esta seguro?",
                text: "Está a punto de concluir la venta!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, terminar",
                cancelButtonText: "No, cancelar"
            }).then(function (result) {
                if (result.isConfirmed) {
                    carritoVenta.forEach(item => {
                        productos[item.producto].cantidad -= item.cantidad;
                        addTotalesVenta(item.producto, item.cantidad);
                    });
                    ventas.push(objeto);
                    localStorage.setItem('ventas', JSON.stringify(ventas));
                    localStorage.setItem('productos', JSON.stringify(productos));
                    localStorage.setItem('productos', JSON.stringify(productos));
                    localStorage.removeItem('carritoVenta');
                    successConfirmation('Registro guardado exitosamente', 'ventas-lista.html');
                }
            });
        } else {
            warning('Necesitas agregar datos al carrito de ventas');
        }
    } else {
        danger('Necesitas seleccionar un cliente');
    }
}
const cambarCantidad = param => {
    let input = parseInt(document.getElementById(`cantidad${param}`).value);
    if (!isNaN(input)) {
        if (input > 0) {
            if (input <= carritoVenta[param].stock) {
                carritoVenta[param].cantidad = input;
                let subtotal = input * carritoVenta[param].precio_unitario;
                carritoVenta[param].subtotal = subtotal;
                localStorage.setItem('carritoVenta', JSON.stringify(carritoVenta));
                listarCarrito();
            } else {
                danger('La cantidad solicitada es mayor a la cantidad en STOCK del producto');
                listarCarrito();
            }
        } else {
            danger('La cantidad solicitada no puede ser menor a 0');
            listarCarrito();
        }
    } else {
        warning('Debe enviar un numero valido.');
        listarCarrito();
    }
}
const addTotalesVenta = (producto, cantidad) => {
    const indice = ventasTotales.findIndex(elemento => elemento.producto === producto);
    if (indice !== -1) {
        ventasTotales[indice].cantidad += cantidad;
    } else {
        ventasTotales.push({
            producto: producto,
            cantidad: cantidad,
        });
    }
    localStorage.setItem('ventasTotales', JSON.stringify(ventasTotales));
}