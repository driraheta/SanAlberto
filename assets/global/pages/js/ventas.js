
let arrayproductos = new Array();
let arrayimportacion = new Array();
var isEdicionVentas = true;
$(document).ready(function () {
    var nomp = "";
    setdate();
    cargaOrdenes();
    limpiarDetalleProductos();
    cargaVentAnti();
    cargaVentas(0, $("#fecpg").val());
    cargaVentTemp();
    cargaCondicionesPago();
    cargaCategorias();
    cargaVendedores();
    cargaDireccionPartida();
    cargaTransportista();
    cargadllTransNombres();
    cargaUbigeos();
    BuscarEnable();
    BuscarEnable2();
    //cargarProductosPackingList();
    cargaViajes();
    cargaProducto(); //Carga los productos por conversión de venta
    cargaContactos();
    cargaImpuestos();
    cargaAlmacenes();
    cargaPuntosEntraga();
    cargaMoneda();
    cargaGuias();
    $('.select2').each(function () {
        $(this).select2({
            width: '100%'
        });
    });

    /*CAMBIO DE BUSQUEDA DE SELECT 2--EXPRESIONES REGULARES*/
    $("#nomp").select2({
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

    $("#accordionSidebar").addClass("toggled");
    /*agregado para filtro codigo/producto*/
    $(".MALCO-infov-filas").addClass("buscar");
   /*agregado para filtrar por alamacen*/
    $("#almF").on("change", function () {

        $(".MALCO-infov-filas").children("tr").each(function () {

                var almacen = $($(this).children("td")[2]).text();
                if (almacen != $("#almF").val()) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
         });       
    });


    //validar escribir solo numeros en los inputs con clase numeros
    $(".numeros").on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    $(".decimal").on('input', function () {
        this.value = this.value.replace(/[^0-9.]/g, '');
    });

    // Fechas
    $('#fem').datepicker({
        calendarWeeks: false,
        uiLibrary: 'bootstrap4',
        format: "dd/mm/yyyy",
        defaultDate: new Date()
    });
    $('.fecha').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy" });
    });



    $(".gj-icon").each(function () {
        if ($(this).parent().parent().parent()[0].id === "busqueda") {
            $(this).css({
                "margin-left": "-2px",
                "margin-top": "-5px"
            }).parent().height("17px").css({ "margin-left": "-7px", "margin-right": "10px" }).hide();
        } else {
            $(this).css({ "margin-top": "0" });
        }
    });

    //Eventos de botones
    $("#nue").on("click", function () {
        limpiaPantalla();
        //getCorrelativo();
        //cargaSerie(6);

        $("#listaoc").hide();
        $("#forma").show();
        $("#ser").val("G"); // Guia de Remisión

        $("#gua").prop("disabled", false);
        var i = 0;
        $("#fp option").each(function () {
            if ($(this).text().toUpperCase() === "7 DÍAS") {
                $("#fp").prop("selectedIndex", i);
            } else if ($(this).text().toUpperCase() === "7") {
                $("#fp").prop("selectedIndex", i);
            } else if ($(this).text().toUpperCase() === "CREDITO 7 DÍAS") {
                $("#fp").prop("selectedIndex", i);
            } else if ($(this).text().toUpperCase() === "CREDITO-7") {
                $("#fp").prop("selectedIndex", i);
            }
            i++;
        });

        var j = 0;
        $("#mon option").each(function () {
            if ($(this).text().toUpperCase() === "SOLES") {
                $("#mon").prop("selectedIndex", j);
            }
            j++;
        });
    });
    $("#gua").on("click", function () {
        if (valForm('forma')) {
            if ($("#productos tbody tr").length > 0) {
                guardaRegistro();
            } else {
                Alerta("Debe especificar al menos un producto", "AVISO!");
            }
        }
    });

        $("#bimp").on("click", function () {

        if ($("#idp").val() > 0) {
            if ($("#ump").val() > 0) {
                let param = new Object();
                param.prod = $("#idp").val();
                param.um = $("#ump").val();
                //cargaImportaciones(param);
                cargaComposicion(param);
                $("#nameprod").text($("#nomp option:selected").text());
                cargaCompoDist();
                //$("#mimportacion").modal({ backdrop: 'static', keyboard: false });
                $("#divimportacion").show();
                
            } else {
                Alerta("Debe seleccionar una Unidad", "AVISO!");
            }
        } else {
            Alerta("Debe seleccionar un producto", "AVISO!");
        }
    });
    $("#bcod").on("click", function () {
        cargaProductosc($("#codp").val());

    });
    $("#act").on("click", function () {
        if (valForm('formae')) {

            if ($("#productose tbody tr").length > 0) {
                EditarRegistro();
            } else {
                Alerta("Debe especificar al menos un producto", "AVISO!");
            }
        }
    });
    $("#guatemp").on("click", function () {
        if (valForm('forma')) {
            if ($("#productos tbody tr").length > 0) {
                guardaRegistrotemp();
            } else {
                Alerta("Debe especificar al menos un producto", "AVISO!");
            }
        }
    });
    //$("#guacli").on("click", function () {
    //    if (valForm("mcliente")) {
    //        guardaCliente();
    //    }
    //});
    $("#can").on("click", function () {
        $("#listaoc").show();
        $("#forma").hide();
        limpiarDetalleProductos();
    });
    $("#cane").on("click", function () {
        $("#listaoc").show();
        $("#formae").hide();
    });
    //$("#cancli").on("click", function () {
    //    $("#mcliente").modal("toggle");
    //});
    $("#candirlleg").on("click", function () {
        $("#mdirllegada").modal("toggle");
    });
    $("#guadp").on("click", function () {
        if (valForm("mdirpar")) {
            guardaDireccionPartida();
        }
    });
    $("#candp").on("click", function () {
        $("#mdirpar").modal("toggle");
    });
    $("#npro").on("click", function () {
        $("#tabla").val("info");
        $("#prods").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('prods');
        $("#ivg").prop("selectedIndex", 0);


        //if ($("#ivg option").length === 2) {
        //    $("#ivg").prop("selectedIndex", 1);
        //}

    });
    $("#canp").on("click", function () {
        $("#prods").modal("toggle");
        limpiaControles('prods');
        $("#imps tbody").empty();
        $("#nompValidar").hide();
        $("#nomp").removeClass("has-error");
        /*agregado*/
        $("#infoimp").empty();
        $("#nomp option").each(function () {
            $(this).show();
        });
    });

/*modificado*/
    

    $("#agrp").on("click", function () {
        if ($("#nomp").val() === undefined || $("#nomp").val() === "" || $("#nomp").val() === null) {
            $("#nompValidar").show();
            $("#nomp").addClass("has-error");
        } else {
            $("#nompValidar").hide();
            $("#nomp").removeClass("has-error");
        }
        if (valForm("prods")) {
            let linea = 0;
            let detproducto = new Object();

            let id=0;
            let pre;
            let fila;
            //let valorfinal = parseFloat($("#preped").val()) * parseFloat($("#noped").val());
            //var celda = $('#imps tbody tr:eq(0) td')[5];
            // let idregistro = $('#imps tbody tr:eq(0) td')[0].innerText;
            // let idcompra = celda.innerText;
             //id = $("#productos tbody tr").length;
            
            detproducto.importaciones = tomarDetalleImportacion();

            /*modificado*/
            arrayproductos.push(detproducto);
            var tipoimportacion = detproducto.importaciones.length === 0 ? "" : detproducto.importaciones[0].tipoimportacion;
            pre = "info";
            $(detproducto.importaciones).each(function () {
                id = this.idimportacion;
                detproducto.linea = id;
                fila = '<tr id="f' + pre + id + '">' +
                    '<td  class="text-right" style="display: none">' + /*$("#nomp").val()*/ this.idproducto + '</td>' + //idproducto
                    '<td class="text-right">' + /*$("#nomp option:selected").attr("codigo")*/this.codproducto + '</td>' +  //codigo compra/codigo producto
                    '<td  id="n' + pre + id + '">' + /*$("#nomp option:selected").text()*/ this.producto + '</td>' + //nombre producto
                    '<td class="text-center" um="' + $("#ump").val() + '">' + $("#ump option:selected").text() + '</td>' +
                    '<td class="text-right">' + this.cantidad + '</td>' +  //cantidad
                    '<td class="text-right" style="display: none">' + this.idimportacion + '</td>' + // idreg de tabla tblregistros
                    '<td class="text-right">' + this.idimportacion + '</td>' + //codigo compra
                    '<td class="text-right" style="display: none">' + tipoimportacion + '</td>' + //tipo
                    '<td class="text-right">' + this.precio + '</td>' +  //precio
                    '<td class="text-right">' + this.cantidad * this.precio + '</td>' +  //valor
                    '<td class="text-right">' + $("#ivg option:selected").text() + '</td>' +
                    '<td class="text-right">' + this.cantidad * this.precio + '</td>' +  //valor
                    '<td class="text-right">' + $("#coment").val() + '</td>' +
                    '<td class="text-center" almc="' + $("#alm").val() + '">' + $("#alm option:selected").text() + '</td>' +
                    '<td class="text-center"  onclick="Borrar(\'' + pre + id + '\');"  ><i  id="d' + pre + id + ' "class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';
                //fila = $("#productos tr:last");

                $("#productos tbody").append(fila);

                $(fila).css({ "cursor": "pointer" });

            });
          
            $("#e" + pre + id).on("click", function () {

            });
           
            $("#prods").modal("toggle");

            $("#ump").val("");
            $("#cantp").val("");
            $("#prep").val("");
            $("#subp").val("");
            $("#coment").val("");
            $("#codp").val("");

            $("#noped").val('');
            $("#preped").val('');

            $("#imps tbody").empty();

            calculaTotales();

        }

        $("#divimportacion").hide();
    });


    /*** Botones de nuevo catalogo ***/
    $("#ncli").on("click", function () {
        ddcli = "#cli";
        idcontact = $("#contac").val() === "" ? 0 : $("#contac").val();
        $("#mcliente").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mcliente');
    });
    $("#nclie").on("click", function () {
        $("#mcliente").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mcliente');
    });
   /* $("#ndp").on("click", function () {
        $("#mdirpar").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mdirpar');
    });*/
    $("#ndpe").on("click", function () {
        $("#mdirpar").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mdirpar');
    });
    $("#ndirlleg").on("click", function () {
        $("#mdirlleg").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mdirlleg');
    });

    $("#nfpago").on("click", function () {
        ddfpago = "#fp";
        ddfpagoe = "#fpe";
        $("#mfpago").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mfpago');
    });

    $("#nmon").on("click", function () {
        $("#mmoneda").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mmoneda');
    });

    $("#ntrans").on("click", function () {
        ddtransportista = "#tranp";
        ddtransportistae = "#tranpe";
        $("#mtrans").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mtrans');
    });

    $("#npun").on("click", function () {
        ddpuntoentrega = "#pun";
        ddpuntoentregae = "#pune";
        $("#mpunentrega").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mpunentrega');
    });

    $("#ndirllegada").on("click", function () {
        $("#mdirllegada").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mdirllegada');
    });

    /*** Botones de nuevo catalogo ***/

    //Eventos de combos
    $("#noped").on("change", function () {
        cargaCompoDist();
    });
    $("#preped").on("change", function () {
        var i = 0;
        var nom1 = "";
        var nom2 = "";
        $("#MALCO-infoimp tbody tr").each(function () {
            //var cantconv = parseFloat(this.cells[6].innerText.replace(/,/g, ''));
            var cantconv = 1;
            var nombre = this.cells[2].innerText;
            if (cantconv > 0) {
                if (nom1 == "") {
                    nom1 = nombre;
                    var data = Number($("#preped").val());
                    $(this).find('input.prec').val(data);
                }
                if (nom1 != nombre) {
                    var data = Number($("#preped").val());
                    $(this).find('input.prec').val(data);
                    nom1 = nombre;
                }
                i++;
            }
        });
    });
    $("#dpar").on("change", function () {
        if ($("#dpar").val() != '')
            cargaCorrelativo();
    });

    $("#tranpname").on("change", function () {
        cargadllTransMarcas();
    });

    $("#transmar").on("change", function () {
        cargadllTransPlacas();
    });
    $("#tranpplaca").on("change", function () {
        cargadllTransConductor();
    });

    //Valida los importes
    $("#MALCO-infoimp tbody tr").on('input', '.prec', function () {
        var monto = 0;
        //suma los importes de cada concepto
        $("#MALCO-infoimp tbody tr .prec").each(function () {
            monto += Number($(this).val());
            if ($("#preped").val() != "") {
                if (monto > $("#preped").val()) {
                    Alerta("La suma de los precios de los productos excede el precio del pedido!", "warning");
                }
            }
        });
    });

    $("#prep").on("change", function () {
        importeProducto();
    });
    $("#cantp").on("change", function () {
        importeProducto();
    });
    $("#prep").on("keypress", function (evt) {
        return numerosDecimales(evt, this);
    });
    $("#cantp").on("keypress", function (evt) {
        return numerosDecimales(evt, this);
    });
    $('#nomp').change(function () {
        nomp = $('#nomp option:selected').text().trim();
        if ($('#nomp').val() != '' && $('#nomp').val() !== null) {
            cargaProductos($('#nomp').val());
            cargaUnidadesMedida($('#nomp').val());
            //cargaUnidadesMedidaProdConv($('#nomp').val());
        }
    });
    $('#ump').change(function () {
        var idprod = $('#nomp').val();

        if ($('#ump option:selected').text().toUpperCase() != "CAJA") {
            if ($('#nomp').val() != '' && $('#nomp').val() !== null) {
                cargarProductosPackingListUM($('#nomp').val(), $('#ump').val());
            }
        } else if ($('#ump option:selected').text().toUpperCase() == "CAJA") {
            $("#nomp option[value=" + idprod + "]").html(nomp);
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
                    cargaProductos($('#nomp').val());
                    cargaUnidadesMedida($('#nomp').val());

                    // cargaUnidadesMedida($('#nomp').val());
                    //cargaUnidadesMedidaProdConv($('#nomp').val());
                    nomp = $('#nomp option:selected').text().trim();

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
    $('#cli').change(function () {
        if ($('#cli').val() != '')
            cargaCliente($('#cli').val());
    });
    $('#clie').change(function () {
        cargaClienteE($('#clie').val(), 1);
    });

    $('#contac').change(function () {
        if ($("#contac").val() !== "" && $("#contac").val() !== null) {
            cargaClientesCont($("#contac").val());
            cargaContLincre($("#contac").val());
        }
    });
    $('#ivg').change(function () {
        importeProducto();
    });
    $("#reppdf").on("click", function () {
        GeneraPDF($("#contac").val(), $('#cli').val());
    });
    $("#reppdfe").on("click", function () {
        GeneraPDF($("#contace").val(), $('#clie').val());
    });


    $("#agrereg").on("click", function () {

        $.each($("#MALCO-infoimp tbody tr"), function () {
            if ($(this).find('input.cant').val() !== "") {
                var imp = Number($(this).find('input.cant').val()) * Number($(this).find('input.prec').val());
                SeleccionaRegistro(this.cells[0].innerText, this.cells[1].innerText, $(this).find('input.cant').val(), $(this).find('input.prec').val(), imp, this.cells[9].innerText, this.cells[10].innerText, this.cells[2].innerText, this.cells[11].innerText);
                $(this).find('input.cant').val("");
                $(this).find('input.prec').val("");
            }


        });
        //$("#mimportacion").modal("toggle");
       // total();
        
    });

    $("#closereg").on("click", function () {
        $("#divimportacion").hide();
    });

    //rEGISTRO DE PAGO
    $('#bfecd').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#bfeca').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#fecp').datepicker({
        calendarWeeks: false,
        uiLibrary: 'bootstrap4',
        format: "dd/mm/yyyy",
        defaultDate: new Date()
    });

    $("#regpag").on("click", function () {
        console.log($("#cli").val());
        if ($("#contac").val() !== null) {
            if ($("#cli").val() !== "") {
                let param = new Object();
                param.cont = $("#contac").val();
                param.cli = $("#cli").val();
                cargaCXC2(param);
                cargaClientesRP(0);
                $("#ModalRegPago").modal({ backdrop: 'static', keyboard: false });
            } else {
                Alerta("Debe especificar el cliente", "AVISO!");
            }
        } else {
            Alerta("Debe especificar el contacto", "AVISO!");
        }
    });
    $("#selectall").on("click", function () {
        $(".case").prop("checked", this.checked);
    });
    $(".case").on("click", function () {
        if ($(".case").length === $(".case:checked").length) {
            $("#selectall").prop("checked", true);
        } else {
            $("#selectall").prop("checked", false);
        }
    });
    $("#regpage").on("click", function () {
        let param = new Object();
        param.cont = $("#contace").val();
        param.cli = $("#clie").val();
        cargaCXC2(param);
        cargaClientesRP(0);
        $("#ModalRegPago").modal({ backdrop: 'static', keyboard: false });
    });

    $("#opc").on("change", function () {
        $("#bfecd").hide();
        $("#bfeca").hide();
        $("#bval").hide();
        $(".gj-icon").parent().hide();

        if ($(this).val() === "4") {
            $("#bfecd").show();
            $("#bfeca").show();

            $(".gj-icon").parent().show();
        } else if ($(this).val() === "5") {
            $("#bedo").show();
        } else if ($(this).val() === "1") {
            $("#bval").show();
        } else if ($(this).val() === "2") {
            $("#bval").show();
        } else if ($(this).val() === "3") {
            $("#bval").show();
        } else if ($(this).val() === "0") {
            $("#bfecd").hide();
            $("#bfeca").hide();
            $("#bval").hide();
            $(".gj-icon").parent().hide();

        }
    });
    $("#bus").on("click", function () {
        let param = new Object();

        if ($("#opc").val() === "") {
            cargaCXC2();
        } else {
            if ($("#opc").val() === "4") {
                if ($("#bfecd").val() !== "" && $("#bfeca").val() !== "") {

                    param.feci = $("#bfecd").datepicker().fecha();
                    param.fecf = $("#bfeca").datepicker().fecha();

                } else {
                    Alerta("Debe especificar una fecha", "AVISO!");
                }
            } else if ($("#opc").val() !== "") {
                //param.num = $("#bval").val().trim();

                if ($("#opc").val() === "1")
                    param.nom = $("#bval").val().trim();

                if ($("#opc").val() === "2")
                    param.cont = $("#bval").val().trim();

                if ($("#opc").val() === "3")
                    param.ruc = $("#bval").val().trim();
            }

            cargaCXC2(param);
        }
    });
    $("#regpago").on("click", function () {
        $("#mregpagos").modal({ backdrop: 'static', keyboard: false });

        getdata();
    });
    $("#canprp").on("click", function () {
        $("#mregpagos").modal("toggle");
    });
    $("#agrprp").on("click", function () {
        guardaRegistroRP();

    });

    //Evento para  calcular el monto total a pagar
    $("#tinforpbody").on('input', '.montoap', function () {
        var monto = 0;
        //suma los importes de cada concepto
        $("#tinforpbody .montoap").each(function () {
            monto += Number($(this).val());
        });
        $("#totapagar").val(monto);
    });
    //evento cuando cambia el metodo de pago
    $("#tinforpbody").on('input', '.mod', function () {
        $trBanco = $(this).parent().next().children();
        $trNoOper = $(this).parent().next().next().children();
        //si el metodo de pago es Deposito o Transefencia
        if ($(this).find('option:selected').text() === "Deposito" || $(this).find('option:selected').text() === "Transferencia") {
            $trBanco.prop("disabled", false);
            $trNoOper.prop("readonly", false);

        } else {
            $trBanco.prop("selectedIndex", 0);
            $trBanco.prop("disabled", true);
            $trNoOper.prop("readonly", true);
        }
    });

    //evento cuando cambia ela cantidad
    $("#tpbody").on('input', '.cantt', function () {
        var pre = $(this).parent().next().next().next().children().val();
        var ivg = $(this).parent().next().next().next().next().next().children().val().replace("%", "");
        $trSub = $(this).parent().next().next().next().next().children();
        $trTot = $(this).parent().next().next().next().next().next().next().children();
        $trSub.val(Number($(this).val()) * Number(pre));
        var tot = 0;
        if (ivg > 0) {
            tot = ((Number($(this).val()) * Number(pre)) * Number(ivg)) / 100;
        } else {
            tot = Number($(this).val()) * Number(pre);
        }
        $trTot.val(tot);
        var monto = 0;
        //suma los importes de cada concepto
        $("#tpbody .tott").each(function () {
            monto += Number($(this).val());
        });
        $("#totalle").val(monto);
    });
    $('#filtrarcontac').on('keyup', function () {
        filtrarSelect(this.id, 'contac');
    });
    $('#filtrarcontace').on('keyup', function () {
        filtrarSelect(this.id, 'contace');
    });
    //Editar registro de importacion al agregar un producto
    $("#agrpe").on("click", function () {
        var rowid = $("#tdid").val();
        $(rowid).find('td').eq('0').html($("#impop").val());
        $(rowid).find('td').eq('1').html($("#impop option:selected").attr("tipo"));
        $(rowid).find('td').eq('2').html($("#impop option:selected").attr("idprod"));
        $(rowid).find('td').eq('3').html($("#impop option:selected").attr("desc"));
        $(rowid).find('td').eq('4').html($("#impop option:selected").attr("cod"));
        $(rowid).find('td').eq('5').html($("#impop option:selected").attr("numero").trim());
        $(rowid).find('td').eq('6').html(formatoMoneda($("#cantpe").val().replace(/,/g, ''), 2, true));
        $(rowid).find('td').eq('7').html(formatoMoneda($("#prepe").val().replace(/,/g, ''), 2, true));
        $(rowid).find('td').eq('8').html($("#imppe").val());

        $("#cantpe").val("");
        $("#prepe").val("");
        $("#imppe").val("");

        $("#mimpe").modal("toggle");
    });
    $("#canpe").on("click", function () {
        $("#mimpe").modal("toggle");
    });
    $("#prepe").on("change", function () {
        importeProductoe();
    });
    $("#cantpe").on("change", function () {
        importeProductoe();
    });
    $("#prepe").on("keypress", function (evt) {
        return numerosDecimales(evt, this);
    });
    $("#cantpe").on("keypress", function (evt) {
        return numerosDecimales(evt, this);
    });
    $("#irpt").on("click", function () {
        window.location.href = "/pages/vtas/ConsultarPedidosT.aspx";

    });
    $("#ivpa").on("click", function () {
        window.location.href = "/pages/vtas/ConsultarPedidosA.aspx";
    });

    //viajes
    $("#nviaje").on("click", function () {
        $("#mviaje").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('mviaje');
    });

    $("#guav").on("click", function () {
        if (valForm("mviaje")) {
            guardaViaje();
        }
    });
    $("#canv").on("click", function () {
        limpiaControles('mviaje');

        $("#mviaje").modal("toggle");
    });
    //Agregar contactos
    //$("#agre").on("click", function () {
    //    if (valForm("datos")) {
    //        let id;
    //        let pre;
    //        let fila;

    //        id = $("#tblcont tbody tr").length;
    //        pre = "info";


    //        fila = '<tr id="f' + pre + id + '">' + '<td class="text-right" style="display: none">' + $("#contcli").val() + '</td>' +
    //            '<td class="text-right">' + $('#contcli option:selected').text().trim() + '</td>' +
    //            '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Eliminar"></i></td></tr>';


    //        $("#tblcont tbody").append(fila);
    //        fila = $("#tblcont tr:last");

    //        $(fila).css({ "cursor": "pointer" });
    //        $("#b" + pre + id).on("click", function () {
    //            Swal.fire({
    //                title: 'Confirmación',
    //                html: '¿Confirma que desea eliminar el contacto <b>' + $("#n" + pre + id).text() + '</b>?',
    //                icon: 'question',
    //                showCancelButton: true,
    //                confirmButtonColor: '#1cc88a',
    //                cancelButtonColor: '#6c757d',
    //                confirmButtonText: 'Si, eliminar',
    //                cancelButtonText: 'Cancelar'
    //            }).then((result) => {
    //                if (result.value) {
    //                    $("#f" + pre + id).remove();
    //                }
    //            })
    //        });

    //    }
    //});
});

$(document).ajaxStop(function () {
    let oculta = false;
    $("#MALCO-infoimp tbody tr").each(function () {
        if ($("#MALCO-infoimp tbody tr").length > 1) {
            var cant = this.cells[6].innerText;
            if (oculta == true) {
                if (cant > 0) {
                    oculta = false;
                    $('#MALCO-infoimp tr td:nth-child(7), #MALCO-infoimp th:nth-child(7)').show();
                    $('#MALCO-infoimp tr td:nth-child(3), #MALCO-infoimp th:nth-child(3)').show();
                    $("#pedido").show();
                } else {
                    $('#MALCO-infoimp tr td:nth-child(7), #MALCO-infoimp th:nth-child(7)').hide();
                    $('#MALCO-infoimp tr td:nth-child(3), #MALCO-infoimp th:nth-child(3)').hide();
                    $("#pedido").hide();
                }
            }
        }
    });
});




function cargadllTransNombres() {
    let ddtransportistanombre = $("#tranpname");
    cargaTransportistaNombre(ddtransportistanombre, null);
}

function cargadllTransMarcas() {
    let ddtransportistaMarca = $("#transmar");
    let transname = $("#tranpname").val();
    cargaTransportistaMarcas(ddtransportistaMarca, null, transname);
}

function cargadllTransPlacas() {
    let ddtransportistaPlaca = $("#tranpplaca");
    let transname = $("#tranpname").val();
    let tranmarca = $("#transmar").val();
    cargaTransportistaPlacas(ddtransportistaPlaca, null, transname, tranmarca);
}

function cargadllTransConductor() {
    let ddtransportistaConductor = $("#tranp");
    let transname = $("#tranpname").val();
    let tranmarca = $("#transmar").val();
    let tranplaca = $("#tranpplaca").val();

    cargaTransportistaConductor(ddtransportistaConductor, null, transname, tranmarca, tranplaca);
}

function limpiarDetalleProductos() {
    arrayproductos = new Array();
}

function tomarDetalleImportacion() {
    arrayImportacion = new Array();
    $.each($("#imps tbody tr"), function () {
        let det = new Object();
        det.idimportacion = this.cells[5].innerText;
        det.tipoimportacion = this.cells[1].innerText;
        det.producto = this.cells[3].innerText;
        det.idproducto = this.cells[2].innerText;
        det.codproducto = this.cells[4].innerText;
        det.codimportacion = this.cells[5].innerText;
        det.cantidad = this.cells[6].innerText.replace(/,/g, '');
        det.precio = this.cells[7].innerText.replace(/,/g, '');
        det.importe = this.cells[8].innerText.replace(/,/g, '');
        arrayImportacion.push(det);
    });
    return arrayImportacion;
}

function cargaImpuestos() {
    $("#ivg").empty().append('<option value="0">0%</option>');
    get('/ws/impuestos.aspx/Consultar', JSON.stringify({ imp: 0.0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#ivg").append('<option value="' + this.imp + '">' + this.imp + '%</option>');
                    });
                }
                $("#limps").val(res.Info);
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de impuestos<br />" + error, "ERROR!");
        });
}

