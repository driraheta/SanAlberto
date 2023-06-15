function cargaCategoriaVent(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'DESCRIPCION', class: 'text-center', ordenable: false, columna: 'DESCRIPCION_CATVENT', filtro: true },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [

            { propiedad: 'DESCRIPCION_CATVENT', class: 'text-center' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editarCal(obj.ID_CATVENT);
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
                        eliminaCal(obj.ID_CATVENT, obj.DESCRIPCION_CATVENT);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/CategoriaVent.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'DESCRIPCION_CATVENT',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#CategoriaVent").MALCO(data);
}
function Guardar() {
    let info = new Object();
    info.desc = $("#cal").val();
    get('/ws/CategoriaVent.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("La Categoria se agegó correctamente");
                cargaCategoriaVent(0);
                $("#cal").val("");
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
        html: '¿Confirma que desea actualizar la información de la Categoria?',
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
            info.desc = $("#cal").val();

            return fetch(`/ws/CategoriaVent.aspx/Actualizar`, {
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
                cargaCategoriaVent(0);
                $("#cal").val("");
                $("#id").val("");
                $("#can").hide();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    })
}
function editarCal(id) {
    get('/ws/CategoriaVent.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#cal").val(res.Info[0].desc);
                $("#id").val(res.Info[0].id);
                $("#can").show();
                $("#cal").focus();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        })
}
function eliminaCal(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar la información de la categoria <b>' + nom + '</b>?',
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
            return fetch(`/ws/CategoriaVent.aspx/Eliminar`, {
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
                cargaCategoriaVent(0);
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    })
}


$(document).ready(function () {
    $("#id").val("");
    cargaCategoriaVent(0);

    $("#gua").on("click", function () {
        if (valForm("forma")) {
            if ($("#id").val() === "")
                Guardar();
            else
                Actualizar();
        }
    })
    $("#can").on("click", function () {
        $("#cal").val("");
        $("#can").hide();
        $("#id").val("");
    });
});