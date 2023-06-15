<%@ Page Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Ventas.aspx.cs" Inherits="SanAlberto.pages.vtas.Ventas" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <link href="/assets/global/css/Style.css" rel="stylesheet" type="text/css" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">Registro de Ventas
                    <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- Page Heading End -->
    <input type="hidden" id="limps" value="" />

    <!-- importaciones -->
    <div id="listaoc">
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-6 col-12">
                        <h6 class="card-title mb-0 text-gray-900 text-uppercase font-weight-bolder">Lista de Importaciones / Stock  de productos</h6>
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="form-inline float-right">
                            <button class="btn btn-success btn-sm" id="nue"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
                            &nbsp;
                            <button class="btn btn-primary btn-sm" id="irpt"><i class="fa fa-plus-circle"></i>&nbsp;Ver Pedidos por Viaje</button>
                        </div>
                    </div>

                </div>
            </div>
            <div class="card-body">
                <!--agregado filtro almancen y codigo-->
                   <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                                 <label class="border-bottom w-100" for="exampleFormControlInput1">Almacen</label>
                                  <select class="form-control rounded" id="almF">
                                  </select>
                            </div>
                         </div>
                         <div class="col-sm-6">
                               <div class="form-group">
                                    <label class="border-bottom w-100" for="exampleFormControlInput1">Búsqueda por Código/Producto</label>
                                    <input class="form-control" type="text" id="filtrar" placeholder="...">
                               </div>
                         </div>
                    </div>
                    
                <div class="row" style="padding: 20px; height: 250px; overflow-y: auto;">
                 
                    <div class="col-12">
                        <div class="row">
                            <div id="infov" class="col-12 stickyTable table-responsive">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <div class="card">
            <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Pedidos generados: <span id="fecpg">&nbsp;</span>
                    </button>
                </h2>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                    <div class="row">
                        <!--<div class="col-sm-4 col-12">
                            <label for="guiaValor" class="mr-sm-2">Busqueda Numero Guia</label>
                            <input type="text" id="guiaValor" placeholder="..." class="form-control  mb-2 mr-sm-2">
                        </div>-->
                        <div class="col-12 col-sm-2 mb-2">
                            <label class="my-0">Fechas</label>
                            <select id="idFecha" class="form-control select2" data-val="true">
                                <option value="0">Seleccionar</option>
                                <option value="1">Hoy</option>
                                <option value="2">Últimos 7 días</option>
                                <option value="3">Mes</option>
                            </select>
                        </div>
                        <div class="col-12 col-sm-2 mb-2">
                            <label class="my-0">Nro_Guía</label>
                            <select id="idGuia" class="form-control select2" data-val="true">
                                <option value="0">Seleccionar</option>
                            </select>
                        </div>
                        <div class="col-12 col-sm-2 mt-4 mb-2">
                            <button id="filtrarBtn" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2" onclick="cargaVentas(this)"><i class="fa fa-search"></i></button>
                        </div>
                        <%--<div class="col">
                            <div class="row">
                                <label for="" class="mr-sm-1">&nbsp;</label>
                            </div>
                            <div class="row">
                                <button id="filtrarBtn" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2"><i class="fa fa-search"></i></button>
                                <button id="restablecerFiltros" title="Limpiar Filtros" class="btn btn-success mb-2 btn-sm float-right"><i class="fas fa-undo"></i></button>
                            </div>
                        </div>--%>
                    </div>
                    <table class="table table-sm table-hover" id="infoven">
                        <thead>
                            <tr>
                                <th class="thp">Guía Remisión</th>
                                <th class="thp">Importe</th>
                                <th class="thp">Contacto</th>
                                <th class="thp">Cliente</th>
                                <th class="thp">Consultar</th>
                            </tr>
                        </thead>
                        <tbody class="buscar"></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingTwo">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Lista de Ventas - Ventas Anticipadas
                               
                    </button>
                </h2>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div class="card-body">
                    <div id="infoventanti" class="col-12 "></div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingThree">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Lista de Ventas Temporales
                               
                    </button>
                </h2>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <div class="card-body">
                    <div id="infoventtemp" class="col-12">
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="stickyTable col-12 table-responsive table-responsive-sm accordion" id="accordionExample">
                </div>
                <button class="btn btn-success btn-sm float-right" id="ivpa" style="margin-right: 5px; margin-bottom: 5px;"><i class="fa fa-plus-circle"></i>&nbsp;Ver Pedidos Anteriores</button>
            </div>
        </div>
    </div>

    <section id="ventas">
        <div id="forma" class="card" style="display: none">
            <div class="card-header">
                <h6 class="card-title">Nuevo Registro de Venta</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8 col-12">
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="checkbox" class="form-check-input" value="" id="chkde" name="chkde">Venta Anticipada
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="checkbox" class="form-check-input" value="" id="chkopg" name="chkde">Operación Gratuita
                                    </label>
                                </div>
                            </div>
                            <div class="col-12">
                                <br />
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">Almacen</label>
                                    <select id="alm" class="form-control select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="ealm" class="invalid-feedback"></span>
                                </div>

                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">
                                        Dirección de Partida
                                    <a href="/pages/cats/DireccionPartida.aspx" id="ndp" class="ml-1 btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</a>
                                    </label>
                                    <select id="dpar" class="form-control  select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="edpar" class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">Serie</label>
                                    <input type="text" class="form-control " id="ser" data-val="true" />
                                    <span id="eser" class="invalid-feedback"></span>

                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                     <label class="my-0">Número</label>
                                    <input type="text" class="form-control " id="num" data-val="true" />
                                    <span id="enum" class="invalid-feedback"></span>

                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">Vendedor</label>
                                    <select id="ven" class="form-control  select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="even" class="invalid-feedback"></span>
                                </div>

                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">Contacto</label>
                                    <select id="contac" class="form-control  select2" data-val="true">
                                        <option value="0"></option>
                                    </select>
                                    <span id="econtac" class="invalid-feedback"></span>
                                </div>

                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">Fecha de Emisión</label>
                                    <input class="form-control " type="text" id="fem" />
                                </div>

                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">
                                        Cliente
                                    <button id="ncli" class="ml-1 btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                                    <select id="cli" class="form-control  select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="ecli" class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">
                                        Forma de Pago&nbsp;&nbsp;

                                        <button id="nfpago" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                                    <select id="fp" class="form-control  select2" data-val="true">
                                    </select>
                                    <span id="efp" class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">RUC / Facturar</label>
                                    <input type="text" class="form-control " id="cruc" data-val="true" />
                                    <span id="ecruc" class="invalid-feedback"></span>
                                </div>

                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">
                                        Moneda&nbsp;&nbsp;

                                      <!-- <button id="nmon" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>--></label>
                                    <select class="form-control select2" id="mon" data-val="true"></select>
                                    <span id="emon" class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">
                                        Dirección de Llegada&nbsp;&nbsp;

                                        <button id="ndirllegada" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                                    <select id="dlleg" class="form-control  select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="edlleg" class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-md-6 col-12">
                                        <div class="form-group">
                                            <label class="my-0">
                                                Transportista&nbsp;&nbsp;
                                                <%--<button id="ntrans" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>--%>
                                            </label>
                                            <select id="tranpname" class="form-control  select2" data-val="true">
                                                <option value=""></option>
                                            </select>
                                            <span id="etranpname" class="invalid-feedback"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12">
                                        <div class="form-group">
                                            <label class="my-0">Marca</label>
                                            <select id="transmar" class="form-control  select2" data-val="false">
                                                <option value=""></option>
                                            </select>
                                            <span id="etransmar" class="invalid-feedback"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12">
                                        <div class="form-group">
                                            <label class="my-0">Placa</label>

                                            <select id="tranpplaca" class="form-control  select2" data-val="true">
                                                <option value=""></option>
                                            </select>
                                            <span id="etranpplaca" class="invalid-feedback"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12">
                                        <div class="form-group">
                                            <label class="my-0">Conductor</label>
                                            <select id="tranp" class="form-control  select2" data-val="true">
                                                <option value=""></option>
                                            </select>
                                            <span id="etranp" class="invalid-feedback"></span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">
                                        Viaje
                                    <button id="nviaje" class="ml-1 btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                                    <select class="form-control select2" id="viaje" data-val="true"></select>
                                    <span id="eviaje" class="invalid-feedback"></span>
                                </div>

                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">
                                        Punto de Entrega&nbsp;&nbsp;

                                     <!-- <button id="npun" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>--></label>
                                    <select id="pun" class="form-control  select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="epun" class="invalid-feedback"></span>
                                </div>

                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label class="my-0">Categoria</label>
                                    <select class="form-control select2" id="cat" data-val="true"></select>
                                    <span id="ecat" class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="col-md-6 col-12"></div>

                        </div>
                    </div>

                    <div class="col-md-4 border-md-left">
                        <div class="row">
                            <div class="col-12 col-lg-6 ">
                                <label class="my-0 my-md-auto">Línea de Credito (Total)</label>
                            </div>
                            <div class="col-12 col-lg-6  form-group">
                                <input type="text" class="form-control " id="lincretotal" readonly="readonly" />
                            </div>
                            <div class="col-12 col-lg-6 ">
                                <label class="my-0 my-md-auto">Pendiente de Pago</label>
                            </div>
                            <div class="col-12 col-lg-6  form-group">
                                <input type="text" class="form-control " id="penpag" readonly="readonly" />
                            </div>
                            <div class="col-12 col-lg-6 ">
                                <label class="my-0 my-md-auto">Saldo de linea de credito</label>
                            </div>
                            <div class="col-12 col-lg-6  form-group">
                                <input type="text" class="form-control " id="sallincre" readonly="readonly" />
                            </div>
                            <div class="col-12 col-lg-6 form-group">
                                <label class="my-0 my-md-auto">Ultimo Pago</label>
                                <input type="text" class="form-control " id="ultpag" readonly="readonly" />
                            </div>
                            <div class="col-12 col-lg-6 form-group">
                                <label class="my-0 my-md-auto">Ultimo día de Pago</label>
                                <input type="text" class="form-control " id="ultdiapag" readonly="readonly" />
                            </div>
                        </div>
                        <div class="col-12 table-responsive">
                            <div id="listp"></div>
                        </div>
                        <div class="row">
                            <div class="col-12 text-center">
                                <div class="row">
                                    <div class="col-12 form-group mb-0">
                                        <button class="mb-1 btn btn-primary btn-sm" id="regpag"><i class="fa fa-save"></i>&nbsp;Registro Pago</button>
                                        <button type="button" class="mb-1 btn btn-success btn-sm" id="expexc" onclick="exportarRV();"><i class="fa fa-save"></i>&nbsp;Excel</button>
                                        <button class="mb-1 btn btn-danger btn-sm" id="reppdf"><i class="fa fa-file-pdf"></i>&nbsp;PDF</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label class="mb-0 mt-3">Lista de productos</label>
                        <button class="btn btn-success btn-sm float-right" id="npro"><i class="fa fa-plus-circle mr-1"></i>Agregar</button>
                    </div>
                    <div class="stickyTable col-12 table-responsive table-responsive-sm">
                        <table class="table table-sm table-hover" id="productos">
                            <thead>
                                <tr>
                                    <th style="display: none">Id</th>
                                    <th class="text-center">Código</th>
                                    <th class="text-center">Descripción</th>
                                    <th class="text-center">Und/Medida</th>
                                    <th class="text-center">Cantidad</th>
                                    <th style="display: none">IdImp</th>
                                    <th class="text-center"># Importación</th>
                                    <th style="display: none">TipoImp</th>
                                    <th class="text-center">Precio</th>
                                    <th class="text-center">Sub Total</th>
                                    <th class="text-center">IGV</th>
                                    <th class="text-center">Total</th>
                                    <th class="text-center">Comentarios</th>
                                    <th class="text-center">Almacen</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                <div class="row float-right">
                    <div class="col-md-3">
                        <label>Total:</label>
                    </div>
                    <div class="col-md-9 form-group">
                        <input type="text" class="form-control " id="totall" readonly="readonly" />
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary btn-sm float-rigth" id="gua"><i class="fa fa-save"></i>&nbsp;Guardar</button>
                    &nbsp;
                    <button class="btn btn-primary btn-sm" id="guatemp"><i class="fa fa-save"></i>&nbsp;Guardar Temporal</button>
                    &nbsp;
                    <button class="btn btn-warning btn-sm" id="can"><i class="fa fa-exit"></i>&nbsp;Cancelar</button>
                </div>
            </div>
        </div>
        <div id="formae" class="card" style="display: none">
            <div class="card-header">
                <h6 class="card-title">Edición de Venta</h6>
            </div>
            <div class="card-body">
                <input class="form-control " type="text" id="idvent" style="display: none" />
                <div class="row">
                    <div class="col-md-8 col-12">
                        <div class=" row">
                            <div class="col-md-6 col-12">
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="checkbox" class="form-check-input" value="" id="chkdee" name="chkde">Venta Anticipada
                                    </label>
                                </div>
                                <br />
                                <div class="form-group">
                                    <label class="my-0">Almacen</label>
                                    <select id="alme" class="form-control select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="ealme" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">Fecha de Emisión</label>
                                    <input class="form-control " type="text" id="feme"/>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">Serie</label>
                                    <input type="text" class="form-control " id="sere" data-val="true" />
                                    <span id="esere" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">Número</label>
                                    <input type="text" class="form-control " id="nume" data-val="true" />
                                    <span id="enume" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">
                                        Forma de Pago&nbsp;&nbsp;</label>
                                    <select id="fpe" class="form-control  select2" data-val="true"></select>
                                    <span id="efpe" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">Moneda&nbsp;&nbsp;</label>
                                    <select class="form-control select2" id="mone" data-val="true"></select>
                                    <span id="emone" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">Transportista&nbsp;&nbsp;</label>
                                    <select id="tranpe" class="form-control  select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="etranpe" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">Punto de Entrega&nbsp;&nbsp;</label>
                                    <select id="pune" class="form-control  select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="epune" class="invalid-feedback"></span>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="checkbox" class="form-check-input" value="" id="chkopge" name="chkde">Operación Gratuita
                                    </label>
                                </div>
                                <br />
                                <div class="form-group">
                                    <label class="my-0">
                                        Dirección de Partida
                                       
                                    <button id="ndpe" class="ml-1 btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>
                                    </label>
                                    <select id="dpare" class="form-control  select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="edpare" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">Vendedor</label>
                                    <select id="vene" class="form-control  select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="evene" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">Contacto</label>
                                    <select id="contace" class="form-control  select2" data-val="true">
                                        <option value="0"></option>
                                    </select>
                                    <span id="econtace" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">
                                        Cliente
                                    <button id="nclie" class="ml-1 btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                                    <select id="clie" class="form-control  select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="eclie" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">RUC / Facturar</label>
                                    <input type="text" class="form-control " id="cruce" data-val="true" />
                                    <span id="ecruce" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">Dirección de Llegada</label>
                                    <select id="dllege" class="form-control  select2" data-val="true">
                                        <option value=""></option>
                                    </select>
                                    <span id="edllege" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">Viaje</label>
                                    <select class="form-control select2" id="viajee" data-val="true"></select>
                                    <span id="eviajee" class="invalid-feedback"></span>
                                </div>
                                <div class="form-group">
                                    <label class="my-0">Categoria</label>
                                    <select class="form-control select2" id="cate" data-val="true"></select>
                                    <span id="ecate" class="invalid-feedback"></span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-4 border-md-left">
                        <div class="row">
                            <div class="col-12 col-lg-6 ">
                                <label class="my-0 my-md-auto">Línea de Credito (Total)</label>
                            </div>
                            <div class="col-12 col-lg-6  form-group">
                                <input type="text" class="form-control " id="lincree" readonly="readonly" />
                            </div>
                            <div class="col-12 col-lg-6 ">
                                <label class="my-0 my-md-auto">Pendiente de Pago</label>
                            </div>
                            <div class="col-12 col-lg-6  form-group">
                                <input type="text" class="form-control " id="penpage" readonly="readonly" />
                            </div>
                            <div class="col-12 col-lg-6 form-group">
                                <label class="my-0 my-md-auto">Ultimo Pago</label>
                                <input type="text" class="form-control " id="ultpage" readonly="readonly" />
                            </div>
                            <div class="col-12 col-lg-6 form-group">
                                <label class="my-0 my-md-auto">Ultimo día de Pago</label>
                                <input type="text" class="form-control " id="ultdiapage" readonly="readonly" />
                            </div>
                        </div>
                        <div class="col-12 table-responsive">
                            <div id="listpe"></div>
                        </div>
                        <div class="row">
                            <div class="col-12 text-center">
                                <div class="row">
                                    <div class="col-12 form-group mb-0">
                                        <button class="mb-1 btn btn-primary btn-sm" id="regpage"><i class="fa fa-save"></i>&nbsp;Registro Pago</button>
                                        <button type="button" class="mb-1 btn btn-success btn-sm" id="expexce" onclick="exportarRVE();"><i class="fa fa-save"></i>&nbsp;Excel</button>
                                        <button class="mb-1 btn btn-danger btn-sm" id="reppdfe"><i class="fa fa-file-pdf"></i>&nbsp;PDF</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="stickyTable col-12 table-responsive table-responsive-sm">
                        <table class="table table-sm table-hover" id="productose">
                            <thead>
                                <tr>
                                    <th style="display: none">Id</th>
                                    <th class="text-center">Código</th>
                                    <th class="text-center">Descripción</th>
                                    <th class="text-center">Und/Medida</th>
                                    <th class="text-center">Cantidad</th>
                                    <th style="display: none">IdImp</th>
                                    <th style="display: none">tpoImp</th>
                                    <th class="text-center">Precio</th>
                                    <th class="text-center">Sub Total</th>
                                    <th class="text-center">IGV</th>
                                    <th class="text-center">Total</th>
                                    <th class="text-center">Comentarios</th>
                                    <th class="text-center">Almacen</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="tpbody"></tbody>
                        </table>
                    </div>
                </div>
                <div class="row text-right">
                    <div class="col-1">
                        <label>Total:</label>
                    </div>
                    <div class="col-md-2 col-6 form-group">
                        <input type="text" class="form-control " id="totalle" readonly="readonly" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2 col-6 my-2 custom-control-inline">
                        <button class="btn btn-primary btn-sm" id="act">Actualizar</button>
                        <button class="btn btn-danger btn-sm" id="cane">Cancelar</button>
                    </div>
                </div>

            </div>
        </div>

        <!-- modal cliente -->
        <%--        <div class="modal fade" id="mcliente">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Nuevo Cliente</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-3 col-12 form-group">
                                <label>Nombre / Razón Social</label>
                                <input type="text" class="form-control" id="nomc" data-val="true" />
                                <span id="enomc" class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-3 col-6 form-group">
                                <label>Tipo de Documento</label>
                                <select class="form-control select2" id="td" data-val="true">
                                    <option value=""></option>
                                    <option value="1">DNI</option>
                                    <option value="2">Carnet de Extranjería</option>
                                    <option value="3">RUC</option>
                                    <option value="4">RUS</option>
                                    <option value="5">Pasaporte</option>
                                    <option value="6">Cédula Diplomatica</option>
                                    <option value="7">Otro</option>
                                </select>
                                <span id="emod" class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-3 col-12 form-group">
                                <label>Número Documento</label>
                                <input type="text" class="form-control" id="numdoc" data-val="true" />
                                <span id="enumdoc" class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-3 col-12 form-group">
                                <label>Estado</label>
                                <select class="form-control" id="status" data-val="true">
                                    <option value=""></option>
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                </select>
                                <span id="estatus" class="invalid-feedback"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 col-12 form-group">
                                <label>Email</label>
                                <input type="text" class="form-control" id="email" />
                                <span id="eemail" class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-3 col-12 form-group">
                                <label>Teléfono</label>
                                <input type="text" class="form-control" id="tel" />
                                <span id="etel" class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-3 col-12 form-group">
                                <label>Celular</label>
                                <input type="text" class="form-control" id="cel" />
                                <span id="ecel" class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-3 col-12 form-group">
                                <label>Ubigeo</label>
                                <select id="ubi" class="form-control select2" data-val="true">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 col-12 form-group">
                                <label>Linea de Credito</label>
                                <input type="text" class="form-control decimal" id="lincrecl" data-val="true" />
                                <span id="elincre" class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-3 col-12 form-group">
                                <label>Días de Credito</label>
                                <input type="text" class="form-control numeros" id="diacre" data-val="true" />
                                <span id="ediacre" class="invalid-feedback"></span>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-6 col-12 form-group">
                                <label>Dirección Comercial</label>
                                <input type="text" class="form-control " id="dircom" />
                                <span id="edircom" class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-6 col-12 form-group">
                                <label>Dirección Fiscal</label>
                                <input type="text" class="form-control " id="dirfis" data-val="true" />
                                <span id="edirfis" class="invalid-feedback"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-12 border-bottom">
                                <h6>CONTACTOS</h6>
                            </div>
                            <div class="col-md-12 col-12 mb-1">
                                <label class="mb-0">
                                    Lista de Contactos
                                    <button id="ncont" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                                <div class="input-group">
                                    <select id="contcli" class="form-control select2">
                                        <option value=""></option>
                                    </select>
                                    <div class=" input-group-append">
                                        <button class="btn btn-blue-madison btn-sm float-right" id="agre"><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-12 table-responsive table-responsive-sm">
                                <table class="table table-sm table-bordered table-hover table-striped" id="tblcont">
                                    <thead>
                                        <tr>
                                            <td class="text-center" style="display: none;">ID</td>
                                            <td class="text-center">Nombre</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 border-bottom">
                                <h6>DIRECCIONES DE LLEGADA</h6>
                            </div>
                            <div class="col-md-10 col-12 mb-2">
                                <label>Direcciones de Llegada</label>
                                <button class="btn btn-blue-madison btn-sm float-right" id="ndirlleg"><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-10 col-12 table-responsive table-responsive-sm">
                                <table class="table table-sm table-hover" id="dirllegada">
                                    <thead>
                                        <tr>
                                            <td class="text-center">Descripción</td>
                                            <td class="text-center">Puesto</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row pos">
                            <div class="col-md-6 my-3 align-content-center">
                                <button type="button" style="width: 180px" class="btn btn-primary mb-2" id="guacli"><i class="fa fa-save"></i>&nbsp;Guardar</button><br />
                                <button type="button" style="width: 180px" class="btn btn-danger" id="cancli"><i class="fa fa-times-circle"></i>&nbsp;Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>--%>
        <!-- /modal cliente -->


        <!-- modal prods -->
        <div class="modal fade" role="dialog" id="prods">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content" style="width: 100%;" id="cuerpoPord">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title" id="titp">Agregar Producto</h4>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body" id="prodbody">
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <div class="row align-self-center">
                                    <input type="text" class="form-control text-right" style="display: none" data-val="true" id="idp" />
                                    <div class="col-md-4 form-group text-right">
                                        <label>Producto</label>
                                    </div>
                                    <div class="col-md-8 form-group">
                                        <!--<input type="text" id="s" class="d-none" style="z-index:100" />-->
                                        <select  class="select2 form-control" id="nomp"    v-model="modalProduct.product">
                                            
                                        </select>
                                        <span id="nompValidar" hidden class="text-danger" style="font-size: 70%; margin-top: .25rem">El campo es obligatorio</span>
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
                                <div class="row align-self-center" style="display: none">
                                    <div class="col-md-4 form-group text-right">
                                        <label>Cantidad</label>
                                    </div>
                                    <div class="col-md-8 form-group">
                                        <input type="text" class="form-control text-right" id="cantp" />
                                        <span id="ecantp" class="invalid-feedback"></span>
                                    </div>
                                    <div class="col-md-2 form-group text-right" style="padding-top: 20px; display: none;">
                                        <label>IGV</label>
                                    </div>
                                </div>
                                <div class="row align-self-center" style="display: none">
                                    <div class="col-md-4 form-group text-right">
                                        <label>Precio</label>
                                    </div>
                                    <div class="col-md-5 form-group">
                                        <input type="text" class="form-control text-right" id="prep" />
                                        <span id="eprep" class="invalid-feedback"></span>
                                    </div>
                                    <div class="col-md-3 form-group" style="display: none">
                                        <select id="ivg" class="form-control select2"></select>
                                        <span id="eivg" class="invalid-feedback"></span>
                                    </div>
                                </div>
                                <div class="row align-self-center" style="display: none">
                                    <div class="col-md-4 form-group text-right">
                                        <label>Importe</label>
                                    </div>
                                    <div class="col-md-5 form-group text-right">
                                        <input type="text" class="form-control text-right" readonly="readonly" id="impp" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="row align-self-center">
                                    <div class="col-md-4 form-group text-right">
                                        <label>Cantidad</label>
                                    </div>
                                    <div class="col-md-5 form-group">
                                        <input type="text" class="form-control text-left numeros" id="noped" readonly value="0"/>
                                    </div>
                                </div>
                                <div class="row align-self-center">
                                    <div class="col-md-4 form-group text-right">
                                        <label>Precio</label>
                                    </div>
                                    <div class="col-md-5 form-group">
                                        <input type="text" class="form-control text-left decimal" id="preped" readonly value="0"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2 form-group text-right">
                                <label>Comentarios</label>
                            </div>
                            <div class="col-md-10 form-group">
                                <input type="text" class="form-control text-left" id="coment" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <div class="row">
                                    <div class="col-md-4 form-group">
                                        <div class="input-group">
                                            <div class=" input-group-append">
                                                <label>Importación</label>&nbsp;
                                        <button class="btn btn-sm btn-primary" id="bimp"
                                            style="border-bottom-right-radius: 4px; border-top-right-radius: 4px; margin-top: -4px;">
                                            <i class="fa fa-search"></i>
                                        </button>
                                            </div>
                                            <span id="eimp" class="invalid-feedback"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="divimportacion" style="display: none">
                            <div class="col-md-12 col-sm-12 text-right">
                                <button type="button" class="btn btn-primary mb-2" id="agrereg"><i class="fa fa-save"></i></button>
                                <button type="button" class="btn btn-warning mb-2" id="closereg"><i class="fa fa-sign-out-alt"></i></button>
                            </div>
                            <div class="col-12 table-responsive">
                                <div id="infoimp"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="stickyTable col-12 table-responsive table-responsive-sm">
                                <table class="table table-sm table-hover" id="imps">
                                    <thead>
                                        <tr>
                                            <th style="display: none">Id</th>
                                            <th style="display: none">tipoImp</th>
                                            <th style="display: none">idprod</th>
                                            <th style="display: none">desc</th>
                                            <th style="display: none">cod</th>
                                            <th class="text-center">Importacion</th>
                                            <th class="text-center">Cantidad</th>
                                            <th class="text-center">Precio</th>
                                            <th class="text-center">Importe</th>
                                           <!--<th></th>-->
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tpbodyimp"></tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="row pos">
                            <div class="col-md-12 float-right">
                                <button type="button" style="width: 180px" class="btn btn-primary" id="agrp"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                                <button type="button" style="width: 180px" class="btn btn-warning" id="canp"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- modal dirección de partida -->
        <div class="modal fade" id="mdirpar">
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Nueva Dirección de Partida</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 col-12 form-group">
                                <label>Descripción</label>
                                <input type="text" class="form-control" id="descdp" data-val="true" />
                                <span id="edescdp" class="invalid-feedback"></span>
                            </div>
                        </div>
                    </div>
                    <!-- Modal footer-->
                    <div class="modal-footer">
                        <div class="row pos text-right">
                            <div class="col-md-12 my-2 float-right">
                                <button type="button" style="width: 180px" class="btn btn-primary" id="guadp"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                                &nbsp;
					
                                <button type="button" style="width: 180px" class="btn btn-warning" id="candp"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal dirección de llegada -->
        <div class="modal fade" id="mdirllegada">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Dirección de Llegada</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-8 col-12 form-group">
                                <label>Descripción</label>
                                <input type="text" class="form-control" id="descdllegada" data-val="true" />
                                <span id="edescdlleg" class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-4 col-12 form-group">
                                <label>Puesto</label>
                                <input type="text" class="form-control" id="puestodllegada" data-val="true" />
                                <span id="epuestodlleg" class="invalid-feedback"></span>
                            </div>
                        </div>
                    </div>
                    <!-- Modal footer-->
                    <div class="modal-footer">
                        <div class="row pos text-right">
                            <div class="col-md-12 my-2 float-right">
                                <button type="button" style="width: 180px" class="btn btn-primary" id="agrdirlleg"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                                &nbsp;
						<button type="button" style="width: 180px" class="btn btn-warning" id="candirlleg"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- /modal dirección de llegada -->

        <!-- modal importación -->
        <div class="modal fade" id="mimportacion">
            <div class="modal-dialog modal-dialog-centered modal-lg ">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Compra Local / Importación</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="row">
                                <%--                                <div class="col-md-4 col-sm-12">
                                    <label id="nameprod">Producto</label>
                                </div>--%>
                                <%--                                <div id="pedido" class="col-md-7 col-sm-11">
                                    <div class="row">
                                        <div class="col-md-2 col-sm-2 form-group text-right">
                                            <label># Pedido</label>
                                        </div>
                                        <div class="col-md-4 col-sm-4 form-group">
                                            <input type="text" class="form-control text-left numeros" id="noped" />
                                        </div>
                                        <div class="col-md-2 col-sm-2 form-group text-right">
                                            <label>Precio</label>
                                        </div>
                                        <div class="col-md-4 col-sm-4 form-group">
                                            <input type="text" class="form-control text-left decimal" id="preped" />
                                        </div>
                                    </div>
                                </div>--%>
                                <%--                                <div class="col-md-1 col-sm-1 text-right">
                                    <button type="button" class="btn btn-success mb-2" id="agrereg"><i class="fa fa-check"></i></button>
                                </div>--%>
                            </div>
                            <%--                            <div class="col-12 table-responsive">
                                <div id="infoimp"></div>
                            </div>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Registro de Pago -->
        <div class="modal fade" id="ModalRegPago">
            <div class="modal-dialog modal-lg" style="width: 80%;">
                <div class="modal-content" style="width: 125%;">
                    <div class="modal-header">
                        <h5 class="modal-title" id="Datosconlabel">Registrar Pagos</h5>
                        <button type="button" class="close" data-dismiss="modal">&times; </button>
                    </div>
                    <div class="modal-body" id="contentDatoscon" style="width: 100%;">
                        <div id="lista">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-inline float-left" id="busqueda2">
                                        <label for="op" class="mr-sm-2">Filtrar por:</label>
                                        <select class="form-control  mb-2 mr-sm-2 mt-2" id="opc">
                                            <option value="0">Todos</option>
                                            <option value="1">Nombre/Razón Social</option>
                                            <option value="2">Contacto</option>
                                            <option value="3">RUC</option>
                                            <option value="4">Fecha Emisión</option>
                                        </select>
                                        <div class="w-25 mr-2"><input type="text" readonly="readonly" id="bfecd" class="form-control" /></div>
                                        <div class="w-25 mr-2"><input type="text" readonly="readonly" id="bfeca" class="form-control" /></div>
                                        
                                        <div class="mr-2">
                                        <input type="text" class="form-control  mb-2 mr-sm-2" placeholder="Buscar" id="bval" style="display: none" />
                                        <button class="btn btn-primary btn-sm mb-2 mr-sm-2 mt-2" id="bus"><i class="fa fa-search"></i></button>
                                        </div>                         
                                    </div>
                                    <div class="form-inline">
                                        <button class="btn btn-primary mb-2 btn-sm mr-sm-2 " id="regpago"><i class="fa fa-plus-circle"></i>&nbsp;Registrar Pago</button>
                                        <button class="btn btn-success mb-2 btn-sm " id="repexcel"><i class="fa fa-plus-circle"></i>&nbsp;Reporte Excel</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="row">
                                    <div class="col-md-12 table-responsive table-responsive-sm ">
                                        <table class="table table-sm table-hover" id="info">
                                            <thead>
                                                <tr>
                                                    <th style="display: none;">ID</th>
                                                    <th class="thp">Serie</th>
                                                    <th class="thp">Número</th>
                                                    <th class="thp">Forma de Pago</th>
                                                    <th class="thp">Fecha Emisión</th>
                                                    <th class="thp">Cliente</th>
                                                    <th class="thp">Contacto</th>
                                                    <th class="thp">Días Pendientes de Pago</th>
                                                    <th class="thp">Importe</th>
                                                    <th class="thp">Estado</th>
                                                    <th style="width: 1%;">
                                                        <input type="checkbox" id="selectall"></th>
                                                    <th style="display: none;">IDcliente</th>
                                                    <th style="display: none;">IDVendedor</th>
                                                    <th style="display: none;">Monto Pagado</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tinfobody"></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer"></div>
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
        <!-- modal registro de pagos -->
        <div class="modal fade" role="dialog" id="mregpagos">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Registrar Pago</h4>

                        <div class="col-md-2">
                            <label>Linea de Credito</label>
                            <input type="text" class="form-control" id="lincred" data-val="true" readonly="readonly" />
                        </div>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <input type="hidden" id="idcli" value="0" />
                        <div class="row">
                            <div class="col-md-6 col-12 form-group">
                                <label>RUC Proveedor</label>
                                <select class="form-control select2" id="exp" data-val="true" disabled="disabled">
                                </select>
                                <span id="eexp" class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-3 col-6 form-group">
                                <label>Fecha de Pago</label>
                                <input type="text" readonly="readonly" id="fecp" class="form-control" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-11 col-12 table-responsive table-responsive-sm">
                                <table class="table table-sm table-hover" id="datosregpag">
                                    <thead>
                                        <tr>
                                            <td style="display: none">Id</td>
                                            <td class="text-center">Serie</td>
                                            <td class="text-center">Número</td>
                                            <td class="text-center">Fecha Emisión</td>
                                            <td class="text-center">Días Pendientes</td>
                                            <td class="text-center">Monto</td>
                                            <td class="text-center">Monto a Pagar</td>
                                            <td class="text-center">Seleccionar Metodo de Pago</td>
                                            <td class="text-center">Banco</td>
                                            <td class="text-center">No. Operación/Contado</td>
                                            <td class="text-center">Observaciones</td>
                                            <td style="display: none">mp</td>
                                        </tr>
                                    </thead>
                                    <tbody id="tinforpbody"></tbody>
                                </table>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-8 text-center">
                                <div class="row">
                                    <div class="col-md-3 text-right">
                                        <label>Deuda Total(S/)</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" id="totdeuda" data-val="true" readonly="readonly" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3 text-right">
                                        <label>Total a Pagar</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" id="totapagar" data-val="true" readonly="readonly" />
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <button type="button" style="width: 180px" class="btn btn-primary my-3" id="agrprp"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button><br />
                                <button type="button" style="width: 180px" class="btn btn-danger" id="canprp"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal editar importacion -->
        <div class="modal fade" id="mimpe">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title" id="titpe">Editar</h4>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <input type="text" class="form-control text-right" style="display: none" data-val="true" id="tdid" />
                            <div class="col form-group">
                                <label>Importacion</label>
                                <select class="form-control select2" id="impop" data-val="true" name="impop"></select>
                                <span id="eimpp" class="invalid-feedback"></span>
                            </div>
                            <div class="col form-group">
                                <label>Cantidad</label>
                                <input type="text" class="form-control text-right" data-val="true" id="cantpe" />
                                <span id="ecantpe" class="invalid-feedback"></span>
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
                        <div class="row pos">
                            <div class="col">
                                <div>
                                    <button type="button" class="btn btn-danger" id="canpe" style="width: 175px"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                                    <button type="button" class="btn btn-primary" id="agrpe" style="width: 175px"><i class="fa fa-plus-circle"></i>&nbsp;Agregar Producto</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal nuevo viaje -->
        <div class="modal fade" id="mviaje">
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Viaje</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-8 col-12 form-group">
                                <label>Viaje</label>
                                <input type="text" class="form-control numeros" id="viajeno" data-val="true" />
                                <span id="eviajeno" class="invalid-feedback"></span>
                            </div>
                        </div>
                    </div>
                    <!-- Modal footer-->
                    <div class="modal-footer">
                        <div class="row pos text-right">
                            <div class="col-md-12 my-2 float-right">
                                <button type="button" style="width: 180px" class="btn btn-primary" id="guav"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                                &nbsp;
                                <button type="button" style="width: 180px" class="btn btn-warning" id="canv"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/js/cat/moneda.js"></script>
    <script src="/assets/global/js/cat/cliente.js"></script>
    <script src="/assets/global/js/cat/transportista.js"></script>
    <script src="/assets/global/js/cat/fpago.js"></script>
    <script src="/assets/global/js/cat/almacen.js"></script>
    <script src="/assets/global/pages/js/ventas.js"></script>

</asp:Content>
