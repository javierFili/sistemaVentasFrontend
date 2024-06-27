let productos = localStorage.getItem('productos') != null ? JSON.parse(localStorage.getItem('productos')) : [];
let ventas = localStorage.getItem('ventas') != null ? JSON.parse(localStorage.getItem('ventas')) : [];
let clientes = localStorage.getItem('clientes') != null ? JSON.parse(localStorage.getItem('clientes')) : [];
let compras = localStorage.getItem('compras') != null ? JSON.parse(localStorage.getItem('compras')) : [];
let ventasTotales = localStorage.getItem('ventasTotales') != null ? JSON.parse(localStorage.getItem('ventasTotales')) : [];
window.addEventListener('load', () => {
    listar();
});
const listar = () => {
    document.getElementById('totalClientes').innerText = clientes.length;
    document.getElementById('totalProductos').innerText = productos.length;
    document.getElementById('totalCompras').innerText = compras.length;
    document.getElementById('totalVentas').innerText = ventas.length;
    ventasTotales.sort((a, b) => b.cantidad - a.cantidad);
    let lista = document.getElementById('masVendidos');
    let cadena = `<li class="list-group-item list-group-item-info">
                                <i class="fas fa-shopping-cart me-2"></i>Productos mas vendidos
                            </li>`;
    ventasTotales.forEach(item => {
        cadena += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                                ${productos[item.producto].nombre}
                                <span class="badge text-bg-primary rounded-pill">${item.cantidad}</span>
                            </li>`;
    });
    lista.innerHTML = cadena;
}