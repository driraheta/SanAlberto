(function ($) {
    var idCliente = "0";
    var fechaIni = '';
    var fechaFin = '';
    var usuario = document.getElementById("usu").innerHTML;
    console.log(usuario);

    $(document).ready(function () {
        $('.datepicker').each(function () {
            $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        });
    });

    function hoy() {
        let hoy = new Date();
        let fechaHoy = '';
        let ano = '';
        let mes = '';
        let dia = '';
        ano = hoy.getFullYear();

        if (hoy.getDate() < 10) {
            dia = '0' + hoy.getDate();
        } else {
            dia = hoy.getDate();
        }

        if ((hoy.getMonth() + 1) < 10) {
            mes = '0' + (parseInt(hoy.getMonth()) + 1);
        } else {
            mes = '' + (parseInt(hoy.getMonth()) + 1);
        }

        fechaHoy = ano + '-' + mes + '-' + dia;
        return fechaHoy;
    }

    $("#fechaIni").val(hoy());
    $("#fechaFin").val(hoy());
    //Creamos el Tbody de Venta Por cliente
    function TbodyVentaPorCliente(idUsuario = 0, fechaIni = hoy(), fechaFin = hoy(), presionado = false) {
        console.log("FECHA INI: " + fechaIni);
        console.log("FECHA FIN: " + fechaFin);

        get('/ws/Compras.aspx/GenerarReporteConcarCompras', JSON.stringify({ fechaIni: fechaIni, fechaFin: fechaFin }))
            .then(function (res) {
                var r = JSON.stringify(res);
                if (r.startsWith('[{"ERROR":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR!");
                } else {
                    let tableHTML = '';
                    $(res).each(function () {
                        //CREACION DE VARIABLES
                        let fechaComprobante = new Date(this.FECHACOMPROBANTE);
                        let diaFechaComprobante = fechaComprobante.getDate();
                        let mesFechaComprobante = fechaComprobante.getMonth() + 1;
                        let anoFechaComprobante = fechaComprobante.getFullYear();

                        let ID_CONCARCOMPRA = (this.ID_CONCARCOMPRA != null) ? this.ID_CONCARCOMPRA : 0;
                        let ID_COMPRA = (this.ID_COMPRA != null) ? this.ID_COMPRA : 0;
                        let ID_USUARIO = (this.ID_USUARIO != null) ? this.ID_USUARIO : 0;
                        let ESTADO = (this.ESTADO != null) ? this.ESTADO : 0;
                        let FECHAHORAREGISTRO = new Date((this.FECHAHORAREGISTRO != null) ? this.FECHAHORAREGISTRO : hoy());

                        let SUBDIARIO = (this.SUBDIARIO != null) ? this.SUBDIARIO : "";
                        let NUMEROCOMPROBANTE = (this.NUMEROCOMPROBANTE != null) ? this.NUMEROCOMPROBANTE : "000000";
                        let CODIGOMONEDA = (this.CODIGOMONEDA != null) ? this.CODIGOMONEDA : "";
                        let GLOSAPRINCIPAL = (this.GLOSAPRINCIPAL != null) ? this.GLOSAPRINCIPAL : "";
                        let TIPOCAMBIO = (this.TIPOCAMBIO != null) ? this.TIPOCAMBIO : "";
                        let TIPOCONVERSION = (this.TIPOCONVERSION != null) ? this.TIPOCONVERSION : "C";
                        let FLAGCONVERSIONMONEDA = (this.FLAGCONVERSIONMONEDA != null) ? this.FLAGCONVERSIONMONEDA : "N";
                        let FECHATIPOCAMBIO = (this.FECHATIPOCAMBIO != null) ? new Date(this.FECHATIPOCAMBIO) : "";
                        let CUENTACONTABLE = (this.CUENTACONTABLE != null) ? this.CUENTACONTABLE : "";
                        let CODIGOANEXO = (this.CODIGOANEXO != null) ? this.CODIGOANEXO : "";
                        let CODIGOCENTROCOSTO = (this.CODIGOCENTROCOSTO != null) ? this.CODIGOCENTROCOSTO : "";
                        let DEBEHABER = (this.DEBEHABER != null) ? this.DEBEHABER : "D";
                        let IMPORTEORIGINAL = (this.IMPORTEORIGINAL != null) ? this.IMPORTEORIGINAL : "";
                        let IMPORTEDOLARES = (this.IMPORTEDOLARES != null) ? this.IMPORTEDOLARES : "";
                        let IMPORTESOLES = (this.IMPORTESOLES != null) ? this.IMPORTESOLES : "";
                        let TIPODOCUMENTO = (this.TIPODOCUMENTO != null) ? this.TIPODOCUMENTO : "";
                        let NUMERODOCUMENTO = (this.NUMERODOCUMENTO != null) ? this.NUMERODOCUMENTO : "";
                        let FECHADOCUMENTO = (this.FECHADOCUMENTO != null) ? new Date(this.FECHADOCUMENTO) : "";
                        let FECHAVENCIMIENTO = (this.FECHAVENCIMIENTO != null) ? new Date(this.FECHAVENCIMIENTO) : "";
                        let CODIGOAREA = (this.CODIGOAREA != null) ? this.CODIGOAREA : "";
                        let GLOSADETALLE = (this.GLOSADETALLE != null) ? this.GLOSADETALLE : "";
                        let CODIGOANEXOAUXILIAR = (this.CODIGOANEXOAUXILIAR != null) ? this.CODIGOANEXOAUXILIAR : "";
                        let MEDIODEPAGO = (this.MEDIODEPAGO != null) ? this.MEDIODEPAGO : "";
                        let TIPODOCUMENTOREFERENCIA = (this.TIPODOCUMENTOREFERENCIA != null) ? this.TIPODOCUMENTOREFERENCIA : "";
                        let NUMERODOCUMENTOREFERENCIA = (this.NUMERODOCUMENTOREFERENCIA != null) ? this.NUMERODOCUMENTOREFERENCIA : "";
                        let FECHADOCUMENTOREFERENCIA = (this.FECHADOCUMENTOREFERENCIA != null) ? new Date(this.FECHADOCUMENTOREFERENCIA) : "";
                        let NUMMAQUINAREGISTRADORATIPODOCREF = (this.NUMMAQUINAREGISTRADORATIPODOCREF != null) ? this.NUMMAQUINAREGISTRADORATIPODOCREF : "";
                        let BASEIMPONIBLEDOCREF = (this.BASEIMPONIBLEDOCREF != null) ? this.BASEIMPONIBLEDOCREF : "";
                        let IGVDOCPROVISION = (this.IGVDOCPROVISION != null) ? this.IGVDOCPROVISION : "";
                        let TIPOREFESTADOMQ = (this.TIPOREFESTADOMQ != null) ? this.TIPOREFESTADOMQ : "";
                        let NUMSERIECAJAREGISTRADORA = (this.NUMSERIECAJAREGISTRADORA != null) ? this.NUMSERIECAJAREGISTRADORA : "";
                        let FECHAOPERACION = (this.FECHAOPERACION != null) ? new Date(this.FECHAOPERACION) : "";
                        let TIPOTASA = (this.TIPOTASA != null) ? this.TIPOTASA : "";
                        let TASADETRACCIONOPERCEPCION = (this.TASADETRACCIONOPERCEPCION != null) ? this.TASADETRACCIONOPERCEPCION : "";
                        let IMPORTEBASEDETRAOPERCEDOLARES = (this.IMPORTEBASEDETRAOPERCEDOLARES != null) ? this.IMPORTEBASEDETRAOPERCEDOLARES : "";
                        let IMPORTEBASEDETRAOPERCESOLES = (this.IMPORTEBASEDETRAOPERCESOLES != null) ? this.IMPORTEBASEDETRAOPERCESOLES : "";
                        let TIPOCAMBIOPARAF = (this.TIPOCAMBIOPARAF != null) ? this.TIPOCAMBIOPARAF : "";
                        let IMPORTEIGVSINDERECHOCREDITOFISCAL = (this.IMPORTEIGVSINDERECHOCREDITOFISCAL != null) ? this.IMPORTEIGVSINDERECHOCREDITOFISCAL : "";

                        //VALIDACION DE VARIABLES
                        if (diaFechaComprobante < 10) {
                            diaFechaComprobante = "0" + diaFechaComprobante.toString();
                        }

                        if (mesFechaComprobante < 10) {
                            mesFechaComprobante = "0" + mesFechaComprobante.toString();
                        }


                        //INICIO FILA
                        tableHTML += "<tr  idCompra='" + ID_COMPRA + "' idConcarCompra='" + ID_CONCARCOMPRA + "' idUsuario='" + ID_USUARIO + "' class='text-center justify-content-center'>";
                        //INICIO COLUMNAS
                        tableHTML += "<td>" +
                            "<input type='text' name='txtSubDiario' maxlength='4' value='" + SUBDIARIO.toString() + "' />" +
                            "</td >";

                        tableHTML += "<td name='txtNumeroComprobante'>" +
                            NUMEROCOMPROBANTE + "</td >";

                        tableHTML += " <td name='txtFechaComprobante'>" +
                            diaFechaComprobante + "/" + mesFechaComprobante + "/" + anoFechaComprobante + "</td >";

                        tableHTML += "<td>" +
                            "<select name='selectCodigoMoneda'>";
                        if (CODIGOMONEDA == 2) {
                            tableHTML += "<option value='1'>MN</option>" +
                                "<option selected value='2'>ME</option>";
                        } else {
                            tableHTML += "<option selected value='1'>MN</option>" +
                                "<option value='2'>ME</option>";
                        }
                        tableHTML += "</select>" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<textarea maxlength='40' name='txtGlosaPrincipal'>" + GLOSAPRINCIPAL + "</textarea>" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='number' min='0' name='txtTipoDeCambio' value='" + TIPOCAMBIO + "'/>" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<select name='selectTipoConversion'>";
                        if (TIPOCONVERSION == 'M') {
                            tableHTML += "<option value='C'>Especial</option>" +
                                "<option selected value='M'>Compra</option>" +
                                "<option value='V'>Venta</option>" +
                                "<option value='F'>De acuerdo a fecha</option>";
                        }
                        else if (TIPOCONVERSION == 'V') {
                            tableHTML += "<option value='C'>Especial</option>" +
                                "<option value='M'>Compra</option>" +
                                "<option selected value='V'>Venta</option>" +
                                "<option value='F'>De acuerdo a fecha</option>";
                        }
                        else if (TIPOCONVERSION == 'V') {
                            tableHTML += "<option value='C'>Especial</option>" +
                                "<option value='M'>Compra</option>" +
                                "<option value='V'>Venta</option>" +
                                "<option selected value='F'>De acuerdo a fecha</option>";
                        }
                        else {
                            tableHTML += "<option selected value='C'>Especial</option>" +
                                "<option value='M'>Compra</option>" +
                                "<option value='V'>Venta</option>" +
                                "<option value='F'>De acuerdo a fecha</option>";
                        }
                        tableHTML += "</select>" +
                            "</td>";

                        if (FLAGCONVERSIONMONEDA == 'N') {
                            tableHTML += "<td>" +
                                "<select name='selectFlagConversionMoneda'>" +
                                "<option value='S'>Si se convierte</option>" +
                                "<option selected value='N'>No se convierte</option>" +
                                "</select>" +
                                "</td>";
                        } else {
                            tableHTML += "<td>" +
                                "<select name='selectFlagConversionMoneda'>" +
                                "<option selected value='S'>Si se convierte</option>" +
                                "<option value='N'>No se convierte</option>" +
                                "</select>" +
                                "</td>";
                        }


                        tableHTML += "<td>" +
                            "<input type='date' name='txtFechaTipoCambio' value='" + FECHATIPOCAMBIO + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='12' name='txtCuentaContable' condicion='EXISTIR EN EL PLAN DE CUENTAS' value='" + CUENTACONTABLE + "'/>" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<textarea maxlength='18' name='txtCodigoAnexo' condicion='SI CTA CONTABLE SELECCIONADO TIPO DE ANEXO'>" + CODIGOANEXO + "</textarea>" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='6' name='txtCodigoCentroCosto'value='" + CODIGOCENTROCOSTO + "' />" +
                            "</td>";

                        if (DEBEHABER == 'D') {
                            tableHTML += "<td>" +
                                "<select name='selectDebeHaber'>" +
                                "<option selected value='D'>Debe</option>" +
                                "<option value='H'>Haber</option>" +
                                "</select>" +
                                "</td>";
                        } else {
                            tableHTML += "<td>" +
                                "<select name='selectDebeHaber'>" +
                                "<option value='D'>Debe</option>" +
                                "<option selected value='H'>Haber</option>" +
                                "</select>" +
                                "</td>";
                        }


                        tableHTML += "<td>" +
                            "<input type='number' min='0' autocomplete='off' name='txtImporteOriginal' max='999999999999.99' value='" + IMPORTEORIGINAL + "'/>" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='number' min='0' autocomplete='off' name='txtImporteDolares' condicion='SI FLAG CONV MON = N OBLIGATORIO' value='" + IMPORTEDOLARES + "'/>" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='number' min='0' autocomplete='off' name='txtImporteSoles' condicion='SI FLAG CONV MON = N OBLIGATORIO' value='" + IMPORTESOLES + "'/>" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='2' name='txtTipoDoc' condicion='SI CUENTA CONTABLE TIENE HABILIDAD DOC REF 2char' value='" + TIPODOCUMENTO + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<textarea  maxlength='20' name='txtNumeroDoc' condicion='SI CUENTA CONTABLE TIENE HABILIDAD DOC REF INCLUYE SERIE Y NUMERO'>" + NUMERODOCUMENTO + "</textarea>" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='date' name='txtFechaDoc' condicion='SI CTA CONT HABILITADO DOC REF' value='" + FECHADOCUMENTO + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='date' name='txtFechaVencimiento' condicion='SI CTA CONT HABILITADO FECH VCTO' value='" + FECHAVENCIMIENTO + "'" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='3' name='txtCodArea' condicicion='SI CUENTA CONTABLE TIENE HABILIDAD AREA' value='" + CODIGOAREA + "'/>" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<textarea  name='txtGlosaDetalle' maxlength='30'>" + GLOSADETALLE + "</textarea>" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='18' name='txtCodigoAnexoAuxiliar' condicion='DO TIPO DE ANEXO REF' value='" + CODIGOANEXOAUXILIAR + "'/>" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='8' name='txtMedioPago' condicion='SI CUENTA CONTABLE TIENE HABILITADO TIPO MEDIO PAGO' value='" + MEDIODEPAGO + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='2' name='txtTipoDocRef' condicion='SI TIPO DOC = NC, NA o ND' value='" + TIPODOCUMENTOREFERENCIA + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='20' name='txtNumDocRef' condicion='SI TIPO DOC = NC, NA o ND' value='" + NUMERODOCUMENTOREFERENCIA + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='date'  name='txtFechaDocRef' value='" + FECHADOCUMENTOREFERENCIA + "' /> " +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='20' name='txtNumMaqRegTipoDocRef' condicion='SI TIPO DOC = NC, NA o ND & tipo doc ref = TK' value='" + NUMMAQUINAREGISTRADORATIPODOCREF + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='number' min='0' name='txtBaseImponibleDocRef' condicion='SI TIPO DOC = NC, NA o ND' value='" + BASEIMPONIBLEDOCREF + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='number' min='0' name='txtIGVDocProvision' condicion='SI TIPO DOC = NC, NA o ND' value='" + IGVDOCPROVISION + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='2' name='txtTipoRefEstadoMQ' condicion='SI CTA CONTABLE = HABILITADO DOC REF 2 && TIPO DOC = TK RETURN MQ' value='" + TIPOREFESTADOMQ + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='15' name='txtNumSerieCajaReg' condicion='SI CTA CONTABLE = HABILITADO DOC REF 2 && TIPO DOC = TK' value='" + NUMSERIECAJAREGISTRADORA + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='date' name='txtFechaOperacion' condicion='SI CTA CONTABLE = HABILITADO DOC REF 2 && TIPO DOC = TK CONSIGNAR FECHA EMISION TICKET' value='" + FECHAOPERACION + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='5' name='txtTipoTasa' condicion='SI CTA CONTABLE CONFIGURADA TASA, IF = 1 ver TG28 IF = 2 ver TG29' value='" + TIPOTASA + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='number' min='0' name='txtTasaDetraccionPercepcion' condicion='SI CTA CONTABLE CONFIGURADA TASA, IF = 1 ver TG28 IF = 2 ver TG29' value='" + TASADETRACCIONOPERCEPCION + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='number' min='0' name='txtImporteBaseDetraccionPercepcionDolares' condicion='SI CTA CONTABLE TIENE CONFIGURADA TASA = IMPORTE TOTAL DEL DOC' value='" + IMPORTEBASEDETRAOPERCEDOLARES + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='number' min='0' name='txtImporteBaseDetraccionPercepcionSoles' condicion='SI CTA CONTABLE TIENE CONFIGURADA TASA = IMPORTE TOTAL DEL DOC' value='" + IMPORTEBASEDETRAOPERCESOLES + "' /> " +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='text' maxlength='1' name='txtTipoCambioF' condicion='especificar solo si tipo conversion = F se permite M compra y V venta' value='" + TIPOCAMBIOPARAF + "' />" +
                            "</td>";

                        tableHTML += "<td>" +
                            "<input type='number' min='0'  name='txtImporteIGVSinDerechoCredFis' condicion='ESPECIFICAR SOLO PARA COMPROBANTES DE COMPRAS CON IGV SIN DERECHO DE CREDITO FISCAL SE DETALLE SOLO EN LA CUENTA 42xxx' value='" + IMPORTEIGVSINDERECHOCREDITOFISCAL + "' />" +
                            "</td>";
                        //FIN COLUMNAS
                        tableHTML += "</tr>";
                        //FIN FILA

                        //VARIABLES DESDE LA BD

                        //ID_CONCARCOMPRA
                        //ID_COMPRA
                        //ID_USUARIO
                        //ESTADO
                        //FECHAHORAREGISTRO
                        //SUBDIARIO
                        //NUMEROCOMPROBANTE
                        //FECHACOMPROBANTE
                        //CODIGOMONEDA
                        //GLOSAPRINCIPAL
                        //TIPOCAMBIO
                        //TIPOCONVERSION
                        //FLAGCONVERSIONMONEDA
                        //FECHATIPOCAMBIO
                        //CUENTACONTABLE
                        //CODIGOANEXO
                        //CODIGOCENTROCOSTO
                        //DEBEHABER
                        //IMPORTEORIGINAL
                        //IMPORTEDOLARES
                        //IMPORTESOLES
                        //TIPODOCUMENTO
                        //NUMERODOCUMENTO
                        //FECHADOCUMENTO
                        //FECHAVENCIMIENTO
                        //CODIGOAREA
                        //GLOSADETALLE
                        //CODIGOANEXOAUXILIAR
                        //MEDIODEPAGO
                        //TIPODOCUMENTOREFERENCIA
                        //NUMERODOCUMENTOREFERENCIA
                        //FECHADOCUMENTOREFERENCIA
                        //NUMMAQUINAREGISTRADORATIPODOCREF
                        //BASEIMPONIBLEDOCREF
                        //IGVDOCPROVISION
                        //TIPOREFESTADOMQ
                        //NUMSERIECAJAREGISTRADORA
                        //FECHAOPERACION
                        //TIPOTASA
                        //TASADETRACCIONOPERCEPCION
                        //IMPORTEBASEDETRAOPERCEDOLARES
                        //IMPORTEBASEDETRAOPERCESOLES
                        //TIPOCAMBIOPARAF
                        //IMPORTEIGVSINDERECHOCREDITOFISCAL
                    });

                    $('#txtRegistros').attr("cantRegistros", res.length);

                    if (res.length <= 0) {
                        $('#txtRegistros').html("No existen registros para los filtros aplicados");
                        if (presionado) {
                        }
                    } else {
                        $('#txtRegistros').html(res.length + " registros");
                    }

                    $('#tblRepConcarCompras table tbody').html(tableHTML);
                    $('#btnFiltro').show();
                }
            }).catch(function (error) {
                Alerta(error, "ERROR!");
            });


    }
    //Exportamos a Excel la tabla html
    function ReporteConcarComprasExportarExcel(tipo) {
        var jsondet = [];
        var tpon = "";

        jsondet = obtenerFilaTabla("tblRepConcarCompras", tipo);
        /*
         $("#tblRepVtas table tbody").children("tr").each(function (index) {
             var flag = false;
             if (tipo === "All") {
                 tpon = "vista_total";
                 flag = true;
             } else {
                 tpon = "vista_parcial";
                 if ($(this).is(':visible')) {
                     flag = true;
                 }
             }
             if (flag === true) {
                 var Serie, Numero, Cliente, Fecha, UndMed, Cant, Total;
                 $(this).children("td").each(function (ind) {
                     switch (ind) {
                         case 0:
                             Serie = $(this).html();
                             break;
                         case 1:
                             Numero = $(this).html();
                             break;
                         case 2:
                             Cliente = $(this).html();
                             break;
                         case 3:
                             Fecha = $(this).html();
                             break;
                         case 4:
                             UndMed = $(this).html();
                             break;
                         case 5:
                             Cant = $(this).html();
                             break;
                         case 6:
                             Total = $(this).html();
                             break;
                     }
                 });
                 if (Serie !== "") {
                     var fila = {
                         Serie: Serie,
                         Numero: Numero,
                         Cliente: Cliente,
                         FechaEmision: Fecha,
                         Medida: UndMed,
                         Cantidad: Cant,
                         Total: Total,
                     };
                     jsondet.push(fila);
                 }
             }
         });
         */
        if (jsondet.length > 0) {
            var json = {
                json: JSON.stringify(jsondet),
                vista: tpon
            };

            get('/ws/compras.aspx/ReporteConcarComprasExportarExcel', JSON.stringify(json))
                .then(function (res) {
                    var r = JSON.stringify(res);
                    r = r.replace("\"", "");
                    r = r.replace("\"", "");
                    console.log(r);
                    if (r.startsWith('[{"ERROR":', 0)) {
                        var err = "";
                        $(res).each(function () {
                            err += this.Error;
                        });
                        Alerta(err, "ERROR!");
                    } else {
                        window.location.replace("/assets/" + r);

                    }
                    limpiarExcel();
                }).catch(function (error) {
                    Alerta(error, "ERROR!");
                });


        }
    }
    function limpiarExcel() {

        get('/ws/compras.aspx/LimpiarReporteExcel')
            .then(function (res) {
                var r = JSON.stringify(res);
                console.log("RESULTADO LIMPIAR EXCEL: ");
                console.log(res);
                if (r.startsWith('[{"ERROR":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR!");
                } else {

                }
            }).catch(function (error) {
                Alerta(error, "ERROR!");
            });
    }

    $('#btnFiltro').on('click', function myfunction() {
        $('#btnFiltro').hide();
        if (validarIntervaloFechas()) {
            idCliente = $('#clientesSelect option:selected').val();
            let filtroFIniFormat = fechaIni.substr(6, 4) + "-" + fechaIni.substr(3, 2) + "-" + fechaIni.substr(0, 2);
            let filtroFFinFormat = fechaFin.substr(6, 4) + "-" + fechaFin.substr(3, 2) + "-" + fechaFin.substr(0, 2);

            TbodyVentaPorCliente(idCliente, filtroFIniFormat, filtroFFinFormat, true);
        } else {
            $('#btnFiltro').show();
        }
    });

    $('#btnExportarExcel').on('click', function myfunction() {

        if (validarRegistrosTabla()) {
            ReporteConcarComprasExportarExcel("All");

        }

        obtenerFilaTabla("tblRepConcarCompras", "All");
    });

    function obtenerFilaTabla(idDivTabla, tipo) {

        var jsondet = [];
        var tpon = "";

        $("#" + idDivTabla + " table tbody").children("tr").each(function (index) {
            var flag = false;
            if (tipo === "All") {
                tpon = "vista_total";
                flag = true;
            } else {
                tpon = "vista_parcial";
                if ($(this).is(':visible')) {
                    flag = true;
                }
            }
            var idCompra = $(this).attr("idCompra");
            var idConcarCompra = $(this).attr("idConcarCompra");
            var idUsuario = ($(this).attr("idUsuario") == 0) ? usuario : $(this).attr("idUsuario");

            console.log(idCompra);
            console.log(idConcarCompra);
            console.log(idUsuario);
            console.log("---------------");


            if (flag === true) {
                var txtSubDiario,
                    txtNumeroComprobante,
                    txtFechaComprobante,
                    selectCodigoMoneda,
                    txtGlosaPrincipal,
                    txtTipoDeCambio,
                    selectTipoConversion,
                    selectFlagConversionMoneda,
                    txtFechaTipoCambio,
                    txtCuentaContable,
                    txtCodigoAnexo,
                    txtCodigoCentroCosto,
                    selectDebeHaber,
                    txtImporteOriginal,
                    txtImporteDolares,
                    txtImporteSoles,
                    txtTipoDoc,
                    txtNumeroDoc,
                    txtFechaDoc,
                    txtFechaVencimiento,
                    txtCodArea,
                    txtGlosaDetalle,
                    txtCodigoAnexoAuxiliar,
                    txtMedioPago,
                    txtTipoDocRef,
                    txtNumDocRef,
                    txtFechaDocRef,
                    txtNumMaqRegTipoDocRef,
                    txtBaseImponibleDocRef,
                    txtIGVDocProvision,
                    txtTipoRefEstadoMQ,
                    txtNumSerieCajaReg,
                    txtFechaOperacion,
                    txtTipoTasa,
                    txtTasaDetraccionPercepcion,
                    txtImporteBaseDetraccionPercepcionDolares,
                    txtImporteBaseDetraccionPercepcionSoles,
                    txtTipoCambioF,
                    txtImporteIGVSinDerechoCredFis;


                $(this).children("td").each(function (ind) {
                    switch (ind) {
                        case 0:
                            txtSubDiario = $(this).children().val().toString();
                            break;
                        case 1:
                            txtNumeroComprobante = $(this).html().trim().replace(" ", "").toString();
                            break;
                        case 2:
                            txtFechaComprobante = $(this).html().trim().replace(" ", "");
                            break;
                        case 3:
                            selectCodigoMoneda = $(this).children().val().toString();
                            break;
                        case 4:
                            txtGlosaPrincipal = $(this).children().val().toString();
                            break;
                        case 5:
                            txtTipoDeCambio = $(this).children().val();
                            break;
                        case 6:
                            selectTipoConversion = $(this).children().val().toString();
                            break;
                        case 7:
                            selectFlagConversionMoneda = $(this).children().val().toString();
                            break;
                        case 8:
                            txtFechaTipoCambio = $(this).children().val();
                            break;
                        case 9:
                            txtCuentaContable = $(this).children().val().toString();
                            break;
                        case 10:
                            txtCodigoAnexo = $(this).children().val().toString();
                            break;
                        case 11:
                            txtCodigoCentroCosto = $(this).children().val().toString();
                            break;
                        case 12:
                            selectDebeHaber = $(this).children().val().toString();
                            break;
                        case 13:
                            txtImporteOriginal = $(this).children().val();
                            break;
                        case 14:
                            txtImporteDolares = $(this).children().val();
                            break;
                        case 15:
                            txtImporteSoles = $(this).children().val();
                            break;
                        case 16:
                            txtTipoDoc = $(this).children().val().toString();
                            break;
                        case 17:
                            txtNumeroDoc = $(this).children().val().toString();
                            break;
                        case 18:
                            txtFechaDoc = $(this).children().val();
                            break;
                        case 19:
                            txtFechaVencimiento = $(this).children().val();
                            break;
                        case 20:
                            txtCodArea = $(this).children().val().toString();
                            break;
                        case 21:
                            txtGlosaDetalle = $(this).children().val().toString();
                            break;
                        case 22:
                            txtCodigoAnexoAuxiliar = $(this).children().val().toString();
                            break;
                        case 23:
                            txtMedioPago = $(this).children().val().toString();
                            break;
                        case 24:
                            txtTipoDocRef = $(this).children().val().toString();
                            break;
                        case 25:
                            txtNumDocRef = $(this).children().val().toString();
                            break;
                        case 26:
                            txtFechaDocRef = $(this).children().val();
                            break;
                        case 27:
                            txtNumMaqRegTipoDocRef = $(this).children().val().toString();
                            break;
                        case 28:
                            txtBaseImponibleDocRef = $(this).children().val();
                            break;
                        case 29:
                            txtIGVDocProvision = $(this).children().val();
                            break;
                        case 30:
                            txtTipoRefEstadoMQ = $(this).children().val().toString();
                            break;
                        case 31:
                            txtNumSerieCajaReg = $(this).children().val().toString();
                            break;
                        case 32:
                            txtFechaOperacion = $(this).children().val();
                            break;
                        case 33:
                            txtTipoTasa = $(this).children().val().toString();
                            break;
                        case 34:
                            txtTasaDetraccionPercepcion = $(this).children().val();
                            break;
                        case 35:
                            txtImporteBaseDetraccionPercepcionDolares = $(this).children().val();
                            break;
                        case 36:
                            txtImporteBaseDetraccionPercepcionSoles = $(this).children().val();
                            break;
                        case 37:
                            txtTipoCambioF = $(this).children().val().toString();
                            break;
                        case 38:
                            txtImporteIGVSinDerechoCredFis = $(this).children().val();
                            break;
                    }
                });
                if (idCompra !== "") {
                    var fila = {
                        SubDiario: txtSubDiario,
                        NumeroComprobante: txtNumeroComprobante,
                        FechaComprobante: txtFechaComprobante,
                        CodigoMoneda: selectCodigoMoneda,
                        GlosaPrincipal: txtGlosaPrincipal,
                        TipoDeCambio: txtTipoDeCambio,
                        TipoConversion: selectTipoConversion,
                        FlagConversionMoneda: selectFlagConversionMoneda,
                        FechaTipoCambio: txtFechaTipoCambio,
                        CuentaContable: txtCuentaContable,
                        CodigoAnexo: txtCodigoAnexo,
                        CodigoCentroCosto: txtCodigoCentroCosto,
                        DebeHaber: selectDebeHaber,
                        ImporteOriginal: txtImporteOriginal,
                        ImporteDolares: txtImporteDolares,
                        ImporteSoles: txtImporteSoles,
                        TipoDoc: txtTipoDoc,
                        NumeroDoc: txtNumeroDoc,
                        FechaDoc: txtFechaDoc,
                        FechaVencimiento: txtFechaVencimiento,
                        CodArea: txtCodArea,
                        GlosaDetalle: txtGlosaDetalle,
                        CodigoAnexoAuxiliar: txtCodigoAnexoAuxiliar,
                        MedioPago: txtMedioPago,
                        TipoDocRef: txtTipoDocRef,
                        NumDocRef: txtNumDocRef,
                        FechaDocRef: txtFechaDocRef,
                        NumMaqRegTipoDocRef: txtNumMaqRegTipoDocRef,
                        BaseImponibleDocRef: txtBaseImponibleDocRef,
                        IGVDocProvision: txtIGVDocProvision,
                        TipoRefEstadoMQ: txtTipoRefEstadoMQ,
                        NumSerieCajaReg: txtNumSerieCajaReg,
                        FechaOperacion: txtFechaOperacion,
                        TipoTasa: txtTipoTasa,
                        TasaDetraccionPercepcion: txtTasaDetraccionPercepcion,
                        ImporteBaseDetraccionPercepcionDolares: txtImporteBaseDetraccionPercepcionDolares,
                        ImporteBaseDetraccionPercepcionSoles: txtImporteBaseDetraccionPercepcionSoles,
                        TipoCambioF: txtTipoCambioF,
                        ImporteIGVSinDerechoCredFis: txtImporteIGVSinDerechoCredFis
                    };
                    jsondet.push(fila);
                }
            }
        });


        if (jsondet.length > 0) {
            var json = {
                json: JSON.stringify(jsondet),
                vista: tpon
            };
            console.log(json);
            return jsondet;
        } else {
            return 0;
        }

    }

    function validarRegistrosTabla() {
        let existenRegistros = false;
        if ($('#txtRegistros').attr("cantRegistros") != undefined && $('#txtRegistros').attr("cantRegistros") > 0) {
            existenRegistros = true;
        } else {
            Alerta("NO EXISTEN REGISTROS EN LA TABLA<br> Aplicar otro filtro para cargar registros en la tabla.", "AVISO");
        }
        return existenRegistros;
    }

    function validarIntervaloFechas() {
        fechaIni = $("#fechaIni").datepicker().fecha()
        fechaFin = $("#fechaFin").datepicker().fecha()
        //fechaIni = $("#fechaIni").val();
        //fechaFin = $("#fechaFin").val();        
        let valido = false;

        if (fechaIni !== undefined || fechaFin !== undefined) {
            if (fechaIni <= fechaFin) {

                valido = true;
            } else {
                Alerta("INTERVALO DE FECHAS NO PERMITIDO<br>Fecha Inicio es mayor a Fecha Final", "ERROR!");
            }
        } else {
            Alerta("INTERVALO DE FECHAS NO DEFINIDO", "ERROR!");
        }

        return valido;
    }
    //Cargamos los registros por defecto a la tabla sin generar alerta
    //TbodyVentaPorCliente(0, hoy(), hoy());
    //Asignamos fechas de input date
    $("#fechaIni").val(hoy());
    $("#fechaFin").val(hoy());

    $('#tblRepConcarCompras table tbody').html("");



})(jQuery);