<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="EmitirFac.aspx.cs" Inherits="SanAlberto.pages.vtas.EmitirFac" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <link href="/assets/global/plugins/jquery-file-upload/blueimp-gallery/blueimp-gallery.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/jquery-file-upload/css/jquery.fileupload.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/jquery-file-upload/css/jquery.fileupload-ui.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/css/Style.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder"><i class="fa fa-edit"></i>&nbsp;Documentos Electrónicos
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
    <div id="modalDocumentosVentas" class="card">
        <div class="card-header">

            <div class="col-12" id="busqueda">
                <div class="row">
                    <div class="col-10 col-m-10">
                        <div class="row">
                            <div class="col-4">
                                <div class="row">
                                    <div class="col">
                                        <label for="feci" class="mr-sm-2">Desde</label>
                                    </div>
                                    <div class="col">
                                        <label for="fecf" class="mr-sm-2">Hasta</label>
                                    </div>
                                    <div class="d-flex flex-row">
                                        <input type="text" class="datepicker" id="feci" data-val="true" readonly="readonly" />
                                        <input type="text" class="datepicker" id="fecf" data-val="true" readonly="readonly" />
                                    </div>

                                </div>
                            </div>
                            <div class="col">
                                <label for="RucCli" class="mr-sm-2">RUC</label>
                                <input type="text" id="RucCli" placeholder="RUC" class="form-control form-control-sm mb-2 mr-sm-2" />
                            </div>
                            <div class="col-2">
                                <label for="NomCli" class="mr-sm-2">Cliente</label>
                                <input type="text" id="NomCli" placeholder="Nom Cliente" class="form-control form-control-sm mb-2 mr-sm-2" />
                            </div>
                            <div class="col-2">
                                <label for="NomCon" class="mr-sm-2">Contacto</label>
                                <input type="text" id="NomCon" placeholder="Nom Contacto" class="form-control form-control-sm mb-2 mr-sm-2" />
                            </div>
                            <div class="col">
                                <label for="selestado" class="mr-sm-2">Estado</label>
                                <select class="form-control rounded" id="selestado">
                                    <option value="0">Todos</option>
                                    <option value="1">Pendiente</option>
                                    <option value="2">Cancelado</option>
                                    <option value="3">Anulado</option>
                                    <option value="4">Aceptado SUNAT</option>
                                    <option value="5">Fact Pendiente SUNAT</option>

                                </select>
                            </div>
                            <div class="col">
                                <div class="row">
                                    <label for="" class="mr-sm-1">&nbsp</label>
                                </div>
                                <div class="row">
                                    <button id="filtrarBtn" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2" onclick="cargaVentas();"><i class="fa fa-search"></i></button>
                                    <button id="restablecerFiltros" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm float-right" onclick="restablecerFiltros();"><i class="fas fa-undo"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<%--                <div class="form-inline float-left">
                    <label for="op" class="mr-sm-2">Filtrar por:</label>
                    <select class="form-control form-control-sm mb-2 mr-sm-2" id="opc">
                        <option value="0">Todos</option>
                        <option value="1">Nombre/Razón Social</option>
                        <option value="2">Contacto</option>
                        <option value="3">RUC</option>
                        <option value="4">Fecha Emisión</option>
                    </select>
                    <input type="text" readonly="readonly" id="bfecd" class="form-control form-control-sm mb-2 mr-sm-2" style="display: none" />
                    <input type="text" readonly="readonly" id="bfeca" class="form-control form-control-sm mb-2 mr-sm-2" style="display: none" />
                    <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Buscar" id="bval" style="display: none">
                    <button class="btn btn-primary btn-sm mb-2 mr-sm-2" id="bus"><i class="fa fa-search"></i></button>
                </div>--%>
                <div class="form-inline float-right">
                    <button class="btn btn-primary mb-2 btn-sm " id="btnEmitirDocElec"><i class="fa fa-plus-circle"></i>&nbsp;Generar Doc Electrónico</button>&nbsp;
                    <button class="btn btn-primary mb-2 btn-sm" id="btnEmitirFactura"><i class="fa fa-plus-circle"></i>&nbsp;Emitir Factura</button>&nbsp;
                    <button class="btn btn-primary mb-2 btn-sm" id="btnEmitirBoleta"><i class="fa fa-plus-circle"></i>&nbsp;Emitir Boleta</button>&nbsp;
                    <button class="btn btn-primary mb-2 btn-sm" id="btnEmitirNC"><i class="fa fa-plus-circle"></i>&nbsp;Emitir Nota de Crédito</button>&nbsp;
                    <button class="btn btn-primary mb-2 btn-sm" id="btnEmitirND"><i class="fa fa-plus-circle"></i>&nbsp;Emitir Nota de Débito</button>&nbsp;
                    <button class="btn btn-primary mb-2 btn-sm" style="display: none"><i class="fa fa-plus-circle"></i>&nbsp;Emitir Guia de Remisión</button>





                    <button class="btn btn-success w-20" id="repexcel" onclick="ExportarExcel();"><i class="mr-2 fa fa-file-excel"></i></button>&nbsp;
                    <button class="btn btn-danger w-20" id="pdfdetview" onclick="genpdfs();"><i class="mr-2 fa fa-file-pdf"></i></button>&nbsp;


                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row" id="">
                <div class="stickyTableP col-12 table-responsive table-responsive-sm ">
                    <table class="table table-sm table-hover" id="info">
                        <thead>
                            <tr>
                                <th style="display: none;">ID</th>
                                <th class="thp">Serie</th>
                                <th class="thp">Número</th>
                                <th style="display: none;">Condiciones Pago</th>
                                <th class="thp">Fecha Emisión</th>
                                <th class="thp">Condicion de Pago</th>
                                <th class="thp">RUC</th>
                                <th class="thp">Cliente</th>
                                <th class="thp">Importe</th>
                                <th class="thp">Moneda</th>
                                <th class="thp">Fecha de Venc.</th>
                                <th class="thp">Estado</th>
                                <th style="width: 1%;">
                                    <input type="checkbox" disabled id="selectall"></th>
                                <th class="thp">PDF</th>
                                <th style="display: none;">IDcliente</th>
                                <th style="display: none;">subtotal</th>
                                <th style="display: none;">igv</th>

                            </tr>
                        </thead>
                        <tbody id="tinfobody"></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="card-footer"></div>
    </div>

    <!--Modal Emisión de documentos electronicos -->
    <div id="modalEmisionDocumentoElectronicos" class="card" style="display: none">
        <div class="card-header">
            <h6 class="card-title"><i class="fa fa-shopping-bag"></i>&nbsp;Emisión de Documento Electrónico</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <input type="text" class="form-control" id="txtgratuita" style="display: none">
                <div class="col-md-6">
                    <h6>DATOS DEL DOCUMENTO ELECTRONICO</h6>
                    <div class="form-group">
                        <label><i class="fa fa-globe"></i>&nbsp;Tipo de Comprobante</label>
                        <select id="txtTipoComprobante" class="form-control">
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-barcode"></i>&nbsp;Motivo</label>
                        <select class="form-control" id="txtSunatTransaction">
                            <option value="0">Venta directa</option>
                            <option value="1">Anulación de la operación</option>
                            <option value="2">Anulación por error en el RUC</option>
                            <option value="3">Corrección por error en la descripción</option>
                            <option value="4">Descuento global</option>
                            <option value="5">Descuento por item</option>
                            <option value="6">Devolución total</option>
                            <option value="7">Devolución por item</option>
                            <option value="8">Bonificación</option>
                            <option value="9">Disminución en el valor</option>
                            <option value="10">Otros Conceptos</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-barcode"></i>&nbsp;Serie</label>
                        <input type="text" class="form-control" id="txtSerie" readonly="readonly">
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-money-bill"></i>&nbsp;Moneda</label>
                        <select id="txtMoneda" data-val="true" class="form-control totales">
                            <option value="1">SOLES</option>
                            <option value="2">DOLARES</option>
                            <option value="3">EUROS</option>
                        </select>
                        <span id="etipoMoneda" class="invalid-feedback"></span>
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-barcode"></i>&nbsp;Orden Compra</label>
                        <input type="text" class="form-control numeros" id="txtOrdenCompra" maxlength="10" >
                        <span id="eOrdenCompra" class="invalid-feedback"></span>
                    </div>
                </div>
                <div class="col-md-6">
                    <h6>DATOS DEL CLIENTE</h6>
                    <div class="form-group">
                        <label><i class="fa fa-user"></i>&nbsp;Tipo Doc. Ident.</label>
                        <select id="txtClienteTipoDocumento" class="form-control" disabled>
                            <option value="6">RUC</option>
                            <option value="1">DNI</option>
                            <option value="-">VARIOS - VENTAS MENORES A S/.700.00 Y OTROS</option>
                            <option value="4">CARNET DE EXTRANJERÍA</option>
                            <option value="7">PASAPORTE</option>
                            <option value="A">CÉDULA DIPLOMÁTICA DE IDENTIDAD</option>
                            <option value="0">NO DOMICILIADO, SIN RUC (EXPORTACIÓN)</option>
                        </select>

                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-id-card"></i>&nbsp;Cliente</label>
                        <div class="input-group">
                            <select id="txtCliente" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-home"></i>&nbsp;Dirección</label>
                        <input type="text" id="txtClienteDireccion" class="form-control">
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-money-bill"></i>&nbsp;Condición de pago</label>
                        <select id="txtCondPago" data-val="true" class="form-control totales">
                            <option value="1">CONTADO</option>
                            <option value="4">CREDITO</option>
                        </select>
                        <span id="econdicionPago" class="invalid-feedback"></span>
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-money-bill"></i>&nbsp;Tipo de Bien</label>
                        <select id="txtTipoBien" data-val="true" class="form-control totales">
                            <option value="Producto">Producto</option>
                            <option value="Servicio">Servicio</option>
                        </select>
                        <span id="eTipoBien" class="invalid-feedback"></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <label class="mb-0 mt-3">LISTA DE PRODUCTOS</label>
                    <button class="btn btn-success btn-sm float-right mb-2" id="npro" value=""><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                </div>
                <div class="col-12 table-responsive table-responsive-sm">
                    <table class="table table-sm table-bordered table-hover table-striped" id="tblProductos">
                        <thead>
                            <tr>
                                <td style="display: none">Id</td>
                                <td class="text-center">Código</td>
                                <td class="text-center">Descripción</td>
                                <td class="text-center">Und/Medida</td>
                                <td class="text-center">Cantidad</td>
                                <td class="text-center">Precio</td>
                                <td class="text-center">Sub Total</td>
                                <td class="text-center">Igv</td>
                                <td class="text-center">Importe</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="col-12 border-bottom">
                    DETALLE DOCUMENTO
                </div>
                <div class="col-md-6 col-12 py-3">
                    <div class="row">
                        <div class="col-md-4 col-12 form-group">
                            <label><i class="fa fa-percentage"></i>&nbsp;Descuento Porcentaje</label>
                            <div class="input-group">
                                <input type="number" min="0" max="100" id="txtDescuentoGlobal" class="form-control totales">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 form-group">
                            <label><i class="fa fa-book"></i>&nbsp;Observaciones</label>
                            <textarea class="form-control" id="txtObservaciones"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 border-bottom pt-3">
                            <label class="font-weight-bold">Informacion de credito</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 pt-3">Monto pendiente de pago</div>
                        <div class="col-5 pt-3 text-right">
                            <label id="lblMontoCredito"></label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="table-responsive col-12 pt-2">
                            <table class="table table-sm table-bordered table-hover table-striped" id="tblCuotas">
                                <thead>
                                    <tr>
                                        <td class="text-center">Cuota</td>
                                        <td class="text-center">Fecha</td>
                                        <td class="text-center">Monto</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-12">
                    <div class="row">
                        <div class="col-12 border-bottom pt-3">
                            <label class="font-weight-bold">RESUMEN</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 border-bottom  pt-2">
                            <label>Sub Total</label>
                        </div>
                        <div class="col-6 border-bottom text-right  pt-2">
                            <label subtotal="0" id="lblSubTotal"></label>
                            <label id="gram"></label>
                        </div>
                        <div class="col-6 border-bottom  pt-2">
                            <label id="lblIGV" igv="18">IGV (18%)</label>
                        </div>
                        <div class="col-6 border-bottom text-right  pt-2">
                            <label id="lblIGVTotal"></label>
                            <label id="ivgm"></label>
                        </div>
                        <div class="col-6 border-bottom  pt-2">
                            <label><span class="text-danger">(-)</span> Descuento Total</label>
                        </div>
                        <div class="col-6 border-bottom text-right  pt-2">
                            <label descuentoglobal="0" id="lblDescuentoGlobal"></label>
                            <label id="desm"></label>
                        </div>
                        <div class="col-6 border-bottom  pt-2">
                            <label>Total</label>
                        </div>
                        <div class="col-6 border-bottom text-right  pt-2">
                            <label total="0" id="lblTotal"></label>
                            <label id="tot"></label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="card-footer">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-danger btn-sm float-right" style="min-width: 120px; display: none" id="datfac" value="">Datos de Facturas</button>
                &nbsp;
                <button class="btn btn-primary btn-sm" id="btnEmitirDocumentoElectronico" value=""><i class="fa fa-save"></i>&nbsp;GUARDAR DOCUMENTO ELECTRÓNICO</button>
                &nbsp;
                <button class="btn btn-primary btn-sm" id="act" style="display: none" value=""><i class="fa fa-save"></i>&nbsp;ACTUALIZAR</button>
                &nbsp;
                <button class="btn btn-warning btn-sm" id="btnCancelar" value=""><i class="fa fa-sign-out-alt"></i>&nbsp;CANCELAR</button>
            </div>
        </div>
    </div>
    <!-- modal datos de credito -->
    <div class="modal fade" id="modalDatosCredito">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Información del Crédito</h4>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="form-group row">
                        <div class="col-2">
                            <label style="margin: 8px 0 0 20px">Monto a Pagar</label>
                        </div>
                        <div class="col-6">
                            <input type="text" class="form-control form-control-sm text-right" style="margin: 4px 0 0 0" id="montoCredito" readonly />
                        </div>
                        <div class="col-3">
                            <button type="button" class="form-control btn btn-success" id="btnAgregaCuota">Agregar Cuota</button>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-12">
                            <label>Máximo podrá registrar hasta 60 cuotas</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 table-responsive">
                            <table class="table table-bordered" id="dtCuotas" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Modificar</th>
                                        <th>Eliminar</th>
                                        <th>Numero de Cuota</th>
                                        <th>Fecha Vencimiento</th>
                                        <th>Monto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" style="width: 180px" class="btn btn-primary float-right" id="agrc"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                    <button type="button" style="width: 180px" class="btn btn-warning float-right" id="canc"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                </div>
            </div>

        </div>
    </div>
    <!-- modal detalle de crédito -->
    <div class="modal fade" id="modalDetalleCredito">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titpd">Cuota de Factura</h4>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-5 form-group">
                            <label>Fecha</label>
                            <input type="text" class="form-control datepicker" id="fecCuota" data-val="true" readonly="readonly" />
                        </div>
                        <div class="col-md-5 form-group">
                            <label>Monto</label>
                            <input type="text" class="form-control text-right" id="valCuota" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-md-12 my-2 float-right">
                        <button type="button" style="width: 180px" class="btn btn-warning float-right" id="canpd"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        <button type="button" style="width: 180px" class="btn btn-primary float-right" id="agrpd"><i class="fa fa-plus-circle"></i>&nbsp;Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Modal Notas de Credito -->
    <div class="card" id="modalEmisionNotas" style="display: none">
        <div class="card-header">
            <h6 id="divtitlenc" class="card-title"><i class="fa fa-shopping-bag"></i>&nbsp;Emisión de Nota de Credito</h6>
            <h6 id="divtitlend" class="card-title"><i class="fa fa-shopping-bag"></i>&nbsp;Emisión de Nota de Debito</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <h6>DATOS DEL DOCUMENTO A MODIFICAR</h6>
                    <div class="form-group">
                        <label><i class="fa fa-globe"></i>&nbsp;Documento a Modificar</label>
                        <select id="docamodificar" class="form-control">
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-globe"></i>&nbsp;Tipo de Documento a Modificar</label>
                        <select id="tipodocmodif" class="form-control" disabled>
                        </select>
                    </div>
                    <div id="divtiponc" class="form-group">
                        <label><i class="fa fa-globe"></i>&nbsp;Tipo de Nota de Credito</label>
                        <select id="tiponotac" class="form-control">
                        </select>
                    </div>
                    <div id="divtipond" class="form-group">
                        <label><i class="fa fa-globe"></i>&nbsp;Tipo de Nota de Debito</label>
                        <select id="tiponotad" class="form-control">
                        </select>
                    </div>
                    <h6>DATOS DEL CLIENTE</h6>
                    <div class="form-group">
                        <label><i class="fa fa-user"></i>&nbsp;Tipo Doc. Ident.</label>
                        <select id="txtClienteTipoDocumentonc" class="form-control" disabled>
                            <option value="6">RUC</option>
                            <option value="1">DNI</option>
                            <option value="-">VARIOS - VENTAS MENORES A S/.700.00 Y OTROS</option>
                            <option value="4">CARNET DE EXTRANJERÍA</option>
                            <option value="7">PASAPORTE</option>
                            <option value="A">CÉDULA DIPLOMÁTICA DE IDENTIDAD</option>
                            <option value="0">NO DOMICILIADO, SIN RUC (EXPORTACIÓN)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-id-card"></i>&nbsp;Cliente</label>
                        <div class="input-group">
                            <select id="txtClientenc" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-home"></i>&nbsp;Dirección</label>
                        <input type="text" id="txtClienteDireccionnc" class="form-control">
                    </div>
                </div>
                <div class="col-md-6">
                    <h6>DATOS DEL DOCUMENTO ELECTRÓNICO</h6>
                    <div class="form-group">
                        <label><i class="fa fa-globe"></i>&nbsp;Tipo de Comprobante</label>
                        <select id="txtTipoComprobantenc" class="form-control">
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-barcode"></i>&nbsp;Motivo</label>
                        <select class="form-control" id="txtSunatTransactionnc">
                            <option value="0">Venta directa</option>
                            <option value="1">Anulación de la operación</option>
                            <option value="2">Anulación por error en el RUC</option>
                            <option value="3">Corrección por error en la descripción</option>
                            <option value="4">Descuento global</option>
                            <option value="5">Descuento por item</option>
                            <option value="6">Devolución total</option>
                            <option value="7">Devolución por item</option>
                            <option value="8">Bonificación</option>
                            <option value="9">Disminución en el valor</option>
                            <option value="10">Otros Conceptos</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-barcode"></i>&nbsp;Serie</label>
                        <input type="text" class="form-control" id="txtSeriec" readonly="readonly">
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-money-bill"></i>&nbsp;Moneda</label>
                        <select id="txtMonedanc" data-val="true" class="form-control totales">
                            <option value="1">SOLES</option>
                            <option value="2">DOLARES</option>
                            <option value="3">EUROS</option>
                        </select>
                        <span id="etipoMonedanc" class="invalid-feedback"></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    LISTA DE PRODUCTOS
                </div>
                <div class="col-12 table-responsive table-responsive-sm">
                    <table class="table table-sm table-bordered table-hover table-striped" id="tblProductosnc">
                        <thead>
                            <tr>
                                <td style="display: none">Id</td>
                                <td class="text-center">Código</td>
                                <td class="text-center">Descripción</td>
                                <td class="text-center">Und/Medida</td>
                                <td class="text-center">Cantidad</td>
                                <td class="text-center">Precio</td>
                                <td class="text-center">Sub Total</td>
                                <td class="text-center">Igv</td>
                                <td class="text-center">Importe</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="col-12 border-bottom">
                    DETALLE DOCUMENTO
                </div>
                <div class="col-md-6 col-12 py-3">
                    <div class="row">
                        <div class="col-md-4 col-12 form-group">
                            <label><i class="fa fa-percentage"></i>&nbsp;Descuento Porcentaje</label>
                            <div class="input-group">
                                <input type="number" min="0" max="100" id="txtDescuentoGlobalnc" class="form-control totales">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 form-group">
                            <label><i class="fa fa-book"></i>&nbsp;Observaciones</label>
                            <textarea class="form-control" id="txtObservacionesnc"></textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-12">
                    <div class="row">
                        <div class="col-12 border-bottom pt-3">
                            <label class="font-weight-bold">RESUMEN</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 border-bottom  pt-2">
                            <label>Sub Total</label>
                        </div>
                        <div class="col-6 border-bottom text-right  pt-2">
                            <label subtotal="0" id="lblSubTotalnc"></label>
                            <label id="gramnc"></label>
                        </div>
                        <div class="col-6 border-bottom  pt-2">
                            <label id="lblIGVnc" igv="18">IGV (18%)</label>
                        </div>
                        <div class="col-6 border-bottom text-right  pt-2">
                            <label id="lblIGVTotalnc"></label>
                            <label id="ivgmnc"></label>
                        </div>
                        <div class="col-6 border-bottom  pt-2">
                            <label><span class="text-danger">(-)</span> Descuento Total</label>
                        </div>
                        <div class="col-6 border-bottom text-right  pt-2">
                            <label descuentoglobal="0" id="lblDescuentoGlobalnc"></label>
                            <label id="desmnc"></label>
                        </div>
                        <div class="col-6 border-bottom  pt-2">
                            <label>Total</label>
                        </div>
                        <div class="col-6 border-bottom text-right  pt-2">
                            <label total="0" id="lblTotalnc"></label>
                            <label id="totnc"></label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="card-footer">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary btn-sm" id="btnEmitirDocumentoElectronicon" value=""><i class="fa fa-save"></i>&nbsp;GUARDAR DOCUMENTO ELECTRÓNICO</button>
                &nbsp;
                <button class="btn btn-warning btn-sm" id="btnCancelarn" value=""><i class="fa fa-sign-out-alt"></i>&nbsp;CANCELAR</button>
            </div>
        </div>
    </div>

    <!--Modal Notas de Credito End-->
    <div class="modal fade" id="provs">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="title_provider">Seleccione un Proveedor</h4>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-hover table-striped border" id="proveedores">
                                <thead>
                                    <tr>
                                        <td class="text-center">Razón Social</td>
                                        <td class="text-center w-25">RUC</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row pos">
                        <div class="col">
                            <div class="mt-2">
                                <button type="button" class="btn btn-danger" id="canpr" style="width: 175px"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal prods -->
    <div class="modal fade" role="dialog" id="prods">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content" style="width: 100%;">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titp">Agregar Producto</h4>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row align-self-center">
                        <input type="text" class="form-control text-right" style="display: none" data-val="true" id="idp" />
                        <div class="col-md-4 form-group text-right">
                            <label>Producto</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <select class="form-control select2" id="nomp"></select>
                            <span id="nompValidar" hidden class="text-danger" style="font-size: 70%; margin-top: .25rem">El campo es obligatorio</span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Unidad/Medida</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <select class="form-control" id="ump"></select>
                            <span id="eump" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Cantidad</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" id="cantp" />
                            <span id="ecantp" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 form-group text-right" style="padding-top: 20px; display: none;">
                            <label>IGV</label>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Precio</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" id="prep" />
                            <span id="eprep" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 form-group" style="display: none">
                            <select id="ivg" class="form-control"></select>
                            <span id="eivg" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Subtotal</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" readonly="readonly" id="subp" />
                        </div>
                        <div class="col-md-4 form-group text-right">
                            <label>Importe</label>
                        </div>
                        <div class="col-md-5 form-group text-right">
                            <input type="text" class="form-control text-right" readonly="readonly" id="impp" />
                        </div>
                    </div>


                    <div class="row pos">
                        <div class="col-md-12 my-3 align-content-center">
                            <button type="button" style="width: 180px" class="btn btn-danger" id="canp"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            <button type="button" style="width: 180px" class="btn btn-primary" id="agrp"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>









        <!--Modal reporte pdf-->
    <div class="modal fade" id="ModalReporte" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="Reportelabel" style="text-align: center;"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="ContentReporte">
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
    <!--Modal reporte pdf End-->

    <!--Modal reporte pdf-->
    <div class="modal fade" id="ModalDetParams" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" style="text-align: center;">Detalles del reporte</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div class="row">
                            <div class="col-6">
                                <label for="fi" class="mr-sm-2">Desde</label>
                            </div>

                            <div class="col-6">
                                <input type="text" class="datepicker" id="fi" data-val="true" />
                            </div>
                    </div>

                    <div class="row">
                            <div class="col-6">
                                <label for="ff" class="mr-sm-2">Hasta</label>
                            </div>

                            <div class="col-6">
                                <input type="text" class="datepicker" id="ff" data-val="true" />
                            </div>
                    </div>  

                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary rounded" id="btExportar">Exportar</button>
                    <button class="btn btn-secondary rounded" id="btCerrar">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!--Modal reporte pdf End-->









</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/js/monedas.js"></script>
    <script src="/assets/global/js/select2.js"></script>
    <script src="/assets/global/js/numeros.js"></script>
    <script src="/assets/global/pages/js/emifac.js"></script>
</asp:Content>
