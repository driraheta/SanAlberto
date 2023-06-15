<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Kardex.aspx.cs" Inherits="SanAlberto.pages.ginv.Kardex" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">Reporte Kardex Individual
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- Page Heading End -->

    <input type="hidden" id="id" value="0" />
    <div id="listab" class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-md-3 col-12">
                    <div class="form-group">
                        <label class="mb-0" for="exampleFormControlInput1">Producto</label>
                        <select class="form-control rounded select2" id="selprod" onchange="">
                        </select>
                    </div>
                </div>
                <div class="col-md-2 col-12">
                    <div class="form-group">
                        <label class="mb-0" for="exampleFormControlInput1">Fecha Inicio</label>
                        <input type="text" class="form-control datepicker" readonly="readonly" id="feci" data-val="true" />
                        <span id="edec" class="invalid-feedback"></span>
                    </div>
                </div>
                <div class="col-md-2 col-12">
                    <div class="form-group">
                        <label class="mb-0" for="exampleFormControlInput1">Fecha Final</label>
                        <input type="text" class="form-control datepicker" readonly="readonly" id="fecf" data-val="true" />
                        <span id="efecf" class="invalid-feedback"></span>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label class="mb-0" for="exampleFormControlInput1">Sucursal</label>
                        <select class="form-control rounded" id="selalm">
                        </select>
                    </div>
                </div>
                <div class="col-md-3 oculta">
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Módulo de valoración</label>
                        <select class="form-control rounded" id="selValora">
                            <option value="value">text</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2 col-12 text-center">
                    <label class="btn btn-primary rounded" onclick="traerInfo();" style="margin-top: 18px"><span class="fa fa-save mr-2"></span>Generar Kardex</label>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div id="reporte" style="display: none">
                <div class="row">
                    <div class="col-sm-9">
                        <h4>
                            <label class="btn btn-secondary" onclick="cerrar();"><i class="fa fa-arrow-alt-circle-left"></i>&nbsp;Volver</label>
                        </h4>
                    </div>
                    <div class="col-sm-3">
                        <button type="button" class="btn btn-danger btn-sm  float-right" id="pdfview" onclick="GENPDF();"><span class="mr-2 fa fa-file-excel"></span>PDF</button>
                        <button type="button" class="btn btn-success btn-sm float-right" id="expview" onclick="exportar();"><span class="mr-2 fa fa-file-excel"></span>Excel</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 table-responsive table-responsive-sm" style="max-height: 350px; overflow-y: auto">
                        <table class="table table-sm table-hover" id="lproent">

                            <colgroup span="2"></colgroup>
                            <colgroup span="2"></colgroup>
                            <thead class="table-bordered">
                                <tr>
                                    <td rowspan="2">#</td>
                                    <td rowspan="2">Producto</td>
                                    <td rowspan="2">Fecha</td>
                                    <td rowspan="2">Detalle</td>
                                    <td rowspan="2">Stock Inicial</td>
                                    <td rowspan="2">Stock Final</td>
                                    <th colspan="3" scope="colgroup" class="bg-success text-white">Entradas</th>
                                    <th colspan="3" scope="colgroup" class=" bg-info text-white">Salidas</th>
                                </tr>
                                <tr>
                                    <th scope="col" class="bg-success text-white">Cantidad</th>
                                    <th scope="col" class="bg-success text-white">C.Unit.</th>
                                    <th scope="col" class="bg-success text-white">C.Total</th>
                                    <th scope="col" class="bg-info text-white">Cantidad</th>
                                    <th scope="col" class="bg-info text-white">C.Unit.</th>
                                    <th scope="col" class="bg-info text-white">C.Total</th>
                                </tr>
                            </thead>
                            <tbody id="tblkar"></tbody>
                        </table>
                    </div>
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

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/js/cat/almacen.js"></script>
    <script src="/assets/global/pages/js/kardexInv.js"></script>
</asp:Content>
