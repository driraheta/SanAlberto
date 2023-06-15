$(function () {
    $("#anexo").fileupload({
        url: '/hdlr/AnexoUploadHandler.ashx?upload=start',
        add: function (e, data) {
            //$(this).prop("disabled", true);
            if (data.files.length > 0) {
                $('#pgrLogoD').width("5%");
                $('#pgrLogo').show();
                $('#pgrLogoD').width("0%");

                $('#pgrLogoD').css('width', 0 + '%').attr('aria-valuenow', 0);
                data.submit();
            }
            else {
                Alerta("No se ha seleccionado un archivo para cargar", "ERROR!");
            }

        },
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $("#porLogo").text(progress + '%');
            $('#pgrLogoD').css('width', progress + '%').attr('aria-valuenow', progress);

            if (progress >= 100) {
                $('#pgrLogo').hide();
                $('#lblMsg').show();
                $("#loading").show();
            }
        },
        success: function (response, status) {
            if (status === "success") {
                if ($("#msgArchivo").attr("archivo") === undefined)
                    $("#msgArchivo").attr("archivo", "");

                res = JSON.parse(response);
                if (res.Respuesta === 1) {
                    var id = $("#archs tbody tr").length;

                    if (id < 10) {
                        $("#archs tbody").append('<tr><td class="text-left">' + res.Mensaje + '</td><td><i class="fa fa-trash text-danger" title="Eliminar archivo" id="arch' + id + '" style="cursor:pointer"></td></tr>');

                        $("#arch" + id).on("click", function () {
                            $(this).parent().parent().remove();

                            let filas = 0;
                            $("#archs tbody tr").each(function () {
                                this.cells[1].childNodes[0].id = "arch" + filas;
                            })
                        });
                    }
                    else {
                        Alerta("Se ha excedido el límite de archivos","AVISO!");
                    }
                }
                else {
                    Alerta("No fue posible procesar el archivo<br/>" + res.Mensaje, "ERROR!");
                }
            }

            $('#lblMsg').hide();
            $("#loading").hide();
        },
        error: function (error) {
            $('#pgrLogo').hide();
            Alerta("no fue posible subir el archivo al servidor<br />" + error, "ERROR!");
        }
    });
});
