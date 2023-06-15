<%@ Page Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="ReporteVentasPorProducto.aspx.cs" Inherits="SanAlberto.pages.vtas.ReporteVentasPorProducto" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <link href="/assets/global/css/Style.css" rel="stylesheet" type="text/css" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Reporte de Ventas Por Producto
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
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group row">
                                <label for="clientesSelect" class="col-md-2 col-form-label">Especies:</label>
                                <div class="col-md-10">
                                    <select class="form-control" id="especiesSelect">
                                        <option value="0" selected>Todos</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group row">
                                <label for="clientesSelect" class="col-md-2 col-form-label">Producto:</label>
                                <div class="col-md-10">
                                    <select class="form-control select2" id="productosSelect">
                                        <option value="0" selected>Todos</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group row">
                                <label for="clientesSelect" class="col-md-2 col-form-label">Serie:</label>
                                <div class="col-md-10">
                                    <input type="text" id="serieVal" placeholder="..." class="form-control form-control-sm mb-2 mr-sm-2" />
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group row">
                                <label for="clientesSelect" class="col-md-2 col-form-label">Numero:</label>
                                <div class="col-md-10">
                                    <input type="text" id="numeroVal" placeholder="..." class="form-control form-control-sm mb-2 mr-sm-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 align-self-center">
                    <button class="form-control btn bg-gradient-primary text-white mb-1 mb-md-2 pr-1 pl-1" type="button" id="btnFiltro">
                        <span class="mr-1 fa fa-search"></span>Filtrar</button>
                    <button class="form-control btn btn-success text-white pr-1 pl-1" type="button" id="btnExportarExcel">
                        <span class="mr-1 fa fa-file-excel"></span>Exportar</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <div id="tblRepVtas" class="col-12 table-responsive stickyTable" style="height: 50vh; width: 100%">
                        <table class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>SERIE</th>
                                    <th>NUMERO</th>
                                    <th>PRODUCTO</th>
                                    <th>FECHA DE EMISION</th>
                                    <th>UND/MEDIDA</th>
                                    <th>CANTIDAD</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="txtRegistros" class="col-12 text-right">
                    Error en la carga de datos
               
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
    <script src="/assets/global/pages/js/repvtasxproducto.js"></script>
</asp:Content>