function cargaCondicionesPago() {
    $("#fp").empty().append('<option value=""></option>');
    $("#fpe").empty().append('<option value=""></option>');
    get('/ws/FormaPago.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        var desc = this.fp + "-" + this.nrodias;
                        $("#fp").append('<option value="' + this.id + '">' + desc + '</option>');
                        $("#fpe").append('<option value="' + this.id + '">' + desc + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de formas de pago<br/>" + error, "ERROR");
        });
}

function cargaClientesCont(id) {
    $("#cli").empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarCont', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#cli").append('<option value="' + this.ID_CLIENTE + '">' + this.NUMERO_DOCUMENTO + ' ' + this.NOMBRE_CLIENTE + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        });
}

function cargaClientese(id, idd) {
    $("#clie").empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarCont', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#clie").append('<option value="' + this.ID_CLIENTE + '">' + this.NUMERO_DOCUMENTO + ' ' + this.NOMBRE_CLIENTE + '</option>');
                        $("#clie").val(idd);

                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        });

}

function cargaCliente(id) {
    get('/ws/Clientes.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#cruc").val(this.numdoc);
                        //$("#lincre").val(formatoMoneda(this.lincre, 2, true));

                        cargaDireccionLlegada(id);
                        //cargaClienteDat($("#contac").val(), id);
                        cargaClienteUltPago($("#contac").val(), id);

                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar lainformacion<br/>" + error, "ERROR");
        });
}

