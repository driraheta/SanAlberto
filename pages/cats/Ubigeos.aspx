<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Ubigeos.aspx.cs" Inherits="SanAlberto.pages.cats.Ubigeos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
   <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Mantenimiento de Ubigeos
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
                            <label>Pais</label>
                            <select id="pais" class="form-control form-control-sm" data-val="true">
                                <option value=""></option>
                            </select>
                            <span id="epais" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12">
                            <label>Departamento</label>
                            <input type="text" class="form-control form-control-sm" id="depto" data-val="true" />
                            <span id="edepto" class="invalid-feedback"></span>
                        </div>    
                        <div class="col-12">
                            <label>Provincia</label>
                            <input type="text" class="form-control form-control-sm" id="prov" data-val="true" />
                            <span id="eprov" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12">
                            <label>Distrito</label>
                            <input type="text" class="form-control form-control-sm" id="dis" data-val="true" />
                            <span id="edis" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12">
                            <label>Descripción</label>
                            <input type="text" class="form-control form-control-sm" id="desc" data-val="true" />
                            <span id="edesc" class="invalid-feedback"></span>
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
                            <option value="1">Descripción</option>
                            <option value="2">Departamento</option>
                            <option value="3">Provincia</option>
                            <option value="4">Distrito</option>
                            <option value="5">País</option>
                        </select>
                        <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Buscar" id="bval" style="display: none">
                        <select id="paisb" class="form-control form-control-sm"  style="display: none">
                                <option value=""></option>
                            </select>
                        <button class="btn btn-primary btn-sm mb-2 mr-sm-2" id="bus"><i class="fa fa-search"></i></button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="stickyTableDivDiv col-12 table-responsive">
                    <div id="Ubigeos"></div>
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
    <script src="/assets/global/pages/js/ubigeos.js"></script>
</asp:Content>
