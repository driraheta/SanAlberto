<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Perfiles.aspx.cs" Inherits="SanAlberto.pages.cats.Perfiles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/jquery-file-upload/blueimp-gallery/blueimp-gallery.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/css/Style.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
   <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Perfiles
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
    <hr />

    <div class="row">
        <div class="col-6">
            <div class="card">
                <div class="card-header">Datos</div>
                <div class="card-body">
                    <div id="datos">
                        <div class="row">
                            <div class="col-12 form-group">
                                <label class="my-0">Nombre</label>
                                <input type="text" placeholder="Nombre perfil" class="form-control" id="per" data-val="true" />
                                <span id="eper" class="invalid-feedback"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 mb-1">
                                <label class="mb-0">Lista de Menú</label>
                                <div class="input-group">
                                    <select id="men" class="form-control" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <div class=" input-group-append">
                                        <button class="btn btn-success btn-sm float-right" id="agre"><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="stickyTable col-12 table-responsive table-responsive-sm" style="max-height: 35vh;">
                                <table class="table table-sm table-hover" id="menus">
                                    <thead>
                                        <tr>
                                            <th class="text-center" style="display: none">Id</th>
                                            <th class="text-center">Menú</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <div class="form-inline justify-content-center">
                            <button class="btn btn-primary btn-sm mr-1" id="guaper"><i class="fa fa-save"></i>&nbsp;Guardar</button>
                            <button class="btn btn-primary btn-sm mr-1" id="actper"><i class="fa fa-save"></i>&nbsp;Actualizar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="perfiles" class="col-6 stickyTableDivDiv">
        </div>
    </div>
    <input type="hidden" id="id" value="0" />

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/perfil.js"></script>
    <script src="/assets/global/pages/js/menu.js"></script>
</asp:Content>