function cargaVendedores() {
    $("#ven").empty().append('<option value=""></option>');
    $("#vene").empty().append('<option value=""></option>');
    get('/ws/Vendedores.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#ven").append('<option value="' + this.id + '">' + this.nom + '</option>');
                        $("#vene").append('<option value="' + this.id + '">' + this.nom + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        });
}

function cargaDireccionPartida() {
    $("#dpar").empty().append('<option value=""></option>');
    $("#dpare").empty().append('<option value=""></option>');
    get('/ws/DireccionPartida.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info.direccionList !== null) {
                    $.each(res.Info.direccionList, function () {
                        $("#dpar").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        $("#dpare").append('<option value="' + this.id + '">' + this.desc + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        });
}

function cargaTransportista() {
    $("#tranp").empty().append('<option value=""></option>');
    $("#tranpe").empty().append('<option value=""></option>');
    get('/ws/Transportistas.aspx/ConsultarT', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#tranp").append('<option value="' + this.ID_TRANSPORTISTA + '">' + this.NOMBRE + " " + this.MARCANOMBRE + " " + this.NUMERO_DOCUMENTO + " " + this.TRANSPORTISTA + '</option>');
                        $("#tranpe").append('<option value="' + this.ID_TRANSPORTISTA + '">' + this.NOMBRE + " " + this.MARCANOMBRE + " " + this.NUMERO_DOCUMENTO + " " + this.TRANSPORTISTA + '</option>');
                        //$("#tranpe").append('<option value="' + this.id + '">' + this.nom + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        });
}

function cargaUbigeos() {
    get('/ws/ubigeos.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#cliubi").append('<option value="' + this.id + '">' + this.ubi + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de ubigeos<br />" + error, "ERROR!");
        });
}

function cargaProducto() {
    get('/ws/productos.aspx/ListarTodosLosProductosPorConversion', JSON.stringify({ tipoConversion: 2 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#nomp").empty();

                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#nomp").append('<option  codigo="' + this.CODIGO_PRODUCTO + '"   value="' + this.ID_PRODUCTO + '">' + this.PRODUCTO + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
        });
}

function cargarProductosPackingList() {
    $("#nomp").empty();

    get('/ws/productos.aspx/ListarProductosElaborados')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                $(res.Info).each(function () {
                    $("#nomp").append('<option codigo="' + this.COD + '" value="' + this.ID_PRODUCTO + '">' + this.PRODUCTO + '</option>');
                });
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
        });
}

function cargaProductos(id) {
    $("#codp").val($("#nomp option:selected").attr("codigo"));
    $("#idp").val($("#nomp option:selected").val());
}

function cargaProductosc(cod) {
    get('/ws/productos.aspx/ConsultarC', JSON.stringify({ cod: cod }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#nomp").val(this.id);
                        cargaUnidadesMedida(this.id);
                        //cargaUnidadesMedidaProdConv(this.id);

                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
        });

}

function cargaUnidadesMedidaProdConv(id) {
    get('/ws/productos.aspx/ConsultarConvP', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        if (this.UNIDAD_MEDIDA.toUpperCase() !== 'CAJA') {
                            if (this.TIPOOPERACION === 2) {
                                $("#ump").append('<option value="' + this.ID_UNIDAD_MEDIDA + '">' + this.UNIDAD_MEDIDA + '</option>');
                            }
                        }
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
    var i = 0;
    $("#ump option").each(function () {
        if ($(this).text().toUpperCase() === "CAJA") {
            $("#ump").prop("selectedIndex", i);
        }
        i++;
    });
}

function cargaViajes() {
    $("#viaje").empty().append('<option value=""></option>');
    $("#viajee").empty().append('<option value=""></option>');

    get('/ws/ViajeNo.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#viaje").append('<option value="' + this.id + '">' + this.no + '</option>');
                        $("#viajee").append('<option value="' + this.id + '">' + this.no + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de viajes<br/>" + error, "ERROR");
        });
}

function cargarProductosPackingListUM(id, idum) {

    get('/ws/productos.aspx/ListarProductosConvDesc', JSON.stringify({ idprod: id, idum: idum }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                $(res).each(function () {
                    $("#nomp option[value=" + id + "]").html(this.DESCRIPCION);

                });
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
        });
}

function cargaCategorias() {
    $("#cat").empty().append('<option value=""></option>');
    $("#cate").empty().append('<option value=""></option>');

    get('/ws/CategoriaVent.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#cat").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        $("#cate").append('<option value="' + this.id + '">' + this.desc + '</option>');

                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de categorias<br/>" + error, "ERROR");
        });
}

function cargaClienteDat(idc, idcli) {
    $("#penpag").val("");
    get('/ws/RegVtas.aspx/VentasCli', JSON.stringify({ idc: idc, idcli: idcli }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#penpag").val(formatoMoneda(this.PENDIENTE, 2, true));
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar la informacion<br/>" + error, "ERROR");
        });
    cargaClienteUltPago(idc, idcli);
}

function cargaClienteUltPago(idc, idcli) {
    $("#ultpag").val("");
    $("#ultdiapag").val("");
    get('/ws/cuentasporcobrar.aspx/UltPago', JSON.stringify({ idc: idc, idcli: idcli }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#ultpag").val(formatoMoneda(this.TOTAL_A_PAGAR, 2, true));
                        $("#ultdiapag").val(formatoFecha(this.FECHA_PAGO, 1)).attr("fecha", new Date());
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar la informacion<br/>" + error, "ERROR");
        });
    //cargaClienteVPP(idc, idcli);
}

function cargaClienteVPP(idc, idcli) {
    let info = new Object();
    info.cli = idcli;
    info.contacto = idc;

    let param = new Object();

    param.where = info;

    var data = {
        class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
        columnas: [
            { leyenda: 'Serie', class: 'text-center thp', ordenable: false, columna: 'SERIE', filtro: false },
            { leyenda: 'Numero', class: 'text-center thp', ordenable: false, columna: 'NUMERO', filtro: false },
            {
                leyenda: 'Cliente',
                class: 'text-center thp',
                style: 'white-space:nowrap',
                ordenable: false,
                columna: 'NOMBRE_CLIENTE',
                filtro: false
            },
            {
                leyenda: 'Importe',
                class: 'text-center thp',
                style: 'width:1%',
                ordenable: false,
                columna: 'TOTAL',
                filtro: false
            },
            {
                leyenda: 'Días Pend',
                class: 'text-center thp',
                style: 'width:1%',
                ordenable: false,
                columna: '',
                filtro: false
            },
            {
                leyenda: 'Estado',
                class: 'text-center thp',
                style: 'width:1%',
                ordenable: false,
                columna: '',
                filtro: false
            }
        ],
        modelo: [
            { propiedad: 'SERIE', class: 'text-center tdp' },
            { propiedad: 'NUMERO', class: 'text-center tdp' },
            { propiedad: 'NOMBRE_CLIENTE', class: 'text-center tdp' },
            {
                propiedad: 'TOTAL', class: 'text-right tdp', formato(tr, obj, value) {
                    return formatoMoneda(value, 2, true);
                }
            },
            {
                propiedad: 'FECHAEMISION',
                style: 'white-space:nowrap',
                class: 'text-center tdp',
                formato: function (tr, obj, value) {
                    var currentTime = new Date();
                    var currentDate = currentTime.toLocaleDateString();
                    var currentTimeString = currentDate.toString("dd/mm/yyyy");
                    var fecha1 = formatoFecha(value, 1);
                    var aFecha1 = fecha1.split('/');
                    var aFecha2 = currentTimeString.split('/');
                    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
                    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
                    var dif = fFecha2 - fFecha1;
                    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));

                    return dias;
                }
            },
            {
                propiedad: 'STATUS',
                style: 'white-space:nowrap',
                class: 'text-center tdp',
                formato: function (tr, obj, value) {

                    if (value === 1)
                        return "Pendiente";
                    if (value === 2)
                        return 'Cancelado';
                }
            }
        ],
        url: '/ws/RegVtas.aspx/ListarVPP',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'Días Pend',
        loader: "pre0",
        columna_orden: 'asc'
    };

    $("#listp").MALCO(data);
}

function cargaAlmacenes() {
    ddAlmacen = "#alm";
    ddAlmacene = "#alme";
    almF = "#almF";
    cargaAlmacenesXUsuario();

}

//function guardaCliente() {
//    Swal.fire({
//        title: 'Confirmación',
//        html: '¿Confirma que desea agregar el cliente <b>' + $("#nomc").val() + '</b>',
//        icon: 'question',
//        showCancelButton: true,
//        confirmButtonColor: '#1cc88a',
//        cancelButtonColor: '#6c757d',
//        confirmButtonText: 'Guardar',
//        cancelButtonText: 'Cancelar'
//    }).then((result) => {
//        if (result.value) {
//            let reg = new Object();
//            let detalle = new Array();
//            let registro = new Object();
//            let contactos = new Array();

//            reg.nom = $("#nomc").val();
//            reg.tipodoc = $("#td").val();
//            reg.numdoc = $("#numdoc").val();
//            reg.email = $("#email").val();
//            reg.tel = $("#tel").val();
//            reg.cel = $("#cel").val();
//            reg.ubigeo = $("#ubi").val();
//            reg.lincre = $("#lincrecl").val();
//            reg.diacre = $("#diacre").val();
//            reg.status = $("#status").val();
//            reg.dircom = $("#dircom").val();
//            reg.dirfis = $("#dirfis").val();

//            let i = 1;
//            $.each($("#dirllegada tbody tr"), function () {
//                let det = new Object();
//                det.desc = this.cells[0].innerText;
//                det.pues = this.cells[1].innerText;

//                detalle.push(det);
//            });
//            $.each($("#tblcont tbody tr"), function () {
//                let cont = new Object();
//                cont.idcont = this.cells[0].innerText;
//                cont.nom = this.cells[1].innerText;
//                contactos.push(cont);
//            });
//            registro.reg = reg;
//            registro.det = detalle;
//            registro.cont = contactos;

//            get("/ws/Clientes.aspx/Insertar", JSON.stringify({ info: JSON.stringify(registro) }))
//                .then(function (res) {
//                    if (res.Respuesta === 1) {
//                        $('#cli option').remove();
//                        $("#cli").append('<option value=""></option>');
//                        var id = $("#contac").val() === "" ? 0 : $("#contac").val();
//                        cargaClientes(id);
//                        Alerta("El cliente se agregó correctamente");
//                        limpiaControles('mcliente');
//                        $("#mcliente").modal("toggle");
//                    } else {
//                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
//                    }
//                })
//                .catch(function (res) {
//                    Alerta("No fue posible insertar el cliente<br />" + res, "Error!", typIconoAlerta.error);
//                });
//        }
//    });
//}

