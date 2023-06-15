function cargaVendedores(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Codigo', class: 'text-center', ordenable: false, columna: 'CODIGO', filtro: true },
            { leyenda: 'Nombre', class: 'text-center', ordenable: false, columna: 'NOMBRE', filtro: true },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            { propiedad: 'CODIGO', class: 'text-center' },
            { propiedad: 'NOMBRE', class: 'text-center' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editarVen(obj.ID_VENDEDOR);
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
                        eliminaVen(obj.ID_VENDEDOR, obj.NOMBRE);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/Vendedores.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'NOMBRE',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#vendedores").MALCO(data);
}
function Guardar() {
    let info = new Object();
    info.cod = $("#cod").val();
    info.nom = $("#nom").val();
    get('/ws/Vendedores.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("El vendedor se agegó correctamente");
                cargaVendedores(0);
                $("#cod").val("");
                $("#nom").val("");
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        })
}
function Actualizar() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea actualizar la información del vendedor?',
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
            info.cod = $("#cod").val();
            info.nom = $("#nom").val();

            return fetch(`/ws/Vendedores.aspx/Actualizar`, {
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
                cargaVendedores(0);
                $("#cod").val("");
                $("#nom").val("");
                $("#id").val("");
                $("#can").hide();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    })
}
function editarVen(id) {
    get('/ws/Vendedores.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#cod").val(res.Info[0].cod);
                $("#nom").val(res.Info[0].nom);
                $("#id").val(res.Info[0].id);
                $("#can").show();
                $("#cod").focus();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        })
}
function eliminaVen(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar la información del vendedor <b>' + nom + '</b>?',
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
            return fetch(`/ws/Vendedores.aspx/Eliminar`, {
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
                cargaVendedores(0);
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    })
}


$(document).ready(function () {
    $("#id").val("");
    cargaVendedores();

    $("#gua").on("click", function () {
        if (valForm("forma")) {
            if ($("#id").val() === "")
                Guardar();
            else
                Actualizar();
        }
    })
    $("#can").on("click", function () {
        $("#cod").val("");
        $("#nom").val("");
        $("#can").hide();
        $("#id").val("");
    });
    $("#opc").on("change", function () {
        $("#bval").hide();
        $(".gj-icon").parent().hide();

        if ($(this).val() !== "") {
            $("#bval").show();
        }
    });
    $("#bus").on("click", function () {
        let param = new Object();

        if ($("#opc").val() === "") {
            cargaVendedores();
        }
        else {
            if ($("#opc").val() !== "") {

                if ($("#opc").val() === "1")
                    param.nom = $("#bval").val().trim();

                if ($("#opc").val() === "2")
                    param.cod = $("#bval").val().trim();
            }

            cargaVendedores(param);
        }
    });


});