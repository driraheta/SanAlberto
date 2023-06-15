<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="traslados.aspx.cs" Inherits="SanAlberto.pages.ginv.traslados" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">

    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">GESTION DE TRASLADOS ENTRE ALMACENES
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- Page Heading End -->

    <!-- Page List -->
    <div id="lista" class="card">
        <div class="card-header">
            <div class="row">
                <br /><br />
                <div class="col-lg-12">
                 <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">LISTA DE TRASLADOS</h5>
                    </div>

                   <div class="row">
                <div class="col-8 col-m-8 col-lg-12">
                    <div class="row">
                        <div class="col">
                            <label for="ocValor" class="mr-sm-2">Código</label>
                            <input type="text" id="codigo" placeholder="Num" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                         <div class="col">
                            <label for="ocValor" class="mr-sm-2">Desde</label>
                             <input type="date"  id="Fdesde" data-val="true"  class="form-control form-control-sm mb-2 mr-sm-2 datepicker" />
                           </div>
                        <div class="col">
                            <label for="ocValor" class="mr-sm-2">Hasta</label>
                             <input type="date" id="Fhasta" data-val="true" class="form-control form-control-sm mb-2 mr-sm-2 datepicker" />
                                   </div>
                       
                        <div class="col">
                            <div class="row">
                                <label for="" class="mr-sm-1">&nbsp</label>
                            </div>
                            <div class="row">
                                <button id="Buscar" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2"><i class="fa fa-search"></i></button>
                                <button id="restablecerFiltros" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm float-right"><i class="fas fa-undo"></i></button>
                                 <button class="btn btn-success btn-sm  ml-2 mb-2 float-right"  id="traslados" data-toggle="modal" data-target="#trasladosModal"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
                                </div>
                                
                           
                        </div>
                    </div>
                 
                </div>
            </div>
        </div>   
               
            </div>
            <div class="form-group row" ">
                  
            <div class="row">
                <div id="trasladostable" class="stickyTable col-12 table-responsive table-responsive-sm" style="height: 40vh;padding:20px 50px; width:1200px;">
                    <table class="table table-sm table-hover  " id="info">
                        <thead>
                            <tr>
                                <th style="display: none">ID</th>
                                <th>Código</th>
                                <th>Fecha Traslado</th>
                                <th>Almacén Origen</th>
                                <th>Almacén Destino</th>
                                <th>Registrado por:</th>
                                <th>Consultar</th>
                                <th>PDF</th>
                            </tr>
                        </thead>
                        <tbody id="tinfobody" class="buscar"></tbody>
                    </table>
                </div>
            </div>



            </div>
        </div>
        <div class="card-body">
            <div class="row" hidden="hidden">
                <div class="col-sm-2">
                    <div class="form-group">
                        <label class="border-bottom w-100" for="exampleFormControlInput1">Almacen</label>
                        <select class="form-control rounded" id="alm">
                        </select>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="form-group">
                        <label class="border-bottom w-100" for="exampleFormControlInput1">Busqueda por Código/Producto</label>
                        <input class="form-control" type="text" id="filtrar" placeholder="...">
                    </div>
                </div>
                <div class="col-sm-4">
                </div>
                <div class="col-sm-4">
                    <div class="row">
                        <div class="col-7">
                            <label style="padding-top: 8px; font-weight: bold;">Reporte Inventario Detallado</label>
                        </div>
                        <div class="col-5">
                            <div class="btn-group d-flex" role="group" aria-label="...">
                                <button type="button" class="btn btn-success w-25" id="expview" onclick="exportar('View');"><span class="mr-2 fa fa-file-excel"></span></button>
                                <button type="button" class="btn btn-danger w-25" id="pdfview" onclick="genpdf();"><span class="mr-2 fa fa-file-pdf"></span></button>
                                <button style="display: none" type="button" class="btn btn-danger w-25" id="expall" onclick="exportar('All');"><span class="mr-2 fa fa-file-excel"></span>Exportar todo</button>
                                <button style="display: none" type="button" class="btn btn-primary w-25" id="menu"><span class="mr-2 fa fa-align-justify"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



          
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
                                <button class="btn btn-primary mb-2 btn-sm float-right" id="nueDoc"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
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
    
    <!-- Page List End -->

    <!-- Modal Traslados -->
    <div class="modal fade" id="trasladosModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header bg-gradient-info text-white">
                    <h5 class="modal-title text-center col-11 font-weight-bold">Traslados entre almacenas</h5>
                    <button class="close text-white" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <label><b>Almacén de origen</b></label>
                            <hr class="m-0" />
                        </div>
                        <div class="col-sm-4">
                            <label>Origen</label>
                            <select class="form-control rounded form-control-sm" id="selalmtrasO">
                            </select>
                        </div>
                        <div class="col-sm-8">
                            <label>Producto</label>
                            <!--agregado-->
                            <select class="form-control rounded form-control-sm select2" data-val="true" id="selprotras"  onchange="traeImp('selprotras','txtinvacttras');">
                            </select>
                        </div>

                        <div class="col-sm-6">
                            <label>Importacion</label>
                            <select class="form-control rounded form-control-sm" id="selimportacion" onchange="traeDetImp();">
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <label>Costo Imp:</label>
                            <div class="input-group mb-3 rounded">
                                <input type="text" class="form-control form-control-sm" readonly="readonly" placeholder="0" aria-label="Costo" id="txtcostoimp">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label>Cant Disp:</label>
                            <div class="input-group mb-3 rounded">
                                <input type="text" class="form-control form-control-sm" readonly="readonly" placeholder="0" aria-label="Cantidad Disponible" id="txtcantdisp">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label>Costo Actual:</label>
                            <div class="input-group mb-3 rounded">
                                <input type="text" class="form-control form-control-sm numeros" placeholder="0" aria-label="Costo" id="txtcosto">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label>Cantidad:</label>
                            <div class="input-group mb-3 rounded">
                                <input type="text" class="form-control form-control-sm numeros" placeholder="Cantidad" aria-label="Cantidad" id="txtcanttras">
                                <input type="text" class="form-control form-control-sm numeros" placeholder="Cantidad" aria-label="Cantidad" id="txtinvacttras" style="display: none;">
                                <div class="input-group-prepend">
                                    <label class="btn btn-primary btn-sm" onclick="agregarProducto()"><i class="fa fa-plus" id="umtras"></i></label>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <label>Lista de productos añadidos:</label>

                        </div>
                        <div class="col-12 table-responsive table-responsive-sm ">
                            <table class="table table-bordered table-sm table-striped table-hover" id="lprotras">
                                <thead>
                                    <tr>
                                        <th class="oculta">idproducto</th>
                                        <th class="oculta">numero</th>
                                        <th class="oculta">tipo</th>
                                        <th>Descripción</th>
                                        <th>Unidad-Med</th>
                                        <th>Cantidad</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody id="tbtrasp"></tbody>
                            </table>
                        </div>
                        <div class="col-12">
                            <label><b>Almacen de destino</b></label>
                            <hr class="m-0" />
                        </div>
                        <div class="col-sm-4">
                            <label>Destino</label>
                            <select class="form-control rounded form-control-sm" id="selalmtrasD">
                            </select>
                        </div>
                        <div class="col-sm-8">
                            <label>Nota:</label>
                            <input type="text" class="form-control rounded form-control-sm" id="txtnotatras" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary rounded" type="button" onclick="traspasar();">Guardar</button>
                    <button class="btn btn-secondary rounded" type="button" id="cantras">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Traslados End-->
    <!-- modal nueva facturas -->
    <div class="modal fade" id="docElectronico">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
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
                                        <input type="date" class="form-control datepicker" data-type="datepicker" id="fecf" data-val="true"  />
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
                                        <input type="date" class="form-control datepicker" data-type="datepicker" id="fecvig" data-val="true" />
                                        <span id="efevig" class="invalid-feedback"></span>
                                    </div>
                                </div>
                                <div class="row">
                                   
                                    <div class="col-md-4 col-12 form-group">
                                        <label>Tipo de RUC</label>
                                        <select id="tdom" data-val="false" class="form-control totales select2">
                                            <option value="0" selected>Seleccione</option>
                                            <option value="1">Domiciliado</option>
                                            <option value="2">No Domiciliado</option>
                                        </select>
                                        <span id="tdomf" class="invalid-feedback"></span>
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
                    
                    <div class="col-12" id="divchk">
                        <input type="radio" id="cxc" name="tipom" value="1">
                        <label for="cxcg">Costo por Caja&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
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


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/js/cat/almacen.js"></script>
    <script src="/assets/global/js/numeros.js"></script>    
    <script src="/assets/global/js/cat/impexp.js"></script>
    <script src="/assets/global/pages/js/traslados.js"></script>
</asp:Content>

