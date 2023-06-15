<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="prods.aspx.cs" Inherits="SanAlberto.pages.cats.prods" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class=" mb-0 text-gray-900 text-uppercase font-weight-bolder">Mantenimiento de Productos
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- FIN Page Heading -->

    <div id="lista" class="card">
        <div class="card-header">
                        <div class="row">
                <div class="col-8 col-m-8">
                    <div class="row">
                        <div class="col">
                            <label for="codValor" class="mr-sm-2">Codigo</label>
                            <input type="text" id="codValor" placeholder="Cod Prod" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="nomValor" class="mr-sm-2">Descripción</label>
                            <input type="text" id="nomValor" placeholder="Desc Prod" class="form-control form-control-sm mb-2 mr-sm-2" />
                        </div>
                        <div class="col">
                            <label for="estValor" class="mr-sm-2">Estado</label>
                            <select id="estValor" class="form-control form-control-sm mb-2 mr-sm-2">
                                <option value="">Todos</option>
                                <option value="1">Activo</option>
                                <option value="2">Inactivo</option>
                            </select>
                        </div>
                        <div class="col">
                            <div class="row">
                                <label for="" class="mr-sm-1">&nbsp</label>
                            </div>
                            <div class="row">
                                <button id="bus" title="Buscar" class="btn btn-primary btn-sm mb-2 mr-sm-2"><i class="fa fa-search"></i></button>
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

            <div class="col-12">
                <div class="form-inline float-right" id="busqueda">
                    <%--<label for="op" class="mr-sm-2">Filtrar por:</label>
                    <select class="form-control form-control-sm mb-2 mr-sm-2" id="opc">
                        <option value="">Todos</option>
                        <option value="1">Código</option>
                        <option value="2">Descripción</option>
                    </select>--%>
                    <%--<input type="text" class="form-control form-control-sm mb-2 mr-sm-2" placeholder="Buscar" id="bval">--%>
                    <%--<button class="btn btn-primary btn-sm mb-2 mr-sm-2" id="bus"><i class="fa fa-search"></i></button>--%>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="stickyTable col-12 table-responsive" id="Productos">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer"></div>
    </div>

    <div id="forma" class="card" style="display: none">
        <div class="card-header">
            <h6 class="card-title">Registro de Producto</h6>
        </div>
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
                        <select id="esp" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="eesp" class="invalid-feedback"></span>
                    </div>
                    <div class="col-md-3 col-6 form-group">
                        <label>
                            Variedad
                   
                        <button id="nvar" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        <select id="var" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="evar" class="invalid-feedback"></span>
                    </div>
                    <div class="col-md-3 col-6 form-group">
                        <label>
                            Calidad                
                   
                        <button id="ncali" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        <select id="cali" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="ecali" class="invalid-feedback"></span>
                    </div>
                    <div class="col-md-3 col-6 form-group">
                        <label>
                            Calibre
                   
                        <button id="ncal" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        <select id="cal" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="ecal" class="invalid-feedback"></span>
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
                        <select id="emb" class="form-control form-control-sm">
                            <option value=""></option>
                        </select>
                        <span id="eemb" class="invalid-feedback"></span>
                    </div>
                    <div class="col-md-3 col-6 form-group">
                        <label>
                            Unidad de Medida.
                   
                        <button id="num" class="btn btn-secondary btn-sm p-0 m-0 bg-transparent border-0 text-black-50" style="margin-top: -5px !important">[+ Nuevo]</button></label>
                        <select id="um" class="form-control form-control-sm">
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
                    <input type="text" class="form-control form-control-sm" id="pro" data-val="true" />
                    <span id="epro" class="invalid-feedback"></span>
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
                <button class="btn btn-primary btn-sm" id="gua" style="margin-top: 32px;"><i class="fa fa-save"></i>&nbsp;Guardar</button>
                &nbsp;
                <button class="btn btn-warning btn-sm" id="can" style="margin-top: 32px;"><i class="fa fa-sign-out-alt"></i>&nbsp;Cancelar</button>
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
                            <span id="eimpf" class="invalid-feedback"></span>
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
    <!-- modal conversión prods -->
    <div class="modal fade" id="convprods">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titp">Conversión</h4>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 form-group">
                            <label>Código</label>
                            <input type="text" class="form-control form-control-sm" id="coproc" data-val="true" />
                            <span id="ecoproc" class="invalid-feedback"></span>
                        </div>
                        <div class="col-12 form-group">
                            <label>Producto</label>
                            <select class="form-control" id="nompp" disabled="disabled"></select>
                        </div>
                    </div>
                    <div class="row">
                        <input type="text" class="form-control text-right" style="display: none" data-val="true" id="idp" />
                        <div class="col-md-2 col-12 form-group">
                            <label>Tipo Operación</label>
                            <select class="form-control" id="tpooper" data-val="true">
                                <option value="1">Compra</option>
                                <option value="2">Venta</option>
                            </select>
                            <span id="etpooper" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-2 form-group">
                            <label>Unidad/Medida</label>
                            <select class="form-control" id="ump" data-val="true"></select>
                            <span id="eump" class="invalid-feedback"></span>
                        </div>
                        <div class="col-md-5 form-group">
                            <label>Descripción</label>
                            <%--                            <input type="text" class="form-control" data-val="true" id="desc" />--%>
                            <textarea id="desc" class="form-control" data-val="true" rows="5" cols="50"></textarea>
                        </div>
                        <div class="col-md-3 form-group">
                            <label>Cantidad(Unidades)</label>
                            <input type="text" class="form-control text-right numeros" data-val="true" id="cantp" />
                            <span id="ecantp" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-warning float-right" id="canp"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            <button type="button" style="width: 180px" class="btn btn-primary float-right" id="agrp"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-8">
                            <label>Detalle Conversiones</label>
                            <div class="row">
                                <div class="col-12 table-responsive">
                                    <div id="Conversiones"></div>
                                </div>
                            </div>
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
    <!-- modal conversión prods det -->
    <div class="modal fade" id="convprodsdet">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" id="titpd">Conversión Detalle</h4>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <input type="text" class="form-control form-control-sm" style="display: none" id="idprodconv" data-val="true" />
                        <div class="col-md-7 form-group">
                            <label>Producto</label>
                            <select class="form-control select2" id="nomppd"></select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 form-group">
                            <label>Cantidad(Unidades)</label>
                            <input type="text" class="form-control text-right numeros" data-val="true" id="cantpd" />
                            <span id="ecantpd" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-warning float-right" id="canpd"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
                            <button type="button" style="width: 180px" class="btn btn-primary float-right" id="agrpd"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-8">
                            <label>Detalle Conversiones</label>
                            <div class="row">
                                <div class="col-12 table-responsive">
                                    <div id="Conversionesdet"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal conversión prods editar-->
    <div class="modal fade" id="convprodse">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Conversión</h4>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <input type="text" class="form-control text-right" style="display: none" data-val="true" id="idconvpe" />
                        <div class="col-md-1 col-12 form-group">
                            <label>Código</label>
                            <input type="text" class="form-control form-control-sm" id="coproce" data-val="true" readonly="readonly" />
                        </div>
                        <div class="col-md-7 form-group">
                            <label>Producto</label>
                            <select class="form-control" id="nomppe" disabled="disabled"></select>
                        </div>
                    </div>
                    <div class="row">
                        <input type="text" class="form-control text-right" style="display: none" data-val="true" id="idpe" />
                        <div class="col-md-2 col-12 form-group">
                            <label>Tipo Operación</label>
                            <select class="form-control" id="tpoopere" data-val="true" disabled="disabled">
                                <option value="1">Compra</option>
                                <option value="2">Venta</option>
                            </select>
                        </div>
                        <div class="col-md-2 form-group">
                            <label>Unidad/Medida</label>
                            <select class="form-control" id="umpe" data-val="true" disabled="disabled"></select>
                        </div>
                        <div class="col-md-5 form-group">
                            <label>Descripción</label>
                            <textarea id="desce" class="form-control" data-val="true" rows="5" cols="50"></textarea>
                        </div>
                        <div class="col-md-3 form-group">
                            <label>Cantidad(Unidades)</label>
                            <input type="text" class="form-control text-right numeros" data-val="true" id="cantpe" />
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
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
    <!-- modal conversión prods det -->
    <div class="modal fade" id="convprodsdete">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Conversión Detalle</h4>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <input type="text" class="form-control form-control-sm" style="display: none" id="idprodconve" data-val="true" />
                        <div class="col-md-7 form-group">
                            <label>Producto</label>
                            <select class="form-control" id="nomppde" disabled="disabled"></select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 form-group">
                            <label>Cantidad(Unidades)</label>
                            <input type="text" class="form-control text-right numeros" data-val="true" id="cantpde" />
                        </div>
                    </div>
                </div>
                <!-- Modal footer-->
                <div class="modal-footer">
                    <div class="row pos text-right">
                        <div class="col-md-12 my-2 float-right">
                            <button type="button" style="width: 180px" class="btn btn-primary" id="agrpde"><i class="fa fa-plus-circle"></i>&nbsp;Guardar</button>
                            &nbsp;
                            <button type="button" style="width: 180px" class="btn btn-warning" id="canpde"><i class="fa fa-times-circle"></i>&nbsp;Cerrar</button>
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
    <script src="/assets/global/pages/js/prods.js"></script>
</asp:Content>
