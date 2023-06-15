

function exportarReporte() {
    var df = null;
    var hf = null;
    if ($("#bfecd").val() !== "") {
        //if ($("#bfeca").val() !== "") {
        //    if ($("#bfecd").val() !== "") {
        var desde = $("#bfecd").val().split("/");
        df = new Date(desde[2], desde[1] - 1, desde[0]);
    }
    if ($("#bfeca").val() !== "") {
        var hasta = $("#bfeca").val().split("/");
        hf = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    }
    get('/ws/RegVtas.aspx/ExportarExcelRepVENVSCOST', JSON.stringify({ fechaIni: df, fechaFin: hf }))
        .then(function (res) {
            var resp = JSON.stringify(res);
            resp = resp.replace("\"", "");
            resp = resp.replace("\"", "");
            if (resp.startsWith("Error:")) {
                Alerta(resp, "ERROR!");
            } else {
                window.location.replace("/assets/" + resp);
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el archivo<br />" + error, "ERROR!");
        });
    //} else {
    //    Alerta("NDebe de Ingresar la fecha hasta", "ERROR!");
    //}
    //} else {
    //    Alerta("NDebe de Ingresar la fecha desde", "ERROR!");
    //}
}

function cargaEspecies() {
    get('/ws/especies.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $(res.Info).each(function () {
                    $("#esp").append('<option value="' + this.id + '">' + this.esp + '</option>');
                });
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

$(document).ready(function () {
    $('#bfecd').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#bfeca').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });

    let fecha = new Date();
    $("#bfeca").datepicker().value(fecha);
    fecha = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    $("#bfecd").datepicker().value(fecha);

    $(".gj-icon").each(function () {
        $(this).css({ "margin-top": "0" });
    });

    $('#btnExportarExcel').on('click', function myfunction() {
        if ($("#bfecd").val() !== "") {
            if ($("#bfeca").val() !== "") {
                //var id = $("#nomp option:selected").val();
                //var edo = $("#edo").val();

                //ExportarExcel(id, edo);
                exportarReporte();
            } else {
                Alerta("NDebe de Ingresar la fecha hasta", "ERROR!");
            }
        } else {
            Alerta("NDebe de Ingresar la fecha desde", "ERROR!");
        }
    });

});
