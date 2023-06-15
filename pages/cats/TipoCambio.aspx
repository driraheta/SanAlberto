<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="TipoCambio.aspx.cs" Inherits="SanAlberto.pages.cats.TipoCambio" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
   <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder"><i class="fa fa-dollar-sign"></i>&nbsp;Tipo de Cambio
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
    <hr />

    <div class="row" id="fletem">
        <div class="col-md-2 col-6 form-group">
            <label>Moneda</label>
            <select class="form-control form-control-sm select2" id="tipmon" data-val="true">
            </select>
            <span id="etipmon" class="invalid-feedback"></span>
        </div>
        <div class="col-md-2 col-6 form-group">
            <label>Tipo</label>
            <select class="form-control form-control-sm" id="tipc" data-val="true">
                <option value=""></option>
                <option value="1">Compra</option>
                <option value="2">Venta</option>
            </select>
            <span id="etipc" class="invalid-feedback"></span>
        </div>
        <div class="col-md-2 col-6 form-group">
            <label>Importe</label>
            <input type="text" class="form-control form-control-sm text-right decimal" id="impc" data-val="true" />
            <span id="eimpc" class="invalid-feedback"></span>
        </div>
        <div class="col-md-2 col-6 form-group">
            <label>Desde</label>
            <input type="text" class="form-control form-control-sm" readonly="readonly" id="dec" data-val="true" />
            <span id="edec" class="invalid-feedback"></span>
        </div>
        <div class="col-md-2 col-6 form-group">
            <label>Hasta</label>
            <input type="text" class="form-control form-control-sm" readonly="readonly" id="hasc" data-val="true" />
            <span id="ehasc" class="invalid-feedback"></span>
        </div>
        <div class="col-md-1 col-6">
            <button class="btn btn-primary btn-sm" id="guac" style="margin-top: 32px;"><i class="fa fa-save"></i>&nbsp;Guardar</button>
            <button class="btn btn-warning btn-sm" id="canc" style="margin-top: 32px;display:none"><i class="fa fa-sign-out-alt"></i>&nbsp;Cancelar</button>
        </div>
        <div class="row">
            <div class="col-12 table-responsive">
                <div id="costos"></div>
            </div>
        </div>
    </div>

    <input type="hidden" id="idc" value="0" />
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/tipcamb.js"></script>
</asp:Content>