let ddcli = "#cli";
let idcontact = "";
$(document).ready(function () {
    /**Cliente**/
    $("#guacli").on("click", function () {
        if (valForm("mcliente")) {
            guardaCliente();
        }
    });

    $("#cancli").on("click", function () {
        Swal.fire({
            html: '¿Confirma que desea cancelar la acción?',
            title: 'Confirmación',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí'
        }).then((result) => {
            if (result.value) {
                limpiaControles('mcliente')
                $("#mcliente").modal("toggle");
            }
        })
    });

    /**Contacto**/
    $("#nuecon").on("click", function () {
        $("#mclicon").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mclicon');
    });

    $("#cancon").on("click", function () {
        $("#mclicon").modal("toggle");
    });

    $("#agrcon").on("click", function () {
        if ($("#contcli").val() != "") {
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

    $("#guaclicont").on("click", function () {
        guardarClienteContacto();
    });


    /**Direccion de llegada**/
    $("#ndirlleg").on("click", function () {
        $("#mdirlleg").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mdirlleg');
    });

    $("#guadirlleg").on("click", function () {
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
    });

    $("#candlleg").on("click", function () {
        $("#mdirlleg").modal("toggle");
    });

    $("#candllege").on("click", function () {
        $("#mdirllege").modal("toggle");
    });

    /***Modales para que padre no pierda el foco**/
    $('#mcontactocliente').on('hidden.bs.modal', function (e) {
        $('body').addClass('modal-open');
    });

    $('#mdirlleg').on('hidden.bs.modal', function (e) {
        $('body').addClass('modal-open');
    });

});

function cargaClientes(ddsource) {
    let lddi = ddsource || ddcli; //Si no se envía parámetro, tomará el valor de la ddl por defecto
    let lidcontact = idcontact == "" ? "0" : idcontact;
    $(lddi).empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarCont', JSON.stringify({ id: lidcontact }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $(lddi).append('<option value="' + this.ID_CLIENTE + '">' + this.NUMERO_DOCUMENTO + ' ' + this.NOMBRE_CLIENTE + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        });
}

function cargaClienteContactos() {
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

function guardarClienteContacto() {
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

            reg.nom = $("#clicontnom").val();

            get("/ws/Contactos.aspx/Insertar", JSON.stringify({ info: JSON.stringify(reg) }))
                .then(function (res) {
                    if (res.Respuesta === 1) {
                        Alerta("El contacto se agregó correctamente");
                        limpiaControles('mcontactocliente');
                        $("#mcontactocliente").modal("toggle");
                        $("#contcli").empty();
                        cargaClienteContactos();

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

function guardaCliente() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el cliente <b>' + $("#nomc").val() + '</b>',
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

function actualizaLinCreCliente() {
    let sumlincrecon = 0.00;
    $.each($("#tblcont tbody tr"), function () {
        sumlincrecon += parseFloat(this.cells[2].innerText.replace(/,/g, ''));
    });
    $("#lincre").val(formatoMoneda(sumlincrecon, 2, true));
}