function guardaRegistro() {
    let reg = new Object();
    let detalle = new Array();
    let registro = new Object();
    var from = $("#fem").val().split("/");
    var f = new Date(from[2], from[1] - 1, from[0]);
    var tipo = "";
    if ($('#chkde').is(':checked')) {
        tipo = "PE";
        $("#ser").val("A");
    } else {
       // $("#ser").val("G");
        tipo = "GR";
    }
    reg.ser = $("#ser").val();
    reg.num = $("#num").val();
    reg.fecemi = f;
    reg.cli = $("#cli").val();
    reg.idalm = $("#alm").val();
    reg.vend = $("#ven").val();
    reg.cond = $("#fp").val();
    reg.dirpar = $("#dpar").val();
    reg.numdoc = $("#cruc").val();
    reg.dirlleg = $("#dlleg").val();
    reg.transp = $("#tranp").val();
    reg.contacto = $("#contac").val();
    reg.status = 1;
    reg.montpag = 0;
    reg.pun = $("#pun").val();
    reg.tipo = tipo;
    reg.mon = $("#mon").val();
    reg.viajeno = $("#viaje").val();
    reg.idcat = $("#cat").val();
    reg.grat = $("#chkopg").prop("checked") ? 1 : 0;
    let i = 1;
    let pos = 0;
    $.each($("#productos tbody tr"), function () {
        let det = new Object();
        det.idprod = this.cells[0].innerText;
        det.cod = this.cells[1].innerText;
        det.desc = this.cells[2].innerText;
        det.um = $(this.cells[3]).attr("um");
        det.cant = this.cells[4].innerText.replace(/,/g, '');
        det.idreg = this.cells[5].innerText;
        det.tporeg = this.cells[7].innerText;
        det.pre = this.cells[8].innerText.replace(/,/g, '');
        det.subtotal = this.cells[9].innerText.replace(/,/g, '');
        det.ivg = this.cells[10].innerText.replace("%", "");
        det.total = this.cells[11].innerText.replace(/,/g, '');
        det.com = this.cells[12].innerText;
        det.idalm = $(this.cells[13]).attr("almc");
        det.importaciones = arrayproductos[pos].importaciones;
        detalle.push(det);
    });

    registro.reg = reg;
    registro.det = detalle;

    Swal.fire({
        title: 'Confirmación',
        html: 'Se registrará el pedido venta <strong>' + reg.ser + " " + reg.num + "</strong></br>" + "Contacto: " + $("#contac option:selected").text() + "</br>" + "Cliente:  " + $("#cli option:selected").text(),
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/RegVtas.aspx/Insertar`, {
                method: 'POST',
                body: JSON.stringify({ info: JSON.stringify(registro) }),
                headers: { 'Content-Type': 'application/json' }
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
                $("#num").val(res.Info.reg.num);
                $("#pdf").prop("disabled", false);
                $("#idr").val(res.Info.reg.id);
                $("#gua").prop("disabled", true);
                cargaVentas(0);
                cargaOrdenes();
                cargaVentAnti();
                cargaVentTemp();
                limpiarDetalleProductos();
                $("#listaoc").show();
                $("#forma").hide();
            } else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    });
}

function limpiaPantalla() {
    limpiaControles("forma");
    $("#productos tbody").empty();
    var currentTime = new Date();

    var currentDate = currentTime.toLocaleDateString();
    var currentTimeString = currentDate.toString("dd/mm/yyyy");
    $("#fem").val(currentTimeString).attr("fecha", new Date());

}

function getCorrelativo() {
    let reg = new Object();

    let registro = new Object();
    reg.fecemi = new Date($("#fem").attr("fecha"));
    registro.reg = reg;
    //funcion para obtener el correlativo
    get('/ws/RegVtas.aspx/obtcorrelativo', JSON.stringify({ info: JSON.stringify(registro) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                var d = new Date();

                $("#num").val(res.Mensaje);
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }

        })
        .catch(function (error) {
            Alerta("No fue posible cargar el correlativo<br/>" + error, "ERROR");
        });
}

function cargaCorrelativo() {
    let sec = new Object();
    let registro = new Object();
    sec.iddireccion = $("#dpar").val();
    sec.iddocumento = 2; // Guia de remisión
    registro.sec = sec;
    //funcion para obtener el correlativo
    get('/ws/RegVtas.aspx/cargaCorrelativo', JSON.stringify({ info: JSON.stringify(registro) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                var d = new Date();
                $("#ser").val(res.Info[0].SERIE);
                $("#num").val(res.Info[0].NUMERO);
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }

        })
        .catch(function (error) {
            Alerta("No está ingresada una serie para este punto de ventas. Agregar en el mantenimiento de series.<br/>", "AVISO!");
        });
}

function cargaSerie(id) {
    get('/ws/TipoComprobante.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#ser").val(this.ser);
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        });
}

function cargaUnidadesMedida(idp) {
    $("#ump").empty().append('<option value=""></option>');

    get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        if (this.um.toUpperCase() === 'CAJA') {
                            $("#ump").append('<option value="' + this.id + '">' + this.um + '</option>');
                        }
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
    cargaUnidadesMedidaProdConv(idp);
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

function cargaContactos() {
    get('/ws/Contactos.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#contac").append('<option value="' + this.id + '">' + this.nom + '</option>');
                        $("#contcli").append('<option value="' + this.id + '">' + this.nom + '</option>');
                        $("#contace").append('<option value="' + this.id + '">' + this.nom + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de contactos<br />" + error, "ERROR!");
        });
}

function cargaDireccionLlegada(id) {
    $("#dlleg").empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarDir', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#dlleg").append('<option value="' + this.id + '">' + this.desc + "-" + this.pues + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de direcciones<br />" + error, "ERROR!");
        });
}

function cargaDireccionLlegadae(id) {
    $("#dllege").empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarDir', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#dllege").append('<option value="' + this.id + '">' + this.desc + "-" + this.pues + '</option>');

                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de direcciones<br />" + error, "ERROR!");
        });
}

function cargaDireccionLlegadae2(id, idd) {
    $("#dllege").empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarDir', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#dllege").append('<option value="' + this.id + '">' + this.desc + "-" + this.pues + '</option>');
                        $("#dllege").val(idd);

                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de direcciones<br />" + error, "ERROR!");
        });
}

function cargaOrdenes(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover',
        columnas: [
            {
                leyenda: '#Importacion/ Compra L.',
                class: 'text-center ',
                ordenable: false,
                columna: 'EMBARQUE',
                filtro: true
            },
        /*agregado*/
            { leyenda: 'Fecha Cámara', class: 'text-center', ordenable: false, colummna: 'FECHA_CAMARA', filtro: true },
            
            { leyenda: 'Producto', class: 'text-center ', ordenable: false, columna: 'DESCRIPCION', filtro: true },
       
            { leyenda: '# Cajas', class: 'text-center', ordenable: false, columna: 'CANTIDAD', filtro: true },
            //{ leyenda: 'Precio Venta', class: 'text-center thp',  ordenable: false, columna: '', filtro: true },
            
            { leyenda: 'Stock Actual', class: 'text-center ', ordenable: false, columna: 'STOCK', filtro: true },
            { leyenda: 'Días en Stock', class: 'text-center', ordenable: false, columna: 'DIASSTOCK', filtro: true },
            {
                leyenda: 'Stock Vta. Ant.',
                class: 'text-center ',
                ordenable: false,
                columna: 'STOCKVTASANTI',
                filtro: true
            }
        ],
        modelo: [
            { propiedad: 'EMBARQUE', class: 'text-center ' },
            /*agregado*/
            {
                propiedad: 'FECHA_CAMARA', class: 'text-center '
                ,
                formato: function (tr, obj, value) {
                    var fecha = value.replace("00:00:00", " ");
                    
                    return fecha;
                }
            },
            { propiedad: 'ID_ALMACEN', class: 'text-center d-none' },
            { propiedad: 'CODIGO', class: 'text-center d-none' },
            /*fin agregado*/
            { propiedad: 'DESCRIPCION', class: 'text-center' },
            { propiedad: 'CANTIDAD', class: 'text-center px-3 ' },
            { propiedad: 'STOCK', class: 'text-center ' },
            { propiedad: 'DIASSTOCK', class: 'text-center ' },
            { propiedad: 'STOCKVTASANTI', class: 'text-center ' }
        ],
        url: '/ws/registros.aspx/listarVtasAntiP',
        parametros: JSON.stringify(param),
        paginable: false,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'id',
        loader: "pre0",
        columna_orden: 'ASC'
    };

    $("#infov").MALCO(data);

}

function cargaVentas(e) {
    let obj;
    let idFecha = $("#idFecha").val();
    let idGuia = $("#idGuia").val();

    if (e == 0 || (idFecha == 0 && idGuia == 0)) {
        obj = { idFecha: 1, idGuia: 0, tipo: "GR" };
    } else {
        obj = { idFecha: idFecha, idGuia: idGuia, tipo: "GR" };
    }

    $("#infoven tbody").empty();
    get('/ws/RegVtas.aspx/Listar', JSON.stringify(obj))
        .then(function (res) {
            let id;
            let pre;

            if (res.Respuesta === 1) {
                pre = "vent";
                $(res.Info).each(function () {
                    id = $("#infoven tbody tr").length;
                    let fila = "";
                    let idvent = this.id_venta;
                    fila = '<tr id="f' + pre + id + '">' +
                        '<td class="tdp">' + this.serie + '-' + this.numero + '</td>' +
                        '<td class="tdp">' + this.total + '</td>' +
                        '<td class="tdp">' + this.contacto + '</td>' +
                        '<td class="tdp">' + this.cliente + '</td>' +
                        '<td class="text-center"><i id="b' + pre + id + '" class=" fa fa-search" title="Editar"></i></td>' +
                        '</tr>';
                    $("#infoven tbody").append(fila);

                    fila = $("#infoven tr:last");
                    $(fila).css({ "cursor": "pointer" });

                    $("#b" + pre + id).on("click", function () {
                        Swal.fire({
                            title: 'Confirmación',
                            html: '¿Confirma que desea actualizar la venta <b>' + $("#n" + pre + id).text() + '</b>?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#1cc88a',
                            cancelButtonColor: '#6c757d',
                            confirmButtonText: 'Si',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.value) {
                                editaRegistro(idvent);
                            }
                        });
                    });


                });
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargaGuias() {
    $("#idGuia").empty().append('<option value="0">Seleccionar</option>');

    get('/ws/RegVtas.aspx/ConsultarT', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#idGuia").append('<option value="' + this.ID_VENTAS + '">' + this.SERIE + '-' + this.NUMERO + '</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de guias<br/>" + error, "ERROR");
        });
}

function cargaVentAnti(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: '#PEDIDO', class: 'text-center thp', ordenable: false, columna: '', filtro: true },
            { leyenda: 'CLIENTE', class: 'text-center thp', ordenable: false, columna: 'DESCRIPCION', filtro: false },
            { leyenda: 'FECHA EMISIÓN', class: 'text-center thp', ordenable: false, columna: 'CANTIDAD', filtro: false },
            { leyenda: 'IMPORTE', class: 'text-center thp', ordenable: false, columna: 'STOCK', filtro: false },
            { leyenda: 'VER DETALLE', class: 'text-center thp', ordenable: false, columna: '', filtro: false }
        ],
        modelo: [
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    var num = obj.SERIE + "-" + obj.NUMERO;

                    return num;
                }
            },
            { propiedad: 'NOMBRE_CLIENTE', class: 'text-center tdp' },
            {
                propiedad: 'FECHAEMISION', class: ' tdp', formato: function (tr, obj, value) {
                    if (value !== null)
                        return formatoFecha(value, 1);
                }
            },
            { propiedad: 'TOTAL', class: 'text-center tdp' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    view = document.createElement("i");

                    $(view).addClass("fa fa-search").prop("title", "Ver registro").on("click", function () {
                        Swal.fire({
                            title: 'Confirmación',
                            html: '¿Confirma que desea actualizar la venta ?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#1cc88a',
                            cancelButtonColor: '#6c757d',
                            confirmButtonText: 'Si',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.value) {
                                editaRegistro(obj.ID_VENTAS);
                            }
                        });
                    });
                    container.appendChild(view);

                    return container;
                }
            }
        ],
        url: '/ws/RegVtas.aspx/ListarVentAnti',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: true,
        limite: [10, 25, 50],
        columna: 'CLIENTE',
        loader: "pre0",
        columna_orden: 'ASC'
    };

    $("#infoventanti").MALCO(data);
}

function editaRegistro(id) {
    cargaUnidadesMedida2();
    get('/ws/RegVtas.aspx/Editar', JSON.stringify({ id: id }))
        .then(function (res) {
            let id;
            let pre;

            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    cargaClienteE(res.Info.vent.cli, 2);
                    cargaClientese(res.Info.vent.contacto, res.Info.vent.cli);
                    cargaDireccionLlegadae2(res.Info.vent.cli, res.Info.vent.dirlleg);

                    $("#formae input").prop('disabled', true);
                    $("#formae select").prop('disabled', true);
                    $('#regpage').hide();
                    $("#listaoc").hide();
                    $("#formae").show();
                    $("#idvent").val(res.Info.vent.id);
                    $("#sere").val(res.Info.vent.ser);
                    $("#nume").val(res.Info.vent.num);
                    $("#feme").val(formatoFecha(res.Info.vent.fecemi, 1)).attr("fecha", new Date(res.Info.vent.fecemi));
                    $("#fpe").val(res.Info.vent.cond);
                    $("#fpe").trigger("change");
                    $("#dpare").val(res.Info.vent.dirpar);
                    $("#dpare").trigger("change");
                    $("#vene").val(res.Info.vent.vend);
                    $("#vene").trigger("change");
                    $("#contace").val(res.Info.vent.contacto);
                    $("#contace").trigger("change");
                    $("#tranpe").val(res.Info.vent.transp);
                    $("#tranpe").trigger("change");
                    $("#cruce").val(res.Info.vent.numdoc);
                    $("#pune").val(res.Info.vent.pun);
                    $("#pune").trigger("change");
                    $("#totalle").val(res.Info.vent.tot);
                    $("#mone").val(res.Info.vent.mon);
                    $("#mone").trigger("change");
                    $("#viajee").val(res.Info.vent.viajeno);
                    $("#viajee").trigger("change");
                    $("#cate").val(res.Info.vent.idcat);
                    $("#cate").trigger("change");
                    $("#chkopge").prop("checked", res.Info.grat);
                    $("#alm").val(res.Info.vent.idalm);
                    $("#alm").trigger("change");
                    $("#alme").val(res.Info.vent.idalm);
                    $("#alme").trigger("change");
                    $("#productose tbody").empty();

                    pre = "info";
                    $.each(res.Info.det, function () {
                        id = $("#productose tbody tr").length;
                        $("#ump").val(this.um);
                        $("#ivg").val(this.ivg);
                        //$("#alm").val(this.idalm);
                        fila = '<tr id="f' + pre + id + '">' +
                            '<td id="n' + pre + id + '"class="text-right" style="display: none"> ' + this.idprod + '</td > ' +
                            '<td class="text-right">' + this.cod + '</td>' +
                            '<td class="text-right">' + this.desc + '</td>' +
                            '<td class="text-center" um="' + this.um + '">' + $("#ump option:selected").text() + '</td>' +
                            '<td class="text-right"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 cantt" value=' + formatoMoneda(this.cant, 2, true) + '></td>' +
                            '<td class="text-right" style="display: none">' + this.idreg + '</td>' +
                            '<td class="text-right" style="display: none">' + this.tporeg + '</td>' +
                            '<td class="text-right"> <input type="text" class="form-control form-control-sm mb-2 mr-sm-2 pre" readonly="readonly" value=' + formatoMoneda(this.pre, 2, true) + '></td>' +
                            '<td class="text-right"> <input type="text" class="form-control form-control-sm mb-2 mr-sm-2 sub" readonly="readonly" value=' + formatoMoneda(this.subtotal, 2, true) + '></td>' +
                            '<td class="text-right"> <input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ivg" readonly="readonly" value=' + $("#ivg option:selected").text() + '></td>' +
                            '<td class="text-right"> <input type="text" class="form-control form-control-sm mb-2 mr-sm-2 tott" readonly="readonly" value=' + formatoMoneda(this.total, 2, true) + '></td>' +
                            '<td class="text-right">' + this.com + '</td>' +
                            '<td class="text-right" almc="' + this.idalm + '">' + $("#alm option:selected").text() + '</td>' +
                            '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';

                        $("#productose tbody").append(fila);

                        fila = $("#productose tr:last");
                        $(fila).css({ "cursor": "pointer" });
                        $("#e" + pre + id).on("click", function () {

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
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible editar el registro<br />" + error, "ERROR!");
        });
}

function EditarRegistro() {
    let reg = new Object();
    let detalle = new Array();
    let registro = new Object();
    var from = $("#feme").val().split("/");
    var f = new Date(from[2], from[1] - 1, from[0]);
    var tipo = "";
    if ($('#chkde').is('checked')) {
        tipo = "PE";
        $("#sere").val("T")
    } else {
        tipo = "GR";
        $("#sere").val("G")
    }
    reg.id = $("#idvent").val();
    reg.ser = $("#sere").val();
    reg.idalm = $("#alme").val();
    reg.num = $("#nume").val();
    reg.fecemi = f;
    reg.cli = $("#clie").val();
    reg.vend = $("#vene").val();
    reg.cond = $("#fpe").val();
    reg.dirpar = $("#dpare").val();
    reg.numdoc = $("#cruce").val();
    reg.dirlleg = $("#dllege").val();
    reg.transp = $("#tranpe").val();
    reg.contacto = $("#contace").val();
    reg.montpag = 0;
    reg.pun = $("#pune").val();
    reg.tipo = tipo;
    reg.tot = $("#totalle").val();
    reg.mon = $("#mone").val();
    reg.viajeno = $("#viajee").val();
    reg.status = 1;
    reg.idcat = $("#cate").val();
    reg.grat = $("#chkopge").prop("checked") ? 1 : 0;
    let i = 1;
    $.each($("#productose tbody tr"), function () {
        let det = new Object();
        det.idvent = $("#idvent").val();
        det.idprod = this.cells[0].innerText;
        det.cod = this.cells[1].innerText;
        det.desc = this.cells[2].innerText;
        det.um = $(this.cells[3]).attr("um");
        det.cant = $(this).find('input.cantt').val();
        det.idreg = this.cells[5].innerText;
        det.tporeg = this.cells[6].innerText;
        det.pre = $(this).find('input.pre').val();
        det.subtotal = $(this).find('input.sub').val();
        det.ivg = $(this).find('input.ivg').val().replace("%", "");
        det.total = $(this).find('input.tott').val();
        det.com = this.cells[11].innerText;
        det.idalm = $(this.cells[12]).attr("almc");

        detalle.push(det);
    });

    registro.reg = reg;
    registro.det = detalle;

    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea Editar la venta?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/RegVtas.aspx/Edita`, {
                method: 'POST',
                body: JSON.stringify({ info: JSON.stringify(registro) }),
                headers: { 'Content-Type': 'application/json' }
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
                cargaVentas(0);
                cargaOrdenes();
                cargaVentAnti();
                cargaVentTemp();
                $("#listaoc").show();
                $("#formae").hide();
            } else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    });
}

