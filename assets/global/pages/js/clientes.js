
$(document).ready(function () {
    cargaContactos();
    cargaUbigeos();
    cargaClientes();

    //validar escribir solo numeros en los inputs con clase numeros
    $(".numeros").on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    //validar escribir solo numeros y punto en los inputs con clase decimal
    $(".decimal").on('input', function () {
        this.value = this.value.replace(/[^0-9.]/g, '');
    });

    $("#nue").on("click", function () {
        limpiaControles('mcliente');
        $("#dirllegada tbody").empty();
        $("#tblcont tbody").empty();

        $("#id").val("");
        $("#mcliente").modal({ backdrop: 'static', keyboard: false });
    });

    $("#nuecon").on("click", function () {
        $("#mclicon").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mclicon');
    });

    $("#opc").on("change", function () {
        $("#bval").hide();
        $("#bedo").hide();
        $(".gj-icon").parent().hide();

        if ($(this).val() === "3") {
            $("#bedo").show();
        }
        else if ($(this).val() !== "") {
            $("#bval").show();
        }
    });
    $("#bus").on("click", function () {
        let param = new Object();

        if ($("#opc").val() === "") {
            cargaClientes();
        }
        else {
            if ($("#opc").val() === "3") {
                param.status = $("#bedo").val();
            }
            else if ($("#opc").val() !== "") {

                if ($("#opc").val() === "1")
                    param.nom = $("#bval").val().trim();

                if ($("#opc").val() === "2")
                    param.numdoc = $("#bval").val().trim();
            }

            cargaClientes(param);
        }
    });
    $("#cancli").on("click", function () {
        $("#mcliente").modal("toggle");
        limpiaControles('mcliente');
        $("#dirllegada tbody").empty();
        $("#tblcont tbody").empty();
    });
    $("#candlleg").on("click", function () {
        $("#mdirlleg").modal("toggle");
    });
    $("#guadirlleg").on("click", function () {
        if (valForm("mdirlleg")) {
            let id;
            let pre;
            let fila;


            id = $("#dirllegada tbody tr").length;
            pre = "info";


            fila = '<tr id="f' + pre + id + '">' +
                '<td class="text-right">' + $("#descdlleg").val() + '</td>' +
                '<td class="text-right">' + $("#puestodlleg").val() + '</td>' +

                '<td class="text-center"><i id="e' + pre + id + '" class="fa fa-edit" title="Editar"></i>&nbsp;&nbsp;<i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Eliminar"></i></td></tr>';

            $("#dirllegada tbody").append(fila);
            fila = $("#dirllegada tr:last");

            $(fila).css({ "cursor": "pointer" });
            $("#e" + pre + id).on("click", function () {
                var result = [];
                var i = 0;

                $("#mdirllege").modal({ backdrop: 'static', keyboard: false });
                limpiaControles('mdirllege');
                $(this).closest('td').siblings().each(function () {
                    result[i] = $(this).text();
                    ++i;
                });
                $("#tdid").val("#f" + pre + id);
                $("#descdllege").val(result[0]);
                $("#puestodllege").val(result[1]);
            });
            $("#b" + pre + id).on("click", function () {
                Swal.fire({
                    title: 'Confirmación',
                    html: '¿Confirma que desea eliminar el producto <b>' + $("#n" + pre + id).text() + '</b>?',
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
                })
            });



            $("#descdlleg").val("");
            $("#puestodlleg").val("");

        }
    });
    $("#agrdirllege").on("click", function () {
        var rowid = $("#tdid").val();
        $(rowid).find('td').eq('0').html($("#descdllege").val());
        $(rowid).find('td').eq('1').html($("#puestodllege").val());
        $("#mdirllege").modal("toggle");
        $("#descdllege").val("");
        $("#puestodllege").val("");
    });
    $("#candllege").on("click", function () {
        $("#mdirllege").modal("toggle");
    });
    $("#ndirlleg").on("click", function () {
        $("#mdirlleg").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mdirlleg');
    });
    $("#guacli").on("click", function () {
        if (valForm("mcliente")) {
            if ($("#id").val() === "")
                guardaCliente();
            else
                ActualizarCliente();
        }
    });
    $("#ncont").on("click", function () {
        $("#mcont").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mcont');
    });
    $("#cancont").on("click", function () {
        $("#mcont").modal("toggle");
    });
    $("#agrcont").on("click", function () {
        guardarcontacto();
    });
    $('#numdoc').blur(function () {
        console.log($("#id").val());
        if ($("#id").val() === "") {
            cargaCliente($("#numdoc").val());
        }
    });

    //Agregar contactos
    $("#agrcon").on("click", function () {
        if (valForm("mclicon")) {
            let id;
            let pre;
            let fila;

            id = $("#tblcont tbody tr").length;
            pre = "info";


            fila = '<tr id="f' + pre + id + '">' + '<td class="text-right" style="display: none">' + $("#contcli").val() + '</td>' +
                '<td class="text-right">' + $('#contcli option:selected').text().trim() + '</td>' +
                '<td class="text-right">' + $('#lincrecon').val().trim() + '</td>' +
                '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Eliminar"></i></td></tr>';

            $("#tblcont tbody").append(fila);
            fila = $("#tblcont tr:last");

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
                        actualizaLinCreCliente();
                    }
                })
            });
            actualizaLinCreCliente();
        }
    });
    $("#cancon").on("click", function () {
        $("#mclicon").modal("toggle");

    });

    //Control de modales
    $('#mclicon').on('hidden.bs.modal', function (e) {
        $('body').addClass('modal-open');
    });
    $('#mdirlleg').on('hidden.bs.modal', function (e) {
        $('body').addClass('modal-open');
    });
    $('#mdirllege').on('hidden.bs.modal', function (e) {
        $('body').addClass('modal-open');
    });    

});

