<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="ReclamosAnulaciones.aspx.cs" Inherits="SanAlberto.pages.vtas.ReclamosAnulaciones" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <link href="/assets/global/plugins/jquery-file-upload/blueimp-gallery/blueimp-gallery.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/jquery-file-upload/css/jquery.fileupload.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/jquery-file-upload/css/jquery.fileupload-ui.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/css/Style.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Reclamos Anulaciones
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->


    <div id="lista" class="card">
        <div class="card-header">
            <h6 class="card-title"><i class="fa fa-edit"></i>&nbsp;PEDIDOS CON GUIA DE REMISIÓN</h6>
            <br />
            <div class="row">
                <div class="col-10 col-m-10">
                    <div class="row">
                        <div class="col-4">
                            <div class="row">
                                <div class="col">
                                    <label for="filtroFechaInicio" class="mr-sm-2">Emisión Desde</label>
                                </div>
                                <div class="col">
                                    <label for="filtroFechaInicio" class="mr-sm-2">Emisión Hasta</label>
                                </div>
                                <div class="d-flex flex-row">
                                    <input type="text" class="datepicker" id="filtroFechaInicio" data-val="true" readonly="readonly" />
                                    <input type="text" class="datepicker" id="filtroFechaFin" data-val="true" readonly="readonly" />
                                </div>

                            </div>
                        </div>
                        <div class="col">
                            <label for="pedidoValor" class="mr-sm-2">RUC</label>
                            <input type="text" id="filtroRUC" placeholder="Numero RUC" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="clienteValor" class="mr-sm-2">Nombre</label>
                            <input type="text" id="clienteValor" placeholder="Nom Cliente" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <div class="row">
                                <label for="" class="mr-sm-1">&nbsp</label>
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
                        <label for="" class="mr-sm-2">&nbsp</label>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button class="btn btn-primary mb-2 btn-sm mr-sm-2 " id="gen"><i class="fa fa-plus-circle"></i>&nbsp;Anular</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="stickyTable col-12 table-responsive table-responsive-sm " style="height: 40vh;">
                        <table class="table table-sm table-hover" id="info">
                            <thead>
                                <tr>
                                    <th style="display: none;">ID</th>
                                    <th class="thp">Serie</th>
                                    <th class="thp">Número</th>
                                    <th class="thp">Fecha Emisión</th>
                                    <th class="thp">Cliente</th>
                                    <th class="thp">Importe</th>
                                    <th class="thp">Estado</th>
                                    <th style="width: 1%;"></th>
                                </tr>
                            </thead>
                            <tbody id="tinfobody"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer"></div>
    </div>
    <br />
    <div id="listafact" class="card">
        <div class="card-header">
            <h6 class="card-title"><i class="fa fa-edit"></i>&nbsp;PEDIDOS FACTURADOS</h6>
            <br />
            <div class="row">
                <div class="col-10 col-m-10">
                    <div class="row">
                        <div class="col-4">
                            <div class="row">
                                <div class="col">
                                    <label for="filtroFechaIniciof" class="mr-sm-2">Emisión Desde</label>
                                </div>
                                <div class="col">
                                    <label for="filtroFechaIniciof" class="mr-sm-2">Emisión Hasta</label>
                                </div>
                                <div class="d-flex flex-row">
                                    <input type="text" class="datepicker" id="filtroFechaIniciof" data-val="true" readonly="readonly" />
                                    <input type="text" class="datepicker" id="filtroFechaFinf" data-val="true" readonly="readonly" />
                                </div>

                            </div>
                        </div>
                        <div class="col">
                            <label for="pedidoValor" class="mr-sm-2">RUC</label>
                            <input type="text" id="filtroRUCf" placeholder="Numero RUC" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="clienteValor" class="mr-sm-2">Nombre</label>
                            <input type="text" id="clienteValorf" placeholder="Nom Cliente" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <div class="row">
                                <label for="" class="mr-sm-1">&nbsp</label>
                            </div>
                            <div class="row">
                                <button id="filtrarBtnf" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2"><i class="fa fa-search"></i></button>
                                <button id="restablecerFiltrosf" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm float-right"><i class="fas fa-undo"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2 col-sm-2">
                    <div class="row">
                        <label for="" class="mr-sm-2">&nbsp</label>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button class="btn btn-primary mb-2 btn-sm mr-sm-2 " id="genf"><i class="fa fa-plus-circle"></i>&nbsp;Anular</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="stickyTable col-12 table-responsive table-responsive-sm " style="height: 40vh;">
                        <table class="table table-sm table-hover" id="infof">
                            <thead>
                                <tr>
                                    <th style="display: none;">ID</th>
                                    <th class="thp">Serie</th>
                                    <th class="thp">Número</th>
                                    <th class="thp">Fecha Emisión</th>
                                    <th class="thp">Cliente</th>
                                    <th class="thp">Importe</th>
                                    <th style="width: 1%;"></th>
                                    <th style="display: none;">idvent</th>
                                </tr>
                            </thead>
                            <tbody id="tinfobodyf"></tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-footer"></div>
    </div>

    <!-- modal nueva facturas -->
    <div class="modal fade" id="mnuefacturas">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Datos de Facturación</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-6 col-md-4 form-group">
                            <label><i class="fa fa-globe"></i>&nbsp;Tipo de Comprobante</label>
                            <select id="tcf" class="form-control" data-val="true" disabled="disabled">
                            </select>
                            <span id="etcf" class="invalid-feedback"></span>
                        </div>
                        <div class="col-6 col-md-4 form-group">
                            <label><i class="fa fa-calendar"></i>&nbsp;Fecha Doc.</label>
                            <input type="text" class="form-control" id="fec" data-val="true" readonly="readonly" />
                            <span id="efec" class="invalid-feedback"></span>
                        </div>
                        <div class="col-6 col-md-4 form-group">
                            <label><i class="fa fa-money-bill"></i>&nbsp;Moneda</label>
                            <select id="mon" data-val="true" class="form-control totales">
                            </select>
                            <span id="emon" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 col-md-4 form-group">
                            <label><i class="fa fa-barcode"></i>&nbsp;Serie</label>
                            <input type="text" class="form-control" id="ser" />
                        </div>
                        <div class="col-6 col-md-4 form-group">
                            <label><i class="fa fa-file-alt"></i>&nbsp;Número</label>
                            <input type="text" class="form-control" id="num" />
                        </div>
                        <div class="col-6 col-md-4 form-group">
                            <label><i class="fa fa-pencil-alt"></i>&nbsp;No. de RUC</label>
                            <div class="input-group">
                                <input type="text" id="ruc" class="form-control" data-val="true" />
                                <div class="input-group-append">
                                    <button class="btn btn-sm btn-primary" id="bruc" style="border-bottom-right-radius: 4px; border-top-right-radius: 4px"><i class="fa fa-search"></i></button>
                                </div>
                                <span id="eruc" class="invalid-feedback"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-12">
                            <label><i class="fa fa-id-card"></i>&nbsp;Razón Social</label>
                            <input type="text" id="raz" class="form-control" data-val="true" />
                            <span id="eraz" class="invalid-feedback"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 py-3">
                            <div class="row">
                                <div class="row col-12">
                                    <div class="col-8 table-responsive table-responsive-sm">
                                        <table class="table table-sm table-hover" id="productosf">
                                            <thead>
                                                <tr>
                                                    <td style="display: none">Id</td>
                                                    <td class="text-center">Código</td>
                                                    <td class="text-center">Descripción</td>
                                                    <td class="text-center">Und/Medida</td>
                                                    <td class="text-center">Cantidad</td>
                                                    <td class="text-center">Precio</td>
                                                    <td class="text-center">Sub Total</td>
                                                    <td class="text-center">Igv</td>
                                                    <td class="text-center">Importe</td>
                                                </tr>
                                            </thead>
                                            <tbody id="tproductosfbody"></tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-4 col-6">
                                        <div class="col-6 col-md-6 form-group">
                                            <label><i class="fa fa-globe"></i>&nbsp;Motivo de Ajuste / Anulación</label>
                                            <select id="mota" class="form-control" data-val="true">
                                                <option value=""></option>
                                                <option value="1">DESCUENTO</option>
                                                <option value="2">TRASLADO</option>
                                                <option value="3">DEVOLUCIÓN</option>
                                            </select>
                                            <span id="emota" class="invalid-feedback"></span>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <label><i class="fa fa-id-card"></i>&nbsp;Observaciones</label>
                                            <input type="text" id="obs" class="form-control" data-val="true" />
                                            <span id="eobs" class="invalid-feedback"></span>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-12 text-center">
                                    <button class="btn btn-primary btn-sm" id="anu"><i class="fa fa-save"></i>&nbsp;ANULAR</button>
                                    <button class="btn btn-danger btn-sm" id="can"><i class="fa fa-times-circle"></i>&nbsp;CANCELAR</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- modal guia de remision -->
    <div class="modal fade" id="mguiarem">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Datos de Facturación</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-6 col-md-4 form-group">
                            <label><i class="fa fa-barcode"></i>&nbsp;Serie</label>
                            <input type="text" class="form-control" id="serg" readonly="readonly" />
                        </div>
                        <div class="col-6 col-md-4 form-group">
                            <label><i class="fa fa-file-alt"></i>&nbsp;Número</label>
                            <input type="text" class="form-control" id="numg" readonly="readonly" />
                        </div>
                        <div class="col-6 col-md-4 form-group">
                            <label><i class="fa fa-globe"></i>&nbsp;Motivo de Ajuste / Anulación</label>
                            <select id="motag" class="form-control" data-val="true">
                                <option value=""></option>
                                <option value="1">DESCUENTO</option>
                                <option value="2">TRASLADO</option>
                                <option value="3">DEVOLUCIÓN</option>
                            </select>
                            <span id="emotag" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-3">
                            <div class="row">
                                <div class="row col-12">
                                    <div class="col-8 table-responsive table-responsive-sm">
                                        <table class="table table-sm table-hover" id="productos">
                                            <thead>
                                                <tr>
                                                    <th style="display: none">Id</th>
                                                    <th class="text-center">Código</th>
                                                    <th class="text-center">Descripción</th>
                                                    <th class="text-center">Und/Medida</th>
                                                    <th class="text-center">Cantidad</th>
                                                    <th class="text-center">Precio</th>
                                                    <th class="text-center">Sub Total</th>
                                                    <th class="text-center">IGV</th>
                                                    <th class="text-center">Total</th>
                                                    <th style="display: none">IdImp</th>
                                                    <th style="display: none">Comentarios</th>
                                                    <th style="display: none">Almacen</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody id="tproductosbody"></tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-4 col-6">
                                        <div class="col-md-6 col-12">
                                            <label><i class="fa fa-id-card"></i>&nbsp;Observaciones</label>
                                            <input type="text" id="obsg" class="form-control" data-val="true" />
                                            <span id="eobsg" class="invalid-feedback"></span>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-12 text-center">
                                    <button class="btn btn-primary btn-sm" id="anug"><i class="fa fa-save"></i>&nbsp;ANULAR</button>
                                    <button class="btn btn-danger btn-sm" id="cang"><i class="fa fa-times-circle"></i>&nbsp;CANCELAR</button>
                                </div>
                            </div>
                            <div class="col-12 border-bottom" style="margin-bottom: 25px;">
                                NUEVA GUIA
           
                            </div>
                            <div id="forma">
                                <div class="row">
                                    <div class="stickyTable col-12 table-responsive table-responsive-sm">
                                        <table class="table table-sm table-hover" id="productosng">
                                            <thead>
                                                <tr>
                                                    <th style="display: none">Id</th>
                                                    <th class="text-center">Código</th>
                                                    <th class="text-center">Descripción</th>
                                                    <th class="text-center">Und/Medida</th>
                                                    <th class="text-center">Cantidad</th>
                                                    <th class="text-center">Precio</th>
                                                    <th class="text-center">Sub Total</th>
                                                    <th class="text-center">IGV</th>
                                                    <th class="text-center">Total</th>
                                                    <th style="display: none">IdImp</th>
                                                    <th style="display: none">Comentarios</th>
                                                    <th style="display: none">Almacen</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tproductosngbody"></tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12 col-md-12">
                                        <div class="row">
                                            <div class="col-6 col-md-3 form-group">
                                                <label class="my-0">Fecha de Emisión</label>
                                                <input class="form-control form-control-sm" type="text" id="fem" />
                                            </div>
                                            <div class="col-6 col-md-3 form-group">
                                                <label class="my-0">Serie</label>
                                                <input type="text" class="form-control form-control-sm" id="serng" data-val="true" />
                                                <span id="eserng" class="invalid-feedback"></span>
                                            </div>
                                            <div class="col-6 col-md-3 form-group">
                                                <label class="my-0">Número</label>
                                                <input type="text" class="form-control form-control-sm" id="numng" data-val="true" />
                                                <span id="enumng" class="invalid-feedback"></span>
                                            </div>
                                            <div class="col-6 col-md-3 form-group">
                                                <label class="my-0">Forma de pago (#Dias)</label>
                                                <select id="fp" class="form-control form-control-sm" data-val="true">
                                                </select>
                                                <span id="efp" class="invalid-feedback"></span>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-6 col-12 form-group">
                                                <label class="my-0">
                                                    Dirección de Partida
                       
                                                </label>
                                                <select id="dpar" class="form-control form-control-sm" data-val="true">
                                                </select>
                                                <span id="edpar" class="invalid-feedback"></span>
                                            </div>
                                            <div class="col-lg-3 col-6 form-group">
                                                <label class="my-0">Vendedor</label>
                                                <select id="ven" class="form-control form-control-sm" data-val="true">
                                                    <option value=""></option>
                                                </select>
                                                <span id="even" class="invalid-feedback"></span>
                                            </div>
                                            <div class="col-lg-3 col-6 form-group">
                                                <label class="my-0">Contacto</label>
                                                <select id="contac" class="form-control form-control-sm" data-val="true">
                                                    <option value="0"></option>
                                                </select>
                                                <span id="econtac" class="invalid-feedback"></span>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-6 form-group">
                                                <label class="my-0">
                                                    Cliente</label>
                                                <select id="cli" class="form-control form-control-sm" data-val="true">
                                                    <option value=""></option>
                                                </select>
                                                <span id="ecli" class="invalid-feedback"></span>
                                            </div>
                                            <div class="col-lg-3 col-6 form-group">
                                                <label class="my-0">Transportista</label>
                                                <select id="tranp" class="form-control form-control-sm" data-val="true">
                                                    <option value=""></option>
                                                </select>
                                                <span id="etranp" class="invalid-feedback"></span>
                                            </div>
                                            <div class="col-lg-3 col-6 form-group">
                                                <label class="my-0">RUC / Facturar</label>
                                                <input type="text" class="form-control form-control-sm" id="cruc" data-val="true" />
                                                <span id="ecruc" class="invalid-feedback"></span>
                                            </div>
                                            <div class="col-lg-3 col-6 form-group">
                                                <label class="my-0">Dirección de Llegada</label>
                                                <select id="dlleg" class="form-control form-control-sm" data-val="true">
                                                    <option value=""></option>
                                                </select>
                                                <span id="edlleg" class="invalid-feedback"></span>
                                            </div>
                                            <div class="col-lg-3 col-6 form-group">
                                                <label>Punto de Entrega</label>
                                                <select id="pun" class="form-control form-control-sm" data-val="true">
                                                    <option value=""></option>
                                                </select>
                                                <span id="epun" class="invalid-feedback"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-2 col-6 my-2 custom-control-inline">
                                        <button class="btn btn-primary btn-sm" id="gua">Guardar</button>
                                        <button class="btn btn-danger btn-sm" id="canng">Cancelar</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/js/monedas.js"></script>
    <script src="/assets/global/pages/js/recanu.js"></script>
</asp:Content>

