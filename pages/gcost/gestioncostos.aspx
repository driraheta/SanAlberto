<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="gestioncostos.aspx.cs" Inherits="SanAlberto.pages.gcost.gestioncostos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <link href="https://code.jquery.com/ui/1.12.1/themes/start/jquery-ui.css" rel="stylesheet">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder"><i class="fa fa-dollar-sign"></i>&nbsp;Control General de Costos
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- Page Heading End -->
    <div class="card">
        <div class="card-header">
            <div class="row" id="filtro">
                <div class="col-12 form-inline">
                    <label for="email" class="mr-sm-2">Desde:</label>
                    <input type="text" class="form-control mb-2 mr-sm-2 form-control-sm" readonly="readonly" id="desde" data-val="true">
                    <label for="pwd" class="mr-sm-2">Hasta:</label>
                    <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" readonly="readonly" id="hasta" data-val="true">
                </div>
                <div class="col-12 form-inline">
                    <label for="import" class="mr-sm-2">Importacion:</label>
                    <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" id="import">
                    <label for="ruc" class="mr-sm-2">RUC:</label>
                    <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" id="ruc">
                    <label for="rsocial" class="mr-sm-2">Razon Social:</label>
                    <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" id="rsocial">
                    <button type="submit" title="Buscar" class="btn btn-primary mb-2 btn-sm" id="con"><i class="fa fa-search"></i></button>
                    <button type="button" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm" id="can"><i class="fa fa-undo"></i></button>

                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col table-responsive table-responsive-sm" style="overflow: auto; max-height: 200px">
                    <table class="table table-hover" id="registros">
                        <thead class="table-bordered">
                            <tr>
                                <th rowspan="2" style="white-space: nowrap; font-size: 90%; vertical-align: middle"># O/C - Compra Local</th>
                                <th rowspan="2" style="white-space: nowrap; font-size: 90%; vertical-align: middle" class="d-none"># Importación</th>
                                <th rowspan="2" style="white-space: nowrap; font-size: 90%; vertical-align: middle"># Contenedor</th>
                                <th colspan="2" style="white-space: nowrap; font-size: 90%">Costos de Imp.</th>
                                <th colspan="2" style="white-space: nowrap; font-size: 90%">Costos de Transporte.</th>
                                <th colspan="2" style="white-space: nowrap; font-size: 90%">Cost. Reparto Pto. Entreg.</th>
                                <th colspan="2" style="white-space: nowrap; font-size: 90%;">Costos de Almacenaje.</th>
                            </tr>
                            <tr>
                                <th style="font-size: 90%">Estimado</th>
                                <th style="font-size: 90%">Real</th>
                                <th style="font-size: 90%">Estimado</th>
                                <th style="font-size: 90%">Real</th>
                                <th style="font-size: 90%">Estimado</th>
                                <th style="font-size: 90%">Real</th>
                                <th style="font-size: 90%">Estimado</th>
                                <th style="font-size: 90%">Real</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col table-responsive table-responsive-sm" style="overflow: auto; max-height: 250px">
                    <table class="table table-hover" id="detalle" style="font-size: 90%">
                        <thead>
                            <tr>
                                <th class="text-center bg-primary py-1 text-white" style="white-space: nowrap; vertical-align: middle">Gestión de Costos</th>
                                <th colspan="3" class="text-center bg-primary py-1 text-white" style="white-space: nowrap; vertical-align: middle">Estimado</th>
                                <th colspan="3" class="text-center bg-primary py-1 text-white" style="white-space: nowrap; vertical-align: middle">Real</th>
                                <th class="text-center bg-primary py-1 text-white" style="white-space: nowrap; vertical-align: middle"></th>
                                <th class="text-center bg-primary py-1 text-white" style="white-space: nowrap; vertical-align: middle"></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
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
                    <%--<h4 class="modal-title">Datos de Facturacion</h4>--%>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="stickyTable col-12 table-responsive table-responsive-sm ">
                            <table class="table table-bordered table-sm table-striped table-hover" id="infoFC">
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Serie</th>
                                        <th>Numero</th>
                                        <th>Fecha</th>
                                        <th>Importe</th>
                                    </tr>
                                </thead>
                                <tbody id="tinfoFCbody"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/gestionc.js"></script>
</asp:Content>