function guardaDireccionPartida() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar la dirección de partida <b>' + $("#descdp").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            let dp = new Object();

            dp.desc = $("#descdp").val();

            get("/ws/DireccionPartida.aspx/Insertar", JSON.stringify({ info: JSON.stringify(dp) }))
                .then(function (res) {
                    if (res.Respuesta === 1) {
                        $('#dpar option').remove();
                        $("#dpar").append('<option value=""></option>');

                        cargaDireccionPartida();
                        Alerta("La Dirección de Partida se agregó correctamente");
                        limpiaControles('mdirpar');
                        $("#mdirpar").modal("toggle");
                    } else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                })
                .catch(function (res) {
                    Alerta("No fue posible insertar la dirección de partida<br />" + res, "Error!", typIconoAlerta.error);
                });
        }
    });
}

function cargaImportaciones(fil = "") {
    var nameprod = "";
    let param = new Object();
    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            {
                leyenda: ' Importacion',
                class: 'text-center ',
                style: 'display: none',
                ordenable: false,
                columna: 'ID_REGISTRO',
                filtro: true
            },
            { leyenda: '#', class: 'text-center', ordenable: false, columna: 'NUMERO', filtro: true },
            { leyenda: 'Producto', class: 'text-center', ordenable: false, columna: 'DESCRIPCION', filtro: true },
            {
                leyenda: 'Fecha Ing.',
                class: 'text-center thp',
                style: 'width:1%',
                ordenable: false,
                columna: 'FECHAING',
                filtro: false
            },
            { leyenda: 'Stock (Cajas)', class: 'text-center', ordenable: false, columna: 'STOCK', filtro: true },
            { leyenda: 'Stock (UM)', class: 'text-center', ordenable: false, columna: 'STOCKUM', filtro: true },
            { leyenda: 'Cant. Conversión', class: 'text-center ', ordenable: false, columna: 'CONV', filtro: true },
            { leyenda: 'Cantidad', class: 'text-center thp', ordenable: false, columna: '', filtro: false },
            { leyenda: 'Precio', class: 'text-center thp', ordenable: false, columna: '', filtro: false },
            {
                leyenda: 'Tipo',
                class: 'text-center ',
                style: 'display: none',
                ordenable: false,
                columna: 'TPO',
                filtro: true
            },
            {
                leyenda: 'Producto',
                class: 'text-center ',
                style: 'display: none',
                ordenable: false,
                columna: 'ID_PRODUCTO',
                filtro: true
            },
            {
                leyenda: 'Codigo',
                class: 'text-center ',
                style: 'display: none',
                ordenable: false,
                columna: 'CODIGO_PRODUCTO',
                filtro: true
            },
            //{ leyenda: '', class: 'text-center', style: 'color:#fff; width:75px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            { propiedad: 'ID_REGISTRO', class: 'text-center', style: 'display: none' },
            { propiedad: 'NUMERO', class: 'text-center' },
            { propiedad: 'DESCRIPCION', class: 'text-center' },
            {
                propiedad: 'FECHAING', class: 'text-center', formato: function (tr, obj, value) {
                    if (value !== null)
                        return formatoFecha(value, 1);
                }
            },
            { propiedad: 'STOCK', class: 'text-center' },
            { propiedad: 'STOCKUM', class: 'text-center' },
            { propiedad: 'CONV', class: 'text-center' },
            {
                propiedad: '', class: 'text-center', formato(tr, obj) {
                    container = document.createElement("div");
                    selecciona = document.createElement("INPUT");
                    $(selecciona).addClass("form-control form-control-sm mb-2 mr-sm-2 cant");
                    container.appendChild(selecciona);
                    return container;
                }
            },
            {
                propiedad: '', class: 'text-center col-1', formato(tr, obj) {
                    container = document.createElement("div");
                    selecciona = document.createElement("input");
                    selecciona.setAttribute("value", obj.PRECIO);
                    $(selecciona).addClass("form-control form-control-sm mb-2 mr-sm-2 prec");
                    container.appendChild(selecciona);
                    return selecciona;
                }
            },
            { propiedad: 'TPO', class: 'text-center', style: 'display: none' },
            { propiedad: 'ID_PRODUCTO', class: 'text-center', style: 'display: none' },
            { propiedad: 'CODIGO_PRODUCTO', class: 'text-center', style: 'display: none' }
            //},
            //{
            //    propiedad: '', class: 'text-center', formato(tr, obj) {
            //        container = document.createElement("div");
            //        selecciona = document.createElement("i");
            //        $("#nameprod").text(obj.DESCRIPCION);

            //        $(selecciona).addClass("fa fa-check").prop("title", "Seleccionar").on("click", function () {
            //            var cant = tr.find('input.cant').val();
            //            if (cant !== "" && cant > 0) {
            //                var pre = tr.find('input.pre').val();
            //                var imp = Number(cant) * Number(pre);
            //                SeleccionaRegistro(obj.ID_REGISTRO, obj.NUMERO, cant, pre, imp,obj.TPO);
            //            } else {
            //                Alerta("Debe indicar la cantidad", "AVISO!");
            //            }
            //        });
            //        container.appendChild(selecciona);

            //        return container;
            //    }
            //}

        ],
        //url: '/ws/registros.aspx/listarImpV',
        url: '/ws/registros.aspx/listarCompElaborado',
        parametros: JSON.stringify(param),
        paginable: false,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'ID_REGISTRO',
        loader: "pre0",
        columna_orden: 'ASC'
    };

    $("#infoimp").MALCO(data);
}

