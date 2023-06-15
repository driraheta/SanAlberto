$.fn.MALCO = function (config) {
    'use strict';
    /* Texto de la grilla */
    config.texto = config.texto !== undefined ? config.texto : {};
    var texto = {
        error_cargando: reemplazaUndefinedPor(config.texto.error_cargando, 'Ocurrio un error al cargar la informaci&oacute;n.'),
        filtro_limpiar: reemplazaUndefinedPor(config.texto.filtro_limpiar, 'Retirar filtro'),
        paginas: reemplazaUndefinedPor(config.texto.paginas, 'páginas'),
        pagina: reemplazaUndefinedPor(config.texto.pagina, 'páginas'),
        primera_pagina: reemplazaUndefinedPor(config.texto.primera_pagina, 'Primera página'),
        ultima_pagina: reemplazaUndefinedPor(config.texto.ultima_pagina, 'Página final'),
        anterior_pagina: reemplazaUndefinedPor(config.texto.anterior_pagina, 'Página anterior'),
        siguiente_pagina: reemplazaUndefinedPor(config.texto.anterior_pagina, 'Página siguiente'),
        registro_encontrados: reemplazaUndefinedPor(config.texto.anterior_pagina, 'Total {t} {r}'),
        registros: reemplazaUndefinedPor(config.texto.registros, 'registros'),
        registro: reemplazaUndefinedPor(config.texto.registro, 'registro'),
        registros_mostrando: reemplazaUndefinedPor(config.texto.registros_mostrando, 'Paginar:'),
        encontrados: reemplazaUndefinedPor(config.texto.encontrados, 'encontrados'),
        sin_registros: reemplazaUndefinedPor(config.texto.encontrados, 'Sin registros que mostrar'),
        cargando: reemplazaUndefinedPor(config.texto.cargando, '.. cargando ..')
    };

    /* Variables de apoyo */
    var id = 'MALCO-' + this.attr('id').replace('#', '');
    //var info = JSON.parse(config.parametros);
    var clase = {
        /* Clases de grilla */
        columnas: id + '-columnas',
        filas: id + '-filas',

        /* Clase filtro */
        filtro: id + '-filtro',
        filtro_control_container: id + '-filtro-control-container',
        filtro_control: id + '-filtro-control',
        filtro_limpiar: id + '-filtro-limpiar',

        /* Clases paginador */
        paginador: id + '-paginador',
        paginador_pagina_actual: id + '-paginador-pagina-actual',
        paginador_paginas_por_pagina: id + '-paginador-por-pagina',
        paginador_paginas: id + '-paginador-paginas',
        paginador_registros_encontrados: id + '-paginador-registros-encontrados',
        paginador_responsive: id + '-paginador-responsive',

        paginador_siguiente: id + '-paginador-siguiente',
        paginador_final: id + '-paginador-final',
        paginador_anterior: id + '-paginador-anterior',
        paginador_primero: id + '-paginador-primero',

        /* Clase ordenamiento */
        columna_ordenar: id + '-columna-ordenar',
        columna_ordenar_control: id + '-columna-ordenar-control',

        /* Otras clases */
        fila: id + '-fila'
    };

    /* Grilla */
    var MALCO = {
        /* Atributos de tabla */
        class: reemplazaUndefinedPor(config.class, ''),
        style: reemplazaUndefinedPor(config.style, ''),

        /* Columnas especificadas */
        columnas: config.columnas,
        columnas_ancho: [],
        cols: armaColumnas(config.columnas),

        /* Modelo de la información a mostrar */
        modelo: config.modelo,

        /* La información de donde queremos consumir la data */
        url: config.url,
        type: reemplazaUndefinedPor(config.type, 'POST'),
        dataType: reemplazaUndefinedPor(config.dataType, 'json'),
        data: [],
        parametros: reemplazaUndefinedPor(config.parametros, {}),
        where: '',

        nomTabla: reemplazaUndefinedPor(config.nomTabla, ''),
        /* Ordenamiento */
        columna: config.columna,
        columna_orden: config.columna_orden,
        columna_defecto: config.columna,
        columna_defecto_orden: config.columna_orden,

        /* Paginación */
        pagina: 1,
        paginas: 1,
        total: 0,
        limite: reemplazaUndefinedPor(config.limite, 20),
        porPagina: 0,
        paginable: reemplazaUndefinedPor(config.paginable, false),

        colsfiltro: reemplazaUndefinedPor(config.colsfiltro, 1),
        /* Filtrable */
        filtrable: reemplazaUndefinedPor(config.filtrable, false),
        filtros: [],

        /* Responsive */
        responsive: reemplazaUndefinedPor(config.responsive, false),

        /* Tabla */
        tabla: null,

        /* contenedor */
        contenedor: this,

        /* Eventos para configurar la grilla */
        creaGrilla: function () {
            /* Creamos la grilla */
            MALCO.tabla = $('<table id="' + id + '" class="table ' + MALCO.class + '" style="' + MALCO.style + '"><thead class="' + clase.columnas + '"><tr></tr></thead><tbody class="' + clase.filas + '"></tbody><tfoot class="' + clase.paginador + '"></tfoot></table>');

            /* Registros por página */
            MALCO.porPagina = typeof MALCO.limite.toString() === 'number' ? MALCO.limite : MALCO.limite[0];
        },
        cargarColumnas: function () {
            cargarColumnas();
        },
        cargarData: function () {
            /* Bloqueamos los controles de la grilla */
            paginadorBloqueaControles(true);
            filtroBloqueaControles(true);
            ordenarBloqueaControles(true);

            var tbody = MALCO.tabla.find('.' + clase.filas);
            tbody.css('opacity', 0.4);


            /* Parametros a enviar */
            var parametros = {
                limite: MALCO.porPagina,
                pagina: MALCO.pagina,
                columna: MALCO.columna,
                columna_orden: MALCO.columna_orden,
                filtros: MALCO.filtros,
                parametros: MALCO.parametros,
                tabla: MALCO.nomTabla,
                cols: MALCO.cols,
                where: MALCO.where,
                info: config.parametros
            };

            /* Peticion AJAX al servidor */
            $.ajax({
                dataType: MALCO.dataType,
                type: MALCO.type,
                contentType: "application/json; charset=utf-8",
                url: MALCO.url,
                data: JSON.stringify(parametros),
                success: function (res) {
                    if (res.d !== "null") {
                        var r = JSON.parse(res.d);
                        tbody.html('')
                            .css('opacity', 1);

                        MALCO.data = r.data;
                        MALCO.total = r.total;
                    }
                    else {
                        MALCO.total = 0;
                    }
                    cargarData();
                    $("#" + config.loader).hide();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    paginadorBloqueaControles(false);
                    filtroBloqueaControles(false);
                    ordenarBloqueaControles(false);

                    tbody.html('<tr class="danger"><td colspan="' + MALCO.columnas.length + '" class="danger text-center">' + texto.error_cargando + '</td></tr>');
                    console.log(errorThrown + ' | ' + textStatus);
                    $("#" + config.loader).hide();
                }
            });

        },
        obtener: function (n) {
            return MALCO.data[n];
        },
        cargarPaginacion: function () {
            cargarPaginacion();
        }


    };

    /* Creamos la tabla y sus columnas */
    MALCO.creaGrilla();
    MALCO.cargarColumnas();

    /* Cargamos las filas */
    MALCO.cargarData();

    /* Creamos el contenedor para que la tabla tenga scroll horizontal cuando sea responsive */
    var responsiveContainer = $('<div class="table-responsive stickyTable" />');

    responsiveContainer.html(MALCO.tabla);
    MALCO.contenedor.html(responsiveContainer);

    /* Evento para ordenar */
    MALCO.tabla.on('click', '.' + clase.columna_ordenar, function () {
        var a = $(this);
        if (a.attr('disabled')) return false;

        $('.' + clase.columna_ordenar_control, a.closest('tr')).remove();

        /* Regresamos a la pagina 1 */
        MALCO.pagina = 1;

        var icono = $('<i style="margin-left:4px;font-size:0.8em;" class=""></i>');

        /* En caso que la columna clikeada no sea la actual */
        if (MALCO.columna != a.data('columna')) {
            MALCO.columna = a.data('columna');
            MALCO.columna_orden = '';
        }

        /* Cuando el ordenamiento no ha sido definido */
        if (MALCO.columna_orden.toString() === '') {
            MALCO.columna_orden = 'ASC';
            icono.attr('class', 'glyphicon glyphicon-chevron-up ' + clase.columna_ordenar_control);
            a.append(icono);
        }

        /* Cuando es ascendente */
        else if (MALCO.columna_orden == 'ASC') {
            MALCO.columna_orden = 'DESC';
            icono.attr('class', 'glyphicon glyphicon-chevron-down ' + clase.columna_ordenar_control);
            a.append(icono);
        }

        /* Cuando es descedente, regresamos al ordenamiento por defecto */
        else if (MALCO.columna_orden == 'DESC') {
            MALCO.columna_orden = '';
            MALCO.columna = MALCO.columna_defecto;
            MALCO.columna_orden = MALCO.columna_orden;
        }

        MALCO.cargarData();

        return false;
    });

    /* Eventos de filtro */
    MALCO.tabla.on('keyup', '.' + clase.filtro_control, function (e) {
        var control = $(this);

        if (e.keyCode == 13) {
            agregaFiltro({
                columna: control.data('columna'),
                valor: control.val()
            });

            MALCO.pagina = 1;
            MALCO.cargarData();
        }
    });

    /* Filtro > Select */
    MALCO.tabla.on('change', '.' + clase.filtro_control, function (e) {
        var control = $(this);

        if (control.is('select')) {
            if (control.find('option:selected').index() > 0) {
                agregaFiltro({
                    columna: control.data('columna'),
                    valor: control.val()
                });
            } else {
                retiraFiltro(control.data('columna'));
            }

            MALCO.pagina = 1;
            MALCO.cargarData();
        }
    });

    MALCO.tabla.on('click', '.' + clase.filtro_limpiar, function (e) {
        var control = $(this).closest('.parent')
            .find('.' + clase.filtro_control);

        control.val('');

        retiraFiltro(control.data('columna'));

        MALCO.pagina = 1;
        MALCO.cargarData();
    });

    /* Eventos de paginador */
    MALCO.tabla.on('keyup', '.' + clase.paginador_pagina_actual, function (e) {

        if (e.keyCode === 13) {
            if (!esNumerico($(this).val())) {
                $(this).val(MALCO.pagina);
                return;
            }

            if ($(this).val().toString() === MALCO.pagina.toString()) return;
            else if ($(this).val() > MALCO.paginas) return;
            else if ($(this).val() === 0) return;

            MALCO.pagina = parseInt($(this).val());
            MALCO.cargarData();
        }
    });

    MALCO.tabla.on('focus', '.' + clase.paginador_pagina_actual, function (e) {
        $(this).val('');
    });

    /* Registros por pagina */
    MALCO.tabla.on('change', '.' + clase.paginador_paginas_por_pagina, function () {
        MALCO.pagina = 1;
        MALCO.porPagina = parseInt($(this).val());
        MALCO.cargarData();
    });

    /* Paginador > Primera página */
    MALCO.tabla.on('click', '.' + clase.paginador_primero, function () {
        if ($(this).attr('disabled')) return;

        if (!esNumerico(MALCO.pagina)) return;
        if ($("." + clase.paginador_pagina_actual).val().toString() === "1") return;

        MALCO.pagina = 1;
        MALCO.cargarData();
    });

    /* Paginador > Página Anterior */
    MALCO.tabla.on('click', '.' + clase.paginador_anterior, function () {
        if ($(this).attr('disabled')) return;

        if (!esNumerico(MALCO.pagina)) return;
        if ($("." + clase.paginador_pagina_actual).val().toString() === "1") return;

        MALCO.pagina -= 1;
        MALCO.cargarData();
    });

    /* Paginador > Página Final */
    MALCO.tabla.on('click', '.' + clase.paginador_final, function () {
        if ($(this).attr('disabled')) return;

        if (!esNumerico(MALCO.pagina)) return;
        if ($("." + clase.paginador_pagina_actual).val().toString() === MALCO.paginas) return;

        MALCO.pagina = MALCO.paginas;
        MALCO.cargarData();
    });

    /* Paginador > Página Siguiente */
    MALCO.tabla.on('click', '.' + clase.paginador_siguiente, function () {
        if ($(this).attr('disabled')) return;

        if (!esNumerico(MALCO.pagina)) return;
        if ($("." + clase.paginador_pagina_actual).val() === MALCO.paginas.toString()) return;

        MALCO.pagina += 1;
        MALCO.cargarData();
    });

    /* Evento paginador responsive */
    MALCO.contenedor.on('change', '.' + clase.paginador_responsive, function () {
        MALCO.pagina = parseInt($(this).val());
        MALCO.cargarData();
    });

    /* Funciones de Grilla */
    function cargarColumnas() {
        var columnas = MALCO.tabla.find('.' + clase.columnas);
        columnas.html('<tr></tr>');

        /* Si es filtrable, agregamos una fila más a la cabecera */
        if (MALCO.filtrable) columnas.append('<tr class="' + clase.filtro + '"></tr>');

        $(MALCO.columnas).each(function (i, col) {
            /* Estilo de la fila */
            var _style_ = convierteObjetoAEstiloCss(
                reemplazaUndefinedPor(col.style, '')
            );

            /* Agregamos las columnas */
            var th = $('<th class="' + reemplazaUndefinedPor(col.class, '') + '" style="' + _style_ + '"></th>');

            /* Guardamos los anchos de la columna en un arreglo */
            MALCO.columnas_ancho.push(th.css('width'));

            /* Si el formato ha sido definido */
            col.leyenda = reemplazaUndefinedPor(col.leyenda, '');
            if (col.formato !== undefined) {
                th.html(col.formato());
            }
            /* Del caso contrario mostramos el valor de la propiedad en la celda */
            else th.text(col.leyenda);

            /* ¿Es ordenable? */
            if (col.ordenable) {
                var a = $('<a href="#" class="' + clase.columna_ordenar + '" data-columna="' + reemplazaUndefinedPor(col.columna, '') + '"></a>');
                a.html(th.html());

                th.html(a);
            }

            MALCO.tabla.find('thead tr:first').append(th);

            /* Agregamos los filtros */
            if (MALCO.filtrable && i < MALCO.columnas.length - MALCO.colsfiltro + 1) {
                th = $('<th ' + (i == 0 ? MALCO.colsfiltro > 0 ? 'colspan="' + MALCO.colsfiltro + '"' : '' : '') + '></th>');

                if (col.filtro !== undefined) {
                    if (typeof col.filtro == 'function') {
                        /* Control */
                        var control = $(col.filtro());
                        control.attr('data-columna', col.columna)
                            .removeClass('input-sm input-lg')
                            .addClass('input-sm')
                            .addClass(clase.filtro_control);

                        if ($(control).is('input')) {
                            /* Agregamos el control al grupo */
                            var inputGroup = $('<div class="input-group parent"><div class="' + clase.filtro_control_container + '"></div><span class="input-group-btn"><button class="btn btn-default btn-sm ' + clase.filtro_limpiar + '" type="button">Go!</button></span>');

                            var icono = '<i class="fa fa-times"></i>';

                            inputGroup.find('.' + clase.filtro_control_container).html(control);
                            inputGroup.find('.' + clase.filtro_limpiar).html(icono);

                            /* Insertamos el grupo */
                            th.html(inputGroup);
                        }

                        if ($(control).is('select')) {
                            th.html(control);
                        }
                    } else if (col.filtro) {
                        /* Control */
                        control = $(MALCO_input({}));
                        control.attr('data-columna', col.columna)
                            .removeClass('input-sm input-lg')
                            .addClass('input-sm')
                            .addClass(clase.filtro_control);
                        control.css("min-width", "125px");
                        /* Agregamos el control al grupo */
                        inputGroup = $('<div style="display:inline-flex; width:100%" class="parent"><div class="' + clase.filtro_control_container + '"></div><span class="input-group-btn"><button title="' + texto.filtro_limpiar + '" style="height:25px; padding-top:0px; padding-bottom:0; " class="btn btn-default btn-sm ' + clase.filtro_limpiar + '" type="button">Go!</button></span>');

                        icono = '<i class="fa fa-times"></i>';

                        inputGroup.find('.' + clase.filtro_control_container).html(control);
                        inputGroup.find('.' + clase.filtro_limpiar).html(icono);

                        /* Insertamos el grupo */
                        th.html(inputGroup);
                    }
                }

                MALCO.tabla.find('thead tr.' + clase.filtro).append(th);
            }
        });
    }

    function cargarData() {
        if (MALCO.data.length === 0) {
            MALCO.tabla.find('.' + clase.filas).html('<tr><td colspan="' + MALCO.columnas.length + '" class="text-center" style="line-height:.5">' + texto.sin_registros + '</td></tr>');
        }

        var tbody = MALCO.tabla.find('.' + clase.filas);
        $(MALCO.data).each(function (i, f) {
            /* Creamos la fila */
            var tr = $('<tr data-fila="' + i + '" class="' + clase.fila + '"></tr>');

            /* Agregamos las celdas*/
            $(MALCO.modelo).each(function (x, m) {
                /* Estilo de la fila */
                var _style_ = convierteObjetoAEstiloCss(
                    reemplazaUndefinedPor(m.style, '')
                );

                var td = $('<td class="' + reemplazaUndefinedPor(m.class, '') + '" style="' + _style_ + '"></td>');

                /* Obtenemos el valor de la propiedad actual*/
                var propiedad = '';

                /* Si el valor está dentro de un objeto */
                if (m.propiedad !== undefined) {
                    if (m.propiedad.indexOf('.') > -1) propiedad = buscarIndiceEnArray(f, m.propiedad);
                    else propiedad = f[m.propiedad];
                }

                /* Si el formato ha sido definido */
                if (m.formato !== undefined) td.html(m.formato(tr, f, propiedad));
                /* Del caso contrario mostramos el valor de la propiedad en la celda */
                else td.text(propiedad);

                tr.append(td);
            });

            tbody.append(tr);
        });

        //solo para solin nestle
        if (tbody[0].rows[0].cells.length === 23 && Cookies.get("per") === "514") {
            let tr = $('<tr class="font-weight-bold text-right ' + clase.fila + '"></tr>');
            let td = $('<td colspan="18">Subtotales:</td>');
            tr.append(td);
            td = $('<td id="tot1">$' + (MALCO.data ? formatoMoneda(MALCO.data[0]["TOTCOSTO"], 2, true) : "0.00") + '</td>');
            tr.append(td);
            td = $('<td id="tot2">$' + (MALCO.data ? formatoMoneda(MALCO.data[0]["TOTESPECIAL"], 2, true) : "0.00") + '</td>');
            tr.append(td);
            td = $('<td id="tot3">$' + (MALCO.data ? formatoMoneda(MALCO.data[0]["TOTEXTENDIDA"], 2, true) : "0.00") + '</td>');
            tr.append(td);
            td = $('<td colspan="2"></td>');
            tr.append(td);
            tbody.append(tr);

            tr = $('<tr class="font-weight-bold text-right ' + clase.fila + '"></tr>');
            td = $('<td colspan="18">Total:</td>');
            tr.append(td);
            let tot;
            if (MALCO.data) {
                tot = parseFloat(MALCO.data[0]["TOTCOSTO"]) + parseFloat(MALCO.data[0]["TOTESPECIAL"]) + parseFloat(MALCO.data[0]["TOTEXTENDIDA"])
            }
            else {
                tot = 0;
            }
            td = $('<td colspan="3"  id="tottot">$' + formatoMoneda(tot, 2, true) + '</td>');
            tr.append(td);
            td = $('<td colspan="2"></td>');
            tr.append(td);
            tbody.append(tr);
        }
        let fechas = $('*[data-fecha="true"]');
        $.each(fechas, function () {
            //$(this).width("300px");
            $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mmmm/yyyy", locale: "es-es", width: 180 });
            $(this).datepicker().value(new Date($(this).attr("valor")));
            $(this).prop('readonly', true);
        });
        //$(".gj-icon").css("margin-top", "-5px");
        ordenarBloqueaControles(false);
        filtroBloqueaControles(false);

        /* Agregamos la interface de paginación */
        MALCO.cargarPaginacion();
    }

    function cargarPaginacion() {
        var paginador = MALCO.tabla.find('.' + clase.paginador);

        /* Calcular total de páginas */
        paginadorCalcularPaginas();

        /* Cuando el paginador no existe */
        if (!paginador.data('cargado')) {

            /* Limpiamos el paginador */
            paginador.html('');

            if (!esMobile()) {
                /* Fila del paginador */
                var tr = $('<tr class="active"></tr>');
                tr.html('<td colspan="' + MALCO.columnas.length + '" style="height:40px;line-height:30px; font-size:90%"></td>');

                if (MALCO.paginable) {
                    /* Registros por página */
                    var registrosPorPagina = '';

                    if (typeof MALCO.limite.toString() !== 'number') {
                        registrosPorPagina = '<div class="col-sm-3 col-md-3 col-xs-3">' + texto.registros_mostrando + ' <select style="width:60px;display:inline-block;padding:0px;font-size:100%; height:25px " class="form-control input-sm ' + clase.paginador_paginas_por_pagina + '">' + paginadorPaginasAMostrar() + '</select></div>';
                    } else {
                        registrosPorPagina = '<div class="col-xs-3">' + texto.registros_mostrando + ' ' + MALCO.porPagina + ' ' + texto.registros + '</div>';
                    }

                    /* Control de paginador */
                    var controlPaginacion = '<div class="col-sm-6 col-md-6 col-xs-6 text-center"><i title="' + texto.primera_pagina + '" style="font-size:0.8em;cursor:pointer;" class="fa fa-backward ' + clase.paginador_primero + '"></i>&nbsp;&nbsp;&nbsp;<i title="' + texto.anterior_pagina + '" style="font-size:0.8em;margin-right:4px;cursor:pointer;" class="fa fa-fast-backward ' + clase.paginador_anterior + '"></i> ' + primeraLetraAMayuscula(texto.pagina) + ' <input class="form-control text-center input-sm ' + clase.paginador_pagina_actual + '" type="text" value="' + MALCO.pagina + '" style="width:25px;display:inline-block;height:25px; padding:0; margin:0; line-height:.5" /> / <b class="' + clase.paginador_paginas + '">' + MALCO.paginas + '</b> <i title="' + texto.siguiente_pagina + '" style="font-size:0.8em;margin-left:4px;cursor:pointer;" class="fa fa-forward ' + clase.paginador_siguiente + '"></i>&nbsp;&nbsp;&nbsp;<i title="' + texto.ultima_pagina + '" style="font-size:0.8em;cursor:pointer;" class="fa fa-fast-forward ' + clase.paginador_final + '"></i></div>';

                    /* Registros encontrados */
                    var registrosEncontrados = '<div class="col-sm-3 col-md-3 col-xs-3 text-right ' + clase.paginador_registros_encontrados + '">' + paginadorRegistrosPorPagina() + '</div>';

                    /* Agregamos el HTML de todo el paginador */
                    tr.find('td').html('<div style="margin:0;" class="row">' + registrosPorPagina + controlPaginacion + registrosEncontrados + '</div>');
                } else {
                    tr.find('td')
                        .addClass('text-center ' + clase.paginador_registros_encontrados)
                        .html(paginadorRegistrosPorPagina());
                }
            } else {
                /* Paginador opcional para cuando al grilla se ponga responsive */
                MALCO.contenedor.append('<select class="form-control input-lg ' + clase.paginador_responsive + '"></select>');
            }

            /* Marcamos como cargado */
            paginador.html(tr).attr('data-cargado', true);
        }
        /* Cuando ya ha sido cargado, solo debemos calcular los valores */
        else {
            if (!esMobile()) {
                /* Cantidad de páginas */
                paginador.find('.' + clase.paginador_paginas)
                    .text(MALCO.paginas);

                /* Registros a mostrar */
                paginador.find('.' + clase.paginador_registros_encontrados)
                    .html(paginadorRegistrosPorPagina());

                /* Pagina actual */
                paginador.find('.' + clase.paginador_pagina_actual)
                    .val(MALCO.pagina);
            }

            /* Desbloqueamos los controles */
            paginadorBloqueaControles(false);
        }

        // Inicializa el control para el paginador responsive
        paginadorResponsiveInicializa();
    }

    /* Funciones de Apoyo */
    function buscarIndiceEnArray(obj, indice) {
        var indices = indice.split('.');

        if (indices.length > 1) {
            var nuevo_indice = '';

            $.each(indices, function (i, v) {
                if (i > 0) {
                    nuevo_indice += v + (indices.length - 2 == i ? '.' : '');
                }
            });

            return buscarIndiceEnArray(obj[indices[0]], nuevo_indice);
        } else {
            return obj[indices[0]];
        }
    }

    function reemplazaUndefinedPor(obj, v) {
        return obj === undefined ? v : obj;
    }

    function primeraLetraAMayuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function esNumerico(x) {
        return !parseInt(x) ? false : true;
    }

    function agregaFiltro(filtro) {
        let fil = new Object();
        if (MALCO.filtros.length > 0) {
            $.each(MALCO.filtros, function (i, f) {
                if (f.columna == filtro.columna) {
                    MALCO.filtros[i].columna = filtro.columna;
                    MALCO.filtros[i].valor = filtro.valor;
                } else if (i == MALCO.filtros.length - 1) {
                    MALCO.filtros.push(filtro);
                    MALCO.where += (MALCO.where.length > 0 ? " AND " : "") + filtro.columna + " LIKE '%" + filtro.valor + "%'";
                }
            });

            $(MALCO.filtros).each(function () {
                Object.defineProperty(fil, this.columna, {
                    enumerable: true,
                    configurable: false,
                    writable: false,
                    value: this.valor
                });
            })
        } else {
            MALCO.filtros.push(filtro);
            MALCO.where += (MALCO.where.length > 0 ? " AND " : "") + filtro.columna + " LIKE '%" + filtro.valor + "%'";
            Object.defineProperty(fil, filtro.columna, {
                enumerable: true,
                configurable: false,
                writable: false,
                value: filtro.valor
            });
        }

        MALCO.where = JSON.stringify(fil);
        $("#filtro").val(MALCO.where);
    }

    function retiraFiltro(columna) {
        var filtros = [];
        var where = "";
        var fil = new Object();

        $.each(MALCO.filtros, function (i, f) {
            if (f.columna != columna) {
                filtros.push(f);
                where += (MALCO.where.length > 0 ? " AND " : "") + f.columna + " LIKE '%" + f.valor + "%'";
            }
        });

        $.each(filtros, function () {
            Object.defineProperty(fil, this.columna, {
                enumerable: true,
                configurable: false,
                writable: false,
                value: this.valor
            });

        })
        MALCO.filtros = filtros;
        MALCO.where = JSON.stringify(fil);
        $("#filtro").val(MALCO.where);
    }

    function paginadorCalcularPaginas() {
        MALCO.paginas = Math.ceil(MALCO.total / MALCO.porPagina);
    }

    function paginadorResponsiveInicializa() {
        if (esMobile()) {
            var control = MALCO.contenedor.find('.' + clase.paginador_responsive);
            control.html('');

            for (var i = 1; i <= MALCO.paginas; i++) {
                var option = $('<option value="' + i + '">' + i + ' / ' + MALCO.paginas + '</option>');

                if (i === MALCO.pagina) option.attr('selected', true);

                control.append(option);
            }
        }
    }

    function paginadorRegistrosPorPagina() {
        return texto.registro_encontrados.replace('{t}', MALCO.total).replace('{r}', MALCO.total === 0 || MALCO.total > 1 ? texto.registros : texto.registro);
    }

    function paginadorPaginasAMostrar() {
        var opciones = '';

        $.each(MALCO.limite, function (i, v) {
            opciones += '<option value="' + v + '">' + v + '</option>';
        });

        return opciones;
    }

    function paginadorBloqueaControles(r) {
        MALCO.tabla.find('.' + clase.paginador_pagina_actual)
            .attr('disabled', r);

        MALCO.tabla.find('.' + clase.paginador_paginas_por_pagina)
            .attr('disabled', r);

        MALCO.tabla.find('.' + clase.paginador_primero)
            .attr('disabled', r);

        MALCO.tabla.find('.' + clase.paginador_anterior)
            .attr('disabled', r);

        MALCO.tabla.find('.' + clase.paginador_siguiente)
            .attr('disabled', r);

        MALCO.tabla.find('.' + clase.paginador_final)
            .attr('disabled', r);

        MALCO.contenedor.find('.' + clase.paginador_responsive)
            .attr('disabled', r);
    }

    function filtroBloqueaControles(r) {
        MALCO.tabla.find('.' + clase.filtro_control)
            .attr('disabled', r);
    }

    function ordenarBloqueaControles(r) {
        MALCO.tabla.find('.' + clase.columnas + ' a')
            .attr('disabled', r);
    }

    function convierteObjetoAEstiloCss(r) {
        var _style_ = '';

        if (typeof r === 'object') {
            for (var k in r) {
                _style_ += k + ':' + r[k] + ';';
            }
        } else _style_ = r;

        return _style_;
    }

    function armaColumnas(cols) {
        var columnas = "";

        $.each(cols, function (k, value) {
            if (value.leyenda.toString() !== 'undefined')
                if (value.leyenda.toString() !== "")
                    columnas += (columnas.length > 0 ? "." : "") + value.leyenda;
        });

        return columnas;
    }

    function esMobile() {
        return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
    }

    return {
        total: function () {
            return MALCO.total;
        },
        tabla: function () {
            return MALCO.tabla;
        },
        refrescar: function () {
            MALCO.pagina = 1;
            return MALCO.cargarData();
        },
        parametros: function (param) {
            MALCO.parametros = param;
        },
        obtener: function (i) {
            return MALCO.obtener(i);
        }
    };
};
/* Controles */
function MALCO_boton(config) {
    config = {
        contenido: config.contenido !== undefined ? config.contenido : '',
        class: config.class !== undefined ? config.class : '',
        style: config.style !== undefined ? config.style : '',
        attr: config.attr !== undefined ? config.attr : [],

        type: config.type !== undefined ? config.type : 'button',
        value: config.value !== undefined ? config.value : ''
    };

    var atributos = '';
    $.each(config.attr, function (i, v) {
        atributos += v;
    });

    config.attr = atributos;

    return '<button type="' + config.type + '" style="' + config.style + '" class="btn ' + config.class + '" value="' + config.value + '" ' + config.attr + '>' + config.contenido + '</button>';
}

