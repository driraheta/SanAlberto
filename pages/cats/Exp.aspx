<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Exp.aspx.cs" Inherits="SanAlberto.pages.cats.Exp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <link href="/assets/global/plugins/jquery-file-upload/blueimp-gallery/blueimp-gallery.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/jquery-file-upload/css/jquery.fileupload.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/jquery-file-upload/css/jquery.fileupload-ui.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/css/Style.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="d-sm-flex align-items-center justify-content-center mb-2">
        <h1 class="h3 mb-0 mt-0 text-gray-800 font-weight-bolder">Gestión de Proveedores
            <img src="/assets/global/img/loader_blue.gif" class="loader" /></h1>
    </div>
    <hr />
    <div id="lista">
        <div class="row">
            <div class="col-10">
                <div class="form-inline float-left" id="busqueda">
                    <label for="op" class="mr-sm-2">Filtrar por:</label>
                    <select class="form-control form-control-sm mb-2 mr-sm-2" id="opc">
                        <option value="">Todos</option>
                        <option value="1">RUC</option>
                        <option value="2">Razón Comercial</option>
                        <option value="3">Razón Social</option>
                    </select>
                    <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Buscar" id="bruc" style="display: none">
                    <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Buscar" id="brc" style="display: none">
                    <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Buscar" id="brs" style="display: none">
                    <button class="btn btn-primary btn-sm mb-2 mr-sm-2" id="bus"><i class="fa fa-search"></i></button>
                </div>
            </div>
            <div class="col-2">
                <button class="btn btn-primary mb-2 btn-sm float-right" id="nue"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
            </div>
        </div>
        <div class="row">
            <div class="col-12 table-responsive">
                <div id="proveedores"></div>
            </div>
        </div>
    </div>
    <div id="datos" style="display: none">
        <div class="row">
            <div class="col-md-2 col-6 form-group">
                <label>Tipo de Documento</label>
                <select class="form-control" id="td" data-val="true">
                    <option value=""></option>
                    <option value="1">RUC</option>
                    <option value="2">DNI</option>
                    <option value="3">Carnet de Extranjería</option>
                    <option value="4">Pasaporte</option>
                    <option value="5">Otro</option>
                </select>
                <span id="etd" class="invalid-feedback"></span>
            </div>
            <div class="col-md-2 col-6 form-group">
                <label>RUC</label>
                <input type="text" class="form-control" id="ruc" data-val="true" />
                <span id="eruc" class="invalid-feedback"></span>
            </div>

            <div class="col-md-4 col-12 form-group">
                <label>Razón Social</label>
                <input type="text" class="form-control" id="razs" data-val="true" />
                <span id="erazs" class="invalid-feedback"></span>
            </div>
            <div class="col-md-4 col-12 form-group">
                <label>Razón Comercial</label>
                <input type="text" class="form-control" id="razc" data-val="true" />
                <span id="erazc" class="invalid-feedback"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-6 form-group">
                <label>Dirección Fiscal</label>
                <input type="text" class="form-control" id="dirf" />
            </div>
            <div class="col-6 form-group">
                <label>Dirección Comercial</label>
                <input type="text" class="form-control" id="dirc" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-12">
                <label>Ubigeo</label>
                <select id="ubi" class="form-control" data-val="true">
                    <option value=""></option>
                </select>
            </div>            
            <div class="col-md-3 col-12 form-group">
                <label>Estado</label>
                <select class="form-control" id="status2" data-val="true">
                    <option value=""></option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                </select>
                <span id="estatus2" class="invalid-feedback"></span>
            </div>
        </div>
        <div class="row">
             <div class="col-12 border-bottom">
                DATOS DE VENTAS
            </div>
            <div class="col-12 py-3">
                <div class="row">                    
                    <div class="col form-group text-left">
                         <label><i class="fa fa-file-alt"></i>&nbsp;Tipos</label>
                         <div class="input-group">                             
                             <select id="tip" class="form-control" >
                                <option value="">Selecciona el tipo</option>
                                <option value="1">Exportador</option>
                                <option value="2">Importador</option>
                                <option value="3">Local</option>
                                <option value="4">Propio</option>
                                 <!--agregado agencia aduana-->
                                 <option value="5">Agencia de aduana</option>
                            </select>
                             <div class=" input-group-append">
                                     <button class="btn btn-blue-madison btn-sm float-right" id="agre"><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                                </div>
                         </div>
                     </div>
                </div>
              <div class="col-12 table-responsive table-responsive-sm">
                <table class="table table-sm table-bordered table-hover table-striped" id="exptipos">
                    <thead>
                        <tr>
                            <td  style="display: none"> Id</td>
                            <td class="text-center">Tipo</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
        <div class="row">
            <div class="col-12 mb-1">
                <label >Lista de Contactos</label>
                <button class="btn btn-blue-madison btn-sm float-right" id="ncont"><i class="fa fa-plus-circle mr-1"></i>Agregar</button>
            </div>
        </div>
        <div class="row">
            <div class="stickyTable col-12 table-responsive table-responsive-sm">
                <table class="table table-sm table-bordered table-hover table-striped" id="contactosE">
                    <thead>
                        <tr>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Teléfono</th>
                            <th class="text-center">Correo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
        <div class="form-row justify-content-center">
                <button type="button" class="btn btn-primary btn-sm mr-1" id="actex"><i class="fa fa-save mr-1"></i>Actualizar</button>
                <button type="button" class="btn btn-primary btn-sm mr-1" id="guaex"><i class="fa fa-save mr-1"></i>Guardar</button>
                <button type="button" class="btn btn-danger btn-sm" id="can"><i class="fa fa-times-circle mr-1"></i>Cancelar</button>
        </div>
    </div>
    <!-- modal contacto -->
    <div class="modal fade" id="mcontacto">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nuevo Contacto</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3 col-12 form-group">
                            <label>Nombre</label>
                            <input type="text" class="form-control" id="nomc" data-val="true" />
                            <span id="enomc" class="invalid-feedback"></span>
                        </div>

                        <div class="col-md-3 col-12 form-group">
                            <label>Teléfono</label>
                            <input type="text" class="form-control" id="telc" data-val="true" />
                            <span id="etelc" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 col-12 form-group">
                            <label>Correo</label>
                            <input type="text" class="form-control" id="corrc" data-val="true" />
                            <span id="ecorrc" class="invalid-feedback"></span>
                        </div>
                    </div>

                    <div class="row pos">
                        <div class="col-md-6 my-3 align-content-center">
                            <button type="button" style="width: 180px" class="btn btn-primary mb-2" id="agrcont"><i class="fa fa-save mr-1"></i>Guardar</button>
                            <button type="button" style="width: 180px" class="btn btn-danger mb-2" id="cancont"><i class="fa fa-times-circle mr-1"></i>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <input type="text" class="form-control d-none" id="id" />
    <input type="file" id="anexo" style="display: none;" accept="application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" multiple="multiple" />
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src='/assets/global/plugins/jquery-file-upload/js/vendor/jquery.ui.widget.js' type='text/javascript'></script>
    <script src='/assets/global/plugins/jquery-file-upload/js/jquery.iframe-transport.js' type='text/javascript'></script>
    <script src='/assets/global/plugins/jquery-file-upload/js/jquery.fileupload.js' type='text/javascript'></script>
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/monedas.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/js/upAnexo.js"></script>
    <script src="/assets/global/pages/js/exp.js"></script>
</asp:Content>
