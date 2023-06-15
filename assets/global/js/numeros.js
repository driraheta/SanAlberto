$(document).ready(function () {
    //validar escribir solo numeros en los inputs con clase numeros
    $(".numeros").on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});