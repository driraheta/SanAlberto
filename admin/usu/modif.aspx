<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="modif.aspx.cs" Inherits="SanAlberto.admin.usu.modif" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Edición de usuarios
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
    <hr />
    <div class="row" id="lista">
        <div class="col-12 table-responsive">
            <div id="usuarios">
            </div>
        </div>
    </div>
    <!-- Content Row -->
    <div class="row" id="forma" style="display: none">
        <div class="col-md-12">
            <div class="row">
                <div class="form-group col-md-3 col-12">
                    <label for="txtUsu"><b>Usuario</b></label>
                    <input type="text" class="form-control" id="user" readonly="readonly" />
                    <small class="text-danger" id="eusu"></small>
                </div>
                <div class="form-group col-md-3 col-lg-3 col-sm-3 col-xs-6">
                    <label for="txtRS"><b>Tipo</b></label>
                    <select id="per" class="form-control" data-val="true">
                        <option value="">Seleccione</option>
                    </select>
                    <small class="text-danger" id="eper"></small>
                </div>
                <div class="form-group col-md-6 col-sm-6 col-lg-6 col-xs-12">
                    <label for="txtNC"><b>Nombre</b></label>
                    <input type="text" class="form-control" id="nom" data-val="true" data-min="5" maxlength="75" />
                    <small class="text-danger" id="enom"></small>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <label for="pwd"><strong>Contraseña</strong></label>
                    <input type="password" class="form-control" id="pwd" maxlength="20" data-info="password" />
                    <small class="text-danger" id="epwd"></small>
                </div>
                <div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <label for="txtContacto">Confirmaci&oacute;n</label>
                    <input type="password" class="form-control" id="cpwd" />
                </div>
                <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label for="cor">Correo</label>
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

            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <div class="text-right">
                </div>
                <div class="col-6 text-right">
                    <button class="btn btn-primary btn-sm" style="min-width: 120px" id="gua"><i class="fa fa-save"></i>&nbsp; Guardar</button>
                    <img src="/assets/global/img/loader_blue.gif" class="loader" />

                    <button class="btn btn-warning btn-sm" style="min-width: 120px" id="reg"><i class="fa fa-sign-out-alt"></i>&nbsp; Regresar</button>
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" id="idu" value="0" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/pages/js/perfil.js"></script>
    <script src="/assets/global/js/cat/almacen.js"></script>
    <script src="/assets/global/pages/js/musu.js"></script>
</asp:Content>
