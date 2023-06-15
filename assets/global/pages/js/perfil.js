(function ($) {
    function cargaPerfiles() {
        get("/ws/perfiles.aspx/Consultar", JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $.each(res.Info, function () {
                        $("#per").append('<option value="' + this.id + '">' + this.per + '</option>');
                    });
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }, function (res) {
                Alerta("No fue posible cargar el listado de perfiles<br/>" + res.Mensaje, "Error!", typIconoAlerta.error);
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de perfiles<br/>" + typIconoAlerta.error, "Error!", typIconoAlerta.error);
            })
    }
    function cargaPerfilesTable(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-hover',
            columnas: [

                { leyenda: 'Perfil', class: 'text-center', ordenable: false, columna: 'PERFIL', filtro: true },
                { leyenda: 'Editar', class: 'text-center', ordenable: false, filtro: false, columna: 'EDITA' },
                { leyenda: 'Eliminar', class: 'text-center', ordenable: false, filtro: false, columna: 'ELIMINAR' }
            ],
            modelo: [

                { propiedad: 'PERFIL', class: 'text-center' },
                {
                    propiedad: 'EDITA', class: 'text-center', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");

                        $(edita).addClass("fa fa-edit text-info").prop("title", "Editar").on("click", function () {
                            editarPerfil(obj.ID_PERFIL);
                        });
                        container.appendChild(edita);

                        return container;
                    }
                },
                {
                    propiedad: 'ELIMINAR', class: 'text-center', formato(tr, obj) {
                        container = document.createElement("div");
                        elimina = document.createElement("i");

                        $(elimina).addClass("fa fa-trash text-danger").prop("title", "Eliminar").on("click", function () {
                            eliminaPerfil(obj.ID_PERFIL, obj.PERFIL);
                        });
                        container.appendChild(elimina);

                        return container;
                    }
                }
            ],
            url: '/ws/perfiles.aspx/Listar',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'PERFIL',
            loader: "pre0",
            columna_orden: 'DESC'
        };

        $("#perfiles").MALCO(data);
    }
    function eliminaPerfil(id, nom) {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea eliminar la información del perfil <b>' + nom + '</b>?',
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
                return fetch(`/ws/perfiles.aspx/Eliminar`, {
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
                    Alerta("El perfil se eliminó correctamente");
                    cargaPerfilesTable();
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            }
        })
    }
    function guardaPerfil() {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el perfil <b>' + $("#per").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let per = new Object();
                let detalle = new Array();
                let perfil = new Object();

                per.per = $("#per").val();

                let i = 1;
                $.each($("#menus tbody tr"), function () {
                    let det = new Object();
                    det.mid = this.cells[0].innerText;
                    detalle.push(det);
                });

                perfil.per = per;
                perfil.det = detalle;

                get("/ws/perfiles.aspx/Insertar", JSON.stringify({ info: JSON.stringify(perfil) }))
                    .then(function (res) {
                        if (res.Respuesta === 1) {
                            Alerta("El perfil se agregó correctamente");
                            limpiaControles('datos');
                            $("#menus tbody").empty();

                            cargaPerfilesTable();
                        }
                        else {
                            Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                        }
                    })
                    .catch(function (res) {
                        Alerta("No fue posible insertar el perfil<br />" + res, "Error!", typIconoAlerta.error);
                    })
            }
        })
    }
    function editarPerfil(id) {
        $("#guaper").hide();
        $("#actper").show();
        cargaMenu(id)
        get('/ws/perfiles.aspx/Editar', JSON.stringify({ id: id }))
            .then(function (res) {
                let id;
                let pre;

                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#id").val(res.Info.per.id);

                        $("#per").val(res.Info.per.per);

                        $("#menus tbody").empty();

                        pre = "info";
                        $.each(res.Info.prmen, function () {
                            id = $("#menus tbody tr").length;
                            fila = '<tr id="f' + pre + id + '">' +
                                '<td id="n' + pre + id + '" style="display: none">' + this.MenuId + '</td>' +
                                '<td class="text-right"> ' + this.MenuNombre + '</td > ' +
                                '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina menu"></i></td></tr>';

                            $("#menus tbody").append(fila);

                            fila = $("#menus tr:last");
                            $(fila).css({ "cursor": "pointer" });
                            $("#b" + pre + id).on("click", function () {
                                Swal.fire({
                                    title: 'Confirmación',
                                    html: '¿Confirma que desea eliminar el menú <b>' + $("#n" + id).text() + '</b>?',
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

                        })

                        $("#act").show();
                        $("#gua").hide();
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible editar el registro<br />" + error, "ERROR!");
            })
    }
    function editaperfil() {
        let per = new Object();
        let detalle = new Array();
        let perfil = new Object();
        per.id = $("#id").val();
        per.per = $("#per").val();

        let i = 1;
        $.each($("#menus tbody tr"), function () {
            let det = new Object();
            det.id = $("#id").val();
            det.mid = this.cells[0].innerText;
            detalle.push(det);
        });

        perfil.per = per;
        perfil.det = detalle;
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea actualizar el peril?<br/>Serie: <b>' + $("#per").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/perfiles.aspx/Edita`, {
                    method: 'POST', body: JSON.stringify({ info: JSON.stringify(perfil) }), headers: { 'Content-Type': 'application/json' }
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
                    Alerta("El perfil se edito correctamente");
                    let param = new Object();

                    cargaPerfilesTable();
                    cargaMenuP(0);
                    limpiaControles('datos');
                    $("#menus tbody").empty();

                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        })
    }

    //Carla los menus de un perfil
    function cargaMenu(id) {
        $("#men").empty().append('<option value=""></option>');

        get("/ws/menus.aspx/ConsultarMP", JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $.each(res.Info, function () {
                        $("#men").append('<option value="' + this.MenuId + '">' + this.MenuNombre + '</option>');
                    });
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }, function (res) {
                Alerta("No fue posible cargar el listado de menus<br/>" + res.Mensaje, "Error!", typIconoAlerta.error);
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de menus<br/>" + typIconoAlerta.error, "Error!", typIconoAlerta.error);
            })
    }
    function cargaMenuP(id) {
        $("#men").empty().append('<option value=""></option>');

        get("/ws/menus.aspx/Consultar", JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $.each(res.Info, function () {
                        $("#men").append('<option value="' + this.id + '">' + this.nom + '</option>');
                    });
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }, function (res) {
                Alerta("No fue posible cargar el listado de menus<br/>" + res.Mensaje, "Error!", typIconoAlerta.error);
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de menus<br/>" + typIconoAlerta.error, "Error!", typIconoAlerta.error);
            })
    }
    $(document).ready(function () {
        cargaPerfiles();
        cargaPerfilesTable();

        $("#guaper").on("click", function () {
            if (valForm("datos")) {
                guardaPerfil();
            }
        });
        $("#actper").on("click", function () {
            if (valForm("datos")) {
                editaperfil();
            }
        });
        $("#agre").on("click", function () {
            if (valForm("datos")) {
                let id;
                let pre;
                let fila;

                id = $("#menus tbody tr").length;
                pre = "info";


                fila = '<tr id="f' + pre + id + '">' + '<td class="text-right" style="display: none">' + $("#men").val() + '</td>' +
                    '<td class="text-right">' + $('#men option:selected').text().trim() + '</td>' +
                    '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina menu"></i></td></tr>';


                $("#menus tbody").append(fila);
                fila = $("#menus tr:last");

                $(fila).css({ "cursor": "pointer" });
                $("#b" + pre + id).on("click", function () {
                    Swal.fire({
                        title: 'Confirmación',
                        html: '¿Confirma que desea eliminar el menu <b>' + $("#n" + pre + id).text() + '</b>?',
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

            }
        });

    });
})(jQuery);