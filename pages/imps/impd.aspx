<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="impd.aspx.cs" Inherits="SanAlberto.pages.imps.impd" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <link href="/assets/global/plugins/jquery-file-upload/blueimp-gallery/blueimp-gallery.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/jquery-file-upload/css/jquery.fileupload.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/jquery-file-upload/css/jquery.fileupload-ui.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/css/Style.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/select2/select2.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">Importaciones | Exportaciones
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- Page Heading End -->

    <!-- Listado -->
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
                            <label for="anioValor" class="mr-sm-2">Año</label>
                            <input type="text" id="anioValor" placeholder="Año" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="pedidoValor" class="mr-sm-2">Pedido</label>
                            <input type="text" id="pedidoValor" placeholder="#Pedido" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="importacionValor" class="mr-sm-2">Importación</label>
                            <input type="text" id="importacionValor" placeholder="#Importación" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
<%--                        <div class="col">
                            <label for="ocValor" class="mr-sm-2">Orden Compra</label>
                            <input type="text" id="ocValor" placeholder="Num OC" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>--%>
                        <div class="col">
                            <label for="proveedorValor" class="mr-sm-2">Proveedor</label>
                            <input type="text" id="proveedorValor" placeholder="Nom Proveedor" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="filtroEstado" class="mr-sm-2">Estado</label>
                            <select id="filtroEstado" class="form-control form-control-sm mb-2 mr-sm-2 select2">
                                <option value="0">Todos</option>
                                <option value="1">Nuevo</option>
                                <option value="2">En Proceso</option>
                                <option value="3">Ingresado a Cámara</option>
                                <option  value="5">Anulado</option>