function cargaComposicion(fil = "") {
    var nameprod = "";
    let param = new Object();
    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            {
                leyenda: ' Importacion',
                class: 'text-center ',
                style: 'display: none',
                ordenable: false,
                columna: 'ID_REGISTRO',
                filtro: true
            },
            { leyenda: '#', class: 'text-center', ordenable: false, columna: 'NUMERO', filtro: true },
            { leyenda: 'Producto', class: 'text-center', ordenable: false, columna: 'DESCRIPCION', filtro: true },
            {
                leyenda: 'Fecha Ing.',
                class: 'text-center thp',
                style: 'width:1%',
                ordenable: false,
                columna: 'FECHAING',
                filtro: false
            },
            { leyenda: 'Stock (Cajas)', class: 'text-center', ordenable: false, columna: 'STOCK', filtro: true },
            { leyenda: 'Stock (UM)', class: 'text-center', ordenable: false, columna: 'STOCKUM', filtro: true },
            { leyenda: 'Cant. Conversión', class: 'text-center ', ordenable: false, columna: 'CONV', filtro: true },
            { leyenda: 'Cantidad', class: 'text-center thp', ordenable: false, columna: '', filtro: false },
            { leyenda: 'Precio', class: 'text-center thp', ordenable: false, columna: '', filtro: false },
            {
                leyenda: 'Tipo',
                class: 'text-center ',
                style: 'display: none',
                ordenable: false,
                columna: 'TPO',
                filtro: true
            },
            {
                leyenda: 'Producto',
                class: 'text-center ',
                style: 'display: none',
                ordenable: false,
                columna: 'ID_PRODUCTO',
                filtro: true
            },
            {
                leyenda: 'Codigo',
                class: 'text-center ',
                style: 'display: none',
                ordenable: false,
                columna: 'CODIGO_PRODUCTO',
                filtro: true
            },
            //{ leyenda: '', class: 'text-center', style: 'color:#fff; width:75px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [
            { propiedad: 'ID_REGISTRO', class: 'text-center', style: 'display: none' },
            /*Cambio de Numero por el ID_REGISTRO*/
            { propiedad: 'ID_REGISTRO', class: 'text-center' },
            { propiedad: 'DESCRIPCION', class: 'text-center' },
            {
                propiedad: 'FECHAING', class: 'text-center', formato: function (tr, obj, value) {
                    if (value !== null)
                        return formatoFecha(value, 1);
                }
            },
            { propiedad: 'STOCK', class: 'text-center' },
            { propiedad: 'STOCKUM', class: 'text-center' },
            { propiedad: 'CONV', class: 'text-center' },
            {
                propiedad: '', class: 'text-center', formato(tr, obj) {
                    container = document.createElement("div");
                    selecciona = document.createElement("INPUT");
                    $(selecciona).addClass("form-control form-control-sm mb-2 mr-sm-2 cant");
                    container.appendChild(selecciona);
                  
                    return container;
                }
            },
            {
                propiedad: '', class: 'text-center col-1', formato(tr, obj) {
                    container = document.createElement("div");
                    selecciona = document.createElement("input");
                    selecciona.setAttribute("value", obj.PRECIO);
                    $(selecciona).addClass("form-control form-control-sm mb-2 mr-sm-2 prec");
                    container.appendChild(selecciona);
                  
                    return selecciona;
                }
            },
            { propiedad: 'TPO', class: 'text-center', style: 'display: none' },
            { propiedad: 'ID_PRODUCTO', class: 'text-center', style: 'display: none' },
            { propiedad: 'CODIGO_PRODUCTO', class: 'text-center', style: 'display: none' }
            //},
            //{
            //    propiedad: '', class: 'text-center', formato(tr, obj) {
            //        container = document.createElement("div");
            //        selecciona = document.createElement("i");
            //        $("#nameprod").text(obj.DESCRIPCION);

            //        $(selecciona).addClass("fa fa-check").prop("title", "Seleccionar").on("click", function () {
            //            var cant = tr.find('input.cant').val();
            //            if (cant !== "" && cant > 0) {
            //                var pre = tr.find('input.pre').val();
            //                var imp = Number(cant) * Number(pre);
            //                SeleccionaRegistro(obj.ID_REGISTRO, obj.NUMERO, cant, pre, imp,obj.TPO);
            //            } else {
            //                Alerta("Debe indicar la cantidad", "AVISO!");
            //            }
            //        });
            //        container.appendChild(selecciona);

            //        return container;
            //    }
            //}

        ],
        //url: '/ws/registros.aspx/listarImpV',
        url: '/ws/registros.aspx/listarCompElaborado',
        parametros: JSON.stringify(param),
        paginable: false,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'ID_REGISTRO',
        loader: "pre0",
        columna_orden: 'ASC'
    };
    console.log("ver " + data.modelo[4].class.valueOf());

    $("#infoimp").MALCO(data);


}

function cargaImp(idprod, idum, id) {
    $("#impop").empty().append('<option value=""></option>');
    get('/ws/registros.aspx/ConsultarImpCo', JSON.stringify({ idprod: idprod, idum: idum }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#impop").append('<option tipo="' + this.TPO + '" numero="' + this.NUMERO + '" idprod="' + this.ID_PRODUCTO + '" cod="' + this.CODIGO + '" desc="' + this.DESCRIPCION + '" value="' + this.ID_REGISTRO + '">' + this.NUMERO + "-" + this.DESCRIPCION + '</option>');
                    });
                    $("#impop").val(id);
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de direcciones<br />" + error, "ERROR!");
        });
}

function importeProductoe() {
    let sub;
    let cant;
    let precio;

    cant = $("#cantpe").val().trim().replace(/,/g, '');
    precio = $("#prepe").val().trim().replace(/,/g, '');
    if (cant === "")
        cant = 0;
    else
        cant = parseFloat(cant);

    if (precio === "")
        precio = 0;
    else
        precio = parseFloat(precio);

    sub = cant * precio;

    $("#imppe").val(formatoMoneda(sub, 2, true));

}

function SeleccionaRegistro(id, num, cant, pre, imp, tpo, idprod, desc, cod) {
    $("#imp").val(num);
    $("#idimp").val(id);
    let idimp;
    let prei;
    let fila;
    var cantidadTot = 0;
    var precioProm = 0;
    idimp = $("#imps tbody tr").length;
    prei = "info";

    fila = '<tr id="f' + prei + idimp + '">' +
        '<td class="text-right" style="display: none">' + id + '</td>' +
        '<td class="text-right" style="display: none">' + tpo + '</td>' +
        '<td class="text-right" style="display: none">' + idprod + '</td>' +
        '<td class="text-right" style="display: none">' + desc + '</td>' +
        '<td class="text-right" style="display: none">' + cod + '</td>' +
        '<td class="text-right">' + num + '</td>' +
        '<td class="text-right">' + cant + '</td>' +
        '<td class="text-center">' + pre + '</td>' +
        '<td class="text-center" > ' + imp + '</td > ' +
       // '<td class="text-center"><i id="e' + prei + idimp + '" class="fa fa-edit" title="Editar"></i></td>' +
        '<td class="text-center" > <i id="b' + prei + idimp + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td ></tr > ';

    $("#imps tbody").append(fila);
    fila = $("#imps tr:last");

    $(fila).css({ "cursor": "pointer" });
   


    $("#e" + prei + idimp).on("click", function () {
        var result = [];
        var i = 0;
        limpiaControles('mimpe');
        $("#mimpe").modal({ backdrop: 'static', keyboard: false });
        $(this).closest('td').siblings().each(function () {
            // obtenemos el texto del td 
            result[i] = $(this).text();
            ++i;
        });
        cargaImp($("#idp").val(), $("#ump").val(), result[0]);
        console.log(result);
        $("#tdid").val("#f" + prei + idimp);
        //$("#impop").val(result[0]);
        $("#cantpe").val(result[6]);
        $("#prepe").val(result[7]);
        $("#imppe").val(result[8]);

    });

    /*agregado*/
    $("#imps tbody tr").each(function () {
        cantidadTot += Number(this.cells[6].innerText);
        precioProm += Number(this.cells[8].innerText);

    });

    $("#noped").val(cantidadTot);
    $("#preped").val((precioProm / cantidadTot).toFixed(2));

    $("#b" + prei + idimp).on("click", function () {
        $("#f" + prei + idimp).remove();
        //cantidadTot -= prei;

    });
    //$("#mimportacion").modal("toggle");
   
   
}

function setdate() {
    var currentTime = new Date();

    var currentDate = currentTime.toLocaleDateString();
    var currentTimeString = currentDate.toString("dd/mm/yyyy");
    // Update the time display
    document.getElementById("fecpg").firstChild.nodeValue = currentTimeString;

}

function GeneraPDF(idc, idcli) {
    get('/ws/RegVtas.aspx/GeneraPdfRV', JSON.stringify({ idc: idc, idcli: idcli }))
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
                } else {
                    Alerta("Error No es posible generar el PDF");
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible generar el PDF<br />" + error);
        });
}

function exportarRV() {
    var idc = $("#contac").val();
    var idcli = $('#cli').val();
    get('/ws/RegVtas.aspx/ExportarExcel', JSON.stringify({ idc: idc, idcli: idcli }))
        .then(function (res) {
            var resp = JSON.stringify(res);
            resp = resp.replace("\"", "");
            resp = resp.replace("\"", "");
            if (resp.startsWith("Error:")) {
                Alerta(Resp, "ERROR!");
            } else {
                window.location.replace("/assets/" + resp);
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el archivo<br />" + error, "ERROR!");
        });
}

function cargaPuntosEntraga() {
    $("#pun").empty().append('<option value=""></option>');
    $("#pune").empty().append('<option value=""></option>');
    get('/ws/puntosentrega.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#pun").append('<option value="' + this.id + '">' + this.nom + '</option>');
                        $("#pune").append('<option value="' + this.id + '">' + this.nom + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
}

//EDicion
function cargaClienteE(id, tpo) {
    get('/ws/Clientes.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#cruce").val(this.numdoc);
                        $("#lincree").val(formatoMoneda(this.lincre, 2, true));

                        if (tpo === 1) {
                            cargaDireccionLlegadae(id);
                        }
                        cargaClienteDatE($("#contace").val(), id);
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar lainformacion<br/>" + error, "ERROR");
        });
}

function cargaClienteDatE(idc, idcli) {
    $("#penpage").val("");
    get('/ws/RegVtas.aspx/VentasCli', JSON.stringify({ idc: idc, idcli: idcli }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#penpage").val(formatoMoneda(this.PENDIENTE, 2, true));
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar la informacion<br/>" + error, "ERROR");
        });
    cargaClienteUltPagoE(idc, idcli);
}

function cargaClienteUltPagoE(idc, idcli) {
    $("#ultpage").val("");
    $("#ultdiapage").val("");
    get('/ws/cuentasporcobrar.aspx/UltPago', JSON.stringify({ idc: idc, idcli: idcli }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#ultpage").val(formatoMoneda(this.TOTAL_A_PAGAR, 2, true));
                        $("#ultdiapage").val(formatoFecha(this.FECHA_PAGO, 1)).attr("fecha", new Date());
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar la informacion<br/>" + error, "ERROR");
        });
    cargaClienteVPPE(idc, idcli);
}

function cargaClienteVPPE(idc, idcli) {
    let info = new Object();
    info.cli = idcli;
    info.contacto = idc;

    let param = new Object();

    param.where = info;

    var data = {
        class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
        columnas: [
            { leyenda: 'Serie', class: 'text-center thp', ordenable: false, columna: 'SERIE', filtro: false },
            { leyenda: 'Numero', class: 'text-center thp', ordenable: false, columna: 'NUMERO', filtro: false },
            {
                leyenda: 'Cliente',
                class: 'text-center thp',
                style: 'white-space:nowrap',
                ordenable: false,
                columna: 'NOMBRE_CLIENTE',
                filtro: false
            },
            {
                leyenda: 'Importe',
                class: 'text-center thp',
                style: 'width:1%',
                ordenable: false,
                columna: 'TOTAL',
                filtro: false
            },
            {
                leyenda: 'Días Pend',
                class: 'text-center thp',
                style: 'width:1%',
                ordenable: false,
                columna: '',
                filtro: false
            },
            {
                leyenda: 'Estado',
                class: 'text-center thp',
                style: 'width:1%',
                ordenable: false,
                columna: '',
                filtro: false
            }
        ],
        modelo: [
            { propiedad: 'SERIE', class: 'text-center tdp' },
            { propiedad: 'NUMERO', class: 'text-center tdp' },
            { propiedad: 'NOMBRE_CLIENTE', class: 'text-center tdp' },
            {
                propiedad: 'TOTAL', class: 'text-right tdp', formato(tr, obj, value) {
                    return formatoMoneda(value, 2, true);
                }
            },
            {
                propiedad: 'FECHAEMISION',
                style: 'white-space:nowrap',
                class: 'text-center tdp',
                formato: function (tr, obj, value) {
                    var currentTime = new Date();
                    var currentDate = currentTime.toLocaleDateString();
                    var currentTimeString = currentDate.toString("dd/mm/yyyy");
                    var fecha1 = formatoFecha(value, 1);
                    var aFecha1 = fecha1.split('/');
                    var aFecha2 = currentTimeString.split('/');
                    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
                    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
                    var dif = fFecha2 - fFecha1;
                    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));

                    return dias;
                }
            },
            {
                propiedad: 'STATUS',
                style: 'white-space:nowrap',
                class: 'text-center tdp',
                formato: function (tr, obj, value) {

                    if (value === 1)
                        return "Pendiente";
                    if (value === 2)
                        return 'Cancelado';
                }
            }
        ],
        url: '/ws/RegVtas.aspx/ListarVPP',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'Días Pend',
        loader: "pre0",
        columna_orden: 'asc'
    };

    $("#listpe").MALCO(data);
}

