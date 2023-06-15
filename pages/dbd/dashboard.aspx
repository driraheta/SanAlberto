<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="dashboard.aspx.cs" Inherits="SanAlberto.pages.dashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-5">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <%--<h1 class="h1 mb-0 text-gray-800">Dashboard</h1>--%>
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Dashboard</h5>
            </div>
        </div>
        <div class="col-7 d-flex align-content-center align-items-center">
            <p id="hoy" class=" text-gray-900 pb-0 mb-0"></p>
        </div>
    </div>
    <!-- indicadores -->
    <div class="row">
        <!-- Pedidos generados -->
        <div class="col-xl-3 col-md-6 col-12 mb-2">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1"># PEDIDOS GENERADOS</div>
                            <div class="row">
                                <div class="col-auto mr-1" id="indicador01">
                                    <div class="h3 font-weight-bolder text-gray-800 text-uppercase mb-1">
                                        100
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <i id="indicadorIcon01" class="fas fa-exclamation-circle fa-2x" style="color: red"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Importe de Ventas -->
        <div class="col-xl-3 col-md-6 col-12 mb-2">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Importe Ventas DEL DIA</div>
                            <div class="row">
                                <div class="col-auto mr-1" id="indicador02">
                                    <div class="h3 font-weight-bolder text-gray-800 text-uppercase mb-1">
                                        <p id="ventasxdia"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <i id="indicadorIcon02" class="fas fa-exclamation-circle fa-2x" style="color: red"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Pendiente por pagar acumulado-->
        <div class="col-xl-3 col-md-6 col-12 mb-2">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Cobranza del dia</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="emes"></div>
                            <div class="row">
                                <div class="col-auto mr-1" id="indicador03">
                                    <div class="h3 font-weight-bolder text-gray-800 text-uppercase mb-1">
                                        <p id="cobranzaxdia"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <i id="indicadorIcon03" class="fas fa-exclamation-circle fa-2x" style="color: red"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Pendiente por cobrar-->
        <div class="col-xl-3 col-md-6 col-12 mb-2">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">PEDIDOS INGRESADOS</div>
                            <div class="row">
                                <div class="col-auto mr-1" id="indicador04">
                                    <div class="h3 font-weight-bolder text-gray-800 text-uppercase mb-1">
                                        <p id="pedidoxdia"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <i id="indicadorIcon04" class="fas fa-exclamation-circle fa-2x" style="color: red"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br />
    <div class="row">
        <!-- INICIO productos mas vendidos -->
        <div class="col-md-6">
            <div class="card shadow">
                <!-- Card Header - Dropdown -->
                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Productos más vendidos (últimos 6 meses)</h6>
                </div>
                <div class="card-body">
                   <%-- <div class="row m-0">--%>
                        <div id="divChartTopVentas" class="col-12 p-0" style="z-index: 1">
                            <div class="chart-container" style="height: 320px">
                                 <canvas id="TopVentas" height="320" style="display: block; max-height:300px; width: 450px; height: 250px;" class="chartjs-render-monitor"></canvas>
                            </div>
                        </div>
                    <%--</div>--%>
                </div>
            </div>
        </div>
        <!-- FIN productos mas vendidos -->
        <div class="col-md-6">
            <div class="card show">
                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Venta Mensual por Operacion</h6>
                </div>
                <div class="card-body">
                    <div id="divChartVentasxMes" class="p-0" style="z-index: 1">
                            <div class="chart-container" style="height: 320px">
                                 <canvas id="VentasxMes" height="320" style="display: block; max-height:300px; width: 450px; height: 250px;" class="chartjs-render-monitor"></canvas>
                            </div>
                     </div>
                </div>
            </div>
        </div>
    </div>


     <!-- Inicio nueva fila -->
    <div class="row mt-1">
        <div class="col-md-6">
            <div class="card show">
                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Ventas vs Cobranza</h6>
                </div>
                <div class="card-body">
                    <div id="divChartVentasvsCobro" class="p-0" style="z-index: 1">
                            <div class="chart-container" style="height: 320px">
                                 <canvas id="VentasvsCobro" height="320" style="display: block; max-height:300px; width: 450px; height: 250px;" class="chartjs-render-monitor"></canvas>
                            </div>
                     </div>
                </div>
            </div>
        </div>
    </div>








    <!-- Charts -->
    <div class="row">
        <!-- chart productos mas vendidos -->
        <div class="col-md-8">
            <div class="card shadow ">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-1 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Productos más vendidos (últimos 6 meses)</h6>
                </div>
                <!-- Card Body -->
                <div class="card-body py-1" style="height:328px;">
                    <div class="row m-0">
                        <div id="divMyChart02" class="col-6 border-right p-0" style="z-index: 1">
                            <div class="chart-container" style="height: 320px">
