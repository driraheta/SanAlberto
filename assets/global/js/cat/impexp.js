let ddimpexp = "";

$(document).ready(function () {
    $("#tip").append("<option value='5'>Agencia de Aduana</option>");

    $("#agre").on("click", function () {
        if (valForm("exporta")) {
            let id;
            let pre;
            let fila;

            id = $("#tipos tbody tr").length;
            pre = "info";


            fila = '<tr id="f' + pre + id + '">' + '<td class="text-left" style="display: none">' + $("#tip").val() + '</td>' +
                '<td class="text-left">' + $('#tip option:selected').text().trim() + '</td>' +
                '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina tipo"></i></td>' +
                '</tr>';


            $("#tipos tbody").append(fila);
            fila = $("#tipos tr:last");

            $(fila).css({ "cursor": "pointer" });
            $("#b" + pre + id).on("click", function () {
                Swal.fire({
                    title: 'Confirmación',
                    html: '¿Confirma que desea eliminar el registro <b>' + $("#n" + pre + id).text() + '</b>?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#1cc88a',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Si, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        $("#f" + pre + id).remove();
                    }
                });
            });

        }
    });
    $("#guaex").on("click", function () {
        if (valForm("exporta")) {
            guardaExpImp(1);
        }
    });
    $("#guaim").on("click", function () {
        if (valForm("importa")) {
            guardaExpImp(2);
        }
    });

    $("#agretipo").on("click", function () {
        agregaTipoImpExp();
    });


    $("#canex").on("click", function () {
        Swal.fire({
            html: '¿Confirma que desea cancelar la edición?',
            title: 'Confirmación',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí'
        }).then((result) => {
            if (result.value) {
                $("#exporta").modal("toggle");
            }
        })
    });
    //Metodos al dar de alta el proveedor
    $("#ncont").on("click", function () {
        $("#mcontacto").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mcontacto');
    });
    $("#agrcont").on("click", function () {
        if (valForm("mcontacto")) {
            let id;
            let pre;
            let fila;


            id = $("#contactos tbody tr").length;
            pre = "infoc";


            fila = '<tr id="f' + pre + id + '">' + '<td class="text-right">' + $("#nomc").val() + '</td>' +
                '<td class="text-right">' + $("#telc").val() + '</td>' +
                '<td class="text-right">' + $("#corrc").val() + '</td>' +
                '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina contacto"></i></td></tr>';


            $("#contactos tbody").append(fila);
            fila = $("#contactos tr:last");

            $(fila).css({ "cursor": "pointer" });
            $("#b" + pre + id).on("click", function () {
                Swal.fire({
                    title: 'Confirmación',
                    html: '¿Confirma que desea eliminar el contacto <b>' + $("#n" + pre + id).text() + '</b>?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#1cc88a',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Si, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        $("#f" + pre + id).remove();
                    }
                });
            });

        }
    });
    $("#cancont").on("click", function () {
        $("#mcontacto").modal("toggle");
        limpiaControles('mcontacto');
    });
});

function guardaExpImp(tip) {
    let tipo;

    tipo = tip === 1 ? " exportador " : " importador ";

    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el exportador <b>' + $("#razs").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            let exp = new Object();
            let detalle = new Array();
            let exportador = new Object();
            let tipos = new Array();
           
            exp.tipodoc = $("#tde").val();
            exp.status = $("#status").val();
            exp.razs = $("#razs").val();
            exp.ruc = $("#ruc").val();
            exp.razc = $("#razc").val();
            exp.dirf = $("#dirf").val();
            exp.dirc = $("#dirc").val();
            exp.idubi = $("#ubi").val();
            exp.est = 1;

            let i = 1;
            $.each($("#contactos tbody tr"), function () {
                let det = new Object();
                det.nom = this.cells[0].innerText;
                det.tel = this.cells[1].innerText;
                det.cor = this.cells[2].innerText;
                detalle.push(det);
            });

            $.each($("#tipos tbody tr"), function () {
                let tip = new Object();
                tip.tip = this.cells[0].innerText;
                tipos.push(tip);
            });

            exportador.exp = exp;
            exportador.det = detalle;
            exportador.tip = tipos;

            get("/ws/exportadores.aspx/InsertarAll", JSON.stringify({ info: JSON.stringify(exportador) }))
                .then(function (res) {
                    if (res.Respuesta === 1) {
                        Alerta("El exportador se agregó correctamente");
                        if (tip === 1) {
                            cargaExportadores($("#exp").val());
                            cargaImportadores($("#imp").val());
                            cargaProvedorAgenciaAduana($("#aduana").val());
                            lstExportadoresTipoImportadorAndExportador();
                            limpiaControles('exporta');
                            $("#exporta").modal("toggle");

                            $("#exp").focus();
                        }
                        else {
                            cargaExportadores(res.Info.id);
                            cargaImportadores(res.Info.id);
                            cargaProvedorAgenciaAduana(res.Info.id);
                            lstExportadoresTipoImportadorAndExportador();
                            limpiaControles('importa');

                            $("#importa").modal("toggle");
                            $("#imp").focus();
                        }
                    }
                    else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                })
                .catch(function (res) {
                    Alerta("No fue posible insertar el exportador<br />" + res, "Error!", typIconoAlerta.error);
                });
        }
    });
}

