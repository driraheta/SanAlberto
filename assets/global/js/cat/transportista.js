let ddtransportista = "#tranp";
let ddtransportistae = "#tranpe";
$(document).ready(function () {
    cargaMarcas();

    $("#guatrans").on("click", function () {
        if (valForm("mtrans")) {
            guardaTransportista();
        }
    });

    $("#cantrans").on("click", function () {
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
                limpiaControles('mtrans')
                $("#mtrans").modal("toggle");
                ddtransportista = '';
                ddtransportistae = '';
            }
        })
    });
});

function GuardarTransportista() {
    let info = new Object();
    info.nom = $("#transnom").val();
    info.idmarc = $("#transmar").val();
    info.numdoc = $("#transplaca").val();
    info.trans = $("#transchofer").val();
    info.placa = $("#transbrevete").val();
    info.cap = $("#transcapa").val();

    get('/ws/Transportistas.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("El transportista se agegó correctamente");
                cargaTransportistas();
                limpiaControles("mtrans");
                ddtransportista = '';
                ddtransportistae = '';
                $("mtrans").modal("toggle");
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargaTransportistas() {
    $(ddtransportista).empty().append('<option value=""></option>');
    if (ddtransportistae != '') {
        $(ddtransportistae).empty().append('<option value=""></option>');
    }
    get('/ws/Transportistas.aspx/ConsultarT', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $(ddtransportista).append('<option value="' + this.ID_TRANSPORTISTA + '">' + this.NOMBRE + " " + this.MARCANOMBRE + " " + this.NUMERO_DOCUMENTO + " " + this.TRANSPORTISTA + '</option>');
                        if (ddtransportistae != '') {
                            $(ddtransportistae).append('<option value="' + this.ID_TRANSPORTISTA + '">' + this.NOMBRE + " " + this.MARCANOMBRE + " " + this.NUMERO_DOCUMENTO + " " + this.TRANSPORTISTA + '</option>');
                        }
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de Transportistas<br/>" + error, "ERROR");
        });
}

function cargaTransportistaNombre(ddltransnombre, ddltransnombree) {
    $(ddltransnombre).empty().append('<option value=""></option>');
    if (ddltransnombree != '') {
        $(ddltransnombree).empty().append('<option value=""></option>');
    }
    get('/ws/Transportistas.aspx/ConsultarTNombre', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $(ddltransnombre).append('<option value="' + this.NOMBRE + '">' + this.NOMBRE +'</option>');
                        if (ddltransnombree != '') {
                            $(ddltransnombree).append('<option value="' + this.NOMBRE + '">' + this.NOMBRE +'</option>');
                        }
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de Transportistas<br/>" + error, "ERROR");
        });
}

function cargaTransportistaMarcas(ddltranmar, ddltranmare, tranname) {
    $(ddltranmar).empty().append('<option value="">Seleccione</option>').append('<option value="0">N/A</option>');
    if (ddltranmare != '') {
        $(ddltranmare).empty().append('<option value="">Seleccione</option>').append('<option value="0">N/A</option>');
    }
    get('/ws/Transportistas.aspx/ConsultarTMarca', JSON.stringify({ tnombre: tranname }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $(ddltranmar).append('<option value="' + this.ID_MARCA + '">' + this.MARCANOMBRE +'</option>');
                        if (ddltranmare != '') {
                            $(ddltranmare).append('<option value="' + this.ID_MARCA + '">' + this.MARCANOMBRE+ '</option>');
                        }
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de Transportistas<br/>" + error, "ERROR");
        });
}

function cargaTransportistaPlacas(ddltranplaca, ddltranplacae, tranname, tranmarca) {
    $(ddltranplaca).empty().append('<option value="">Seleccione</option>');
    if (ddltranplacae != '') {
        $(ddltranplacae).empty().append('<option value="">Seleccione</option>');
    }
    if (tranmarca === "") tranmarca = 0;
    get('/ws/Transportistas.aspx/ConsultarTPlaca', JSON.stringify({ tnombre: tranname, tmarca : tranmarca }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $(ddltranplaca).append('<option value="' + this.PLACA + '">' + this.PLACA +'</option>');
                        if (ddltranplacae != '') {
                            $(ddltranplacae).append('<option value="' + this.PLACA + '">' + this.PLACA +'</option>');
                        }
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de Transportistas<br/>" + error, "ERROR");
        });
}

function cargaTransportistaConductor(ddltranconductor, ddltranconductore, tranname, tranmarca, tranplaca) {
    $(ddltranconductor).empty().append('<option value=""></option>');
    if (ddltranconductore != '') {
        $(ddltranconductore).empty().append('<option value=""></option>');
    }
    if (tranmarca === "") tranmarca = 0;

    get('/ws/Transportistas.aspx/ConsultarTConductor', JSON.stringify({ tnombre: tranname, tmarca: tranmarca, tplaca: tranplaca }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $(ddltranconductor).append('<option value="' + this.ID_TRANSPORTISTA + '">' + this.TRANSPORTISTA + '</option>');
                        if (ddltranconductore != '') {
                            $(ddltranconductore).append('<option value="' + this.ID_TRANSPORTISTA + '">' + this.TRANSPORTISTA + '</option>');
                        }
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de Transportistas<br/>" + error, "ERROR");
        });
}

function cargaMarcas() {
    get('/ws/marcas.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#transmar").empty().append('<option value="0">N/A</option>');
                    $(res.Info).each(function () {
                        $("#transmar").append('<option value="' + this.id + '">' + this.marc + '</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de marcas<br />" + error, "ERROR!");
        });
}
