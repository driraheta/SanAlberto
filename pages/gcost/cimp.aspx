<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="cimp.aspx.cs" Inherits="SanAlberto.pages.gcost.cimp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="d-sm-flex align-items-center justify-content-center mb-2">
        <h1 class="h3 mb-0 mt-0 text-gray-800 font-weight-bolder">Costos de Importación
            <img src="/assets/global/img/loader_blue.gif" class="loader" /></h1>
    </div>
    <hr />

    <div class="row" id="fletem">
        <div class="col-12 mb-1">
            <div class="row">
                <div class="col-12 pr-0 col-md-3 col-lg-2 align-self-center mb-0">
                    <h4 class="m-0">Flete Marino</h4>
                </div>
                <div class="col-12 d-md-none">
                    <hr class="my-0" />
                </div>
                <div class="col-md-2 pb-1 col-6 form-group mb-0">
                    <label class="mb-0">Tipo</label>
                    <select class="form-control form-control-sm" id="tipf" data-val="true">
                        <option value=""></option>
                        <option value="1">Tarifa por Caja</option>
                        <option value="2">Monto Final</option>
                    </select>
                    <span id="etipf" class="invalid-feedback"></span>
                </div>
                <div class="col-md-2 pb-1 col-6 form-group mb-0">
                    <label class="mb-0">Importe</label>
                    <input type="text" class="form-control form-control-sm text-right" id="impf" data-val="true" />
                    <span id="eimpf" class="invalid-feedback"></span>
                </div>
                <div class="col-md-2 pb-1 col-6 form-group iconoTheme01 mb-0">
                    <label class="mb-0">Desde</label>
                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="def" data-val="true" />
                    <span id="edef" class="invalid-feedback"></span>
                </div>
                <div class="col-md-2 pb-1 col-6 form-group iconoTheme01 mb-0">
                    <label class="mb-0">Hasta</label>
                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="hasf" data-val="true" />
                    <span id="ehasf" class="invalid-feedback"></span>
                </div>
                <div class="col-md-1 pl-0 pb-1 col-lg-2 col-12 align-self-end text-center text-md-left">
                    <button class="btn btn-primary btn-sm" id="guaf">Guardar</button>
                    <button class="btn btn-danger btn-sm" id="canf" style="display: none">Cancelar</button>
                </div>
            </div>
        </div>
        <div class="col-12 stickyTable table-responsive table-responsive-sm " style="max-height: 22vh">
            <table class="table table-bordered table-sm table-striped table-hover" id="fmarino">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Importe</th>
                        <th>Desde</th>
                        <th>Hasta</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody></tbody>

            </table>
        </div>
    </div>
    <hr />
    <div class="row" id="gastos">
        <div class="col-12">
            <div class="row">
                <div class="col-12 pr-0 col-md-3 col-lg-2 align-self-center mb-0">
                    <h4 class="m-0">Gastos de Operador</h4>
                </div>
                <div class="col-12 d-md-none">
                    <hr class="my-0" />
                </div>
                <div class="col-md-2 pb-1 col-6 form-group mb-0">
                    <label class="my-0">Tipo</label>
                    <select class="form-control form-control-sm" id="tipg" data-val="true">
                        <option value=""></option>
                        <option value="1">Tarifa por Caja</option>
                        <option value="2">Monto Final</option>
                    </select>
                    <span id="etipg" class="invalid-feedback"></span>
                </div>
                <div class="col-md-2 pb-1 col-6 form-group mb-0">
                    <label class="my-0">Importe</label>
                    <input type="text" class="form-control form-control-sm text-right" id="impg" data-val="true" />
                    <span id="eimpg" class="invalid-feedback"></span>
                </div>
                <div class="col-md-2 pb-1 col-6 form-group mb-0 iconoTheme01">
                    <label class="my-0">Desde</label>
                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="deg" data-val="true" />
                    <span id="edeg" class="invalid-feedback"></span>
                </div>
                <div class="col-md-2 pb-1 col-6 form-group mb-0 iconoTheme01">
                    <label class="my-0">Hasta</label>
                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="hasg" data-val="true" />
                    <span id="ehasg" class="invalid-feedback"></span>
                </div>
                <div class="col-md-1 pl-0 pb-1 col-lg-2 col-12 align-self-end text-center text-md-left">
                    <button class="btn btn-primary btn-sm" id="guag">Guardar</button>
                    <button class="btn btn-danger btn-sm" id="cang" style="display: none">Cancelar</button>
                </div>
            </div>
        </div>
        <div class="col-12 stickyTable table-responsive table-responsive-sm" style="max-height: 22vh;">
            <table class="table table-bordered table-sm table-striped table-hover" id="gasto">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Importe</th>
                        <th>Desde</th>
                        <th>Hasta</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    <input type="hidden" id="idf" value="0" />
    <input type="hidden" id="idg" value="0" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/cimp.js"></script>
</asp:Content>
