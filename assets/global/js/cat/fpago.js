let ddfpago = "";
let ddfpagoe = "";
$(document).ready(function () {
    $("#guafpago").on("click", function () {
        if (valForm("mfpago")) {
            guardaFormaPago();
        }
    });

    $("#canfpago").on("click", function () {
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
                limpiaControles('mfpago')
                $("#mfpago").modal("toggle");
            }
        })
    });
});

function cargaFormaPago() {
    get('/ws/FormaPago.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $(ddfpago).empty().append('<option value=""></option>');
                if (ddfpagoe != '') {
                    $(ddfpagoe).empty().append('<option value=""></option>');
                }

                $(res.Info).each(function () {
                    var desc = this.fp + "-" + this.nrodias;
                    $(ddfpago).append('<option value="' + this.id + '">' + desc + '</option>');
                    if (ddfpagoe != '') {
                        $(ddfpagoe).append('<option value="' + this.id + '">' + desc + '</option>');
                    }
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

function guardaFormaPago() {
    let info = new Object();
    info.fp = $("#fpagodes").val();
    info.nrodias = $("#fpagodias").val();
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el registro de  <b>' + $("#fpagodes").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/FormaPago.aspx/Insertar`, {
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
                limpiaControles("mfpago");
                cargaFormaPago();
                $("mfpago").modal("toggle");
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    })
}
