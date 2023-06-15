$(function () {
    $("#anexo").fileupload({
        url: '/hdlr/excel.ashx?upload=start',
        add: function (e, data) {
            if (data.files.length > 0) {
                $('#pgrLogoD').width("5%");
                $('#pgrLogo').show();
                //$('#pgrLogoD').width("0%");

                $('#pgrLogoD').css('width', 0 + '%').attr('aria-valuenow', 0);
                data.submit();
            }
            else {
                bootbox.alert("No se ha seleccionado un archivo para cargar");
            }

        },
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            if (progress >= 100) {
                progress = 100;
                $("#msg").show();
            }
            $("#porLogo").text(progress + '%');
            $('#pgrLogoD').css('width', progress + '%').attr('aria-valuenow', progress);
        },
        success: function (response, status) {
            //$('#pgrLogo').hide();
            $('#lblMsg').show();
            $("#loading").show();
            $("#msg").hide();
            if (status === "success") {
                res = JSON.parse(response);
                //res.Datos.filter(edo => edo.F24 ==="TAMAULIPAS")
                if (res.Respuesta === 1) {
                    let mymap = new Array()
                    let estados = res.Datos.filter(edo => {
                        const val = edo.Estado;
                        if (val) {
                            if (!mymap.includes(val.toUpperCase().trim()) && val.toLowerCase().trim() !== "estado") {
                                mymap.push(val.toUpperCase().trim());
                                return true;
                            } else {
                                return false;
                            }
                        }
                        mymap.push(value.toUpperCase().trim());
                        return true;
                    });

                    $.each(mymap.sort(), function () {
                        let fila = $("#edos tbody")[0].insertRow();
                        let cel1 = fila.insertCell(0);
                        let cel2 = fila.insertCell(1);
                        let estados = document.createElement('select');
                        estados.innerHTML = $("#nomedos").html();
                        estados.value = capitalCase(this);
                        $(estados).on("change", function () {
                            if ($(this).val() !== undefined || $(this).val().trim() !== "")
                                $(this).removeClass("has-error");
                        })
                        $(cel1).addClass("text-left align-middle");
                        cel1.appendChild(document.createTextNode(this));
                        $(estados).addClass("form-control nombresedos");
                        $(estados).attr("nombrexls", this.toString());
                        cel2.appendChild(estados);
                    })

                    $("#documento").val(res.Mensaje);
                    $("#documento").trigger("change");

                    $("#forma").hide();

                    $("#datos").val(JSON.stringify(res.Datos));

                    $("#confirma").show();
                }
                else {
                    Alerta(res.Mensaje, "ERROR!", typIconoAlerta.error);
                }
                $('#pgrLogo').hide();
            }

            $('#lblMsg').hide();
            $("#loading").hide();
        },
        error: function (error) {
            $("#porLogo").text("");
            $('#pgrLogo').hide();
            bootbox.alert("no fue posible subir el archivo al servidor\n");
        }
    });
});