function cargaClientes(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Nombre/Razón Social', class: 'text-center thp', ordenable: false, columna: 'NOMBRE_CLIENTE', filtro: true },
            //{ leyenda: 'Tipo de Documento', class: 'text-center thp', style: 'white-space:nowrap', ordenable: false, columna: 'TIPO_DOCUMENTO', filtro: false },
            { leyenda: 'RUC/DNI', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'NUMERO_DOCUMENTO', filtro: true },
            //{ leyenda: 'Contacto', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'NOMBRE', filtro: false },
            { leyenda: 'Activo / Inactivo', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: true },
            { leyenda: '', class: 'text-center thp', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            { propiedad: 'NOMBRE_CLIENTE', class: 'text-center tdp' },
            //{
            //    propiedad: 'TIPO_DOCUMENTO', class: 'text-center px-2 tdp', style: "white-space:nowrap", formato: function (tr, obj, valor) {
            //        if (valor === 1)
            //            return "DNI";
            //        if (valor === 2)
            //            return "Carnet de Extranjería";
            //        if (valor === 3)
            //            return "RUC";
            //        if (valor === 4)
            //            return "RUS";
            //        if (valor === 5)
            //            return "Pasaporte";
            //        if (valor === 6)
            //            return "Cédula Diplomatica";
            //        if (valor === 7)
            //            return "Otro";
            //    }
            //},
            { propiedad: 'NUMERO_DOCUMENTO', class: 'text-center tdp' },
            //{ propiedad: 'NOMBRE', class: 'text-center tdp' },
            {
                propiedad: 'STATUS', style: 'white-space:nowrap', class: 'text-center tdp', formato: function (tr, obj, value) {
                   
                    if (value === 1)
                        return "Activo";
                    if (value === 2)
                        return 'Inactivo';
                }
            },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");
                    estatus = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar registro").on("click", function () {
                       editaCliente(obj.ID_CLIENTE);
                    });
                    $(estatus).addClass("fa fa-exchange-alt text-primary ml-2").prop("title", "Actualiza Estado").on("click", function () {
                       // cambiaEstatus(obj.ID_USUARIO, obj.ESTATUS, obj.NOMBRE);
                    });
                    container.appendChild(edita);
                    //container.appendChild(estatus);

                    return container;
                }
            }
        ],
        url: '/ws/Clientes.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [20, 25, 50],
        columna: 'NOMBRE',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#clientes").MALCO(data);
}

