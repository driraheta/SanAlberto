function cargaTipoComp(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Descripción', class: 'text-center', ordenable: false, columna: 'DESCRIPCION', filtro: true },
            { leyenda: 'Serie', class: 'text-center', ordenable: false, columna: 'SERIE', filtro: false },
            { leyenda: 'Número', class: 'text-center', ordenable: false, columna: 'NUMERO', filtro: false },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [

            { propiedad: 'DESCRIPCION', class: 'text-center' },
            { propiedad: 'SERIE', class: 'text-center ' },
            { propiedad: 'NUMERO', class: 'text-center ' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editarTipoComp(obj.ID);
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
                        eliminaTipoComp(obj.ID, obj.DESCRIPCION);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/TipoComprobante.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'DESCRIPCION',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#tipos").MALCO(data);
}
function Guardar() {
    let info = new Object();
    info.desc = $("#desc").val();
    info.ser = $("#ser").val();
    info.corr = $("#num").val();
    get('/ws/TipoComprobante.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("La Serie se agregó correctamente");
                cargaTipoComp(0);
                $("#desc").val("");
                $("#ser").val("");
                $("#num").val("");
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
        html: '¿Confirma que desea actualizar la información de la Serie?',
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
            info.desc = $("#desc").val();
            info.ser = $("#ser").val();
            info.corr = $("#num").val();

            return fetch(`/ws/TipoComprobante.aspx/Actualizar`, {
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
                cargaTipoComp(0);
                $("#desc").val("");
                $("#ser").val("");
                $("#num").val("");
                $("#can").hide();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    })
}
function editarTipoComp(id) {
    get('/ws/TipoComprobante.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#id").val(res.Info[0].id);
                $("#desc").val(res.Info[0].desc);
                $("#ser").val(res.Info[0].ser);
                $("#num").val(res.Info[0].corr);
                $("#can").show();
                $("#desc").focus();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        })
}
function eliminaTipoComp(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar la información de la Serie<b>' + nom + '</b>?',
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
            return fetch(`/ws/TipoComprobante.aspx/Eliminar`, {
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
                cargaTipoComp(0);
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    })
}

$(document).ready(function () {
    $("#id").val("");
    cargaTipoComp(0);
    //validar escribir solo numeros en los inputs con clase numeros
    
    $("#gua").on("click", function () {
        if (valForm("forma")) {
            if ($("#id").val() === "")
                Guardar();
            else
                Actualizar();
        }
    })
    $("#can").on("click", function () {
        $("#desc").val("");
        $("#ser").val("");
        $("#num").val("");
        $("#can").hide();
        $("#id").val("");
    });
});