function MALCO_link(config) {
    config = {
        contenido: config.contenido !== undefined ? config.contenido : '',
        class: config.class !== undefined ? config.class : '',
        style: config.style !== undefined ? config.style : '',
        attr: config.attr !== undefined ? config.attr : [],

        href: config.href !== undefined ? config.href : '_self',
        target: config.target !== undefined ? config.target : ''
    };

    var atributos = '';
    $.each(config.attr, function (i, v) {
        atributos += v;
    });

    config.attr = atributos;

    return '<a href="' + config.href + '" target="' + config.target + '" class="' + config.class + '" ' + config.attr + '>' + config.contenido + '</a>';
}

function MALCO_dropdown(config) {
    config = {
        contenido: config.contenido !== undefined ? config.contenido : '',
        class: config.class !== undefined ? config.class : '',
        style: config.style !== undefined ? config.style : '',
        attr: config.attr !== undefined ? config.attr : [],

        id: config.id !== undefined ? config.id : '',
        data: config.data !== undefined ? config.data : []
    };

    var atributos = '';
    $.each(config.attr, function (i, v) {
        atributos += v;
    });

    config.attr = atributos;

    var boton = '<button id="' + config.id + '" style="' + config.style + '" class="btn ' + config.class + '" type="button" ' + config.attr + ' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + config.contenido + ' <span class="caret"></span></button>';

    var list = '<ul class="dropdown-menu" aria-labelledby="' + config.id + '">';

    $.each(config.data, function (i, v) {
        list += '<li><a href="' + v.href + '">' + v.contenido + '</a></li>';
    });

    list += '</ul>';

    return '<div class="dropdown">' + boton + list + '</div>';
}

