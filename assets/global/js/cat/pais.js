let ddpais = "#pai";
let ddpaisd = "";
let paiv = "";
let paivd = "";
$(document).ready(function () {
    $("#guapais").on("click", function () {
        if (valForm("mpais")) {
            guardaPaises();
        }
    });

    $("#canpais").on("click", function () {
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
                limpiaControles('mpais')
                $("#mpais").modal("toggle");
                ddpais = '';
                ddpaisd = '';
                 paiv = '';
                 paivd = '';
            }
        })
    });
});

function cargaPaises(imp1,imp2) {
    get('/ws/paises.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $(ddpais).empty().append('<option value=""></option>');
                if (ddpaisd != '') {
                    $(ddpaisd).empty().append('<option value=""></option>');
                }
                if (paiv = '') {
                    $(paiv).empty().append('<option value=""></option>');
                }
                if (paivd = '') {
                    $(paivd).empty().append('<option value=""></option>');
                }

                $(res.Info).each(function () {
                    let nom = this.mer;
                    $(ddpais).append('<option value="' + this.id + '">' + this.pai + '</option>');
                    if (ddpaisd != '') {
                        $(ddpaisd).append('<option value="' + this.id + '">' + this.pai + '</option>');
                    } if (paiv != '') {
                        $(paiv).append('<option value="' + this.id + '">' + this.pai + '</option>');
                    } if (paivd != '') {
                        $(paivd).append('<option value="' + this.id + '">' + this.pai + '</option>');
                    }
                });
                $(ddpais).val(imp1).change();
                $(ddpaisd).val(imp2).change();
            }

            else {
                Alerta(res.Mensaje, "ERROR!");
            }

        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        })

}

function guardaPaises() {
    let info = new Object();
    info.pai = $("#panom").val();
    info.cla = $("#paclave").val();
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el registro de  <b>' + $("#mernom").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/paises.aspx/Insertar`, {
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
                limpiaControles("mpais");
                
                ddpais = '#pai';
                ddpaisd = '#paid';
                paiv = "#paiv";
                paivd = "#paivd";
                cargaPaises($("#pai").val(), $("#paid").val());
                
                $("mpais").modal("toggle");
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    })
}
