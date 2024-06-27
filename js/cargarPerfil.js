let perfil = JSON.parse(localStorage.getItem('usuario'));
let sesion = localStorage.getItem('sesionIniciada');
const datosPerfil = () => {
    sesion != null && perfil != null ? document.getElementById('usuarioNombre').innerHTML = perfil.usuario : window.location.href = 'login.html';
}
datosPerfil();
const cerrarSesion = () => {
    localStorage.removeItem('sesionIniciada');
    window.location.href = 'login.html';
}