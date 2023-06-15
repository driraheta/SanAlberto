let ddcondpago = "";
$(document).ready(function () {
    $("#guacond").on("click", function () {
        if (valForm("mcondpago")) {
            guardaCondPago();
        }
    });

    $("#cancond").on("click", function () {
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
                limpiaControles('mcondpago')
                $("#mcondpago").modal("toggle");
            }
        })
    });
});

function cargaCondPago() {
    get('/ws/condicionespago.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $(ddcondpago).empty().append('<option value=""></option>');
                $(res.Info).each(function () {
                    $(ddcondpago).append('<option value="' + this.id + '">' + this.con + '-' + this.nodias + '</option>');
                });
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        })

}

function guardaCondPago() {
    let info = new Object();
    info.con = $("#condes").val();
    info.nodias = $("#condias").val();
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el registro de  <b>' + $("#condes").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/condicionespago.aspx/Insertar`, {
                method: 'POST', body: JSON.stringify({ info: JSON.stringify(info) }), headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    );
                });
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.value) {
            let res = JSON.parse(result.value.d);
            if (res.Respuesta === 1) {
                Alerta("El registro se insertó correctamente");
                limpiaControles("mcondpago");
                cargaCondPago();
                $("mcondpago").modal("toggle");
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    })
}
