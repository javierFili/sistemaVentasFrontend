let productos = localStorage.getItem('productos') != null ? JSON.parse(localStorage.getItem('productos')) : [];
const guardar = () => {
    let nombre = document.getElementById('nombre').value;
    let codigo = document.getElementById('codigo').value;
    let marca = document.getElementById('marca').value;
    let categoria = document.getElementById('categoria').value;
    let unidad_medida = document.getElementById('unidad_medida').value;
    let precio_compra = document.getElementById('precio_compra').value;
    let precio_venta = document.getElementById('precio_venta').value;
    if (nombre != "" && codigo != "" && marca != "" && categoria != "" && unidad_medida != "" && precio_compra != "" && precio_venta != "") {
        precio_compra = parseFloat(precio_compra);
        precio_venta = parseFloat(precio_venta);
        let objeto = {
            nombre,
            codigo,
            marca,
            categoria,
            unidad_medida,
            precio_compra,
            precio_venta,
            cantidad: 0,
            estado: true,
        }
        productos.push(objeto);
        localStorage.setItem('productos', JSON.stringify(productos));
        successConfirmation('Registro guardado exitosamente', 'productos-lista.html');
    } else {
        danger('No puede guardar informacion vacía');
    }
}