<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="elaborados.aspx.cs" Inherits="SanAlberto.pages.ginv.elaborados" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/assets/global/plugins/gijgo/modular/css/core.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/gijgo/modular/css/datepicker.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-12 col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
                <h5 class="mb-0 text-gray-900 text-uppercase font-weight-bolder">Inventario - Productos Elaborados
                <img src="/assets/global/img/loader_blue.gif" class="loader" />
                </h5>
            </div>
        </div>
    </div>
    <!-- Page Heading End -->

    <%--lista de operaciones--%>
    <div id="lista" class="card">
        <div class="card-header">
            <div class="row">
                <h6 class="card-title mb-0 text-gray-900 text-uppercase font-weight-bolder">Operaciones</h6>
            </div>&nbsp
            <div class="form-group row">
                <button class="btn bg-gradient-success btn-sm text-white text-center" id="ingresos" onclick="nuevo();"><span style="align-content: start;"><i class="d-md-inline-block d-none ml-1 mr-2 fa fa-plus-circle"></i></span>Ingresos</button>
                <button class="btn bg-gradient-danger btn-sm text-white text-center" id="salidas" onclick="salida();"><span style="align-content: start;"><i class="d-md-inline-block d-none ml-1 mr-2 fa fa-minus-circle"></i></span>Salidas</button>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="border-bottom w-100" for="exampleFormControlInput1">Almacen</label>
                        <select class="form-control rounded" id="alm" onchange="cargaInvElaborados('P');">
                        </select>
                    </div>
                </div>
                <div class="col-sm-4">
                </div>
                <div class="col-sm-2">
                    <div class="form-group">
                        <label class="border-bottom w-100" for="exampleFormControlInput1">Filtrar</label>
                        <input class="form-control" type="text" id="filtrar" placeholder="...">
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="row">
                        <div class="col-12">
                            <label>&nbsp;</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="btn-group d-flex" role="group" aria-label="...">
                                <button type="button" class="btn btn-success w-25" id="expview" onclick="exportar('View');"><span class="mr-2 fa fa-file-excel"></span>Excel</button>
                                <button type="button" class="btn btn-danger w-25" id="pdfview" onclick="genpdf();"><span class="mr-2 fa fa-file-pdf"></span>PDF</button>
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
                                <th>Producto</th>
                                <th>UM</th>
                                <th>Fecha de registro</th>
                                <th>Costo S/</th>
                                <th>Stock (actual)</th>
                            </tr>
                        </thead>
                        <tbody id="tinfobody" class="buscar"></tbody>
                    </table>
                </div>
                <div class="col-12 table-responsive">
                    <div id="ordenes"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- Page Form -->
    <div id="forma" class="card" style="display: none">
        <div class="card-header">
            <h6 class="card-title">Ingreso de Productos Elaborados (Stock)</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-2 col-12 mb-0 form-group">
                    <label>Seleccionar Almacen</label>
                    <select class="form-control rounded form-control-sm" id="selalm">
                    </select>
                </div>
                <div class="col-md-3 col-12 mb-0 form-group">
                    <label>Seleccionar Producto Elaborado</label>
                    <select class="form-control rounded form-control-sm" id="selprod">
                    </select>
                </div>
                <div class="col-md-2 col-12 mb-0 form-group">
                    <label for="exampleFormControlInput1">Cantidad a generar</label>
                    <input type="text" class="form-control" id="cantgen" />
                </div>
                <div class="col-md-2 col-12 mb-0 form-group">
                    <label for="exampleFormControlInput1">Costo Unitario</label>
                    <input type="text" class="form-control" id="cunit" />
                </div>
                <div class="col-md-2 col-12 mb-0 form-group">
                    <label><i class="fa fa-calendar"></i>&nbsp;Fecha Doc.</label>
                    <input type="text" class="form-control" id="fregistro" data-val="true" readonly="readonly" />
                    <span id="efregistro" class="invalid-feedback"></span>
                </div>
                <div class="col-md-1 col-12 mb-0 form-group">
                    <label for="exampleFormControlInput1">&nbsp</label>
                    <button type="button" class="form-control bt btn-success w100" onclick="cargaProdsDetConversion()" id="btCargar">Cargar</button>
                </div>
            </div>

            <div class="row">
                <div class="col-12 mb-0 form-group">
                    <label>Lista de productos</label>
                </div>
                <div class="stickyTable col-12 table-responsive table-responsive-sm ">
                    <table class="table table-bordered table-sm table-striped table-hover" id="lprocon">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <%--<th style="width: 130px;">UM</th>--%>
                                <th>Cantidad</th>
                                <th>Costo Unitario (S/.)</th>
                                <th>Precio Venta (S/.)</th>
                                <th style="width: 50px;">Seleccionar O/C - IMP</th>
                                <th>Stock Actual</th>
                                <th>Nuevo Stock</th>
                            </tr>
                        </thead>
                        <tbody id="lprocondet"></tbody>
                    </table>
                </div>
                <div class="col-12 col-md-7">
                    <textarea class="form-control" rows="3" placeholder="Escribe aquí una observación" id="txtobs" required></textarea>
                </div>
            </div>

        </div>
        <div class="card-footer">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary btn-sm float-right" style="min-width: 120px" id="btnguarda" onclick="guardaRegistro();"><i class="fa fa-save"></i>&nbsp; Guardar</button>
                <button class="btn btn-warning btn-sm" style="min-width: 120px" id="btncerrar" onclick="cerrar();"><i class="fa fa-sign-out-alt"></i>&nbsp; Regresar</button>
            </div>
        </div>
    </div>
    <!-- formulario de salida -->
    <div id="salida" class="card" style="display: none">
        <div class="card-header">
            <h6 class="card-title">Salida de Productos Elaborados (Stock)</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-2 col-12 mb-0 form-group">
                    <label>Seleccionar Almacen</label>
                    <select class="form-control rounded form-control-sm" id="selalme">
                    </select>
                </div>
                <div class="col-md-3 col-12 mb-0 form-group">
                    <label>Seleccionar Producto Elaborado</label>
                    <select class="form-control rounded form-control-sm" id="selprode">
                    </select>
                </div>
                <div class="col-md-2 col-12 mb-0 form-group">
                    <label for="exampleFormControlInput1">Cantidad a sacar</label>
                    <input type="text" class="form-control" id="cantsal" />
                </div>
                <div class="col-md-2 col-12 mb-0 form-group">
                    <label for="exampleFormControlInput1">Costo Unitario</label>
                    <input type="text" class="form-control" id="cunitsal" />
                </div>
                <div class="col-md-2 col-12 mb-0 form-group">
                    <label><i class="fa fa-calendar"></i>&nbsp;Fecha Doc.</label>
                    <input type="text" class="form-control" id="fregistrosal" data-val="true" readonly="readonly" />
                    <span id="efregistrosal" class="invalid-feedback"></span>
                </div>
                <div class="col-12 col-md-7">
                    <textarea class="form-control" rows="3" placeholder="Escribe aquí una observación" id="txtobse" required></textarea>
                </div>
            </div>

        </div>
        <div class="card-footer">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary btn-sm float-right" style="min-width: 120px" id="btnguardas" onclick="guardaRegistroSalida();"><i class="fa fa-save"></i>&nbsp; Guardar</button>
                <button class="btn btn-warning btn-sm" style="min-width: 120px" id="btncerrars" onclick="cerrarSalida();"><i class="fa fa-sign-out-alt"></i>&nbsp; Regresar</button>
            </div>
        </div>
    </div>
    <%--modal de salidas--%>
    <div class="modal fade" id="salidasModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg " role="document">
            <div class="modal-content">
                <div class="modal-header bg-gradient-success text-white">
                    <h5 class="modal-title text-center col-11 font-weight-bold">Ajuste de Inventario (+/-)</h5>
                    <button class="close text-white" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-4 mb-1">
                            <label>Almacen Origen</label>
                            <select class="form-control rounded form-control-sm" id="selalmsal" onchange="cargaInv('S');">
                            </select>
                            <span style="display: none" class="help-block text-primary small">Sucursal:COORPORACIÓN DEL CARPIO SANCHEZ & ASOCIADOS S.A.C(ID:1960)</span>
                        </div>
                        <div class="col-4 mb-1">
                            <label>Producto</label>
                            <select class="form-control rounded form-control-sm" id="selprodajuste" onchange="traeInv('selprooper','txtinvActSal'); cargaImpDisminuir();">
                            </select>
                            <span style="display: none" class="help-block text-primary small">Sucursal:COORPORACIÓN DEL CARPIO SANCHEZ & ASOCIADOS S.A.C(ID:1960)</span>
                        </div>
                        <div class="col-md-4 col-4 mb-0 form-group">
                            <label><i class="fa fa-calendar"></i>&nbsp;Fecha de registro</label>
                            <input type="text" class="form-control" id="fregajuste" data-val="true" readonly="readonly" />
                            <span id="efregajuste" class="invalid-feedback"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 form-group">
                            <label>Tipo de Operacion</label>
                            <select class="form-control rounded form-control-sm" id="seltipooper" onchange="traeInv('selprosal','txtinvActSal'); cargaImpDisminuir();">
                                <option value="1">Aumentar Stock </option>
                                <option value="2">Disminuir Stock </option>
                                <option value="3">Trasladar productos</option>
                            </select>
                        </div>
                        <div class="col-3">
                            <label>Nro Importacion/Compras</label>
                            <div>
                                <select class="form-control form-control-sm rounded" id="selocdisminuir">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3 form-group">
                            <label>Filtrar</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="filtroProductooper" />
                                <div class=" input-group-append">
                                    <button class="btn btn-sm btn-primary" style="border-bottom-right-radius: 4px; border-top-right-radius: 4px"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-3 mb-1">
                            <label>Producto</label>
                            <select class="form-control rounded form-control-sm" id="selprooper" onchange="traeInv('selprooper','txtinvActSal'); cargaImpDisminuir();">
                            </select>
                            <span style="display: none" class="help-block text-primary small">Sucursal:COORPORACIÓN DEL CARPIO SANCHEZ & ASOCIADOS S.A.C(ID:1960)</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <label>Stock Actual</label>
                            <div class="input-group mb-3 rounded-pill">
                                <div class="input-group-prepend">
                                    <span class="input-group-text small">Und.</span>
                                </div>
                                <input type="text" class="form-control small" aria-label="InvActual" aria-describedby="basic-addon1" disabled="disabled" id="txtinvActSal">
                            </div>
                        </div>
                        <div class="col-4">
                            <label>Cant. a Ajustar</label>
                            <div class="input-group mb-3 rounded-pill">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Und.</span>
                                </div>
                                <input type="text" class="form-control" placeholder="Cantidad" aria-label="Cantidad" aria-describedby="basic-addon1" id="txtcantsale">
                            </div>
                        </div>
                        <div class="col-4">
                            <label>Stock Final</label>
                            <div class="input-group mb-3 rounded-pill">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Und.</span>
                                </div>
                                <input type="text" class="form-control" placeholder="Cantidad" aria-label="Cantidad" aria-describedby="basic-addon1" id="txtcantfinal">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <label>Obsevación</label>
                            <textarea class="form-control" placeholder="Escriba aqui una observación" id="txtobssale"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="button" data-dismiss="modal" onclick="generaSalida();">Guardar</button>
                    <button class="btn btn-secondary" type="button" id="cansal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <%--modal de traslados--%>
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
                        <div class="col-4">
                            <label>Origen</label>
                            <select class="form-control rounded form-control-sm" id="selalmtrasO" onchange="cargaInv('T');">
                            </select>
                        </div>
                        <div class="col-5">
                            <label>Producto</label>
                            <select class="form-control rounded form-control-sm" id="selprotras" onchange="traeInv('selprotras','txtinvacttras');">
                            </select>
                        </div>
                        <div class="col-3">
                            <label>Cantidad:</label>
                            <div class="input-group mb-3 rounded">
                                <input type="text" class="form-control form-control-sm" placeholder="Cantidad" aria-label="Cantidad" id="txtcanttras">
                                <input type="text" class="form-control form-control-sm" placeholder="Cantidad" aria-label="Cantidad" id="txtinvacttras" style="display: none;">
                                <div class="input-group-prepend">
                                    <label class="input-group-text btn btn-primary btn-sm" onclick="agregarProducto()"><i class="fa fa-plus" id="umtras"></i></label>
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
                        <div class="col-4">
                            <label>Destino</label>
                            <select class="form-control rounded form-control-sm" id="selalmtrasD">
                            </select>
                        </div>
                        <div class="col-8">
                            <label>Nota:</label>
                            <input type="text" class="form-control rounded form-control-sm" id="txtnotatras" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary rounded" type="button" id="cantras">Cerrar</button>
                    <button class="btn btn-primary rounded" type="button" onclick="traspasar();">Iniciar traslado!</button>
                </div>
            </div>
        </div>
    </div>

    <%--modal de cierre de inventarios--%>
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

    <!--Modal detalle OC de productos elaborados -->
    <div class="modal fade" id="modalOrdenCompra" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg " role="document">
            <input type="hidden" id="posInsumo" />
            <input type="hidden" id="idInsumo" />
            <div class="modal-content">
                <div class="modal-header bg-gradient-success text-white">
                    <h5 class="modal-title text-center col-11 font-weight-bold">Detalle Producto </h5>
                    <button class="close text-white" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="idProdComposite" />
                    <div class="row">
                        <div class="col-6">
                            <label id="nomProducto"></label>
                        </div>
                        <div class="col-2">
                            <label id="cantProducto"></label>
                        </div>
                        <div class="col-2">
                            <label>&nbsp Restantes:&nbsp</label>
                        </div>
                        <div class="col-2">
                            <label id="cantProductoRest"></label>
                        </div>
                    </div>
                    <div class="stickyTable col-12 table-responsive table-responsive-sm" style="height: 40vh;">
                        <table class="table table-sm table-hover" id="tbOrden">
                            <thead>
                                <tr>
                                    <th style="display: none">ID</th>
                                    <th>O/C</th>
                                    <th>Tipo Compra</th>
                                    <th>Proveedor</th>
                                    <th>Fecha de registro</th>
                                    <th>Stock (Caja)</th>
                                    <th>Stock (Unidades)</th>
                                    <th>Cantidad</th>
                                    <th>Nuevo Stock (UND)</th>
                                </tr>
                            </thead>
                            <tbody id="tbOrdenBody" class="buscar"></tbody>
                        </table>
                    </div>

                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal" id="candetprodcompra">Cerrar</button>
                    <button class="btn btn-primary" type="button" data-dismiss="modal" onclick="tomarProductoOrden();">Aceptar</button>
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
    <script src="/assets/global/js/cat/almacen.js"></script>
    <script src="/assets/global/pages/js/elaborados.js"></script>
</asp:Content>