function cargaImportadores(imp1 = "") {
    let imp = new Object();
    imp.id = 0;
    imp.tip = 2;

    get('/ws/exportadores.aspx/ConsultarE', JSON.stringify({ info: JSON.stringify(imp) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#imp").empty().append('<option value=""></option>');
                    $("#impv").empty().append('<option value=""></option>');

                    $.each(res.Info, function () {
                        //agregado para listar por id
                        if (this.status == 1) {
                            $("#imp").append('<option ruc="' + this.ruc + '" value="' + this.id + '">' + this.razs + '</option>');
                            $("#impv").append('<option ruc="' + this.ruc + '" value="' + this.id + '">' + this.razs + '</option>');
                        }  });
                    $("#imp").val(imp1);
                    $("#imp").trigger('change');
                    $("#impv").val(imp1);
                    $("#impv").trigger('change');
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (res) {
            Alerta(res.Mensaje, "ERROR!");
        });

}

function cargaExportadores(exp1 = "") {
    let exp = new Object();
    exp.id = 0;
    exp.tip = 1;

    get('/ws/exportadores.aspx/ConsultarE', JSON.stringify({ info: JSON.stringify(exp) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#exp").empty().append('<option value=""></option>');
                    $("#expv").empty().append('<option value=""></option>');
                    $.each(res.Info, function () {
                        //Corrección para que no se muestre el ruc en exportador
                        $("#exp").append('<option  idproveedor="' + this.id + '" tipoDoc = "' + '" value="' + this.id + '">' + this.razs + '</option>');
                        $("#expv").append('<option idproveedor="' + this.id + '" tipoDoc = "' + this.tipodoc +'"  ruc="' + this.ruc + '" value="' + this.id + '">' + this.ruc + ' ' + this.razs + '</option>');
                        $("#idproe").append('<option idproveedor="' + this.id + '" tipoDoc = "' + this.tipodoc +'"  ruc="' + this.ruc + '" value="' + this.id + '">' + this.ruc + ' ' + this.razs + '</option>');
                    });
                    $("#exp").val(exp1);
                    $("#exp").trigger('change');
                    $("#expv").val(exp1);
                    $("#expv").trigger('change');
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (res) {
            Alerta(res.Mensaje, "ERROR!");
        });
}

/*LISTA DE PROVEEDORES AGENCIA ADUANA */
function cargaProvedorAgenciaAduana(imp1 = "") {
    let imp = new Object();
    imp.id = 0;
    imp.tip = 5;
    get('/ws/exportadores.aspx/ConsultarE', JSON.stringify({ info: JSON.stringify(imp) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#aduana").empty().append('<option value=""></option>');
                    $("#aduanav").empty().append('<option value=""></option>');

                    $.each(res.Info, function () {
                        //agregado para listar por id
                        if (this.status == 1) {
                            $("#aduana").append('<option ruc="' + this.ruc + '" value="' + this.id + '">' + this.razs + '</option>');
                            $("#aduanav").append('<option ruc="' + this.ruc + '" value="' + this.id + '">' + this.razs + '</option>');
                        }
                    });
                    $("#aduana").val(imp1);
                    $("#aduana").trigger('change');
                    $("#aduanav").val(imp1);
                    $("#aduanav").trigger('change');
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (res) {
            Alerta(res.Mensaje, "ERROR!");
        });

}

function lstExportadoresTipoImportadorAndExportador() {
    console.log("si");
    get('/ws/exportadores.aspx/ListarExportadoresTipoImportadorAndExportador')
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#idpro").empty().append('<option value=""></option>');
                    //cambio F
                    $("#idproe").empty().append('<option value=""></option>');
                    $.each(res.Info, function () {
                        $("#idpro").append('<option idproveedor="' + this.id + '" tipoDoc = "' + this.tipodoc + '"  ruc="' + this.ruc + '" value="' + this.id + '">' + this.ruc + ' ' + this.razs + '</option>');
                        $("#idproe").append('<option idproveedor="' + this.id + '" tipoDoc = "' + this.tipodoc + '"  ruc="' + this.ruc + '" value="' + this.id + '">' + this.ruc + ' ' + this.razs + '</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (res) {
            Alerta(res.Mensaje, "ERROR!");
        });
}

function agregaTipoImpExp() {
        let id;
        let pre;
        let fila;

        id = $("#tipos tbody tr").length;
        pre = "infoo";


        fila = '<tr id="f' + pre + id + '">' + '<td class="text-left" style="display: none">' + $("#tip").val() + '</td>' +
            '<td class="text-left">' + $('#tip option:selected').text().trim() + '</td>' +
            '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina tipo"></i></td>' +
            '</tr>';


        $("#tipos tbody").append(fila);
        fila = $("#tipos tr:last");

        $(fila).css({ "cursor": "pointer" });
        $("#b" + pre + id).on("click", function () {
            Swal.fire({
                title: 'Confirmación',
                html: '¿Confirma que desea eliminar el registro <b>' + $("#n" + pre + id).text() + '</b>?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    $("#f" + pre + id).remove();
                }
            });
        });
}