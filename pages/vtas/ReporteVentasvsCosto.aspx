<%@ Page Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="ReporteVentasvsCosto.aspx.cs" Inherits="SanAlberto.pages.cxc.ReporteVentasvsCosto" %>

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
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder"><i class="fa fa-edit"></i>&nbsp;Reporte Ventas vs Costo
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- Page Heading End -->

    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-9">
                    <div class="row">
                        <div class="col-1">
                            <label class="form-control-plaintext">Desde</label>
                        </div>
                        <div class="col-3">
                            <input type="text" class="datepicker" id="bfecd" data-val="true" readonly="readonly" />
                        </div>
                        <div class="col-1">
                            <label class="form-control-plaintext">Hasta</label>
                        </div>
                        <div class="col-3">
                            <input type="text" class="datepicker" id="bfeca" data-val="true" readonly="readonly" />
                        </div>
                        <div class="col-3">
                            <%--<button id="btnFiltro" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2"><i class="fa fa-search"></i></button>--%>
                            <button id="btnExportarExcel" title="Exportar Excel" class="btn btn-success mb-2 btn-sm  mr-sm-2"><i class="fas fa-file-excel"></i></button>
                           <%-- <button id="exportarexc" title="Exportar Excel" class="btn btn-success btn-sm mb-5 mr-sm-3"><i class="fas fa-file-excel">&nbsp;Exportar Excel</i></button>--%>
                            <%--<button id="btnPDF" title="Exportar PDF" class="btn btn-danger mb-2 btn-sm  mr-sm-2"><i class="fas fa-file-pdf"></i></button>--%>
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
    <script src="/assets/global/pages/js/reporteventvscost.js"></script>
</asp:Content>
