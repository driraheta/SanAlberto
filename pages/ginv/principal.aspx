<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="principal.aspx.cs" Inherits="SanAlberto.pages.cats.prods" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">Gestionar Inventarios
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
                <h6 class="card-title mb-0 text-gray-900 text-uppercase font-weight-bolder">Operaciones</h6>
            </div>&nbsp
            <div class="form-group row">
                <a class="btn bg-gradient-primary btn-sm text-white text-center" href="/pages/cats/prods.aspx"><span style="align-content: start;"><i class="d-sm-inline-block mr-1 fa fa-pen"></i></span>Registrar Prod./Serv.</a>
                <button class="btn bg-gradient-success btn-sm text-white text-center" id="ingresos" onclick="nuevo();"><span style="align-content: start;"><i class="d-md-inline-block d-none ml-1 mr-2 fa fa-plus-circle"></i></span>Ingresos</button>
                <button class="btn bg-gradient-danger btn-sm text-white text-center" id="salidas" data-toggle="modal" data-target="#salidasModal"><span style="align-content: start;"><i class="d-md-inline-block d-none ml-1 mr-2 fa fa-minus-circle"></i></span>Salidas</button>
                <a class="btn bg-gradient-info btn-sm text-white text-center" href="/pages/Traslados/traslados.aspx"><span style="align-content: start;"><i class="d-sm-inline-block mr-1 fa fa-pen"></i></span>Traslados</a>
                <%--<button class="btn bg-gradient-info btn-sm text-white text-center" id="traslados" data-toggle="modal" data-target="#trasladosModal"><span style="align-content: start;"><i class="d-md-inline-block d-none ml-1 mr-2 fa fa-dolly"></i></span>Traslados</button>--%>
                <button class="btn btn-block bg-gradient-secondary btn-sm text-white text-center" style="display: none;" id="importar"><span style="align-content: start;"><i class="d-sm-inline-block d-none ml-1 mr-2 fa fa-pen"></i></span>Importar</button>
                <a class="btn bg-gradient-danger btn-sm text-white text-center" href="/pages/ginv/CierreInventario.aspx"><span style="align-content: start;"><i class="d-sm-inline-block mr-1 fa fa-pen"></i></span>Cierre de Inventario</a>
                <div class="col-2" style="display: none">
                    <div class="btn-toolbar">
                        <div class="btn-group">
                            <button class="btn bg-gradient-light rounded mb-2 btn-sm  text-white text-left" id="actlotes"><span style="align-content: start;"><i class="ml-1 mr-2 fa fa-pen"></i></span>Actualizar lote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-sm-2">
                    <div class="form-group">
                        <label class="border-bottom w-100" for="exampleFormControlInput1">Almacen</label>
                        <select class="form-control rounded" id="alm">
                        </select>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="border-bottom w-100" for="exampleFormControlInput1">Busqueda por Código/Producto</label>
                        <input class="form-control" type="text" id="filtrar" placeholder="...">
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="row">
                        <div class="col-7">
                            <label style="padding-top: 8px; font-weight: bold;">Reporte Inventario Resumido</label>
                        </div>
                        <div class="col-5">
                            <div class="btn-group d-flex" role="group" aria-label="...">
                                <button type="button" class="btn btn-success w-25" id="expdetview" onclick="exportars();"><span class="mr-2 fa fa-file-excel"></span></button>
                                <button type="button" class="btn btn-danger w-25" id="pdfdetview" onclick="genpdfs();"><span class="mr-2 fa fa-file-pdf"></span></button>
                            </div>
                        </div>
                    </div>
                    &nbsp;
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
                <div class="stickyTable col-12 table-responsive table-responsive-sm" style="height: 40vh;">
                    <table class="table table-sm table-hover" id="info">
                        <thead>
                            <tr>
                                <th style="display: none">ID</th>
                                <th>Código</th>
                                <th>Producto (Insumo/Elaborado)</th>
                                <th>UM</th>
                                <th>Fecha Ingreso</th>
                                <th>Costo Unitario (S/.)</th>
                                <th>Costo</th>
                                <th>Precio Venta</th>
                                <th>#Días Antig.</th>
                                <th>Urgente Mover</th>
                                <th>Cantidad Devolución</th>
                                <th>Stock Total</th>
                                <th>Cant. Reservada</th>
                                <th>Cant. Disponible</th>
                            </tr>
                        </thead>
                        <tbody id="tinfobody" class="buscar"></tbody>
                    </table>
                </div>
                <div class="col-12 table-responsive">
                    <div id="ordenes"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-8" style="display: none">
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Tipo</label>
                        <select class="form-control rounded-pill" id="tipo">
                            <option value="Todos">Mostrar Productos y Servicios</option>
                            <option value="Productos">Productos</option>
                            <option value="Servicios">Servicios</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row mb-1 justify-content-between">
                <div class="col-3 col-sm-4 col-md-4 col-lg-3">
                    <div id="chkcosto">
                        <label for="vercinv">
                            <input type="checkbox" id="viscosto">&nbsp;Visualizar Costos
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Page List End -->

    <!-- Page Form -->
    <div id="forma" class="card" style="display: none">
        <div class="card-header">
            <h6 class="card-title">Registrar Ingreso de Productos (Compras)</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-4 col-12 mb-0 form-group" style="display: none">
                    <label>Tipo de ingreso</label>
                    <select class="form-control rounded form-control-sm" id="seltpo" onchange="cargaImp();">
                        <option value="PackList">O/C</option>
                        <option value="OC">Compra Local</option>
                    </select>
                </div>
                <div class="col-md-4 col-12 mb-0 form-group">
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Almacen</label>
                        <select class="form-control rounded form-control-sm" id="almeent">
                        </select>
                    </div>
                </div>
                <div class="col-md-4 col-12 mb-0 form-group">
                    <label>Seleccionar una O/C - Compra Local</label>
                    <select class="form-control form-control-sm rounded" id="seloc" onchange="getPackingDet();">
                    </select>
                    <span id="ecopro" class="invalid-feedback"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 mb-0 form-group">
                    <label>Lista de productos</label>
                </div>
                <div class="stickyTable col-12 table-responsive table-responsive-sm ">
                    <table class="table table-bordered table-sm table-striped table-hover" id="lproent">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>UM</th>
                                <th>Cantidad a ingresar</th>
                                <th>Precio de Compra</th>
                                <th>Stock Actual</th>
                                <th>Nuevo Stock</th>
                                <th style="display: none">SUBT</th>
                                <th style="display: none">IVG</th>
                                <th style="display: none">TOT</th>
                                <th style="display: none">UM</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="col-12 col-md-7">
                    <textarea class="form-control" rows="3" placeholder="Escribe aquí una observación" id="txtobs" required></textarea>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary btn-sm float-right" style="min-width: 120px" id="btnguarda" onclick="creaInv();"><i class="fa fa-save"></i>&nbsp; Guardar</button>
                <button class="btn btn-warning btn-sm" style="min-width: 120px" id="btncerrar" onclick="cerrar();"><i class="fa fa-sign-out-alt"></i>&nbsp; Regresar</button>
            </div>
        </div>
    </div>
    <!-- Page Form End-->

    <!-- Modal Salidas -->
    <div class="modal fade" id="salidasModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-md " role="document">
            <div class="modal-content">
                <div class="modal-header bg-gradient-danger text-white">
                    <h5 class="modal-title text-center col-11 font-weight-bold">Disminuir Stock de Productos</h5>
                    <button class="close text-white" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 mb-1">
                            <label>Almacen</label>
                            <select class="form-control rounded form-control-sm" id="selalmsal">
                            </select>
                            <span style="display: none" class="help-block text-primary small">Sucursal:COORPORACIÓN DEL CARPIO SANCHEZ & ASOCIADOS S.A.C(ID:1960)</span>
                        </div>
                        <div class="col-12 mb-1">
                            <label>Seleccionar producto</label>
                            <select class="form-control select2 rounded form-control-sm" id="selprosal" onchange="traeInv('selprosal','txtinvActSal'); cargaImpDisminuir();">
                            </select>
                            <span style="display: none" class="help-block text-primary small">Sucursal:COORPORACIÓN DEL CARPIO SANCHEZ & ASOCIADOS S.A.C(ID:1960)</span>
                        </div>
                        <div class="col-sm-6">
                            <label>Stock Actual</label>
                            <div class="input-group mb-3 rounded-pill">
                                <div class="input-group-prepend">
                                    <span class="input-group-text small">Und.</span>
                                </div>
                                <input type="text" class="form-control small" aria-label="InvActual" aria-describedby="basic-addon1" disabled="disabled" id="txtinvActSal">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label>Cant. a Disminuir</label>
                            <div class="input-group mb-3 rounded-pill">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Und.</span>
                                </div>
                                <input type="text" class="form-control" placeholder="Cantidad" aria-label="Cantidad" aria-describedby="basic-addon1" id="txtcantsale">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label>O/C</label>
                            <div>
                                <select class="form-control form-control-sm rounded" id="selocdisminuir">
                                </select>
                            </div>
                        </div>
                        <div class="col-12">
                            <label>Obsevación</label>
                            <textarea class="form-control" placeholder="Escriba aqui una observación" id="txtobssale"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="button" data-dismiss="modal" onclick="generaSalida();">Disminuir Stock</button>
                    <button class="btn btn-secondary" type="button" id="cansal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Salidas End-->

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
                            <select class="form-control rounded form-control-sm" id="selprotras" onchange="traeImp('selprotras','txtinvacttras');">
                            </select>
                        </div>

                        <div class="col-sm-6">
                            <label>Importacion</label>
                            <select class="form-control rounded form-control-sm" id="selimportacion" onchange ="traeDetImp();">
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

    <!--Cierre Inventario -->
    <div class="modal fade" id="cierreModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header bg-gradient-info text-white">
                    <h5 class="modal-title text-center col-11 font-weight-bold">Cierre de Inventario</h5>
                    <button class="close text-white" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    <div class="stickyTable col-12 table-responsive table-responsive-sm" style="height: 60vh;">
                        <table class="table table-bordered table-sm table-striped table-hover" id="tcierreinv">
                            <thead>
                                <tr>
                                    <th style="display: none">ID</th>
                                    <th>Código</th>
                                    <th>Producto/Servicio</th>
                                    <th>Unidad</th>
                                    <th>Stock Inicial</th>
                                    <th>Nro. Documento</th>
                                    <th>Fecha Emisión (Documento)</th>
                                    <th>Ingresos</th>
                                    <th>Salidas</th>
                                    <th>Ajuste (+/-)</th>
                                    <th>Stock Final</th>
                                    <th>Fecha de Registro (ajuste)</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="tcierreinvbody"></tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary rounded" type="button" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!--Cierre Inventario End-->

    <div class="modal fade" id="cierreinvModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header bg-gradient-info text-white">
                    <h5 class="modal-title text-center col-11 font-weight-bold">Ajuste de Inventario (+/-)</h5>
                    <button class="close text-white" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <label><b>Almacén de origen</b></label>
                            <hr class="m-0" />
                        </div>
                        <div class="col-4">
                            <label>Origen</label>
                            <select class="form-control rounded form-control-sm" id="cinvalm" disabled="disabled">
                            </select>
                        </div>
                        <div class="col-6">
                            <label>Producto</label>
                            <select class="form-control rounded form-control-sm" id="cinvprod" disabled="disabled">
                            </select>
                        </div>
                        <div class="col-2">
                            <label>Fecha de registro</label>
                            <input type="text" class="form-control" id="cinvfec" data-val="true" readonly="readonly" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <label>Tipo de Operación</label>
                            <select class="form-control rounded form-control-sm" id="cinvtpooper">
                                <option value="1">Aumentar Stock </option>
                                <option value="2">Disminuir Stock </option>
                                <option value="3">Trasladar productos</option>
                            </select>
                        </div>
                        <div class="col-3">
                            <label>Nro. Importación/Compras</label>
                            <select class="form-control rounded form-control-sm" id="cinvocpac">
                            </select>
                        </div>
                        <div class="col-md-3 form-group">
                            <label>Filtrar</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="filtroProductoA" />
                                <div class=" input-group-append">
                                    <button class="btn btn-sm btn-primary" style="border-bottom-right-radius: 4px; border-top-right-radius: 4px"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <label>Producto</label>
                            <select class="form-control rounded form-control-sm" id="cinvprodocpac">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <label>Stock Actual (Caja)</label>
                            <input type="text" class="form-control rounded form-control-sm" id="cinvstockact" readonly="readonly" />
                        </div>
                        <div class="col-4">
                            <label>Ingresar la cantidad a ajustar:</label>
                            <input type="text" class="form-control rounded form-control-sm numeros" id="cinvcantajus" />
                        </div>
                        <div class="col-4">
                            <label>Stock Final</label>
                            <input type="text" class="form-control rounded form-control-sm" id="cinvstockfin" readonly="readonly" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <label>Observaciones (Motivo de Ajuste)</label>
                            <input type="text" class="form-control rounded form-control-sm" id="cinvobs" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary rounded" type="button" id="canajuste">Cerrar</button>
                    <button class="btn btn-primary rounded" type="button" onclick="GuardarCierre();">Guardar</button>
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
    <!--Modal reporte pdf End-->

    <!--Modal reporte pdf-->
    <div class="modal fade" id="ModalDetParams" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" style="text-align: center;">Detalles del reporte</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-6">
                            <label>Año</label>
                        </div>
                        <div class="col-6">
                            <input type="text" class="form-control numeros" id="panio" value="" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label>Mes</label>
                        </div>
                        <div class="col-6">
                            <select class="form-control" id="pmes">
                                <option value="0" selected="selected">Todos</option>
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary rounded" type="button" id="btExportar">Exportar</button>
                    <button class="btn btn-secondary rounded" type="button" id="btCerrar">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!--Modal reporte pdf End-->

    <input type="hidden" id="id" value="0" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="/assets/global/plugins/gijgo/modular/js/core.min.js"></script>
    <script src="/assets/global/plugins/gijgo/modular/js/datepicker.min.js"></script>
    <script src="/assets/global/js/jquery.malco.js"></script>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/js/cat/almacen.js"></script>
    <script src="/assets/global/js/numeros.js"></script>
    <script src="/assets/global/pages/js/inventariosp.js"></script>
</asp:Content>