function exportarRVE() {
    var idc = $("#contace").val();
    var idcli = $('#clie').val();
    get('/ws/RegVtas.aspx/ExportarExcel', JSON.stringify({ idc: idc, idcli: idcli }))
        .then(function (res) {
            var resp = JSON.stringify(res);
            resp = resp.replace("\"", "");
            resp = resp.replace("\"", "");
            if (resp.startsWith("Error:")) {
                Alerta(Resp, "ERROR!");
            } else {
                window.location.replace("/assets/" + resp);
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el archivo<br />" + error, "ERROR!");
        });
}

function cargaUnidadesMedida2() {
    $("#ump").empty().append('<option value=""></option>');

    get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#ump").append('<option value="' + this.id + '">' + this.um + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
}

//funciones para el registro de pagos
function cargaCXC2(fil = "") {
    $("#tinfobody").html("");
    let info = new Object();

    info = fil;

    get('/ws/cuentasporcobrar.aspx/ListarCXCoCli', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                var fila = "";
                var f = 1;
                $(res).each(function () {
                    var currentTime = new Date();
                    var currentDate = currentTime.toLocaleDateString();
                    var currentTimeString = currentDate.toString("dd/mm/yyyy");
                    var fecha1 = formatoFecha(this.FECHAEMISION, 1);
                    var aFecha1 = fecha1.split('/');
                    var aFecha2 = currentTimeString.split('/');
                    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
                    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
                    var dif = fFecha2 - fFecha1;
                    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));

                    var mod = "GUIA DE REMISION";

                    var edo = this.STATUS;
                    var td = "";
                    var ocultar = " class = ''";
                    switch (this.STATUS) {
                        case 1:
                            edo = "Pendiente";
                            td = '<input type="checkbox" class="case" name="case[]" value="' + f + '">';
                            break;
                        case 2:
                            edo = "Cancelado";
                            ocultar = " class = 'd-none'";
                            td = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            break;
                        case 3:
                            edo = "Anulado";
                            ocultar = " class = 'd-none'";
                            td = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            break;
                    }

                    fila += '<tr '  + ocultar + ' id="tr' + this.ID_VENTAS + '"><td style="display:none;" data-camp="id">' + this.ID_VENTAS + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.SERIE + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.NUMERO + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.FORMAPAGO + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + fecha1 + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + this.NOMBRE_CLIENTE + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + this.NOMBRE + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + dias + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + this.TOTAL + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + edo + '</td>' +
                        '<td data-camp="">' + td + '</td>' +
                        '<td style="display:none;">' + this.ID_CLIENTE + '</td>' +
                        '<td style="display:none;">' + this.ID_VENDEDOR + '</td>' +
                        '<td style="display:none;">' + this.MONTOPAGADO + '</td>' +
                        '</tr> ';
                });

                $("#tinfobody").html(fila);
                f++;
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargaCondicionesPagoRP(cid) {
    //$("#cp" + cid).append('<option value="0">Seleccionar</option>');
    //$("#cp" + cid).append('<option value="1">Contado</option>');
    //$("#cp" + cid).append('<option value="2">Deposito</option>');
    //$("#cp" + cid).append('<option value="3">Transferencia</option>');
    get('/ws/FormaPago.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#cp" + cid).append('<option value="0">Seleccionar</option>');
                    $.each(res.Info, function () {
                        $("#cp" + cid).append('<option value="' + this.id + '">' + this.fp + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        });
}

function cargaBanco(id) {
    get('/ws/bancos.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#selBanco" + id).append('<option value="0">Seleccionar</option>');
                    $.each(res.Info, function () {
                        $("#selBanco" + id).append('<option value="' + this.id + '">' + this.banc + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        })
}

function cargaClienteRP(id) {
    get('/ws/Clientes.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#lincred").val(this.lincre);
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar lainformacion<br/>" + error, "ERROR");
        });
}

function cargaClientesRP(id) {
    $("#exp").empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarCont', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        /*cambio id_cliente y nombre_cliente*/
                        $("#exp").append('<option value="' + this.ID_CLIENTE + '">' + this.NOMBRE_CLIENTE + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        });
}

function guardaRegistroRP() {
    let detalle = new Array();
    let vent = new Array();
    let cli = new Object();

    let i = 1;
    var from1 = $("#fecp").val().split("/");
    var f = new Date(from1[2], from1[1] - 1, from1[0]);

    $.each($("#datosregpag tbody tr"), function () {
        let det = new Object();
        let v = new Object();
        //var f = new Date($(this).find('input[type="date"]').val());
        var from = this.cells[3].innerText.split("/");
        var f2 = new Date(from[2], from[1] - 1, from[0]);

        det.ord = i;
        det.idv = this.cells[0].innerText;
        det.ser = this.cells[1].innerText;
        det.num = this.cells[2].innerText;
        det.fecemi = f2;
        det.tot = this.cells[5].innerText;
        det.cond = $(this).find('select.mod').val();
        det.idbanc = $(this).find('select.banco').val();
        det.nooper = $(this).find('input.noop').val();
        det.fepago = f;
        det.obs = $(this).find('input.ob').val();
        det.idexp = $("#exp").val();
        det.lincre = $("#lincred").val();
        det.totaldeu = $("#totdeuda").val();
        det.montoapag = $(this).find('input.montoap').val();
        det.diasp = this.cells[4].innerText;
        det.totalapag = $("#totapagar").val();
        detalle.push(det);

        v.id = this.cells[0].innerText;
        let tp = parseFloat($(this).find('input.montoap').val().trim().replace(/,/g, ''));
        let ta = parseFloat(this.cells[5].innerText.trim().replace(/,/g, ''));
        if (tp < ta) {
            v.status = 1;
        } else {
            v.status = 2;
        }
        v.montpag = parseFloat(this.cells[11].innerText) + parseFloat($(this).find('input.montoap').val());
        vent.push(v);
    });

    cli.id = $("#idcli").val();
    cli.lincre = parseFloat($("#lincred").val().trim().replace(/,/g, '')) - parseFloat($("#totapagar").val().trim().replace(/,/g, ''));

    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el registro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/cuentasporcobrar.aspx/Insertar`, {
                method: 'POST',
                body: JSON.stringify({
                    info: JSON.stringify(detalle),
                    infocli: JSON.stringify(cli),
                    infov: JSON.stringify(vent)
                }),
                headers: { 'Content-Type': 'application/json' }
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
            //AGREGAR PARAMETROS
            let param = new Object();
            param.cont = $("#contac").val();
            param.cli = $("#cli").val();
            if (res.Respuesta === 1) {
                Alerta("El registro se insertó correctamente");
                $("#mregpagos").modal("toggle");
                //PARAMETROS
                cargaCXC2(cont, cli);
            } else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    });
}

function getdata() {
    let detalle = new Array();
    let j = 1;
    var fila = "";
    let totaldeu = 0;
    var currentTime = new Date();

    var currentDate = currentTime.toLocaleDateString();
    var currentTimeString = currentDate.toString("dd/mm/yyyy");
    $("#fecp").val(currentTimeString).attr("fecha", new Date());

    // para cada checkbox "chequeado"
    $("input[type=checkbox]:checked").each(function () {
        var result = [];
        var i = 0;
        let det = new Object();

        // buscamos el td más cercano en el DOM hacia "arriba"
        // luego encontramos los td adyacentes a este
        $(this).closest('td').siblings().each(function () {
            // obtenemos el texto del td 
            result[i] = $(this).text();
            ++i;
        });

        var cp = "cp" + j;
        var selBanco = "selBanco" + j;
        var bfec = "bfec" + j;
        var imp = result[8] - result[12];
        fila += '<tr id="tr' + this.ID_VENTAS + '"><td style="display:none;" data-camp="id">' + result[0] + '</td>' +
            '<td data-camp="" class="text-center tdp">' + result[1] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[2] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[4] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[7] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + imp + '</td>' +
            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 montoap"></td>' +
            '<td data-camp="" class="text-right tdp" ><select class="form-control mod" id="' + cp + '" ><option value="0">Seleccionar</option><option value="1">Contado</option><option value="2">Deposito</option><option value="3">Transferencia</option></select></td>' +
            '<td data-camp="" class="text-right tdp" ><select class="form-control banco" id="' + selBanco + '"></td>' +
            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 noop"></td>' +
            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ob"></td>' +
            '<td data-camp="" class="text-right tdp" style="display:none;">' + result[12] + '</td>' +
            '</tr> ';

        cargaBanco(j);
        //cargaCondicionesPago(j);

        ++j;

        totaldeu = Number(totaldeu) + Number(result[8]);
        /*agregar change*/
        $("#exp").val(result[10]).change();
        $("#idcli").val(result[10]);
        cargaClienteRP(result[10]);
    });
    $("#tinforpbody").html(fila);

    $("#totdeuda").val(totaldeu);
}

function calculaTotales() {
    let imp;
    $("#totall").val("0.00");

    imp = 0;

    $("#productos tbody tr").each(function () {
        imp += parseFloat(this.cells[11].innerText.replace(/,/g, ''));
    });

    $("#totall").val(formatoMoneda(imp, 2, true));
    var penpag = $("#penpag").val();
    var saldo = Number(imp) - Number(penpag.replace(",", ""));
    $("#sallincre").val(formatoMoneda(saldo, 2, true));

}

function filtrarSelect(idDOMFiltro, idDOMSelect) {
    let filtro = $('#' + idDOMFiltro).val();
    let validador = 0;
    let contador = 0;

    $('#' + idDOMSelect + ' option').each(function () {
        let nombre = $(this).text().toUpperCase();

        if (nombre.indexOf(filtro.toUpperCase()) !== -1) {
            $(this).show();
            if (validador === 0) {
                $(this).attr("selected", true);
                $('#' + idDOMSelect).val($(this).val());
                validador++;
            } else {
                $(this).attr("selected", false);
            }
        } else {
            $(this).attr("selected", false);
            $(this).hide();
            contador++;
            if ($(this).attr("style") == "display: none;" && contador == $('#nomp option').length) {
                $('#' + idDOMSelect).val('');
            }
        }

        if (filtro == '') {
            //SELECCIONAR EL PRIMERO
            $(this).show();
            $('#' + idDOMSelect + ' option:first-child').attr("selected", true);
        }
    });
    if (idDOMSelect === "contac") {
        console.log("val contac" + $("#contac").val());
        if ($("#contac").val() !== null) {
            if ($("#contac").val() !== "") {
                cargaClientes($("#contac").val());
            }
        }

    }
}

//Funciones los datos del contacto
function cargaContLincre(id) {
    get('/ws/Clientes.aspx/ConsultarLincreCont', JSON.stringify({ idcont: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        console.log("Lincred" + this.lineacredito);
                        if (this.lineacredito == null) {
                            $("#lincretotal").val(0);
                        } else {
                            $("#lincretotal").val(formatoMoneda(this.lineacredito, 2, true));
                        }
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar lainformacion<br/>" + error, "ERROR");
        });
    cargaContPenPag(id);
}

function cargaContPenPag(id) {
    $("#penpag").val("");
    get('/ws/RegVtas.aspx/VentasCont', JSON.stringify({ idc: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#penpag").val(formatoMoneda(this.PENDIENTE, 2, true));
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar la informacion<br/>" + error, "ERROR");
        });
    cargaContVPP(id);
}

function cargaContVPP(idc) {
    let info = new Object();
    info.contacto = idc;

    let param = new Object();

    param.where = info;

    var data = {
        class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
        columnas: [
            { leyenda: 'Serie', class: 'text-center thp', ordenable: false, columna: 'SERIE', filtro: false },
            { leyenda: 'Numero', class: 'text-center thp', ordenable: false, columna: 'NUMERO', filtro: false },
            {
                leyenda: 'Cliente',
                class: 'text-center thp',
                style: 'white-space:nowrap',
                ordenable: false,
                columna: 'NOMBRE_CLIENTE',
                filtro: false
            },
            {
                leyenda: 'Importe',
                class: 'text-center thp',
                style: 'width:1%',
                ordenable: false,
                columna: 'TOTAL',
                filtro: false
            },
            {
                leyenda: 'Días Pend',
                class: 'text-center thp',
                style: 'width:1%',
                ordenable: false,
                columna: '',
                filtro: false
            },
            {
                leyenda: 'Estado',
                class: 'text-center thp',
                style: 'width:1%',
                ordenable: false,
                columna: '',
                filtro: false
            }
        ],
        modelo: [
            { propiedad: 'SERIE', class: 'text-center tdp' },
            { propiedad: 'NUMERO', class: 'text-center tdp' },
            { propiedad: 'NOMBRE_CLIENTE', class: 'text-center tdp' },
            {
                propiedad: 'TOTAL', class: 'text-right tdp', formato(tr, obj, value) {
                    return formatoMoneda(value, 2, true);
                }
            },
            {
                propiedad: 'FECHAEMISION',
                style: 'white-space:nowrap',
                class: 'text-center tdp',
                formato: function (tr, obj, value) {
                    var currentTime = new Date();
                    var currentDate = currentTime.toLocaleDateString();
                    var currentTimeString = currentDate.toString("dd/mm/yyyy");
                    var fecha1 = formatoFecha(value, 1);
                    var aFecha1 = fecha1.split('/');
                    var aFecha2 = currentTimeString.split('/');
                    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
                    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
                    var dif = fFecha2 - fFecha1;
                    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));

                    return dias;
                }
            },
            {
                propiedad: 'STATUS',
                style: 'white-space:nowrap',
                class: 'text-center tdp',
                formato: function (tr, obj, value) {

                    if (value === 1)
                        return "Pendiente";
                    if (value === 2)
                        return 'Cancelado';
                }
            }
        ],
        url: '/ws/RegVtas.aspx/ListarContVPP',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'Días Pend',
        loader: "pre0",
        columna_orden: 'asc'
    };

    $("#listp").MALCO(data);
}

//Ventas Temporales
function cargaVentTemp(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: '#PEDIDO', class: 'text-center thp', ordenable: false, columna: '', filtro: true },
            { leyenda: 'CLIENTE', class: 'text-center thp', ordenable: false, columna: 'DESCRIPCION', filtro: false },
            { leyenda: 'FECHA EMISIÓN', class: 'text-center thp', ordenable: false, columna: 'CANTIDAD', filtro: false },
            { leyenda: 'IMPORTE', class: 'text-center thp', ordenable: false, columna: 'STOCK', filtro: false },
            { leyenda: 'VER DETALLE', class: 'text-center thp', ordenable: false, columna: '', filtro: false }
        ],
        modelo: [
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    var num = obj.SERIE + "-" + obj.NUMERO;

                    return num;
                }
            },
            { propiedad: 'NOMBRE_CLIENTE', class: 'text-center tdp' },
            {
                propiedad: 'FECHAEMISION', class: ' tdp', formato: function (tr, obj, value) {
                    if (value !== null)
                        return formatoFecha(value, 1);
                }
            },
            { propiedad: 'TOTAL', class: 'text-center tdp' },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    view = document.createElement("i");

                    $(view).addClass("fa fa-search").prop("title", "Ver registro").on("click", function () {
                        Swal.fire({
                            title: 'Confirmación',
                            html: '¿Confirma que desea actualizar la venta ?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#1cc88a',
                            cancelButtonColor: '#6c757d',
                            confirmButtonText: 'Si',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.value) {
                                editaRegistroTemp(obj.ID_VENTAS);
                            }
                        });
                    });
                    container.appendChild(view);

                    return container;
                }
            }
        ],
        url: '/ws/RegVtas.aspx/ListarVentTemp',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: true,
        limite: [10, 25, 50],
        columna: 'CLIENTE',
        loader: "pre0",
        columna_orden: 'ASC'
    };

    $("#infoventtemp").MALCO(data);
}

function getCorrelativotemp() {
    let reg = new Object();

    let registro = new Object();
    reg.fecemi = new Date($("#feme").attr("fecha"));
    registro.reg = reg;
    //funcion para obtener el correlativo
    get('/ws/RegVtas.aspx/obtcorrelativo', JSON.stringify({ info: JSON.stringify(registro) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                var d = new Date();

                $("#nume").val(res.Mensaje);
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }

        })
        .catch(function (error) {
            Alerta("No fue posible cargar el correlativo<br/>" + error, "ERROR");
        });
}

function editaRegistroTemp(id) {

    cargaUnidadesMedida2();
    get('/ws/RegVtas.aspx/Editar', JSON.stringify({ id: id }))
        .then(function (res) {
            let id;
            let pre;

            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    cargaClienteE(res.Info.vent.cli, 2);
                    cargaClientese(res.Info.vent.contacto, res.Info.vent.cli);
                    cargaDireccionLlegadae2(res.Info.vent.cli, res.Info.vent.dirlleg);
                    $("#feme").val(formatoFecha(res.Info.vent.fecemi, 1)).attr("fecha", new Date(res.Info.vent.fecemi));

                    getCorrelativotemp();

                    $("#listaoc").hide();
                    $("#formae").show();
                    $("#idvent").val(res.Info.vent.id);
                    $("#sere").val(res.Info.vent.ser);
                    $("#nume").val(res.Info.vent.num);
                    $("#fpe").val(res.Info.vent.cond);
                    $("#dpare").val(res.Info.vent.dirpar);
                    $("#vene").val(res.Info.vent.vend);
                    $("#contace").val(res.Info.vent.contacto);
                    $("#tranpe").val(res.Info.vent.transp);
                    $("#cruce").val(res.Info.vent.numdoc);
                    $("#pune").val(res.Info.vent.pun);
                    $("#totalle").val(res.Info.vent.tot);
                    $("#mone").val(res.Info.vent.mon);
                    $("#viajee").val(res.Info.vent.viajeno);
                    $("#cate").val(res.Info.vent.idcat);
                    $("#chkopge").prop("checked", res.Info.grat);
                    $("#alm").val(res.Info.vent.idalm);
                    $("#alm").trigger("change");
                    $("#productose tbody").empty();

                    pre = "info";
                    $.each(res.Info.det, function () {
                        id = $("#productose tbody tr").length;
                        $("#ump").val(this.um);
                        $("#ivg").val(this.ivg);
                        //$("#alm").val(this.idalm);
                        fila = '<tr id="f' + pre + id + '">' +
                            '<td id="n' + pre + id + '"class="text-right" style="display: none"> ' + this.idprod + '</td > ' +
                            '<td class="text-right">' + this.cod + '</td>' +
                            '<td class="text-right">' + this.desc + '</td>' +
                            '<td class="text-center" um="' + this.um + '">' + $("#ump option:selected").text() + '</td>' +
                            '<td class="text-right"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 cantt" value=' + formatoMoneda(this.cant, 2, true) + '></td>' +
                            '<td class="text-right" style="display: none">' + this.idreg + '</td>' +
                            '<td class="text-right" style="display: none">' + this.tporeg + '</td>' +
                            '<td class="text-right"> <input type="text" class="form-control form-control-sm mb-2 mr-sm-2 pre" readonly="readonly" value=' + formatoMoneda(this.pre, 2, true) + '></td>' +
                            '<td class="text-right"> <input type="text" class="form-control form-control-sm mb-2 mr-sm-2 sub" readonly="readonly" value=' + formatoMoneda(this.subtotal, 2, true) + '></td>' +
                            '<td class="text-right"> <input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ivg" readonly="readonly" value=' + $("#ivg option:selected").text() + '></td>' +
                            '<td class="text-right"> <input type="text" class="form-control form-control-sm mb-2 mr-sm-2 tott" readonly="readonly" value=' + formatoMoneda(this.total, 2, true) + '></td>' +
                            '<td class="text-right">' + this.com + '</td>' +
                            '<td class="text-right" almc="' + this.idalm + '">' + $("#alm option:selected").text() + '</td>' +
                            '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';

                        $("#productose tbody").append(fila);

                        fila = $("#productose tr:last");
                        $(fila).css({ "cursor": "pointer" });
                        $("#e" + pre + id).on("click", function () {

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
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible editar el registro<br />" + error, "ERROR!");
        });
}

function guardaRegistrotemp() {
    let reg = new Object();
    let detalle = new Array();
    let registro = new Object();
    var from = $("#fem").val().split("/");
    var f = new Date(from[2], from[1] - 1, from[0]);
    var tipo = "";
    $("#ser").val("T");
    if ($('#chkde').is(':checked')) {
        tipo = "TP";
    } else {
        tipo = "TP";
    }
    reg.ser = $("#ser").val();
    reg.num = $("#num").val();
    reg.fecemi = f;
    reg.cli = $("#cli").val();
    reg.vend = $("#ven").val();
    reg.cond = $("#fp").val();
    reg.dirpar = $("#dpar").val();
    reg.numdoc = $("#cruc").val();
    reg.dirlleg = $("#dlleg").val();
    reg.transp = $("#tranp").val();
    reg.contacto = $("#contac").val();
    reg.status = 1;
    reg.montpag = 0;
    reg.pun = $("#pun").val();
    reg.tipo = tipo;
    reg.mon = $("#mon").val();
    reg.viajeno = $("#viaje").val();

    let i = 1;

    $.each($("#productos tbody tr"), function () {
        let det = new Object();
        det.idprod = this.cells[0].innerText;
        det.cod = this.cells[1].innerText;
        det.desc = this.cells[2].innerText;
        det.um = $(this.cells[3]).attr("um");
        det.cant = this.cells[4].innerText.replace(/,/g, '');
        det.idreg = this.cells[5].innerText;
        det.tporeg = this.cells[7].innerText;
        det.pre = this.cells[8].innerText.replace(/,/g, '');
        det.subtotal = this.cells[9].innerText.replace(/,/g, '');
        det.ivg = this.cells[10].innerText.replace("%", "");
        det.total = this.cells[11].innerText.replace(/,/g, '');
        det.com = this.cells[12].innerText;
        det.idalm = $(this.cells[13]).attr("almc");

        detalle.push(det);
    });

    registro.reg = reg;
    registro.det = detalle;

    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar la venta',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/RegVtas.aspx/Insertar`, {
                method: 'POST',
                body: JSON.stringify({ info: JSON.stringify(registro) }),
                headers: { 'Content-Type': 'application/json' }
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
                $("#num").val(res.Info.reg.num);
                $("#pdf").prop("disabled", false);
                $("#idr").val(res.Info.reg.id);
                $("#gua").prop("disabled", true);
                cargaVentas(0);
                cargaOrdenes();
                cargaVentAnti();
                cargaVentTemp();
                $("#listaoc").show();
                $("#forma").hide();
            } else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    });
}

function cargaMoneda() {
    $("#mon").empty();
    $("#mon").append('<option value=""></option>');
    $("#mone").empty();
    $("#mone").append('<option value=""></option>');

    get('/ws/monedas.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $.each(res.Info, function () {
                    /*solucion moneda ''*/
                    $("#mon").append('<option value="' + this.id + '">' + this.mon +' ' + '</option>');
                    $("#mone").append('<option value="' + this.id + '">' + this.mon + '</option>');
                });
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function guardaViaje() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el no de viaje <b>' + $("#viajeno").val() + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            let dp = new Object();

            dp.no = $("#viajeno").val();

            get("/ws/ViajeNo.aspx/Insertar", JSON.stringify({ info: JSON.stringify(dp) }))
                .then(function (res) {
                    if (res.Respuesta === 1) {
                        $('#viaje option').remove();
                        $("#viaje").append('<option value=""></option>');

                        cargaViajes();
                        Alerta("El viaje se agregó correctamente");
                        limpiaControles('mviaje');
                        $("#mviaje").modal("toggle");
                    } else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                })
                .catch(function (res) {
                    Alerta("No fue posible insertar el no de viaje<br />" + res, "Error!", typIconoAlerta.error);
                });
        }
    });
}

