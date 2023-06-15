<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="reporteimport.aspx.cs" Inherits="SanAlberto.pages.imps.reporteimport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <link href="/assets/global/plugins/jquery-file-upload/blueimp-gallery/blueimp-gallery.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/jquery-file-upload/css/jquery.fileupload.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/jquery-file-upload/css/jquery.fileupload-ui.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/css/Style.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">Reportes de Importaciones | Exportaciones
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- Page Heading End -->

    <!-- Listado -->
    <div id="lista" class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-10 col-m-10">
                    <div class="row">
                        <div class="col-4">
                            <div class="row">
                                <div class="col">
                                    <label for="filtroFechaInicio" class="mr-sm-2">Desde</label>
                                </div>
                                <div class="col">
                                    <label for="filtroFechaFin" class="mr-sm-2">Hasta</label>
                                </div>
                                <div class="d-flex flex-row">
                                    <input type="text" class="datepicker" id="bfecd" data-val="true" readonly="readonly" />
                                    <input type="text" class="datepicker" id="bfeca" data-val="true" readonly="readonly" />
                                </div>

                            </div>
                        </div>
                        <div class="col-2">
                            <label for="razValor" class="mr-sm-2">Raz Social/RUC</label>
                            <select class="form-control" id="raz">
                                <option value="0">--Seleccionar--</option>
                            </select>
                        </div>

                        <div class="col-2">
                            <label for="prod" class="mr-sm-2">Producto</label>
                            <select class="form-control" id="nomp">
                                <option value="0">--Seleccionar--</option>
                            </select>
                        </div>  
                        <div class="col">
                    <div class="row">
                        <label for="" class="mr-sm-2">&nbsp</label>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button id="filtrarBtn" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2"><i class="fa fa-search"></i></button>
                            <button id="btnExportarExcel" title="Exportar Excel" class="btn btn-success mb-2 btn-sm  mr-sm-2"><i class="fas fa-file-excel"></i></button>
                            <button id="btnPDF" title="Exportar PDF" class="btn btn-danger mb-2 btn-sm  mr-sm-2"><i class="fas fa-file-pdf"></i></button>                            
                        </div>
                    </div>
                </div>
                    </div>
                </div>                
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 table-responsive">
                    <div id="RepImport" class="col-12 table-responsive stickyTable" style="height: 50vh; width: 100%">
                        <table class="table table-hover table-sm" id="tblRepImport">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>#Importacion</th>
                                    <th>Tipo de Oper.</th>
                                    <th>ETD</th>
                                    <th>ETA</th>
                                    <th>Fecha Ing. Camara</th>
                                    <th>Proveedor</th>
                                    <th>Codigo</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Unidad Medida</th>
                                    <th>Moneda</th>
                                    <th>Precio</th>
                                    <th>Sub Total</th>
                                    <th>Importe</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="txtRegistros" class="col-12 text-right">
                </div>
            </div>
        </div>
    </div>
    <!-- Listado End-->

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
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/reporteimport.js"></script>
</asp:Content>