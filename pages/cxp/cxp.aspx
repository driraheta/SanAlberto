<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="cxp.aspx.cs" Inherits="SanAlberto.pages.cats.prods" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">


    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">Cuentas por Pagar
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- Page Heading End -->
    <input type="hidden" id="id" value="0" />

    <div id="lista" class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-10 col-m-10">
                    <div class="row">
                        <div class="col-4">
                            <div class="row">
                                <div class="col">
                                    <label for="filtroFechaInicio" class="mr-sm-2">Desde</label>
                                </div>
                                <div class="col">
                                    <label for="filtroFechaInicio" class="mr-sm-2">Hasta</label>
                                </div>
                                <div class="d-flex flex-row">
                                    <input type="text" class="datepicker" id="feci" data-val="true" readonly="readonly" />
                                    <input type="text" class="datepicker" id="fecf" data-val="true" readonly="readonly" />
                                </div>

                            </div>
                        </div>
                        <div class="col">
                            <label for="RucProv" class="mr-sm-2">RUC</label>
                            <input type="text" id="RucProv" placeholder="RUC" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col-2">
                            <label for="proveedorValor" class="mr-sm-2">Proveedor</label>
                            <input type="text" id="NomProv" placeholder="Nom Proveedor" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="selDiasPago" class="mr-sm-2">Dias Pago</label>
                            <select class="form-control rounded" id="selDiasPago">
                            </select>
                        </div>
                        <div class="col">
                            <label for="filtroEstado" class="mr-sm-2">Modalidad</label>
                            <select class="form-control rounded" id="selmodalidad">
                                <option value="">Todas</option>
                                <option value="Compra local">Compra Local</option>
                                <option value="1">Importación Directa</option>
                                <option value="2">Importación Indirecta</option>
                                <option value="3">Exportación Indirecta</option>
                                <option value="4">Exportación Directa</option>
                            </select>
                        </div>
                        <div class="col">
                            <label for="filtroEstado" class="mr-sm-2">Estado</label>
                            <select class="form-control rounded" id="seltpo">
                                <option value="0">Todos</option>
                                <option value="Pendiente">Pendientes</option>
                                <option value="Pagada">Canceladas</option>
                            </select>
                        </div>
                        <div class="col">
                            <div class="row">
                                <label for="" class="mr-sm-1">&nbsp</label>
                            </div>
                            <div class="row">
                                <button id="filtrarBtn" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2" onclick="cargaCXP(this);"><i class="fa fa-search"></i></button>
                                <button id="restablecerFiltros" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm float-right" onclick="restablecerFiltros();"><i class="fas fa-undo"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2 col-sm-2">
                    <div class="row">
                        <label for="" class="mr-sm-2">&nbsp</label>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <%--<button class="btn btn-success btn-sm  ml-2 mb-2 float-right" id="nue"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>--%>
                            <button class="btn btn-success mb-2 btn-sm mr-sm-2 float-right" id="regpago"><i class="fa fa-plus-circle"></i>&nbsp;Registrar Pago</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-body">
            <div id="report" style="display: none">
                <%--<div class="row">
                    <div class="col-12">
                        <button class="btn btn-success mb-2 btn-sm mr-sm-2 float-right" id="regpago"><i class="fa fa-plus-circle"></i>&nbsp;Registrar Pago</button>
                    </div>
                </div>--%>

                <div class="row">
                    <div class="stickyTable col-12 table-responsive table-responsive-sm ">
                        <table class="table table-sm table-hover" id="info">
                            <thead>
                                <tr>
                                    <th style="display: none;">ID</th>
                                    <th>Modalidad</th>
                                    <th>RUC</th>
                                    <th>RAZON SOCIAL</th>
                                    <th>Serie</th>
                                    <th>Numero</th>
                                    <th>Condiciones Pago</th>
                                    <th>Días de Pago</th>
                                    <th>Fecha Emisión</th>
                                    <th>Moneda</th>
                                    <th>Importe</th>
                                    <th>Estado</th>
                                    <th style="width: 1%;">Acción</th>
                                    <th></th>
                                    <th>Detalle Pago</th>
                                    <th style="display: none;">Razón Social</th>
                                </tr>
                            </thead>
                            <tbody id="tinfobody"></tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="modal fade" id="pagoModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl " role="document">
            <div class="modal-content">
                <div class="modal-header bg-gradient-success text-white">
                    <h5 class="modal-title"><span class="fa fa-minus-circle"></span>&nbsp;Aplicar pago</h5>
                    <button class="close text-white" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    <h4>Datos del documento</h4>
                    <hr />
                    <div class="row">
                        <div class="col-sm-6">
                            <label><span class="fa fa-cart-plus"></span>Serie:</label>
                            <input type="text" class="form-control rounded-pill form-control-sm" id="txtSerie" />
                        </div>
                        <div class="col-sm-6">
                            <label><span class="fa fa-cart-plus"></span>Moneda:</label>
                            <input class="form-control rounded-pill form-control-sm" id="txtMoneda" disabled />
                        </div>
                        <div class="col-sm-6">
                            <label><span class="fa fa-file"></span>Nro. Factura</label>
                            <input type="text" class="form-control rounded-pill form-control-sm" id="txtNroF" />
                        </div>
                        <div class="col-sm-6">
                            <label><span class="fa fa-file"></span>RUC Proveedor</label>
                            <input type="text" class="form-control rounded-pill form-control-sm" id="txtRucProv" disabled />
                        </div>
                        <div class="col-sm-6">
                            <label><span class="fa fa-journal-whills"></span>Fecha Emisión</label>
                            <input type="text" class="form-control rounded-pill form-control-sm" id="txtFEmi" disabled />
                        </div>
                        <div class="col-sm-6">
                            <label><span class="fa fa-journal-whills"></span>Monto C/IGV</label>
                            <input type="text" class="form-control rounded-pill form-control-sm" id="txtIVG" disabled />
                            <input type="hidden" style="display: block" class="form-control rounded-pill form-control-sm" id="txttpo" disabled />
                        </div>
                    </div>
                    <h4>Datos del pago</h4>
                    <hr />
                    <div class="row">
                        <div class="col-4">
                            <label><span class="fa fa-journal-whills"></span>Banco</label>
                            <select class="form-control rounded-pill form-control-sm" id="selBanco">
                            </select>
                        </div>
                        <%--<div class="col-4">
                            <label><span class="fa fa-journal-whills"></span>Moneda</label>
                            <select class="form-control rounded-pill form-control-sm" id="selMoneda">
                            </select>
                        </div>--%>
                        <div class="col-4">
                            <label><span class="fa fa-journal-whills"></span>Tipo de cambio</label>
                            <input type="number" class="form-control rounded-pill form-control-sm" id="selTpoCam" />

                            <%--<select class="form-control rounded-pill form-control-sm" id="selTpoCam">
                            </select>--%>
                        </div>
                        <div class="col-6">
                            <label><span class="fa fa-journal-whills"></span>Monto pago</label>
                            <input type="number" class="form-control rounded-pill form-control-sm" id="txtmonto" />
                        </div>
                        <div class="col-6">
                            <label><span class="fa fa-journal-whills"></span>Nro. Operación</label>
                            <input type="text" class="form-control rounded-pill form-control-sm" id="txtoper" />
                        </div>
                        <div class="col-4">
                            <label><span class="fa fa-journal-whills"></span>Fecha Pago</label>
                            <input type="date" class="form-control rounded-pill form-control-sm" id="txtfecpago" />
                        </div>
                        <div class="col-8">
                            <label><span class="fa fa-journal-whills"></span>Observaciones</label>
                            <textarea class="form-control" rows="2" id="txtobs"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cerrar</button>
                    <button class="btn btn-primary" type="button" data-dismiss="modal" onclick="crearAbono();">Guardar abono</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal facturas -->
    <div class="modal fade" id="mfacturas">
        <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Datos de Facturacion</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 table-responsive">
                            <div id="infofac"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal registro de pagos (SE MUESTRA AL DAR CLIC EN REG)-->
    <div class="modal fade" id="regpagoModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xxl " role="document">
            <div class="modal-content">
                <div class="modal-header bg-gradient-success text-white">
                    <h5 class="modal-title"><span class="fa fa-minus-circle"></span>&nbsp;Aplicar pago</h5>
                    <button class="close text-white" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    <div class="row" style="display: none;">
                        <div class="col-6">
                            <label><span class="fa fa-file"></span>RUC Proveedor</label>
                            <input type="text" class="form-control rounded-pill form-control-sm" id="txtRucProvf" disabled />
                        </div>

                    </div>
                    <h4>Datos del pago</h4>
                    <hr />
                    <div class="row">
                        <div class="col-md-3 col-12 form-group">
                            <label>Fecha de Pago</label>
                            <input type="text" readonly="readonly" id="fecp" class="form-control" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-hover" id="datosregpag">
                                <thead>
                                    <tr>
                                        <td style="display: none">Id</td>
                                        <td class="text-center">Serie</td>
                                        <td class="text-center">Número</td>
                                        <td class="text-center">RUC</td>
                                        <td class="text-center">Fecha Emisión</td>
                                        <td class="text-center">Razón Social</td>
                                        <td class="text-center">Monto</td>
                                        <td class="text-center">Monto a Pagar</td>
                                        <td class="text-center">Banco</td>
                                        <td class="text-center">Modalidad de Pago</td>
                                        <td class="text-center">Moneda</td>
                                        <td class="text-center">Tipo de Cambio</td>
                                        <td class="text-center">Valor Cambio</td>
                                        <td class="text-center">No. Operación</td>
                                        <td class="text-center">Observaciones</td>
                                        <td style="display: none">IdFac</td>
                                        <td style="display: none">tipo</td>
                                    </tr>
                                </thead>
                                <tbody id="tinforpbody"></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8 d-md-block">
                            <div id="tbodydatoshistpag"></div>
                        </div>
                        <div class="col-md-4 text-center">
                            <div class="row">
                                <div class="col-md-5 text-right">
                                    <label>Deuda Total(S/)</label>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" class="form-control" id="totdeuda" data-val="true" readonly="readonly" style="display: none;" />
                                    <input type="text" class="form-control" id="totdeudaFormated" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-5 text-right">
                                    <label>Total a Pagar</label>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" class="form-control" id="totapagar" data-val="true" readonly="readonly" style="display: none;" />
                                    <input type="text" class="form-control" id="totapagarFormated" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="agrp"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" data-dismiss="modal"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal detalle pagos -->
    <div class="modal fade" id="mdetpagos">
        <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Detalle de Pagos</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 table-responsive">
                            <div id="infodetpago"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/cxp.js"></script>
</asp:Content>
