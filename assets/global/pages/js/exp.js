(function ($) {
    $(document).ready(function () {
        cargaProveedores();
        cargaUbigeos();

        $("#accordionSidebar").addClass("toggled");

        $('.fecha').each(function () {
            $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        });

        $(".gj-icon").each(function () {
            if ($(this).parent().parent().parent().parent()[0].id === "busqueda") {
                $(this).css({ "margin-left": "-2px", "margin-top": "-5px" }).parent().height("17px").css({ "margin-left": "-7px", "margin-right": "10px" }).hide();
            }
            else {
                $(this).css({ "margin-top": "0" });
            }
        });

        $("#bus").on("click", function () {
            let param = new Object();

            if ($("#opc").val() === "") {
                cargaProveedores();
            }
            else {
                if ($("#opc").val() === "1") {
                    param.ruc = $("#bruc").val().trim();
                }
                else if ($("#opc").val() === "2") {
                    param.razc = $("#brc").val();
                }
                else if ($("#opc").val() !== "") {
                    param.razs = $("#brs").val().trim();                    
                }

                cargaProveedores(param);
            }
        });

        $("#opc").on("change", function () {
            $("#bruc").hide();
            $("#brc").hide();
            $("#brs").hide();
            $(".gj-icon").parent().hide();

            if ($(this).val() === "1") {
                $("#bruc").show();
            }
            else if ($(this).val() === "2") {
                $("#brc").show();
            }
            else if ($(this).val() === "3") {
                $("#brs").show();
            }
        });
        $("#nue").on("click", function () {
            limpiaPantalla();
            $("#lista").hide();
            $("#datos").show();
            $("#gua").prop("disabled", false);
            $("#actex").hide();
            $("#exptipos tbody").empty();
            $("#contactosE tbody").empty();
        });
        $("#can").on("click", function () {
            limpiaPantalla();
            $("#lista").show();
            $("#datos").hide();
        });
        $("#guaex").on("click", function () {
            if (valForm("datos")) {
                guardaExportador();
            }
        });
        $("#agrcont").on("click", function () {
            if (valForm("mcontacto")) {
                let id;
                let pre;
                let fila;


                id = $("#contactosE tbody tr").length;
                pre = "info";


                fila = '<tr id="f' + pre + id + '">' + '<td class="text-right">' + $("#nomc").val() + '</td>' +
                    '<td class="text-right">' + $("#telc").val() + '</td>' +
                    '<td class="text-right">' + $("#corrc").val() + '</td>' +
                    '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina contacto"></i></td></tr>';


                    $("#contactosE tbody").append(fila);
                fila = $("#contactosE tr:last");

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
        $("#ncont").on("click", function () {
            $("#mcontacto").modal({ backdrop: 'static', keyboard: false });
            limpiaControles('mcontacto');
        });
        $("#cancont").on("click", function () {
            $("#mcontacto").modal("toggle");
            limpiaControles('mcontacto');
        });
        $("#agre").on("click", function () {
            agregaTipoProveedor();
        });
        $("#actex").on("click", function () {
            if (valForm("datos")) {
                EditaExportador();
            }
        });

    });

    function agregaTipoProveedor() {
        if (!validaTipoProveedor()) {
            Alerta("El tipo ya está registrado", "AVISO");
            return;
        }

        if ($("#tip").val() === "") return;

        if (valForm("datos")) {
            let id;
            let pre;
            let fila;

            id = $("#exptipos tbody tr").length+1;
            pre = "infot";


            fila = '<tr id="ft' + pre + id + '">' + '<td class="text-left" style="display: none">' + $("#tip").val() + '</td>' +
                '<td class="text-left">' + $('#tip option:selected').text().trim() + '</td>' +
                '<td class="text-center"><i id="bt' + pre + id + '" class="fa fa-trash text-danger" title="Elimina tipo"></i></td>' +
                '</tr>';


            $("#exptipos tbody").append(fila);
            fila = $("#exptipos tr:last");

            $(fila).css({ "cursor": "pointer" });
            $("#bt" + pre + id).on("click", function () {
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
                        $("#ft" + pre + id).remove();
                    }
                });
            });

        }

    }
    function validaTipoProveedor() {
        let tiposelected = $("#tip").val();
        let resultado = true;
        $.each($("#exptipos tbody tr"), function () {
            let tip = this.cells[0].innerText;
            if (tip === tiposelected) {
                resultado = false;
                return false;
            } 
        });
        return resultado;
    }

    function cargaProveedores(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-hover table-responsive',
            columnas: [
                { leyenda: 'RUC', class: 'text-center ', ordenable: false, columna: 'RUC', filtro: true },
                { leyenda: 'Razón Social', class: 'text-center ', style: 'white-space:nowrap', ordenable: false, columna: 'RAZON_SOCIAL', filtro: true },
                { leyenda: 'Estado', class: 'text-center ', ordenable: false, columna: '', filtro: false },
                { leyenda: '', class: 'text-center ', style: 'color:#fff; width:75px"', ordenable: false, filtro: false, columna: '' },
                { leyenda: '', class: 'text-center ', style: 'color:#fff; width:75px"', ordenable: false, filtro: false, columna: '' }
            ],
            modelo: [
                { propiedad: 'RUC', class: 'text-center ' },
                { propiedad: 'RAZON_SOCIAL', class: 'text-center ' },
                {
                    propiedad: 'STATUS', style: 'white-space:nowrap', class: 'text-center', formato: function (tr, obj, value) {

                        if (value === 1)
                            return "Activo";
                        if (value === 2)
                            return 'Inactivo';
                    }
                }, {
                    propiedad: '', class: 'text-center', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");

                        $(edita).addClass("fa fa-edit").prop("title", "Editar Proveedores").on("click", function () {
                            editarExportador(obj.ID_EXPORTADOR);
                        });
                        container.appendChild(edita);

                        return container;
                    }
                },
                {
                    propiedad: '', class: 'text-center', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");
                        eliminar = document.createElement("i");

                        $(edita).addClass("fa fa-edit").prop("title", "Editar Proveedores").on("click", function () {
                            editarExportador(obj.ID_REGISTRO);
                        });
                        $(eliminar).addClass("fa fa-trash").prop("title", "Elimina Proveedores").on("click", function () {
                            eliminaExportador(obj.ID_EXPORTADOR, obj.RAZON_SOCIAL);
                        });
                        //container.appendChild(edita);
                        container.appendChild(eliminar);

                        return container;
                    }
                }
            ],
            url: '/ws/exportadores.aspx/Listar',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'RUC',
            loader: "pre0",
            columna_orden: 'DESC'
        };

        $("#proveedores").MALCO(data);
    }
    function eliminaExportador(id, nom) {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea eliminar el registro <b>' + nom + '</b>?',
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
                return fetch(`/ws/exportadores.aspx/Eliminar`, {
                    method: 'POST', body: JSON.stringify({ info: JSON.stringify(info) }), headers: { 'Content-Type': 'application/json' }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                let res = JSON.parse(result.value.d);
                if (res.Respuesta === 1) {
                    Alerta("El registro se eliminó correctamente");
                    cargaProveedores();
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            }
        })
    }
    function limpiaPantalla() {
        limpiaControles("datos");
        $("#gua").show();
    }
    function guardaExportador(opc) {
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

                exp.razs = $("#razs").val();
                exp.ruc = $("#ruc").val();
                exp.razc = $("#razc").val();
                exp.dirf = $("#dirf").val();
                exp.dirc = $("#dirc").val();
                exp.est = 1;
                exp.idubi = $("#ubi").val();
                exp.tipodoc = $("#td").val();
                exp.status = $("#status2").val();

                let i = 1;
                $.each($("#contactosE tbody tr"), function () {
                    let det = new Object();
                    det.nom = this.cells[0].innerText;
                    det.tel = this.cells[1].innerText;
                    det.cor = this.cells[2].innerText;
                    detalle.push(det);
                });

                $.each($("#exptipos tbody tr"), function () {
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
                            limpiaControles('datos');
                            $("#lista").show();
                            $("#datos").hide();
                            $("#exptipos tbody").empty();
                            $("#contactosE tbody").empty();
                            /*prueba*/
                            detalle = new Array();
                            tipos = new Array();
                            cargaProveedores();
                        }
                        else {
                            Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                        }
                    })
                    .catch(function (res) {
                        Alerta("No fue posible insertar el exportador<br />" + res, "Error!", typIconoAlerta.error);
                    })
            }
        })
    }
    function cargaUbigeos() {
        get('/ws/ubigeos.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#ubi").append('<option value="' + this.id + '">' + this.ubi + '</option>');
                        })
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de ubigeos<br />" + error, "ERROR!");
            })
    }
    function editarExportador(id) {
        get('/ws/exportadores.aspx/Editar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        limpiaPantalla();
                        $("#lista").hide();
                        $("#datos").show();
                        $("#actex").show();
                        $("#guaex").hide();

                        $("#id").val(res.Info.export.id);
                        $("#razs").val(res.Info.export.razs);
                        $("#ruc").val(res.Info.export.ruc);
                        $("#razc").val(res.Info.export.razc);
                        $("#dirf").val(res.Info.export.dirf);
                        $("#dirc").val(res.Info.export.dirc);
                        $("#ubi").val(res.Info.export.idubi);
                        $("#td").val(res.Info.export.tipodoc);
                        $("#status2").val(res.Info.export.status);

                        $("#contactosE tbody").empty();
                        $("#exptipos tbody").empty();

                        let id;
                        let idt;
                        let pre,pret;
                        let fila,filat;


                        pre = "info";
                        pret = "infot";
                        $.each(res.Info.cont, function (i) {
                            id = $("#contactosE tbody tr").length;

                            fila = '<tr id="f' + pre + i + '">' + '<td class="text-right">' + this.nom + '</td>' +
                                '<td class="text-right">' + this.tel + '</td>' +
                                '<td class="text-right">' +this.cor+ '</td>' +
                                '<td class="text-center"><i id="b' + pre + i + '" class="fa fa-trash text-danger" title="Elimina contacto"></i></td></tr>';

                            $("#contactosE tbody").append(fila);

                            fila = $("#contactosE tr:last");

                            $(fila).css({ "cursor": "pointer" });

                            $("#b" + pre + i).on("click", function () {
                                Swal.fire({
                                    title: 'Confirmación',
                                    html: '¿Confirma que desea eliminar el contacto <b>' + $("#n" + pre + i).text() + '</b>?',
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#1cc88a',
                                    cancelButtonColor: '#6c757d',
                                    confirmButtonText: 'Si, eliminar',
                                    cancelButtonText: 'Cancelar'
                                }).then((result) => {
                                    if (result.value) {
                                        $("#f" + pre + i).remove();
                                    }
                                });
                            });
                        });

                        $.each(res.Info.tipo, function () {
                            idt = $("#exptipos tbody tr").length+1;

                            $("#tip").val(this.tip);
                            filat = '<tr id="ft' + pret + idt + '">' + '<td class="text-left" style="display: none">' + $("#tip").val() + '</td>' +
                                '<td class="text-left">' + $('#tip option:selected').text().trim() + '</td>' +
                                '<td class="text-center"><i id="bt' + pret + idt + '" class="fa fa-trash text-danger" title="Elimina Tipo"></i></td></tr>';


                            $("#exptipos tbody").append(filat);
                            filat = $("#exptipos tr:last");

                            $(filat).css({ "cursor": "pointer" });
                            $("#bt" + pret + idt).on("click", function () {
                                Swal.fire({
                                    title: 'Confirmación',
                                    html: '¿Confirma que desea eliminar el registro <b>' + $("#n" + pret + id).text() + '</b>?',
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#1cc88a',
                                    cancelButtonColor: '#6c757d',
                                    confirmButtonText: 'Si, eliminar',
                                    cancelButtonText: 'Cancelar'
                                }).then((result) => {
                                    if (result.value) {
                                        $("#ft" + pret + idt).remove();
                                    }
                                });
                            });
                        });
                        $("#tip").val("");

                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta(error, "ERROR!");
            });
    }
    function EditaExportador() {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea actualizar el exportador <b>' + $("#razs").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let exp = new Object();
                let contactos = new Array();
                let exportador = new Object();
                let tipos = new Array();
                exp.id = $("#id").val();
                exp.razs = $("#razs").val();
                exp.ruc = $("#ruc").val();
                exp.razc = $("#razc").val();
                exp.dirf = $("#dirf").val();
                exp.dirc = $("#dirc").val();
                exp.est = 1;
                exp.idubi = $("#ubi").val();
                exp.tipodoc = $("#td").val();
                exp.status = $("#status2").val();

                let i = 1;
                $.each($("#contactosE tbody tr"), function () {
                    let contacto = new Object();
                    contacto.idexp = $("#id").val();
                    contacto.nom = this.cells[0].innerText;
                    contacto.tel = this.cells[1].innerText;
                    contacto.cor = this.cells[2].innerText;
                    contactos.push(contacto);
                });

                $.each($("#exptipos tbody tr"), function () {
                    let tip = new Object();
                    tip.idexptip = $("#id").val();
                    tip.tip = this.cells[0].innerText;
                    tipos.push(tip);
                });

                exportador.exp = exp;
                exportador.det = contactos;
                exportador.tip = tipos;

                get("/ws/exportadores.aspx/Edita", JSON.stringify({ info: JSON.stringify(exportador) }))
                    .then(function (res) {
                        if (res.Respuesta === 1) {
                            Alerta("El exportador se actualizo correctamente");
                            limpiaControles('datos');
                            $("#lista").show();
                            $("#datos").hide();
                            $("#exptipos tbody").empty();
                            $("#contactosE tbody").empty();

                            cargaProveedores();
                        }
                        else {
                            Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                        }
                    })
                    .catch(function (res) {
                        Alerta("No fue posible insertar el exportador<br />" + res, "Error!", typIconoAlerta.error);
                    })
            }
        })
    }


})(jQuery);