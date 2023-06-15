<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="compras.aspx.cs" Inherits="SanAlberto.pages.vtas.compras" %>

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
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Registros de Compras
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->
    <%--Card Lista Compras--%>
    <div id="lista" class="card">
        <div class="card-header">
            <div class="row">
                <div class="col">
                    <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                        <h6 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">
                            <i class="fa fa-shopping-bag"></i>&nbsp;Lista de Compras - Productos
                        </h6>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-8 col-m-8">
                    <div class="row">
                        <div class="col">
                            <label for="ocValor" class="mr-sm-2">Numero</label>
                            <input type="text" id="compraValor" placeholder="Num Compra" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="ocValor" class="mr-sm-2">Proveedor</label>
                            <input type="text" id="proveedorValor" placeholder="Proveedor" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="ocValor" class="mr-sm-2">RUC</label>
                            <input type="text" id="rucValor" placeholder="RUC" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="ocValor" class="mr-sm-2">Estado</label>
                            <select id="bedo" class="form-control form-control-sm mb-2 mr-sm-2">
                                <option value="">Todos</option>
                                <option value="1">Nuevo</option>
                                <option value="2">Anulado</option>
                                <option value="3">Facturado</option>
                            </select>
                        </div>
                        <div class="col">
                            <div class="row">
                                <label for="" class="mr-sm-1">&nbsp</label>
                            </div>
                            <div class="row">
                                <button id="bus" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2"><i class="fa fa-search"></i></button>
                                <button id="restablecerFiltros" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm float-right"><i class="fas fa-undo"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 col-m-4">
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
                    <div id="ordenes"></div>
                </div>
            </div>

        </div>
        <%--        <div class="row">
            <div class="col-12">
                <div class="form-inline float-left" id="busqueda">
                    <label for="op" class="mr-sm-2">Filtrar por:</label>
                    <select class="form-control form-control-sm mb-2 mr-sm-2" id="opc">
                        <option value="">Todos</option>
                        <option value="1">Número </option>
                        <option value="3" hidden="hidden">Fecha Emisión</option>
                        <option value="5">Estado</option>
                        <option value="4">Proveedor</option>
                        <option value="6">RUC</option>
                    </select>
                    <input type="text" readonly="readonly" id="bfec" class="form-control form-control-sm mb-2 mr-sm-2" style="display: none" />
                    <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Buscar" id="bval" style="display: none" />
                    <select id="bedo" class="form-control form-control-sm mb-2 mr-sm-2" style="display: none">
                        <option value="">Todos</option>
                        <option value="1">Nuevo</option>
                        <option value="2">Anulado</option>
                        <option value="3">Facturado</option>
                    </select>
                    <button class="btn btn-primary btn-sm mb-2 mr-sm-2" id="bus"><i class="fa fa-search"></i></button>
                </div>
                <button class="btn btn-primary mb-2 btn-sm float-right" id="nue"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
            </div>
        </div>--%>
    </div>
    <%--FIN Lista Compras--%>
    <br />
    <%--Lista Ordenes Compra--%>
    <div hidden id="listaoc" class="card">
        <div class="card-header">
            <div class="row">
                <div class="col">
                    <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                        <h6 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">
                            <i class="fa fa-shopping-bag"></i>&nbsp;Lista Ordenes de Compra
                            <img src="/assets/global/img/loader_blue.gif" class="loader" />
                        </h6>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-8 col-m-8">
                    <div class="row">
                        <div class="col">
                            <label for="ocValor" class="mr-sm-2">Numero</label>
                            <input type="text" id="ocValor" placeholder="Num Compra" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="ocValor" class="mr-sm-2">Proveedor</label>
                            <input type="text" id="proveedorOcValor" placeholder="Proveedor" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="ocValor" class="mr-sm-2">RUC</label>
                            <input type="text" id="rucOcValor" placeholder="RUC" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="ocValor" class="mr-sm-2">Estado</label>
                            <select id="ocbedo" class="form-control form-control-sm mb-2 mr-sm-2">
                                <option value="">Todos</option>
                                <option value="1">Nuevo</option>
                                <option value="2">Anulado</option>
                                <option value="3">Facturado</option>
                            </select>
                        </div>
                        <div class="col">
                            <div class="row">
                                <label for="" class="mr-sm-1">&nbsp</label>
                            </div>
                            <div class="row">
                                <button id="busoc" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2"><i class="fa fa-search"></i></button>
                                <button id="restablecerFiltrosoc" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm float-right"><i class="fas fa-undo"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 col-m-4">
                    <div class="row">
                        <label for="" class="mr-sm-2">&nbsp</label>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button class="btn btn-success btn-sm  ml-2 mb-2 float-right" id="nueoc"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 table-responsive">
                    <div id="ordenesoc"></div>
                </div>
            </div>
        </div>
    </div>
    <%--Fin Lista Ordenes Compra--%>

    <%--Registro de Compras--%>
    <div id="info" class="card" style="display: none">
        <div class="card-header">
            <div class="row">
                <div class="col-12 col-sm-12">
                    <h5 class="card-title">
                        <i class="fa fa-shopping-bag"></i>&nbsp;Compra de Productos
                            <img src="/assets/global/img/loader_blue.gif" class="loader" />
                    </h5>
                </div>

            </div>
        </div>
        <div class="card-body">
            <div class="form-group">
                 <div class="row  ml-3">    
                    <div class="float-left mr-4">
                        <label class=" col-form-label">Año</label>
                        <input id="filtroAnio" type="text" class="form-control numeros" placeholder="Filtro año" style="width:100px" />
                    </div>
                    <div class="float-right w-75">
                       <label class=" col-form-label">
                        <i class="fa fa-file-alt"></i>&nbsp;Importación/Exportación
                       </label>
                       <select class="form-control select2"  id="imp" disabled="disabled"> </select>
                   </div>
                 </div>
                <br /> <br />   
                <!--agregado asignacion-->
                <label class="col-sm-3 col-form-label  ml-1"> % Asignación </label>
                 <div class=" input-group-append">
                <input type="text" maxlength="3" id="asignacion" class="form-control w-25 mr-3 numeros  ml-3"/>
                     <button class="btn btn-success btn-sm float-right" id="agregaImp"><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                     </div>
                <br />
                <div class="col-12 table-responsive table-responsive-sm">
                <table class="table table-sm table-bordered table-hover table-striped" id="tableImp">
                    <thead>
                      <!--  <tr>
                            <td class="text-center" colspan="4">Importaciones</td>
                        </tr>-->
                        <tr>
                            <td class="text-center"># Importación</td>
                            <td class="text-center">% Asignación</td>
                            <td class="text-center">Monto Asignado</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>


            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="card-header">
                    <h5 class="card-title">Datos Comprobante</h5>
                </div>
                <div class="card-body">
                    <div class="form-group row">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" value="" id="chkcg" name="chkcg">Compra Genérica
                            </label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Tipo de Comprobante</label>
                        <div class="col-sm-8">
                            <select id="tc" class="form-control select2" data-val="true">
                                <option value=""></option>
                            </select>
                            <span id="etc" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Condicion de Pago</label>
                        <div class="col-sm-8">
                            <select class="form-control select2" id="cp" data-val="true"></select>
                            <span id="ecp" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card-header">
                    <h5 class="card-title">Datos de Orden de Compra</h5>
                </div>
                <div class="card-body">
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-4 col-form-label"><i class="fa fa-barcode"></i>&nbsp;Serie</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="serie" readonly="readonly" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-4 col-form-label"><i class="fa fa-file-alt"></i>&nbsp;Numero</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control numeros" id="numero" maxlength="10" readonly="readonly" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-4 col-form-label"><i class="fa fa-calendar"></i>&nbsp;Fecha Doc</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="fec" data-val="true" readonly="readonly" />
                            <span id="efec" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-4 col-form-label"><i class="fa fa-calendar"></i>&nbsp;Fecha Vigencia</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="fecvig" data-val="true" readonly="readonly" />
                            <span id="efecvig" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-4 col-form-label"><i class="fa fa-money-bill"></i>&nbsp;Moneda</label>
                        <div class="col-sm-8">
                            <select id="mon" data-val="true" class="form-control totales select2">
                            </select>
                            <span id="emon" class="invalid-feedback"></span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <div class="card-header">
                    <h5 class="card-title">Tipo de Costos</h5>
                </div>
                <div class="card-body">
                    <div class="col form-group row">
                        <label class="col-sm-4 col-form-label"><i class="fa fa-money-bill"></i>&nbsp;Tipo de Costos Importación</label>
                        <div class="col-sm-8">
                            <select id="tcimp" class="form-control">
                                <option value="0"></option>
                                <option value="1">Flete Marino</option>
                                <option value="5">Flete Terrestre</option>
                                <option value="2">Gastos de Operador</option>
                                <option value="3">Otros</option>
                                <option value="4">Por Producto</option>
                            </select>
                            <span id="etcimp" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="col form-group row">
                        <label class="col-sm-4 col-form-label"><i class="fa fa-money-bill"></i>&nbsp;Tipo de Costo Transporte</label>
                        <div class="col-sm-8">
                            <select id="tctrans" class="form-control select2">
                            </select>
                            <span id="etctrans" class="invalid-feedback"></span>
                        </div>

                    </div>
                    <div class="col form-group row">
                        <label class="col-sm-4 col-form-label"><i class="fa fa-money-bill"></i>&nbsp;Tipo de Costo Punto Entrega</label>
                        <div class="col-sm-8">
                            <select id="tcptoe" class="form-control">
                            </select>
                            <span id="etcptoe" class="invalid-feedback"></span>
                        </div>

                    </div>
                    <div class="col form-group row">
                        <label class="col-sm-4 col-form-label"><i class="fa fa-money-bill"></i>&nbsp;Tipo de Costo Almacenaje</label>
                        <div class="col-sm-8">
                            <select id="tcalm" class="form-control">
                                <option value="0"></option>
                                <option value="1">Costo Almacenaje</option>
                                <option value="2">Desestiba y Estiba</option>
                                <option value="3">Refacturacion</option>
                            </select>
                            <span id="etcalm" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card-header">
                    <div class="row">
                        <div class="col-5">
                            <h5 class="card-title">Datos del Proveedor </h5>
                        </div>
                        <div class="col-7">
                            <button id="nprov" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50">[+ Nuevo]</button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col form-group row">
                        <label class="col-sm-4 col-form-label"><i class="fa fa-id-card"></i>&nbsp;Razon Social</label>
                        <div class="col-sm-8">
                            <select id="exp" class="form-control select2" data-val="true">
                            </select>
                            <span id="eexp" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="col form-group row">
                        <label class="col-sm-4 col-form-label"><i class="fa fa-home"></i>&nbsp;Dirección</label>
                        <div class="col-sm-8">
                            <input type="text" id="dir" class="form-control" />
                        </div>
                    </div>
                    <div class="col form-group row">
                        <label class="col-sm-4 col-form-label"><i class="fa fa-globe"></i>&nbsp;Ubiego</label>
                        <div class="col-sm-8">
                            <select id="ubic" class="form-control select2" data-val="true">
                                <option value=""></option>
                            </select>
                            <span id="eubic" class="invalid-feedback"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">

                <div class="col-12">
                    LISTA DE PRODUCTOS
            <button class="btn btn-success btn-sm float-right mb-2" id="npro"><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                </div>
                <div class="col-12 table-responsive table-responsive-sm">
                    <table class="table table-sm table-bordered table-hover table-striped" id="productos">
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
                                <td></td>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="col-12 border-bottom">
                    DETALLE DOCUMENTO
                </div>
                <div class="col-md-6 col-12 py-3">
                    <div class="row">
                        <div class="col-md-4 col-12 form-group">
                            <label><i class="fa fa-percentage"></i>&nbsp;Descuento Porcentaje</label>
                            <div class="input-group">
                                <input type="text" id="des" class="form-control totales" />
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-12 form-group">
                            <label><i class="fa fa-warehouse"></i>&nbsp;Almacén</label>
                            <select id="alm" class="form-control select2" data-val="true">
                                <option value=""></option>
                            </select>
                            <span id="ealm" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-4 col-12 form-group">
                            <label><i class="fa fa-hand-holding-usd"></i>&nbsp;Gravada</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fa fa-dollar-sign"></i></span>
                                </div>
                                <input type="text" id="gra" class="form-control totales" />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-12 form-group">
                            <label><i class="fa fa-book"></i>&nbsp;Observaciones</label>
                            <textarea rows="6" class="form-control" id="obs"></textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-12"></div>
                <div class="col-md-3 col-12">
                    <div class="row">
                        <div class="col-12 border-bottom pt-3">
                            <label class="font-weight-bold">RESUMEN</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 border-bottom  pt-2">
                            <label>Gravada</label>
                        </div>
                        <div class="col-6 border-bottom text-right  pt-2">
                            <label id="sgram"></label>
                            <label id="gram">0.0</label>
                        </div>
                        <div class="col-6 border-bottom  pt-2">
                            <label>IGV (18%)</label>
                        </div>
                        <div class="col-6 border-bottom text-right  pt-2">
                            <label id="sivgm"></label>
                            <label id="ivgm">0.0</label>
                        </div>
                        <div class="col-6 border-bottom  pt-2">
                            <label><span class="text-danger">(-)</span> Descuento Total</label>
                        </div>
                        <div class="col-6 border-bottom text-right  pt-2">
                            <label id="sdesm"></label>
                            <label id="desm">0.0</label>
                        </div>
                        <div class="col-6 border-bottom  pt-2">
                            <label>Total</label>
                        </div>
                        <div class="col-6 border-bottom text-right  pt-2">
                            <label id="stot"></label>
                            <label id="tot">0.0</label>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-12"></div>
            </div>
        </div>
        <div class="card-footer">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-success btn-sm float-right" style="min-width: 120px; display: none" id="datfac">Datos de Facturas</button>

                <button class="btn btn-primary btn-sm" style="min-width: 120px" id="gua"><i class="fa fa-save"></i>&nbsp; Guardar</button>
                <button class="btn btn-info btn-sm" id="act" style="min-width: 120px; display: none;"><i class="fa fa-file-save"></i>&nbsp;Actualizar</button>
                <button class="btn btn-warning btn-sm" style="min-width: 120px" id="can"><i class="fa fa-sign-out-alt"></i>&nbsp; Regresar</button>
            </div>
            <%--            <div class="col-12 text-center">
                <button class="btn btn-danger btn-sm float-right" style="min-width: 120px; display: none" id="datfac">Datos de Facturas</button>
                <button class="btn btn-primary btn-sm" id="gua"><i class="fa fa-save"></i>&nbsp;GUARDAR</button>
                <button class="btn btn-primary btn-sm" id="act" style="display: none"><i class="fa fa-save"></i>&nbsp;ACTUALIZAR</button>
                <button class="btn btn-danger btn-sm" id="can"><i class="fa fa-times-circle"></i>&nbsp;CANCELAR</button>
            </div>--%>
        </div>
    </div>
    <%--Fin Registro de Compras--%>

    <div id="infov" class="card" style="display: none">
        <div class="card-header">
            <h6 class="card-title"><i class="fa fa-shopping-bag"></i>&nbsp;Compras - Productos
                <img src="/assets/global/img/loader_blue.gif" class="loader" /></h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <label><i class="fa fa-file-alt"></i>&nbsp;Importación/Exportación</label>
                    <select id="impv" class="form-control" disabled="disabled">
                        <option value=""></option>
                    </select>
                        <br />   
                <!--agregado asignacion-->
                <label class="col-sm-3 col-form-label"> % Asignación </label>
                 <div class=" input-group-append">
                <input type="text" maxlength="3" id="asignacionv" class="form-control w-25 mr-3" disabled="disabled"/>
                 </div>
                <br />
                <div class="col-12 table-responsive table-responsive-sm">
                <table class="table table-sm table-bordered table-hover table-striped" id="tableImpv">
                    <thead>
                      <!--  <tr>
                            <td class="text-center" colspan="4">Importaciones</td>
                        </tr>-->
                        <tr>
                            <td class="text-center"># Importación</td>
                            <!--<td class="text-center">Importe</td>-->
                            <td class="text-center">% Asignación</td>
                            <td class="text-center">Monto Asignado</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
                </div>
              

            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="card-header">
                        <h5 class="card-title">Datos Comprobante</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-4 col-form-label">Tipo de Comprobante</label>
                            <div class="col-sm-8">
                                <select id="tcv" class="form-control select2" data-val="true" disabled="disabled">
                                    <option value=""></option>
                                </select>
                                <span id="etcv" class="invalid-feedback"></span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-4 col-form-label">Condicion de Pago</label>
                            <div class="col-sm-8">
                                <select class="form-control select2" id="cpv" data-val="true" disabled="disabled"></select>
                                <span id="ecpv" class="invalid-feedback"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card-header">
                        <h5 class="card-title">Datos Factura de Compra</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-4 col-form-label"><i class="fa fa-barcode"></i>&nbsp;Serie</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="serv" readonly="readonly" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-4 col-form-label"><i class="fa fa-file-alt"></i>&nbsp;Número</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="numv" readonly="readonly" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-4 col-form-label"><i class="fa fa-calendar"></i>&nbsp;Fecha Doc.</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="fecv" data-val="true" readonly="readonly" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-4 col-form-label"><i class="fa fa-calendar"></i>&nbsp;Fecha Vigencia</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="fecvigv" data-val="true" readonly="readonly" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-4 col-form-label"><i class="fa fa-money-bill"></i>&nbsp;Moneda</label>
                            <div class="col-sm-8">
                                <select id="monv" data-val="true" class="form-control totales select2" disabled="disabled">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card-header">
                        <h5 class="card-title">Datos Del Proveedor</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 py-3">
                                <div class="row">
                                    <div class="col form-group">
                                        <label><i class="fa fa-user"></i>&nbsp;Tipo Doc. Ident.</label>
                                        <select class="form-control" id="docv" data-val="true" disabled="disabled">
                                            <option value=""></option>
                                            <option value="2">DNI</option>
                                            <option value="1">RUC</option>
                                            <option value="3">RUS</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <label><i class="fa fa-pencil-alt"></i>&nbsp;No. de RUC</label>
                                        <div class="input-group">
                                            <input type="text" id="rucv" class="form-control" data-val="true" readonly="readonly" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12">
                                        <label><i class="fa fa-id-card"></i>&nbsp;Razón Social</label>
                                        <div class="input-group">
                                            <input type="text" id="expv" class="form-control" data-val="true" readonly="readonly" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12">
                                        <label><i class="fa fa-home"></i>&nbsp;Dirección</label>
                                        <input type="text" id="dirv" class="form-control" readonly="readonly" />
                                    </div>
                                    <div class="col-md-6 col-12">
                                        <label><i class="fa fa-globe"></i>&nbsp;Ubigeo</label>
                                        <select id="ubiv" class="form-control select2" data-val="true" disabled="disabled">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                LISTA DE PRODUCTOS
                            </div>
                            <div class="col-12 table-responsive table-responsive-sm">
                                <table class="table table-sm table-bordered table-hover table-striped" id="productosv">
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
                            <div class="col-12 border-bottom">
                                DETALLE DOCUMENTO
                            </div>
                            <div class="col-md-6 col-12 py-3">
                                <div class="row">
                                    <div class="col-md-4 col-12 form-group">
                                        <label><i class="fa fa-percentage"></i>&nbsp;Descuento Porcentaje</label>
                                        <div class="input-group">
                                            <input type="text" id="desv" class="form-control totales" readonly="readonly" />
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fa fa-percent"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-12 form-group">
                                        <label><i class="fa fa-warehouse"></i>&nbsp;Almacén</label>
                                        <select id="almv" class="form-control select2" disabled="disabled">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                    <div class="col-md-4 col-12 form-group">
                                        <label><i class="fa fa-hand-holding-usd"></i>&nbsp;Gravada</label>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fa fa-dollar-sign"></i></span>

                                            </div>
                                            <input type="text" id="grav" class="form-control totales" readonly="readonly" />
                                        </div>
                                    </div>
                                    <div class="col-12 form-group">
                                        <label><i class="fa fa-book"></i>&nbsp;Observaciones</label>
                                        <textarea class="form-control" id="obsv" readonly="readonly"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="row">
                                    <div class="col-12 border-bottom pt-3">
                                        <label class="font-weight-bold">RESUMEN</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 border-bottom  pt-2">
                                        <label>Gravada</label>
                                    </div>
                                    <div class="col-6 border-bottom text-right  pt-2">
                                        <label id="sgramv"></label>
                                        <label id="gramv">0.0</label>
                                    </div>
                                    <div class="col-6 border-bottom  pt-2">
                                        <label>IGV (18%)</label>
                                    </div>
                                    <div class="col-6 border-bottom text-right  pt-2">
                                        <label id="sivgmv"></label>
                                        <label id="ivgmv">0.0</label>
                                    </div>
                                    <div class="col-6 border-bottom  pt-2">
                                        <label><span class="text-danger">(-)</span> Descuento Total</label>
                                    </div>
                                    <div class="col-6 border-bottom text-right  pt-2">
                                        <label id="sdesmv"></label>
                                        <label id="desmv">0.0</label>
                                    </div>
                                    <div class="col-6 border-bottom  pt-2">
                                        <label>Total</label>
                                    </div>
                                    <div class="col-6 border-bottom text-right  pt-2">
                                        <label id="stotv"></label>
                                        <label id="totv">0.0</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-warning btn-sm float-right" id="canv"><i class="fa fa-sign-out-alt"></i>&nbsp;CANCELAR</button>
            </div>
        </div>
    </div>
    <!-- modal prods -->
    <div class="modal fade" id="prods">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" id="cuerpoPord">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titp">Agregar Producto</h4>
                </div>

                <!-- Modal body -->
                <div class="modal-body" id="prodbody">
                    <div class="row">
                        <div class="col-md-5 col-6">
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="checkbox" class="form-check-input" value="" id="chkde" name="chkde">Producto General
                                </label>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div class="row align-self-center">
                        <input type="text" class="form-control text-right d-none" id="idpro" />
                        <input type="text" class="form-control text-right d-none" id="codp" />
                        <div class="col-md-4 form-group text-right">
                            <label>Producto</label>
                        </div>
                        <div class="col-md-8 form-group" id="combos">
                            <!--<select class="form-control select2" id="nomp"></select>-->
                             <input type="text" id="nomp" style="width:100%;" class="form-control"/>
                            <div id="nvoCombo" class="position-absolute bg-white form-control" style="width:700px; z-index:100; height:300px; overflow-y:scroll; font-size:13px;">

                            </div>


                            <span id="enomp" class="invalid-feedback"></span>
                            <span id="nompValidar" hidden class="text-danger" style="font-size: 70%; margin-top: .25rem">El campo es obligatorio</span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Unidad/Medida</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <select class="form-control select2" id="ump"></select>
                            <span id="eump" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-5 form-group" style="display: none">
                            <label>Subtotal</label>
                            <input type="text" class="form-control text-right" readonly="readonly" id="subp" />
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Cantidad</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" data-val="true" id="cantp" />
                            <span id="ecantp" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 form-group text-right" style="padding-top: 20px;" id="lbligv">
                            <label>IGV</label>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Precio</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <input type="text" class="form-control text-right" data-val="true" id="prep" />
                            <span id="eprep" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 form-group">
                            <select id="ivg" class="form-control select2"></select>
                            <span id="eivg" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Importe</label>
                        </div>
                        <div class="col-md-5 form-group text-right">
                            <input type="text" class="form-control text-right" readonly="readonly" id="impp" />
                        </div>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" class="btn btn-success float-right" id="agrp"><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                        <button type="button" class="btn btn-warning float-right" id="canp"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal proveedores-->
    <div class="modal fade" id="provs">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="title_provider">Seleccione un Proveedor</h4>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-hover table-striped border" id="proveedores">
                                <thead>
                                    <tr>
                                        <td class="text-center">Razón Social</td>
                                        <td class="text-center w-25">RUC</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row pos">
                        <div class="col">
                            <div class="mt-2">
                                <button type="button" class="btn btn-danger" id="canpr" style="width: 175px"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal prodse -->
    <div class="modal fade" id="prodse">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titpe">Editar Producto</h4>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <input type="text" class="form-control text-right" style="display: none" data-val="true" id="tdid" />
                        <input type="text" class="form-control text-right" style="display: none" data-val="true" id="idproe" />
                        <div class="col-12 form-group">
                            <label>Nombre Producto</label>
                            <select class="form-control" id="nompe select2"></select>
                            <span id="enompe" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col form-group">
                            <label>Unidad/Medida</label>
                            <select class="form-control" id="umpe" data-val="true" name="unmedida"></select>
                            <span id="eumpe" class="invalid-feedback"></span>
                        </div>
                        <div class="col form-group">
                            <label>Subtotal</label>
                            <input type="text" class="form-control text-right" readonly="readonly" id="subpe" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col form-group">
                            <label>Cantidad</label>
                            <input type="text" class="form-control text-right" data-val="true" id="cantpe" />
                            <span id="ecantpe" class="invalid-feedback"></span>
                        </div>
                        <div class="col form-group">
                            <label>Ivg</label>
                            <select id="ivge" class="form-control select2"></select>
                            <span id="eivge" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col form-group">
                            <label>Precio</label>
                            <input type="text" class="form-control text-right" data-val="true" id="prepe" />
                            <span id="eprepe" class="invalid-feedback"></span>
                        </div>
                        <div class="col form-group">
                            <label>Importe</label>
                            <input type="text" class="form-control text-right" readonly="readonly" id="imppe" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="row">
                        <div class="col-12 float-right">
                            <button type="button" class="btn btn-primary" id="agrpe" style="width: 175px"><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                            &nbsp;
                            <button type="button" class="btn btn-warning" id="canpe" style="width: 175px"><i class="fa fa-sign-out-alt"></i>&nbsp;Cerrar</button>

                        </div>
                    </div>
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
                    <h4 class="modal-title">Datos de Facturación</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-inline float-left">
                            </div>
                            <button class="btn btn-primary mb-2 btn-sm float-right" id="nuefac"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 table-responsive">
                            <div id="infofac"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                        <div class="col-6 py-3">
                            <div class="row">
                                <div class="col-md-6 col-12">
                                    <label><i class="fa fa-globe"></i>&nbsp;Tipo de Comprobante</label>
                                </div>
                                <div class="col-md-6 col-12">
                                    <select id="tcf" class="form-control select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="etcf" class="invalid-feedback"></span>
                                </div>
                            </div>
                        </div>

                        <div class="col-6 py-3" id="divtcif">
                            <div class="row">
                                <div class="col-md-6 col-12">
                                    <label>Tipo de Costo de Importación</label>
                                </div>
                                <div class="col-md-6 col-12">
                                    <select id="tcif" class="form-control" data-val="true">
                                        <option value="0"></option>
                                        <option value="1">Flete Marino</option>
                                        <option value="2">Gastos de Operador</option>
                                        <option value="3">Costos de embalaje</option>
                                        <option value="4">Costos de Transporte</option>
                                        <option value="5">Otros</option>
                                    </select>
                                    <span id="etcif" class="invalid-feedback"></span>
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
                                </div>
                                <div class="col form-group">
                                    <label><i class="fa fa-file-alt"></i>&nbsp;Número</label>
                                    <input type="text" class="form-control" data-val="true" maxlength ="10" id="numf" />
                                </div>
                                <div class="col form-group">
                                    <label><i class="fa fa-calendar"></i>&nbsp;Fecha Doc.</label>
                                    <input type="text" class="form-control" id="fecf" data-val="true" readonly="readonly" />
                                    <span id="efecf" class="invalid-feedback"></span>
                                </div>
                                <div class="col form-group">
                                    <label><i class="fa fa-money-bill"></i>&nbsp;Moneda</label>
                                    <select id="monf" data-val="true" class="form-control totales select2">
                                    </select>
                                    <span id="emonf" class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col form-group">
                                    <label><i class="fa fa-calendar"></i>&nbsp;Fecha Vencimiento</label>
                                    <input type="text" class="form-control" id="fecvigf" data-val="true" readonly="readonly" />
                                    <span id="efevig" class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 border-bottom">
                                    DATOS DEL PROVEEDOR
                                    <button id="nprovf" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>
                                </div>
                                <div class="col-12 py-3">
                                    <div class="row">
                                        <div class="col form-group">
                                            <label><i class="fa fa-user"></i>&nbsp;Tipo Doc. Ident.</label>
                                            <select class="form-control" id="docf" data-val="true">
                                                <option value=""></option>
                                                <option value="DNI">DNI</option>
                                                <option value="RUC">RUC</option>
                                                <option value="RUS">RUS</option>
                                            </select>
                                            <span id="edocf" class="invalid-feedback"></span>
                                        </div>
                                        <div class="col">
                                            <input type="hidden" id="idprovf" value="0" />
                                            <label><i class="fa fa-pencil-alt"></i>&nbsp;No. de RUC</label>
                                            <div class="input-group">
                                                <input type="text" id="rucf" class="form-control" data-val="true" />
                                                <div class="input-group-append">
                                                    <button class="btn btn-sm btn-primary" style="border-bottom-right-radius: 4px; border-top-right-radius: 4px"><i class="fa fa-filter"></i></button>
                                                </div>
                                                <span id="erucf" class="invalid-feedback"></span>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <label><i class="fa fa-id-card"></i>&nbsp;Razón Social</label>
                                            <div class="input-group">
                                                <input type="text" id="razf" class="form-control" data-val="true" />
                                                <div class="input-group-append">
                                                    <button class="btn btn-sm btn-primary" id="brazf" style="border-bottom-right-radius: 4px; border-top-right-radius: 4px"><i class="fa fa-search"></i></button>
                                                </div>
                                                <span id="erazf" class="invalid-feedback"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <input type="radio" id="cxc" name="tipom" value="1">
                                    <label for="cxcg">Costo por Caja&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    <input type="radio" id="mt" name="tipom" value="2">
                                    <label for="cxccr">Monto Total&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <div class="row col-md-12 col-12">
                                    <div class="col-8 table-responsive table-responsive-sm">
                                        <table class="table table-sm table-bordered table-hover table-striped" id="productosf">
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
                                </div>


                                <div class="col-12 text-center">
                                    <button class="btn btn-primary btn-sm" id="guaf"><i class="fa fa-save"></i>&nbsp;GUARDAR</button>
                                    <button class="btn btn-danger btn-sm" id="canf"><i class="fa fa-times-circle"></i>&nbsp;CANCELAR</button>
                                </div>
                            </div>

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
                        <div class="col-md-2 col-4 form-group">
                            <label>RUC</label>
                            <input type="text" class="form-control" id="rucp" data-val="true" />
                            <span id="erucp" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-4 col-12 form-group">
                            <label>Razón Social</label>
                            <input type="text" class="form-control" id="razs" />
                            <span id="erazs" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-4 col-12 form-group">
                            <label>Razón Comercial</label>
                            <input type="text" class="form-control" id="razc" />
                            <span id="erazc" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 form-group">
                            <label>Dirección Fiscal</label>
                            <input type="text" class="form-control" id="dirf" />
                        </div>
                        <div class="col-12 form-group">
                            <label>Dirección Comercial</label>
                            <input type="text" class="form-control" id="dirc" />
                        </div>
                        <div class="col-md-6 col-12">
                            <label>Ubigeo</label>
                            <select id="ubip" class="form-control select2" data-val="true">
                                <option value=""></option>
                            </select>
                        </div>
                        <div class="col-md-6 col-12">
                            <label>Tipo</label>
                            <select id="tip" class="form-control" data-val="true">
                                <option value="">Selecciona el tipo</option>
                                <option value="1">Exportador</option>
                                <option value="2">Importador</option>
                                <option value="3">Local</option>
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
                <div class="modal-body" id="ContentReporte">
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>

    <input type="file" id="anexo" style="display: none;" accept="application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" multiple="multiple" />
    <input type="hidden" id="idr" value="0" />
    <input type="hidden" id="limps" value="" />
    <input type="hidden" id="tabla" value="info" />
    <input type="hidden" id="idp" value="0" />
    <input type="hidden" id="idc" value="0" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src='/assets/global/plugins/jquery-file-upload/js/vendor/jquery.ui.widget.js' type='text/javascript'></script>
    <script src='/assets/global/plugins/jquery-file-upload/js/jquery.iframe-transport.js' type='text/javascript'></script>
    <script src='/assets/global/plugins/jquery-file-upload/js/jquery.fileupload.js' type='text/javascript'></script>
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/monedas.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/js/upAnexo.js"></script>
    <script src="/assets/global/js/cat/impexp.js"></script>
    <script src="/assets/global/js/cat/almacen.js"></script>
    <script src="/assets/global/pages/js/compl.js"></script>
</asp:Content>
