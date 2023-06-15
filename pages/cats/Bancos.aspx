<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Bancos.aspx.cs" Inherits="SanAlberto.pages.cats.Bancos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder"><i class="fa fa-tag"></i>&nbsp;Mantenimiento de Bancos
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
    <hr />
    <div class="row">
        <div class="col-lg-6 col-md-6 mb-4">
            <div class="card">
                <div class="card-header">Datos</div>
                <div class="card-body">
                    <div class="row" id="forma">
                        <div class="row offset-md-2 col-md-6 col-6 form-group">
                            <label>Nombre</label>
                            <input type="text" class="form-control form-control-sm" id="nom" data-val="true" />
                            <span id="enom" class="invalid-feedback"></span>
                        </div>
                        <div class="row offset-md-2 col-md-6 col-6 form-group">
                            <label>No Identificacion</label>
                            <input type="text" class="form-control form-control-sm numeros" id="noid" data-val="true" maxlength="11" />
                            <span id="enoid" class="invalid-feedback"></span>
                        </div>
                        <div class="row offset-md-2 col-md-6 col-6 form-group">
                            <label>Razón Social</label>
                            <input type="text" class="form-control form-control-sm" id="razs" data-val="true" />
                            <span id="erazs" class="invalid-feedback"></span>
                        </div>
                        <div class="row col-md-10">
                            <div class="col-md-12 col-12 mb-2">
                                <label>Cuentas</label>
                                <button class="btn btn-blue-madison btn-sm float-right" id="ncuenta"><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-12 table-responsive table-responsive-sm">
                                <table class="table table-sm table-bordered table-hover table-striped" id="cuentas">
                                    <thead>
                                        <tr>
                                            <td class="text-center" style="display: none">Tipo Cuenta</td>
                                            <td class="text-center">Tipo Cuenta</td>
                                            <td class="text-center" style="display: none">moneda</td>
                                            <td class="text-center">Moneda</td>
                                            <td class="text-center">No. Cuenta</td>
                                            <td class="text-center">Titular</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
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
        <div class="col-lg-6 col-md-10">
            <div class="row">
                <div class="col-12 table-responsive">
                    <div id="bancos"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal contacto -->
    <div class="modal fade" id="mcuenta">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Agregar Cuenta</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3 col-12 form-group">
                            <label>
                                Tipo Cuenta
                               
                                <button id="ntc" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>
                            </label>
                            <select id="tc" class="form-control form-control-sm mb-2 mr-sm-2">
                            </select>
                            <span id="etc" class="invalid-feedback"></span>
                        </div>

                        <div class="col-md-3 col-12 form-group">
                            <label>Moneda</label>
                            <select id="mon" class="form-control form-control-sm mb-2 mr-sm-2">
                            </select>
                            <span id="emon" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 col-12 form-group">
                            <label>No. Cuenta</label>
                            <input type="text" class="form-control" id="noc" data-val="true" />
                            <span id="enoc" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 col-12 form-group">
                            <label>Titular</label>
                            <input type="text" class="form-control" id="tit" data-val="true" />
                            <span id="etit" class="invalid-feedback"></span>
                        </div>
                    </div>

                    <div class="row pos">
                        <div class="col-md-6 my-3 align-content-center">
                            <button type="button" style="width: 180px" class="btn btn-primary mb-2" id="agrcunt"><i class="fa fa-save"></i>&nbsp;Guardar</button>
                            <button type="button" style="width: 180px" class="btn btn-danger mb-2" id="cancunt"><i class="fa fa-times-circle"></i>&nbsp;Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal tipo de cuenta -->
    <div class="modal fade" id="mtc">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Tipo de Cuenta</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3 col-12 form-group">
                            <label>Tipo de Cuenta</label>
                            <input type="text" class="form-control" id="tcu" data-val="true" />
                            <span id="etcu" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row pos">
                        <div class="col-md-6 my-3 align-content-center">
                            <button type="button" style="width: 180px" class="btn btn-primary mb-2" id="guatc"><i class="fa fa-save"></i>&nbsp;Guardar</button><br />
                            <button type="button" style="width: 180px" class="btn btn-danger" id="cantc"><i class="fa fa-times-circle"></i>&nbsp;Cancelar</button>
                        </div>
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
    <script src="/assets/global/js/monedas.js"></script>
    <script src="/assets/global/pages/js/banco.js"></script>
</asp:Content>




