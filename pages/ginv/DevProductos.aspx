<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="DevProductos.aspx.cs" Inherits="SanAlberto.pages.ginv.DevProductos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">

    <div id="forma" class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-12 col-sm-10">
                    <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                        <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">Devolución de Productos
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                        </h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Fecha de Emisión</label>
                        <div class="row">
                            <div class="col-md-6">
                                <input class="form-control datepicker" type="text" id="fecemi" readonly="readonly" />
                            </div>
                        </div>
                    </div>
                    <select class="form-control" id="ump" style="display: none;"></select>

                    <div class="form-group">
                        <label for="exampleFormControlInput1">Almacen</label>
                        <select class="form-control rounded form-control-sm" id="alm">
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Guia de Remisión </label>
                        <select class="form-control rounded form-control-sm" id="guiarem">
                        </select>
                    </div>

                </div>
                <div class="col-md-6">
                    <div class="form-group d-none d-md-block">
                        <label>&nbsp;</label>
                        <label class="form-control-plaintext">&nbsp;</label>
                    </div>

                    <div class="form-group">
                        <label>Contacto</label>
                        <select id="contac" class="form-control form-control-sm" data-val="true" disabled="disabled">
                            <option value="0"></option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Cliente</label>
                        <select id="cli" class="form-control form-control-sm" data-val="true" disabled="disabled">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 mb-0 form-group">
                    <label>Lista de productos</label>
                </div>
                <div class="stickyTable col-12 table-responsive table-responsive-sm ">
                    <table class="table table-bordered table-sm table-striped table-hover" id="productose">
                        <thead>
                            <tr>
                                <th style="display: none">Id</th>
                                <th class="text-center">Código</th>
                                <th class="text-center">Descripción</th>
                                <th class="text-center">UM</th>
                                <th class="text-center">Cantidad a Ingresar</th>
                                <th style="display: none">IdImp</th>
                                <th style="display: none">TipoImp</th>
                                <th class="text-center">Precio de Venta</th>
                                <th style="display: none">Sub Total</th>
                                <th style="display: none">IGV</th>
                                <th style="display: none">Total</th>
                                <th style="display: none">Comentarios</th>
                                <th style="display: none">Almacen</th>
                                <th class="text-center">Stock Actual</th>
                                <th class="text-center">Nuevo Stock</th>
                            </tr>
                        </thead>
                        <tbody id="tpbody"></tbody>
                    </table>
                </div>
                <div class="col-12">
                    <textarea class="form-control" rows="3" placeholder="Escribe aquí una observación" id="txtobs" required></textarea>
                </div>
            </div>

        </div>
        <div class="card-footer">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-primary btn-sm float-right" id="btnguarda"><i class="fa fa-save"></i>&nbsp;Guardar</button>
                <button type="button" class="btn btn-warning btn-sm" id="btncancela"><i class="fa fa-sign-out-alt"></i>&nbsp;Cancelar</button>
            </div>

        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/js/cat/almacen.js"></script>
    <script src="/assets/global/pages/js/devproductos.js"></script>
</asp:Content>
