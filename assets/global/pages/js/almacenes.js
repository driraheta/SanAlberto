$(document).ready(function () {
    $("#id").val("");
    cargaAlmacenes(0);
    cargaDirecciones();
    $("#agredir").on("click", function () {
        if (valForm("forma")) {
            agregaDireccion();
        }
    });
    $("#gua").on("click", function () {
        Registrar();
    });

    $("#can").on("click", function () {
        regresar();
    });

});
function nuevo() {
    limpiaPantalla();
    $("#lista").hide();
    $("#forma").show();
}
function limpiaPantalla() {
    limpiaControles("forma");
    $("#info tbody").empty();
    $("#tbldir tbody").empty();
    $("#id").val("");
}
function regresar() {
    limpiaControles("forma");
    $("#id").val("");
    cargaAlmacenes(0);
    $("#lista").show();
    $("#forma").hide();
}

function Registrar() {
    if (valForm("forma")) {
        if ($("#id").val() === "")
            Guardar();
        else
            Actualizar();
    }
}
function Guardar() {
    let info = new Object();
    let alm = new Object();

    alm.alm = $("#pro").val();
    alm.cod = $("#copro").val();
    info.reg = alm;
    info.direcciones = copiarDirecciones();

    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el registro de  <b>' + $("#pro").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/almacenes.aspx/Insertar`, {
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
                Alerta("El registro se insertó correctamente");
                regresar();
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    })
}
function Actualizar() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea actualizar la información del almacen?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, Actualizar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let info = new Object();
            let alm = new Object();
            alm.alm = $("#pro").val();
            alm.cod = $("#copro").val();
            alm.id = $("#id").val();
            info.reg = alm;
            info.direcciones = copiarDirecciones();
            return fetch(`/ws/almacenes.aspx/Actualizar`, {
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
                Alerta("El registro se actualizó correctamente");
                regresar();

            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    })
}
function eliminaAlmacen(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar el almacén <b>' + nom + '</b>?',
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
            return fetch(`/ws/almacenes.aspx/Eliminar`, {
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
                cargaAlmacenes(0);
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    })
}
function editarAlmacen(id) {
    get('/ws/almacenes.aspx/ConsultarUnitario', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#copro").val(res.Info.alm.cod);
                $("#pro").val(res.Info.alm.alm);
                $("#id").val(id);

                $("#lista").hide();
                $("#forma").show();

                $("#can").show();
                $("#pro").focus();
                cargaDireccionesAlmacen(res.Info.det);
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        })
}
function cargaAlmacenes(id) {
    $("#info tbody").empty();
    get('/ws/almacenes.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $(res.Info).each(function () {
                    let fila = "";
                    fila = '<tr>' +
                        '<td>' + this.cod + '</td>' +
                        '<td>' + this.alm + '</td>' +
                        '<td style="white-space:nowrap"><i id="e' + this.id + '" class="fa fa-edit"></i>&nbsp;&nbsp;<i id="b' + this.id + '" class="fa fa-trash text-danger"></i></td>' +
                        '</tr>';
                    $("#info tbody").append(fila);
                    let nom = this.pro;
                    $("#e" + this.id).css("cursor", "pointer").on("click", function () {
                        editarAlmacen(this.id.substring(1));
                    });
                    $("#b" + this.id).css("cursor", "pointer").on("click", function () {
                        eliminaAlmacen(this.id.substring(1), nom);
                    });
                });
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        })
}
function cargaDirecciones() {
    var dddir = $("#dir");
    $(dddir).empty().append('<option value=""></option>');
    get('/ws/DireccionPartida.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info.direccionList, function () {
                        $(dddir).append('<option value="' + this.id + '">' + this.desc + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de Direcciones<br/>" + error, "ERROR");
        });

}
function agregaDireccion() {
    let id = $("#tbldir tbody tr").length + 1;
    let iddir = $("#dir").val();
    let descdir = $("#dir option:selected").text();
    if (!confirmaDireccion(iddir)) {
        Alerta("La dirección se encuentra registrada", "AVISO");
        return;
    }

    fila = '<tr id="f' + id + '">' +
        '<td id="n' + id + '"class="text-right oculta">' + iddir + '</td > ' +
        '<td class="text-center">' + descdir + '</td>' +
        '<td class="text-center"><i id="blist' + id + '" class="fa fa-trash text-danger" title="Elimina Direccion"></i></td></tr>';
    $("#tbldir tbody").append(fila);
    fila = $("#tbldir tr:last");
    $(fila).css({ "cursor": "pointer" });
    $("#blist" + id).on("click", function () {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea eliminar la dirección?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $("#f" + id).remove();
            }
        });
    });

}

function confirmaDireccion(iddir) {
    let result = true;
    $.each($("#tbldir tbody tr"), function () {
        //det.idprod = this.cells[0].innerText;
        let detid = this.cells[0].innerText;
        if (detid == iddir) {
            result = false;
            return false;
        }
    });
    return result;
}


function copiarDirecciones() {
    let detalle = new Array();
    let idalmacen = $("#id").val() === "" ? "0" : $("#id").val();    
    $.each($("#tbldir tbody tr"), function () {
        let det = new Object();
        //det.idprod = this.cells[0].innerText;
        det.idalmacen = idalmacen;
        det.iddireccion = this.cells[0].innerText;
        det.status = 1;
        detalle.push(det);
    });
    return detalle;
}
function cargaDireccionesAlmacen(detalle) {
    $("#tbldir tbody").empty();
    $.each(detalle, function () {
        let id = this.ID;
        let iddireccion = this.ID_DIRPAR;
        let descdireccion = this.DESCRIPCION;
        fila = '<tr id="f' + id + '">' +
            '<td id="n' + id + '"class="text-right oculta">' + iddireccion + '</td > ' +
            '<td class="text-center">' + descdireccion + '</td>' +
            '<td class="text-center"><i id="blist' + id + '" class="fa fa-trash text-danger" title="Elimina Almacen"></i></td></tr>';
        $("#tbldir tbody").append(fila);
        fila = $("#tbldir tr:last");
        $(fila).css({ "cursor": "pointer" });
        $("#blist" + id).on("click", function () {
            Swal.fire({
                title: 'Confirmación',
                html: '¿Confirma que desea eliminar el almacen?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    $("#f" + id).remove();
                }
            });
        });
    });
};
