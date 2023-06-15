<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="prods.aspx.cs" Inherits="SanAlberto.pages.cats.prods" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">

    <!-- Page Heading -->
    <div class="row">
        <div class="col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder"><i class="fa fa-tag"></i>&nbsp;Mantenimiento de Almacenes
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->

    <div id="lista">
        <div class="row">
            <div class="col-12">
                <button class="btn btn-primary mb-2 btn-sm float-right" id="nue" onclick="nuevo();"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
            </div>
        </div>
        <div class="row">
            <div class="col-12 table-responsive table-responsive-sm ">
                <table class="table table-bordered table-sm table-striped table-hover" id="info">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th style="width: 1%;"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>

    <div id="forma" style="display: none">
        <div class="row">
            <div class="col-md-3 col-12 form-group">
                <label>Código</label>
                <input type="text" class="form-control form-control-sm" id="copro" data-val="true" />
                <span id="ecopro" class="invalid-feedback"></span>
            </div>
        </div>

        <div class="row">
            <div class="col-md-10 col-12 form-group">
                <label>Descripción</label>
                <input type="text" class="form-control form-control-sm" id="pro" data-val="true" />
                <span id="epro" class="invalid-feedback"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-12 border-bottom">
                <h6>DIRECCIONES DE PARTIDA</h6>
            </div>
            <div class="col-md-12 col-12 mb-1">
                <label class="mb-0">
                    Lista de Direcciones de Partida
                                <button hidden="hidden" id="ncont" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important" value="">[+ Nuevo]</button></label>
                <div class="input-group">
                    <select id="dir" class="form-control"></select>
                    <div class=" input-group-append">
                        <button class="btn btn-blue-madison btn-sm float-right" id="agredir" value=""><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-12 table-responsive table-responsive-sm">
                <table class="table table-sm table-bordered table-hover table-striped" id="tbldir">
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

        <div class="row">
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary btn-sm" style="min-width: 120px" id="gua"><i class="fa fa-save"></i>&nbsp; Guardar</button>
            <button class="btn btn-warning btn-sm" style="min-width: 120px" id="can"><i class="fa fa-sign-out-alt"></i>&nbsp; Regresar</button>
        </div>
    </div>

    <input type="hidden" id="id" value="0" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/almacenes.js"></script>
</asp:Content>
