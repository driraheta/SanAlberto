<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="CTransporte.aspx.cs" Inherits="SanAlberto.pages.gcost.CTransporte" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder"><i class="fa fa-truck"></i>&nbsp;Costos de Transporte
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- Page Heading End -->
    <input type="hidden" id="idc" value="0" />
    <div id="lista" class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-10 col-m-10">
                    <div class="row">
                        <div class="col-4">
                            <div class="row">
                                <div class="col">
                                    <label for="filtroFechaInicio" class="mr-sm-2">Desde</label>
                                </div>
                                <div class="col">
                                    <label for="filtroFechaInicio" class="mr-sm-2">Hasta</label>
                                </div>
                                <div class="d-flex flex-row">
                                    <input type="text" class="datepicker" id="filtroFechaInicio" data-val="true" readonly="readonly" />
                                    <input type="text" class="datepicker" id="filtroFechaFin" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <label for="filtroUM" class="mr-sm-2">Unidad de Medida</label>
                            <select id="filtroUM" class="form-control form-control-sm mb-2 mr-sm-2 select">
                            </select>
                        </div>

                        <div class="col">
                            <div class="row">
                                <label for="" class="mr-sm-1">&nbsp;</label>
                            </div>
                            <div class="row">
                                <button id="filtrarBtn" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2"><i class="fa fa-search"></i></button>
                                <button id="restablecerFiltros" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm float-right"><i class="fas fa-undo"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2 col-sm-2">
                    <div class="row">
                        <label for="" class="mr-sm-2">&nbsp;</label>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button class="btn btn-success btn-sm  ml-2 mb-2 float-right" id="nue"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 table-responsive">
                    <div id="ctransporte" class="stickyTable table-responsive" style="height: 50vh;"></div>
                </div>
            </div>
        </div>
    </div>
    <div id="datos" class="card">
        <div class="card-header">
            <h5 class="card-title">Registro de Costo de Transporte</h5>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <div class="form" id="fletem">
                        <div class="form-group row">
                            <label class="col-4">Punto de Entrega</label>
                            <div class="col-8">
                                <select id="pun" class="form-control form-control-sm" data-val="true">
                                    <option value=""></option>
                                </select>
                                <span id="epun" class="invalid-feedback"></span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-4">Unidad de Medida</label>
                            <div class="col-8">
                                <select class="form-control form-control-sm" id="um" data-val="true">
                                    <option value=""></option>
                                </select>
                                <span id="eum" class="invalid-feedback"></span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-4">Importe</label>
                            <div class="col-8">
                                <input type="text" class="form-control form-control-sm text-right" id="impc" data-val="true" />
                                <span id="eimpc" class="invalid-feedback"></span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-4">Desde</label>
                            <div class="col-8">
                                <input type="text" class="form-control form-control-sm" readonly="readonly" id="dec" data-val="true" />
                                <span id="edec" class="invalid-feedback"></span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-4">Hasta</label>
                            <div class="col-8">
                                <input type="text" class="form-control form-control-sm" readonly="readonly" id="hasc" data-val="true" />
                                <span id="ehasc" class="invalid-feedback"></span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="d-grid gap-1 d-md-flex justify-content-md-end">
                <button class="btn btn-primary btn-sm float-right" id="guac" style="margin-top: 32px;"><i class="fa fa-save"></i>&nbsp;Guardar</button>
                <button class="btn btn-warning btn-sm" id="canc" style="margin-top: 32px;"><i class="fa fa-sign-out-alt"></i>&nbsp;Cancelar</button>
            </div>

        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/ctrans.js"></script>
</asp:Content>