<%--                                <option value="4">Facturado</option>
                                <option value="5">Enviado a Destino</option>--%>
                            </select>
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
                            <button class="btn btn-success btn-sm  ml-2 mb-2 float-right" id="nue"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 table-responsive">
                    <div id="ordenes2" class="stickyTable table-responsive" style="height: 50vh;">
                        <table class="table table-sm table-hover  " id="tableordenes2">
                            <thead>
                                <tr>
                                    <th>Año</th>
                                    <th style="color: blue; cursor: pointer">#Pedido</th>
                                    <!--agregado--><th style="color: blue; cursor: pointer">#Importación</th>
                                    <th>Tipo de Oper.</th>
                                    <th style="color: blue; cursor: pointer">ETD</th>
                                    <th style="color: blue; cursor: pointer">ETA</th>
                                    <th style="color: blue; cursor: pointer">Fec Ing Camara</th>
                                    <th>Proveedor</th>
                                    <th>Especie</th>
                                    <th>Monto</th>
                                    <th>Moneda</th>
                                    <th>Estado</th>
                                    <th>#Contenedor</th>
                                    <th></th>
                                    <th></th>
                                    <th></th><!--columna anular-->
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="txtRegistros" class="col-12 text-right">
                </div>
            </div>
            <br />
            <div class="row">
                <!-- Seccion facturas -->
                <div class="card" id="cardfacturas">
                    <!-- card Header -->
                    <div class="card-header">
                        <h4 class="modal-title">Documentos Electrónicos <span id="cabdet"></span></h4>
                    </div>
                    <!-- card body -->
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-inline float-left">
                                </div>
                                <button class="btn btn-primary mb-2 btn-sm float-right" id="nuefac"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-12 table-responsive">
                                <div id="infofac"></div>
                            </div>
                            <div id="txtRegistrosD" class="col-12 text-right">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- Listado End-->

    <!-- Datos-->
    <div id="datos" class="card" style="display: none">
        <div class="card-header">
            <div class="row">
                <div class="col-12 col-sm-6">
                    <h5 class="card-title">Nuevo Registro</h5>
                </div>
                <div class="col-12 col-sm-6">
                    <button class="btn btn-success btn-sm float-right" id="limp"><i class="fa fa-undo"></i>&nbsp; Limpiar</button>
                    <button class="btn btn-warning btn-sm float-right mr-2"  id="reg"><i class="fa fa-sign-out-alt"></i>&nbsp; Regresar</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <ul class="nav" role="tablist" id="tab">
                <li class="nav-item tabula" style="display: none">
                    <a class="nav-link" data-toggle="tab" href="#info" id="inb">Información Básica</a>
                </li>
                <li class="nav-item tabula" style="display: none">
                    <a class="nav-link" data-toggle="tab" href="#pack" id="ipk">Packing List</a>
                </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content" id="principal">
                <div id="info" class="tab-pane active">
                    <div class="row">
                        <div class="col-md-3 col-6 form-group">
                            <label>Modalidad</label>
                            <select class="form-control select2" id="mod" data-val="true">
                                <option value=""></option>
                                <option value="1">Importación Directa</option>
                                <option value="2">Importación Indirecta</option>
                                <option value="3">Exportación Indirecta</option>
                                <option value="4">Exportación Directa</option>
                            </select>
                            <span id="emod" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>
                                Moneda&nbsp;&nbsp;
                               
                                <button id="nmon" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>
                            </label>
                            <select class="form-control select2" id="mon" data-val="true"></select>
                            <span id="emon" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 col-6 form-group">
                            <label>Fecha de Emisión</label>
                            <div class="input-group-prepend">
                                <%--<span class="input-group-text" style="border-top-right-radius: 0; border-bottom-right-radius: 0"><i class="fa fa-calendar"></i></span>--%>
                                <input type="text" class="form-control datepicker" style="border-bottom-left-radius: 0; border-top-left-radius: 0" id="fec" readonly="readonly" />
                           <span id="efec" class="invalid-feedback"></span>
                              </div>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label># Pedido</label>
                            <input type="text" class="form-control numeros" maxlength="5" id="num"  />
                        </div>
                        <div class="col-md-2 col-6 form-group">
                              <label># Importación</label>
                            <input type="text" class="form-control" data-val="false" id="emb" />
                            <input type="text" class="form-control d-none" data-val="false" id="secuencia" />
                            <span id="eemb" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 col-12 checkbox">
                            <label>
                                <input type="checkbox" value="" id="sig">
                                Aplicar al siguiente periodo
                            </label>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>
                                Mercado&nbsp;&nbsp;
                               
                                <button id="nmer" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>
                            </label>
                            <select class="form-control select2" id="mer" data-val="true"></select>
                            <span id="emer" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>Tipo de Documento</label>
                            <input type="text" class="form-control" readonly="readonly" id="td" />

                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>
                                País (Origen)&nbsp;&nbsp;
                               
                                <button id="npai" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                            <select id="pai" class="form-control select2" data-val="true"></select>
                            <span id="epai" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>
                                País (Destino)&nbsp;&nbsp;
                               
                                <button id="npaid" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label></label>
                            <select id="paid" class="form-control select2" data-val="true"></select>
                            <span id="epaid" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-12 form-group">
                            <label>
                                Datos de Exportador&nbsp;&nbsp;
                            <button id="nex" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                            <div class="form-row">
                                <div class="col-12">
                                    <select class="form-control select2" id="exp" data-val="true">
                                    </select>
                                    <span id="eexp" class="invalid-feedback"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 col-6 mt-md-5">
                            <label class="oculta">
                                <input type="checkbox" value="" id="come">&nbsp;Aplica Comisión
                            </label>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label># Proforma</label>
                            <input type="text" class="form-control" data-val="false" id="pro" />
                            <span id="epro" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>
                                Condición de Pago&nbsp;&nbsp;
                               
                                <button id="necp" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                            <select class="form-control select2" id="cp" data-val="true"></select>
                            <span id="ecp" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row" id="creditoDatos">
                        <div class="offset-6 col-md-2 form-group">
                            <label>Anticipo de %</label>
                            <input type="text" class="form-control" data-val="true" id="anticipo" />
                        </div>
                        <div class="col-md-2 form-group">
                            <label>Saldo en %</label>
                            <input type="text" class="form-control" data-val="true" id="saldo" />
                        </div>
                        <div class="col-md-2 form-group">
                            <label># dias al Arribo</label>
                            <input type="text" class="form-control" data-val="true" id="diasArribo" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-12 form-group">
                            <label>Datos del Importador</label>
                            <button id="nim" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>
                            <div class="form-row">
                                <div class="col-12">
                                    <select class="form-control select2" id="imp" data-val="true">
                                    </select>
                                    <span id="eimp" class="invalid-feedback"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 col-6 mt-md-5">
                            <label class="oculta">
                                <input type="checkbox" value="" id="comi">&nbsp;
                    Aplica Comisión
                            </label>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <!--<label>Puerto Origen</label>
                            <input type="text" class="form-control" data-val="true" id="ptoorg" />-->
                            <label>
                                Puerto Origen&nbsp;&nbsp;
                               
                                <button id="btnNvoPOrg" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                            <select id="ptoorg" class="form-control select2" data-val="true"></select>
                            <span id="eptoorg" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                          <!--abel>Puerto Destino</label>
                            <input type="text" class="form-control" data-val="true" id="ptodest" />-->
                             <label>
                               Puerto Destino&nbsp;&nbsp;
                               
                                <button id="btnNvoPDes" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                            <select id="ptodest" class="form-control select2" >

                            </select>
                            <span id="eptodest" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-12 form-group">
                            <!--agregado agencia aduana-->
                            <div class="col-md-6 col-12 form-group">
                            <label>Datos de Agencia de aduana</label>
                            <button id="baduana" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>
                            <div class="form-row">
                                <div class="col-12">
                                    <select class="form-control select2" id="aduana" data-val="true">
                                    </select>
                                    <span id="eaduana" class="invalid-feedback"></span>
                                </div>
                            </div>
                            </div>
                            <label>Observaciones</label>
                            <input type="text" class="form-control" id="obs" />
                            <span id="eobs" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-12 mb-2">
                            <label>Lista de productos</label>
                            <button class="btn btn-success btn-sm float-right" id="npro"><i class="fa fa-plus-circle"></i>&nbsp;Agregar Producto</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="stickyTable col-md-12 col-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-bordered table-hover table-striped" id="productos">
                                <thead>
                                    <tr>
                                        <th class="oculta">Id</th>
                                        <th class="text-center">Código</th>
                                        <th class="text-center oculta">Descripción</th>
                                        <th class="text-center">Und/Medida</th>
                                        <th class="text-center">Cantidad</th>
                                        <th class="text-center">Especie</th>
                                        <th class="text-center">Variedad</th>
                                        <th class="text-center">Calidad</th>
                                        <th class="text-center">Calibre</th>
                                        <th class="text-center">Embalaje</th>
                                        <th class="text-center">Etiqueta</th>
                                        <th class="text-center">Precio</th>
                                        <th class="text-center">Incoterm</th>
                                        <th class="text-center" style="display: none">Igv</th>
                                        <th class="text-center">Importe</th>
                                        <th class="text-center">Sub Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-md-2 col-12 offset-10">
                            <div class="row oculta">
                                <div class="col-12 text-center">
                                    <label class="mb-0 pb-0">Comisión ($)</label>
                                </div>
                                <div class="col clearfix d-inline-flex">
                                    <input type="checkbox" id="cov" class="mt-2" />&nbsp;<input type="text" class="form-control form-control-sm text-right" id="cvi" style="font-size: 80%" disabled="disabled" />
                                    <select id="cvo" class="form-control form-control-sm select2" style="font-size: 80%" disabled="disabled">
                                        <option value=""></option>
                                        <option value="1">x Und</option>
                                        <option value="2">Total</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-2 oculta">
                                <div class="col-12 text-center align-text-bottom">
                                    <label class="mb-0 pb-0 mt-2">Comisión (%)</label>
                                </div>
                                <div class="col clearfix d-inline-flex">
                                    <input type="checkbox" id="cop" class="mt-2" />&nbsp;<input type="text" class="form-control form-control-sm text-right" id="cpi" style="font-size: 80%" disabled="disabled" />
                                    <select id="cpo" class="form-control form-control-sm select2" style="font-size: 80%" disabled="disabled">
                                        <option value=""></option>
                                        <option value="1">x Und</option>
                                        <option value="2">Total</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row oculta mb-2">
                                <div class="col-12 text-center">
                                    <label class="mb-0 pb-0">Importe de Comisión</label>
                                </div>
                                <div class="col clearfix d-inline-flex">
                                    <input type="text" readonly="readonly" id="impc" class="form-control form-control-sm text-right" style="font-size: 80%" />
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-12 text-center">
                                    <label class="mb-0 pb-0">Total</label>
                                </div>
                                <div class="col clearfix d-inline-flex">
                                    <input type="text" readonly="readonly" id="total" class="form-control form-control-sm text-right" style="font-size: 95%; font-weight: bold;" />
                                </div>
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-info btn-sm" id="pdf" style="min-width: 120px"><i class="fa fa-file-pdf"></i>&nbsp; Enviar PDF</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div id="pack" class="tab-pane fade">
                    <div class="row">
                        <div class="col-9 form-group">
                            <label>Datos del Exportador</label>
                            <input type="text" class="form-control" readonly="readonly" id="lexp" />
                        </div>
                        <div class="col-3 form-group">
                            <label>RUC</label>
                            <input type="text" class="form-control" readonly="readonly" id="lruc" />
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>País (origen)</label>
                            <select class="form-control select2" id="lpai"></select>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>Tipo Embarque</label>
                            <select class="form-control select2" id="temb">
                                <option value=""></option>
                            </select>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>Nave</label>
                            <input class="form-control" type="text" id="nav" />
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>Fecha de Zarpe</label>
                            <input class="form-control datepicker" type="text" readonly="readonly" id="fza" />
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>Fecha Llegada</label>
                            <input class="form-control datepicker" type="text" readonly="readonly" id="fll" />
                        </div>
                        <div class="col-md-2 col-6 form-group" id="divfca">
                            <label>Fecha Ing. Cámara</label>
                            <input class="form-control datepicker" type="text" readonly="readonly" id="fca" />
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>Puerto Destino</label>
                            <input class="form-control" type="text" id="pud" />
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>Contenedor</label>
                            <input class="form-control" type="text" id="cont" />
                        </div>
                        <div class="col-md-2 col-6 form-group">
                           <!-- <label>Linea Naviera</label>
                            <input class="form-control" type="text" id="lin" />-->
                            <label>
                               Linea Naviera&nbsp;&nbsp;
                               
                                <button id="btnMLinea" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                            <select id="lin" class="form-control select2" data-val="true"></select>
                            <span id="elin" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>Peso Neto</label>
                            <input class="form-control" type="text" id="pne" />
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>Peso Bruto</label>
                            <input class="form-control" type="text" id="pbr" />
                        </div>
                        <div class="col-md-2 col-6 form-group" id="divcp">
                            <label>Condición de Pago</label>
                            <select class="form-control select2" id="lcp"></select>
                        </div>
                        <div class="col-md-2 col-6 form-group">
                            <label>BL</label>
                            <input class="form-control" type="text" id="bl" maxlength="20" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 col-12 mb-2">
                            <label>Lista de productos</label>
                            <button class="btn btn-success btn-sm float-right" id="nprolist"><i class="fa fa-plus-circle"></i>&nbsp;Agregar Producto</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 col-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-bordered table-hover table-striped" id="prodlist">
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
                                        <td class="text-center">Almacén</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-md-2 col-12">
                            <div class="row">
                                <div class="col-12 text-center form-group">
                                    <label>Adjuntar archivos:</label>
                                    <button class="btn btn-success btn-sm" style="min-width: 120px" id="upload"><i class="fa fa-upload"></i></button>
                                    <div class="progress progress-striped active" id="pgrLogo" hidden="hidden" data-nom="" style="clear: both">
                                        <div class="progress-bar progress-bar-success" id="pgrLogoD" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
                                            <span class="font-red" id="porLogo">Procesando...</span>
                                        </div>
                                    </div>
                                    <div class="m-0 p-0" style="max-height: 200px; overflow: auto">
                                        <table class="table table-sm table-bordered table-hover table-bordered mt-2 mb-0" id="archs" style="font-size: 80%">
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <label class="font-weight-bold mt-0" style="font-size: 14px">Máximo 10 archivos</label>
                                </div>
                                <div class="col-12  text-center mb-2">
                                    <button class="btn btn-primary btn-sm" style="min-width: 120px" id="glist"><i class="fa fa-save"></i>&nbsp; Guardar</button>
                                </div>
                                <div class="col-12 text-center mb-4">
                                   <!-- <button class="btn btn-warning btn-sm" style="min-width: 120px" id="reglist"><i class="fa fa-sign-out-alt"></i>&nbsp; Regresar</button>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-footer">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary btn-sm" style="min-width: 120px" id="gua"><i class="fa fa-save"></i>&nbsp; Guardar</button>
            </div>
        </div>
    </div>

    <div id="datosv" style="display: none">
        <!-- Tab headers -->
        <ul class="nav" role="tablist" id="tabv">
            <li class="nav-item tabulav" style="display: none">
                <a class="nav-link" data-toggle="tab" href="#infov" id="inbv">Información Básica</a>
            </li>
            <li class="nav-item tabulav" style="display: none">
                <a class="nav-link" data-toggle="tab" href="#packv" id="ipkv">Packing List</a>
            </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content" id="principalv">
            <div id="infov" class="tab-pane active">
                <input type="hidden" id="idrv" value="0" />
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3 col-6 form-group">
                                <label>Modalidad</label>
                                <select class="form-control" id="modv" data-val="true" disabled="disabled">
                                    <option value=""></option>
                                    <option value="1">Importación Directa</option>
                                    <option value="2">Importación Indirecta</option>
                                    <option value="3">Exportación Indirecta</option>
                                    <option value="4">Exportación Directa</option>

                                </select>
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Moneda</label>
                                <select class="form-control select2" id="monv" data-val="true" disabled="disabled"></select>
                            </div>
                            <div class="col-md-3 col-6 form-group">
                                <label>Fecha de Emisión</label>
                                <div class="input-group-prepend">
                                    <span class="input-group-text" style="border-top-right-radius: 0; border-bottom-right-radius: 0"><i class="fa fa-calendar"></i></span>
                                    <input type="text" class="form-control" style="border-bottom-left-radius: 0; border-top-left-radius: 0" id="fecv" readonly="readonly" />
                                </div>
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label># Pedido</label>
                                <input type="text" class="form-control" readonly="readonly" id="numv"/>
                             </div>
                            <div class="col-md-2 col-6 form-group">
                                 <label># Importación</label>
                                <input type="text" class="form-control" data-val="true" id="embv" readonly="readonly" />
            
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 col-12 checkbox">
                                <label>
                                    <input type="checkbox" value="" id="sigv" disabled="disabled" />
                                    Aplicar al siguiente periodo
                                </label>
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Mercado</label>
                                <select class="form-control select2" id="merv" data-val="true" disabled="disabled"></select>
                            </div>
                            <div class="col-md-2 col-6 form-group">
                              
                                <label>Tipo de Documento</label>
                                <input type="text" class="form-control" readonly="readonly" id="tdv" />
                            
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>País (Origen)</label>
                                <select id="paiv" class="form-control select2" data-val="true" disabled="disabled"></select>
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>País (Destino)</label>
                                <select id="paivd" class="form-control" data-val="true" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-12 form-group">
                                Datos de Exportador&nbsp;&nbsp;
                        <select class="form-control select2" id="expv" data-val="true" disabled="disabled">
                        </select>
                            </div>
                            <div class="col-md-2 col-6 mt-md-5">
                                <label class="oculta">
                                    <input type="checkbox" value="" id="comev" disabled="disabled" />&nbsp;
                    Aplica Comisión
                                </label>
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label># Proforma</label>
                                <input type="text" class="form-control" data-val="true" id="prov" readonly="readonly" />
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Condición de Pago</label>
                                <select class="form-control select2" id="cpv" data-val="true" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-12 form-group">
                                <label>Datos del Importador</label>
                                <select class="form-control select2" id="impv" data-val="true" disabled="disabled">
                                </select>
                            </div>
                            <div class="col-md-2 col-6 mt-md-5">
                                <label class="oculta">
                                    <input type="checkbox" value="" id="comiv" disabled="disabled" />&nbsp;
                    Aplica Comisión
                                </label>
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Puerto Origen</label>
                               <!-- <input type="text" class="form-control" data-val="true" id="ptoorgv" readonly="readonly" />-->
                                <select id="ptoorgv" class="form-control select2" disabled="disabled"></select>

                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Puerto Destino</label>
                                <!--<input type="text" class="form-control" data-val="true" id="ptodestv" readonly="readonly" />-->
                                 <select id="ptodestv" class="form-control select2"  disabled="disabled" > </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-12 form-group">
                            <!--agregado agencia aduana-->
                            <div class="col-md-6 col-12 form-group">
                            <label>Datos de Agencia de aduana</label>
                            <div class="form-row">
                                <div class="col-12">
                                    <select class="form-control select2" id="aduanav" data-val="true" disabled="disabled">
                                    </select>
                                    <span id="eaduanav" class="invalid-feedback"></span>
                                </div>
                            </div>
                            </div>
                                <label>Observaciones</label>
                                <input type="text" class="form-control" data-val="true" id="obsv" readonly="readonly" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-10 col-12 mb-2">
                                <label>Lista de productos</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-10 col-12 table-responsive table-responsive-sm">
                                <table class="table table-sm table-bordered table-hover table-striped" id="productosv">
                                    <thead>
                                        <tr>
                                            <td class="oculta">Id</td>
                                            <td class="text-center">Código</td>
                                            <td class="text-center oculta">Descripción</td>
                                            <td class="text-center">Und/Medida</td>
                                            <td class="text-center">Cantidad</td>
                                            <th class="text-center">Especie</th>
                                            <th class="text-center">Variedad</th>
                                            <th class="text-center">Calidad</th>
                                            <th class="text-center">Calibre</th>
                                            <th class="text-center">Embalaje</th>
                                            <th class="text-center">Etiqueta</th>
                                            <td class="text-center">Precio</td>
                                            <th class="text-center">Incoterm</th>
                                            <td class="text-center">Sub Total</td>
                                            <td class="text-center" style="display: none">Igv</td>
                                            <td class="text-center">Importe</td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div class="col-md-2 col-12">
                                <div class="row oculta">
                                    <div class="col-12 text-center">
                                        <label class="mb-0 pb-0">Comisión ($)</label>
                                    </div>
                                    <div class="col clearfix d-inline-flex">
                                        <input type="checkbox" id="covv" class="mt-2" disabled="disabled" />&nbsp;<input type="text" class="form-control form-control-sm text-right" id="cviv" style="font-size: 80%" readonly="readonly" />
                                        <select id="cvov" class="form-control form-control-sm select2" style="font-size: 80%" disabled="disabled">
                                            <option value=""></option>
                                            <option value="1">x Und</option>
                                            <option value="2">Total</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-2 oculta">
                                    <div class="col-12 text-center align-text-bottom">
                                        <label class="mb-0 pb-0 mt-2">Comisión (%)</label>
                                    </div>
                                    <div class="col clearfix d-inline-flex">
                                        <input type="checkbox" id="copv" class="mt-2" disabled="disabled" />&nbsp;<input type="text" class="form-control form-control-sm text-right" id="cpiv" style="font-size: 80%" readonly="readonly" />
                                        <select id="cpov" class="form-control form-control-sm select2" style="font-size: 80%" disabled="disabled">
                                            <option value=""></option>
                                            <option value="1">x Und</option>
                                            <option value="2">Total</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row oculta mb-2">
                                    <div class="col-12 text-center">
                                        <label class="mb-0 pb-0">Importe</label>
                                    </div>
                                    <div class="col clearfix d-inline-flex">
                                        <input type="text" readonly="readonly" id="impcv" class="form-control form-control-sm text-right" style="font-size: 80%" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 text-center mb-2">
                                        <button class="btn btn-danger btn-sm" id="pdfv" style="min-width: 120px"><i class="fa fa-file-pdf"></i>&nbsp; Enviar PDF</button>
                                    </div>
                                    <div class="col-12 text-center mb-4">
                                        <button class="btn btn-warning btn-sm" style="min-width: 120px" id="regv"><i class="fa fa-sign-out-alt"></i>&nbsp; Regresar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="packv" class="tab-pane fade">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-9 form-group">
                                <label>Datos del Exportador</label>
                                <input type="text" class="form-control" readonly="readonly" id="lexpv" />
                            </div>
                            <div class="col-3 form-group">
                                <label>RUC</label>
                                <input type="text" class="form-control" readonly="readonly" id="lrucv" />
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>País (origen)</label>
                                <select class="form-control select2" id="lpaiv" disabled="disabled"></select>
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Tipo Embarque</label>
                                <select class="form-control select2" id="tembv" disabled="disabled">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Nave</label>
                                <input class="form-control" type="text" id="navv" readonly="readonly" />
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Fecha de Zarpe</label>
                                <input type="text" class="form-control" style="border-bottom-left-radius: 0; border-top-left-radius: 0" id="fzav" readonly="readonly" />
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Fecha Llegada</label>
                                <input class="form-control" type="text" readonly="readonly" id="fllv" />
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Fecha Ing. Cámara</label>
                                <input class="form-control" type="text" readonly="readonly" id="fcav" />
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Puerto Destino</label>
                                <input class="form-control" type="text" id="pudv" readonly="readonly" />
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Contenedor</label>
                                <input class="form-control" type="text" id="contv" readonly="readonly" />
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Linea Naviera</label>
                               <!-- <input class="form-control" type="text" id="linv" readonly="readonly" />-->
                                <select id="linv" class="form-control select2" disabled="disabled"></select>
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Peso Neto</label>
                                <input class="form-control" type="text" id="pnev" readonly="readonly" />
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Peso Bruto</label>
                                <input class="form-control" type="text" id="pbrv" readonly="readonly" />
                            </div>
                            <div class="col-md-2 col-6 form-group">
                                <label>Condición de Pago</label>
                                <select class="form-control select2" id="lcpv" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-10 col-12 mb-2">
                                <label>Lista de productos</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-10 col-12 table-responsive table-responsive-sm">
                                <table class="table table-sm table-bordered table-hover table-striped" id="prodlistv">
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
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div class="col-md-2 col-12">
                                <div class="row">
                                    <div class="col-12 text-center mb-4">
                                        <button class="btn btn-primary btn-sm oculta" style="min-width: 120px" id="datfac">Documentos Electrónicos</button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 text-center mb-4">
                                        <button class="btn btn-warning btn-sm" style="min-width: 120px" id="reglistv"><i class="fa fa-sign-out-alt"></i>&nbsp; Regresar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-7 col-12">
                            </div>
                            <div class="col-md-3 col-12 pull-right">
                                <div class="row">
                                    <div class="col-4">
                                        <label style="margin-left: 30px;">SubTotal</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" class="text-right" id="txtsubTotal" style="margin-left: 30px" readonly="readonly" value="0.00" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <label style="margin-left: 30px;">Total</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" class="text-right" id="txtTotal" style="margin-left: 30px;" readonly="readonly" value="0.00" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2 col-12">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- modal importador -->
    <div class="modal fade" id="importa">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nuevo Importador</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-5 col-12 form-group">
                            <label>Razón Social</label>
                            <input type="text" class="form-control" id="irazs" data-val="true" />
                            <span id="eirazs" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-5 col-12 form-group">
                            <label>Razón Comercial</label>
                            <input type="text" class="form-control" id="irazc" data-val="true" />
                            <span id="eirazc" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 col-4 form-group">
                            <label>RUC</label>
                            <input type="text" class="form-control" id="iruc" data-val="true" />
                            <span id="eiruc" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 form-group">
                            <label>Dirección Fiscal</label>
                            <input type="text" class="form-control" id="idirf" />
                        </div>
                        <div class="col-12 form-group">
                            <label>Dirección Comercial</label>
                            <input type="text" class="form-control" id="idirc" />
                        </div>
                        <div class="col-md-6 col-12">
                            <label>Ubigeo</label>
                            <select id="iubi" class="form-control select2" data-val="true">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                    <div class="row pos">
                        <div class="col-12 my-3 align-content-center  text-right">
                            <button type="button" style="width: 180px" class="btn btn-primary mb-2" id="guaim"><i class="fa fa-save"></i>&nbsp;Guardar</button><br />
                            <button type="button" style="width: 180px" class="btn btn-danger" id="cani"><i class="fa fa-times-circle"></i>&nbsp;Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal prods -->
    <div class="modal fade" role="dialog" id="prods">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content" id="cuerpoPord">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titp">Agregar Producto</h4>
                </div>
                <!-- Modal body -->
                <div id="prodbody" class="modal-body">
                    <div class="row ">
                        <input type="text" class="form-control text-right" style="display: none" id="idp" />
                        <div class="col-md-2 form-group text-right">
                            <label>Producto</label>
                        </div>
                        <div class="col-md-10 form-group" id="combos">
                            <label>
                               <button id="addProd" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>
                            </label>
                            
                            <input type="text" id="nomp" style="width:100%;" class="form-control"/>
                     
                           <!-- <select class="form-control" style="position:relative;"  id="nomp"> </select>-->
                            <div id="nvoCombo" class="position-absolute bg-white form-control" style="width:800px; z-index:100; height:300px; overflow-y:scroll; font-size:13px;">

                            </div>
                            <span id="nompValidar" hidden class="text-danger" style="font-size: 70%; margin-top: .25rem">El campo es obligatorio</span>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row align-self-center">
                                <div class="col-md-4 form-group text-right">
                                    <label>Almacén</label>
                                </div>
                                <div class="col-md-8 form-group">
                                    <select id="alm" class="form-control select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="ealm" class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="row align-self-center">
                                <div class="col-md-4 form-group text-right">
                                    <label>Unidad/Medida</label>
                                </div>
                                <div class="col-md-8 form-group">
                                    <select class="form-control select2" id="ump"></select>
                                    <span id="eump" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-5 form-group" style="display: none">
                                    <label>Subtotal</label>
                                    <input type="text" class="form-control text-right" readonly="readonly" id="subp" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="row align-self-center">
                                <div class="col-md-4 form-group text-right">
                                    <label>Cantidad</label>
                                </div>
                                <div class="col-md-8 form-group">
                                    <input type="text" class="form-control text-right" data-val="true" id="cantp" />
                                    <span id="ecantp" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-2 form-group text-right" style="padding-top: 20px; display: none;" id="lbligv">
                                    <label>IGV</label>
                                </div>
                            </div>
                            <div class="row align-self-center">
                                <div class="col-md-4 form-group text-right">
                                    <label>Precio</label>
                                </div>
                                <div class="col-md-8 form-group">
                                    <input type="text" class="form-control text-right" data-val="true" id="prep" />
                                    <span id="eprep" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-3 form-group" style="display: none">
                                    <select id="ivg" class="form-control select2"></select>
                                    <span id="eivg" class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="row align-self-center">
                                <div class="col-md-4 form-group text-right">
                                    <label>Importe</label>
                                </div>
                                <div class="col-md-8 form-group text-right">
                                    <input type="text" class="form-control text-right" readonly="readonly" id="impp" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="agrp"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="canp"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal prods editar del packing list-->
    <div class="modal fade" role="dialog" id="prodse">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titpe">Edita Producto</h4>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <input type="text" class="form-control text-right" style="display: none" id="tdidprod" />
                        <input type="text" class="form-control text-right" style="display: none" id="idpe" />
                        <div class="col-md-2 form-group text-right">
                            <label>Producto</label>
                        </div>
                        <div class="col-md-10 form-group">
                            <select class="form-control select2" id="nompe"></select>
                            <span id="nompValidare" hidden class="text-danger" style="font-size: 70%; margin-top: .25rem">El campo es obligatorio</span>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row align-self-center">
                                <div class="col-md-4 form-group text-right">
                                    <label>Almacén</label>
                                </div>
                                <div class="col-md-8 form-group">
                                    <select id="alme" class="form-control select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="ealme" class="invalid-feedback select2"></span>
                                </div>
                            </div>
                            <div class="row align-self-center">
                                <div class="col-md-4 form-group text-right">
                                    <label>Unidad/Medida</label>
                                </div>
                                <div class="col-md-8 form-group">
                                    <select class="form-control select2" id="umpe"></select>
                                    <span id="eumpe" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-5 form-group" style="display: none">
                                    <label>Subtotal</label>
                                    <input type="text" class="form-control text-right" readonly="readonly" id="subpe" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row align-self-center">
                                <div class="col-md-4 form-group text-right">
                                    <label>Cantidad</label>
                                </div>
                                <div class="col-md-8 form-group">
                                    <input type="text" class="form-control text-right" data-val="true" id="cantpe" />
                                    <span id="ecantpe" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-2 form-group text-right" style="padding-top: 20px; display: none;" id="lbligv">
                                    <label>IGV</label>
                                </div>
                            </div>
                            <div class="row align-self-center">
                                <div class="col-md-4 form-group text-right">
                                    <label>Precio</label>
                                </div>
                                <div class="col-md-8 form-group">
                                    <input type="text" class="form-control text-right" data-val="true" id="prepe" />
                                    <span id="eprepe" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-3 form-group" style="display: none">
                                    <select id="ivge" class="form-control select2"></select>
                                    <span id="eivge" class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="row align-self-center">
                                <div class="col-md-4 form-group text-right">
                                    <label>Importe</label>
                                </div>
                                <div class="col-md-8 form-group text-right">
                                    <input type="text" class="form-control text-right" readonly="readonly" id="imppe" />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <!-- Modal footer -->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="agrpe"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="canpe"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- modal prodsimp -->
    <div class="modal fade" role="dialog" id="prodsimp">
        <div class="modal-dialog modal-dialog-centered" style="width: 86%;">
            <div class="modal-content" style="width: 100%;">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titpimp">Agregar Producto</h4>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <%--                    <div class="row">
                        <input type="text" class="form-control text-right" style="display: none" id="idpimp" />
                        <div class="col-md-4 form-group" style="display: none">
                            <label>Código</label>
                            <div class="input-group">
                                <input type="text" class="form-control text-right" id="codpimp" />
                                <span id="ecodpimp" class="invalid-feedback"></span>
                            </div>
                        </div>
                        <div class="col-md-10 form-group">
                            <label>Nombre Producto</label>
                            <input type="text" class="form-control text-right" id="nompimp" />
                            <span id="enompimp" class="invalid-feedback"></span>
                        </div>
                    </div>--%>
                    <div class="row align-self-center oculta">
                        <div class="col-md-4 form-group text-right">
                            <label>Nombre Producto</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" id="nompimp" />
                            <span id="enompimp" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Unidad/Medida</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <select class="form-control" id="umpimp"></select>
                            <span id="eumpimp" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-5 form-group" style="display: none">
                            <label>Subtotal</label>
                            <input type="text" class="form-control text-right" readonly="readonly" id="subpimp" />
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Cantidad</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" data-val="true" id="cantpimp" />
                            <span id="ecantpimp" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 form-group text-right" style="padding-top: 20px;" id="lbligvimp">
                            <label>IGV</label>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Precio</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" data-val="true" id="prepimp" />
                            <span id="eprepimp" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 form-group">
                            <select id="ivgimp" class="form-control select2"></select>
                            <span id="eivgimp" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Importe</label>
                        </div>
                        <div class="col-md-5 form-group text-right">
                            <input type="text" class="form-control text-right" readonly="readonly" id="imppimp" />
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Especie&nbsp;
                            <button id="nesp" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        </div>
                        <div class="col-md-5 form-group">
                            <select id="esp" class="form-control form-control-sm select2">
                                <option value=""></option>
                            </select>
                            <span id="eesp" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Variedad&nbsp;
                            <button id="nvar" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        </div>
                        <div class="col-md-5 form-group">
                            <select id="var" class="form-control form-control-sm select2">
                                <option value=""></option>
                            </select>
                            <span id="evar" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Incoterm</label>
                        </div>
                        <div class="col-md-5 form-group text-right">
                            <select class=" form-control" id="inter">
                                <option value="FOB">FOB</option>
                                <option value="FCA">FCA</option>
                                <option value="CIF">CIF</option>
                                <option value="CFR">CFR</option>
                                <%--<agregado />--%>
                                <option value="EX WORK">EX WORK</option>
                            </select>
                            <%--<input type="text" class="form-control text-right" id="inter" />--%>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Calidad</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" id="cali" />
                            <span id="ecali" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Calibre</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" id="cal" />
                            <span id="ecal" class="invalid-feedback"></span>
                        </div>
                    </div>
                   <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Etiqueta</label>
                        </div>
                        <div class="col-md-5 form-group text-right">
                            <input type="text" class="form-control text-right" id="grad" />
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Embalaje</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" id="embp" />
                            <span id="eembp" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="agrpimp"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="canpimp"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal prods importacion editar-->
    <div class="modal fade" role="dialog" id="prodsimpe">
        <div class="modal-dialog modal-dialog-centered" style="width: 86%;">
            <div class="modal-content" style="width: 100%;">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titpimpe">Agregar Producto</h4>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <input type="text" class="form-control text-right" style="display: none" data-val="true" id="tdidprodimp" />
                        <input type="text" class="form-control text-right" style="display: none" id="idpimpe" />

                        <div class="col-md-10 form-group">
                            <label>Nombre Producto</label>
                            <input type="text" class="form-control text-right" id="nompimpe" />
                            <span id="enompimpe" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Unidad/Medida</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <select class="form-control select2" id="umpimpe"></select>
                            <span id="eumpimpe" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-5 form-group" style="display: none">
                            <label>Subtotal</label>
                            <input type="text" class="form-control text-right" readonly="readonly" id="subpimpe" />
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Cantidad</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" data-val="true" id="cantpimpe" />
                            <span id="ecantpimpe" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 form-group text-right" style="padding-top: 20px; display: none;" id="lbligvimpe">
                            <label>IGV</label>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Precio</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" data-val="true" id="prepimpe" />
                            <span id="eprepimpe" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 form-group" style="display: none;">
                            <select id="ivgimpe" class="form-control"></select>
                            <span id="eivgimpe" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Importe</label>
                        </div>
                        <div class="col-md-5 form-group text-right">
                            <input type="text" class="form-control text-right" readonly="readonly" id="imppimpe" />
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Especie</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <select id="espe" class="form-control form-control-sm select2">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Variedad</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <select id="vare" class="form-control form-control-sm select2">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Incoterm</label>
                        </div>
                        <div class="col-md-5 form-group text-right">
                            <select class=" form-control" id="intere">
                                <option value="FOB">FOB</option>
                                <option value="FCA">FCA</option>
                                <option value="CIF">CIF</option>
                                <option value="CFR">CFR</option>
                            </select>
                            <%--<input type="text" class="form-control text-right" id="intere" />--%>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Calidad</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" id="calie" />
                            <span id="ecalie" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Calibre</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" id="cale" />
                            <span id="ecale" class="invalid-feedback"></span>
                        </div>
                    </div>
                     <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Etiqueta</label>
                        </div>
                        <div class="col-md-5 form-group text-right">
                            <input type="text" class="form-control text-right" id="grade" />
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Embalaje</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" id="embpe" />
                            <span id="eembpe" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 align-content-center">
                            <button type="button" style="width: 180px" class="btn btn-danger" id="canpimpe"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            <button type="button" style="width: 180px" class="btn btn-primary" id="agrpimpe"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MODALES -->

    <!-- modal especie -->
    <div class="modal fade" id="mespecie">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nueva Especie</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="offset-md-2 col-md-10 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control form-control-sm" id="desp" data-val="true" />
                            <span id="edesp" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guaesp"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="cane"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal variedad -->
    <div class="modal fade" id="mvariedad">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nueva Variedad</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="offset-md-1 col-10 form-group">
                            <label>Especie</label>
                            <select id="espv" class="form-control form-control-sm" data-val="true">
                                <option value=""></option>
                            </select>
                            <span id="eespv" class="invalid-feedback"></span>
                        </div>
                        <div class="offset-md-1 col-10 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control form-control-sm" id="vari" data-val="true" />
                            <span id="evari" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guavar"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="canvar"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal pdf -->
    <div class="modal fade" id="modpdf">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="/assets/global/img/logo.jpeg" class="img-fluid" />
                        </div>
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-6">
                                    <div class="col-6">
                                        <label id="pdfrs"></label>
                                    </div>
                                    <div class="col-6">
                                        <label id="pdfdir"></label>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6 text-md-right text-center">
                                    <div class="col-6">
                                        <label>No. Pedido</label>
                                        <label id="pdfnum"></label>
                                    </div>
                                    <div class="col-6">
                                        <label>Fecha de Emisión</label>
                                        <label id="pdffecha"></label>
                                    </div>

                                </div>
                                <%--<div class="col-12 col-md-6 text-md-right text-center">
                                    <button class="btn btn-primary btn-sm" id="pdfenv">Enviar</button>
                                    <button class="btn btn-danger btn-sm" id="pdfcan">Cancelar</button>
                                </div>--%>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Contacto</label>
                            <input type="text" readonly="readonly" id="pdfers" class="form-control" />
                        </div>
                        <div class="col-md-4 form-group">
                            <label>Correo Electrónico</label>
                            <input type="email" readonly="readonly" id="pdfecor" class="form-control" />
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-2 form-group">
                            <label># Embarque</label>
                            <input type="text" readonly="readonly" id="pdfemb" class="form-control" />
                        </div>
                        <div class="col-md-2 form-group">
                            <label>País (Origen)</label>
                            <input type="text" readonly="readonly" id="pdfpais" class="form-control" />
                        </div>
                        <div class="col-md-2 form-group">
                            <label>Mercado</label>
                            <input type="text" id="pdfmercado" readonly="readonly" class="form-control" />
                        </div>
                        <div class="col-md-2 offset-md-4">
                            <label>#Proforma</label>
                            <input type="text" class="form-control" readonly="readonly" id="pdfpro" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-bordered table-hover table-striped" id="pdfprods">
                                <thead>
                                    <tr>
                                        <td class="text-center">Descripción</td>
                                        <td class="text-center">Und/Medida</td>
                                        <td class="text-center">Cantidad</td>
                                        <td class="text-center">Precio</td>
                                        <td class="text-center">Sub Total</td>
                                        <td class="text-center">Igv</td>
                                        <td class="text-center">Importe</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <hr />
                    <div class="row px-2">
                        <div class="col-12 bg-gray-300">
                            <label>Datos del Exportador</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Razón Fiscal</label>
                            <input type="text" readonly="readonly" class="form-control" id="pdfenom" />
                        </div>
                        <div class="col-md-4">
                            <label>RUC</label>
                            <input type="email" readonly="readonly" class="form-control" id="pdfeccor" />
                        </div>
                        <div class="col-md-4">
                            <label>Dirección Fiscal</label>
                            <input type="text" readonly="readonly" class="form-control" id="pdfecraz" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Nombre Contacto</label>
                            <input type="text" readonly="readonly" class="form-control" id="pdfedirs" />
                        </div>
                        <div class="col-md-4">
                            <label>Teléfono|Celular</label>
                            <input type="text" readonly="readonly" class="form-control" id="pdfetels" />
                        </div>
                        <div class="col-md-4">
                            <label>Email</label>
                            <input type="text" readonly="readonly" class="form-control" id="pdfeemail" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--Modal reporte pdf-->
    <div class="modal fade" id="ModalReporte" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="Reportelabel" style="text-align: center;"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="col-12">
                    <div class="form-inline float-left" style="padding-top: 5px; padding-bottom: 5px;">
                        <label for="op" class="mr-sm-2">Correos:</label>
                        <input type="hidden" id="pathEmail">
                        <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Correos" id="envcorr">
                        <button class="btn btn-primary mb-2 btn-sm float-right" id="env"><i class="fa fa-envelope"></i>&nbsp;Enviar</button>
                    </div>
                </div>
                <div class="modal-body" id="ContentReporte">
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>

    <!-- modal facturas -->
    <div class="modal fade" id="mfacturas">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Documentos Electrónicos</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="form">
                        <%--                            <label for="op" class="mr-sm-2">Filtrar por:</label>
                                <select class="form-control form-control-sm mb-2 mr-sm-2" id="filtrarSelectdoc">
                                    <option value="0">Todos</option>
                                    <option value="1">Razón Social</option>
                                    <option value="2">RUC</option>
                                    <option value="3">Fecha Emisión</option>
                                </select>
                                <input type="text" id="filtroFechaInicioD" class="form-control form-control-sm mb-2 mr-sm-2 datepicker" style="display: none" />
                                <input type="text" id="filtroFechaFinD" class="form-control form-control-sm mb-2 mr-sm-2 datepicker" style="display: none" />
                                <input type="text" id="filtroTodosD" placeholder="Buscar todo" class="form-control form-control-sm mb-2 mr-sm-2" />
                                <input type="text" id="filtroValorD" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Buscar" style="display: none">--%>
                        <div class="row">
                            <div class="col-md-2 col-12">
                                <label for="op" class="mr-sm-2">Fecha Emision:</label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 col-12">
                                <input type="text" class="form-control datepicker" id="filtroFechaInicioD" data-val="true" readonly="readonly" />
                            </div>
                            <div class="col-md-4 col-12">
                                <input type="text" class="form-control datepicker" id="filtroFechaFinD" data-val="true" readonly="readonly" />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-4 col-12">
                                <input type="text" id="filtroValorRUC" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="RUC">
                            </div>
                            <div class="col-md-4 col-12">
                                <input type="text" id="filtroValorRSocial" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Razon Social">
                            </div>
                            <div class="col-md-2 col-12">
                                <button id="filtrarBtnD" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2 float-left"><i class="fa fa-search"></i></button>
                                <button id="restablecerFiltrosD" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm float-left"><i class="fas fa-undo"></i></button>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="form-inline float-left">
                            </div>
                            <button class="btn btn-primary mb-2 btn-sm float-right" id="nuefac"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-12 table-responsive">
                            <div id="infofac"></div>
                        </div>
                        <div id="txtRegistrosD" class="col-12 text-right">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal nueva facturas -->
    <div class="modal fade" id="mnuefacturas">
        <div class="modal-dialog modal-dialog-centered modal-xxl">
            <div class="modal-content modal-xxl">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Registro de Costos - Doc. Electrónico</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div id="doce">
                        <div class="row">
                            <div class="col-4 ">
                                <div class="row">
                                    <div class="col form-group">
                                        <label><i class="fa fa-globe"></i>&nbsp;Tipo de Doc. Electrónico</label>
                                        <select id="tcf" class="form-control select2" data-val="true">
                                            <option value=""></option>
                                        </select>
                                        <span id="etcf" class="invalid-feedback"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-5" id="divtcif">
                                <div class="row">
                                    <div class="col form-group">
                                        <label>Tipo de Costo de Importación</label>
                                        <select id="tcif" class="form-control select2" data-val="true">
                                            <option value="0"></option>
                                            <option value="1">Flete Marino</option>
                                            <option value="5">Flete Terrestre</option>
                                            <option value="2">Gastos de Operador</option>
                                            <option value="3">Otros</option>
                                            <option value="4">Por Producto</option>
                                        </select>
                                        <span id="etcif" class="invalid-feedback"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3 ">
                                <div class="row">
                                    <div class="col form-group">
                                        <label><i class="fa fa-calendar"></i>&nbsp;Fecha Emisión</label>
                                        <input type="text" class="form-control datepicker" id="fecf" data-val="true" readonly="readonly" />
                                        <span id="efec" class="invalid-feedback"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 py-3">
                                <div class="row">
                                    <div class="col form-group">
                                        <label><i class="fa fa-barcode"></i>&nbsp;Serie</label>
                                        <input type="text" class="form-control" data-val="true" id="serf" />
                                        <span id="eserf" class="invalid-feedback"></span>
                                    </div>
                                    <div class="col form-group">
                                        <label><i class="fa fa-file-alt"></i>&nbsp;Número</label>
                                        <input type="text" class="form-control numeros" data-val="true" id="numf" maxlength="10" />
                                        <span id="enumf" class="invalid-feedback"></span>
                                    </div>

                                    <div class="col form-group">
                                        <label><i class="fa fa-money-bill"></i>&nbsp;Moneda</label>
                                        <select id="monf" data-val="true" class="form-control totales select2">
                                        </select>
                                        <span id="emonf" class="invalid-feedback"></span>
                                    </div>
                                    <div class="col form-group">
                                        <label><i class="fa fa-calendar"></i>&nbsp;Fecha Vencimiento</label>
                                        <input type="text" class="form-control datepicker" id="fecvig" data-val="true" readonly="readonly" />
                                        <span id="efevig" class="invalid-feedback"></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 col-12 form-group">
                                        <label>DUA</label>
                                        <input type="text" class="form-control" data-val="false" id="dua" />
                                        <span id="duaf" class="invalid-feedback"></span>
                                    </div>
                                    <div class="col-md-4 col-12 form-group">
                                        <label>Tipo de RUC</label>
                                        <select id="tdom" data-val="false" class="form-control totales select2">
                                            <option value="0" selected>Seleccione</option>
                                            <option value="1">Domiciliado</option>
                                            <option value="2">No Domiciliado</option>
                                        </select>
                                        <span id="tdomf" class="invalid-feedback"></span>
                                    </div>
                                    <div class="col-md-4 col-12 form-group">
                                        <label>Guia Traslado</label>
                                        <input type="text" class="form-control" data-val="false" id="guia" />
                                        <span id="guiaf" class="invalid-feedback"></span>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-12 border-bottom">
                                        DATOS DEL PROVEEDOR
                                    <button id="nprov" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>
                                    </div>
                                    <div class="col-12 py-3">
                                        <div class="row">
                                            <div class="col form-group" style="display: none">
                                                <label><i class="fa fa-user"></i>&nbsp;Tipo Doc. Ident.</label>
                                                <select class="form-control" id="docf" data-val="false">
                                                    <option value=""></option>
                                                    <option value="DNI">DNI</option>
                                                    <option value="RUC">RUC</option>
                                                    <option value="RUS">RUS</option>
                                                    <option value="OTRO">OTRO</option>
                                                </select>
                                                <span id="edoc" class="invalid-feedback"></span>
                                            </div>
                                            <div class="col-12">
                                                <label><i class="fa fa-pencil-alt"></i>&nbsp;No. de RUC</label>
                                                <div class="input-group">
                                                    <select id="idpro" class="form-control select2" data-val="true">
                                                        <option value=""></option>
                                                    </select>
                                                    <span id="eidpro" class="invalid-feedback"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12" id="ncfac">
                        <div class="col-12 border-bottom">
                            Facturas Asociadas
                        </div>
                        <div class="row col-md-12 col-12">
                            <div class="col-12 col-md-4 form-group">
                                <label><i class="fa fa-globe"></i>&nbsp;Factura Asociada</label>
                                <select class="form-control select2" id="facaso">
                                </select>
                            </div>
                            <div class="col-12 col-md-3 form-group">
                                <label><i class="fa fa-calendar"></i>&nbsp;Fecha Doc.</label>
                                <input type="text" class="form-control" id="fecfac" readonly="readonly" />
                            </div>
                            <div class="col-12 col-md-3 form-group">
                                <label><i class="fa fa-money-bill"></i>&nbsp;Importe</label>
                                <input type="text" class="form-control" id="montfac" readonly="readonly" />
                            </div>
                            <div class="col-12 col-md-2 form-group" style="padding-top: 30px;">
                                <button class="btn btn-blue-madison btn-sm float-right" id="agrefacas"><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                            </div>
                        </div>
                        <div class="col-12 col-md-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-bordered table-hover table-striped" id="facas">
                                <thead>
                                    <tr>
                                        <td style="display: none">Id</td>
                                        <td class="text-center">Factura</td>
                                        <td class="text-center">Fecha</td>
                                        <td class="text-center">Importe</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody id="tfacasbody"></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-12" id="divchk">
                        <input type="radio" id="cxc" name="tipom" value="1">
                        <label for="cxcg">Costo por Caja&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type="radio" id="mt" name="tipom" value="2">
                        <label for="cxccr">Monto Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type="radio" id="ig" name="tipom" value="3">
                        <label for="cxig">Importe General&nbsp;&nbsp;&nbsp;</label>
                    </div>
                    <div class="row col-md-12 col-12">
                        <div class="col-12 col-md-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-bordered table-hover table-striped" id="productosf">
                                <thead>
                                    <tr>
                                        <td style="display: none">Id</td>
                                        <td class="text-center">Código</td>
                                        <td class="text-center">Und/Medida</td>
                                        <td class="text-center">Descripción</td>
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
                        <div class="col-md-4 col-4" id="divcomision">
                            <div class="row oculta">
                                <div class="col-12 text-center">
                                    <label class="mb-0 pb-0">Comisión ($)</label>
                                </div>
                                <div class="col clearfix d-inline-flex">
                                    <input type="checkbox" id="covvdf" class="mt-2" />&nbsp;<input type="text" class="form-control form-control-sm text-right" id="cvivdf" style="font-size: 80%" />
                                    <select id="cvovdf" class="form-control form-control-sm select2" style="font-size: 80%">
                                        <option value=""></option>
                                        <option value="1">x Und</option>
                                        <option value="2">Total</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-2 oculta">
                                <div class="col-12 text-center align-text-bottom">
                                    <label class="mb-0 pb-0 mt-2">Comisión (%)</label>
                                </div>
                                <div class="col clearfix d-inline-flex">
                                    <input type="checkbox" id="copvdf" class="mt-2" />&nbsp;<input type="text" class="form-control form-control-sm text-right" id="cpivdf" style="font-size: 80%" />
                                    <select id="cpovdf" class="form-control form-control-sm select2" style="font-size: 80%">
                                        <option value=""></option>
                                        <option value="1">x Und</option>
                                        <option value="2">Total</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row oculta mb-2">
                                <div class="col-12 text-center">
                                    <label class="mb-0 pb-0">Importe</label>
                                </div>
                                <div class="col clearfix d-inline-flex">
                                    <input type="text" readonly="readonly" id="impcvdf" class="form-control form-control-sm text-right" style="font-size: 80%" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-4" style="display: none">
                            <div class="row">
                                <div class="col-5">
                                    <label>Importe Factura</label>
                                </div>
                                <div class="col-5 text-right">
                                    <input type="text" id="impfac" class="form-control" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-5">
                                    <label>Cantidad</label>
                                </div>
                                <div class="col-5 text-right">
                                    <input type="text" id="cantf" class="form-control" readonly="readonly" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-5 ">
                                    <label>Costo Unitario</label>
                                </div>
                                <div class="col-5 text-right">
                                    <input type="text" id="cosuni" class="form-control" readonly="readonly" />
                                </div>
                            </div>
                        </div>
                        <div class="row mb-6 offset-9">
                            <div class="col-4" style="margin-bottom: 10px;">
                                <label>Sub-Total:</label>
                            </div>
                            <div class="col-8" style="margin-bottom: 10px;">
                                <input type="text" readonly="readonly" id="subtotalde" class="form-control text-right" style="font-size: 95%; font-weight: bold;" />
                            </div>
                            <div class="col-4" style="margin-bottom: 10px;">
                                <label>Total:</label>
                            </div>
                            <div class="col-8" style="margin-bottom: 10px;">
                                <input type="text" readonly="readonly" id="totalde" class="form-control text-right" style="font-size: 95%; font-weight: bold;" />
                            </div>
                        </div>

                    </div>
                </div>
                <!-- Modal footer -->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guaf"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="canf"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- modal edita facturas -->
    <div class="modal fade" id="meditfacturas">
        <div class="modal-dialog modal-dialog-centered modal-xxl">
            <div class="modal-content modal-xxl">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Edición Reg Costos - Doc. Electrónico</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-4 ">
                            <input type="hidden" class="form-control" id="iddocreg" data-val="true" />
                            <input type="hidden" class="form-control" id="idfac" data-val="true" />
                            <input type="hidden" class="form-control" id="tipome" data-val="true" />
                            <div class="row">
                                <div class="col form-group">
                                    <label><i class="fa fa-globe"></i>&nbsp;Tipo de Comprobante</label>
                                    <select id="tcfe" class="form-control select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="etcfe" class="invalid-feedback"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-5" id="divtcife">
                            <div class="row">
                                <div class="col form-group">
                                    <label>Tipo de Costo de Importación</label>
                                    <select id="tcife" class="form-control select2" data-val="true">
                                        <option value="0"></option>
                                        <option value="1">Flete Marino</option>
                                        <option value="2">Gastos de Operador</option>
                                        <option value="3">Otros</option>
                                        <option value="4">Por Producto</option>
                                    </select>
                                    <span id="etcife" class="invalid-feedback"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-3 ">
                            <div class="row">
                                <div class="col form-group">
                                    <label><i class="fa fa-calendar"></i>&nbsp;Fecha Emisión</label>
                                    <input type="text" class="form-control datepicker" id="fecfe" data-val="true" readonly="readonly" />
                                    <span id="efece" class="invalid-feedback"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-3">
                            <div class="row">
                                <div class="col form-group">
                                    <label><i class="fa fa-barcode"></i>&nbsp;Serie</label>
                                    <input type="text" class="form-control" data-val="true" id="serfe" />
                                </div>
                                <div class="col form-group">
                                    <label><i class="fa fa-file-alt"></i>&nbsp;Número</label>
                                    <input type="text" class="form-control" data-val="true" id="numfe" />
                                </div>
                                <div class="col form-group">
                                    <label><i class="fa fa-money-bill"></i>&nbsp;Moneda</label>
                                    <select id="monfe" data-val="true" class="form-control totales select2">
                                    </select>
                                    <span id="emonfe" class="invalid-feedback"></span>
                                </div>
                                <div class="col form-group">
                                    <label><i class="fa fa-calendar"></i>&nbsp;Fecha Vencimiento</label>
                                    <input type="text" class="form-control datepicker" id="fecvige" data-val="true" readonly="readonly" />
                                    <span id="efevige" class="invalid-feedback"></span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 border-bottom">
                                    DATOS DEL PROVEEDOR
                                    <button id="nprove" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>
                                </div>
                                <div class="col-12 py-3">
                                    <div class="row">
                                        <div class="col form-group" style="display: none">
                                            <label><i class="fa fa-user"></i>&nbsp;Tipo Doc. Ident.</label>
                                            <select class="form-control select2" id="docfe" data-val="true">
                                                <option value=""></option>
                                                <option value="DNI">DNI</option>
                                                <option value="RUC">RUC</option>
                                                <option value="RUS">RUS</option>
                                                <option value="OTRO">OTRO</option>
                                            </select>
                                            <span id="edoce" class="invalid-feedback"></span>
                                        </div>
                                        <div class="col-12">
                                            <label><i class="fa fa-pencil-alt"></i>&nbsp;No. de RUC</label>
                                            <div class="input-group">
                                                <select id="idproe" class="form-control select2" data-val="true">
                                                    <option value=""></option>
                                                </select>
                                                <span id="eidproe" class="invalid-feedback"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12" id="divchke">
                                    <input type="radio" id="cxce" name="tipome" value="1">
                                    <label for="cxcg">Costo por Caja&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    <input type="radio" id="mte" name="tipome" value="2">
                                    <label for="cxccr">Monto Total&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <div class="row col-md-12 col-12">
                                    <div class="col-12 col-md-12 table-responsive table-responsive-sm">
                                        <table class="table table-sm table-bordered table-hover table-striped" id="productosedit">
                                            <thead>
                                                <tr>
                                                    <td style="display: none">Id</td>
                                                    <td class="text-center">Código</td>
                                                    <td class="text-center">Descripción</td>
                                                    <td class="text-center">Und/Medida</td>
                                                    <td class="text-center" style="display: none">Cantidad</td>
                                                    <td class="text-center">Precio</td>
                                                    <td class="text-center">Sub Total</td>
                                                    <td class="text-center">Igv</td>
                                                    <td class="text-center">Importe</td>
                                                </tr>
                                            </thead>
                                            <tbody id="tproductosfebody"></tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-4 col-4" id="divcomisione" style="display: none">
                                        <div class="row oculta">
                                            <div class="col-12 text-center">
                                                <label class="mb-0 pb-0">Comisión ($)</label>
                                            </div>
                                            <div class="col clearfix d-inline-flex">
                                                <input type="checkbox" id="covvdfe" class="mt-2" />&nbsp;<input type="text" class="form-control form-control-sm text-right" id="cvivdfe" style="font-size: 80%" />
                                                <select id="cvovdfe" class="form-control form-control-sm select2" style="font-size: 80%">
                                                    <option value=""></option>
                                                    <option value="1">x Und</option>
                                                    <option value="2">Total</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row mb-2 oculta">
                                            <div class="col-12 text-center align-text-bottom">
                                                <label class="mb-0 pb-0 mt-2">Comisión (%)</label>
                                            </div>
                                            <div class="col clearfix d-inline-flex">
                                                <input type="checkbox" id="copvdfe" class="mt-2" />&nbsp;<input type="text" class="form-control form-control-sm text-right" id="cpivdfe" style="font-size: 80%" />
                                                <select id="cpovdfe" class="form-control form-control-sm select2" style="font-size: 80%">
                                                    <option value=""></option>
                                                    <option value="1">x Und</option>
                                                    <option value="2">Total</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row oculta mb-2">
                                            <div class="col-12 text-center">
                                                <label class="mb-0 pb-0">Importe</label>
                                            </div>
                                            <div class="col clearfix d-inline-flex">
                                                <input type="text" readonly="readonly" id="impcvdfe" class="form-control form-control-sm text-right" style="font-size: 80%" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-4" style="display: none">
                                        <div class="row">
                                            <div class="col-5">
                                                <label>Importe Factura</label>
                                            </div>
                                            <div class="col-5 text-right">
                                                <input type="text" id="impface" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5">
                                                <label>Cantidad</label>
                                            </div>
                                            <div class="col-5 text-right">
                                                <input type="text" id="cantfe" class="form-control" readonly="readonly" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5 ">
                                                <label>Costo Unitario</label>
                                            </div>
                                            <div class="col-5 text-right">
                                                <input type="text" id="cosunie" class="form-control" readonly="readonly" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-6 offset-9">
                                        <div class="col-4" style="margin-bottom: 10px;">
                                            <label>Sub-Total:</label>
                                        </div>
                                        <div class="col-8" style="margin-bottom: 10px;">
                                            <input type="text" readonly="readonly" id="subtotalded" class="form-control text-right" style="font-size: 95%; font-weight: bold;" />
                                        </div>
                                        <div class="col-4" style="margin-bottom: 10px;">
                                            <label>Total:</label>
                                        </div>
                                        <div class="col-8" style="margin-bottom: 10px;">
                                            <input type="text" readonly="readonly" id="totalded" class="form-control text-right" style="font-size: 95%; font-weight: bold;" />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
                <!-- Modal footer -->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guafe"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="canfe"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- modal nuevo proveedor -->
    <div class="modal fade" id="proveedor">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nuevo Proveedor</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-2 col-6 form-group">
                            <label>Tipo de Documento</label>
                            <select class="form-control select2" id="tdf" data-val="true">
                                <option value=""></option>
                                <option value="1">RUC</option>
                                <option value="2">DNI</option>
                                <option value="3">Carnet de Extranjería</option>
                                <option value="4">Pasaporte</option>
                                <option value="5">Otro</option>
                            </select>
                            <span id="etdf" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 col-4 form-group">
                            <label>RUC</label>
                            <input type="text" class="form-control" id="rucpf" data-val="true" />
                            <span id="erucpf" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-4 col-12 form-group">
                            <label>Razón Social</label>
                            <input type="text" class="form-control" id="razsf" />
                            <span id="erazsf" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-4 col-12 form-group">
                            <label>Razón Comercial</label>
                            <input type="text" class="form-control" id="razcf" />
                            <span id="erazcf" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 form-group">
                            <label>Dirección Fiscal</label>
                            <input type="text" class="form-control" id="dirff" />
                        </div>
                        <div class="col-12 form-group">
                            <label>Dirección Comercial</label>
                            <input type="text" class="form-control" id="dircf" />
                        </div>
                        <div class="col-md-6 col-12">
                            <label>Ubigeo</label>
                            <select id="ubipf" class="form-control select2" data-val="true">
                                <option value=""></option>
                            </select>
                        </div>
                        <div class="col-md-6 col-12">
                            <label>Tipo</label>
                            <select id="tipf" class="form-control select2" data-val="true">
                                <option value="">Selecciona el tipo</option>
                                <option value="1">Exportador</option>
                                <option value="2">Importador</option>
                                <option value="3">Local</option>
                                <option value="4">Propio</option>
                            </select>
                            <span id="etip" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row pos">
                        <div class="col-md-6 my-3 align-content-center">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guaprov"><i class="fa fa-save"></i>&nbsp;Guardar</button>
                            <button type="button" style="width: 180px" class="btn btn-danger" id="canprov"><i class="fa fa-times-circle"></i>&nbsp;Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--MODAL PRODUCTO Y VARIEDADES AGREGAR-->
      <div class="modal fade" id="ModalproductoR">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Agregar productos</h4>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
             </div>    

                <!-- Modal body -->
                      <div class="modal-body">
                  
        <div class="card-body">
            <div class="row">
                <div class="col-md-3 col-6 form-group">
                    <label>Código</label>
                    <input type="text" class="form-control form-control-sm" id="copro" data-val="true" maxlength="5" />
                    <span id="ecopro" class="invalid-feedback"></span>
                </div>
                <%--            <div class="col-md-3 col-6">
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" value="" id="chkde" name="chkde">Producto insumo| Servicio
                    </label>
                </div>
              <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" value="" id="chkela" name="chkela">producto elaborado
                    </label>
                </div>
            </div>--%>
                <div class="col-md-3 col-6 form-group">
                    <label>Tipo</label>
                    <select class="form-control form-control-sm mb-2 mr-sm-2" id="tipo">
                        <option value="1">Insumo </option>
                        <option value="2">Servicio</option>
                        <option value="3">Producto Elaborado</option>
                    </select>
                </div>

            </div>
            <div id="datosesp">
                <div class="row">
                    <div class="col-md-3 col-6 form-group">
                        <label>
                            Especie
                   
                        <button id="nesp" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        <select id="especieP" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="eesp" class="invalid-feedback"></span>
                    </div>
                    <div class="col-md-3 col-6 form-group">
                        <label>
                            Variedad
                   
                        <button id="nvar" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        <select id="variedadP" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="evar" class="invalid-feedback"></span>
                    </div>
                    <div class="col-md-3 col-6 form-group">
                        <label>
                            Calidad                
                   
                        <button id="ncali" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        <select id="calidadP" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="ecalip" class="invalid-feedback"></span>
                    </div>
                    <div class="col-md-3 col-6 form-group">
                        <label>
                            Calibre
                   
                        <button id="ncal" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        <select id="calibreP" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="ecaliP" class="invalid-feedback"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 col-6 form-group">
                        <label>
                            Etiqueta
                   
                        <button id="neti" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        <select id="eti" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="eeti" class="invalid-feedback"></span>
                    </div>
                    <div class="col-md-3 col-6 form-group">
                        <label>
                            Embalaje
                   
                        <button id="nemb" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        <select id="embajaleP" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="eembP" class="invalid-feedback"></span>
                    </div>
                    <div class="col-md-3 col-6 form-group">
                        <label>
                            Unidad de Medida.
                   
                        <button id="um" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        <select id="medidaP" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="eum" class="invalid-feedback"></span>
                    </div>
                    <div class="col-md-3 col-6 form-group">
                        <label>
                            Peso
                   
                        <button id="npeso" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        <select id="peso" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="epeso" class="invalid-feedback"></span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-10 col-12 form-group">
                    <label>Descripción</label>
                    <input type="text" class="form-control form-control-sm" id="descri" data-val="true" />
                    <span id="Edescri" class="invalid-feedback"></span>
                </div>
                <div class="col-md-3 col-12 form-group">
                    <label>Estado</label>
                    <select class="form-control" id="stp" data-val="true">
                        <option value=""></option>
                        <option value="1">Activo</option>
                        <option value="2">Inactivo</option>
                    </select>
                    <span id="estp" class="invalid-feedback"></span>
                </div>
                <div class="col-md-6 col-12">
                    <div class="row" style="margin-top: 25px;">
                        <div class="col-12 col-md-3">
                            <label>1 CAJA EQUIVALE A:</label>
                        </div>
                        <div class="col-12 col-md-3 form-group">
                            <input type="text" class="form-control form-control-sm" id="cant" data-val="true" />
                            <span id="ecant" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 col-md-3">
                            <label>UNIDADES</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end float-right">
                <button class="btn btn-primary btn-sm" id="guardarProd" style="margin-top: 32px;"><i class="fa fa-save"></i>&nbsp;Guardar</button>
                &nbsp;
                <button class="btn btn-warning btn-sm" id="can" style="margin-top: 32px;"><i class="fa fa-sign-out-alt"></i>&nbsp;Cancelar</button>
            </div>
        </div>
                </div>
            </div>
        </div>
    </div>
     <!-- modal especie -->
    <div class="modal fade" id="mespecie">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nueva Especie</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="offset-md-2 col-md-10 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control form-control-sm" id="desp" data-val="true" />
                            <span id="eimpfd" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guaesp"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="cane"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal variedad -->
    <div class="modal fade" id="mvariedad">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nueva Variedad</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="offset-md-1 col-10 form-group">
                            <label>Especie</label>
                            <select id="espv" class="form-control form-control-sm" data-val="true">
                                <option value=""></option>
                            </select>
                            <span id="eespv" class="invalid-feedback"></span>
                        </div>
                        <div class="offset-md-1 col-10 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control form-control-sm" id="vari" data-val="true" />
                            <span id="evari" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guavar"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="canvar"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal calidad -->
    <div class="modal fade" id="mcalidad">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nueva Calidad</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="offset-md-1 col-10 form-group">
                            <label>Especie</label>
                            <select id="espc" class="form-control form-control-sm" data-val="true">
                                <option value=""></option>
                            </select>
                            <span id="eespc" class="invalid-feedback"></span>
                        </div>
                        <div class="offset-md-1 col-10 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control form-control-sm" id="calid" data-val="true" />
                            <span id="ecalid" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guacal"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="cancal"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal calibre -->
    <div class="modal fade" id="mcalibre">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nuevo Calibre</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="offset-md-2 col-md-10 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control form-control-sm" id="calibd" data-val="true" />
                            <span id="ecalibd" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guacalib"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="cancalib"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal etiqueta -->
    <div class="modal fade" id="metiqueta">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nueva Etiqueta</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="offset-md-2 col-md-10 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control form-control-sm" id="etid" data-val="true" />
                            <span id="eetid" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guaeti"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="caneti"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal embalaje -->
    <div class="modal fade" id="membalaje">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nuevo Embalaje</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="offset-md-2 col-md-10 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control form-control-sm" id="embd" data-val="true" />
                            <span id="eembd" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guaemb"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="canemb"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal unidad de medida -->
    <div class="modal fade" id="munidadmedida">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nueva Unidad de Medida</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="offset-md-2 col-md-10 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control form-control-sm" id="umd" data-val="true" />
                            <span id="eumd" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guaum"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="canum"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- modal peso -->
    <div class="modal fade" id="mpeso">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nuevo Peso</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="offset-md-2 col-md-8 form-group">
                            <label>Peso</label>
                            <input type="text" class="form-control form-control-sm" id="pes" data-val="true" />
                            <span id="epes" class="invalid-feedback"></span>
                        </div>
                        <div class="offset-md-2 col-md-8 form-group">
                            <label>Nomenclatura</label>
                            <input type="text" class="form-control form-control-sm" id="nom" data-val="true" />
                            <span id="enom" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guapeso"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="canpeso"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!---fin modales productos->

    <!-- modal costo -->
    <div class="modal fade" id="costos">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Costos de Importación</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row" id="fletem">
                        <div class="col-12 mb-1">
                            <div class="row">
                                <div class="col-12 pr-0 col-md-3 col-lg-2 align-self-center mb-0">
                                    <h4 class="m-0">Flete Marino</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 pb-1 col-6 form-group mb-0">
                                    <label class="mb-0">Tipo</label>
                                    <select class="form-control form-control-sm select2" id="tipfl" data-val="true">
                                        <option value=""></option>
                                        <option value="1">Tarifa por Caja</option>
                                        <option value="2">Monto Final</option>
                                    </select>
                                    <span id="etipf" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-2 pb-1 col-6 form-group mb-0">
                                    <label class="mb-0">Unidad de Medida</label>
                                    <select class="form-control form-control-sm select2" id="umfl" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="eumfl" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-2 pb-1 col-6 form-group mb-0">
                                    <label class="mb-0">Importe</label>
                                    <input type="text" class="form-control form-control-sm text-right" id="impf" data-val="true" />
                                    <span id="eimpf" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-2 pb-1 col-6 form-group mb-0">
                                    <label class="mb-0">Desde</label>
                                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="def" data-val="true" />
                                    <span id="edef" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-2 pb-1 col-6 form-group  mb-0">
                                    <label class="mb-0">Hasta</label>
                                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="hasf" data-val="true" />
                                    <span id="ehasf" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-1 pl-0 pb-1 col-lg-2 col-12 align-self-end text-center text-md-left">
                                    <button class="btn btn-primary btn-sm" id="guafl">Guardar</button>
                                    <button class="btn btn-danger btn-sm" id="canfl" style="display: none">Cancelar</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-12 table-responsive">
                                <div id="fmarino"></div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="row" id="gastos">
                        <div class="col-12 mb-1">
                            <div class="row">
                                <div class="col-12 pr-0 col-md-6 col-lg-6 align-self-center mb-0">
                                    <h4 class="m-0">Gastos de Operador</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 pb-1 col-6 form-group mb-0">
                                    <label class="my-0">Tipo</label>
                                    <select class="form-control form-control-sm select2" id="tipg" data-val="true">
                                        <option value=""></option>
                                        <option value="1">Tarifa por Caja</option>
                                        <option value="2">Monto Final</option>
                                    </select>
                                    <span id="etipg" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-2 pb-1 col-6 form-group mb-0">
                                    <label class="mb-0">Unidad de Medida</label>
                                    <select class="form-control form-control-sm select2" id="umg" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="eumg" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-2 pb-1 col-6 form-group mb-0">
                                    <label class="my-0">Importe</label>
                                    <input type="text" class="form-control form-control-sm text-right" id="impg" data-val="true" />
                                    <span id="eimpg" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-2 pb-1 col-6 form-group mb-0">
                                    <label class="my-0">Desde</label>
                                    <input type="text" class="form-control form-control-sm" readonly="readonly" id="deg" data-val="true" />
                                    <span id="edeg" class="invalid-feedback"></span>
                                </div>
                                <div class="col-md-2 pb-1 col-6 form-group mb-0">
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
                        <div class="row">
                            <div class="col-12 table-responsive">
                                <div id="gasto"></div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" id="idf" value="0" />
                    <input type="hidden" id="idg" value="0" />
                </div>
            </div>
        </div>
    </div>

    <!-- MODALES DE PUERTOS - ORIGEN Y DESTINO -LINEA NAVIERA -->
        <!-- modal nuevo puerto Origen -->
    <div class="modal fade" id="mpOrigen">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title"></h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4 col-12 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control" id="descPuerto" data-val="true" />
                            <span id="edescPuerto" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guapuerto"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
						<button type="button" style="width: 180px" class="btn btn-warning" id="canpuerto"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="mpLineaNaviera">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">LINEA NAVIERA</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4 col-12 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control" id="descLinea" data-val="true" />
                            <span id="edescLinea" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="guaLinea"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
						<button type="button" style="width: 180px" class="btn btn-warning" id="canLinea"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="mpDocument">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title"></h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 col-12 form-group">
                            <embed id="viewDocument" src=""
                               frameborder="0" width="100%" height="400px">
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">                    
                </div>

            </div>
        </div>
    </div>


    <input type="file" id="anexo" style="display: none;" accept="application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" multiple="multiple" />
    <input type="hidden" id="idr" value="0" />
    <input type="hidden" id="limps" value="" />
    <input type="hidden" id="tabla" value="" />
    <%--<input type="hidden" id="idpro" value="0" />--%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.31.3/js/jquery.tablesorter.min.js"></script>
    <script src='/assets/global/plugins/jquery-file-upload/js/vendor/jquery.ui.widget.js' type='text/javascript'></script>
    <script src='/assets/global/plugins/jquery-file-upload/js/jquery.iframe-transport.js' type='text/javascript'></script>
    <script src='/assets/global/plugins/jquery-file-upload/js/jquery.fileupload.js' type='text/javascript'></script>
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/monedas.js"></script>
    <script src="/assets/global/js/numeros.js"></script>
    <script src="/assets/global/js/cat/almacen.js"></script>
    <script src="/assets/global/js/cat/moneda.js"></script>
    <script src="/assets/global/js/cat/mercado.js"></script>
    <script src="/assets/global/js/cat/pais.js"></script>
    <script src="/assets/global/js/cat/condpago.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/js/upAnexo.js"></script>
    <script src="/assets/global/plugins/select2/select2.min.js"></script>
    <script src="/assets/global/js/cat/impexp.js"></script>
    <script src="/assets/global/pages/js/impd.js"></script>  
    <script src="/assets/global/pages/js/PuertosOD.js"></script>
     <script src="/assets/global/pages/js/LineaNaviera.js"></script>

</asp:Content>
