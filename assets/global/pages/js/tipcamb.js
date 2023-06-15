$(document).ready(function () {
    cargaMonedas();
    cargaCostos();
    //validar escribir solo numeros y punto en los inputs con clase decimal
    $(".decimal").on('input', function () {
        this.value = this.value.replace(/[^0-9.]/g, '');
    });
    $('#dec').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#hasc').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });

    $(".gj-icon").css({ "margin-top": "-4px" });

    $("#canc").on("click", function () {
        $(this).hide();
        $("#idc").val("");

        $("#tipc").val("");
        $("#impc").val("");
        $("#dec").val("");
        $("#hasc").val("");
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

    //param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            
            { leyenda: 'ID_MONEDA', class: 'text-center', style: 'display:none', ordenable: false, columna: 'ID_MONEDA', filtro: false },
            { leyenda: 'MONEDA', class: 'text-center', ordenable: false, columna: 'MONEDA', filtro: false },
            { leyenda: 'Tipo', class: 'text-center', ordenable: false, columna: '', filtro: false },
            { leyenda: 'Tarifa', class: 'text-center', ordenable: false, columna: 'IMPORTE', filtro: false },
            { leyenda: 'Desde', class: 'text-center', ordenable: false, columna: 'FECHADESDE', filtro: false },
            { leyenda: 'Hasta', class: 'text-center', ordenable: false, columna: 'FECHAHASTA', filtro: false },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            { propiedad: 'ID_MONEDA', class: 'text-center', style: 'display:none' },
            { propiedad: 'MONEDA', class: 'text-center' },
            {
                propiedad: 'TIPO', class: 'text-center px-2 tdp', style: "white-space:nowrap", formato: function (tr, obj, valor) {
                    if (valor === 1)
                        return "Compra";
                    if (valor === 2)
                        return "Venta";
                }
            },
            { propiedad: 'IMPORTE', class: 'text-center' },
            {
                propiedad: 'FECHADESDE', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                    if (valor !== null)
                        return formatoFecha(valor, 1);
                }
            },
            {
                propiedad: 'FECHAHASTA', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                    if (valor !== null)
                        return formatoFecha(valor, 1);
                }
            },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editaCosto(obj.ID_TIPOCAMBIO);
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
                        eliminaCosto(obj.ID_TIPOCAMBIO);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/TipoCambio.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'TIPO',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#costos").MALCO(data);
}

function cargaMonedas() {
    $('#tipmon').empty();
    get('/ws/monedas.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#tipmon").append('<option value=""></option>');
                    $(res.Info).each(function () {
                        $("#tipmon").append('<option value="' + this.id + '">' + this.mon + '</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de monedas<br />" + error, "ERROR!");
        });
}

function guardaCosto() {
    let url;
    let costo = new Object();

    costo.id = $("#idc").val();
    costo.id_mon = $("#tipmon").val();
    costo.tip = $("#tipc").val();
    costo.imp = $("#impc").val().replace('/,/g', '');
    costo.des = new Date(formatoFecha($("#dec").datepicker().fecha(), 2));
    costo.has = new Date(formatoFecha($("#hasc").datepicker().fecha(), 2));
    url = costo.id === "0" ? "Insertar" : "Actualizar";

    get('/ws/TIPOCAMBIO.aspx/' + url, JSON.stringify({ info: JSON.stringify(costo) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("El registro se guardó correctamente");
                cargaCostos();
                $("#tipc").val("");
                $("#impc").val("");
                $("#dec").val("");
                $("#hasc").val("");
                $("#canc").hide();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("no fue posible insertar la información del tipo de cambio<br />" + error, "ERROR!");
        });
}

function editaCosto(id) {
    get('/ws/TipoCambio.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info.length > 0) {
                    $("#tipc").val(res.Info[0].tip);
                    $("#impc").val(res.Info[0].imp);
                    $("#dec").datepicker().value(new Date(formatoFecha(res.Info[0].des, 2)));
                    $("#hasc").datepicker().value(new Date(formatoFecha(res.Info[0].has, 2)));
                    $("#idc").val(id);
                    $("#canc").show();
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
}

function eliminaCosto(id) {
    get('/ws/TipoCambio.aspx/Eliminar', JSON.stringify({ id: id }))
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
            Alerta("No fue posible eliminar el tipo de cambio<br />" + error);
        });
}