function MALCO_input(config) {
    config = {
        class: config.class !== undefined ? config.class : '',
        style: config.style !== undefined ? config.style : '',
        attr: config.attr !== undefined ? config.attr : [],

        type: config.type !== undefined ? config.type : 'text',
        value: config.value !== undefined ? config.value : ''
    };

    var atributos = '';
    $.each(config.attr, function (i, v) {
        atributos += v;
    });

    config.attr = atributos;

    return '<input type="' + config.type + '"  class="form-control" style="border-radius: 5px; height:25px" value="' + config.value + '" ' + config.attr + ' />';
}

function MALCO_imagen(config) {
    config = {
        class: config.class !== undefined ? config.class : '',
        style: config.style !== undefined ? config.style : '',
        attr: config.attr !== undefined ? config.attr : [],

        src: config.src !== undefined ? config.src : ''
    };

    var atributos = '';
    $.each(config.attr, function (i, v) {
        atributos += v;
    });

    config.attr = atributos;

    return '<img src="' + config.src + '" class="' + config.class + '" style="' + config.style + '" ' + config.attr + '/>';
}

function MALCO_select(config) {
    config = {
        class: config.class !== undefined ? config.class : '',
        style: config.style !== undefined ? config.style : '',
        attr: config.attr !== undefined ? config.attr : [],

        selected: config.selected !== undefined ? config.selected : '',
        data: config.data !== undefined ? config.data : []
    };

    var atributos = '';
    $.each(config.attr, function (i, v) {
        atributos += v;
    });

    config.attr = atributos;

    var control = $('<select style="' + config.style + '" class="form-control input-sm ' + config.class + '" ' + config.attr + '></select>');

    $.each(config.data, function (i, d) {
        control.append('<option ' + (d.valor == config.selected ? 'selected' : '') + ' value="' + d.valor + '">' + d.contenido + '</option>');
    });

    control.css({ "min-width": "150px", "font-size": "14px", "padding-top": "2px", "padding-left": "7px", "padding-right": "7px" }).height("26");
    return control;
}