<%--                                <div class="chartjs-size-monitor">
                                    <div class="chartjs-size-monitor-expand">
                                        <div class=""></div>
                                    </div>
                                    <div class="chartjs-size-monitor-shrink">
                                        <div class=""></div>
                                    </div>
                                </div>--%>
                                <%--<canvas id="myChart02" height="320" style="display: block; max-height:300px; width: 450px; height: 250px;" class="chartjs-render-monitor"></canvas>--%>
                                <canvas id="TopVentasChart" height="320" style="display: block; max-height:300px; width: 450px; height: 250px;" class="chartjs-render-monitor"></canvas>
                            </div>
                        </div>
                        <div class="col-6 p-0" style="z-index: 2">
                            <div class="row">
                                <div class="col-12 mb-1">
                                    <select id="chart02SelectEspecies" style="width: 100%">
                                    </select>
                                </div>
                                <div class="col-12 stickyTable table-responsive" style="max-height: 150px; font-size: 10px;">
                                    <table id="chart02Table" class="table table-sm table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th style="width: 4px;">%</th>
                                                <th>Producto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style="background-color: #e83e8c; color: black;">44.6</td>
                                                <td>Manzana roja</td>
                                            </tr>
                                            <tr>
                                                <td style="background-color: #EFCA08; color: black;">30.8</td>
                                                <td>Manzana Real 13 plastico caja</td>
                                            </tr>
                                            <tr>
                                                <td style="background-color: #43AA8B; color: black;">20.0</td>
                                                <td>Manzana Golden buena 13 plastico</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>cualquiera</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>cualquiera</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>cualquiera</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- chart pedido de ventas -->
        <div class="col-md-4">
            <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-1 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Pedidos de Venta (últimos 15 días)</h6>
                </div>
                <!-- Card Body -->
                <div class="card-body py-1">
                    <div class="chart-bar">
                        <div class="chartjs-size-monitor">
                            <div class="chartjs-size-monitor-expand">
                                <div class=""></div>
                            </div>
                            <div class="chartjs-size-monitor-shrink">
                                <div class=""></div>
                            </div>
                        </div>
                        <canvas id="myChart01" width="450" height="320" style="display: block; width: 450px; height: 320px;" class="chartjs-render-monitor"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br />
    <div class="row">
        <!-- Area Chart D-NONE -->
        <div class="col-6 d-none">
            <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Gráfica</h6>
                    <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink" hidden="hidden">
                            <div class="dropdown-header">Dropdown Header:</div>
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                    <div class="chart-area">
                        <canvas id="myAreaChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br />
    <div class="row">
        <!-- chart03 -->
        <div class="col-md-6">
            <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-1 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Ranking producto venta mensual</h6>
                    <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <div class="dropdown-header">Dropdown Header:</div>
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <!-- Card Body -->
                <div class="card-body py-1">
                    <div class="row">
                        <div class="col-12 text-center">
                            <select id="chart03SelectMeses">
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 chart-pie text-center" style="max-height: 300px">
                            <canvas id="myChart03" style="max-width: 500px"></canvas>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- chart04 -->
        <div class="col-md-6">
            <div class="card shadow ">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-1 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Venta ( <i class="fa fa-square mr-1" id="iconChart04Facturado"></i>Facturado vs <i class="fa fa-square mr-1" id="iconChart04Pendiente"></i>Pendiente )</h6>
                    <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <div class="dropdown-header">Dropdown Header:</div>
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <!-- Card Body -->
                <div class="card-body py-1">
                    <div class="row">
                        <div class="col-12 text-center">
                            <select id="chart04SelectMeses">
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 chart-pie text-center" style="max-height: 300px">
                            <canvas id="myChart04" style="max-width: 500px"></canvas>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <br />
    <div class="row">
        <!-- chart06 -->
        <div class="col-md-6 mb-2">
            <div class="card shadow ">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-1 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Facturas pendientes por pagar (últ. 7 dias)</h6>
                    <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <div class="dropdown-header">Dropdown Header:</div>
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <!-- Card Body -->
                <div class="card-body py-1">
                    <div class="chart-pie text-center" style="max-height: 300px">
                        <canvas id="myChart06" style="max-width: 500px"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <!-- chart05 -->
        <div class="col-md-6 mb-2">
            <div class="card shadow ">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-1 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Lista de productos (Alto Stock)</h6>
                    <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <div class="dropdown-header">Dropdown Header:</div>
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <!-- Card Body -->
                <div class="card-body py-1">
                    <div class="text-center">
                        <div id="myChart05" style="width: 100%">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


















    <div class="row">
        <!-- Chart VentasXMes -->
        <div class="col-md-6 mb-2">
            <div class="card shadow ">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-1 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Ventas por mes</h6>
                    <div class="dropdown no-arrow">
                        
                    </div>
                </div>
                <!-- Card Body -->
                <div class="card-body py-1">
                    <div class="row">
                        <div class="col-12 text-center">
                            <div>
                                <select id="selectEspecies">
                                </select>

                            
                                <select id="selectVentasXMes">
                                    <option value="1">Enero</option>
                                    <option value="2">Febrero</option>
                                    <option value="3">Marzo</option>
                                    <option value="4">Abril</option>
                                    <option value="5">Mayo</option>
                                    <option value="6">Junio</option>
                                    <option value="7">Julio</option>
                                    <option value="8">Agosto</option>
                                    <option value="9">Setiembre</option>
                                    <option value="10">Octubre</option>
                                    <option value="11">Noviembre</option>
                                    <option value="12">Diciembre</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 chart-pie text-center" style="max-height: 500px">                                
                            <canvas id="chartVentasXMes"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>





















</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <!-- Page level plugins -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous"></script>
    <script src="/assets/global/plugins/chart.js/chart.min.js"></script>
 <%--   <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.4.0/dist/chartjs-plugin-datalabels.min.js
"></script>--%>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <!-- Page level custom scripts -->
    <script src="/assets/global/pages/js/dashboard2.js"></script>

    <%-- <script src="/demo/chart-area-demo.js"></script> --%>
    <%-- <script src="/demo/chart-pie-demo.js"></script> --%>
</asp:Content>
