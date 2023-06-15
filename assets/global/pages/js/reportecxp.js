$(document).ready(function () {
    $('#bfecd').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
    $('#bfeca').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es", defaultDate: new Date, value: formatoFecha(new Date(), 1) });
    $("#divcli").hide();


    $(".gj-icon").each(function () {
            $(this).css({ "margin-top": "0" });
    });

    //radiobutton change
    $('input[type=radio][name=tiporep]').on('change', function () {
        if (this.value === "2") {
            $("#divcli").show();
        }
        else if (this.value === "3") {
            $("#divcli").show();
        }
        else if (this.value === "1") {
            $("#divcli").hide();
        }
    });

    $("#reppdf").on("click", function () {
        GeneraPDF();
    });

});

function GeneraPDF(idc, idcli) {
    var df = null;
    var hf = null;
    //if ($("#bfecd").val() !== "") {
    //    var desde = $("#bfecd").val().split("/");
    //    df = new Date(desde[2], desde[1] - 1, desde[0]);
    //}
    //if ($("#bfeca").val() !== "") {
    //    var hasta = $("#bfeca").val().split("/");
    //    hf = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    //}
    let vdesde = $('#bfecd').val();
    let vhasta = $('#bfeca').val();

    var tipo = $('input:radio[name=tiporep]:checked').val();
    var ruccli = $('#bval').val();
    get('/ws/cxp.aspx/GeneraRepPdf', JSON.stringify({ tipo: tipo, desde: vdesde,hasta:vhasta,ruccli:ruccli}))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Mensaje === "Existe") {
                    if (res.Mensaje !== "ErrorArchivo") {
                        $("#ContentReporte").empty();
                        var height = $(window).height();
                        $obj = $('<object>');
                        $obj.attr("data", '/' + res.Info);
                        $obj.attr("height", "100%");
                        $obj.attr("width", "100%");
                        $obj.attr("align", "middle");
                        $obj.attr("type", "application/pdf");
                        $("#Reportelabel").text($("#mod option:selected").text());
                        $("#ContentReporte").height(height);
                        $("#ContentReporte").html($obj);
                        $('#ModalReporte').modal();
                    }
                }
                else {
                    Alerta("Error No es posible generar el PDF");
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible generar el PDF<br />" + error);
        });
}
function exportarRV() {
    var df = null;
    var hf = null;
    //if ($("#bfecd").val() !== "") {
    //    var desde = $("#bfecd").val().split("/");
    //    df = new Date(desde[2], desde[1] - 1, desde[0]);
    //}
    //if ($("#bfeca").val() !== "") {
    //    var hasta = $("#bfeca").val().split("/");
    //    hf = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    //}
    let vdesde = $('#bfecd').val();
    let vhasta = $('#bfeca').val();

    var tipo = $('input:radio[name=tiporep]:checked').val();
    var ruccli = $('#bval').val();
    get('/ws/cxp.aspx/ExportarExcelRep', JSON.stringify({ tipo: tipo, desde: vdesde, hasta: vhasta, ruccli: ruccli }))
        .then(function (res) {
            var resp = JSON.stringify(res);
            resp = resp.replace("\"", "");
            resp = resp.replace("\"", "");
            if (resp.startsWith("Error:")) {
                Alerta(Resp, "ERROR!");
            } else {
                window.location.replace("/assets/" + resp);
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el archivo<br />" + error, "ERROR!");
        });
}
