<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="TipoMoneda.aspx.cs" Inherits="SanAlberto.pages.cats.TipoMoneda" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder"><i class="fa fa-tag"></i>&nbsp;Tipo de Moneda
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
    <hr />

    <div class="row">
        <div class="col-6 col-md-6 col-sm-8" id="forma">
            <div class="card">
                <div class="card-header">Datos</div>
                <div class="card-body">
                    <div id="datos">
                        <div class="row">
                            <div class="col-md-3 col-12 form-group">
                                <label>Símbolo</label>
                                <input type="text" class="form-control form-control-sm" id="codmon" data-val="true" />
                                <span id="ecodmon" class="invalid-feedback"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-10 col-12 form-group">
                                <label>Descripción</label>
                                <input type="text" class="form-control form-control-sm" id="mon" data-val="true" />
                                <span id="emon" class="invalid-feedback"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <div class="form-inline justify-content-center">
                            <button class="btn btn-primary btn-sm mr-1" id="gua"><i class="fa fa-save" onclick="Registrar();"></i>&nbsp;Guardar</button>
                            <button class="btn btn-warning btn-sm" id="can" style="display: none"><i class="fa fa-sign-out-alt"></i>&nbsp;Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="lista" class="col-6  col-md-6 col-sm-8 stickyTableDivDiv">
            <div class="col-lg-8 col-md-10">
                <div class="row">
                    <div class="col-12 table-responsive">
                        <div id="monedas"></div>
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
    <script src="/assets/global/pages/js/moneda.js"></script>
</asp:Content>
