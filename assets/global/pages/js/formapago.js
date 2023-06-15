function cargaCP(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Descripción', class: 'text-center', ordenable: false, columna: 'CONDICION_PAGO', filtro: true },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [

            { propiedad: 'FORMAPAGO', class: 'text-center' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editarCP(obj.ID_FORMAPAGO);
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
                        eliminaCP(obj.ID_FORMAPAGO, obj.FORMAPAGO);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/FormaPago.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'FORMAPAGO',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#condiciones").MALCO(data);
}
function Guardar() {
    let info = new Object();
    info.fp = $("#fp").val();
    info.nrodias = $("#nd").val();
    get('/ws/FormaPago.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("La condición se agegó correctamente");
                cargaCP(0);
                $("#fp").val("");
                $("#nd").val("");

            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        })
}
function Actualizar() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea actualizar la información de la forma de pago?',
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
            info.fp = $("#fp").val();
            info.nrodias = $("#nd").val();

            return fetch(`/ws/FormaPago.aspx/Actualizar`, {
                method: 'POST', body: JSON.stringify({ info: JSON.stringify(info) }), headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.value) {
            let res = JSON.parse(result.value.d);
            if (res.Respuesta === 1) {
                Alerta("El registro se actualizó correctamente");
                cargaCP(0);
                $("#fp").val("");
                $("#nd").val("");

                $("#id").val("");
                $("#can").hide();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    })
}
function editarCP(id) {
    get('/ws/FormaPago.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#fp").val(res.Info[0].fp);
                $("#nd").val(res.Info[0].nrodias);
                $("#id").val(res.Info[0].id);
                $("#can").show();
                $("#fp").focus();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        })
}
function eliminaCP(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar la información de la forma de pago <b>' + nom + '</b>?',
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
            return fetch(`/ws/FormaPago.aspx/Eliminar`, {
                method: 'POST', body: JSON.stringify({ info: JSON.stringify(info) }), headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.value) {
            let res = JSON.parse(result.value.d);
            if (res.Respuesta === 1) {
                Alerta("El registro se eliminó correctamente");
                cargaCP(0);
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    })
}


$(document).ready(function () {
    $("#id").val("");
    cargaCP(0);
    //validar escribir solo numeros en los inputs con clase numeros
    $(".numeros").on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    $("#gua").on("click", function () {
        if (valForm("forma")) {
            if ($("#id").val() === "")
                Guardar();
            else
                Actualizar();
        }
    })
    $("#can").on("click", function () {
        $("#fp").val("");
        $("#np").val("");
        $("#can").hide();
        $("#id").val("");
    });
});