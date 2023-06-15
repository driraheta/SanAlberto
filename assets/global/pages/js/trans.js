function cargaTransportistas(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Empresa', class: 'text-center', ordenable: false, columna: 'NOMBRE', filtro: true },
            { leyenda: 'Conductor', class: 'text-center', ordenable: false, columna: 'TRANSPORTISTA', filtro: true },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            { propiedad: 'NOMBRE', class: 'text-center' },
            { propiedad: 'TRANSPORTISTA', class: 'text-center' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editarTran(obj.ID_TRANSPORTISTA);
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
                        eliminaTran(obj.ID_TRANSPORTISTA, obj.NOMBRE);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/Transportistas.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'NOMBRE',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#transportistas").MALCO(data);
}
function Guardar() {
    let info = new Object();
    info.nom = $("#nom").val();
    info.idmarc = $("#marc").val();
    info.numdoc = $("#ndoc").val();
    info.trans = $("#trans").val();
    info.placa = $("#placa").val();
    info.cap = $("#cap").val();

    get('/ws/Transportistas.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("El transportista se agegó correctamente");
                cargaTransportistas();
                $("#nom").val("");
                $("#marc").val("");
                $("#ndoc").val("");
                $("#trans").val("");
                $("#placa").val("");
                $("#cap").val("");
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
        html: '¿Confirma que desea actualizar la información del transportista?',
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
            info.nom = $("#nom").val();
            info.idmarc = $("#marc").val();
            info.numdoc = $("#ndoc").val();
            info.trans = $("#trans").val();
            info.placa = $("#placa").val();
            info.cap = $("#cap").val();
            return fetch(`/ws/Transportistas.aspx/Actualizar`, {
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
                cargaTransportistas();
                $("#nom").val("");
                $("#idmarc").val("");
                $("#ndoc").val("");
                $("#trans").val("");
                $("#placa").val("");
                $("#id").val("");
                $("#can").hide();
                $("#cap").val("");

            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}
function editarTran(id) {
    get('/ws/Transportistas.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#nom").val(res.Info[0].nom);
                $("#marc").val(res.Info[0].idmarc);
                $("#ndoc").val(res.Info[0].numdoc);
                $("#trans").val(res.Info[0].trans);
                $("#placa").val(res.Info[0].placa);
                $("#id").val(res.Info[0].id);
                $("#cap").val(res.Info[0].cap);

                $("#can").show();
                $("#emb").focus();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function eliminaTran(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar la información del Transportista <b>' + nom + '</b>?',
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
            return fetch(`/ws/Transportistas.aspx/Eliminar`, {
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
                cargaTransportistas();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}
function cargaMarcas() {
    get('/ws/marcas.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#marc").empty().append('<option value=""></option>');

                    $(res.Info).each(function () {
                        $("#marc").append('<option value="' + this.id + '">' + this.marc + '</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de marcas<br />" + error, "ERROR!");
        });
}
function guardarmarca() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar la marca <b>' + $("#marca").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            let reg = new Object();

            reg.marc  = $("#marca").val();

            get("/ws/marcas.aspx/Insertar", JSON.stringify({ info: JSON.stringify(reg) }))
                .then(function (res) {
                    if (res.Respuesta === 1) {
                        cargaMarcas();
                        Alerta("La marca se agregó correctamente");
                        limpiaControles('mmarca');
                        $("#mmarca").modal("toggle");

                    }
                    else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                })
                .catch(function (res) {
                    Alerta("No fue posible insertar la marca<br />" + res, "Error!", typIconoAlerta.error);
                });
        }
    });
}


$(document).ready(function () {
    $("#id").val("");
    cargaTransportistas();
    cargaMarcas();
    $("#gua").on("click", function () {
        if (valForm("forma")) {
            if ($("#id").val() === "")
                Guardar();
            else
                Actualizar();
        }
    });
    $("#can").on("click", function () {
        $("#nom").val("");
        $("#tdoc").val("");
        $("#ndoc").val("");
        $("#trans").val("");
        $("#placa").val("");
        $("#can").hide();
        $("#id").val("");
        $("#cap").val("");

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
            cargaTransportistas();
        }
        else {
            if ($("#opc").val() !== "") {
                if ($("#opc").val() === "1")
                    param.nom = $("#bval").val().trim();

            }
            cargaTransportistas(param);
        }
    });

    $("#nmarc").on("click", function () {
        $("#mmarca").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mmarca');
    });
    $("#canm").on("click", function () {
        $("#mmarca").modal("toggle");
    });
    $("#guam").on("click", function () {
        guardarmarca();
    });
});