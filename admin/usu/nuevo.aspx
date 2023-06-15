<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="nuevo.aspx.cs" Inherits="SanAlberto.admin.usu.nuevo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder"><i class="fa fa-user-plus mr-2"></i>Agregar nuevo usuario
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
    <hr />

    <!-- Content Row -->
    <div class="row" id="forma">
        <div class="col-12">
            <div class="row">
                <div class="form-group col-md-3 col-12">
                    <label class="mb-0" for="txtUsu">Usuario</label>
                    <input type="text" class="form-control" id="usu" data-val="true" data-min="4" maxlength="16" autofocus="autofocus" />
                    <small class="text-danger" id="eusu"></small>
                </div>
                <div class="form-group col-md-3 col-lg-3 col-sm-3 col-xs-6">
                    <label class="mb-0" for="txtRS">Tipo</label>
                    <select id="per" class="form-control" data-val="true">
                        <option value="">Seleccione</option>
                    </select>
                    <small class="text-danger" id="eper"></small>
                </div>
                <div class="form-group col-md-6 col-sm-9 col-lg-6 col-xs-12">
                    <label class="mb-0" for="txtNC">Nombre</label>
                    <input type="text" class="form-control" id="nom" data-val="true" data-min="5" maxlength="75" />
                    <small class="text-danger" id="enom"></small>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <label class="mb-0" for="pwd">Contraseña</label>
                    <input type="password" class="form-control" id="pwd" data-val="true" maxlength="20" data-info="password" />
                    <small class="text-danger" id="epwd"></small>
                </div>
                <div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <label class="mb-0" for="txtContacto">Confirmaci&oacute;n</label>
                    <input type="password" class="form-control" id="cpwd" />
                </div>
                <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label class="mb-0" for="cor">Correo</label>
                    <input type="text" class="form-control" id="cor" data-min="5" maxlength="75" data-val="true" data-info="correo" />
                    <small class="text-danger" id="ecor"></small>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <label for="vercinv">
                        <input type="checkbox" id="viscosto">&nbsp;Ver Costos en Inventario?
                   
                    </label>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-12 border-bottom">
                    <h6>ALMACENES</h6>
                </div>
                <div class="col-md-12 col-12 mb-1">
                    <label class="mb-0">
                        Lista de Almacenes
                                <button hidden="hidden" id="ncont" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important" value="">[+ Nuevo]</button></label>
                    <div class="input-group">
                        <select id="alm" class="form-control"></select>
                        <div class=" input-group-append">
                            <button class="btn btn-blue-madison btn-sm float-right" id="agrealm" value=""><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-12 table-responsive table-responsive-sm">
                    <table class="table table-sm table-bordered table-hover table-striped" id="tblalm">
                        <thead>
                            <tr>
                                <td class="text-center oculta">ID</td>
                                <td class="text-center">Almacen</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row text-center mb-2">
                <div class="col-md-2 col-lg-2 col-sm-2 col-xs-4" hidden="hidden">
                    <input type="button" class="btn btn-success" id="permisos" value="Permisos usuario" />
                </div>
                <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12 justify-content-md-end">
                    <button class="btn btn-primary btn-sm" style="min-width: 120px" id="gua"><i class="fa fa-save"></i>&nbsp; Guardar</button>
                    <img src="/assets/global/img/loader_blue.gif" style="height: 30px;" class="loader" />
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/pages/js/perfil.js"></script>
    <script src="/assets/global/js/cat/almacen.js"></script>
    <script src="/assets/global/pages/js/nusu.js"></script>
</asp:Content>
