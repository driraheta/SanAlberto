let ddpuntoentrega = "#pun";
let ddpuntoentregae = "#pune";
$(document).ready(function () {


    $("#guapunentrega").on("click", function () {
        if (valForm("mpunentrega")) {
            guardaPuntoEntrega();
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
                limpiaControles('mpunentrega')
                $("#mpunentrega").modal("toggle");
                ddpuntoentrega = '';
                ddpuntoentregae = '';
            }
        })
    });
});

function guardaPuntoEntrega() {
    let info = new Object();
    info.nom = $("#puntentrega").val();
    get('/ws/puntosentrega.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("El punto de entrega se agegó correctamente");
                cargaPuntosEntrega();
                limpiaControles("mpunentrega");
                ddpuntoentrega = '';
                ddpuntoentregae = '';
                $("mpunentrega").modal("toggle");
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargaPuntosEntrega() {
    $(ddpuntoentrega).empty().append('<option value=""></option>');
    if (ddpuntoentregae != '') {
        $(ddpuntoentregae).empty().append('<option value=""></option>');
    }
    get('/ws/puntosentrega.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $(ddpuntoentrega).append('<option value="' + this.id + '">' + this.nom + '</option>');
                        if (ddpuntoentregae != '') {
                            $(ddpuntoentregae).append('<option value="' + this.id + '">' + this.nom + '</option>');
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
