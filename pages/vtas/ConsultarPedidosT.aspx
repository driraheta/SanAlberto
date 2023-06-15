<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="ConsultarPedidosT.aspx.cs" Inherits="SanAlberto.pages.vtas.ConsultarPedidosT" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">Consulta de Pedidos por Transportista
                    <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- Page Heading End -->
    <div id="listcl" class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-md-2">
                    <label for="op" class="mr-sm-2">Fecha de Pedidos Desde:</label>
                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="bfec" data-val="true" />&nbsp;
               
                </div>
                <div class="col-md-2">
                    <label for="op" class="mr-sm-2">Fecha de Pedidos Hasta:</label>
                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="bfech" data-val="true" />&nbsp;
               
                </div>
                <div class="col-md-2">
                    <label for="op" class="mr-sm-2">Empresa:</label>
                    <select id="tranp" class="form-control form-control-sm select2" data-val="true"></select>&nbsp;
               
                </div>
                <div class="col-md-2">
                    <label for="op" class="mr-sm-2">Viaje:</label>
                    <select class="form-control form-control-sm select2" id="viaje" data-val="true"></select>
                </div>
                <div class="col-md-4">
                    <button class="btn btn-primary" title="Buscar" id="bus" style="margin-top: 23px;"><i class="fa fa-search"></i></button>
                    &nbsp;
                    <button class="btn btn-success" title="Exportar a Excel" id="exp" onclick="exportar();" style="margin-top: 23px;"><i class="fa fa-file-excel"></i></button>
                    &nbsp;
                    <button class="btn btn-danger" title="Exportar a PDF" id="pdf" onclick="genpdf();" style="margin-top: 23px;"><i class="fa fa-file-pdf"></i></button>
                    &nbsp;
                    <button class="btn btn-primary" id="regvent" style="margin-top: 23px;">&nbsp;Ir a Registro de Ventas</button>
                </div>
                
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="stickyTable col-12 col-lg-12 table-responsive table-responsive-sm" style="height: 80vh;">
                    <table class="table table-sm table-hover" id="infoven">
                        <thead>
                            <tr>
                                <th class="thp">#Viaje</th>
                                <th class="thp">Empresa</th>
                                <th class="thp">Marca</th>
                                <th class="thp">Placa</th>
                                <th class="thp">Conductor</th>
                                <th class="thp">Producto</th>
                                <th class="thp">Unidad Medida</th>
                                <th class="thp">Cantidad</th>
                                <th class="thp" style="display: none;">Categoría</th>
                                <th class="thp" style="display: none;">Código</th>
                                <th class="thp" style="display: none;">Fecha Emisión</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-12 table-responsive">
                    <div id="PedTrans"></div>
                </div>
            </div>
        </div>
        <div class="card-footer"></div>
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
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/ConsPedTrans.js"></script>
</asp:Content>
