<%@ Page Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="RegVtas.aspx.cs" Inherits="SanAlberto.pages.vtas.RegVtas" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
    <link href="/assets/global/css/Style.css" rel="stylesheet" type="text/css" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="d-sm-flex align-items-center justify-content-center mb-2">
        <h1 class="h3 mb-0 mt-0 text-gray-800 font-weight-bolder">Registro de Ventas
            <img src="/assets/global/img/loader_blue.gif" class="loader" /></h1>
    </div>
    <hr />

    <div id="listaoc">
        <div class="row">
            <div class="col-12 col-lg-7">
                <div class="row">
                    <div class="col-12">
                        <button class="btn btn-primary btn-sm" id="nue"><i class="fa fa-plus-circle"></i>&nbsp;Nuevo</button>
                    </div>
                </div>
                <div class="row">
                    <div id="infov" class="col-12 stickyTableP" >
                    </div>
                </div>
            </div>

            <div class="stickyTable col-12 col-lg-5 table-responsive table-responsive-sm" style="height:65vh;">
                <label>Pedidos generados:</label>
                <span id="fecpg">&nbsp;</span>
                <table class="table table-bordered table-sm table-striped table-hover" id="infoven">
                    <thead>
                        <tr>
                            <th class="thp">Guía Remisión</th>
                            <th class="thp">Importe</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>

    <div id="forma" style="display: none">
        <div class="row">
            <div class="col-12 col-md-8">
                <div class="row">
                    <div class="col-6 col-md-3 form-group">
                        <label class="my-0">Fecha de Emisión</label>
                        <input class="form-control form-control-sm" type="text" id="fem" />
                    </div>
                    <div class="col-6 col-md-3 form-group">
                        <label class="my-0">Serie</label>
                        <input type="text" class="form-control form-control-sm" id="ser" data-val="true" />
                        <span id="eser" class="invalid-feedback"></span>
                    </div>
                    <div class="col-6 col-md-3 form-group">
                        <label class="my-0">Número</label>
                        <input type="text" class="form-control form-control-sm" id="num" data-val="true" />
                        <span id="enum" class="invalid-feedback"></span>
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
                            <button id="ndp" class="ml-2 btn btn-secondary btn-sm bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button>
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
                            Cliente
                            <button id="ncli" class="ml-1 btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
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

            <div class="col-12 col-md-4 border-md-left">
                <div class="row">
                    <div class="col-12 col-lg-6 ">
                        <label class="my-0 my-md-auto">Línea de Credito (Total)</label>
                    </div>
                    <div class="col-12 col-lg-6  form-group">
                        <input type="text" class="form-control form-control-sm" id="lincre" readonly="readonly" />
                    </div>
                    <div class="col-12 col-lg-6 ">
                        <label class="my-0 my-md-auto">Pendiente de Pago</label>
                    </div>
                    <div class="col-12 col-lg-6  form-group">
                        <input type="text" class="form-control form-control-sm" id="penpag" readonly="readonly" />
                    </div>
                    <div class="col-12 col-lg-6 ">
                        <label class="my-0 my-md-auto">Saldo de linea de credito</label>
                    </div>
                    <div class="col-12 col-lg-6  form-group">
                        <input type="text" class="form-control form-control-sm" id="sallincre" readonly="readonly" />
                    </div>
                    <div class="col-12 col-lg-6 form-group">
                        <label class="my-0 my-md-auto">Ultimo Pago</label>
                        <input type="text" class="form-control form-control-sm" id="ultpag" readonly="readonly" />
                    </div>
                    <div class="col-12 col-lg-6 form-group">
                        <label class="my-0 my-md-auto">Ultimo día de Pago</label>
                        <input type="text" class="form-control form-control-sm" id="ultdiapag" readonly="readonly" />
                    </div>
                </div>
                <div class="col-12 table-responsive">
                    <div id="listp"></div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <div class="row">
                            <div class="col-12 form-group mb-0">
                                <button class="mb-1 btn btn-primary btn-sm" id="regpag">Registro Pago</button>
                                <button class="mb-1 btn btn-primary btn-sm" id="reppdf">Reporte PDF</button>
                                <button type="button" class="mb-1 btn btn-primary btn-sm" id="expexc" onclick="exportarRV();">Exportar Excel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12">
                <label class="mb-0 mt-3">Lista de productos</label>
                <button class="btn btn-blue-madison btn-sm float-right" id="npro"><i class="fa fa-plus-circle mr-1"></i>Agregar</button>
            </div>
        </div>
        <div class="row">
            <div class="stickyTable col-12 table-responsive table-responsive-sm">
                <table class="table table-sm table-bordered table-hover table-striped" id="productos">
                    <thead>
                        <tr>
                            <th style="display: none">Id</th>
                            <th class="text-center">Código</th>
                            <th class="text-center">Descripción</th>
                            <th class="text-center">Und/Medida</th>
                            <th class="text-center">Cantidad</th>
                            <th style="display: none">IdImp</th>
                            <th class="text-center"># Importación</th>
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
        <div class="row text-right">
            <div class="col-1">
                <label>Total:</label>
            </div>
            <div class="col-md-2 col-6 form-group">
                <input type="text" class="form-control form-control-sm" id="totall" readonly="readonly"/>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2 col-6 my-2 custom-control-inline">
                <button class="btn btn-primary btn-sm" id="gua">Guardar</button>
                <button class="btn btn-danger btn-sm" id="can">Cancelar</button>
            </div>
        </div>
    </div>
    <!-- modal cliente -->
    <div class="modal fade" id="mcliente">
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
                            <select class="form-control" id="td" data-val="true">
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
                            <label>Contacto</label>
                            <select id="contcli" class="form-control" data-val="true">
                                <option value=""></option>
                            </select>
                            <span id="econt" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 col-12 form-group">
                            <label>Email</label>
                            <input type="text" class="form-control" id="email" data-val="true" />
                            <span id="eemail" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 col-12 form-group">
                            <label>Teléfono</label>
                            <input type="text" class="form-control" id="tel" data-val="true" />
                            <span id="etel" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 col-12 form-group">
                            <label>Celular</label>
                            <input type="text" class="form-control" id="cel" data-val="true" />
                            <span id="ecel" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 col-12 form-group">
                            <label>Ubigeo</label>
                            <select id="ubi" class="form-control" data-val="true">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 col-12 mb-2">
                            <label>Direcciones de Llegada</label>
                            <button class="btn btn-blue-madison btn-sm float-right" id="ndirlleg"><i class="fa fa-plus-circle"></i>&nbsp;Agregar</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 col-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-bordered table-hover table-striped" id="dirllegada">
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
    </div>
    <!-- modal prods -->
    <div class="modal fade" role="dialog" id="prods">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titp">Agregar Producto</h4>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <input type="text" class="form-control text-right" style="display: none" data-val="true" id="idp" />
                        <div class="col-md-4 form-group">
                            <label>Código</label>
                            <div class="input-group">
                                <input type="text" class="form-control text-right" data-val="true" id="codp" />
                                <div class=" input-group-append">
                                    <button class="btn btn-sm btn-primary" id="bcod" style="border-bottom-right-radius: 4px; border-top-right-radius: 4px"><i class="fa fa-search"></i></button>
                                </div>
                                <span id="ecodp" class="invalid-feedback"></span>
                            </div>
                        </div>
                        <div class="col-md-8 form-group">
                            <label>Nombre Producto</label>
                            <select class="form-control" id="nomp"></select>
                            <span id="enomp" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Almacén</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <select id="alm" class="form-control" data-val="true">
                                <option value=""></option>
                            </select>
                            <span id="ealm" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row align-self-center">
                        <div class="col-md-4 form-group text-right">
                            <label>Unidad/Medida</label>
                        </div>
                        <div class="col-md-5 form-group">
                            <select class="form-control" id="ump"></select>
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
                        <div class="col-md-2 form-group text-right" style="padding-top: 20px;display: none;">
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
                            <select id="ivg" class="form-control" style="display: none"></select>
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
                    <div class="row">
                        <input type="text" class="form-control text-right" readonly="readonly" style="display: none" data-val="true" id="idimp" />
                        <div class="col-md-4 form-group">
                            <label>Importación</label>
                            <div class="input-group">
                                <input type="text" class="form-control text-right" readonly="readonly" data-val="true" id="imp" />
                                <div class=" input-group-append">
                                    <button class="btn btn-sm btn-primary" id="bimp" style="border-bottom-right-radius: 4px; border-top-right-radius: 4px"><i class="fa fa-search"></i></button>
                                </div>
                                <span id="eimp" class="invalid-feedback"></span>
                            </div>
                        </div>
                        <div class="col-md-8 form-group">
                            <label>Comentarios</label>
                            <input type="text" class="form-control text-right" id="coment" />
                        </div>
                    </div>
                    <div class="row pos">
                        <div class="col-md-12 my-3 align-content-center">
                            <button type="button" style="width: 180px" class="btn btn-danger" id="canp"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            <button type="button" style="width: 180px" class="btn btn-primary" id="agrp"><i class="fa fa-plus-circle"></i>&nbsp;Agregar Producto</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal dirección de partida -->
    <div class="modal fade" id="mdirpar">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Nueva Dirección de Partida</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3 col-12 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control" id="descdp" data-val="true" />
                            <span id="edescdp" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row pos">
                        <div class="col-md-6 my-3 align-content-center">
                            <button type="button" style="width: 180px" class="btn btn-primary mb-2" id="guadp"><i class="fa fa-save"></i>&nbsp;Guardar</button><br />
                            <button type="button" style="width: 180px" class="btn btn-danger" id="candp"><i class="fa fa-times-circle"></i>&nbsp;Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal dirección de llegada -->
    <div class="modal fade" id="mdirlleg">
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
                        <div class="col-md-3 col-12 form-group">
                            <label>Descripción</label>
                            <input type="text" class="form-control" id="descdlleg" data-val="true" />
                            <span id="edescdlleg" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 col-12 form-group">
                            <label>Puesto</label>
                            <input type="text" class="form-control" id="puestodlleg" data-val="true" />
                            <span id="epuestodlleg" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row pos">
                        <div class="col-md-6 my-3 align-content-center">
                            <button type="button" style="width: 180px" class="btn btn-primary mb-2" id="agrdirlleg"><i class="fa fa-save"></i>&nbsp;Guardar</button><br />
                            <button type="button" style="width: 180px" class="btn btn-danger" id="candlleg"><i class="fa fa-times-circle"></i>&nbsp;Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal importación -->
    <div class="modal fade" id="mimportacion">
        <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Compra Local / Importación</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 table-responsive">
                            <div id="infoimp"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Registro de Pago -->
    <div class="modal fade" id="ModalRegPago">
        <div class="modal-dialog modal-lg" style="width: 80%;">
            <div class="modal-content" style="width: 100%;">
                <div class="modal-header">
                    <h5 class="modal-title" id="Datosconlabel">Registrar Pagos</h5>
                    <button type="button" class="close" data-dismiss="modal">&times; </button>
                </div>
                <div class="modal-body" id="contentDatoscon" style="width: 100%;">
                    <div id="lista">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-inline float-left" id="busqueda">
                                    <label for="op" class="mr-sm-2">Filtrar por:</label>
                                    <select class="form-control form-control-sm mb-2 mr-sm-2" id="opc">
                                        <option value="0">Todos</option>
                                        <option value="1">Nombre/Razón Social</option>
                                        <option value="2">Contacto</option>
                                        <option value="3">RUC</option>
                                        <option value="4">Fecha Emisión</option>
                                    </select>
                                    <input type="text" readonly="readonly" id="bfecd" class="form-control form-control-sm mb-2 mr-sm-2" style="display: none" />
                                    <input type="text" readonly="readonly" id="bfeca" class="form-control form-control-sm mb-2 mr-sm-2" style="display: none" />
                                    <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Buscar" id="bval" style="display: none" />
                                    <button class="btn btn-primary btn-sm mb-2 mr-sm-2" id="bus"><i class="fa fa-search"></i></button>
                                </div>
                                <div class="form-inline float-right">
                                    <button class="btn btn-primary mb-2 btn-sm mr-sm-2 " id="regpago"><i class="fa fa-plus-circle"></i>&nbsp;Registrar Pago</button>
                                    <button class="btn btn-primary mb-2 btn-sm " id="repexcel"><i class="fa fa-plus-circle"></i>&nbsp;Reporte Excel</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row">
                                <div class="col-12 table-responsive table-responsive-sm ">
                                    <table class="table table-bordered table-sm table-striped table-hover" id="info">
                                        <thead>
                                            <tr>
                                                <th style="display: none;">ID</th>
                                                <th class="thp">Serie</th>
                                                <th class="thp">Número</th>
                                                <th class="thp">Condiciones Pago</th>
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
                            <select class="form-control" id="exp" data-val="true" disabled="disabled">
                            </select>
                            <span id="eexp" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-3 col-6 form-group">
                            <label>Fecha de Pago</label>
                            <input type="text" readonly="readonly" id="fecp" class="form-control" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-10 col-12 table-responsive table-responsive-sm">
                            <table class="table table-sm table-bordered table-hover table-striped" id="datosregpag">
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

                    <div class="row">
                        <div class="col-md-10 text-center">
                            <div class="row">
                                <div class="col-md-3 text-right">
                                    <label>Deuda Total(S/)</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="totdeuda" data-val="true" readonly="readonly" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 text-right">
                                    <label>Total a Pagar</label>
                                </div>
                                <div class="col-md-2">
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


    <input type="hidden" id="limps" value="" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/pages/js/regvtas.js"></script>
</asp:Content>
