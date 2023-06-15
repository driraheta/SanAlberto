$(document).ready(function () {
    cargaUsuarios();
    cargaListaAlmacenes()
    $("#gua").on("click", function () {
        if (valForm()) {
            if ($("#idu").val() !== "0")
                guardaCambios()
            else
                Alerta("Se ha perdido la relación del cliente con la base de datos<br/>Regrese al listado de clientes y vuelva a seleccionar al cliente a actuallzar", "Error!", typIconoAlerta.error);
        }
    });
    $("#reg").on("click", function () {
        $("#forma").hide();
        $("#lista").show();
    });
    $("#agrealm").on("click", function () {
        if (valForm("forma")) {
            agregaAlmacen();
        }
    });
})


function guardaCambios() {
    let info = new Object();
    let usu = new Object();
    let almacenes = new Array();
    usu = objetoForma("forma");
    if (usu !== null) {
        usu.id = $("#idu").val();
        usu.viscostos = $("#viscosto").prop("checked") ? 1 : 0;
        info.reg = usu;
        info.almacenes = copiarAlmacenes();
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea actualizar la información del usuario <b>' + $("#nom").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                get("/ws/usuarios.aspx/Actualizar", JSON.stringify({ info: JSON.stringify(info) }))
                    .then(function (res) {
                        if (res.Respuesta === 1) {
                            cargaUsuarios();
                            Alerta("El usuario se actualizó correctamente");
                            $("#pwd").val("");
                            $("#cpwd").val("");
                        }
                        else {
                            Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                        }
                    }, function (res) {
                        Alerta("No fue posible actualizar la información del usuario<br />" + res.Mensaje, "Error!", typIconoAlerta.error);
                    })
                    .catch(function (res) {
                        Alerta("No fue posible actualizar la información del usuario<br />" + res, "Error!", typIconoAlerta.error);
                    })
            }
        })
    }
    else {
        Alerta("No se encontraron propiedades para actualizar", "Error!", typIconoAlerta.error);
    }


}
function cargaUsuarios() {
    let params = new Object();

    var param = new Object();
    param.borrador = 0;

    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'NOMBRE', class: 'text-center', ordenable: false, columna: 'NOMBRE', filtro: true },
            { leyenda: 'USUARIO', class: 'text-center', ordenable: false, columna: 'USUARIO', filtro: true },
            { leyenda: 'PERFIL', class: 'text-center', ordenable: false, columna: 'PERFIL', filtro: true },
            { leyenda: 'ESTATUS', class: 'text-center', style: 'width:1%', ordenable: false, columna: 'ESTATUS', filtro: true },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:75px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            {
                propiedad: 'NOMBRE', style: 'text-align:left;', formato: function (tr, obj, valor) {
                    tr[0].style.cursor = 'pointer';
                    return valor;
                }
            },
            {
                propiedad: 'USUARIO', class: 'text-center px-2'
            },
            {
                propiedad: 'PERFIL', class: 'text-center px-2'
            },
            {
                propiedad: 'ESTATUS', class: 'text-center px-3', formato: function (tr, obj, valor) {
                    if (valor === 1)
                        return '<span class="text-success">Activo</span>';
                    else
                        return '<span class="text-danger">Suspendido</span>';
                }
            },
            {
                propiedad: '', class: 'text-center', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");
                    estatus = document.createElement("i");

                    $(edita).addClass("fa fa-edit").on("click", function () {
                        editaUsuarios(obj.ID_USUARIO);
                    });
                    $(estatus).addClass("fa fa-exchange-alt text-primary ml-2").prop("title", "Actualiza Estado").on("click", function () {
                        cambiaEstatus(obj.ID_USUARIO, obj.ESTATUS, obj.NOMBRE);
                    });
                    container.appendChild(edita);
                    container.appendChild(estatus);

                    return container;
                }
            }
        ],
        url: '/ws/usuarios.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'id',
        loader: "pre0",
        columna_orden: 'ASC'
    };

    $("#usuarios").MALCO(data);

}
function editaUsuarios(id) {
    get('/ws/usuarios.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#idu").val(res.Info.usu.id);
                $("#user").val(res.Info.usu.usu);
                cargaForma(res.Info.usu);
                cargaAlmacenesUsuario(res.Info.det);
                $("#viscosto").prop("checked", res.Info.viscostos);
                $("#pwd").val("");
                $("#lista").hide();
                $("#forma").show();
            }
            else {
                Alerta("No fue posiebla cargar la información del usuario<br/>" + res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }, function (res) {
            Alerta("No fue posiebla cargar la información del usuario<br/>" + res.Mensaje, "Error!", typIconoAlerta.error);
        })
        .catch(function (error) {
            Alerta("No fue posible cargar la información del usuario<br/>" + error, "Error!", typIconoAlerta.error);
        })
}
function cambiaEstatus(id, edo, nom) {
    let msg;
    let usu = new Object();

    if (edo === 0)
        msg = '<span class="text-success">Activar</span>';
    else
        msg = '<span class="text-danger">Suspender</span>';

    usu.id = id;
    usu.est = edo === 0 ? 1 : 0;

    Swal.fire({
        html: '<div style="font-size:1.5rem">¿Confirma que desea ' + msg + ' al usuario <b>' + nom + '</b>?</div>',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        cancelButtonColor: '#e74a3b',
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch('/ws/usuarios.aspx/actualizaEstatus', { method: 'POST', body: JSON.stringify({ info: JSON.stringify(usu) }), headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.clone().json();
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
                Alerta("Usuario actualizado correctamente");
                cargaUsuarios();
            }
            else {
                Swal.showValidationMessage(
                    ` ${res.Respuesta}`
                )
            }
        }
    })
}


