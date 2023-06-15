function cerrarSesion() {
    Cookies.remove("idu", { path: '/' });
    Cookies.remove("nom", { path: '/' });
    Cookies.remove("usu", { path: '/' });
    Cookies.remove("chk", { path: '/' });
    Cookies.remove("per", { path: '/' });
    Cookies.remove("foto", { path: '/' });
    window.location.href = "/";
}

$(document).ready(function () {
    setTimeout(function () { cerrarSesion(); }, 500);
});