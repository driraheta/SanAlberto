function cargaUnidadesMedida(id) {
    get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $(res.Info).each(function () {
                    $("#um").append('<option value="' + this.id + '">' + this.um + '</option>');
                });
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function cargaServicios(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Código', class: 'text-center', ordenable: false, columna: 'CODIGOSERV', filtro: true },
            { leyenda: 'Nombre', class: 'text-center', ordenable: false, columna: 'NOMBRE', filtro: true },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
        ],
        modelo: [
            { propiedad: 'CODIGOSERV', class: 'text-center' },
            { propiedad: 'NOMBRE', class: 'text-center' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editarServ(obj.ID_SERVICIO);
                    });
                    container.appendChild(edita);

                    return container;
                }
            }//,
            //{
            //    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
            //        container = document.createElement("div");
            //        elimina = document.createElement("i");

            //        $(elimina).addClass("fa fa-trash text-danger").prop("title", "Elimina").on("click", function () {
            //            eliminaServ(obj.ID_SERVICIO, obj.NOMBRE);
            //        });
            //        //container.appendChild(elimina);

            //        //return container;
            //    }
            //}
        ],
        url: '/ws/servicios.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'NOMBRE',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#servicios").MALCO(data);
}
function Guardar() {
    let info = new Object();
    info.nom = $("#nom").val();
    info.cod = $("#cod").val();
    info.um = $("#um").val();
    info.edo = $("#status").val();

    get('/ws/servicios.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("El servicio se agegó correctamente");
                cargaServicios(0);
                $("#nom").val("");
                $("#cod").val("");
                $("#um").val("");
                $("#status").val("");
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function editarServ(id) {
    get('/ws/servicios.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#nom").val(res.Info[0].nom);
                $("#id").val(res.Info[0].id);
                $("#cod").val(res.Info[0].cod);
                $("#um").val(res.Info[0].um);
                $("#status").val(res.Info[0].edo);
                $("#can").show();
                $("#nom").focus();
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
        html: '¿Confirma que desea actualizar la información del servicio?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, Actualizar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let info = new Object();
            info.id = $("#id").val();
            info.nom = $("#nom").val();
            info.cod = $("#cod").val();
            info.um = $("#um").val();
            info.edo = $("#status").val();

            return fetch(`/ws/servicios.aspx/Actualizar`, {
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
                Alerta("El registro se actualizó correctamente");
                cargaServicios(0);
                $("#nom").val("");
                $("#cod").val("");
                $("#um").val("");
                $("#status").val("");
                $("#id").val("");
                $("#can").hide();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}
function eliminaServ(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar la información del servicio <b>' + nom + '</b>?',
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
            return fetch(`/ws/servicios.aspx/Eliminar`, {
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
                cargaServicios(0);
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}


$(document).ready(function () {
    $("#id").val("");
    cargaServicios();
    cargaUnidadesMedida(0);
 
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
        $("#cod").val("");
        $("#um").val("");
        $("#status").val("");

        $("#can").hide();
        $("#id").val("");
    });
});
