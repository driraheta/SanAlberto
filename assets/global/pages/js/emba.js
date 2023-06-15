(function () {
    function Guardar() {
        let info = new Object();

        info.emb = $("#emb").val();
        get('/ws/embalaje.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    Alerta("El embalaje se agregó correctamente");
                    cargaEmbalajes(0);
                    $("#emb").val("");
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta(error, "ERROR!");
            })
    }
    function Actualziar() {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea actualizar la información del embalaje?',
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
                info.emb = $("#emb").val();

                return fetch(`/ws/embalaje.aspx/Actualizar`, {
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
                    cargaEmbalajes(0);
                    $("#emb").val("");
                    $("#id").val("");
                    $("#can").hide();
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            }
        })
    }
    function cargaEmbalajes(id) {
        $("#info tbody").empty();

        get('/ws/embalaje.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        let fila = "";

                        fila = '<tr>' +
                            '<td class="text-left">' + this.emb + '</td>' +
                            '<td class="text-center"><i id="e' + this.id + '" class="fa fa-edit"></i></td >' +
                            '<td class="text-center"><i id = "b' + this.id + '" class="fa fa-trash text-danger" ></i ></td > ' +
                            '</tr>';


                        $("#info tbody").append(fila);

                        let nom = this.emb;
                        $("#e" + this.id).css("cursor", "pointer").on("click", function () {
                            editarEmbalaje(this.id.substring(1));
                        });
                        $("#b" + this.id).css("cursor", "pointer").on("click", function () {
                            eliminaEmbalaje(this.id.substring(1), nom);
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
    function editarEmbalaje(id) {
        get('/ws/embalaje.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $("#emb").val(res.Info[0].emb);

                    $("#id").val(res.Info[0].id);
                    $("#can").show();
                    $("#emb").focus();
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta(error, "ERROR!");
            })
    }

    function eliminaEmbalaje(id, nom) {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea eliminar la información del embalaje <b>' + nom + '</b>?',
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
                return fetch(`/ws/embalaje.aspx/Eliminar`, {
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
                    cargaEmbalajes(0);
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            }
        })
    }

    $(document).ready(function () {
        $("#id").val("");
        cargaEmbalajes(0);

        $("#gua").on("click", function () {
            if (valForm("forma")) {
                if ($("#id").val() === "")
                    Guardar();
                else
                    Actualziar();
            }
        })
        $("#can").on("click", function () {
            $("#emb").val("");
            $("#can").hide();
            $("#id").val("");
        });
    });
})(jQuery);