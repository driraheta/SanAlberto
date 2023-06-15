<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="DireccionPartida.aspx.cs" Inherits="SanAlberto.pages.cats.DireccionPartida" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Mantenimiento de Dirección de Partida
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
    <hr />

    <div class="row justify-content-center">
        <div class="col-md-4 col-sm-8 col-12 mb-4">
            <div class="card">
                <div class="card-header">Datos</div>
                <div class="card-body">
                    <div class="row justify-content-center" id="forma">
                        <div class="col-12 my-1">
                            <label>Dirección de Partida</label>
                            <input type="text" class="form-control form-control-sm" id="dirpar" data-val="true" />
                            <span id="edirpar" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col-12">
                            <label class="mb-0 mt-3">Secuenciales</label>
                            <button class="btn btn-success btn-sm float-right" id="nuesec"><i class="fa fa-plus-circle mr-1"></i>Agregar</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="stickyTable col-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-hover" id="secuenciales">
                                <thead>
                                    <tr>
                                        <th style="display: none">Id</th>
                                        <th style="display: none">IdDocumento</th>
                                        <th style="display: none">IdTipoComprobante</th>
                                        <th class="text-center">Documento</th>
                                        <th class="text-center">Desc Secuencial</th>
                                        <th class="text-center">Serie</th>
                                        <th class="text-center">Numero Actual</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
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
                    <div id="direcciondepartida"></div>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" id="id" value="0" />

    <!-- MODAL DE ASOCIACIÓN DE SECUENCIALES. -->
    <div class="modal fade" id="mcorrelativo">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nuevo Secuencial</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-5 col-12 form-group">
                            <label>Documento</label>
                            <select class="form-control" id="iddocumento">
                                <option value="1">FACTURA</option>
                                <option value="2">GUIA REMISION</option>
                                <option value="3">NOTA DEBITO</option>
                                <option value="4">NOTA CREDITO</option>
                                <option value="5">RETENCION</option>
                            </select>
                            <span id="eiddocumento" class="invalid-feedback"></span>
                        </div>

                        <div class="col-md-5 col-12 form-group">
                            <label>Serie</label>
                            <select class="form-control" id="idtipocomprobante"></select>
                            <span id="eidtipocomprobante" class="invalid-feedback"></span>
                        </div>

                    </div>
                </div>
    
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="agrsec"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="cansec"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
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
    <script src="/assets/global/js/cat/tipocomprobante.js"></script>
    <script src="/assets/global/pages/js/dirpar.js"></script>
</asp:Content>
