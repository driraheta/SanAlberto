<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="SanAlberto.pages._default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <style>
        #boxTitleOrders {
            height: 80px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 id="bienvenidoTxt" class=" mb-0 text-gray-900 text-uppercase font-weight-bolder"></h5>
            </div>
        </div>
        <div class="col-12 col-sm-2 d-flex justify-content-sm-end justify-content-center align-content-center align-items-center">
            <p id="hoy" class=" text-gray-900 pb-0 mb-0"></p>
        </div>
    </div>
    <!-- Page Heading End -->

    <!-- Indicador -->
    <!--<div class="row">
        <div class="col-xl-3 col-md-4 col-sm-8 col-xs-12 mb-2">
            <div class="card border-left-primary shadow h-100 py-2" id="boxTitleOrders">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1"># PEDIDOS GENERADOS DEL DIA:</div>
                        </div>
                        <div class="col-auto mr-1" id="indicador01">
                            <div class="h6 font-weight-bolder text-primary text-uppercase mb-1">
                                NONE
                               
                            </div>
                        </div>
                        <div class="col-auto">
                            <i id="indicadorIcon01" class="fas fa-exclamation-circle" style="color: red; font-size: 20px;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>-->
    <!-- Indicador End -->

    <!-- Earnings (Monthly) Indicador Chart01 -->
    <div class="card">
        <div class="card-header">
            <div class="row">
                <h6 class = " mb-0 text-gray-900 text-uppercase font-weight-bolder ">Listado de precios</h6>
            </div>
            <br />
            <div class="row">
                <div class="col-10 col-m-10">
                    <div class="row">
                        <div class="col-4" style="display: none;">
                            <div class="row">
                                <div class="col">
                                    <label for="filtroFechaInicio" class="mr-sm-2">Desde</label>
                                </div>
                                <div class="col">
                                    <label for="filtroFechaInicio" class="mr-sm-2">Hasta</label>
                                </div>
                                <div class="d-flex flex-row">
                                    <input type="text" class="datepicker" id="filtroFechaInicio" data-val="true" readonly="readonly" />
                                    <input type="text" class="datepicker" id="filtroFechaFin" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <label for="rpCodigo" class="mr-sm-2">Codigo</label>
                            <input type="text" id="rpCodigo" placeholder="Codigo" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="rpProducto" class="mr-sm-2">Descripcion</label>
                            <input type="text" id="rpProducto" placeholder="Nombre Prod" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <div class="row">
                                <label for="" class="mr-sm-1">&nbsp</label>
                            </div>
                            <div class="row">
                                <button id="filtrarBtn" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2"><i class="fa fa-search"></i></button>
                                <button id="restablecerFiltros" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm float-right"><i class="fas fa-undo"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-body">
            <div class="col-xl-12 col-md-12 col-12 mb-2">
                <div class="spacer"></div>
                <div id="tblProductos" class="col-12" style="width: 100%">
                    <table class="shadow table table-hover table-sm table-responsive">
                        <thead>
                            <tr <%--class="table-primary"--%>>
                                <th style="width: 10%">Código</th>
                                <th style="width: 45%">Producto</th>
                                <th style="width: 15%">Unidad Medida</th>
                                <th style="width: 10%">Precio de Venta</th>
                                <th style="width: 10%">Stock Actual</th>
                            </tr>
                        </thead>
                        <tbody>
                            <%-- <tr>
                                    <td>001</td>
                                    <td>NO CARGO</td>
                                    <td>1.8</td>
                                    <td>500</td>
                                </tr>--%>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="txtRegistros" class="col-12 text-right">
                Error en la carga de datos               
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <!-- Page level plugins -->
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous"></script>--%>
    <script src="/assets/global/plugins/chart.js/Chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.4.0/dist/chartjs-plugin-datalabels.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <!-- Page level custom scripts -->
    <script src="/assets/global/pages/js/home.js"></script>
    <!--script src="/demo/chart-area-demo.js"></script> -->
    <!--script src="/demo/chart-pie-demo.js"></script> -->
</asp:Content>
