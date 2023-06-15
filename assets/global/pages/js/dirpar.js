$(document).ready(function () {
    $("#id").val("");
    cargaDP();
    cargaTiposComprobantes();
    $("#nuesec").on("click", function () {
        if ($("#id").val() == "") {
            return;
        }
        $("#mcorrelativo").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mcorrelativo');
    });

    $("#agrsec").on("click", function () {
        if (valForm("mcorrelativo")) {
            agregaCorrelativo();
        }
    });

    $("#cansec").on("click", function () {
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
                $("#mcorrelativo").modal("toggle");
            }
        })
    });

    $("#gua").on("click", function () {
        if (valForm("forma")) {
            if ($("#id").val() === "")
                Guardar();
            else
                Actualizar();
        }
    });
    $("#can").on("click", function () {
        $("#dirpar").val("");
        $("#can").hide();
        $("#id").val("");
        $("#secuenciales tbody").empty();
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
            cargaDP();
        }
        else {
            if ($("#opc").val() !== "") {
                if ($("#opc").val() === "1")
                    param.desc = $("#bval").val().trim();

            }
            cargaDP(param);
        }
    });


});

function cargaDP(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Dirección de Partida', class: 'text-center', ordenable: false, columna: 'DESCRIPCION', filtro: true },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            { propiedad: 'DESCRIPCION', class: 'text-center' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editarDP(obj.ID_DIRPAR);
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
                        eliminaDP(obj.ID_DIRPAR, obj.DESCRIPCION);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/DireccionPartida.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'DESCRIPCION',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#direcciondepartida").MALCO(data);
}

function Guardar() {
    let info = new Object();
    let reg = new Object();
    reg.desc = $("#dirpar").val();
    //info.desc = $("#dirpar").val();
    info.reg = reg;
    info.secuenciales = copiarSecuenciales();
    get('/ws/DireccionPartida.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("La Dirección de Partida se agegó correctamente");
                cargaDP();
                $("#dirpar").val("");
                $("#id").val("");
                $("#secuenciales tbody").empty();
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
        html: '¿Confirma que desea actualizar la información de la Dirección de Partida?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, Actualizar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let info = new Object();
            let reg = new Object();
            reg.id = $("#id").val();
            reg.desc = $("#dirpar").val();
            //reg.secuenciales = copiarSecuenciales();

            info.reg = reg;
            info.secuenciales = copiarSecuenciales();

            return fetch(`/ws/DireccionPartida.aspx/Actualizar`, {
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
                cargaDP();
                $("#dirpar").val("");
                $("#id").val("");
                $("#can").hide();
                $("#secuenciales tbody").empty();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}

function editarDP(id) {
    get('/ws/DireccionPartida.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#dirpar").val(res.Info.direccionList[0].desc);
                $("#id").val(res.Info.direccionList[0].id);
                cargaSecuenciales(res.Info.det);
                $("#can").show();
                $("#dirpar").focus();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function eliminaDP(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar la información de la direccion de partida <b>' + nom + '</b>?',
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
            return fetch(`/ws/DireccionPartida.aspx/Eliminar`, {
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
                cargaDP();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}

function cargaSecuenciales(detSecuencia) {
    $("#secuenciales tbody").empty();
    $.each(detSecuencia, function () {
        let id = this.ID;
        let iddocumento = this.ID_DOCUMENTO;
        let idtipocomprobante = this.ID_TIPOCOMPROBANTE
        let desctipocomp = this.DESCRIPCION
        let descdocumento = nombreTipoDocumento(iddocumento);
        let serie = this.SERIE;
        let numero = this.NUMERO;

        fila = '<tr id="f' + id + '">' +
            '<td id="n' + id + '"class="text-right" style="display: none"> ' + id + '</td > ' +
            '<td class="text-right" style="display: none"> ' + iddocumento + '</td > ' +
            '<td class="text-right" style="display: none"> ' + idtipocomprobante + '</td > ' +
            '<td class="text-right">' + descdocumento + '</td>' +
            '<td class="text-right">' + desctipocomp + '</td>' +
            '<td class="text-right">' + serie + '</td>' +
            '<td class="text-right">' + numero + '</td>' +
            '<td class="text-center"><i id="blist' + id + '" class="fa fa-trash text-danger" title="Elimina secuencia"></i></td></tr>';
        $("#secuenciales tbody").append(fila);
        fila = $("#secuenciales tr:last");
        $(fila).css({ "cursor": "pointer" });
        $("#blist" + id).on("click", function () {
            Swal.fire({
                title: 'Confirmación',
                html: '¿Confirma que desea eliminar el secuencial?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    $("#f"+ id).remove();
                }
            });
        });
    });
};

function nombreTipoDocumento(iddocumento) {
    switch (iddocumento) {
        case 1: case "1":
            return "FACTURA";
        case 2: case "2":
            return "GUIA REMISION";
        case 3: case "3":
            return "NOTA DEBITO";
        case 4: case "4":
            return "NOTA CREDITO";
        case 5: case "5":
            return "RETENCION";
        default:
            return "";
    }

}

function cargaTiposComprobantes() {
    ddtipocomprobante = $("#idtipocomprobante")
    cargaTiposComprobante();
}

function agregaCorrelativo() {
    let id = $("#secuenciales tbody tr").length+1;
    let iddocumento = $("#iddocumento").val();
    let idtipocomprobante = $("#idtipocomprobante").val();
    let desctipocomp = $("#idtipocomprobante option:selected").text();
    let descdocumento = nombreTipoDocumento(iddocumento);
    let serie = $("#idtipocomprobante option:selected").attr("serie");
    let numero = $("#idtipocomprobante option:selected").attr("numero");
    fila = '<tr id="f' + id + '">' +
        '<td id="n' + id + '"class="text-right" style="display: none"> ' + id + '</td > ' +
        '<td class="text-right" style="display: none"> ' + iddocumento + '</td > ' +
        '<td class="text-right" style="display: none"> ' + idtipocomprobante + '</td > ' +
        '<td class="text-right">' + descdocumento + '</td>' +
        '<td class="text-right">' + desctipocomp + '</td>' +
        '<td class="text-right">' + serie + '</td>' +
        '<td class="text-right">' + numero + '</td>' +

        '<td class="text-center"><i id="blist' + id + '" class="fa fa-trash text-danger" title="Elimina secuencia"></i></td></tr>';
    $("#secuenciales tbody").append(fila);
    fila = $("#secuenciales tr:last"); 
    $(fila).css({ "cursor": "pointer" });
    $("#blist" + id).on("click", function () {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea eliminar el secuencial?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $("#f" + id).remove();
            }
        });
    });

};

function copiarSecuenciales() {

    let detalle = new Array();
    $.each($("#secuenciales tbody tr"), function () {
        let det = new Object();
        //det.idprod = this.cells[0].innerText;
        det.iddireccion = $("#id").val();
        det.iddocumento = this.cells[1].innerText;
        det.idtipocomprobante = this.cells[2].innerText;
        det.status = 1;
        detalle.push(det);
    });
    return detalle;
}