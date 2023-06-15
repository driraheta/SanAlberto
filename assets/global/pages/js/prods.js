(function () {
    function cargaProductoss(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-hover table-responsive',
            columnas: [
                { leyenda: 'Codigo', class: 'text-center thp', ordenable: false, columna: 'CODIGO_PRODUCTO', filtro: false },
                { leyenda: 'Descripción', class: 'text-center thp', ordenable: false, columna: 'PRODUCTO', filtro: false },
                { leyenda: 'Estado', class: 'text-center thp', ordenable: false, columna: '', filtro: false },
                { leyenda: 'Editar', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
                { leyenda: 'Conversión', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false }
            ],
            modelo: [
                { propiedad: 'CODIGO_PRODUCTO', class: 'text-center tdp' },
                { propiedad: 'PRODUCTO', class: 'text-center tdp' },
                {
                    propiedad: 'STATUS', class: 'text-center px-2 tdp', style: "white-space:nowrap", formato: function (tr, obj, valor) {
                        if (valor === 1)
                            return "Activo";
                        if (valor === 2)
                            return "Inactivo";
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");

                        $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                            editarProducto(obj.ID_PRODUCTO);
                        });
                        container.appendChild(edita);

                        return container;
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        conversion = document.createElement("i");

                        $(conversion).addClass("fa fa-cogs text-info ml-2").prop("title", "").on("click", function () {
                            let param = new Object();
                            param.id = obj.ID_PRODUCTO;
                            cargaDetConv(param);
                            limpiaControles('convprods');
                            $("#nompp").val(obj.ID_PRODUCTO);
                            $("#coproc").val(obj.CODIGO_PRODUCTO);
                            $("#desc").val(obj.PRODUCTO);
                            $("#convprods").modal({ backdrop: 'static', keyboard: false });
                        });
                        container.appendChild(conversion);

                        return container;
                    }
                }

            ],
            url: '/ws/productos.aspx/Listar',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [20, 25, 50],
            columna: 'CODIGO',
            loader: "pre0",
            columna_orden: 'DESC'
        };

        $("#Productos").MALCO(data);
    }
    function Guardar() {
        let info = new Object();

        info.pro = $("#pro").val();
        info.esp = $("#esp").val() === "" ? null : $("#esp").val();
        info.var = $("#var").val() === "" ? null : $("#var").val();
        info.cali = $("#cali").val() === "" ? null : $("#cali").val();
        info.cal = $("#cal").val() === "" ? null : $("#cal").val();
        info.eti = $("#eti").val() === "" ? null : $("#eti").val();
        info.tipoProducto = $("#tipo").val() === "" ? null : $("#tipo").val();
        info.emb = $("#emb").val() === "" ? null : $("#emb").val();
        info.um = $("#um").val() === "" ? null : $("#um").val();
        info.copro = $("#copro").val();
        info.edo = $("#status").val();
        info.canu = $("#cant").val();
        info.idpeso = $("#peso").val() === "" ? null : $("#peso").val();
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
                return fetch(`/ws/productos.aspx/Insertar`, {
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
                    Alerta("El registro se insertó correctamente");
                    limpiaControles("forma");
                    cargaProductoss();
                    cargaProductoo();
                    $("#lista").show();
                    $("#headLabel").text("Mantenimiento de Productos");
                    $("#forma").hide();
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function Actualizar() {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea actualizar la información del producto?',
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
                info.pro = $("#pro").val();
                info.esp = $("#esp").val() === "" ? null : $("#esp").val();
                info.var = $("#var").val() === "" ? null : $("#var").val();
                info.cali = $("#cali").val() === "" ? null : $("#cali").val();
                info.cal = $("#cal").val() === "" ? null : $("#cal").val();
                info.eti = $("#eti").val() === "" ? null : $("#eti").val();
                info.tipoProducto = $("#tipo").val() === "" ? null : $("#tipo").val();
                info.emb = $("#emb").val() === "" ? null : $("#emb").val();
                info.um = $("#um").val() === "" ? null : $("#um").val();
                info.copro = $("#copro").val();
                info.edo = $("#status").val();
                info.idpeso = $("#peso").val() === "" ? null : $("#peso").val();
                info.canu = $("#cant").val();
                info.esInsumo = $("#chkde").is(":checked");

                return fetch(`/ws/productos.aspx/Actualizar`, {
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
                    limpiaControles("forma");
                    $("#id").val("");
                    $("#can").hide();

                    cargaProductoss();
                    $("#headLabel").text("Mantenimiento de Productos");
                    $("#lista").show();
                    $("#forma").hide();

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
                        $("#espv").append('<option value="' + this.id + '">' + this.esp + '</option>');
                        $("#espc").append('<option value="' + this.id + '">' + this.esp + '</option>');

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
    function cargaEmbalaje(id) {
        get('/ws/embalaje.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $("#emb").empty().append('<option value=""></option>')
                    $(res.Info).each(function () {
                        $("#emb").append('<option value="' + this.id + '">' + this.emb + '</option>');
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
    function cargaCalibres(id) {
        get('/ws/calibre.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        $("#cal").append('<option value="' + this.id + '">' + this.cal + '</option>');
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
    function cargaCalidades(id, idesp) {
        get('/ws/calidad.aspx/Consultar', JSON.stringify({ id: id, idesp: idesp }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        $("#cali").append('<option value="' + this.id + '">' + this.cal + '</option>');
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
    function cargaEtiquetas(id) {
        get('/ws/etiqueta.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $("#eti").empty().append('<option value=""></option>');
                    $(res.Info).each(function () {
                        $("#eti").append('<option value="' + this.id + '">' + this.eti + '</option>');
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
    function cargaPesos(id) {
        get('/ws/peso.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        $("#peso").append('<option value="' + this.id + '">' + this.peso + " " + this.nom + '</option>');

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

    function cargaProductos(id) {
        $("#info tbody").empty();
        get('/ws/productos.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        let fila = "";
                        var edo = this.edo;
                        if (edo === 1) {
                            edo = "Activo";
                        } else if (edo === 2) {
                            edo = "Inactivo";
                        }
                        fila = '<tr>' +
                            '<td>' + this.copro + '</td>' +
                            '<td>' + this.pro + '</td>' +
                            '<td>' + edo + '</td>' +
                            '<td style="white-space:nowrap"><i id="e' + this.id + '" class="fa fa-edit"></i>&nbsp;&nbsp;<i id="b' + this.id + '" class="fa fa-trash text-danger" style="display: none"></i>&nbsp;&nbsp;<i id="c' + this.id + '" class="fa fa-cart-plus text-info"></i></td>' +
                            '</tr>';


                        $("#info tbody").append(fila);

                        let nom = this.pro;
                        $("#e" + this.id).css("cursor", "pointer").on("click", function () {
                            editarProducto(this.id.substring(1));
                        });
                        $("#b" + this.id).css("cursor", "pointer").on("click", function () {
                            eliminaProducto(this.id.substring(1), nom);
                        });
                        $("#c" + this.id).css("cursor", "pointer").on("click", function () {
                            let param = new Object();
                            param.id = this.id.substring(1);
                            cargaDetConv(param);
                            limpiaControles('convprods');
                            $("#nompp").val(this.id.substring(1));
                            $("#convprods").modal({ backdrop: 'static', keyboard: false });

                        });
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
    function editarProducto(id) {
        get('/ws/productos.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info[0].esp === null) {
                        $("#datosesp").hide();
                        $("#chkde").prop("checked", true);
                    } else {
                        $("#datosesp").show();
                        $("#chkde").prop("checked", false);
                    }
                    $("#copro").val(res.Info[0].copro);
                    $("#pro").val(res.Info[0].pro);
                    $("#esp").val(res.Info[0].esp);
                    $("#var").val(res.Info[0].var);
                    $("#cali").val(res.Info[0].cali);
                    $("#cal").val(res.Info[0].cal);
                    $("#eti").val(res.Info[0].eti);
                    $("#tipo").val(res.Info[0].tipoProducto);
                    $("#emb").val(res.Info[0].emb);
                    $("#um").val(res.Info[0].um);
                    $("#peso").val(res.Info[0].idpeso);
                    $("#status").val(res.Info[0].edo);
                    $("#cant").val(res.Info[0].canu);

                    $("#id").val(id);
                    $("#lista").hide();
                    $("#forma").show();

                    $("#can").show();
                    $("#pro").focus();
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta(error, "ERROR!");
            });
    }
    function cargaVariedades(id, idesp) {
        get('/ws/variedades.aspx/Consultar', JSON.stringify({ id: id, idesp: idesp }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        $("#var").append('<option value="' + this.id + '">' + this.var + '</option>');
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
    function cargaUnidadesMedida(id) {
        get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        $("#um").append('<option value="' + this.id + '">' + this.um + '</option>');
                        //if (this.um.toUpperCase() !== 'CAJA') {
                        $("#ump").append('<option value="' + this.id + '">' + this.um + '</option>');
                        $("#umpe").append('<option value="' + this.id + '">' + this.um + '</option>');
                        //}
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
    function eliminaProducto(id, nom) {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea eliminar el producto <b>' + nom + '</b>?',
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
                return fetch(`/ws/productos.aspx/Eliminar`, {
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
                    cargaProductos(0);
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            }
        });
    }
    function limpiaPantalla() {
        limpiaControles("forma");
        $("#info tbody").empty();
        $("#id").val("");
    }
    function GuardarEspecie() {
        let info = new Object();

        info.esp = $("#desp").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#desp").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/especies.aspx/Insertar`, {
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
                    Alerta("El registro se insertó correctamente");
                    $('#esp option').remove();
                    $('#espv option').remove();
                    $('#espc option').remove();
                    $("#esp").append('<option value=""></option>');
                    $("#espv").append('<option value=""></option>');
                    $("#espc").append('<option value=""></option>');

                    cargaEspecies(0);
                    $("#mespecie").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarVariedad() {
        let info = new Object();
        info.var = $("#vari").val();
        info.esp = $("#espv").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar la variedad de  <b>' + $("#vari").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/variedades.aspx/Insertar`, {
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
                    Alerta("El registro se insertó correctamente");
                    $('#var option').remove();
                    $("#var").append('<option value=""></option>');

                    var ides = $('#esp').val() === "" ? 0 : $('#esp').val();
                    cargaVariedades(0, ides);
                    $("#mvariedad").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarCalidad() {
        let info = new Object();
        info.cal = $("#calid").val();
        info.esp = $("#espc").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar la calidad de  <b>' + $("#calid").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/calidad.aspx/Insertar`, {
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
                    Alerta("El registro se insertó correctamente");
                    $('#cali option').remove();
                    $("#cali").append('<option value=""></option>');

                    var ides = $('#esp').val() === "" ? 0 : $('#esp').val();
                    cargaCalidades(0, ides);
                    $("#mcalidad").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarCalibre() {
        let info = new Object();

        info.cal = $("#calibd").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#calibd").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/calibre.aspx/Insertar`, {
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
                    Alerta("El registro se insertó correctamente");
                    $('#cal option').remove();
                    $("#cal").append('<option value=""></option>');

                    cargaCalibres(0);
                    $("#mcalibre").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarEtiqueta() {
        let info = new Object();

        info.eti = $("#etid").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#etid").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/etiqueta.aspx/Insertar`, {
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
                    Alerta("El registro se insertó correctamente");
                    $('#eti option').remove();
                    $("#eti").append('<option value=""></option>');

                    cargaEtiquetas(0);
                    $("#metiqueta").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarEmbalaje() {
        let info = new Object();

        info.emb = $("#embd").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#embd").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/embalaje.aspx/Insertar`, {
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
                    Alerta("El registro se insertó correctamente");
                    $('#emb option').remove();
                    $("#emb").append('<option value=""></option>');

                    cargaEmbalaje(0);
                    $("#membalaje").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarUnidadMedida() {
        let info = new Object();

        info.um = $("#umd").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#umd").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/unidadesmedida.aspx/Insertar`, {
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
                    Alerta("El registro se insertó correctamente");
                    $('#um option').remove();
                    $("#um").append('<option value=""></option>');

                    cargaUnidadesMedida(0);
                    $("#munidadmedida").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarPesos() {
        let info = new Object();

        info.peso = $("#pes").val();
        info.nom = $("#nom").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#umd").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/peso.aspx/Insertar`, {
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
                    Alerta("El registro se insertó correctamente");
                    $('#peso option').remove();
                    $("#peso").append('<option value=""></option>');

                    cargaPesos(0);
                    $("#mpeso").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }

    function cargaProducto() {
        get('/ws/productos.aspx/ConsultarA', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#nomp").append('<option value="' + this.id + '">' + this.pro + '</option>');
                            $("#nomppe").append('<option value="' + this.id + '">' + this.pro + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
            });
    }
    function getProducto(id) {
        get('/ws/productos.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#cod").val(this.copro);
                            $("#desc").val(this.pro);
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
            });
    }
    function cargaDetConv(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
            columnas: [
                { leyenda: 'Tipo Operación', class: 'text-center thp', ordenable: false, columna: '', filtro: false },
                { leyenda: 'Descrípción', class: 'text-center thp', ordenable: false, columna: 'DESCRIPCION', filtro: false },
                { leyenda: 'Unidad de Medida', class: 'text-center thp', style: 'white-space:nowrap', ordenable: false, columna: 'UNIDAD_MEDIDA', filtro: false },
                { leyenda: 'Cantidad (Unidades)', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'CANTIDAD', filtro: false },
                { leyenda: '', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
                { leyenda: '', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false }
            ],
            modelo: [
                {
                    propiedad: 'TIPOOPERACION', class: 'text-center px-2 tdp', style: "white-space:nowrap", formato: function (tr, obj, valor) {
                        if (valor === 1)
                            return "Compra";
                        if (valor === 2)
                            return "Venta";
                    }
                },
                { propiedad: 'DESCRIPCION', class: 'text-center tdp' },
                { propiedad: 'UNIDAD_MEDIDA', class: 'text-center tdp' },
                { propiedad: 'CANTIDAD', class: 'text-center tdp' },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");

                        $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                            $("#idconvpe").val(obj.ID_PRODUCTOCONV);
                            $("#idpe").val(obj.ID_PRODUCTO);
                            $("#nomppe").val(obj.ID_PRODUCTO);
                            $("#coproce").val(obj.CODIGO_CONV);
                            $("#tpoopere").val(obj.TIPOOPERACION);
                            $("#umpe").val(obj.ID_UNIDAD_MEDIDA);
                            $("#desce").val(obj.DESCRIPCION);
                            $("#cantpe").val(obj.CANTIDAD);
                            $("#convprodse").modal({ backdrop: 'static', keyboard: false });

                        });
                        container.appendChild(edita);

                        return container;
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        conversion = document.createElement("i");

                        $(conversion).addClass("fa fa-cogs text-info ml-2").prop("title", "").on("click", function () {
                            let param = new Object();
                            param.idconv = obj.ID_PRODUCTOCONV;
                            cargaDetConvDet(param);
                            limpiaControles('convprodsdet');
                            $("#idprodconv").val(obj.ID_PRODUCTOCONV);
                            $("#nompp").val(obj.ID_PRODUCTO);
                            $("#convprodsdet").modal({ backdrop: 'static', keyboard: false });
                        });
                        container.appendChild(conversion);

                        return container;
                    }
                }

            ],
            url: '/ws/productos.aspx/ListarConv',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [20, 25, 50],
            columna: 'DESCRIPCION',
            loader: "pre0",
            columna_orden: 'DESC'
        };

        $("#Conversiones").MALCO(data);
    }
    function GuardarConv() {
        let info = new Object();
        info.id = $("#nompp").val();
        info.des = $("#desc").val();
        info.canr = $("#cantp").val();
        info.um = $("#ump").val();
        info.codc = $("#coproc").val();
        info.tipooper = $("#tpooper").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#desc").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/productos.aspx/InsertarConv`, {
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
                    Alerta("El registro se insertó correctamente");
                    let param = new Object();
                    param.id = $("#nompp").val();
                    cargaDetConv(param);

                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function cargaProductoo() {
        get('/ws/productos.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#nompp").empty().append('<option value=""></option>');
                        $("#nomppde").empty().append('<option value=""></option>');
                        $(res.Info).each(function () {
                            $("#nompp").append('<option value="' + this.id + '">' + this.pro + '</option>');
                            $("#nomppde").append('<option value="' + this.id + '">' + this.pro + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
            });
    }
    function cargaProductoInsumo() {
        get('/ws/productos.aspx/ConsultarporTipo', JSON.stringify({ id: 1, param:"%" }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#nomppd").empty().append('<option value=""></option>');
                        $(res.Info).each(function () {
                            $("#nomppd").append('<option value="' + this.id + '">' + this.pro + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
            });
    }

    function GuardarConve() {
        let info = new Object();
        info.idconv = $("#idconvpe").val();
        info.id = $("#nomppe").val();
        info.des = $("#desce").val();
        info.canr = $("#cantpe").val();
        info.um = $("#umpe").val();
        info.codc = $("#coproce").val();
        info.tipooper = $("#tpoopere").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea editar el registro de  <b>' + $("#desc").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/productos.aspx/ActualizarConv`, {
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
                    Alerta("El registro se edito correctamente");
                    let param = new Object();
                    param.id = $("#nompp").val();
                    cargaDetConv(param);
                    $("#convprodse").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }

    //Detalle de la conversion
    function cargaDetConvDet(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
            columnas: [
                { leyenda: 'Descrípción', class: 'text-center thp', ordenable: false, columna: 'DESCRIPCION', filtro: false },
                { leyenda: 'Cantidad (Unidades)', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'CANTIDAD', filtro: false },
                { leyenda: '', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
                { leyenda: '', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false }
            ],
            modelo: [

                { propiedad: 'DESCRIPCION', class: 'text-center tdp' },
                { propiedad: 'CANTIDAD', class: 'text-center tdp' },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");

                        $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                            $("#idprodconve").val(obj.ID_PRODUCTOCONV);
                            $("#nomppde").val(obj.ID_PRODUCTO);
                            $("#cantpde").val(obj.CANTIDAD);
                            $("#convprodsdete").modal({ backdrop: 'static', keyboard: false });

                        });
                        container.appendChild(edita);

                        return container;
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");

                        $(edita).addClass("fa fa-trash").prop("title", "Editar").on("click", function () {
                            EliminarConvDet(obj.ID_PRODUCTO, obj.ID_PRODUCTOCONV)
                        });
                        container.appendChild(edita);

                        return container;
                    }
                }
            ],
            url: '/ws/productos.aspx/ListarConvDet',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [20, 25, 50],
            columna: 'DESCRIPCION',
            loader: "pre0",
            columna_orden: 'DESC'
        };

        $("#Conversionesdet").MALCO(data);
    }
    function GuardarConvDet() {
        let info = new Object();
        info.idconv = $("#idprodconv").val();
        info.id = $("#nomppd").val();
        info.canr = $("#cantpd").val();
        info.des = $('#nomppd option:selected').text();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $('#nomppd option:selected').text() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/productos.aspx/InsertarConvDet`, {
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
                    Alerta("El registro se insertó correctamente");
                    let param = new Object();
                    param.idconv = $("#idprodconv").val();
                    cargaDetConvDet(param);

                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarConvDete() {
        let info = new Object();
        info.idconv = $("#idprodconve").val();
        info.id = $("#nomppde").val();
        info.canr = $("#cantpde").val();
        info.des = $('#nomppde option:selected').text();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea editar el registro de  <b>' + $('#nomppde option:selected').text() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/productos.aspx/ActualizarConvDet`, {
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
                    Alerta("El registro se edito correctamente");
                    let param = new Object();
                    param.idconv = $("#idprodconve").val();
                    cargaDetConvDet(param);
                    $("#convprodse").modal("toggle");

                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function EliminarConvDet(idprod, idconv) {
        let info = new Object();
        info.idconv = idconv;
        info.id = idprod;

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea eliminar el registro de  <b>' + $('#nomppde option:selected').text() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/productos.aspx/EliminarConvDet`, {
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
                    Alerta("El registro se elimino correctamente");
                    let param = new Object();
                    param.idconv = idconv;
                    cargaDetConvDet(param);

                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }


    $(document).ready(function () {
        $("#id").val("");
        cargaProductoss();
        cargaEspecies(0);
        cargaCalidades(0, 0);
        cargaCalibres(0);
        cargaEmbalaje(0);
        //cargaProductos(0);
        cargaEtiquetas(0);
        cargaProducto();
        cargaProductoo();
        cargaProductoInsumo();
        cargaVariedades(0, 0);
        cargaUnidadesMedida(0);
        cargaPesos(0);
        var descprod = new Array(8);
        var descprodc = new Array(2);

        //validar escribir solo numeros en los inputs con clase numeros
        $(".numeros").on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
        //check change
        //$('input[type=checkbox][name=chkde]').on('change', function () {
        //    if (this.checked === true) {
        //        $("#datosesp").hide();
        //    }
        //    else if (this.checked === false) {
        //        $("#datosesp").show();
        //    }

        //});

        $('.select2').each(function () {
            $(this).select2({
                width: '100%'
            });
        });

        /*CAMBIO DE BUSQUEDA DE SELECT 2--EXPRESIONES REGULARES*/
        $("#nomppd").select2({
            width: '100%',
            placeholder: "productos",
            allowClear: true,
            matcher: function (params, data) {
                // If there are no search terms, return all of the data
                if ($.trim(params.term) === '') {
                    return data;
                }
                var palabra = params.term;
                var filtro = ".*" + palabra.replace(/\s+/g, ".*") + ".*";
                /*
                rex = new RegExp(filtro, 'i');
                  Do not display the item if there is no 'text' property
                  if (typeof data.text === 'undefined') {
                      return data;
                  }
                  */
                // `params.term` should be the term that is used for searching
                // `data.text` is the text that is displayed for the data object
                //console.log(data.text);

                if (data.text.toUpperCase().search(filtro.toUpperCase()) > -1) {
                    var modifiedData = $.extend({}, data, true);
                    modifiedData.text += '';
                    // You can return modified objects from here
                    // This includes matching the `children` how you want in nested data sets
                    return modifiedData;
                }

                // Return `null` if the term should not be displayed
                return null;
            }

        });

        $('#tipo').on('change', function () {
            if ($('#tipo').val() > 1) {
                $("#datosesp").hide();
                if ($('#tipo').val() == '3') {
                    $('#cant').val('1');
                    $('#cant').attr('readonly', true);
                }
            }
            else {
                $('#cant').attr('readonly', false);

                $("#datosesp").show();
            }

        });

        $("#gua").on("click", function () {
            if (valForm("forma")) {
                if ($("#id").val() === "")
                    Guardar();
                else
                    Actualizar();
            }
        });
        $("#guaesp").on("click", function () {
            if (valForm("mespecie")) {
                GuardarEspecie();
            }
        });
        $("#guavar").on("click", function () {
            if (valForm("mvariedad")) {
                GuardarVariedad();
            }
        });
        $("#guacal").on("click", function () {
            if (valForm("mcalidad")) {
                GuardarCalidad();
            }
        });
        $("#guacalib").on("click", function () {
            if (valForm("mcalibre")) {
                GuardarCalibre();
            }
        });
        $("#guaeti").on("click", function () {
            if (valForm("metiqueta")) {
                GuardarEtiqueta();
            }
        });
        $("#guaemb").on("click", function () {
            if (valForm("membalaje")) {
                GuardarEmbalaje();
            }
        });
        $("#guaum").on("click", function () {
            if (valForm("munidadmedida")) {
                GuardarUnidadMedida();
            }
        });
        $("#guapeso").on("click", function () {
            if (valForm("mpeso")) {
                GuardarPesos();
            }
        });
        $("#can").on("click", function () {
            limpiaControles("forma");
            $("#headLabel").text("Mantenimiento de Productos");
            $("#id").val("");
            $("#lista").show();
            $("#forma").hide();
        });
        $("#cane").on("click", function () {
            limpiaControles("mespecie");
            $("#mespecie").modal("toggle");
        });
        $("#canvar").on("click", function () {
            limpiaControles("mvariedad");
            $("#mvariedad").modal("toggle");
        });
        $("#cancal").on("click", function () {
            limpiaControles("mcalidad");
            $("#mcalidad").modal("toggle");
        });
        $("#cancalib").on("click", function () {
            limpiaControles("mcalibre");
            $("#mcalibre").modal("toggle");
        });
        $("#caneti").on("click", function () {
            limpiaControles("metiqueta");
            $("#metiqueta").modal("toggle");
        });
        $("#canemb").on("click", function () {
            limpiaControles("membalaje");
            $("#membalaje").modal("toggle");
        });
        $("#canum").on("click", function () {
            limpiaControles("munidadmedida");
            $("#munidadmedida").modal("toggle");
        });
        $("#canpeso").on("click", function () {
            limpiaControles("mpeso");
            $("#mpeso").modal("toggle");
        });

        $("#nue").on("click", function () {
            limpiaPantalla();
            $("#lista").hide();
            $("#forma").show();
            $("#status").prop("selectedIndex", 1);
            $("#headLabel").text("Registro de Productos");

        });
        $('#esp').change(function () {
            $('#cali option').remove();
            $('#var option').remove();
            $("#var").append('<option value=""></option>');
            $("#cali").append('<option value=""></option>');
            var ide = $('#esp').val() === "" ? 0 : $('#esp').val();
            cargaCalidades(0, ide);
            cargaVariedades(0, ide);
            descprod[1] = $('#esp option:selected').text();
            $('#pro').val(descprod.join(' '));
        });
        $('#var').change(function () {
            descprod[2] = $('#var option:selected').text().trim();
            $('#pro').val(descprod.join(' '));

        });
        $('#cali').change(function () {
            descprod[3] = $('#cali option:selected').text().trim();
            $('#pro').val(descprod.join(' '));
        });
        $('#cal').change(function () {
            descprod[4] = $('#cal option:selected').text().trim();
            $('#pro').val(descprod.join(' '));
        });
        $('#eti').change(function () {
            descprod[5] = $('#eti option:selected').text().trim();
            $('#pro').val(descprod.join(' '));
        });
        $('#emb').change(function () {
            descprod[6] = $('#emb option:selected').text().trim();
            $('#pro').val(descprod.join(' '));
        });
        $('#um').change(function () {
            descprod[7] = $('#um option:selected').text().trim();
            $('#pro').val(descprod.join(' '));

        });
        $('#peso').change(function () {
            descprod[8] = $('#peso option:selected').text().trim();
            $('#pro').val(descprod.join(' '));

        });
        $("#nesp").on("click", function () {
            limpiaControles("mespecie");
            $("#mespecie").modal({ backdrop: 'static', keyboard: false });
        });
        $("#nvar").on("click", function () {
            limpiaControles("mvariedad");
            $("#mvariedad").modal({ backdrop: 'static', keyboard: false });
        });
        $("#ncal").on("click", function () {
            limpiaControles("mcalibre");
            $("#mcalibre").modal({ backdrop: 'static', keyboard: false });
        });
        $("#ncali").on("click", function () {
            limpiaControles("mcalidad");
            $("#mcalidad").modal({ backdrop: 'static', keyboard: false });
        });
        $("#neti").on("click", function () {
            limpiaControles("metiqueta");
            $("#metiqueta").modal({ backdrop: 'static', keyboard: false });
        });
        $("#nemb").on("click", function () {
            limpiaControles("membalaje");
            $("#membalaje").modal({ backdrop: 'static', keyboard: false });
        });
        $("#num").on("click", function () {
            limpiaControles("munidadmedida");
            $("#munidadmedida").modal({ backdrop: 'static', keyboard: false });
        });
        $("#npeso").on("click", function () {
            limpiaControles("mpeso");
            $("#mpeso").modal({ backdrop: 'static', keyboard: false });
        });
        $("#copro").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $('#nomp').change(function () {
            getProducto($('#nomp').val());
        });
        $("#canp").on("click", function () {
            $("#convprods").modal("toggle");
        });
        $("#agrp").on("click", function () {
            GuardarConv();
        });
        $("#opc").on("change", function () {
            $("#bval").hide();

            if ($(this).val() === "1") {
                $("#bval").show();
            }
            else if ($(this).val() === "2") {
                $("#bval").show();
            }
            else if ($(this).val() !== "") {
                $("#bval").show();
            }
        });
        $("#bus").on("click", function () {
            let codValor = $("#codValor").val();
            let nomValor = $("#nomValor").val();
            //let estValor = $("#estValor").val();
            let estValor = $("#estValor option:selected").text();
            let cantidadRegistros = 0;

            $("#MALCO-Productos tbody tr").show();

            if (codValor != '') {
                //FILTRO DE CODIGO DE PRODUCTO
                $("#MALCO-Productos tbody").children("tr").each(function (index) {
                    let codigoProducto = $($(this).children("td")[0]).text().toUpperCase();
                    if (codigoProducto.includes(codValor) == true /*startsWith(codValor.toUpperCase())*/) {
                        var fila = $(this);
                        if (!fila.is(":hidden")) {
                            fila.show();
                            cantidadRegistros++;
                        }
                    } else {
                        $(this).hide();
                    }
                });
                //validarRegistros(cantidadRegistros);
            }

            if (nomValor != '') {
                //FILTRO DE CODIGO DE PRODUCTO
                $("#MALCO-Productos tbody").children("tr").each(function (index) {
                    let nombreProducto = $($(this).children("td")[1]).text().toUpperCase();
                    if (nombreProducto.startsWith(nomValor.toUpperCase())) {
                        var fila = $(this);
                        if (!fila.is(":hidden")) {
                            fila.show();
                            cantidadRegistros++;
                        }
                    } else {
                        $(this).hide();
                    }
                });
                //validarRegistros(cantidadRegistros);
            }

            if (estValor != "Todos") {
                //FILTRO ESTADO
                //TIPO ESTADO: NUEVO                1
                //TIPO ESTADO: EN PROCESO           2
                //TIPO ESTADO: INGRESADO A CAMARA   3
                //TIPO ESTADO: FACTURADO            4
                //TIPO ESTADO: ENVIADO A DESTINO    5
                $("#MALCO-Productos tbody").children("tr").each(function (index) {
                    let estadoProducto = $($(this).children("td")[2]).text().toUpperCase();
                    if (estadoProducto.startsWith(estValor.toUpperCase())) {
                        var fila = $(this);
                        if (!fila.is(":hidden")) {
                            fila.show();
                            cantidadRegistros++;
                        }
                    } else {
                        $(this).hide();
                    }
                });
                //validarRegistros(cantidadRegistros);
            }

        });
        //Edita
        $("#canpe").on("click", function () {
            $("#convprodse").modal("toggle");
        });
        $("#agrpe").on("click", function () {
            GuardarConve();
        });

        //$('#tpooper').change(function () {
        //    descprodc[1] = $('#tpooper option:selected').text();
        //    $('#desc').val(descprodc.join(' '));
        //});
        //$('#ump').change(function () {
        //    descprodc[2] = $('#ump option:selected').text();
        //    $('#desc').val(descprodc.join(' '));
        //});
        //Detalle Conversión
        $("#canpd").on("click", function () {
            $("#convprodsdet").modal("toggle");
        });
        $("#agrpd").on("click", function () {
            GuardarConvDet();
        });
        $("#canpde").on("click", function () {
            $("#convprodsdete").modal("toggle");
        });
        $("#agrpde").on("click", function () {
            GuardarConvDete();
        });

        $("#bval").keyup(function () {
            if (jQuery(this).val() != "") {
                jQuery("#MALCO-Productos tbody>tr").hide();
                jQuery("#MALCO-Productos td:contiene-palabra('" + $(this).val() + "')").parent("tr").show();
            }
            else {
                jQuery("#MALCO-Productos tbody>tr").show();
            }
        });

        jQuery.extend(jQuery.expr[":"],
            {
                "contiene-palabra": function (elem, i, match, array) {
                    console.log("contiene palabra" + elem);
                    return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
                }
            });
    });
})(jQuery);