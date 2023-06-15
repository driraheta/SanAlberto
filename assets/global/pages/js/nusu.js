$(document).ready(function () {
    cargaListaAlmacenes();
    $("#gua").on("click", function () {
        if (valForm()) {
            guardaUsuario();
        }
    });

    $("#agrealm").on("click", function () {
        if (valForm("forma")) {
            agregaAlmacen();
        }
    });
});



function guardaUsuario() {
    let info = new Object();
    let usu = new Object();
    let almacenes = new Array();
    usu = objetoForma("forma");
    usu.viscostos = $("#viscosto").prop("checked") ? 1 : 0;
    info.reg = usu;
    info.almacenes = copiarAlmacenes();
    get("/ws/usuarios.aspx/Insertar", JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("El usuario se guardó satisfactoriamente");
                limpiaControles("forma");
                $("#usu").focus();
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }, function (res) {
            Alerta("No fue posible insertar la información del usuario<br />" + res.Mensaje, "Error!", typIconoAlerta.error);
        })
        .catch(function (error) {
            Alerta("No fue posible insertar la información del usuario<br />" + error, "Error!", typIconoAlerta.error);
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
        Alerta("El almacen se encuentra registrado", "AVISO");
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
