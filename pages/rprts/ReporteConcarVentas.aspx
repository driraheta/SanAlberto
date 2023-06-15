<%@ Page Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="ReporteConcarVentas.aspx.cs" Inherits="SanAlberto.pages.rprts.ReporteConcarVentas" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <link href="/assets/global/css/Style.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/pages/css/tablaConcar.css" rel="stylesheet" type="text/css" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Reporte Concar Ventas
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->

    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group row">
                                <label for="fechaIni" class="col-md-2 col-form-label">Desde:</label>
                                <div class="col-md-10">
                                    <input type="text" class="form-control datepicker" id="fechaIni" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group row">
                                <label for="fechaFin" class="col-md-2 col-form-label">Hasta:</label>
                                <div class="col-md-10">
                                    <input type="text" class="form-control datepicker" id="fechaFin" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 align-self-center">
                    <button class="form-control btn bg-gradient-primary text-white mb-1 mb-md-2 pr-1 pl-1" type="button" id="btnFiltro">
                        <span class="mr-1 fa fa-search"></span>Filtrar
                    </button>
                    <button class="form-control btn btn-success text-white pr-1 pl-1" type="button" id="btnExportarExcel">
                        <span class="mr-1 fa fa-file-excel"></span>
                        Exportar
           
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div id="tblRepConcarVentas" class="col-12 table-responsive stickyTableConcar" style="height: 62vh; width: 100%">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>SUBDIARIO</th>
                                <th>NUM</th>
                                <th>FECHA</th>
                                <th>CODIGO MONEDA</th>
                                <th>GLOSA PRINCIPAL</th>
                                <th>TC</th>
                                <th>TIPO DE CONVERSION</th>
                                <th>FLAG</th>
                                <th>FECHA TC</th>
                                <th>CUENTA CONTABLE</th>
                                <th>COD ANEXO</th>
                                <th>COD CENTRO COSTO</th>
                                <th>DEBE HABER</th>
                                <th>IMPORTE ORIGINAL</th>
                                <th>IMPORTE DOL</th>
                                <th>IMPORTE SOL</th>
                                <th>TIPO DE DOC</th>
                                <th>NUM DE DOC</th>
                                <th>FECHA DE DOC</th>
                                <th>FECHA DE VCTO</th>
                                <th>CODIGO DE AREA</th>
                                <th>GLOSA DETALLE</th>
                                <th>COD DE ANEXO AUXILIAR</th>
                                <th>MEDIO DE PAGO</th>
                                <th>TIPO DE DOC DE REF</th>
                                <th>NUM DE DOC DE REF</th>
                                <th>FECHA DE DOC DE REF</th>
                                <th>NUM MAQ REG TIP DOC REF</th>
                                <th>BASE IMPONIBLE DOC REF</th>
                                <th>IGV DOC PROVISION</th>
                                <th>TIPO REF EN ESTADO MQ</th>
                                <th>NUM SERIE CAJA REGISTRADORA</th>
                                <th>FECHA OPERACION</th>
                                <th>TIPO TASA</th>
                                <th>TASA DETRACCION / PERCEPCION</th>
                                <th>IMPORTE BASE DETRAC. / PERC. DOL</th>
                                <th>IMPORTE BASE DETRAC. / PERC. SOL</th>
                                <th>TIPO CAMBIO PARA 'F'</th>
                                <th>IMPORTE DE IGV SIN DERECHO CREDITO FISCAL</th>
                            </tr>
                        </thead>
                        <tbody class="text-center justify-content-center">
                            <tr idventa="idVenta" idconcarventa="idConcarVenta" class="text-center justify-content-center">
                                <td>
                                    <input type="text" name="txtSubDiario" maxlength="4" value="" />
                                </td>
                                <td name="txtNumeroComprobante">123456
                        </td>
                                <td name="txtFechaComprobante">dd/mm/aaaa
                        </td>
                                <td>
                                    <select name="selectCodigoMoneda">
                                        <option value="1">MN</option>
                                        <option value="2">ME</option>
                                    </select>
                                </td>
                                <td>
                                    <textarea maxlength="40" name="txtGlosaPrincipal">40 caracteres</textarea>

                                </td>
                                <td>
                                    <input type="number" min="0" name="txtTipoDeCambio" value="0.00" />
                                </td>
                                <td>
                                    <select name="selectTipoConversion">
                                        <option value="C">Especial</option>
                                        <option value="M">Compra</option>
                                        <option value="V">Venta</option>
                                        <option value="F">De acuerdo a fecha</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="selectFlagConversionMoneda">
                                        <option value="S">Si se convierte</option>
                                        <option value="N">No se convierte</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="date" name="txtFechaTipoCambio" />
                                </td>
                                <td>
                                    <input type="text" maxlength="12" name="txtCuentaContable" condicion="EXISTIR EN EL PLAN DE CUENTAS" value="123456789012" />
                                </td>
                                <td>
                                    <textarea maxlength="18" name="txtCodigoAnexo" condicion="SI CTA CONTABLE SELECCIONADO TIPO DE ANEXO">123456789012345678</textarea>
                                </td>
                                <td>

                                    <input type="text" maxlength="6" name="txtCodigoCentroCosto" value="123456" />
                                </td>
                                <td>
                                    <select name="selectDebeHaber">
                                        <option value="D">Debe</option>
                                        <option value="H">Haber</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="number" min="0" autocomplete="off" name="txtImporteOriginal" max="999999999999.99" value="0.00" />
                                </td>
                                <td>
                                    <input type="number" min="0" autocomplete="off" name="txtImporteDolares" condicion="SI FLAG CONV MON = N OBLIGATORIO" value="0.00" />
                                </td>
                                <td>
                                    <input type="number" min="0" autocomplete="off" name="txtImporteSoles" condicion="SI FLAG CONV MON = N OBLIGATORIO" value="0.00" />
                                </td>
                                <td>
                                    <input type="text" maxlength="2" name="txtTipoDoc" condicion="SI CUENTA CONTABLE TIENE HABILIDAD DOC REF 2char" value="FT" />
                                </td>
                                <td>
                                    <textarea maxlength="20" name="txtNumeroDoc" condicion="SI CUENTA CONTABLE TIENE HABILIDAD DOC REF INCLUYE SERIE Y NUMERO">12345678901234567890</textarea>
                                </td>
                                <td>
                                    <input type="date" name="txtFechaDoc" condicion="SI CTA CONT HABILITADO DOC REF" />
                                </td>
                                <td>
                                    <input type="date" name="txtFechaVencimiento" condicion="SI CTA CONT HABILITADO FECH VCTO" />
                                </td>
                                <td>
                                    <input type="text" maxlength="3" name="txtCodArea" condicicion="SI CUENTA CONTABLE TIENE HABILIDAD AREA" value="123" />
                                </td>
                                <td>
                                    <textarea name="txtGlosaDetalle" maxlength="30">123456789012345678901234567890</textarea>
                                </td>
                                <td>
                                    <input type="text" maxlength="18" name="txtCodigoAnexoAuxiliar" condicion="DO TIPO DE ANEXO REF" value="123456789012345678" />
                                </td>
                                <td>
                                    <input type="text" maxlength="8" name="txtMedioPago" condicion="SI CUENTA CONTABLE TIENE HABILITADO TIPO MEDIO PAGO" value="12345678" />
                                </td>
                                <td>
                                    <input type="text" maxlength="2" name="txtTipoDocRef" condicion="SI TIPO DOC= NC, NA o ND" value="12" />
                                </td>
                                <td>
                                    <input type="text" maxlength="20" name="txtNumDocRef" condicion="SI TIPO DOC= NC, NA o ND" value="12345678901234567890" />
                                </td>
                                <td>
                                    <input type="date" name="txtFechaDocRef" />
                                </td>
                                <td>
                                    <input type="text" maxlength="20" name="txtNumMaqRegTipoDocRef" condicion="SI TIPO DOC = NC, NA o ND & tipo doc ref = TK" value="12345678901234567890" />
                                </td>
                                <td>
                                    <input type="number" min="0" name="txtBaseImponibleDocRef" condicion="SI TIPO DOC= NC, NA o ND" value="123456789012.12" />
                                </td>
                                <td>
                                    <input type="number" min="0" name="txtIGVDocProvision" condicion="SI TIPO DOC= NC, NA o ND" value="123456789012.12" />
                                </td>



                                <td>
                                    <input type="text" maxlength="2" name="txtTipoRefEstadoMQ" condicion="SI CTA CONTABLE = HABILITADO DOC REF 2 && TIPO DOC = TK RETURN 'MQ'" value="12" />
                                </td>
                                <td>
                                    <input type="text" maxlength="15" name="txtNumSerieCajaReg" condicion="SI CTA CONTABLE = HABILITADO DOC REF 2 && TIPO DOC = TK " value="123456789012345" />
                                </td>
                                <td>
                                    <input type="date" name="txtFechaOperacion" condicion="SI CTA CONTABLE = HABILITADO DOC REF 2 && TIPO DOC = TK CONSIGNAR FECHA EMISION TICKET" />
                                </td>
                                <td>
                                    <input type="text" maxlength="5" name="txtTipoTasa" condicion="SI CTA CONTABLE CONFIGURADA TASA, IF =1 ver TG28 IF=2 ver TG29" value="12345" />
                                </td>
                                <td>
                                    <input type="number" min="0" name="txtTasaDetraccionPercepcion" condicion="SI CTA CONTABLE CONFIGURADA TASA, IF =1 ver TG28 IF=2 ver TG29" value="123456789012.34" />
                                </td>
                                <td>
                                    <input type="number" min="0" name="txtImporteBaseDetraccionPercepcionDolares" condicion="SI CTA CONTABLE TIENE CONFIGURADA TASA = IMPORTE TOTAL DEL DOC" value="123456789012.34" />
                                </td>
                                <td>
                                    <input type="number" min="0" name="txtImporteBaseDetraccionPercepcionSoles" condicion="SI CTA CONTABLE TIENE CONFIGURADA TASA = IMPORTE TOTAL DEL DOC" value="123456789012.34" />
                                </td>
                                <td>
                                    <input type="text" maxlength="1" name="txtTipoCambioF" condicion="especificar solo si tipo conversion =F se permite M compra y V venta" value="1" />
                                </td>
                                <td>
                                    <input type="number" min="0" name="txtImporteIGVSinDerechoCredFis" condicion="ESPECIFICAR SOLO PARA COMPROBANTES DE COMPRAS CON IGV SIN DERECHO DE CREDITO FISCAL SE DETALLE SOLO EN LA CUENTA 42xxx" value="123456789012.34" />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div id="txtRegistros" class="col-12 text-right">
                </div>
            </div>
        </div>
        <div class="card-footer"></div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/repconcarventas.js"></script>
</asp:Content>
