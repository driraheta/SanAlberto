let ddtipocomprobante = "#tipcomp";
let ddtipocomprobantee = "#tipcompe";
$(document).ready(function () {
    $("#guatipocomprobante").on("click", function () {
        if (valForm("mtipocomprobante")) {
            guardaTipoComprobante();
        }
    });

    $("#canpunentrega").on("click", function () {
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
                limpiaControles('mtipocomprobante')
                $("#mtipocomprobante").modal("toggle");
                ddtipocomprobante = '';
                ddtipocomprobantee = '';
            }
        })
    });
});

function guardaTipoComprobante() {
    let info = new Object();
    info.nom = $("#puntentrega").val();
    get('/ws/puntosentrega.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("El punto de entrega se agegó correctamente");
                cargaPuntosEntrega();
                limpiaControles("mtipocomprobante");
                ddtipocomprobante = '';
                ddtipocomprobantee = '';
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

function cargaTiposComprobante() {
    let param = new Object();
    param.where = "";
    $(ddtipocomprobante).empty().append('<option value=""></option>');
    if (ddtipocomprobantee != '') {
        $(ddtipocomprobantee).empty().append('<option value=""></option>');
    }
    get('/ws/TipoComprobante.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $(ddtipocomprobante).append('<option serie="'+ this.ser +'" numero = '+ this.corr+ ' value="' + this.id + '">' + this.desc + '</option>');
                        if (ddtipocomprobantee != '') {
                            $(ddtipocomprobantee).append('<option serie="' + this.ser + '" numero = ' + this.corr + 'value="' + this.id + '">' + this.desc + '</option>');
                        }
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de puntos de entrega<br/>" + error, "ERROR");
        });
}


