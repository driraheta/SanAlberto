function cargaBancos(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Banco', class: 'text-center', ordenable: false, columna: 'Banco', filtro: true },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [

            { propiedad: 'Banco', class: 'text-center' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editarBanco(obj.idBanco);
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
                        eliminaBanco(obj.idBanco, obj.Banco);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/bancos.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'Banco',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#bancos").MALCO(data);
}
function Guardar() {
    let banc = new Object();
    let bancc = new Array();
    let bancos = new Object();

    banc.banc = $("#nom").val();
    banc.noid = $("#noid").val();
    banc.razs = $("#razs").val();
    let i = 1;
    $.each($("#cuentas tbody tr"), function () {
        let det = new Object();
        det.id = i;
        det.tipc = this.cells[0].innerText;
        det.idmon = this.cells[2].innerText;
        det.noc = this.cells[4].innerText;
        det.tit = this.cells[5].innerText;
        bancc.push(det);
        ++i;
    });

    bancos.banc = banc;
    bancos.bancc = bancc;
    get('/ws/bancos.aspx/InsertarAll', JSON.stringify({ info: JSON.stringify(bancos) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("El banco se agegó correctamente");
                cargaBancos(0);
                $("#nom").val("");
                $("#noid").val("");
                $("#razs").val("");
                $("#cuentas tbody").empty();

            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function Actualizar() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea actualizar la información del banco?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, Actualizar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let banc = new Object();
            let bancc = new Array();
            let bancos = new Object();
            banc.id = $("#id").val();
            banc.banc = $("#nom").val();
            banc.noid = $("#noid").val();
            banc.razs = $("#razs").val();
            let i = 1;
            $.each($("#cuentas tbody tr"), function () {
                let det = new Object();
                det.id = i;
                det.idbanco = $("#id").val();
                det.tipc = this.cells[0].innerText;
                det.idmon = this.cells[2].innerText;
                det.noc = this.cells[4].innerText;
                det.tit = this.cells[5].innerText;
                bancc.push(det);
                ++i;
            });

            bancos.banc = banc;
            bancos.bancc = bancc;

            return fetch(`/ws/bancos.aspx/Edita`, {
                method: 'POST', body: JSON.stringify({ info: JSON.stringify(bancos) }), headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    );
                });
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.value) {
            let res = JSON.parse(result.value.d);
            if (res.Respuesta === 1) {
                Alerta("El registro se actualizó correctamente");
                cargaBancos(0);
                $("#nom").val("");
                $("#id").val("");
                $("#can").hide();
                $("#noid").val("");
                $("#razs").val("");
                $("#cuentas tbody").empty();

            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}
function editarBanco(id) {
    get('/ws/bancos.aspx/Editar', JSON.stringify({ id: id }))
        .then(function (res) {
            let id;
            let pre;
            let tc;
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#id").val(res.Info.banc.id);
                    $("#nom").val(res.Info.banc.banc);
                    $("#noid").val(res.Info.banc.noid);
                    $("#razs").val(res.Info.banc.razs);
                    $("#can").show();
                    $("#nom").focus();
                    $("#menus tbody").empty();

                    $("#cuentas tbody").empty();

                    pre = "forma";
                    $.each(res.Info.bancc, function () {
                        id = $("#cuentas tbody tr").length;
                        if (this.TIPOCUENTAID === 1) {
                            tc = "Ahorros";
                        } else if (this.TIPOCUENTAID === 2) {
                            tc = "Corriente";
                        }
                        fila = '<tr id="f' + pre + id + '">' +
                            '<td id="n' + pre + id + '" style="display: none">' + this.TIPOCUENTAID + '</td>' +
                            '<td class="text-right">' + this.TIPOCUENTANOMBRE+' </td > ' +
                            '<td class="text-right" style="display: none">' + this.ID_MONEDA+' </td > ' +
                            '<td class="text-right">' + this.MONEDA+'  </td > ' +
                            '<td class="text-right">' + this.NOCUENTA + '  </td > ' +
                            '<td class="text-right">' + this.TITULAR + '  </td > ' +
                            '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina"></i></td></tr>';

                        $("#cuentas tbody").append(fila);

                        fila = $("#cuentas tr:last");
                        $(fila).css({ "cursor": "pointer" });
                        $("#b" + pre + id).on("click", function () {
                            Swal.fire({
                                title: 'Confirmación',
                                html: '¿Confirma que desea eliminar la cuenta<b>' + $("#n" + id).text() + '</b>?',
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

                    });
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
function eliminaBanco(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar la información del banco <b>' + nom + '</b>?',
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
            return fetch(`/ws/bancos.aspx/Eliminar`, {
                method: 'POST', body: JSON.stringify({ info: JSON.stringify(info) }), headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    );
                });
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.value) {
            let res = JSON.parse(result.value.d);
            if (res.Respuesta === 1) {
                Alerta("El registro se eliminó correctamente");
                cargaBancos(0);
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}
function cargatipodecuentas() {
    get('/ws/tipocuentas.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#tc").empty().append('<option value=""></option>');

                    $(res.Info).each(function () {
                        $("#tc").append('<option value="' + this.id + '">' + this.tcnom + '</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de tip de cuentas<br />" + error, "ERROR!");
        });
}

function guardartc() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el tipo de cuenta <b>' + $("#tcu").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            let reg = new Object();

            reg.tcnom = $("#tcu").val();

            get("/ws/tipocuentas.aspx/Insertar", JSON.stringify({ info: JSON.stringify(reg) }))
                .then(function (res) {
                    if (res.Respuesta === 1) {
                        cargatipodecuentas();
                        Alerta("El tipo de cuenta se agregó correctamente");
                        limpiaControles('mtc');
                        $("#mtc").modal("toggle");

                    }
                    else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                })
                .catch(function (res) {
                    Alerta("No fue posible insertar el tipo de cuenta<br />" + res, "Error!", typIconoAlerta.error);
                });
        }
    });
}


$(document).ready(function () {
    $("#id").val("");
    cargaBancos(0);
    cargatipodecuentas();
    Moneda.Consultar("#mon");
    //validar escribir solo numeros en los inputs con clase numeros
    $(".numeros").on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    $("#gua").on("click", function () {
        if (valForm("forma")) {
            if ($("#id").val() === "")
                Guardar();
            else
                Actualizar();
        }
    });
    $("#can").on("click", function () {
        $("#nom").val("");
        $("#can").hide();
        $("#id").val("");
        $("#noid").val("");
        $("#razs").val("");
        $("#cuentas tbody").empty();
    });
    $("#cancunt").on("click", function () {
        $("#mcuenta").modal("toggle");
    });
    $("#ncuenta").on("click", function () {
        $("#mcuenta").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mcuentas');
    });

    $("#agrcunt").on("click", function () {
        if (valForm("mcuenta")) {
            let id;
            let pre;
            let fila;

            id = $("#cuentas tbody tr").length;
            pre = "forma";

            fila = '<tr id="f' + pre + id + '">' + '<td class="text-right" style="display: none">' + $("#tc").val() + '</td>' +
                '<td class="text-right">' + $("#tc option:selected").text() + '</td>' +
                '<td class="text-right" style="display: none">' + $("#mon").val() + '</td>' +
                '<td class="text-right">' + $("#mon option:selected").text() + '</td>' +
                '<td class="text-right">' + $("#noc").val() + '</td>' +
                '<td class="text-right">' + $("#tit").val() + '</td>' +
                '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina cuenta"></i></td></tr>';

            $("#cuentas tbody").append(fila);
            fila = $("#cuentas tr:last");

            $(fila).css({ "cursor": "pointer" });
            $("#b" + pre + id).on("click", function () {
                Swal.fire({
                    title: 'Confirmación',
                    html: '¿Confirma que desea eliminar la cuenta <b>' + $("#n" + pre + id).text() + '</b>?',
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
            $("#mcuenta").modal("toggle");
            $("#noc").val("");
            $("#mon").val("");
            $("#tc").val("");

        }
    });
    //Agregar nuevo tipo de cuenta
    $("#ntc").on("click", function () {
        $("#mtc").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mtc');
    });
    $("#cantc").on("click", function () {
        $("#mtc").modal("toggle");
    });
    $("#guatc").on("click", function () {
        guardartc();
    });
});