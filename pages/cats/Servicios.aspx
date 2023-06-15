﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Servicios.aspx.cs" Inherits="SanAlberto.pages.cats.Servicios" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
   <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Servicios
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
    <hr />
    <div class="row justify-content-center">
        <div class="col-md-4 col-sm-8 col-12 mb-4">
            <div class="card">
                <div class="card-header">Datos</div>
                <div class="card-body">
                    <div class="row justify-content-center" id="forma">
                        <div class="col-12 col-lg-8">
                            <label>Nombre</label>
                            <input type="text" class="form-control form-control-sm" id="nom" data-val="true" />
                            <span id="enom" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 col-lg-8 my-1">
                            <label>Código</label>
                            <input type="text" class="form-control form-control-sm" id="cod" data-val="true" />
                            <span id="ecod" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 col-lg-8 mb-1">
                            <label>Unidad de Medida</label>
                            <select id="um" class="form-control form-control-sm" data-val="true">
                                <option value=""></option>
                            </select>
                            <span id="eum" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 col-lg-8 mb-1">
                            <label>Estado</label>
                            <select class="form-control" id="status" data-val="true">
                                <option value=""></option>
                                <option value="1">Activo</option>
                                <option value="2">Inactivo</option>
                            </select>
                            <span id="estatus" class="invalid-feedback"></span>
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
        <div class="col-md-4 col-12 col-sm-8">
            <div class="row">
                <div class="stickyTableDivDiv col-12 table-responsive">
                    <div id="servicios"></div>
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
    <script src="/assets/global/pages/js/serv.js"></script>
</asp:Content>

