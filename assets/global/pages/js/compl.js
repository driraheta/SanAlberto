
(function ($) {
    $(document).ready(function () {
        //cargarListRazonSocialProveedor();
        cargaExportadores();
        cargaOrdenes();
        cargaOrdenesOC();
        cargaImp("%");
        cargaUbigeos();
        cargaImpuestos();
        cargaAlmacenes();
        cargaUnidadesMedida();
        cargaProducto();
        cargarProductosSelectAgregar('nompi',0,'%');
        Moneda.Consultar("#mon");
        Moneda.Consultar("#monv");
        cargaCondicionesPago();
        cargaPuntosEntraga();
        $('.select2').each(function () {
            $(this).select2({
                width: '100%'
            });
        });

        //validar escribir solo numeros en los inputs con clase numeros
        $(".numeros").on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });

        $('#fec').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
        $('#fecvig').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });

        $('.fecha').each(function () {
            $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy" });
        });
        //check change
        $("#nomprod").hide();

        $('input[type=checkbox][name=chkde]').on('change', function () {
            if (this.checked === true) {
                $("#btnbusc").hide();
                $("#nomprod").show();
                $("#nomp").hide();
                $("#nomprod").removeClass("has-error");
                $("#nompValidar").hide();
                $("#codp").removeClass("d-none");
                $("#filtroProductoPL").hide();
                $("#filtroProductoPL").val("");
                $("#idpro").val("");
                $("#codp").val("");
                $("#nomprod").val("");
                $($($("#codp").parent().parent())).children("label").html("Código");

                $('#nomp option').each(function () {
                    $(this).show();
                    $('#nomp option:first-child').attr("selected", true);
                });
            }
            else if (this.checked === false) {
                $("#btnbusc").show();
                $("#nomprod").hide();
                $("#nomp").show();
                $("#nomp").removeClass("has-error");
                $("#nompValidar").hide();

                $("#codp").addClass("d-none");
                $("#filtroProductoPL").show();
                $("#filtroProductoPL").val("");
                $("#idpro").val("");
                $("#codp").val("");
                $("#nomp").val("");
                $($($("#codp").parent().parent())).children("label").html("Filtrar");
            }
        });
        $('#filtroProductoPL').on("keyup", function () {
            let filtro = $('#filtroProductoPL').val();
            let _this = this;
            let validador = 0;
            let contador = 0;

            $('#nomp option').each(function () {
                let nombreProducto = $(this).text().toUpperCase();
                let codigoProducto = $(this).attr("codigo");
                if (nombreProducto.indexOf(filtro.toUpperCase()) !== -1 || codigoProducto.indexOf(filtro) !== -1) {

                    $(this).show();
                    if (validador === 0) {
                        $(this).attr("selected", true);
                        $('#nomp').val($(this).val());
                        $("#codp").val(codigoProducto);
                        $("#idpro").val($(this).val());

                        validador++;
                    } else {
                        $(this).attr("selected", false);
                    }
                } else {
                    $(this).attr("selected", false);
                    $(this).hide();
                    contador++;
                    if ($(this).attr("style") == "display: none;" && contador == $('#nomp option').length) {
                        $('#nomp').val('');
                    }
                }
                if (filtro == '') {
                    //SELECCIONAR EL PRIMERO
                    $(this).show();
                    $('#nomp option:first-child').attr("selected", true);
                }
            });
        });
        $('#filtroProductoEditar').on("keyup", function () {
            let filtro = $('#filtroProductoEditar').val();
            let validador = 0;
            let contador = 0;

            $('#nompe option').each(function () {
                let nombreProducto = $(this).text().toUpperCase();
                let codigoProducto = $(this).attr("codigo");

                if (nombreProducto.indexOf(filtro.toUpperCase()) !== -1 || codigoProducto.indexOf(filtro) !== -1) {

                    $(this).show();
                    if (validador === 0) {
                        $(this).attr("selected", true);
                        $('#nompe').val($(this).val());
                        $("#codpe").val(codigoProducto);
                        $("#idproe").val($(this).val());

                        validador++;
                    } else {
                        $(this).attr("selected", false);
                    }
                } else {
                    $(this).attr("selected", false);
                    $(this).hide();
                    contador++;
                    if ($(this).attr("style") == "display: none;" && contador == $('#nompe option').length) {
                        $('#nompe').val('');
                    }
                }
                if (filtro == '') {
                    //SELECCIONAR EL PRIMERO
                    $(this).show();
                    $('#nompe option:first-child').attr("selected", true);
                }
            });
        });
        //tipo de comprobante change        
        $('#tc').change(function () {
            if ($('#tc').val() != '') {
                cargaTipocomprobante($('#tc').val());
            }
            if ($("#tc option:selected").text().toUpperCase() === "FACTURA") {
                $("#serie").prop("readonly", false);
                $("#numero").prop("readonly", false);
                $("#serie").val("");
                $("#numero").val("");
            } else if ($("#tc option:selected").text().toUpperCase() === "BOLETA") {
                $("#serie").prop("readonly", false);
                $("#numero").prop("readonly", false);
                $("#serie").val("");
                $("#numero").val("");

            } else {
                $("#serie").prop("readonly", true);
                $("#numero").prop("readonly", true);
                
            }
        });
        $("#bus").on("click", function () {
            let param = new Object();
            if ($('#compraValor').val() != "") {
                param.num = $('#compraValor').val();
            }
            if ($('#proveedorValor').val() != "") {
                param.prov = $('#proveedorValor').val();
            }
            if ($('#rucValor').val() != "") {
                param.ruc = $('#rucValor').val();
            }
            if ($('#bedo').val() != "") {
                param.edo = $("#bedo").val();
            }
            if (jQuery.isEmptyObject(param)) {
                cargaOrdenes();
            }
            else {
                cargaOrdenes(param);
            }
        });
        
        
        /*agregado cargar importaciones seleccionadas en tabla
        $("#c").on("click", function () {
            let total = 0;
            //agregado tabla imp
            $.each($("#tableImp tbody tr"), function () {
                let detalleCR = new Object();

                let t = $("#tot").text().replace("USD", "").replace("S/.", "").replace(",","");
                detalleCR.idreg = this.cells[0].innerText;
                detalleCR.asignacion = this.cells[2].innerText;
                detalleCR.importeReg = this.cells[3].innerText;
                total = (parseFloat(t.toString()) / 100) * parseInt(this.cells[2].innerText);
              
                console.log("ccc" + total);
                detalleCR.montoAsig = total;


            });
    });*/
     /*asignacion*/
        $("#agregaImp").on("click", function () {
            let porcentaje = 0;
            if ($("#asignacion").val() == "" || $("#imp option:selected").attr("impor") == undefined) {

                Alerta("Selecciona una importación o ingresa la asignación que le corresponde","AVISO!");
            } else if ($("#asignacion").val() < 1 || $("#asignacion").val() > 100) {
                Alerta("El porcentaje a ingresar debe estar entre 1 y 100","AVISO!");
            }  else {
                let importe2 = 0;
                /*para suma de asignaciones*/
                $("#tableImp tbody").children("tr").each(function () {
                  let asig = $($(this).children("td")[3]).text();
                    importe2 += Number(asig);
                    console.log("aa" + asig);
                });

                porcentaje = importe2 + Number($("#asignacion").val());
                console.log("porc" + porcentaje);

            /*para verificar si ya está agregado en la tabla esa importacion*/
                let imp = $("#imp").val();
                $("#tableImp tbody").children("tr").each(function () {
                    let im = $($(this).children("td")[0]).text();
                    if (imp == im) {
                        imp = 1;
                    } 
                });
                if (imp == 1) {
                    Alerta("Ya está agregada la importación", "AVISO!");
                }else 
                if (porcentaje > 100) {
                    Alerta("No puede agregar la importación. El total de las asignaciones no debe sobrepasar el 100%.", "AVISO!");
                } else {
                    agreegarImpTable();

                    $("#asignacion").val("");
                } 
                 }
        });


        function agreegarImpTable() {

            let fila = "";
            let impor = $("#imp option:selected").attr("impor");
            let id = $("#tableImp tbody tr").length;
            let asig = $("#asignacion").val();
            let t = $("#tot").text().replace("USD", "").replace("S/.", "").replace(",", "");
            let monto = 0.00;
            if (t <1) {
                monto = 0;
            } else {
                monto = (parseFloat(t.toString()) / 100) * parseInt(asig);
            }

            fila = "<tr id='fila" + id + "'>" +
                "<td class='d-none'>" + $("#imp option:selected").attr("numeroregistro") + "</td>"+
                "<td class='text-center' id='n" + id + "'>" + impor + "</td>" +
                "<td class='text-center d-none'>" + $("#imp option:selected").attr("total") + "</td>" +
                "<td class='text-center'>" + asig + "</td>" +
                "<td class='text-center'>" + formatoMoneda(monto,2,true) + "</td>" +
                "<td class='text-center' id='e" + id + "'>" + "<i class='fa fa-trash text-danger' title='Eliminar Importacion'></i></td></tr > ";
            $("#tableImp tbody").append(fila);
            $("#e" + id).on("click", function () {
                Swal.fire({
                    title: 'Confirmación',
                    html: '¿Confirma que desea eliminar la importación N°<b>' + $("#n" + id).text() + '</b>?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#1cc88a',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Si, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        $("#fila" + id).remove();

                    }
                });
            });
        };

        $("#restablecerFiltros").on("click", function () {
            $("#compraValor").val("");
            $("#proveedorValor").val("");
            $("#rucValor").val("");
            $("#bedo").val("");
            cargaOrdenes();
        });

        $("#busoc").on("click", function () {
            let param = new Object();

            if ($('#ocValor').val() != "") {
                param.num = $('#ocValor').val();
            }
            if ($('#proveedorOcValor').val() != "") {
                param.prov = $('#proveedorOcValor').val();
            }
            if ($('#rucOcValor').val() != "") {
                param.ruc = $('#rucOcValor').val();
            }
            if ($('#ocbedo').val() != "") {
                param.edo = $("#ocbedo").val();
            }
            if (jQuery.isEmptyObject(param)) {
                cargaOrdenesOC();
            }
            else {
                cargaOrdenesOC(param);
            }

        });

        $("#restablecerFiltrosoc").on("click", function () {
            $("#ocValor").val("");
            $("#proveedorOcValor").val("");
            $("#rucOcValor").val("");
            $("#ocbedo").val("");
            cargaOrdenesOC();
        });

        $("#opc").on("change", function () {
            $("#bfec").hide();
            $("#bfec").hide();

            $("#bval").hide();
            $(".gj-icon").parent().hide();

            if ($(this).val() === "3") {
                $("#bfec").show();
                $(".gj-icon").parent().show();
            }
            else if ($(this).val() === "5") {
                $("#bedo").show();
            } else if ($(this).val() !== "1") {
                $("#bval").show();
            } else if ($(this).val() !== "4") {
                $("#bval").show();
            } else if ($(this).val() !== "6") {
                $("#bval").show();
            }
            else if ($(this).val() !== "") {
                $("#bfec").hide();
                $("#bedo").hide();
                $("#bval").hide();
            }
        });
        $("#opcoc").on("change", function () {
            $("#bfecoc").hide();
            $("#bfecoc").hide();

            $("#bvaloc").hide();
            $(".gj-icon").parent().hide();

            if ($(this).val() === "3") {
                $("#bfecoc").show();
                $(".gj-icon").parent().show();
            }
            else if ($(this).val() === "5") {
                $("#bedooc").show();
            } else if ($(this).val() !== "1") {
                $("#bvaloc").show();
            } else if ($(this).val() !== "4") {
                $("#bvaloc").show();
            } else if ($(this).val() !== "6") {
                $("#bvaloc").show();
            }
            else if ($(this).val() !== "") {
                $("#bfecoc").hide();
                $("#bedooc").hide();
                $("#bvaloc").hide();
            }
        });

        $("#mon").on("change", function () {
            if ($("#mon").val() != '')
                getSimboloMoneda($("#mon").val());
        });
        $("#gua").on("click", function () {

            if (valForm('info')) {

                /*
                let importe2 = 0;
                let importeAsignado = 0;
                let t = $("#tot").text().replace("USD", "").replace("S/.", "").replace(",", "");
                $("#tableImp tbody").children("tr").each(function () {
                    let asig = $($(this).children("td")[3]).text();
                    let monto = $($(this).children("td")[4]).text().replace("USD", "").replace("S/.", "").replace(",","");
                    importe2 += Number(asig);
                    importeAsignado += Number(monto);
                    console.log("aa" + asig);
                });*/
                




                if ($("#tableImp tbody tr").length <= 0) {
                    Alerta("Debe seleccionar al menos una importación", "AVISO!");
                }/* else if (importe2 < 100) {
                    Alerta("Las importaciones seleccionadas deben cumplir con el 100% de asignación." + "</br><strong>Monto total asignado:</strong> " +
                        formatoMoneda(parseFloat(importeAsignado), 2, true)  + "</br> <strong>Monto Pendiente: </strong>" + formatoMoneda(parseFloat(t) - importeAsignado, 2, true), "AVISO!");

                }*/

                else {

                if ($("#productos tbody tr").length > 0) {
                    let opc = $("#tc").val();

                    if (opc !== undefined && opc !== "") {



                              validaestado(opc);
                          
                        //guardaComprobante(opc);
                    }
                    else {
                        Alerta("Debe especificar el tipo de comprobante a generar", "AVISO!");
                    }
                }
                else {
                    Alerta("Debe especificar al menos un producto", "AVISO!");
                }}
            }
        });
        $("#act").on("click", function () {
            if (valForm('info')) {
                if ($("#productos tbody tr").length > 0) {
                    let opc = $("#tc").val();

                    if (opc !== undefined && opc !== "") {
                        Swal.fire({
                            title: 'La compra esta Pendiente o Cancelada?',
                            showDenyButton: true,
                            showCancelButton: false,
                            confirmButtonText: 'Pendiente',
                            denyButtonText: 'Cancelado'
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                editaComprobante(opc,1);
                                //guardaComprobante(opc, 1);
                            } else if (result.isDenied) {
                                let importe2 = 0;
                                let importeAsignado = 0;
                                let t = $("#tot").text().replace("USD", "").replace("S/.", "").replace(",", "");
                                $("#tableImp tbody").children("tr").each(function () {
                                    let asig = $($(this).children("td")[3]).text();
                                    let monto = $($(this).children("td")[4]).text().replace("USD", "").replace("S/.", "").replace(",", "");
                                    importe2 += Number(asig);
                                    importeAsignado += Number(monto);
                                    console.log("aa" + asig);
                                });
                                if (importe2 < 100) {
                                    Alerta("Las importaciones seleccionadas deben cumplir con el 100% de asignación." + "</br><strong>Monto total asignado:</strong> " +
                                        formatoMoneda(parseFloat(importeAsignado), 2, true) + "</br> <strong>Monto Pendiente: </strong>" + formatoMoneda(parseFloat(t) - importeAsignado, 2, true), "AVISO!");

                                } else {

                                    editaComprobante(opc,3);
                                }

                                //guardaComprobante(opc, 2);
                            }
                        });




                    }
                    else {
                        Alerta("Debe especificar el tipo de comprobante a generar", "AVISO!");
                    }
                }
                else {
                    Alerta("Debe especificar al menos un producto", "AVISO!");
                }
            }
        });
        $("#npro").on("click", function () {
            $("#nvoCombo").addClass("d-none");
            $("#prods").modal({ backdrop: 'static', keyboard: false });
            limpiaControles('prods');
            $("#ivg").prop("selectedIndex", 0);
            if ($("#ivg option").length === 2) {
                $("#ivg").prop("selectedIndex", 1);
            }
            $("#ivg").trigger("change");
            var i = 0;
            $("#ump option").each(function () {
                if ($(this).text().toUpperCase() === "CAJA") {
                    $("#ump").prop("selectedIndex", i);
                }
                i++;
            });
            $("#ump").trigger('change');
            var j = 0;
            $("#umpe option").each(function () {
                if ($(this).text().toUpperCase() === "CAJA") {
                    $("#umpe").prop("selectedIndex", j);
                }
                j++;
            });
            $("#umpe").trigger('change');
            $("#nomp").focus();
        });
        $("#bcod").on("click", function () {
            cargaProductosc($("#codp").val());
        });
        $("#bcode").on("click", function () {
            cargaProductosce($("#codpe").val());
        });

        $("#canpr").on("click", function () {
            $("#provs").modal("toggle");
        });
        $("#canp").on("click", function () {
            $("#prods").modal("toggle");
            $("#nvoCombo").addClass("d-none");
        });
        $("#agrp").on("click", function () {
            if (valForm("prods")) {
                let id;
                let pre;
                let fila;

                if ($("#tabla").val() === "info") {
                    id = $("#productos tbody tr").length;
                    pre = "info";
                }
                else {
                    id = $("#prodlist tbody tr").length;
                    pre = "list";
                }
                let idprod = 0;
                let nomprod;
                if ($('#chkde').prop('checked')) {
                    nomprod = $("#codp").val();
                } else {
                    idprod = $("#idpro").val();
                    nomprod = $("#nomp").val().trim();
                }

                fila = '<tr id="f' + pre + id + '">' + '<td id= "n' + pre + id + '" style="display: none">' + idprod + '</td> ' +
                    '<td class="text-right">' + $("#codp").val() + '</td>' +
                    '<td class="text-left" > ' + nomprod + '</td > ' +
                    '<td class="text-center" um="' + $("#ump").val() + '">' + $("#ump option:selected").text() + '</td>' +
                    '<td class="text-right">' + formatoMoneda($("#cantp").val().replace(/,/g, ''), 2, true) + '</td>' +
                    '<td class="text-right">' + formatoMoneda($("#prep").val().replace(/,/g, ''), 2, true) + '</td>' +
                    '<td class="text-right">' + $("#subp").val() + '</td>' +
                    '<td class="text-right">' + $("#ivg option:selected").text() + '</td>' +
                    '<td class="text-right">' + $("#impp").val() + '</td>' +
                    '<td class="text-center"><i id="e' + pre + id + '" class="fa fa-edit" title="Edita producto"></i>&nbsp;&nbsp;<i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';

                if ($("#tabla").val() === "info") {
                    $("#productos tbody").append(fila);
                    fila = $("#productos tr:last");

                    if ($("#cov").prop("checked"))
                        comisionMonto();

                    if ($("#cop").prop("checked"))
                        comisionPorcentaje();
                }
                else {
                    $("#prodlist tbody").append(fila);
                    fila = $("#prodlist tr:last");
                }

                $(fila).css({ "cursor": "pointer" });
                $("#e" + pre + id).on("click", function () {
                    var result = [];
                    var i = 0;

                    $("#prodse").modal({ backdrop: 'static', keyboard: false });
                    limpiaControles('prodse');
                    $(this).closest('td').siblings().each(function () {
                        // obtenemos el texto del td 
                        if (i === 3) {
                            result[i] = $(this).attr("um");
                        } else {
                            result[i] = $(this).text();
                        }
                        ++i;
                    });
                    $("#tdid").val("#f" + pre + id);
                    $("#idproe").val(result[0]);
                    $("#codpe").val(result[1]);
                    $("#nompe").val(result[0]);
                    $("#cantpe").val(result[4]);
                    $("#prepe").val(result[5]);
                    $("#subpe").val(result[6]);
                    if (result[7] === "0%") {
                        $("#ivge").val(0);
                    } else {
                        $("#ivge").val(result[7].replace(/%/g, ''));
                    }
                    $("#imppe").val(result[8]);
                    $("#umpe").val(result[3]).trigger('change');

                });
                $("#b" + pre + id).on("click", function () {
                    Swal.fire({
                        title: 'Confirmación',
                        html: '¿Confirma que desea eliminar el producto <b>' + $("#n" + pre + id).text() + '</b>?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#1cc88a',
                        cancelButtonColor: '#6c757d',
                        confirmButtonText: 'Si, eliminar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.value) {
                            $("#f" + pre + id).remove();

                            if ($("#cop").prop("checked"))
                                comisionPorcentaje();

                            if ($("#cov").prop("checked"))
                                comisionMonto();
                        }
                    });
                });

                $("#ump").val("").trigger('change');
                $("#cantp").val("");
                $("#prep").val("");
                $("#subp").val("");
                $("#impp").val("");
                $("#nomp").val("").focus();

                calculaTotales();
            }
        });

        $("#agrpe").on("click", function () {
            // if (valForm("prodse")) {
            var rowid = $("#tdid").val();
            $($('#productos').find('tr[' + 1 + ']')).children('td:eq(2)').text($("#codpe").val());
            $(rowid).find('td').eq('0').html($("#idproe").val());
            $(rowid).find('td').eq('1').html($("#codpe").val());
            $(rowid).find('td').eq('2').html($("#nompe option:selected").text().trim());
            $(rowid).find('td').eq('3').html($("#umpe option:selected").text());
            $(rowid).find('td').eq('3').attr("um", $("#umpe").val());
            $(rowid).find('td').eq('4').html(formatoMoneda($("#cantpe").val().replace(/,/g, ''), 2, true));
            $(rowid).find('td').eq('5').html(formatoMoneda($("#prepe").val().replace(/,/g, ''), 2, true));
            $(rowid).find('td').eq('6').html($("#subpe").val());
            $(rowid).find('td').eq('7').html($("#ivge option:selected").text());
            $(rowid).find('td').eq('8').html($("#imppe").val());

            $("#umpe").val("").trigger('change');
            $("#cantpe").val("");
            $("#prepe").val("");
            $("#subpe").val("");
            $("#imppe").val("");
            $("#nompe").val("").focus();

            calculaTotales();
            $("#prodse").modal("toggle");

            //}
        });
        $("#canpe").on("click", function () {
            $("#prodse").modal("toggle");
            $('#nompe option').each(function () {
                $(this).show();
            });
        });

        $("#bruc").on("click", function () {
            if ($("#ruc").val() !== "") {
                buscaProveedor();
            }
            else {
                Alerta("Debe especificar un RUC a buscar", "AVISO!");
            }
        });
        $("#nue").on("click", function () {
            $("#act").hide();
            $("#divchkcg").show();
            $("#gua").show();
            $("#gram").text("");
            $("#ivgm").text("");
            $("#desm").text("");
            $("#tot").text("");
            $("#productos tbody").empty();
            $("#tableImp tbody").empty();
            nuevaCompra(0);
            cargaTipocomprobantes(1);
            //getCorrelativo();
        });
        $("#nueoc").on("click", function () {
            $("#act").hide();
            $("#divchkcg").hide();
            $("#gua").show();
            $("#gram").text("");
            $("#ivgm").text("");
            $("#desm").text("");
            $("#tot").text("");
            $("#productos tbody").empty();

            nuevaCompra(0);
            cargaTipocomprobantes(2);
            //getCorrelativo();
        });
        $("#can").on("click", function () {
            $("#dtitle").show();
            $("#dtitleoc").show();
            $("#lista").show();
            $("#listaoc").show();
            $("#info").hide();
            limpiaControles('info');
            $("#tableImp tbody").empty();
        });
        $("#canv").on("click", function () {
            $("#dtitle").show();
            $("#dtitleoc").show();
            $("#lista").show();
            $("#listaoc").show();
            $("#infov").hide();
            limpiaControles('infov');
        });

        $("#prep").on("change", function () {
            importeProducto();
        });
        $("#cantp").on("change", function () {
            importeProducto();
        });
        $('#ivg').change(function () {
            importeProducto();
        });
        $(".totales").on("change", function () {
            calculaTotales();
        });
        $("#gra").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#des").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#prep").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#cantp").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        /*modificar combo
        $('#nomp').change(function () {
            if ($('#nomp').val() !== '')
                cargaProductos($('#nomp').attr("idprod"));
        });*/
        $('#ivge').change(function () {
            importeProductoe();
        });
        $('#nompe').change(function () {
            cargaProductose($('#nompe').val());
        });
        $("#cantpe").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#prepe").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#prepe").on("change", function () {
            importeProductoe();
        });
        $("#cantpe").on("change", function () {
            importeProductoe();
        });
        $("#nprov").on("click", function () {
            limpiaControles("exporta");
            $("#exporta").modal({ backdrop: 'static', keyboard: false });
        });
        $("#guaprov").on("click", function () {
            if (valForm("proveedor")) {
                guardaProv();
            }
        });
        $("#canprov").on("click", function () {
            $("#proveedor").modal("toggle");
        });
        $("#braz").on("click", function () {
            buscaProveedorazs($("#exp").val());
        });

        $('#exp').change(function () {
            buscaProveedorazid($("#exp option:selected").attr("idProveedor"));
        });
        //Facturas
        $('#fecf').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
        $('#fecvigf').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
        Moneda.Consultar("#monf");
        cargaTipocomprobantesf();
        $("#datfac").on("click", function () {
            cargaFac($("#idc").val());
            $("#mfacturas").modal({ backdrop: 'static', keyboard: false });
        });
        $("#nuefac").on("click", function () {
            if ($("#modv").val() === "2" || $("#modv").val() === "3") {
                $("#divtcif").hide();
            }
            $("#mnuefacturas").modal({ backdrop: 'static', keyboard: false });
        });

        $("#cosuni").prop('readOnly', true);
        $("#cantf").prop('readOnly', true);
        $("#impfac").prop('readOnly', true);
        //radiobutton change
        $('input[type=radio][name=tipom]').on('change', function () {
            if (this.value === "1") {
                $("#impfac").prop('readOnly', true);
                cargacomprafac($("#idc").val());
            }
            else if (this.value === "2") {
                $("#impfac").prop('readOnly', false);
                cargacomprafac($("#idc").val());
            }
        });
        $("#canf").on("click", function () {
            $("#productosf tbody").empty();
            $("input:radio").prop("checked", false);

            limpiaControles("mnuefacturas");
            $("#mnuefacturas").modal("toggle");
        });
        $("#guaf").on("click", function () {
            guardaDocReg();
        });
        $('#rucf').blur(function () {
            buscaProveedorrucf($('#rucf').val());
        });
        $("#nprovf").on("click", function () {
            limpiaControles("proveedor");
            $("#proveedor").modal({ backdrop: 'static', keyboard: false });

        });
        $('#impfac').blur(function () {
            let cant = $('#cantf').val();
            let imp = $('#impfac').val();
            let cosuni = imp / cant;
            $('#cosuni').val(formatoMoneda(cosuni, 2, true));
        });
        $("#tproductosfbody").on('input', '.pre', function () {

            var cant = $(this).parent().prev().children().val();
            var monto = Number($(this).val());
            monto = monto * cant;
            var ivg = $(this).parent().next().next().children().val();
            $trsub = $(this).parent().next().children();
            $trivg = $(this).parent().next().next().children();
            $trtot = $(this).parent().next().next().next().children();
            //suma los importes de cada concepto
            $trsub.val(monto);
            var ivgt = parseFloat(ivg);
            var tot = formatoMoneda(monto * (1 + (ivg / 100)), 2, true);
            $trtot.val(tot);
            $trtot.prop("readonly", true);
            $trivg.prop("readonly", true);
            $trsub.prop("readonly", true);
        });
        $("#brazf").on("click", function () {
            buscaProveedorazsf($("#razf").val());
        });
    /*agregado filtro por anio importaciones*/
        $("#filtroAnio").on('keyup', function () {
            console.log("ssss");
            cargaImp($(this).val());
            $("#imp").removeAttr("disabled");

            if ($(this).val() == '') {

                cargaImp("%");
            }
        });


        /*PARA COMBO DE PRODUCTOS ANINDADO CON DIV*/
        $("#cuerpoPord").on("click", function () {
            $("#prodbody").bind("click");
            $("#prodbody").on("click", function () {

                $("#nvoCombo").empty();

                $("#nvoCombo").addClass("d-none");
            });

        });

        $("#nomp").on("click", function () {

            //$("#nvoCombo").removeClass("d-none");
            $("#nvoCombo button").removeClass("d-none");
            $("#prodbody").unbind("click");
            //if ($(this).val() == undefined || $(this).val() == '') {
            cargarProductosSelectAgregar('nompe', 0, '%');
            // $("#nvoCombo").removeClass("d-none");
        });


        $("#nomp").on('keyup', function () {
            var fin = "";
            var a = "%" + $("#nomp").val() + "%";

            fin = a.replace(" ", "%");
            console.log(fin); $("#prodbody").unbind("click");
            cargarProductosSelectAgregar('nompe', 0,fin);
        });
    /*FIN PARA COMBO DE PRODUCTOS ANINDADO CON DIV*/

    });

    function cargaUbigeos() {
        $("#ubi").empty();
        $("#ubic").empty();
        $("#ubip").empty();
        $("#ubiv").empty();
        get('/ws/ubigeos.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#ubi").append('<option value="' + this.id + '">' + this.ubi + '</option>');
                            $("#ubic").append('<option value="' + this.id + '">' + this.ubi + '</option>');
                            $("#ubip").append('<option value="' + this.id + '">' + this.ubi + '</option>');
                            $("#ubiv").append('<option value="' + this.id + '">' + this.ubi + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de ubigeos<br />" + error, "ERROR!");
            });
    }
    function cargaTipocomprobantes(tip) {
        $("#tc").empty().append('<option value=""></option>');
        $("#tcv").empty().append('<option value=""></option>');

        get('/ws/TipoComprobante.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#tcv").append('<option value="' + this.id + '">' + this.desc + '</option>');

                            if (tip === 1) {
                                let opciones = [
                                    'FACTURA',
                                    'BOLETA',
                                    'NOTA DE CREDITO',
                                    'OTRO DOCUMENTO',
                                    'BL',
                                    'CN',
                                    'NOTA DEBITO',
                                    'ND'
                                ]
                                if (opciones.indexOf(this.desc.toUpperCase()) !== -1) {
                                    $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                                }
                                //if (this.desc.toUpperCase() === "FACTURA") {
                                //    $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                                //} else if (this.desc.toUpperCase() === "BOLETA") {
                                //    $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                                //}
                                //else if (this.desc.toUpperCase() === "NOTA DE CREDITO") {
                                //    $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                                //}
                                //else if (this.desc.toUpperCase() === "ND") {
                                //    $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                                //}
                                //else if (this.desc.toUpperCase() === "BL") {
                                //    $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                                //}

                                //else if (this.desc.toUpperCase() === "OTRO DOCUMENTO") {
                                //    $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                                //}
                            } else if (tip === 2) {
                                if (this.desc.toUpperCase() === "ORDEN DE COMPRA") {
                                    $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                                }
                            }
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de tipo de comprobantes<br />" + error, "ERROR!");
            });
    }
    function cargaTipocomprobante(id) {
        get('/ws/TipoComprobante.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {


                            if ($("#tc option:selected").text().toUpperCase() !== "FACTURA" && $("#tc option:selected").text().toUpperCase() !== "BOLETA") {
                                /* TODO Verificar si la serie y el correlativo se agregan
                                 */
                                $("#serie").val(this.ser);
                                $("#numero").val(this.corr);
                            } /*else {
                                $("#serie").val("");
                                $("#numero").val("");
                            }*/

                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el tipo de comprobantes<br />" + error, "ERROR!");
            });
    }
    function nuevaCompra(id) {
        $("#dtitle").hide();
        $("#dtitleoc").hide();
        $("#lista").hide();
        $("#listaoc").hide();
        $("#info").show();

        $("#idc").val(id);
        var currentdate = new Date();
        // $("#fec").val(formatoFecha(new Date(), 1)).attr("fecha", new Date());
        $("#accordionSidebar").addClass("toggled");
    }
    function calculaTotales() {
        let imp;
        let ivgt;
        let desc;
        let mon;
        let gra;
        $("#gram").text("0.00");
        $("#ivgm").text("0.00");
        $("#desm").text("0.00");
        $("#tot").text("0.00");
        // if ($("#mon").val() !== "") {
        if ($("#mon").val() === "1")
            mon = "USD ";
        else
            mon = "S/. ";

        if ($("#gra").val() !== "")
            gra = parseFloat($("#gra").val());
        else
            gra = 0;

        ivgt = 0;
        desc = $("#des").val().trim() === "" ? 0 : parseFloat($("#des").val());

        imp = 0;

        $("#productos tbody tr").each(function () {
            ivg = parseFloat(this.cells[7].innerText.replace(/,/g, '')) / 100;
            imp += parseFloat(this.cells[8].innerText.replace(/,/g, ''));
            ivgt += parseFloat(this.cells[6].innerText.replace(/,/g, '') * (ivg));
        });

        $("#ivgm").text(formatoMoneda(ivgt, 2, true));
        $("#gram").text(formatoMoneda(gra, 2, true));
        $("#desm").text(formatoMoneda((imp + gra) * (desc / 100), 2, true));
        $("#tot").text(formatoMoneda((imp + gra) - ((imp + gra) * (desc / 100)), 2, true));

        /*agregado monto asignado*/
        let asig = 0;
        let total = 0;
        
        $("#tableImp tbody tr").each(function () {
            asig = parseInt(this.cells[3].innerText);

            total = (((imp + gra) - ((imp + gra) * (desc / 100))) / 100) * asig;
            if (total == NaN) {
                this.cells[4].innerText = formatoMoneda(0, 2, true);
            } else {
                this.cells[4].innerText = formatoMoneda(total, 2, true);
            }
            
        });


        //}
    }
    function cargaImpuestos() {
        $("#ivg").empty().append('<option value="0">0%</option>');
        $("#ivge").empty().append('<option value="0">0%</option>');
        get('/ws/impuestos.aspx/Consultar', JSON.stringify({ imp: 0.0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#ivg").append('<option value="' + this.imp + '">' + this.imp + '%</option>');
                            $("#ivge").append('<option value="' + this.imp + '">' + this.imp + '%</option>');
                        });
                    }
                    $("#limps").val(res.Info);
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de impuestos<br />" + error, "ERROR!");
            });
    }
    function cargaAlmacenes() {
        ddAlmacen = "#alm";
        ddAlmacene = "#almv";
        cargaAlmacenesXUsuario();
    }
    function buscaProveedor() {
        $("#idp").val("0");
        $("#exp").val("");
        $("#proveedores tbody tr").empty();

        get('/ws/exportadores.aspx/consultaFiltro', JSON.stringify({ info: $("#ruc").val() }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length === 1) {
                            $("#exp").val(res.Info[0].razs).trigger("change");
                            $("#idp").val(res.Info[0].id);
                            $("#ruc").val(res.Info[0].ruc);
                            $("#dir").val(res.Info[0].dirf);
                            $("#ubic").val(res.Info[0].idubi);
                        }
                        else if (res.Info.length > 0) {
                            $(res.Info).each(function () {
                                let fila;
                                fila = '<tr><td>' + this.razs + '</td><td>' + this.ruc + '</td></tr>';
                                $("#proveedores").append(fila);
                                let ruc = this.ruc;
                                let nom = this.razs;
                                let id = this.id;
                                $($("#proveedores tr:last")).css("cursor", "pointer").on("dblclick", function () {
                                    $("#ruc").val(ruc);
                                    $("#exp").val(nom).trigger("change");
                                    $("#idp").val(id);

                                    $("#provs").modal("toggle");
                                });
                            });

                            $("#provs").modal("show");
                        }
                        else {
                            Alerta("No se encontraron proveedores con el criterio especificado", "AVISO!");
                        }
                    }
                    else {
                        Alerta("No se encontró información del proveedor especificado", "AVISO!");
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("no fue posible cargar el listado de Proveedores<br />" + error);
            });
    }
    function importeProducto() {
        let ivg;
        let sub;
        let cant;
        let precio;

        ivg = $("#ivg").val();
        cant = $("#cantp").val().trim().replace(/,/g, '');
        precio = $("#prep").val().trim().replace(/,/g, '');

        if (ivg === "")
            ivg = 0;
        else
            ivg = parseFloat(ivg);
        if (cant === "")
            cant = 0;
        else
            cant = parseFloat(cant);

        if (precio === "")
            precio = 0;
        else
            precio = parseFloat(precio);

        sub = cant * precio;

        $("#subp").val(formatoMoneda(sub, 2, true));
        if (ivg > 0)
            $("#impp").val(formatoMoneda(sub * (1 + (ivg / 100)), 2, true));
        else
            $("#impp").val(formatoMoneda(sub, 2, true));

    }
    function cargaUnidadesMedida() {
        $("#ump").empty().append('<option value=""></option>');
        $("#umpe").empty().append('<option value=""></option>');
        get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#ump").append('<option value="' + this.id + '">' + this.um + '</option>');
                            $("#umpe").append('<option value="' + this.id + '">' + this.um + '</option>');

                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            });
    }
    function cargaOrdenes(fil = "") {
        let param = new Object();
        param.where = fil;
        var data = {
            class: 'table table-sm table-hover table-responsive',
            columnas: [
                { leyenda: 'Año', class: 'text-center thp', ordenable: false, columna: 'FECHA', filtro: true },
                //{ leyenda: 'Tipo de Oper.', class: 'text-center thp', style: 'white-space:nowrap', ordenable: false, columna: 'TIPO', filtro: true },
                { leyenda: 'Serie', class: 'text-center thp', ordenable: false, columna: 'Serie', filtro: true },
                { leyenda: 'Nro. Documento', class: 'text-center thp', ordenable: false, columna: 'NUMERO', filtro: true },
                { leyenda: 'Ruc', class: 'text-center thp', ordenable: false, columna: 'RUC', filtro: true },
                { leyenda: 'Proveedor', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Fecha', class: 'text-center thp', ordenable: false, columna: 'FECHA', filtro: true },
                { leyenda: 'Monto', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Moneda', class: 'text-center thp', ordenable: false, columna: 'MONEDA1', filtro: true },
                { leyenda: 'Estado', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: '', class: 'text-center thp', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
            ],
            modelo: [
                {
                    propiedad: 'FECHA', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        tr[0].style.cursor = 'pointer';
                        return new Date(valor).getFullYear();
                    }
                },
                /*{
                    propiedad: 'TIPO', class: 'text-center px-2 tdp', style: "white-space:nowrap", formato: function (tr, obj, valor) {
                        return "Compra Local";
                    }
                },*/
                { propiedad: 'SERIE', class: 'text-center tdp' },
                { propiedad: 'NUMERO', class: 'text-center tdp' },
                { propiedad: 'RUC', class: 'text-center tdp' },
                {
                    propiedad: '', class: 'tdp', style: 'white-space:nowrap', formato: function (tr, obj) {
                        return obj.RAZON_SOCIAL;
                    }
                },
                {
                    propiedad: 'FECHA', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        tr[0].style.cursor = 'pointer';
                        return new Date(valor).toLocaleDateString();
                    }
                },
                { propiedad: '', style: ';display:none', class: 'tdp' },
                {
                    propiedad: 'TOTAL', class: 'text-right tdp', style: 'vertical-align:middle', formato(tr, obj, value) {
                        return formatoMoneda(value, 2, true);
                    }
                },
                { propiedad: 'MONEDA1', class: 'text-center tdp' },
                {
                    propiedad: 'STATUS', style: 'white-space:nowrap; vertical-algn:middle', class: 'text-center tdp', formato: function (tr, obj, value) {
                        if (value === 1)
                            return "Nuevo";
                        if (value === 2)
                            return 'Anulado';
                        if (value === 3)
                            return 'Facturado';
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");
                        consulta = document.createElement("i");
                        $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                            
                            cargaTipocomprobantes(1);
                            editaRegistro(obj.ID_COMPRA);
                        });
                        $(consulta).addClass("fa fa-search").prop("title", "Editar").on("click", function () {
                            cargaImp("%");
                            cargaTipocomprobantes(1);
                            consultaRegistro(obj.ID_COMPRA);
                        });
                        if (obj.STATUS === 1)
                            container.appendChild(edita);
                        else
                            container.appendChild(consulta);

                        return container;
                    }
                }
            ],
            url: '/ws/Compras.aspx/Listar',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'id',
            loader: "pre0",
            columna_orden: 'ASC'
        };

        $("#ordenes").MALCO(data);
    }
    function validaestado(opc) {
        Swal.fire({
            title: 'La compra esta Pendiente o Cancelada?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Pendiente',
            denyButtonText: 'Cancelado'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                validaInventario(opc, 1);
                //guardaComprobante(opc, 1);
            } else if (result.isDenied) {
                let importe2 = 0;
                let importeAsignado = 0;
                let t = $("#tot").text().replace("USD", "").replace("S/.", "").replace(",", "");
                $("#tableImp tbody").children("tr").each(function () {
                    let asig = $($(this).children("td")[3]).text();
                    let monto = $($(this).children("td")[4]).text().replace("USD", "").replace("S/.", "").replace(",", "");
                    importe2 += Number(asig);
                    importeAsignado += Number(monto);
                    console.log("aa" + asig);
                });
                if (importe2 < 100) {
                    Alerta("Las importaciones seleccionadas deben cumplir con el 100% de asignación." + "</br><strong>Monto total asignado:</strong> " +
                        formatoMoneda(parseFloat(importeAsignado), 2, true) + "</br> <strong>Monto Pendiente: </strong>" + formatoMoneda(parseFloat(t) - importeAsignado, 2, true), "AVISO!");

                } else {

                    validaInventario(opc, 3);
                }

                //guardaComprobante(opc, 2);
            }
        });
    }
    function validaInventario(opc, edo) {
        Swal.fire({
            title: '¿Es parte del Inventario?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Si',
            denyButtonText: 'No'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                guardaComprobante(opc, edo, true);
            } else if (result.isDenied) {
                guardaComprobante(opc, edo, false);
            }
        });
    }
    function cargaOrdenesOC(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-hover table-responsive',
            columnas: [
                { leyenda: 'Año', class: 'text-center thp', ordenable: false, columna: 'FECHA', filtro: true },
                { leyenda: 'Tipo de Oper.', class: 'text-center thp', style: 'white-space:nowrap', ordenable: false, columna: 'TIPO', filtro: true },
                { leyenda: 'Serie', class: 'text-center thp', ordenable: false, columna: 'Serie', filtro: true },
                { leyenda: 'Nro. Documento', class: 'text-center thp', ordenable: false, columna: 'NUMERO', filtro: true },
                { leyenda: 'Ruc', class: 'text-center thp', ordenable: false, columna: 'RUC', filtro: true },
                { leyenda: 'Proveedor', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Monto', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Moneda', class: 'text-center thp', ordenable: false, columna: 'MONEDA1', filtro: true },
                { leyenda: 'Estado', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: '', class: 'text-center thp', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
                { leyenda: '', class: 'text-center thp', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
            ],
            modelo: [
                {
                    propiedad: 'FECHA', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        tr[0].style.cursor = 'pointer';
                        return new Date(valor).getFullYear();
                    }
                },
                {
                    propiedad: 'TIPO', class: 'text-center px-2 tdp', style: "white-space:nowrap", formato: function (tr, obj, valor) {
                        return "Compra Local";
                    }
                },
                { propiedad: 'SERIE', class: 'text-center tdp' },
                { propiedad: 'NUMERO', class: 'text-center tdp' },
                { propiedad: 'RUC', class: 'text-center tdp' },
                {
                    propiedad: '', class: 'tdp', style: 'white-space:nowrap', formato: function (tr, obj) {
                        return obj.RAZON_SOCIAL;
                    }
                },
                { propiedad: '', style: ';display:none', class: 'tdp' },
                {
                    propiedad: 'TOTAL', class: 'text-right tdp', style: 'vertical-align:middle', formato(tr, obj, value) {
                        return formatoMoneda(value, 2, true);
                    }
                },
                { propiedad: 'MONEDA1', class: 'text-center tdp' },
                {
                    propiedad: 'STATUS', style: 'white-space:nowrap; vertical-algn:middle', class: 'text-center tdp', formato: function (tr, obj, value) {
                        if (value === 1)
                            return "Nuevo";
                        if (value === 2)
                            return 'Anulado';
                        if (value === 3)
                            return 'Facturado';
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");

                        $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                            cargaTipocomprobantes(2);
                            editaRegistro(obj.ID_COMPRA);
                        });
                        if (obj.STATUS === 1)
                            container.appendChild(edita);

                        return container;
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        genpdf = document.createElement("i");

                        $(genpdf).addClass("fa fa-file-alt").prop("title", "Editar").on("click", function () {
                            cargaTipocomprobantes(2);
                            generapdf(obj.ID_COMPRA);
                        });
                        container.appendChild(genpdf);

                        return container;
                    }
                }
            ],
            url: '/ws/Compras.aspx/ListarOC',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'id',
            loader: "pre0",
            columna_orden: 'ASC'
        };

        $("#ordenesoc").MALCO(data);
    }
    function guardaComprobante(opc, edo, inv) {
        let doc;
        let com = new Object();
        let compra = new Object();
        let detalle = new Array();
        let proveedor = new Object();
        let inventario = new Object();
        let detalleinv = new Array();
        /*agregado */
        let detalleRegistro = new Array();
        var from = $("#fec").val().split("/");
        var f = new Date(from[2], from[1] - 1, from[0]);
        var from2 = $("#fecvig").val().split("/");
        var f2 = new Date(from2[2], from2[1] - 1, from2[0]);
        compra.tip = opc;
        compra.ser = $("#serie").val().trim();
        compra.num = $("#numero").val().trim();
        compra.fec = f;
        compra.mon = $("#mon").val();
        compra.doc = $("#exp option:selected").attr("tipoDoc");
        compra.idp = $("#exp option:selected").attr("idProveedor");
        compra.dir = $("#dir").val().trim();
        compra.idu = $("#ubic").val();
        compra.des = $("#des").val().trim() === "" ? 0 : $("#des").val().trim();
        compra.ida = $("#alm").val().trim() === "" ? 0 : $("#alm").val();
        compra.obs = $("#obs").val().trim();
        compra.gra = $("#gra").val() === "" ? 0 : $("#gra").val();
        compra.gram = $("#gram").text().replace("USD", "").replace("S/.", "");
        compra.ivg = $("#ivgm").text().replace("USD", "").replace("S/.", "");
        compra.desm = $("#desm").text().replace("USD", "").replace("S/.", "");
        compra.tot = $("#tot").text().replace("USD", "").replace("S/.", "");
        //compra.idc = $("#imp").val() === "" ? 0 : $("#imp").val() === null ? 0 : $("#imp").val();
        compra.status = edo;
        compra.fecvig = f2;
        compra.idcondp = $("#cp").val();
        compra.tcimp = $("#tcimp").val() == "" ? 0 : $("#tcimp").val();
        compra.tctrans = $("#tctrans").val() == "" ? 0 : $("#tctrans").val();
        compra.tcpent = $("#tcptoe").val() == "" ? 0 : $("#tcptoe").val();
        compra.tcalm = $("#tcalm").val() == "" ? 0 : $("#tcalm").val();
        var tipo = 0;
        if ($('#chkcg').is(':checked')) {
            tipo = 1;
        } else {
            tipo = 0;
        }
        compra.compgen = tipo;

        compra.tipidoc = $("#imp").val() === "" ? null : $("#imp").val() === null ? null : $("#imp option:selected").attr("tiporeg");
        //proveedor.id = $("#idp").val();
        //proveedor.ruc = $("#exp option:selected").attr("ruc");
        //proveedor.razs = $("#exp option:selected").val();
        //proveedor.razc = $("#exp").val();
        //proveedor.dirf = $("#dir").val();
        //proveedor.dirc = $("#dir").val();
        //proveedor.con = "";
        //proveedor.tel = "";
        //proveedor.cor = "";
        //proveedor.est = 1;

        let i = 1;

        $.each($("#productos tbody tr"), function () {
            let det = new Object();
            let detinv = new Object();

            det.ord = i;
            det.idprod = this.cells[0].innerText;
            det.codp = this.cells[1].innerText;
            det.des = this.cells[2].innerText;
            det.um = $(this.cells[3]).attr("um");
            det.can = this.cells[4].innerText.replace(/,/g, '');
            det.pre = this.cells[5].innerText.replace(/,/g, '');
            det.sub = this.cells[6].innerText.replace(/,/g, '');
            det.ivg = this.cells[7].innerText.replace("%", "");
            det.tot = this.cells[8].innerText.replace(/,/g, '');

            if (this.cells[0].innerText !== "0") {
                detinv.ID_PRODUCTO = this.cells[0].innerText;
                detinv.CantidadIngres = this.cells[4].innerText.replace(/,/g, '');
                detinv.Precio = this.cells[5].innerText.replace(/,/g, '');
                detinv.SubTotal = this.cells[6].innerText.replace(/,/g, '');
                detinv.IVG = this.cells[7].innerText.replace("%", "");
                detinv.Total = this.cells[8].innerText.replace(/,/g, '');
                detinv.UM = this.cells[3].innerText;
                detinv.ID_ALMACEN = $("#alm").val().trim() === "" ? 0 : $("#alm").val();
                detinv.tipo = "OC";

                detalleinv.push(detinv);
            }
            detalle.push(det);

        });

        inventario.idalm = $("#alm").val().trim() === "" ? 0 : $("#alm").val();
        inventario.obs = null;
        inventario.Tipo = "OC";
        inventario.Fecha = f;

        /*agregado tabla imp*/
        let total = 0;
        $.each($("#tableImp tbody tr"), function () {
            let detalleCR = new Object();

            let t = $("#tot").text().replace("USD", "").replace("S/.", "").replace(",", "");
            detalleCR.idreg = parseInt(this.cells[0].innerText);
            detalleCR.numImpor = this.cells[1].innerText;
            detalleCR.asignacion = this.cells[3].innerText;
            //detalleCR.importeReg = parseFloat(this.cells[2].innerText);
            //total = (parseFloat(t.toString()) / 100) * parseInt(this.cells[2].innerText);
            //console.log("ccc" + total);
            detalleCR.montoAsig = (this.cells[4].innerText).replace(",","");
            detalleRegistro.push(detalleCR);
        });
      /*  let idregi = 0;
      let asi = 0;
      $.each($(detalleRegistro), function () {
          idregi = this.idreg;
          asi = this.montoAsig;

      });*/


        com.com = compra;
        com.det = detalle;
        com.pro = proveedor;
        com.inv = inventario;
        com.detinv = detalleinv;
    /*agregado*/
        com.detReg = detalleRegistro;
        doc = $("#tc option:selected").text().trim();


        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea generar el siguiente documento?<br/>Tipo: <b>'
                + doc + '</b><br/>Serie: <b>' + $("#serie").val() +
                '</b><br />Número: <b>' + $("#numero").val() + '</b>' 
                //'<br />Importaciones </br> Imp: <b>' + idregi + '</b>' +
                //'<br />Asig: <b>' + asi + '</b>' +
              ,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/compras.aspx/Insertar`, {
                    method: 'POST', body: JSON.stringify({ info: JSON.stringify(com), inv: JSON.stringify(inv) }), headers: { 'Content-Type': 'application/json' }
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
                    Alerta("La compra se registró correctamente");
                    let param = new Object();

                    param.tip = 1;
                    param.est = 1;
                    param.fac = 0;
                    limpiaControles("info");
                    $("#productos tbody").empty();
                    cargaOrdenes(param);
                    cargaOrdenesOC();
                    $("#info").hide();
                    $("#lista").show();
                    $("#dtitle").show();
                    $("#listaoc").show();
                    $("#dtitleoc").show();
                    $("#chkcg").prop("checked", false);
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function cargaImportaciones(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
            columnas: [
                { leyenda: 'Año', class: 'text-center', ordenable: false, columna: 'FECHA', filtro: true },
                { leyenda: 'Tipo de Oper.', class: 'text-center', style: 'white-space:nowrap', ordenable: false, columna: 'TIPO', filtro: true },
                { leyenda: '#', class: 'text-center', ordenable: false, columna: 'NUMERO', filtro: true },
                { leyenda: 'ETD', class: 'text-center', style: 'width:1%;display:none', ordenable: false, columna: '', filtro: true },
                { leyenda: 'ETA', class: 'text-center', style: 'width:1%;display:none', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Proveedor', class: 'text-center', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Especie', class: 'text-center', style: 'width:1%;display:none', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Monto', class: 'text-center', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Estado', class: 'text-center', style: 'width:1%', ordenable: false, columna: '', filtro: true },
            ],
            modelo: [
                {
                    propiedad: 'FECHA', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        tr[0].style.cursor = 'pointer';
                        return new Date(valor).getFullYear();
                    }
                },
                {
                    propiedad: 'TIPO', class: 'text-center px-2', style: "white-space:nowrap", formato: function (tr, obj, valor) {
                        if (valor === 1)
                            return "Importación Directa";
                        if (valor === 2)
                            return "Importación Indirecta";
                        if (valor === 3)
                            return "Exportación Indirecta";
                        if (valor === 4)
                            return "Exportación Directa";
                    }
                },
                { propiedad: 'NUMERO', class: 'text-center' },
                { propiedad: '', class: 'text-center px-3', style: ';display:none' },
                { propiedad: '', style: ';display:none' },
                {
                    propiedad: '', style: 'white-space:nowrap', formato: function (tr, obj) {
                        return obj.RAZON_SOCIAL;
                    }
                },
                { propiedad: '', style: ';display:none' },
                {
                    propiedad: 'TOTAL', class: 'text-right', style: 'vertical-align:middle', formato(tr, obj, value) {
                        return formatoMoneda(value, 2, true);
                    }
                },
                {
                    propiedad: 'ESTATUS', style: 'white-space:nowrap; vertical-algn:middle', class: 'text-center', formato: function (tr, obj, value) {
                        if (value === 1)
                            return "Nuevo";
                        if (value === 2)
                            return 'En Proceso';
                        if (value === 3)
                            return 'Ingresado a Cámara';
                    }
                }
            ],
            url: '/ws/registros.aspx/listarFacturar',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'id',
            loader: "pre0",
            columna_orden: 'ASC'
        };

    }
    function cargaImp(param) {
        $("#imp").empty().append('<option value=""></option>');
        $("#impv").empty().append('<option value=""></option>');
        get('/ws/registros.aspx/ConsultarIO', JSON.stringify({ id: param }))
            .then(function (res) {
                var r = JSON.stringify(res);
                if (r.startsWith('[{"Error":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR!");
                } else {
                    function fechaFormateada(fecha) {
                        let fechaFormateada = '';
                        if (fecha != null) {
                            let mes = fecha.substr(5, 2);
                            let ano = fecha.substr(0, 4);
                            let dia = fecha.substr(8, 2);
                            fechaFormateada = dia + "/" + mes + "/" + ano;
                        }

                        return fechaFormateada;
                    }
                    console.log(res.length + "leng");
                    
                        $(res).each(function () {
                            var mod = "";
                            switch (this.TIPO) {
                                case 0:
                                    mod = "Compra Genérica";
                                    break;
                                case 1:
                                    mod = "Importación Directa";
                                    break;
                                case 2:
                                    mod = "Importación Indirecta";
                                    break;
                                case 3:
                                    mod = "Exportación Indirecta";
                                    break;
                                case 4:
                                    mod = "Exportación Directa";
                                    break;
                            }

                            $("#imp").append('<option modalidad="' + mod + '" nombreProducto="' + "nn" +
                                '" numeroRegistro="' + this.ID_REGISTRO + '" ruc="' + this.RUC + '" razonSocial="' + this.RAZON_SOCIAL + '" value="'
                                + this.ID_REGISTRO + '" tiporeg ="' + this.TIPOREG + '"total="' + this.TOTAL + '"impor="' + this.IMP + '" > #' + this.IMP + " " + mod + " " + this.RAZON_SOCIAL + " " +
                                fechaFormateada(this.FECHA) +
                                '</option>');
                            $("#impv").append('<option modalidad="' + mod + '" nombreProducto="' + "nn" +
                                '" numeroRegistro="' + this.ID_REGISTRO + '" ruc="' + this.RUC + '" razonSocial="' + this.RAZON_SOCIAL + '" value="'
                                + this.ID_REGISTRO + '" tiporeg ="' + this.TIPOREG + '"total="' + this.TOTAL + '"impor="' + this.NUMERO + '"> #' + this.IMP + " " + mod + " " + this.RAZON_SOCIAL + " " +
                                fechaFormateada(this.FECHA) +
                                '</option>');
                        });
                    }

                
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de registros<br />" + error, "ERROR!");
            });
    }
    function getCorrelativo() {
        let reg = new Object();

        let registro = new Object();
        reg.fecemi = new Date($("#fec").attr("fecha"));
        reg.tip = $("#tc").val();
        registro.reg = reg;
        //funcion para obtener el correlativo
        get('/ws/compras.aspx/obtcorrelativo', JSON.stringify({ info: JSON.stringify(registro) }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    var d = new Date();

                    $("#numero").val(res.Mensaje);
                    console.log(res.Mensaje);
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }

            })
            .catch(function (error) {
                Alerta("No fue posible cargar el correlativo<br/>" + error, "ERROR");
            });
    }
    /*modificar para nuevo combos*/
    function cargaProductos(id) {
        get('/ws/productos.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#codp").val(this.copro);
                            $("#idpro").val(this.id);
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
    function cargaProducto() {
        cargarProductosSelectAgregar('nompe',0,'%');
    }
    function cargaProductosc(cod) {
        $("#codp").val($("#nomp").attr("codigo"));
        $("#idp").val($("#nomp").attr("idprod"));
    } 
    //function cargarProductosSelectAgregar(idSelect = 'nomp', id = 0) {
    //    get('/ws/productos.aspx/ListarTodosLosProductosPorConversion', JSON.stringify({ tipoConversion: 1 }))
    //        .then(function (res) {
    //            var r = JSON.stringify(res);
    //            if (r.startsWith('[{"ERROR":', 0)) {
    //                var err = "";
    //                $(res).each(function () {
    //                    err += this.Error;
    //                });
    //                Alerta(err, "ERROR!");
    //            } else {
    //                $(res).each(function () {
    //                    if (this.ID == id) {
    //                        $("#" + idSelect).append('<option selected codigo="' + this.CODIGO + '" value="' + this.ID + '">' + this.PRODUCTO + '</option>');
    //                    } else {
    //                        $("#" + idSelect).append('<option codigo="' + this.CODIGO + '" value="' + this.ID + '">' + this.PRODUCTO + '</option>');
    //                    }
    //                });
    //            }
    //        })
    //        .catch(function (error) {
    //            Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
    //        });
    //}

    function cargarProductosSelectAgregar(idSelect, id, param) {
        var par = param.replace(" ", "%");
        get('/ws/productos.aspx/ConsultarporTipo', JSON.stringify({ id: 1, param: par }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#" + idSelect).empty().append('<option value=""></option>');
                        $("#nvoCombo").empty();
                        $("#nvoCombo button").remove();
                        if (res.Info.length == 0) {
                            $("#nvoCombo").append('<button class="form-control text-left bg-white border-0 w-100" >No existen productos</button >');
                            $("#nvoCombo").css("height", "auto");
                        }
                        $(res.Info).each(function () {
                            $("#" + idSelect).append('<option value="' + this.id + '">' + this.pro + '</option>');


                            $("#nvoCombo").append('<button idprd="' + this.id + '" codigo="' + this.copro + '"  id="btn' + this.copro + '" style="font-size:13px; height:auto;" class="form-control text-left bg-white border-0 rounded-0 w-100" >' + this.copro + ' -- ' + this.pro + '</button >');

                            $("#nvoCombo").removeClass("d-none");

                            if (res.Info.length > 10) {

                                $("#nvoCombo").css("height", "300px");
                            } else {
                                $("#nvoCombo").css("height", "auto");
                            }
                            $("#btn" + this.copro).on("click", function () {
                                let producto = $(this).text().trim().split("--");
                                $("#nomp").val(producto[1]);
                                $("#nvoCombo button").hide();
                                $("#nvoCombo").addClass("d-none");
                                // console.log("valor seleccionad" + $(this).attr("idprd"));
                                $("#nomp").attr("idprod", $(this).attr("idprd"));
                                $("#nomp").attr("codigo", $(this).attr("codigo"));
                                cargaProductos($('#nomp').attr("idprod"));

                            });

                            $("#btn" + this.copro).hover(function () {

                                $(this).addClass("bg-secondary text-white");
                            }, function () {
                                $(this).removeClass("bg-secondary text-white");
                            }
                            );

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

    function consultaRegistro(id) {
        $("#dtitle").hide();
        $("#dtitleoc").hide();
        get('/ws/compras.aspx/Editar', JSON.stringify({ id: id }))
            .then(function (res) {
                let id=0;
                let pre="";
                let fila = "";
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#lista").hide();
                        $("#listaoc").hide();
                        $("#infov").show();
                        $("#idcv").val(res.Info.compra.id);
                        //cambio en select
                        $("#tcv").val(res.Info.compra.tip);      
                        $("#tcv").change();
                        $("#serv").val(res.Info.compra.ser);
                        $("#fecv").val(formatoFecha(res.Info.compra.fec, 1)).attr("fecha", new Date(res.Info.compra.fec));
                        $("#numv").val(res.Info.compra.num);
                        //cambio en select
                        $("#monv").val(res.Info.compra.mon);
                        $("#monv").change();
                        //No hay valor en la bd por lo que retorna 0 y no permite cargar el select
                        $("#impv").val(res.Info.detalleReg[0].idreg).change();
                        //cambio en select
                        $("#docv").val(res.Info.exp.tipodoc);
                        $("#docv").change();
                        $("#rucv").val(res.Info.exp.ruc);
                        $("#expv").val(res.Info.exp.razs);
                        $("#dirv").val(res.Info.exp.dirf);
                        //cambio en select
                        $("#ubiv").val(res.Info.compra.idu);
                        $("#ubiv").change();
                        $("#desv").val(res.Info.compra.des);
                        //Muestra NULL por el tipo de doc
                        $("#tipidoc").val(res.Info.compra.tipidoc);
                        //cambio en select
                        $("#almv").val(res.Info.compra.ida);
                        $("#almv").change();
                        $("#grav").val(res.Info.compra.gra);
                        $("#obsv").val(res.Info.compra.obs);

                        $("#gramv").text(res.Info.compra.gram);
                        $("#ivgmv").text(res.Info.compra.ivg);
                        $("#desmv").text(res.Info.compra.desm);
                        $("#totv").text(formatoMoneda(res.Info.compra.tot,2,true));
                        $("#fecvigv").val(formatoFecha(res.Info.compra.fecvig, 1)).attr("fecha", new Date(res.Info.compra.fecvig));
                        //cambio en select
                        $("#cpv").val(res.Info.compra.idcondp);
                        $("#cpv").change();
                        /*agregado campo % e imp*/

                        $("#asignacionv").val(res.Info.detalleReg[0].asignacion);
                        $("#productosv tbody").empty();

                        pre = "infov";
                        $.each(res.Info.prods, function () {
                            id = $("#productosv tbody tr").length;
                            $("#ump").val(this.um).trigger('change');
                            $("#ivg").val(this.ivg);
                            $("#ivg").trigger("change");
                            fila = '<tr id="f' + pre + id + '">' +
                                '<td id="n' + pre + id + '" style="display: none">' + this.idprod + '</td>' +
                                '<td class="text-right"> ' + this.codp + '</td > ' +
                                '<td class="text-right">' + this.des + '</td>' +
                                '<td class="text-center" um="' + this.um + '">' + $("#ump option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.can, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.pre, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.sub, 2, true) + '</td>' +
                                '<td class="text-right">' + $("#ivg option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.tot, 2, true) + '</td>' +
                                '</tr>';

                            $("#productosv tbody").append(fila);
                           });
                        /*agregado importaciones*/
                        $("#tableImpv tbody").empty();
                        let id2 = 0;
                        id2 = $("#tableImpv tbody tr").length;
                        //let fila = "";
                        $.each(res.Info.detalleReg, function () {
                            fila = "<tr id='fila" + id2 + "'>" +
                                "<td class='d-none'>" + this.idreg + "</td>" +
                                "<td class='text-center' id='n" + id2 + "'>#" + this.numImpor + "</td>" +
                                "<td class='text-center d-none'>" + formatoMoneda(this.importeReg,2,true) + "</td>" +
                                "<td class='text-center'>" + this.asignacion + "</td>" +
                                "<td class='text-center'>" + formatoMoneda(this.montoAsig,2,true) + "</td>" +
                                "<td class='text-center' id='e" + id2 + "'></td></tr > ";
                            $("#tableImpv tbody").append(fila);

                        });
                      


                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible editar el registro<br />" + error, "ERROR!");
            });
    }

    function editaRegistro(id) {
        $("#dtitle").hide();
        $("#dtitleoc").hide();
        get('/ws/compras.aspx/Editar', JSON.stringify({ id: id }))
            .then(function (res) {
                let id;
                let pre;

                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#lista").hide();
                        $("#listaoc").hide();
                        $("#info").show();

                        $("#idc").val(res.Info.compra.id);
                        $("#tc").val(res.Info.compra.tip).change();
                        $("#serie").val(res.Info.compra.ser);
                        $("#fec").val(formatoFecha(res.Info.compra.fec, 1)).attr("fecha", new Date(res.Info.compra.fec));
                        $("#numero").val(res.Info.compra.num);
                        $("#mon").val(res.Info.compra.mon).change();
                        $("#imp").val(res.Info.compra.idc).change();
                        getSimboloMoneda(res.Info.compra.mon);
                        $("#ruc").val(res.Info.exp.ruc);
                        $("#exp").val(res.Info.compra.idp).change();
                        $("#dir").val(res.Info.exp.dirf);
                        $("#ubic").val(res.Info.compra.idu).change();

                        $("#des").val(res.Info.compra.des);
                        $("#alm").val(res.Info.compra.ida).change();
                        $("#gra").val(res.Info.compra.gra);
                        $("#obs").val(res.Info.compra.obs);

                        $("#gram").text(res.Info.compra.gram);
                        $("#ivgm").text(res.Info.compra.ivg);
                        $("#desm").text(res.Info.compra.desm);
                        $("#tot").text(res.Info.compra.tot);
                        $("#fecvig").val(formatoFecha(res.Info.compra.fecvig, 1)).attr("fecha", new Date(res.Info.compra.fecvig));
                        $("#cp").val(res.Info.compra.idcondp).change();
                        $("#chkcg").prop("checked", res.Info.compra.compgen);

                        $("#tcimp").val(res.Info.compra.tcimp).change();
                        $("#tctrans").val(res.Info.compra.tctrans).change();
                        $("#tcptoe").val(res.Info.compra.tcpent).change();
                        $("#tcalm").val(res.Info.compra.tcalm).change();

                        $("#productos tbody").empty();

                        pre = "info";
                        $.each(res.Info.prods, function () {
                            id = $("#productos tbody tr").length;
                            $("#ump").val(this.um).trigger('change');
                            $("#ivg").val(this.ivg);
                            $("#ivg").trigger("change");
                            fila = '<tr id="f' + pre + id + '">' +
                                '<td id="n' + pre + id + '" style="display: none">' + this.idprod + '</td>' +
                                '<td class="text-right"> ' + this.codp + '</td > ' +
                                '<td class="text-right">' + this.des + '</td>' +
                                '<td class="text-center" um="' + this.um + '">' + $("#ump option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.can, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.pre, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.sub, 2, true) + '</td>' +
                                '<td class="text-right">' + $("#ivg option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.tot, 2, true) + '</td>' +
                                '<td class="text-center"><i id="e' + pre + id + '" class="fa fa-edit" title="Edita producto"></i>&nbsp;&nbsp;<i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';

                            $("#productos tbody").append(fila);

                            fila = $("#productos tr:last");
                            $(fila).css({ "cursor": "pointer" });
                            $("#e" + pre + id).on("click", function () {
                                var result = [];
                                var i = 0;

                                $("#prodse").modal({ backdrop: 'static', keyboard: false });
                                limpiaControles('prodse');
                                $(this).closest('td').siblings().each(function () {
                                    // obtenemos el texto del td 
                                    if (i === 3) {
                                        result[i] = $(this).attr("um");
                                    } else {
                                        result[i] = $(this).text();
                                    }
                                    ++i;
                                });
                                $("#tdid").val("#f" + pre + id);
                                $("#idproe").val(result[0]);
                                $("#codpe").val(result[1]);
                                $("#nompe").val(result[0]);
                                $("#cantpe").val(result[4]);
                                $("#prepe").val(result[5]);
                                $("#subpe").val(result[6]);
                                if (result[7] === "0%") {
                                    $("#ivge").val(0);
                                } else {
                                    $("#ivge").val(result[7].replace(/%/g, ''));
                                }
                                $("#ivge").trigger("change");
                                $("#imppe").val(result[8]);
                                $("#umpe").val(result[3]).trigger('change');

                            });
                            $("#b" + pre + id).on("click", function () {
                                Swal.fire({
                                    title: 'Confirmación',
                                    html: '¿Confirma que desea eliminar el producto <b>' + $("#n" + id).text() + '</b>?',
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
                                });
                            });

                        });
                    /*importaciones*/
                        $("#tableImp tbody").empty();
                        let id2 = 0;
                        id2 = res.Info.detalleReg.length;
                        console.log("size" + id2);
                        //let fila = "";
                        $.each(res.Info.detalleReg, function (i) {
                            fila = "<tr id='fila" + i + "'>" +
                                "<td class='d-none'>" + this.idreg + "</td>" +
                                "<td class='text-center' id='n" + i + "'>" + this.numImpor + "</td>" +
                                "<td class='text-center d-none'>" + formatoMoneda(this.importeReg, 2, true) + "</td>" +
                                "<td class='text-center'>" + this.asignacion + "</td>" +
                                "<td class='text-center'>" + formatoMoneda(this.montoAsig, 2, true) + "</td>" +
                                "<td class='text-center' id='e" + i + "'>" + "<i class='fa fa-trash text-danger' title='Eliminar Importacion'></i></td></tr > ";
                            $("#tableImp tbody").append(fila);

                            $("#e" + i).on("click", function () {
                                Swal.fire({
                                    title: 'Confirmación',
                                    html: '¿Confirma que desea eliminar la importación N°<b>' + $("#n" + i).text() + '</b>?',
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#1cc88a',
                                    cancelButtonColor: '#6c757d',
                                    confirmButtonText: 'Si, eliminar',
                                    cancelButtonText: 'Cancelar'
                                }).then((result) => {
                                    if (result.value) {
                                        $("#fila" + i).remove();

                                    }
                                });
                            });

                        });


                        $("#act").show();
                        if ($("#tc option:selected").text() === "ORDEN DE COMPRA") {
                            $("#datfac").show();
                        } else {
                            $("#datfac").hide();
                        }
                        $("#gua").hide();
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible editar el registro<br />" + error, "ERROR!");
            });
    }
    function editaComprobante(opc,est) {
        let doc;
        let com = new Object();
        let compra = new Object();
        let detalle = new Array();
        let proveedor = new Object();
        /*agregado */
        let detalleRegistro = new Array();
        var from = $("#fec").val().split("/");
        var f = new Date(from[2], from[1] - 1, from[0]);
        var from2 = $("#fecvig").val().split("/");
        var f2 = new Date(from2[2], from2[1] - 1, from2[0]);

        compra.id = $("#idc").val();
        compra.tip = opc;
        compra.ser = $("#serie").val().trim();
        compra.num = $("#numero").val().trim();
        compra.fec = f;
        compra.mon = $("#mon").val();
        compra.doc = $("#exp option:selected").attr("ruc");
        compra.idp = $("#exp option:selected").attr("idProveedor");
        compra.dir = $("#dir").val().trim();
        compra.idu = $("#ubic").val();
        compra.des = $("#des").val().trim() === "" ? 0 : $("#des").val().trim();
        compra.ida = $("#alm").val();
        compra.obs = $("#obs").val().trim();
        compra.gra = $("#gra").val() === "" ? 0 : $("#gra").val();
        compra.gram = $("#gram").text().replace("USD", "").replace("S/.", "");
        compra.ivg = $("#ivgm").text().replace("USD", "").replace("S/.", "");
        compra.desm = $("#desm").text().replace("USD", "").replace("S/.", "");
        compra.tot = $("#tot").text().replace("USD", "").replace("S/.", "");
        compra.idc = $("#imp").val() === "" ? 0 : $("#imp").val() === null ? 0 : $("#imp").val();
        compra.status = est;
        compra.fecvig = f2;
        compra.idcondp = $("#cp").val();

        compra.tcimp = $("#tcimp").val();
        compra.tctrans = $("#tctrans").val();
        compra.tcpent = $("#tcptoe").val();
        compra.tcalm = $("#tcalm").val();

        compra.tipidoc = $("#imp").val() === "" ? null : $("#imp").val() === null ? null : $("#imp option:selected").attr("tiporeg");

        var tipo = 0;
        if ($('#chkcg').is(':checked')) {
            tipo = 1;
        } else {
            tipo = 0;
        }
        compra.compgen = tipo;

        proveedor.id = $("#idp").val();
        proveedor.ruc = $("#ruc").val();
        proveedor.razs = $("#exp").val();
        proveedor.razc = $("#exp").val();
        proveedor.dirf = $("#dir").val();
        proveedor.dirc = $("#dir").val();
        proveedor.con = "";
        proveedor.tel = "";
        proveedor.cor = "";
        proveedor.est = 1;

        let i = 1;

        $.each($("#productos tbody tr"), function () {
            let det = new Object();
            det.id = compra.id;
            det.ord = i;
            if (this.cells[0].innerText != "null") {
                det.idprod = this.cells[0].innerText;
            } else {
                det.idprod = 0;
            }
            det.codp = this.cells[1].innerText;
            det.des = this.cells[2].innerText;
            det.um = $(this.cells[3]).attr("um");
            det.can = this.cells[4].innerText.replace(/,/g, '');
            det.pre = this.cells[5].innerText.replace(/,/g, '');
            det.sub = this.cells[6].innerText.replace(/,/g, '');
            det.ivg = this.cells[7].innerText.replace("%", "");
            det.tot = this.cells[8].innerText.replace(/,/g, '');

            detalle.push(det);
        });

        com.com = compra;
        com.det = detalle;
        com.pro = proveedor;

        /*agregado tabla imp*/
        let total = 0;
        $.each($("#tableImp tbody tr"), function () {
            let detalleCR = new Object();

            let t = $("#tot").text().replace("USD", "").replace("S/.", "").replace(",", "");
            detalleCR.idreg = parseInt(this.cells[0].innerText);
            detalleCR.numImpor = this.cells[1].innerText;
            detalleCR.asignacion = this.cells[3].innerText;
            //detalleCR.importeReg = parseFloat(this.cells[2].innerText);
            //total = (parseFloat(t.toString()) / 100) * parseInt(this.cells[2].innerText);
            //console.log("ccc" + total);
            detalleCR.montoAsig = (this.cells[4].innerText).replace(",", "");
            detalleRegistro.push(detalleCR);
        });
        /*agregado*/
        com.detReg = detalleRegistro;
        doc = $("#tc option:selected").text().trim();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea actualizar el registro?<br/>Tipo: <b>' + doc + '</b><br/>Serie: <b>' + $("#serie").val() + '</b><br />Número: <b>' + $("#numero").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/compras.aspx/Edita`, {
                    method: 'POST', body: JSON.stringify({ info: JSON.stringify(com) }), headers: { 'Content-Type': 'application/json' }
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
                    Alerta("La compra se edito correctamente");
                    let param = new Object();

                    param.tip = 1;
                    param.est = 1;
                    param.fac = 0;
                    limpiaControles('info');
                    $("#productos tbody").empty();

                    cargaOrdenes(param);
                    cargaOrdenesOC();
                    $("#info").hide();
                    $("#lista").show();
                    $("#dtitle").show();
                    $("#listaoc").show();
                    $("#dtitleoc").show();

                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function cargaProductosce(cod) {
        get('/ws/productos.aspx/ConsultarC', JSON.stringify({ cod: cod }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#nompe").val(this.id);
                            $("#idproe").val(this.id);

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
    function importeProductoe() {
        let ivg;
        let sub;
        let cant;
        let precio;

        ivg = $("#ivge").val();
        cant = $("#cantpe").val().trim().replace(/,/g, '');
        precio = $("#prepe").val().trim().replace(/,/g, '');

        if (ivg === "")
            ivg = 0;
        else
            ivg = parseFloat(ivg);
        if (cant === "")
            cant = 0;
        else
            cant = parseFloat(cant);

        if (precio === "")
            precio = 0;
        else
            precio = parseFloat(precio);

        sub = cant * precio;

        $("#subpe").val(formatoMoneda(sub, 2, true));
        if (ivg > 0)
            $("#imppe").val(formatoMoneda(sub * (1 + (ivg / 100)), 2, true));
        else
            $("#imppe").val(formatoMoneda(sub, 2, true));

    }
    function cargaProductose(id) {
        get('/ws/productos.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#codpe").val(this.copro);
                            $("#idproe").val(this.id);
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
    function getSimboloMoneda(id) {
        get('/ws/monedas.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $.each(res.Info, function () {
                        $("#sgram").text(this.sim);
                        $("#sivgm").text(this.sim);
                        $("#sdesm").text(this.sim);
                        $("#stot").text(this.sim);
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
    function buscaProveedorruc(ruc) {
        get('/ws/exportadores.aspx/consultaFiltro', JSON.stringify({ info: ruc }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length === 1) {
                            $("#exp").val(res.Info[0].razs).trigger("change");
                            $("#idp").val(res.Info[0].id);
                            $("#ruc").val(res.Info[0].ruc);
                            $("#dir").val(res.Info[0].dirf);
                            $("#ubic").val(res.Info[0].idubi);
                        }
                        else {
                            Alerta("No se encontraron proveedores con el criterio especificado", "AVISO!");
                        }
                    }
                    else {
                        Alerta("No se encontró información del proveedor especificado", "AVISO!");
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("no fue posible cargar el listado de Proveedores<br />" + error);
            });
    }
    //function guardaProv() {
    //    Swal.fire({
    //        title: 'Confirmación',
    //        html: '¿Confirma que desea agregar el proveedor <b>' + $("#razs").val() + '</b>',
    //        icon: 'question',
    //        showCancelButton: true,
    //        confirmButtonColor: '#1cc88a',
    //        cancelButtonColor: '#6c757d',
    //        confirmButtonText: 'Guardar',
    //        cancelButtonText: 'Cancelar'
    //    }).then((result) => {
    //        if (result.value) {
    //            let exp = new Object();
    //            let tipos = new Array();
    //            let exportador = new Object();
    //            let detalle = new Array();

    //            exp.razs = $("#razs").val();
    //            exp.ruc = $("#rucp").val();
    //            exp.razc = $("#razc").val();
    //            exp.dirf = $("#dirf").val();
    //            exp.dirc = $("#dirc").val();
    //            exp.idubi = $("#ubip").val();
    //            exp.est = 1;
    //            exp.tipodoc = $("#td").val();

    //            let tip = new Object();
    //            tip.tip = 1;
    //            exp.tip = $("#tip").val();
    //            tipos.push(tip);

    //            exportador.exp = exp;
    //            exportador.det = detalle;
    //            exportador.tip = tipos;
    //            get("/ws/exportadores.aspx/InsertarAll", JSON.stringify({ info: JSON.stringify(exportador) }))
    //                .then(function (res) {
    //                    if (res.Respuesta === 1) {
    //                        Alerta("El proveedor se agregó correctamente");
    //                        limpiaControles('proveedor');
    //                        $("#proveedor").modal("toggle");
    //                    }
    //                    else {
    //                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
    //                    }
    //                })
    //                .catch(function (res) {
    //                    Alerta("No fue posible insertar el proveedor<br />" + res, "Error!", typIconoAlerta.error);
    //                });
    //        }
    //    });
    //}

    function buscaProveedorazs(razs) {
        get('/ws/exportadores.aspx/consultaRazs', JSON.stringify({ info: razs }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length === 1) {
                            $("#exp").val(res.Info[0].razs).trigger("change");
                            $("#idp").val(res.Info[0].id);
                            $("#ruc").val(res.Info[0].ruc);
                            $("#dir").val(res.Info[0].dirf);
                            $("#ubic").val(res.Info[0].idubi);
                        }
                        else {
                            Alerta("No se encontraron proveedores con el criterio especificado", "AVISO!");
                        }
                    }
                    else {
                        Alerta("No se encontró información del proveedor especificado", "AVISO!");
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("no fue posible cargar el listado de Proveedores<br />" + error);
            });
    }
    function buscaProveedorazid(razs) {
        if (typeof razs == 'undefined') { return; }

        get('/ws/exportadores.aspx/Consultar', JSON.stringify({ id: razs }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length === 1) {
                            $("#dir").val(res.Info[0].dirf);
                            $("#ubic").val(res.Info[0].idubi);
                        }
                        else {
                            Alerta("No se encontraron proveedores con el criterio especificado", "AVISO!");
                        }
                    }
                    else {
                        Alerta("No se encontró información del proveedor especificado", "AVISO!");
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("no fue posible cargar el listado de Proveedores<br />" + error);
            });
    }

    function generapdf(id) {
        get('/ws/compras.aspx/PDFOC', JSON.stringify({ id: id, user: Cookies.get('nom'), idu: Cookies.get('idu') }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Mensaje === "Existe") {
                        if (res.Mensaje !== "ErrorArchivo") {
                            $("#ContentReporte").empty();
                            var height = $(window).height();
                            $obj = $('<object>');
                            $obj.attr("data", '/' + res.Info);
                            $obj.attr("height", "100%");
                            $obj.attr("width", "100%");
                            $obj.attr("align", "middle");
                            $obj.attr("type", "application/pdf");
                            $("#Reportelabel").text($("#mod option:selected").text());
                            $("#ContentReporte").height(height);
                            $("#ContentReporte").html($obj);
                            $('#ModalReporte').modal();
                        }
                    }
                    else {
                        Alerta("Error No es posible generar el PDF");
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible generar el PDF<br />" + error);
            });
    }
    function cargaCondicionesPago() {
        $("#cp").empty().append('<option value=""></option>');
        get('/ws/condicionespago.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#cp").append('<option value="' + this.id + '">' + this.con + '-' + this.nodias + '</option>');
                            $("#cpv").append('<option value="' + this.id + '">' + this.con + '-' + this.nodias + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
            });
    }


    /*Facturas*/
    function cargaUnidadesMedidaf(id, um) {
        get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {

                        $("#selum" + id).append('<option value="0">Seleccionar</option>');
                        $.each(res.Info, function () {
                            $("#selum" + id).append('<option value="' + this.id + '">' + this.um + '</option>');
                        });
                        $("#selum" + id).val(um);
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            });
    }
    function cargaTipocomprobantesf() {
        get('/ws/TipoComprobante.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            if (this.desc.toUpperCase() === "FACTURA") {
                                $("#tcf").append('<option value="' + this.id + '">' + this.desc + '</option>');
                            } else if (this.desc.toUpperCase() === "BOLETA") {
                                $("#tcf").append('<option value="' + this.id + '">' + this.desc + '</option>');
                            } else if (this.desc.toUpperCase() === "NOTA DE CREDITO") {
                                $("#tcf").append('<option value="' + this.id + '">' + this.desc + '</option>');
                            } else if (this.desc.toUpperCase() === "OTRO DOCUMENTO") {
                                $("#tcf").append('<option value="' + this.id + '">' + this.desc + '</option>');
                            }
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de tipo de comprobantes<br />" + error, "ERROR!");
            });
    }
    function cargaFac(idreg) {
        let fil = new Object();
        fil.idreg = idreg;
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
            columnas: [
                { leyenda: 'Tipo de Costo', class: 'text-center thp', ordenable: false, columna: '', filtro: false },
                { leyenda: 'Serie', class: 'text-center thp', ordenable: false, columna: 'SERIEFDF', filtro: false },
                { leyenda: 'Nro. de Factura', class: 'text-center thp', style: 'white-space:nowrap', ordenable: false, columna: 'NUMEROFDF', filtro: false },
                { leyenda: 'Fecha Emisión', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'FECHAFDF', filtro: false },
                { leyenda: 'Moneda', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'MONEDA', filtro: false },
                { leyenda: 'Importe', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
                { leyenda: 'Proveedor', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
            ],
            modelo: [
                {
                    propiedad: 'TIPOCOSTODF', class: 'text-center px-2 tdp', style: "white-space:nowrap", formato: function (tr, obj, valor) {
                        if (valor === 1)
                            return "Flete Marino";
                        if (valor === 2)
                            return "Gastos de Operador";
                    }
                },
                { propiedad: 'SERIEFDF', class: 'text-center tdp', ordenable: true },
                { propiedad: 'NUMEROFDF', class: 'text-center tdp', ordenable: true },
                {
                    propiedad: 'FECHAFDF', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        if (valor !== null)
                            return formatoFecha(valor, 1);
                    }
                },
                { propiedad: 'MONEDA', class: 'text-center tdp' },
                {
                    propiedad: 'TOTALDF', style: 'white-space:nowrap', class: 'text-center tdp', formato: function (tr, obj, value) {

                        if (value === 0)
                            return obj.IMPORTEFACDF;
                        else
                            return obj.TOTALDF;
                    }
                },
                {
                    propiedad: '', class: 'tdp', style: 'white-space:nowrap', formato: function (tr, obj) {
                        return obj.RAZON_SOCIAL;
                    }
                }
            ],
            url: '/ws/compras.aspx/ListarDoc',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            ordenable: true,
            limite: [20, 25, 50],
            columna: 'FECHAF',
            loader: "pre0",
            columna_orden: 'DESC'
        };

        $("#infofac").MALCO(data);
    }
    function cargacomprafac(id) {
        let j = 1;

        $("#productosf tbody").empty();
        get('/ws/compras.aspx/comprasdet', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        let fila = "";
                        $("#ump").val(this.um).trigger('change');
                        let rb = $('input:radio[name=tipom]:checked').val();
                        var selum = "selum" + j;
                        let produc = 0;
                        if (this.idprod !== null) {
                            produc = this.idprod;
                        }
                        if (rb === "1") {
                            fila += '<tr id="tr' + produc + '"><td style="display:none;" data-camp="id">' + produc + '</td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + this.codp + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 des" value="' + this.des + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><select class="form-control unm" id="' + selum + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 can" value="' + this.can + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 pre" value="' + this.pre + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 sub" value="' + this.sub + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + this.ivg + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 tot" value="' + this.tot + '"></td>' +
                                '</tr> ';
                        } else if (rb === "2") {
                            fila += '<tr id="tr' + produc + '"><td style="display:none;" data-camp="id">' + produc + '</td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" value="' + this.codp + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 des" value="' + this.des + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><select class="form-control unm" id="' + selum + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 can" value="' + this.can + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 pre" value="' + this.pre + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 sub" value="' + this.sub + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + this.ivg + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 tot" value="' + this.tot + '"></td>' +
                                '</tr> ';
                        }


                        $("#productosf tbody").append(fila);
                        cargaUnidadesMedidaf(j, this.um);
                        ++j;
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
    function guardaDocReg() {
        let reg = new Object();
        let detalle = new Array();
        let registro = new Object();
        var from = $("#fecf").val().split("/");
        var f = new Date(from[2], from[1] - 1, from[0]);
        var from2 = $("#fecvigf").val().split("/");
        var f2 = new Date(from2[2], from2[1] - 1, from2[0]);

        reg.tipcomp = $("#tcf").val();
        reg.tipcos = $("#tcif").val();
        reg.idm = $("#monf").val();
        reg.fec = f;
        reg.ser = $("#serf").val();
        reg.num = $("#numf").val().replace("?", "");
        reg.doc = $("#docf").val();
        reg.idp = $("#idprovf").val();
        reg.tipm = $('input:radio[name=tipom]:checked').val();
        reg.impfac = $("#impfac").val() === "" ? 0 : $("#impfac").val();
        reg.can = $("#cantf").val() === "" ? 0 : $("#cantf").val();
        reg.couni = $("#cosuni").val() === "" ? 0 : $("#cosuni").val();
        reg.tot = 0;
        reg.fecvig = f2;
        reg.idreg = $("#idc").val();
        reg.status = 1;
        reg.montpag = 0;
        let i = 1;
        $.each($("#productosf tbody tr"), function () {
            let det = new Object();
            det.idprod = this.cells[0].innerText;
            det.codp = $(this).find('input.codp').val();
            det.des = $(this).find('input.des').val();
            det.um = $(this).find('select.unm').val();
            det.can = $(this).find('input.can').val();
            det.pre = $(this).find('input.pre').val();
            det.sub = $(this).find('input.sub').val();
            det.ivg = $(this).find('input.ivg').val();
            det.tot = $(this).find('input.tot').val();

            detalle.push(det);
        });

        registro.docreg = reg;
        registro.detdr = detalle;

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro ',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/compras.aspx/InsertarDocReg`, {
                    method: 'POST', body: JSON.stringify({ info: JSON.stringify(registro) }), headers: { 'Content-Type': 'application/json' }
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
                    $("#productosf tbody").empty();
                    cargaFac($("#idc").val());
                    $("#mnuefacturas").modal("toggle");
                    limpiaControles("mnuefacturas");
                    $("input:radio").prop("checked", false);

                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function buscaProveedorrucf(ruc) {
        get('/ws/exportadores.aspx/consultaFiltro', JSON.stringify({ info: ruc }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length === 1) {
                            $("#razf").val(res.Info[0].razs).trigger("change");
                            $("#idprovf").val(res.Info[0].id);
                            $("#rucf").val(res.Info[0].ruc);
                        }
                        else {
                            Alerta("No se encontraron proveedores con el criterio especificado", "AVISO!");
                        }
                    }
                    else {
                        Alerta("No se encontró información del proveedor especificado", "AVISO!");
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("no fue posible cargar el listado de Proveedores<br />" + error);
            });
    }
    function buscaProveedorazsf(razs) {
        get('/ws/exportadores.aspx/consultaRazs', JSON.stringify({ info: razs }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length === 1) {
                            $("#razf").val(res.Info[0].razs).trigger("change");
                            $("#idprovf").val(res.Info[0].id);
                            $("#rucf").val(res.Info[0].ruc);
                        }
                        else {
                            Alerta("No se encontraron proveedores con el criterio especificado", "AVISO!");
                        }
                    }
                    else {
                        Alerta("No se encontró información del proveedor especificado", "AVISO!");
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("no fue posible cargar el listado de Proveedores<br />" + error);
            });
    }
    $('#txtFiltroImpoExpCompras').on("keyup", function () {
        let filtro = $('#txtFiltroImpoExpCompras').val();
        let validador = 0;
        let contador = 0;

        $('#imp option').each(function () {
            let razonSocialExportador = $(this).text().toUpperCase();
            let rucImportador = $(this).attr("ruc");
            if (razonSocialExportador !== "") {
                if (razonSocialExportador.indexOf(filtro.toUpperCase()) !== -1 || rucImportador.indexOf(filtro) !== -1) {
                    $(this).show();
                    if (validador === 0) {
                        $(this).attr("selected", true);
                        $('#imp ').val($(this).val());
                        validador++;
                    } else {
                        $(this).attr("selected", false);
                    }
                } else {
                    $(this).attr("selected", false);
                    $(this).hide();
                    contador++;
                    if ($(this).attr("style") == "display: none;" && contador == $('#imp option').length) {
                        $('#imp ').val('');
                    }
                }
            }
            if (filtro == '') {
                //SELECCIONAR EL PRIMERO
                $(this).show();
                $('#imp option:first-child').attr("selected", true);
            }
        });
    });

    //function cargarListRazonSocialProveedor() {
    //    get('/ws/exportadores.aspx/ListarParaSelect')
    //        .then(function (res) {
    //            if (res !== null) {
    //                let html = "";
    //                $(res).each(function () {
    //                    html += "<option idProveedor = '" + this.ID_EXPORTADOR + "' ruc='" + this.RUC + "' tipoDoc='" + this.TIPO_DOCUMENTO + "' value='" + this.RAZON_SOCIAL + "'>" + this.RAZON_SOCIAL +
    //                        "</option>";
    //                });
    //                $('#exp').html(html);
    //            }
    //        })
    //        .catch(function (error) {
    //            Alerta("no fue posible cargar el listado de Proveedores<br />" + error);
    //        });
    //}
    $('#ruc').on("keyup", function () {
        let filtro = $('#ruc').val();
        let validador = 0;
        let contador = 0;

        $('#exp option').each(function () {
            let razonSocialProveedor = $(this).text().toUpperCase();
            let rucProveedor = $(this).attr("ruc");

            if (razonSocialProveedor.indexOf(filtro.toUpperCase()) !== -1 || rucProveedor.indexOf(filtro) !== -1) {
                $(this).show();
                if (validador === 0) {
                    $(this).attr("selected", true);
                    $('#exp ').val($(this).val());
                    buscaProveedorazid($("#exp option:selected").attr("idProveedor"));

                    validador++;
                } else {
                    $(this).attr("selected", false);
                }
            } else {
                $(this).attr("selected", false);
                $(this).hide();
                contador++;
                if ($(this).attr("style") == "display: none;" && contador == $('#exp option').length) {
                    $('#exp ').val('');
                }
            }
            if (filtro == '') {
                //SELECCIONAR EL PRIMERO
                $(this).show();
                $('#exp option:first-child').attr("selected", true);
            }
        });
    });

    function cargaPuntosEntraga() {
        $("#tctrans").empty().append('<option value="0"></option>');
        $("#tcptoe").empty().append('<option value="0"></option>');

        get('/ws/puntosentrega.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            if (this.nom.toUpperCase() != "CENTRAL") {
                                $("#tctrans").append('<option value="' + this.id + '">' + this.nom + '</option>');
                                $("#tcptoe").append('<option value="' + this.id + '">' + this.nom + '</option>');

                            }
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            });
    }

})(jQuery);