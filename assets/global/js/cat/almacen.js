let ddAlmacen = "#alm";
let ddAlmacene = "#alme";
let almF = "#almF";
$(document).ready(function () {
    $("#guaalmacen").on("click", function () {
        if (valForm("malmacen")) {
            guardaAlmacen();
        }
    });

    $("#canalmacen").on("click", function () {
        Swal.fire({
            html: '¿Confirma que desea cancelar la acción?',
            title: 'Confirmación',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí'
        }).then((result) => {
            if (result.value) {
                limpiaControles('malmacen')
                $("#malmacen").modal("toggle");
                ddAlmacen = '';
                ddAlmacene = '';
            }
        })
    });
});

function guardaAlmacen() {
    let info = new Object();
    info.nom = $("#puntentrega").val();
    get('/ws/puntosentrega.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("El punto de entrega se agegó correctamente");
                cargaPuntosEntrega();
                limpiaControles("mtipocomprobante");
                ddAlmacen = '';
                ddAlmacene = '';
                $("mtipocomprobante").modal("toggle");
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargaAlmacenes() {
    let param = new Object();
    param.where = "";
    $(ddAlmacen).empty().append('<option value=""></option>');
    if (ddAlmacene != '') {
        $(ddAlmacene).empty().append('<option value=""></option>');
    }
    get('/ws/almacenes.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $(ddAlmacen).append('<option value="' + this.id + '">' + this.alm + '</option>');
                        if (ddAlmacene != '') {
                            $(ddAlmacene).append('<option value="' + this.id + '">' + this.alm + '</option>');
                        }
                        if (almF != '') {
                            $(almF).append('<option value="' + this.id + '">' + this.alm + '</option>');
                        }
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de almacenes<br/>" + error, "ERROR");
        });
}

function cargaAlmacenesXUsuario() {
    let param = new Object();
    let iduser = Cookies.get('idu');
    param.where = "";
    $(ddAlmacen).empty().append('<option value=""></option>');
    if (ddAlmacene != '') {
        $(ddAlmacene).empty().append('<option value=""></option>');
    }
    if (almF != '') {
        $(almF).empty().append('<option value=""></option>');
    }
    get('/ws/almacenes.aspx/ConsultarXUsuario', JSON.stringify({ idu: iduser }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $(ddAlmacen).append('<option value="' + this.ID_ALMACEN + '">' + this.ALMACEN + '</option>');
                        if (ddAlmacene != '') {
                            $(ddAlmacene).append('<option value="' + this.ID_ALMACEN + '">' + this.ALMACEN + '</option>');
                        }
                        if (almF != '') {
                            $(almF).append('<option value="' + this.ID_ALMACEN + '">' + this.ALMACEN + '</option>');
                        }
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de almacenes<br/>" + error, "ERROR");
        });
}