function cargaCompoDist() {
    var i = 0;
    var nom1 = "";
    var nom2 = "";
    $("#MALCO-infoimp tbody tr").each(function () {
        //var cantconv = parseFloat(this.cells[6].innerText.replace(/,/g, ''));
        var cantconv = 1;
        var nombre = this.cells[2].innerText;
        if (cantconv > 0) {
            if (nom1 == "") {
                nom1 = nombre;
                var data = Number($("#noped").val()) * Number(cantconv);
                $(this).find('input.cant').val(data);
            }
            if (nom1 != nombre) {
                var data = Number($("#noped").val()) * Number(cantconv);
                $(this).find('input.cant').val(data);
                nom1 = nombre;
            }
            i++;
        }
    });
}

function BuscarEnable2() {
    $("#filtrar").keyup(function () {

       /* if ($("#filtrar").val() > 0 && $("#filtrar").val() < 100000) {
            /*agregado para buscar por código
            $(".MALCO-infov-filas").children("tr").each(function () {
                var codigo = $($(this).children("td")[3]).text();
                if ($("#filtrar").val() != codigo) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });    } else {

            var rex = new RegExp($(this).val(), 'i');
            $(".buscar tr").hide();
            $(".buscar tr").filter(function () {
                return rex.test($(this).text());
            }).show();
        }*/
        var palabra = $(this).val();
        var filtro = ".*" + palabra.replace(/\s+/g, ".*") + ".*";
        console.log(filtro);
        var rex = new RegExp(filtro, 'i');
        $(".buscar tr").hide();
        $(".buscar tr").filter(function () {
            return rex.test($(this).text());
        }).show();


    });
}

function BuscarEnable() {
    $("#guiaValor").keyup(function () {
        var rex = new RegExp($(this).val(), 'i');
        $(".buscar tr").hide();
        $(".buscar tr").filter(function () {
            return rex.test($(this).text());
        }).show();
    });
}


/*cambio prueba */
$("#agrdirlleg").on("click", function () {
    guardaDirecc();
});

function guardaDirecc() {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar la dirección de llegada al cliente seleccionado? <b>' + '</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {

            let direcc = new Object();
            direcc.idcli = $("#cli").val();
            direcc.desc = $("#descdllegada").val();
            direcc.pues = $("#puestodllegada").val();

            get("/ws/Clientes.aspx/InsertarDirecLlegada", JSON.stringify({ info: JSON.stringify(direcc) }))
                .then(function (res) {
                    if (res.Respuesta === 1) {
                        cargaDireccionLlegada(direcc.idcli);
                        Alerta("La dirección de llegada se agregó correctamente");
                        $("#descdllegada").val("");
                        $("#puestodllegada").val("");

                    } else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                })
                .catch(function (res) {
                    Alerta("No fue posible insertar la dirección <br />" + res, "Error!", typIconoAlerta.error);
                });
        }
    });
}
/*cambio borrar productos cargados en tabla principal  */
function Borrar(pre) {
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea eliminar el producto <b>' + $("#n" + pre).text() + '</b>?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            $("#f" + pre).remove();
        }
    });

};

