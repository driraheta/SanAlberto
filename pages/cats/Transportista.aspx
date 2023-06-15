<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Transportista.aspx.cs" Inherits="SanAlberto.pages.cats.TipoEmbarque" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="d-sm-flex align-items-center justify-content-center mb-2">
   <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Mantenimiento de Transportistas
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->

    <div class="row justify-content-center">
        <div class="col-md-4 col-sm-8 col-12 mb-4">
            <div class="card">
                <div class="card-header">Datos</div>
                <div class="card-body">
                    <div class="row justify-content-center" id="forma">
                        <div class="col-12 my-1">
                            <label>EMPRESA</label>
                            <input type="text" class="form-control form-control-sm" id="nom" data-val="true" />
                            <span id="enom" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 my-1">
                            <label>Marca
                            <button id="nmarc" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                            <select id="marc" class="form-control" data-val="true">
                                <option value=""></option>
                            </select>
                            <span id="emarc" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 my-1">
                            <label>Placa de Vehiculo</label>
                            <input type="text" class="form-control form-control-sm" id="ndoc" data-val="true" />
                            <span id="endoc" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 my-1">
                            <label>Nombre de Conductor</label>
                            <input type="text" class="form-control form-control-sm" id="trans" data-val="true" />
                            <span id="etrans" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 my-1">
                            <label>Nro. Brevete</label>
                            <input type="text" class="form-control form-control-sm" id="placa" data-val="true" />
                            <span id="eplaca" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 my-1">
                            <label>Capacidad (No de Cajas)</label>
                            <input type="text" class="form-control form-control-sm" id="cap" data-val="true" />
                            <span id="ecap" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <div class="form-inline justify-content-center">
                            <button class="btn btn-primary btn-sm mr-1" id="gua"><i class="fa fa-save"></i>&nbsp;Guardar</button>
                            <button class="btn btn-warning btn-sm" id="can" style="display: none"><i class="fa fa-sign-out-alt"></i>&nbsp;Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-12 col-sm-8">
            <div class="row">
                <div class="col-12">
                    <div class="form-inline float-left" id="busqueda">
                        <label for="op" class="mr-sm-2">Filtrar por:</label>
                        <select class="form-control form-control-sm mb-2 mr-sm-2" id="opc">
                            <option value="">Todos</option>
                            <option value="1">Nombre</option>
                        </select>
                        <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Buscar" id="bval" style="display: none">
                        <button class="btn btn-primary btn-sm mb-2 mr-sm-2" id="bus"><i class="fa fa-search"></i></button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="stickyTableDivDiv col-12 table-responsive">
                    <div id="transportistas"></div>
                </div>
            </div>
        </div>
    </div>

                <!-- modal dirección de Marca -->
    <div class="modal fade" id="mmarca">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Marca</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3 col-12 form-group">
                            <label>Marca</label>
                            <input type="text" class="form-control" id="marca" data-val="true" />
                            <span id="emarca" class="invalid-feedback"></span>
                        </div>
                    </div>    
                    <div class="row pos">
                        <div class="col-md-6 my-3 align-content-center">
                            <button type="button" style="width:180px"  class="btn btn-primary mb-2" id="guam"><i class="fa fa-save"></i>&nbsp;Guardar</button><br />
                            <button type="button" style="width:180px"  class="btn btn-danger" id="canm"><i class="fa fa-times-circle"></i>&nbsp;Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" id="id" value="0" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/trans.js"></script>
</asp:Content>
