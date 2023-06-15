function cargaCalidades(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Calidad', class: 'text-center', ordenable: false, columna: 'CALIDAD', filtro: true },
            { leyenda: 'Especie', class: 'text-center', ordenable: false, columna: 'ESPECIE', filtro: true },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            { propiedad: 'CALIDAD', class: 'text-center' },
            { propiedad: 'ESPECIE', class: 'text-center' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editarCal(obj.ID_CALIDAD);
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
                        eliminaCal(obj.ID_CALIDAD, obj.CALIDAD);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/calidad.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'CALIDAD',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#calidades").MALCO(data);
}
function Guardar() {
    let info = new Object();
    info.cal = $("#cal").val();
    info.esp = $("#esp").val();
    get('/ws/calidad.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("Se registró correctamente");
                cargaCalidades();
                $("#cal").val("");
                $("#esp").val("");
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
        html: '¿Confirma que desea actualizar la información de la calidad?',
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
            info.cal = $("#cal").val();
            info.esp = $("#esp").val();

            return fetch(`/ws/calidad.aspx/Actualizar`, {
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
                cargaCalidades();
                $("#cal").val("");
                $("#esp").val("");
                $("#id").val("");
                $("#can").hide();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}
function editarCal(id) {
    get('/ws/calidad.aspx/Consultar', JSON.stringify({ id: id,idesp: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#cal").val(res.Info[0].cal);
                $("#esp").val(res.Info[0].esp);
                $("#id").val(res.Info[0].id);
                $("#can").show();
                $("#cal").focus();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function eliminaCal(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar la información de la calidad <b>' + nom + '</b>?',
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
            return fetch(`/ws/calidad.aspx/Eliminar`, {
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
                cargaCalidades();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}
function cargaEspecies(id) {
    get('/ws/especies.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $(res.Info).each(function () {
                    $("#esp").append('<option value="' + this.id + '">' + this.esp + '</option>');
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


$(document).ready(function () {
    $("#id").val("");
    cargaCalidades();
    cargaEspecies(0);

    $("#gua").on("click", function () {
        if (valForm("forma")) {
            if ($("#id").val() === "")
                Guardar();
            else
                Actualizar();
        }
    });
    $("#can").on("click", function () {
        $("#cal").val("");
        $("#esp").val("");
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
            cargaCalidades();
        }
        else {
            if ($("#opc").val() !== "") {
                if ($("#opc").val() === "1")
                    param.nom = $("#bval").val().trim();

                if ($("#opc").val() === "2")
                    param.cod = $("#bval").val().trim();
            }
            cargaCalidades(param);
        }
    });


});