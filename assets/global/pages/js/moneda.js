$(document).ready(function () {
    $("#id").val("");
    cargaMonedas();
    $("#gua").on('click', function () {
        Registrar();
    });
});
function nuevo() {
    limpiaPantalla();
    $("#lista").hide();
    $("#forma").show();
}
function limpiaPantalla() {
    limpiaControles("forma");
    $("#info tbody").empty();
    $("#id").val("");
}
function Registrar() {
    if (valForm("forma")) {
        if ($("#id").val() === "")
            Guardar();
        else
            Actualizar();
    }
}
function Guardar() {
    let info = new Object();

    info.mon = $("#mon").val();
    info.sim = $("#codmon").val();

    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el registro de  <b>' + $("#mon").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/monedas.aspx/Insertar`, {
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
                limpiaControles("forma");
                cargaMonedas();
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    })
}

function Actualizar() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea actualizar la información de la moneda?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, Actualizar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let info = new Object();

            info.id = $("#id").val();
            info.mon = $("#mon").val();
            info.sim = $("#codmon").val();

            return fetch(`/ws/monedas.aspx/Actualizar`, {
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
                Alerta("El registro se actualizó correctamente");
                limpiaControles("forma");
                $("#id").val("");

                cargaMonedas();

            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    })
}
function eliminaMoneda(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar la moneda <b>' + nom + '</b>?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, Eliminar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let info = new Object();
            info.id = id;
            return fetch(`/ws/monedas.aspx/Eliminar`, {
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
                Alerta("El registro se eliminó correctamente");
                cargaMonedas();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}
function editarMoneda(id) {
    get('/ws/monedas.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#codmon").val(res.Info[0].sim);
                $("#mon").val(res.Info[0].mon);
                $("#id").val(id);


                $("#can").show();
                $("#mon").focus();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function cargaMonedas(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Número', class: 'text-center', ordenable: false, columna: 'ID_MONEDA', filtro: true },
            { leyenda: 'Símbolo', class: 'text-center', ordenable: false, columna: 'SIMBOLO', filtro: true },
            { leyenda: 'Moneda', class: 'text-center', ordenable: false, columna: 'MONEDA', filtro: true },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            { propiedad: 'ID_MONEDA', class: 'text-center' },
            { propiedad: 'SIMBOLO', class: 'text-center' },
            { propiedad: 'MONEDA', class: 'text-center ' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editarMoneda(obj.ID_MONEDA);
                    });
                    container.appendChild(edita);

                    return container;
                }
            },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    elimina = document.createElement("i");

                    $(elimina).addClass("fa fa-trash text-danger").prop("title", "Elimina").on("click", function () {
                        eliminaMoneda(obj.ID_MONEDA, obj.MONEDA);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/monedas.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'PAIS',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#monedas").MALCO(data);
}
