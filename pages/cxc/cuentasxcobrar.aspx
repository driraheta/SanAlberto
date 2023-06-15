<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="cuentasxcobrar.aspx.cs" Inherits="SanAlberto.pages.cxc.cuentasxcobrar" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder"><i class="fa fa-edit"></i>&nbsp;Módulo de Cuentas por Cobrar
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->

    <div id="lista" class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col">
                                    <label for="filtroFechaInicio" class="mr-sm-2">Desde</label>
                                </div>
                                <div class="col">
                                    <label for="filtroFechaInicio" class="mr-sm-2">Hasta</label>
                                </div>
                                <div class="d-flex flex-row" style="margin-left: 7px;">
                                    <input type="text" class="datepicker" id="bfecd" data-val="true" readonly="readonly" />
                                    <input type="text" class="datepicker" id="bfeca" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <label for="proveedorValor" class="mr-sm-2">Cliente</label>
                            <input type="text" id="clienteValor" placeholder="Nom Cliente" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="ocValor" class="mr-sm-2">Contacto</label>
                            <input type="text" id="contactoValor" placeholder="Contacto" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="pedidoValor" class="mr-sm-2">RUC</label>
                            <input type="text" id="rucValor" placeholder="Nro de RUC" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="serieValor" class="mr-sm-2">Serie</label>
                            <input type="text" id="serieValor" placeholder="Serie" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="numeroValor" class="mr-sm-2">Numero</label>
                            <input type="text" id="numeroValor" placeholder="Numero" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="pedidoValor" class="mr-sm-2">Estado</label>
                            <select class="form-control rounded" id="seltpo">
                                <option value="">Todos</option>
                                <option value="1">Pendientes</option>
                                <option value="2">Canceladas</option>
                                <option value="3">Facturadas</option>
                            </select>
                        </div>
                        <div class="col-md-1">
                            <div class="row">
                                <label for="" class="mr-sm-1">&nbsp</label>
                            </div>
                            <div class="row">
                                <button id="bus" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2"><i class="fa fa-search"></i></button>
                                <button id="restablecerFiltros" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm float-right"><i class="fas fa-undo"></i></button>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 float-left float-right">
                    <div class="row">
                        <label for="" class="mr-sm-2">&nbsp</label>
                    </div>
                    <div class="row">
                        <div class="col-12 float-right">
                            <button class="btn btn-primary btn-sm  ml-2 mb-2" id="regpago"><i class="fa fa-plus-circle"></i>&nbsp;Reg. Pago</button>
                            <button class="btn btn-success mb-2 btn-sm " id="repexcel" onclick="exportar();"><i class="fa fa-file-excel"></i>&nbsp;Excel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 table-responsive">
                    <div id="cxppendientes"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 table-responsive table-responsive-sm ">
                    <table class="table table-sm table-hover" id="info">
                        <thead>
                            <tr>
                                <th style="display: none;">ID</th>
                                <th class="thp">Serie</th>
                                <th class="thp">Número</th>
                                <th class="thp">Forma de Pago</th>
                                <th class="thp">Fecha Emisión</th>
                                <th class="thp">Cliente</th>
                                <th class="thp">Contacto</th>
                                <th class="thp">Días Pendientes de Pago</th>
                                <th class="thp">Importe</th>
                                <th class="thp">Estado</th>
                                <th class="thp">Moneda</th>
                                <th style="width: 1%;">
                                    <input type="checkbox" id="selectall"></th>
                                <th style="display: none;">IDcliente</th>
                                <th style="display: none;">IDVendedor</th>
                                <th style="display: none;">Monto Pagado</th>
                                <th class="thp">Pagos</th>
                            </tr>
                        </thead>
                        <tbody id="tinfobody"></tbody>
                    </table>
                </div>
            </div>

        </div>
        <div class="card-footer"></div>
    </div>


    <div id="lista2" style="display: none;">
        <div class="row">
            <div class="col-12">
                <div class="form-inline float-left" id="busqueda2">
                    <label for="op" class="mr-sm-2">Filtrar por:</label>
                    <select class="form-control form-control-sm mb-2 mr-sm-2" id="opc2">
                        <option value="0">Todos</option>
                        <option value="1">Nombre</option>
                        <option value="2">RUC</option>
                        <option value="3">Fecha Emisión</option>
                    </select>
                    <input type="text" readonly="readonly" id="bfecd2" class="form-control form-control-sm mb-2 mr-sm-2" style="display: none" />
                    <input type="text" readonly="readonly" id="bfeca2" class="form-control form-control-sm mb-2 mr-sm-2" style="display: none" />
                    <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Buscar" id="bval2" style="display: none">
                    <button class="btn btn-primary btn-sm mb-2 mr-sm-2" id="bus2"><i class="fa fa-search"></i></button>
                </div>
                <div class="form-inline float-right">
                    <button class="btn btn-primary mb-2 btn-sm mr-sm-2 " id="regpago2"><i class="fa fa-plus-circle"></i>&nbsp;Registrar Pago</button>
                    <button class="btn btn-primary mb-2 btn-sm " id="repexcel2" onclick="exportar2();"><i class="fa fa-plus-circle"></i>&nbsp;Reporte Excel</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 table-responsive">
                <div id="cxppendientes2"></div>
            </div>
        </div>
        <div class="row">
            <div class="row">
                <div class="col-12 table-responsive table-responsive-sm ">
                    <table class="table table-sm table-hover" id="info2">
                        <thead>
                            <tr>
                                <th style="display: none;">ID</th>
                                <th class="thp">Serie</th>
                                <th class="thp">Número</th>
                                <th class="thp">Fecha Emisión</th>
                                <th class="thp">Proveedor</th>
                                <th class="thp">Días Pendientes de Pago</th>
                                <th class="thp">Importe</th>
                                <th class="thp">Estado</th>
                                <th style="width: 1%;">
                                    <input type="checkbox" id="selectall2"></th>
                                <th style="display: none;">IDProveedor</th>
                                <th style="display: none;">IDRegistro</th>
                                <th style="display: none;">Monto Pagado</th>
                            </tr>
                        </thead>
                        <tbody id="tinfobody2"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- modal registro de pagos -->
    <div class="modal fade" role="dialog" id="mregpagos">
        <div class="modal-dialog modal-dialog-centered modal-xxl">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titp">Registrar Pago</h4>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <input type="hidden" id="idcli" value="0" />
                    <div class="row">
                        <div class="col-md-4 col-12">
                            <label>Linea de Credito</label>
                            <input type="text" class="form-control" id="lincred" data-val="true" readonly="readonly" />
                        </div>
                        <div class="col-md-4 col-12">
                            <label>Monto Usado</label>
                            <input type="text" class="form-control" id="lincredus" data-val="true" readonly="readonly" />
                        </div>
                        <div class="col-md-4 col-12 form-group">
                            <label>Contacto</label>
                            <select class="form-control" id="contac" data-val="true" disabled="disabled">
                            </select>
                            <span id="eexp" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-4 col-12 form-group">
                            <label>Fecha de Pago</label>
                            <input type="text" readonly="readonly" id="fecp" class="form-control" />
                        </div>
                        <div class="col-md-4 col-12 form-group">
                            <label>Serie Almacen</label>
                            <input type="text" readonly="readonly" id="seriealm" class="form-control" />
                        </div>

                        <div class="col-md-4 col-12 form-group">
                            <label>Recibo Pago</label>
                            <!-- eliminar numero y cambiar 9 -->
                            <input type="text" id="codp" class="form-control" maxlength="12" />
                        </div>
                    </div>
                    <div class="row">
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-hover" id="datosregpag">
                                <thead>
                                    <tr>
                                        <td style="display: none">Id</td>
                                        <td class="text-center">Serie</td>
                                        <td class="text-center">Número</td>
                                        <td class="text-center">Fecha Emisión</td>
                                        <td class="text-center">Cliente</td>
                                        <td class="text-center">Días Pendientes</td>
                                        <td class="text-center">Monto</td>
                                        <td class="text-center">Monto a Pagar</td>
                                        <td class="text-center">Moneda</td>
                                        <td class="text-center">Seleccionar Metodo de Pago</td>
                                        <td class="text-center">Banco</td>
                                        <td class="text-center">No. Operación/Contado</td>
                                        <td class="text-center">Observaciones</td>
                                        <td style="display: none">mp</td>
                                    </tr>
                                </thead>
                                <tbody id="tinforpbody"></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-9 col-12 text-center form-group">
                            <div class="row">
                                <div class="col-md-3 text-right"><label>Deuda Total(S/)</label></div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="totdeuda" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 text-right"><label>Total a Pagar</label></div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="totapagar" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 text-right"><label>Deuda Pendiente</label></div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="deudapendiente" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-primary btn-sm" style="min-width: 120px" id="agrp"><i class="fa fa-save"></i>&nbsp; Guardar</button>
                        <button class="btn btn-warning btn-sm" style="min-width: 120px" id="canp"><i class="fa fa-sign-out-alt"></i>&nbsp; Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal registro de pagos -->
    <div class="modal fade" role="dialog" id="mregpagos2">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titp2">Registrar Pago</h4>

                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <input type="hidden" id="idprov" value="0" />
                    <div class="row">
                        <div class="col-md-6 col-12 form-group">
                            <label>Proveedor</label>
                            <input type="text" readonly="readonly" id="nmprov" class="form-control" />
                            <span id="eexp2" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 col-6 form-group">
                            <label>Fecha de Pago</label>
                            <input type="text" readonly="readonly" id="fecp2" class="form-control" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 col-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-hover" id="datosregpag2">
                                <thead>
                                    <tr>
                                        <td style="display: none">Id</td>
                                        <td class="text-center">Serie</td>
                                        <td class="text-center">Número</td>
                                        <td class="text-center">Fecha Emisión</td>
                                        <td class="text-center">Días Pendientes</td>
                                        <td class="text-center">Monto</td>
                                        <td class="text-center">Monto a Pagar</td>
                                        <td class="text-center">Seleccionar Metodo de Pago</td>
                                        <td class="text-center">Banco</td>
                                        <td class="text-center">No. Operación/Contado</td>
                                        <td class="text-center">Observaciones</td>
                                        <td style="display: none">mp</td>
                                        <td style="display: none">Idreg</td>
                                    </tr>
                                </thead>
                                <tbody id="tinforpbody2"></tbody>
                            </table>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-10 text-center">
                            <div class="row">
                                <div class="col-md-3 text-right">
                                    <label>Deuda Total(S/)</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="totdeuda2" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 text-right">
                                    <label>Total a Pagar</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="totapagar2" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <button type="button" style="width: 180px" class="btn btn-primary my-3" id="agrp2"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button><br />
                            <button type="button" style="width: 180px" class="btn btn-danger" id="canp2"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal Pagos -->
    <div class="modal fade" id="mpagos">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Pagos Realizados</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 col-md-12 table-responsive">
                            <div id="infopag"></div>
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
    <script src="/assets/global/js/numeros.js"></script>
    <script src="/assets/global/pages/js/cuentasxcobrar.js"></script>
</asp:Content>
