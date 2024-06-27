const success = texto => {
    Swal.fire({
        title: 'Bien!',
        text: texto,
        icon: 'success',
        confirmButtonText: 'Cerrar',
    });
}
const danger = texto => {
    Swal.fire({
        title: 'Error!',
        text: texto,
        icon: 'error',
        confirmButtonText: 'Cerrar',
    });
}
const warning = texto => {
    Swal.fire({
        title: 'Advertencia!',
        text: texto,
        icon: 'warning',
        confirmButtonText: 'Cerrar',
    });
}
/*const successConfirmation = texto => {
    return Swal.fire({
        title: '¿Estás seguro?',
        text: texto,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
    })
}*/
const successConfirmation = (texto, url) => {
    Swal.fire({
        title: "Bien",
        text: texto,
        icon: "success",
        confirmButtonText: 'Cerrar',
        allowOutsideClick: false,
        timer: 2500,
    }).then(result => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
            window.location.href = url;
        }
    });
}