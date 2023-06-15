<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="CierreInventario.aspx.cs" Inherits="SanAlberto.pages.ginv.CierreInventario" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder"><i class="fa fa-boxes"></i>&nbsp;Cierre de Inventario
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- Page Heading End -->

    <!-- Page Listado -->
    <div class="card">
        <div class="card-header">
            <div class="row">
                <h4>Generar Cierre</h4>
            </div>
            <div class="row">
                <div class="col-md-1">
                    <label class="form-control-plaintext">Desde</label>
                </div>
                <div class="col-md-2 col-12 form-group">
                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="dec" data-val="true" />
                    <span id="edec" class="invalid-feedback"></span>
                </div>
                <div class="col-md-1">
                    <label class="form-control-plaintext">Hasta</label>
                </div>
                <div class="col-md-2 col-12 form-group">
                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="hasc" data-val="true" />
                    <span id="ehasc" class="invalid-feedback"></span>
                </div>
                <div class="col-md-2 col-12">
                    <button class="btn btn-primary btn-sm" id="genc">Generar</button>
                    <button class="btn btn-secondary btn-sm" id="canc">Cancelar</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <h4>Busqueda</h4>
            </div>
            <div class="row">
                <div class="col-md-5 col-12">
                    <div class="row">
                        <div class="col-md-2">
                            <label class="form-control-plaintext">Desde</label>
                        </div>
                        <div class="col-md-3 col-12 form-group">
                            <input type="text" class="form-control form-control-sm" readonly="readonly" id="fdesde" data-val="true" />
                            <span id="efdesde" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2">
                            <label class="form-control-plaintext">Hasta</label>
                        </div>
                        <div class="col-md-3 col-12 form-group">
                            <input type="text" class="form-control form-control-sm" readonly="readonly" id="fhasta" data-val="true" />
                            <span id="efhasta" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 col-12">
                            <button id="bsearch" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2"><i class="fa fa-search"></i></button>
                        </div>

                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-12 table-responsive">
                    <div id="cierreinv"></div>
                </div>
            </div>

        </div>
    </div>
    <!-- Page Listado End -->

    <!--Cierre Inventario -->
    <div class="modal fade" id="cierreModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header bg-gradient-info text-white">
                    <h5 class="modal-title text-center col-11 font-weight-bold">Cierre de Inventario</h5>
                    <button class="close text-white" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    <div class="stickyTable col-12 table-responsive table-responsive-sm" style="height: 60vh;">
                        <table class="table table-sm table-hover" id="tcierreinv">
                            <thead>
                                <tr>
                                    <th style="display: none">ID</th>
                                    <th>Código</th>
                                    <th>Producto/Servicio</th>
                                    <th>Unidad</th>
                                    <th>Stock Inicial</th>
                                    <th>Nro. Documento</th>
                                    <th>Fecha Emisión (Documento)</th>
                                    <th>Ingresos</th>
                                    <th>Salidas</th>
                                    <th>Ajuste (+/-)</th>
                                    <th>Stock Final</th>
                                    <th>Fecha de Registro (ajuste)</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="tcierreinvbody"></tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success rounded" type="button" onclick="exportar();"><i class="fa fa-file-excel"></i>&nbsp;Excel</button>
                    <button class="btn btn-danger rounded" type="button" onclick="GENPDF();"><i class="fa fa-file-pdf"></i>&nbsp;PDF</button>
                    <button class="btn btn-secondary rounded" type="button" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!--Consulta Cierre Inventario -->
    <div class="modal fade" id="CcierreModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xxl" role="document">
            <div class="modal-content">
                <div class="modal-header bg-gradient-info text-white">
                    <h5 class="modal-title text-center col-11 font-weight-bold">Cierre de Inventario</h5>
                    <button class="close text-white" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    <div class="stickyTable col-12 table-responsive table-responsive-sm" style="height: 60vh;">
                        <table class="table table-sm table-hover" id="tCcierreinv">
                            <thead>
                                <tr>
                                    <th style="display: none">ID</th>
                                    <th>Código</th>
                                    <th>Producto/Servicio</th>
                                    <th>Unidad</th>
                                    <th>Stock Inicial</th>
                                    <th>Nro. Documento</th>
                                    <th>Fecha Emisión (Documento)</th>
                                    <th>Ingresos</th>
                                    <th>Salidas</th>
                                    <th>Ajuste (+/-)</th>
                                    <th>Stock Final</th>
                                    <th>Fecha de Registro (ajuste)</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="tCcierreinvbody"></tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary rounded" type="button" onclick="regenerar();"><i class="fa fa-redo"></i>&nbsp;Regenerar</button>
                    <button class="btn btn-success rounded" type="button" onclick="exportar();"><i class="fa fa-file-excel"></i>&nbsp;Excel</button>
                    <button class="btn btn-danger rounded" type="button" onclick="GENPDF();"><i class="fa fa-file-pdf"></i>&nbsp;PDF</button>
                    <button class="btn btn-secondary rounded" type="button" data-dismiss="modal"><i class="fa fa-close"></i>&nbsp;Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!--Ajuste Inventario -->
    <div class="modal fade" id="cierreinvModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header bg-gradient-info text-white">
                    <h5 class="modal-title text-center col-11 font-weight-bold">Ajuste de Inventario (+/-)</h5>
                    <button class="close text-white" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <label><b>Almacén de origen</b></label>
                            <hr class="m-0" />
                        </div>
                        <div class="col-md-4 col-12">
                            <label>Origen</label>
                            <select class="form-control rounded form-control-sm" id="cinvalm" disabled="disabled">
                            </select>
                        </div>
                        <div class="col-md-8 col-12">
                            <label>Producto</label>
                            <select class="form-control rounded form-control-sm" id="cinvprod" disabled="disabled">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 col-12">
                            <label>Fecha de registro</label>
                            <input type="text" class="form-control" id="cinvfec" data-val="true" readonly="readonly" />
                        </div>
                        <div class="col-md-4 col-12">
                            <label>Tipo de Operación</label>
                            <select class="form-control rounded form-control-sm" id="cinvtpooper">
                                <option value="1">Aumentar Stock </option>
                                <option value="2">Disminuir Stock </option>
                                <%--<option value="3">Trasladar productos</option>--%>
                            </select>
                        </div>
                        <div class="col-md-5 col-12">
                            <label>Nro. Importación/Compras</label>
                            <select class="form-control rounded form-control-sm" id="cinvocpac">
                            </select>
                        </div>
                        <div class="col-md-3 form-group oculta">
                            <label>Filtrar</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="filtroProductoA" />
                                <div class=" input-group-append">
                                    <button class="btn btn-sm btn-primary" style="border-bottom-right-radius: 4px; border-top-right-radius: 4px"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-12 oculta">
                            <label>Producto</label>
                            <select class="form-control rounded form-control-sm" id="cinvprodocpac">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 col-12">
                            <label>Stock Actual (Caja)</label>
                            <input type="text" class="form-control rounded form-control-sm" id="cinvstockact" readonly="readonly" />
                        </div>
                        <div class="col-md-4 col-12">
                            <label>Ingresar la cantidad a ajustar:</label>
                            <input type="text" class="form-control rounded form-control-sm numeros" id="cinvcantajus" />
                        </div>
                        <div class="col-md-4 col-12">
                            <label>Stock Final</label>
                            <input type="text" class="form-control rounded form-control-sm" id="cinvstockfin" readonly="readonly" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <label>Observaciones (Motivo de Ajuste)</label>
                            <input type="text" class="form-control rounded form-control-sm" id="cinvobs" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary rounded" type="button" id="canajuste">Cerrar</button>
                    <button class="btn btn-primary rounded" type="button" onclick="GuardarAjuste();">Guardar</button>
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
    <input type="hidden" id="id" value="0" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/js/cat/almacen.js"></script>
    <script src="/assets/global/pages/js/cierreinv.js"></script>
</asp:Content>

