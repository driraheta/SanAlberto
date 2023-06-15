<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Clientes.aspx.cs" Inherits="SanAlberto.pages.cats.Clientes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/jquery-file-upload/blueimp-gallery/blueimp-gallery.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/css/Style.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800"><i class="fa fa-user"></i>&nbsp;Clientes
           
            <img src="/assets/global/img/loader_blue.gif" class="loader" /></h1>
    </div>
    <div id="listcl">
        <div class="row">
            <div class="col-12">
                <div class="form-inline float-left" id="busqueda">
                    <label for="op" class="mr-sm-2">Filtrar por:</label>
                    <select class="form-control form-control-sm mb-2 mr-sm-2" id="opc">
                        <option value="">Todos</option>
                        <option value="1">Nombre/Razón Social</option>
                        <option value="2">Número de Documento</option>
                        <option value="3">Estado</option>
                    </select>
                    <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Buscar" id="bval" style="display: none">
                    <select id="bedo" class="form-control form-control-sm mb-2 mr-sm-2" style="display: none">
                        <option value="">Todos</option>
                        <option value="1">Activo</option>
                        <option value="2">Inactivo</option>
                    </select>
                    <button class="btn btn-primary btn-sm mb-2 mr-sm-2" id="bus"><i class="fa fa-search"></i></button>
                </div>
                <button class="btn btn-primary mb-2 btn-sm float-right" id="nue"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>

            </div>
        </div>
        <div class="row">
            <div class="col-12 table-responsive">
                <div id="clientes"></div>
            </div>
        </div>
    </div>


    <!-- modal contacto -->
    <div class="modal fade" id="mcont">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Contacto</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 col-12 form-group">
                            <label>Contacto</label>
                            <input type="text" class="form-control" id="nomcont" data-val="true" />
                            <span id="enomcont" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row pos">
                        <div class="col-md-6 my-3 align-content-center">
                            <button type="button" style="width: 180px" class="btn btn-primary mb-2" id="agrcont"><i class="fa fa-save"></i>&nbsp;Guardar</button><br />
                            <button type="button" style="width: 180px" class="btn btn-danger" id="cancont"><i class="fa fa-times-circle"></i>&nbsp;Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" id="id" />
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/clientes.js"></script>
    <script src="/assets/global/pages/js/menu.js"></script>
</asp:Content>

