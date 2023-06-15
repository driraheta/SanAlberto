<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="AnularVent.aspx.cs" Inherits="SanAlberto.pages.vtas.AnularVent" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <link href="/assets/global/plugins/jquery-file-upload/blueimp-gallery/blueimp-gallery.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/css/Style.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Anulación de pedidos de venta
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
      <!-- modal anular pedidos -->
        <div class="modal fade" id="modalAnulados">
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Pedido por anular</h4>
                        <button type="button" id="closeMP" class="close"  data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 form-group">
                                <label><strong>Información del pedido:</strong> </label>
                                <div id="infoPed" class="row"> </div>
                            </div>
                            <div class="col-md-8 col-12 form-group">

                                <label><strong>Motivo:</strong></label>
                                <input type="text" class="form-control" id="motivo" data-val="true" />
                            </div>
                        </div>
                    </div>
                    <!-- Modal footer-->
                    <div class="modal-footer">
                        <div class="row pos text-right">
                            <div class="col-md-12 my-2 float-right">
                                <button type="button" style="width: 180px" class="btn btn-success" id="guav"><i class="fa fa-times-circle"></i>&nbsp;Anular</button>
                                &nbsp;
                                <button type="button" style="width: 180px" class="btn btn-primary" id="canv"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <div id="lista">
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-3">
                                <label for="op" class="mr-sm-2">Nombre</label>
                                <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Nombre" id="nombreVal">
                            </div>
                            <div class="col-md-2">
                                <label for="op" class="mr-sm-2">Serie</label>
                                <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Serie" id="serieVal">
                            </div>
                            <div class="col-md-2">
                                <label for="op" class="mr-sm-2">Contacto</label>
                                <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Contacto" id="contactoVal">
                            </div>
                            <div class="col-md-2">
                                <label for="op" class="mr-sm-2">RUC</label>
                                <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="RUC" id="rucVal">
                            </div>
                            <div class="col-md-2">
                                <label for="op" class="mr-sm-2">F Emision Desde</label>
                                <input type="text" readonly="readonly" id="bfecd" class="form-control form-control-sm mb-2 mr-sm-2" />
                            </div>
                            <div class="col-md-2">
                                <label for="op" class="mr-sm-2">F Emision Hasta</label>
                                <input type="text" readonly="readonly" id="bfeca" class="form-control form-control-sm mb-2 mr-sm-2" />
                            </div>
                             <div class="col-md-2">
                            <label for="filtroEstado" class="mr-sm-2">Estado</label>
                            <select id="filtroEstado" class="form-control form-control-sm mb-2 mr-sm-2 select2">
                                <option value="">Seleccione...</option>
                                <option value="1">Pendiente</option>
                                <option value="2">Cancelado</option>
                                <option value="3">Anulado</option>
                            </select>
                        </div>
                            <div class="col-md-1">
                                <button class="btn btn-primary btn-sm mb-2 mr-sm-2 float-left" id="bus" style="margin-top: 28px;"><i class="fa fa-search"></i></button>
                                <button id="restablecer" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm float-left" style="margin-top: 28px;"><i class="fas fa-undo"></i></button>
                             </div>
                            
                        </div>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-12">
                        <div class="form-inline float-left">
                            <button class="btn btn-primary mb-2 btn-sm mr-2 " id="anulvent"><i class="fa fa-plus-circle"></i>&nbsp;Anular Documento</button>
                            <button class="btn btn-success mb-2 btn-sm " id="repexcel"><i class="fa fa-file-excel"></i>&nbsp;Excel</button>
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
                    <div style="max-height: 65vh !important;" class="col-12 table-responsive table-responsive-sm stickyTable">
                        <table class="table table-sm table-hover" id="info">
                            <thead>
                                <tr>
                                    <th style="display: none;">ID</th>
                                    <th class="thp">Serie</th>
                                    <th class="thp">Número</th>
                                    <th class="thp">Fecha Emisión</th>
                                    <th class="thp">Cliente</th>
                                    <th class="thp">Monto</th>
                                    <th class="thp">#Factura</th>
                                    <th class="thp">Estado</th>
                                    <th style="width: 1%;">
                                        <input type="checkbox" id="selectall"></th>
                                </tr>
                            </thead>
                            <tbody id="tinfobody"></tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card-footer"></div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/AnularVent.js"></script>
</asp:Content>

