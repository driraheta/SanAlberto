function cargaEtiquetas(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Etiqueta', class: 'text-center', ordenable: false, columna: 'ETIQUETA', filtro: true },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            { propiedad: 'ETIQUETA', class: 'text-center' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editarEti(obj.ID_ETIQUETA);
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
                        eliminaEti(obj.ID_ETIQUETA, obj.ETIQUETA);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/etiqueta.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'ETIQUETA',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#etiquetas").MALCO(data);
}
function Guardar() {
    let info = new Object();
    info.eti = $("#eti").val();
    get('/ws/etiqueta.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("La etiqueta se agregó correctamente");
                cargaEtiquetas();
                $("#eti").val("");
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function Actualizar() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea actualizar la información de la etiqueta?',
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
            info.eti = $("#eti").val();

            return fetch(`/ws/etiqueta.aspx/Actualizar`, {
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
                cargaEtiquetas();
                $("#eti").val("");
                $("#id").val("");
                $("#can").hide();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}
function editarEti(id) {
    get('/ws/etiqueta.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#eti").val(res.Info[0].eti);
                $("#id").val(res.Info[0].id);
                $("#can").show();
                $("#eti").focus();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function eliminaEti(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar la información de la etiqueta <b>' + nom + '</b>?',
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
            return fetch(`/ws/etiqueta.aspx/Eliminar`, {
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
                cargaEtiquetas();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}


$(document).ready(function () {
    $("#id").val("");
    cargaEtiquetas();

    $("#gua").on("click", function () {
        if (valForm("forma")) {
            if ($("#id").val() === "")
                Guardar();
            else
                Actualizar();
        }
    });
    $("#can").on("click", function () {
        $("#eti").val("");
        $("#can").hide();
        $("#id").val("");
    });
    $("#opc").on("change", function () {
        $("#bval").hide();
        $(".gj-icon").parent().hide();

        if ($(this).val() !== "") {
            $("#bval").show();
        }
    });
    $("#bus").on("click", function () {
        let param = new Object();

        if ($("#opc").val() === "") {
            cargaEtiquetas();
        }
        else {
            if ($("#opc").val() !== "") {
                if ($("#opc").val() === "1")
                    param.nom = $("#bval").val().trim();

                if ($("#opc").val() === "2")
                    param.cod = $("#bval").val().trim();
            }
            cargaEtiquetas(param);
        }
    });


});