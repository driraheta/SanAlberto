function cargaUBI(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Ubigeo', class: 'text-center', ordenable: false, columna: 'UBIGEO', filtro: true },
            { leyenda: 'Departamento', class: 'text-center', ordenable: false, columna: 'DEPARTAMENTO', filtro: true },
            { leyenda: 'Provincia', class: 'text-center', ordenable: false, columna: 'PROVINCIA', filtro: true },
            { leyenda: 'Distrito', class: 'text-center', ordenable: false, columna: 'DISTRITO', filtro: true },
            { leyenda: 'País', class: 'text-center', ordenable: false, columna: 'PAIS', filtro: true },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            { propiedad: 'UBIGEO', class: 'text-center' },
            { propiedad: 'DEPARTAMENTO', class: 'text-center' },
            { propiedad: 'PROVINCIA', class: 'text-center' },
            { propiedad: 'DISTRITO', class: 'text-center' },
            { propiedad: 'PAIS', class: 'text-center' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                        editarUBI(obj.ID_UBIGEO);
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
                        eliminaUBI(obj.ID_UBIGEO, obj.UBIGEO);
                    });
                    container.appendChild(elimina);

                    return container;
                }
            }
        ],
        url: '/ws/ubigeos.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'UBIGEO',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#Ubigeos").MALCO(data);
}
function Guardar() {
    let info = new Object();
    info.idpais = $("#pais").val();
    info.dep = $("#depto").val();
    info.prov = $("#prov").val();
    info.dis = $("#dis").val();
    info.ubi = $("#desc").val();
    get('/ws/ubigeos.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                Alerta("El Ubigeo se agegó correctamente");
                cargaUBI();
                $("#pais").val("");
                $("#depto").val("");
                $("#prov").val("");
                $("#dis").val("");
                $("#desc").val("");
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
        html: '¿Confirma que desea actualizar la información del Ubigeo?',
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
            info.idpais = $("#pais").val();
            info.dep = $("#depto").val();
            info.prov = $("#prov").val();
            info.dis = $("#dis").val();
            info.ubi = $("#desc").val();

            return fetch(`/ws/ubigeos.aspx/Actualizar`, {
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
                cargaUBI();
                $("#pais").val("");
                $("#depto").val("");
                $("#prov").val("");
                $("#dis").val("");
                $("#desc").val("");
                $("#id").val("");
                $("#can").hide();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}
function editarUBI(id) {
    get('/ws/UBIGEOS.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#pais").val(res.Info[0].idpais);
                $("#depto").val(res.Info[0].dep);
                $("#prov").val(res.Info[0].prov);
                $("#dis").val(res.Info[0].dis);
                $("#desc").val(res.Info[0].ubi);
                $("#id").val(res.Info[0].id);
                $("#can").show();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function eliminaUBI(id, nom) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar la información del ubigeo <b>' + nom + '</b>?',
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
            return fetch(`/ws/ubigeos.aspx/Eliminar`, {
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
                cargaUBI();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        }
    });
}
function cargaPaises() {
    get('/ws/paises.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#pais").empty().append('<option value=""></option>');
                $("#paisb").empty().append('<option value=""></option>');
                $.each(res.Info, function () {
                    $("#pais").append('<option value="' + this.id + '">' + this.pai + '</option>');
                    $("#paisb").append('<option value="' + this.id + '">' + this.pai + '</option>');
                });
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de países<br />" + error, "ERROR!");
        });
}


$(document).ready(function () {
    var descubi = new Array(4); 

    $("#id").val("");
    cargaUBI();
    cargaPaises();
    $("#gua").on("click", function () {
        if (valForm("forma")) {
            if ($("#id").val() === "")
                Guardar();
            else
                Actualizar();
        }
    });

    $("#can").on("click", function () {
        $("#pais").val("");
        $("#depto").val("");
        $("#prov").val("");
        $("#dis").val("");
        $("#desc").val("");
        $("#can").hide();
        $("#id").val("");
    });
    $("#opc").on("change", function () {
        $("#bval").hide();
        $("#paisb").hide();

        $(".gj-icon").parent().hide();

        if ($(this).val() !== "5") {
            $("#bval").show();
        } else if ($(this).val() === "5") {
            $("#paisb").show();
        } else if ($(this).val() !== "") {
            $("#bval").show();
        }
    });
    $("#bus").on("click", function () {
        let param = new Object();

        if ($("#opc").val() === "") {
            cargaUBI();
        }
        else {
            if ($("#opc").val() !== "") {
                if ($("#opc").val() === "1")
                    param.ubi = $("#bval").val().trim();
                if ($("#opc").val() === "2")
                    param.dep = $("#bval").val().trim();
                if ($("#opc").val() === "3")
                    param.prov = $("#bval").val().trim();
                if ($("#opc").val() === "4")
                    param.dis = $("#bval").val().trim();
            }
            cargaUBI(param);
        }
    });
    $('#pais').change(function () {
        descubi[1] = $('#pais option:selected').text();
        $('#desc').val(descubi.join(' '));
    });
    $('#depto').blur(function () {
        descubi[2] = $('#depto').val();
        $('#desc').val(descubi.join(' '));
    });
    $('#prov').blur(function () {
        descubi[3] = $('#prov').val();
        $('#desc').val(descubi.join(' '));
    });
    $('#dis').blur(function () {
        descubi[4] = $('#dis').val();
        $('#desc').val(descubi.join(' '));
    });
});