function cargaUbigeos() {
    get('/ws/ubigeos.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#cliubi").append('<option value="' + this.id + '">' + this.ubi + '</option>');
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
function cargaContactos() {
    get('/ws/Contactos.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#contcli").append('<option value="' + this.id + '">' + this.nom + '</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de contactos<br />" + error, "ERROR!");
        });
}
function guardaCliente() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el cliente <b>' + $("#clinom").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            let reg = new Object();
            let detalle = new Array();
            let registro = new Object();
            let contactos = new Array();

            reg.nom = $("#clinom").val();
            reg.lincre = 0;
            reg.tipodoc = $("#td").val();
            reg.numdoc = $("#numdoc").val();
            reg.email = $("#email").val();
            reg.tel = $("#tel").val();
            reg.cel = $("#cel").val();
            reg.ubigeo = $("#cliubi").val();
            reg.lincre = $("#lincre").val();
            reg.diacre = $("#diacre").val();
            reg.status = $("#clistatus").val();
            reg.dircom = $("#dircom").val();
            reg.dirfis = $("#dirfis").val();


            let i = 1;
            $.each($("#dirllegada tbody tr"), function () {
                let det = new Object();
                det.desc = this.cells[0].innerText;
                det.pues = this.cells[1].innerText;

                detalle.push(det);
            });

            $.each($("#tblcont tbody tr"), function () {
                let cont = new Object();
                cont.idcont = this.cells[0].innerText;
                cont.nom = this.cells[1].innerText;
                cont.lincre = this.cells[2].innerText;
                contactos.push(cont);
            });

            registro.reg = reg;
            registro.det = detalle;
            registro.cont = contactos;
            get("/ws/Clientes.aspx/Insertar", JSON.stringify({ info: JSON.stringify(registro) }))
                .then(function (res) {
                    if (res.Respuesta === 1) {
                        cargaClientes();
                        Alerta("El cliente se agregó correctamente");
                        limpiaControles('mcliente');
                        $("#mcliente").modal("toggle");
                        $("#dirllegada tbody").empty();
                        $("#tblcont tbody").empty();
                    }
                    else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                })
                .catch(function (res) {
                    Alerta("No fue posible insertar el cliente<br />" + res, "Error!", typIconoAlerta.error);
                });
        }
    });
}
function editaCliente(id) {
    get('/ws/Clientes.aspx/Editar', JSON.stringify({ id: id }))
        .then(function (res) {
            let id;
            let pre;
            let predir;
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#mcliente").modal({ backdrop: 'static', keyboard: false });

                    $("#id").val(res.Info.cli.id);
                    $("#clinom").val(res.Info.cli.nom);
                    $("#td").val(res.Info.cli.tipodoc);
                    $("#numdoc").val(res.Info.cli.numdoc);
                    $("#contcli").val(res.Info.cli.cont);
                    $("#email").val(res.Info.cli.email);
                    $("#tel").val(res.Info.cli.tel);
                    $("#cel").val(res.Info.cli.cel);
                    $("#cliubi").val(res.Info.cli.ubigeo);

                    $("#lincre").val(res.Info.cli.lincre);
                    $("#diacre").val(res.Info.cli.diacre);
                    $("#clistatus").val(res.Info.cli.status);
                    $("#dircom").val(res.Info.cli.dircom);
                    $("#dirfis").val(res.Info.cli.dirfis);
                    $("#dirllegada tbody").empty();
                    $("#tblcont tbody").empty();
                    pre = "mcliente";
                    predir = "minfo";

                    $.each(res.Info.dirlleg, function () {
                        id = $("#dirllegada tbody tr").length;
                        fila = '<tr id="f' + predir + id + '">' +
                            '<td class="text-right">' + this.desc + '</td>' +
                            '<td class="text-right"> ' + this.pues + '</td > ' +
                            '<td class="text-center"><i id="e' + predir + id + '" class="fa fa-edit" title="Editar"></i>&nbsp;&nbsp;<i id="b' + predir + id + '" class="fa fa-trash text-danger" title="Eliminar"></i></td></tr>';

                        $("#dirllegada tbody").append(fila);

                        fila = $("#dirllegada tr:last");
                        $(fila).css({ "cursor": "pointer" });
                        $("#e" + predir + id).on("click", function () {
                            var result = [];
                            var i = 0;
                            $("#mdirllege").modal({ backdrop: 'static', keyboard: false });
                            limpiaControles('mdirllege');
                            $(this).closest('td').siblings().each(function () {
                                result[i] = $(this).text();
                                ++i;
                            });
                            $("#tdid").val("#f" + predir + id);
                            $("#descdllege").val(result[0]);
                            $("#puestodllege").val(result[1]);
                        });
                        $("#b" + predir + id).on("click", function () {
                            Swal.fire({
                                title: 'Confirmación',
                                html: '¿Confirma que desea eliminar el producto <b>' + $("#n" + id).text() + '</b>?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#1cc88a',
                                cancelButtonColor: '#6c757d',
                                confirmButtonText: 'Si, eliminar',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result.value) {
                                    $("#f" + predir + id).remove();
                                }
                            })
                        });

                    });
                    $.each(res.Info.cont, function () {
                        id = $("#tblcont tbody tr").length;
                        fila = '<tr id="f' + pre + id + '">' +
                            '<td class="text-right" style="display:none">' + this.idcont + '</td>' +
                            '<td class="text-right"> ' + this.nom + '</td > ' +
                            '<td class="text-right"> ' + formatoMoneda(this.lincre, 2, true)  + '</td > ' +
                            '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Eliminar"></i></td></tr>';
                        $("#tblcont tbody").append(fila);

                        fila = $("#tblcont tr:last");
                        $(fila).css({ "cursor": "pointer" });
                        $("#b" + pre + id).on("click", function () {
                            Swal.fire({
                                title: 'Confirmación',
                                html: '¿Confirma que desea eliminar el registro <b>' + $("#n" + id).text() + '</b>?',
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
                            })
                        });
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible editar el cliente<br />" + error, "ERROR!");
        })
}
function ActualizarCliente() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea actualizar el cliente <b>' + $("#clinom").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            let reg = new Object();
            let detalle = new Array();
            let registro = new Object();
            let contactos = new Array();

            reg.id = $("#id").val();
            reg.nom = $("#clinom").val();
            reg.tipodoc = $("#td").val();
            reg.numdoc = $("#numdoc").val();
            reg.email = $("#email").val();
            reg.tel = $("#tel").val();
            reg.cel = $("#cel").val();
            reg.ubigeo = $("#cliubi").val();
            reg.lincre = $("#lincre").val();
            reg.diacre = $("#diacre").val();
            reg.status = $("#clistatus").val();
            reg.dircom = $("#dircom").val();
            reg.dirfis = $("#dirfis").val();


            let i = 1;
            $.each($("#dirllegada tbody tr"), function () {
                let det = new Object();
                det.idcli = $("#id").val();
                det.desc = this.cells[0].innerText;
                det.pues = this.cells[1].innerText;

                detalle.push(det);
            });
            $.each($("#tblcont tbody tr"), function () {
                let cont = new Object();
                cont.idcli = $("#id").val();
                cont.idcont = this.cells[0].innerText;
                cont.nom = this.cells[1].innerText;
                cont.lincre = this.cells[2].innerText;
                contactos.push(cont);
            });
            registro.reg = reg;
            registro.det = detalle;
            registro.cont = contactos;
            get("/ws/Clientes.aspx/Actualizar", JSON.stringify({ info: JSON.stringify(registro) }))
                .then(function (res) {
                    if (res.Respuesta === 1) {
                        cargaClientes(id);
                        Alerta("El cliente se actualizó correctamente");
                        limpiaControles('mcliente');
                        $("#mcliente").modal("toggle");
                        $("#dirllegada tbody").empty();
                        $("#tblcont tbody").empty();
                    }
                    else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                })
                .catch(function (res) {
                    Alerta("No fue posible insertar el cliente<br />" + res, "Error!", typIconoAlerta.error);
                })
        }
    })
}
function guardarcontacto() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el contacto <b>' + $("#nomcont").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            let reg = new Object();

            reg.nom = $("#nomcont").val();

            get("/ws/Contactos.aspx/Insertar", JSON.stringify({ info: JSON.stringify(reg) }))
                .then(function (res) {
                    if (res.Respuesta === 1) {
                        cargaClientes(id);
                        Alerta("El contacto se agregó correctamente");
                        limpiaControles('mcont');
                        $("#mcont").modal("toggle");
                        $("#contcli").empty();
                        cargaContactos();

                    }
                    else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                })
                .catch(function (res) {
                    Alerta("No fue posible insertar el contacto<br />" + res, "Error!", typIconoAlerta.error);
                });
        }
    });
}
function cargaCliente(numdoc) {
    get('/ws/Clientes.aspx/ConsultarNumDoc', JSON.stringify({ numdoc: numdoc }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        Alerta("El numero de documento ya se encuentra registrado en otro cliente.", "ERROR!");
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar lainformacion<br/>" + error, "ERROR");
        });
}
function actualizaLinCreCliente() {
    let sumlincrecon = 0.00;
    $.each($("#tblcont tbody tr"), function () {
        sumlincrecon += parseFloat(this.cells[2].innerText.replace(/,/g, ''));
    });
    $("#lincre").val(formatoMoneda(sumlincrecon, 2, true));
}

