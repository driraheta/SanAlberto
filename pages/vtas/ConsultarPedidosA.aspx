<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="ConsultarPedidosA.aspx.cs" Inherits="SanAlberto.pages.vtas.ConsultarPedidosA" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <link href="/assets/global/css/gijgo/modular/css/datepicker.css" rel="stylesheet" />
     <link href="/assets/global/plugins/select2/select2.min.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Pedidos de Ventas (Historico)
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
    <div id="listcl" class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-md-2">
                    <label for="op" class="mr-sm-2">Desde:</label>
                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="fini" data-val="true" />&nbsp;
                </div>
                <div class="col-md-2">
                    <label for="op" class="mr-sm-2">Hasta:</label>
                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="ffin" data-val="true" />&nbsp;
                </div>
                <div class="col-md-2">
                    <label for="op" class="mr-sm-2">Nro_Guia:</label>
                    <select id="guia" class="form-control-sm  select2" data-val="true"></select>&nbsp;

                </div>
                <div class="col-md-2">
                    <label for="op" class="mr-sm-2">Cliente:</label>
                    <select class="form-control form-control-sm select2" id="cli" data-val="true"></select>
                </div>
                <div class="col-md-4">
                    <button class="btn btn-primary" title="Buscar" id="bbus" style="margin-top: 23px;"><i class="fa fa-search"></i></button>
                    &nbsp;
                    <button class="btn btn-success" id="bexp" onclick="exportar();" style="margin-top: 23px;">
                        <i class="fa fa-file-excel"></i>&nbsp;Excel</button>
                    &nbsp;
                    <a class="btn btn-warning" href="/pages/vtas/Ventas.aspx" id="bback" style="margin-top: 23px;"><i class="fa fa-sign-out-alt"></i>Regresar</a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="stickyTable col-12 col-lg-12 table-responsive table-responsive-sm" style="width: inherit; height: 40vh; overflow-x: auto;">
                    <table class="table table-sm table-hover" id="infoven">
                        <thead>
                            <tr>
                                <th class="thp">#SERIE</th>
                                <th class="thp">NUMERO</th>
                                <th class="thp">FECHA DE EMISION</th>
                                <th class="thp">RUC</th>
                                <th class="thp">RAZON SOCIAL</th>
                                <th class="thp">VENDEDOR</th>
                                <th class="thp">CONDICIÓN DE PAGO</th>
                                <th class="thp">ESTADO</th>
                                <th class="thp">PRODUCTO</th>
                                <th class="thp">UND/MEDIDA</th>
                                <th class="thp">CANTIDAD</th>
                                <th class="thp">PRECIO VENTA</th>
                                <th class="thp">TOTAL</th>
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
    <script src="/assets/global/js/utils.js"></script>
    <script src="/assets/global/pages/js/ConsPedAnt.js"></script>

</asp:Content>
