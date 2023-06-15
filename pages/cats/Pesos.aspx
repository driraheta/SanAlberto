<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Pesos.aspx.cs" Inherits="SanAlberto.pages.cats.Pesos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
   <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder"><i class="fa fa-tag"></i>&nbsp;Mantenimiento de Pesos
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
    <hr />
    <div class="row">
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card">
               <div class="card-header">Datos</div>
                <div class="card-body">
                    <div class="row" id="forma">
                        <div class="offset-md-2 col-md-6 col-6 form-group">
                            <label>Peso</label>
                            <input type="text" class="form-control form-control-sm" id="peso" data-val="true" />
                            <span id="epeso" class="invalid-feedback"></span>
                        </div>
                        <div class="offset-md-2 col-md-6 col-6 form-group">
                            <label>Nomenclatura</label>
                            <input type="text" class="form-control form-control-sm" id="nom" data-val="true" />
                            <span id="enom" class="invalid-feedback"></span>
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
        <div class="col-lg-8 col-md-10">
            <div class="row">
                <div class="col-12 table-responsive">
                    <div id="pesos"></div>
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
    <script src="/assets/global/pages/js/peso.js"></script>
</asp:Content>