function cargaListaAlmacenes() {
    ddAlmacen = $("#alm")
    cargaAlmacenes();
}

function agregaAlmacen() {
    let id = $("#tblalm tbody tr").length + 1;
    let idalmacen = $("#alm").val();
    let descalmacen = $("#alm option:selected").text();
    if (!confirmaAlmacen(idalmacen)) {
        Alerta("El almacen se encuentra registrado","AVISO");
        return;
    }

    fila = '<tr id="f' + id + '">' +
        '<td id="n' + id + '"class="text-right oculta">' + idalmacen + '</td > ' +
        '<td class="text-center">' + descalmacen + '</td>' +
        '<td class="text-center"><i id="blist' + id + '" class="fa fa-trash text-danger" title="Elimina Almacen"></i></td></tr>';
    $("#tblalm tbody").append(fila);
    fila = $("#tblalm tr:last");
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

};

function confirmaAlmacen(idalm) {
    let result = true;
    $.each($("#tblalm tbody tr"), function () {
        //det.idprod = this.cells[0].innerText;
        let detid = this.cells[0].innerText;
        if (detid == idalm) {
            result = false;
            return false;
        }
    });
    return result;
}

function copiarAlmacenes() {
    let detalle = new Array();
    $.each($("#tblalm tbody tr"), function () {
        let det = new Object();
        //det.idprod = this.cells[0].innerText;
        det.idusuario = $("#id").val();;
        det.idalmacen = this.cells[0].innerText;
        det.status = 1;
        detalle.push(det);
    });
    return detalle;
}

function cargaAlmacenesUsuario(detalleAlmacenes) {
    $("#tblalm tbody").empty();
    $.each(detalleAlmacenes, function () {
        let id = this.ID;
        let idalmacen = this.ID_ALMACEN;
        let descalmacen = this.ALMACEN;
        fila = '<tr id="f' + id + '">' +
            '<td id="n' + id + '"class="text-right oculta">' + idalmacen + '</td > ' +
            '<td class="text-center">' + descalmacen + '</td>' +
            '<td class="text-center"><i id="blist' + id + '" class="fa fa-trash text-danger" title="Elimina Almacen"></i></td></tr>';
        $("#tblalm tbody").append(fila);
        fila = $("#tblalm tr:last");
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
