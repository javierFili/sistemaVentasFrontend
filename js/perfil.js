const mostrar = () => {
    document.getElementById('nombre').value = perfil.nombre;
    document.getElementById('apellido').value = perfil.apellido;
    document.getElementById('usuario').value = perfil.usuario;
    document.getElementById('email').value = perfil.email;
}
mostrar();
const guardar = () => {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let usuario = document.getElementById('usuario').value;
    let email = document.getElementById('email').value;
    if (nombre != "" && apellido != "" && usuario != "" && email != "") {
        perfil.nombre = nombre;
        perfil.apellido = apellido;
        perfil.usuario = usuario;
        perfil.email = email;
        guardarLocalstorage('usuario', perfil);
        document.getElementById('usuarioNombre').innerHTML = perfil.usuario;
        success('Registro guardado exitosamente');
    } else {
        danger('No puede enviar datos vacions');
    }
}
const guardarContraseña = () => {
    let password = document.getElementById('password').value;
    let password_confirmation = document.getElementById('password_confirmation').value;
    let password_old = document.getElementById('password_old').value;
    if (password_old == perfil.password) {
        if (password_confirmation != "" && password != "") {
            if (password_confirmation == password) {
                perfil.password = password;
                guardarLocalstorage('usuario', perfil);
                vaciarPassword();
                success('La contraseña fue modificada exitosamente.');
            } else {
                danger('La nueva contraseña y la confirmacion son diferentes');
            }
        } else {
            danger('No puede enviar datos vacios');
        }
    } else {
        danger('La contraseña actual es diferente.');
    }
}
const guardarLocalstorage = (clave, valor)=>{
    localStorage.setItem(clave, JSON.stringify(valor));
}
const vaciarPassword = ()=>{
    document.getElementById('password').value = "";
    document.getElementById('password_confirmation').value = "";
    document.getElementById('password_old').value = "";
}