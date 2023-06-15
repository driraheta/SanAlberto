$(document).ready(function () {
    $('#bfecd').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#bfeca').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    cargaClientes("#bcli");
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
    if ($("#bfecd").val() !== "") {
        var desde = $("#bfecd").val().split("/");
        df = new Date(desde[2], desde[1] - 1, desde[0]);
    }
    if ($("#bfeca").val() !== "") {
        var hasta = $("#bfeca").val().split("/");
        hf = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    }
    var tipo = $('input:radio[name=tiporep]:checked').val();
    var ruccli = $('#bval').val();
    var idcli = $('#bcli').val() == "" ? "0" : $('#bcli').val(); 
    get('/ws/cuentasporcobrar.aspx/GeneraRepPdf', JSON.stringify({ tipo: tipo, desde: df,hasta:hf ,ruccli:ruccli, idcli: idcli}))
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
    if ($("#bfecd").val() !== "") {
        var desde = $("#bfecd").val().split("/");
        df = new Date(desde[2], desde[1] - 1, desde[0]);
    }
    if ($("#bfeca").val() !== "") {
        var hasta = $("#bfeca").val().split("/");
        hf = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    }
    var vtipo = $('input:radio[name=tiporep]:checked').val();
    var vruccli = $('#bval').val();
    var vidcli = $('#bcli').val() == "" ? "0" : $('#bcli').val(); 
    var vserie = $('#serieVal').val();
    var vnumero = $('#numeroVal').val();
    get('/ws/cuentasporcobrar.aspx/ExportarExcelRep', JSON.stringify({ tipo: vtipo, desde: df, hasta: hf, ruccli: vruccli, idcli: vidcli, serie: vserie, numero: vnumero }))
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
}
