<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="RegistroPrecios.aspx.cs" Inherits="SanAlberto.pages.RegistroPrecios" %>

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
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Registro de Precios
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->

    <!-- Page Registro -->
    <div id="registroBody">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-10">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="mb-0 pb-0" for="txtCodigo">Producto</label>
                                    <select class="select2 form-control" id="txtProducto">
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="mb-0 pb-0" for="txtImporte">Precio de Venta</label>
                                    <input type="number" min="0" class="form-control" id="txtImporte" value="0">
                                </div>
                                <div class="form-group">
                                    <label class="mb-0 pb-0" for="txtDesde">Desde</label>
                                    <input type="text" class="form-control datepicker" id="txtDesde" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="mb-0 pb-0" for="txtUnidadMedida">Unidad de Medida</label>
                                    <select class="form-control" id="txtUnidadMedida">
                                        <option value="0">Seleccione Unidad Medida</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="mb-0 pb-0" for="txtMoneda">Moneda</label>
                                    <select class="form-control" id="txtMoneda">
                                        <option value="0">Seleccione Moneda</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="mb-0 pb-0" for="txtHasta">Hasta</label>
                                    <input type="text" class="form-control datepicker" id="txtHasta" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <div class="form-group">
                            <label>Almacen</label>
                            <select class="form-control" id="alm" data-val="true">
                            </select>
                            <span id="ealm" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <label>
                                <i class="fa fa-file-alt"></i>&nbsp;Importación/Exportación
                            </label>
                            <select class="select2 form-control" id="timp" data-val="true">
                            </select>
                            <span id="etimp" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <button class="form-control btn btn-primary" type="button" id="btnGuardar" style="margin-top: 26px">
                            <span class="mr-1 fa fa-save"></span>Guardar
                       
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <div class="card">
            <div class="card-body">
                <div id="tblPreciosProductos" class="col-12 table-responsive stickyTable" style="height: 55vh; width: 100%">
                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Unidad de Medida</th>
                                <th>Tarifa</th>
                                <th>Desde</th>
                                <th>Hasta</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr>
                                <td>000
                                </td>
                                <td>NONE
                                </td>
                                <td>NONE
                                </td>
                                <td>S/ 0.00
                                </td>
                                <td>00/00/0000
                                </td>
                                <td>00/00/0000
                                </td>
                                <td><i class="fa fa-edit text-primary"></i>
                                </td>
                                <td><i class="fa fa-trash text-danger"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="txtRegistros" class="col-12 text-right">
                    Error en la carga de datos
               
                </div>
            </div>
        </div>
    </div>
    <!-- Page Registro End -->

    <div id="editarRegistroModal" style="display: none">
        <div class="row">
            <div class="col-12">
                <div class="d-sm-flex align-items-center justify-content-between mb-2">
                    <h1 class="h1 mb-0 text-gray-800">Editar precio</h1>
                </div>
            </div>
        </div>
        <div id="tblPrecioProductoEditar" class="col-12 table-responsive stickyTable" style="height: 20vh; width: 100%">
            <table class="table table-borderless table-hover table-striped table-sm">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Unidad de Medida</th>
                        <th>Tarifa</th>
                        <th>Desde</th>
                        <th>Hasta</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr>
                        <td>000
                        </td>
                        <td>NONE
                        </td>
                        <td>NONE
                        </td>
                        <td>S/ 0.00
                        </td>
                        <td>00/00/0000
                        </td>
                        <td>00/00/0000
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="row">
            <div class="col-12 col-md-4">
                <div class="row">
                    <div class="col-12">
                        <label class="mb-0 pb-0" for="txtDesdeEditado">Desde</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-12">
                        <div class="input-group mb-2">
                            <input type="date" class="form-control" id="txtDesdeEditado">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label class="mb-0 pb-0" for="txtHastaEditado">Hasta</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-12">
                        <div class="input-group mb-2">
                            <input type="date" class="form-control" id="txtHastaEditado">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="row">
                    <div class="col-12">
                        <label class="mb-0 pb-0" for="txtUnidadMedidaEditado">Unidad de Medida</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-12">
                        <div class="input-group mb-2">
                            <select class="form-control" id="txtUnidadMedidaEditado">
                                <option value="0">Seleccione Unidad Medida</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label class="mb-0 pb-0" for="txtImporteEditado">Importe</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-12">
                        <div class="input-group mb-2">
                            <input type="number" min="0" class="form-control" id="txtImporteEditado" value="0">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-3">
                <div class="row">
                    <div class="col-12">
                        <label class="mb-0 pb-0" for="txtMoneda">Moneda</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-12">
                        <div class="input-group mb-2">
                            <select class="form-control" id="txtMonedae">
                                <option value="0">Seleccione Moneda</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-10 form-group">
                <label>
                    <i class="fa fa-file-alt"></i>&nbsp;Importación/Exportación
               
                </label>
                <div class="form-row">
                    <div class="col-12">
                        <select class="form-control" id="timpe" data-val="true">
                        </select>
                        <span id="etimpe" class="invalid-feedback"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary btn-sm" style="min-width: 120px" id="btnEditar"><i class="fa fa-save"></i>&nbsp; Guardar</button>
            <button class="btn btn-warning btn-sm" style="min-width: 120px" id="btnRegresar"><i class="fa fa-sign-out-alt"></i>&nbsp; Regresar</button>
        </div>

    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <!-- Page level plugins -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous"></script>
    <script src="/assets/global/plugins/chart.js/Chart.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.4.0/dist/chartjs-plugin-datalabels.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <!-- Page level custom scripts -->
    <script src="/assets/global/js/cat/almacen.js"></script>
    <script src="/assets/global/pages/js/registroPrecios.js"></script>
    <!--script src="/demo/chart-area-demo.js"></!--script-->
    <!--script src="/demo/chart-pie-demo.js"></!script-->
</asp:Content>
