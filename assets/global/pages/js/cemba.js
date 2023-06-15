$(document).ready(function () {

    cargaCostos();
    cargaUnidadesMedida();

    $('.datepicker').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    });

    $('#dec').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#hasc').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $(".gj-icon").css({ "margin-top": "-4px" });
    $("#nue").on("click", function () {
        $("#lista").hide();
        $("#datos").show();
    });

    $("#filtrarBtn").on("click", function () {
        fil = new Object();
        let filtroFechaInicio = $("#filtroFechaInicio").val()
        let filtroFechaFin = $("#filtroFechaFin").val()

        if ($("#filtroTipo").val() != "0") fil.emb = parseInt($("#filtroTipo").val());
        if ($("#filtroUM").val() != "0") fil.um = parseInt($("#filtroUM").val());
        if (filtroFechaInicio != "") {
            let filtroFIniFormat = filtroFechaInicio.substr(6, 4) + "-" + filtroFechaInicio.substr(3, 2) + "-" + filtroFechaInicio.substr(0, 2);
            fil.des = filtroFIniFormat;
        }
        if (filtroFechaFin != "") {
            let filtroFFinFormat = filtroFechaFin.substr(6, 4) + "-" + filtroFechaFin.substr(3, 2) + "-" + filtroFechaFin.substr(0, 2);
            fil.has = filtroFFinFormat;
        }
        cargaCostos(fil);
    });

    $("#restablecerFiltros").on("click", function () {
        $("#filtroFechaInicio").val("");
        $("#filtroFechaFin").val("");
        $("#filtroTipo").val("0");
        $("#filtroUM").val("0");
        cargaCostos();
    });

    $("#canc").on("click", function () {
        //$(this).hide();
        $("#emb").val("");
        $("#idc").val("");
        $("#tipc").val("");
        $("#um").val("");
        $("#impc").val("");
        $("#dec").val("");
        $("#hasc").val("");
        $("#pun").val("");
        $("#datos").hide();
        $("#lista").show();
    });
    $("#guac").on("click", function () {
        if (valForm("fletem")) {
            guardaCosto();
        }
    });
    $("#impc").on("keypress", function (evt) {
        return numerosDecimales(evt, this);
    });
});


function cargaCostos(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover',
        columnas: [
            { leyenda: 'Tipo', class: 'text-center', ordenable: false, columna: '', filtro: false },
            { leyenda: 'Unidad de Medida', class: 'text-center', ordenable: false, columna: 'UNIDAD_MEDIDA', filtro: false },
            { leyenda: 'Tarifa', class: 'text-center', ordenable: false, columna: 'IMPORTE', filtro: false },
            { leyenda: 'Desde', class: 'text-center', ordenable: false, columna: 'DESDE', filtro: false },
            { leyenda: 'Hasta', class: 'text-center', ordenable: false, columna: 'HASTA', filtro: false },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            {
                propiedad: 'EMBALAJE', class: 'text-center px-2 tdp', style: "white-space:nowrap", formato: function (tr, obj, valor) {
                    if (valor === 1)
                        return "Bandeja";
                    if (valor === 2)
                        return "Film";
                    if (valor === 3)
                        return "Sticker";
                }
            },
            { propiedad: 'UNIDAD_MEDIDA', class: 'text-center' },
            { propiedad: 'IMPORTE', class: 'text-center' },
            {
                propiedad: 'DESDE', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                    if (valor !== null)
                        return formatoFecha(valor, 1);
                }
            },
            {
                propiedad: 'HASTA', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                    if (valor !== null)
                        return formatoFecha(valor, 1);
                }
            },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editaCosto(obj.ID_EMBALAJE);
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
                        eliminaCosto(obj.ID_EMBALAJE);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/CEmbalaje.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'PESO',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#costos").MALCO(data);
}
function cargaUnidadesMedida() {
    $("#um").empty().append('<option value=""></option>');
    $("#filtroUM").empty().append('<option value="0">Todos</option>');

    get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#um").append('<option value="' + this.id + '">' + this.um + '</option>');
                        $("#filtroUM").append('<option value="' + this.id + '">' + this.um + '</option>');

                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
}

function guardaCosto() {
    let url;
    let costo = new Object();

    costo.id = $("#idc").val();
    costo.emb = $("#emb").val();
    costo.tip = $("#tipc").val();
    costo.imp = $("#impc").val().replace('/,/g', '');
    costo.des = new Date(formatoFecha($("#dec").datepicker().fecha(), 2));
    costo.has = new Date(formatoFecha($("#hasc").datepicker().fecha(), 2));
    costo.um = $("#um").val();
    url = costo.id === "0" ? "Insertar" : "Actualizar";

    get('/ws/CEmbalaje.aspx/' + url, JSON.stringify({ info: JSON.stringify(costo) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("El registro se guardó correctamente");
                cargaCostos();
                $("#emb").val("");
                $("#tipc").val("");
                $("#impc").val("");
                $("#dec").val("");
                $("#hasc").val("");
                $("#um").val("");
                $("#canc").hide();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("no fue posible insertar la información del costo de embalaje<br />" + error, "ERROR!");
        });
}
function editaCosto(id) {
    get('/ws/CEmbalaje.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info.length > 0) {
                    $("#lista").hide();
                    $("#datos").show();
                    $("#emb").val(res.Info[0].emb);
                    $("#tipc").val(res.Info[0].tip);
                    $("#impc").val(res.Info[0].imp);
                    $("#dec").datepicker().value(new Date(formatoFecha(res.Info[0].des, 2)));
                    $("#hasc").datepicker().value(new Date(formatoFecha(res.Info[0].has, 2)));
                    $("#um").val(res.Info[0].um);
                    $("#idc").val(id);
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
}
function eliminaCosto(id) {
    get('/ws/CEmbalaje.aspx/Eliminar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                cargaCostos();
                Alerta("El registro se eliminó correctamente");
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible eliminar el costo especificado<br />" + error);
        });
}

