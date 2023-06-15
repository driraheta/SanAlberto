function cargaCXC2(fil = "") {
    $("#tinfobody").html("");
    let info = new Object();
    let edo = "";
    /*agregado*/
    let color = "";
    let ocultar = "";
    /*fin agregado*/
    info = fil;
    get('/ws/cuentasporcobrar.aspx/ListarCXCo', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
              
                var fila = ""; 
                var f = 1;
                $(res).each(function () {
                    /*agregado para no mostrar anulados en carga principal*/
                    if (info.estado == "3") {
                             ocultar = "";
                    }else if (info.estado == "" && info.feci == undefined &&
                        info.fecf == undefined && info.nom == undefined && info.cont == undefined &&
                        info.ruc == undefined && info.serie == undefined    && this.STATUS == "3") {
                        ocultar = "class='d-none'";
                    } 
                    /*agregado para formato de fecha y monto con 2 decimales */
                    var fecha1 = formatoFecha(this.FECHAEMISION, 1);
                    var total = Number(this.TOTAL).toFixed(2);
                    edo = this.STATUS;
                    var td = '<input type="checkbox" class="case" name="case[]" value="' + f + '">';
                    
                    switch (this.STATUS) {
                        case  "":
                            edo = "";
                            color = "style = 'color:white !important; background-color:white'";
                            break;
                        case "1":
                            edo = "Pendiente";
                            color = "style = 'color:white !important; background-color:#A9D08E'";
                            //td = '<input type="checkbox" class="case" name="case[]" value="' + f + '">';
                            break;
                        case "2":
                            edo = "Cancelado";
                            color = "style = 'color:white !important; background-color:#4472C4'";
                            //td = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            ocultar = "class='cancelado'";
                            break;
                        case "3":
                            edo = "Anulado";
                            color = "style = 'color:white !important; background-color:#FF0000'";
                            ocultar;
                            td = "";
                            //td = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            break;
                    }

                    if (total == "" || total == 0.00) {
                          total = "";
                    }
                    if (fecha1 === '01/01/1') {
                        fecha1 = "";
                        td = "";
                    }
                    /* prueba para filtro por fechas
                    var hoy = new Date();
                    var hasta = new Date();
                    hasta.setMonth(hoy.getMonth() - 6);

                    console.log("fecha actual: " + formatoFecha(hoy, 1) + " " + "fecha hace " + formatoFecha(hasta, 1) + " " + "fecha vacia " + formatoFecha(this.FECHAEMISION,1));
                    */
                    fila += '<tr id="tr' + this.ID_VENTAS + '" '/*agregado*/ + ocultar + '><td style="display:none;" data-camp="id">' + this.ID_VENTAS + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.SERIE + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.NUMERO + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + fecha1 + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + this.NOMBRE_CLIENTE + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + /*agregado*/total + '</td>' +
                        '<td data-camp="" class="text-center tdp"></td>' +
                        '<td data-camp="" class="text-center tdp" ' + color + ' >' + edo + '</td>' +
                        '<td data-camp="">' + td + '</td>' +
                        '</tr>';
                });

                $("#tinfobody").html(fila);
                f++;
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

let vent = new Array();
function guardaRegistro() {
    console.log("prueba");
    let data = "";
    let v = new Object();
    // para cada checkbox "chequeado"
    $("input[type=checkbox]:checked").each(function () {
        var result = [];
        var i = 0;

        // buscamos el td más cercano en el DOM hacia "arriba"
        // luego encontramos los td adyacentes a este
        $(this).closest('td').siblings().each(function () {
            // obtenemos el texto del td 
            result[i] = $(this).text();
            ++i;
        });
        v.id = result[0];
        v.numserie = result[1] + result[2];
        v.cliente = result[4];
        v.monto = result[5];
        v.fechaE = result[3];
        v.status = 3;
        vent.push(v);
        /*agregado para mostrar en modal la información del pedido seleccionado*/
        data = '<div class="col-6"><label> <strong>N°Serie: </strong>' + vent[0]["numserie"] + '</label></div>'+
            '<div class="col-6"><label><strong> Fecha de emisión: </strong>' + vent[0]["fechaE"] + '</label></div></br>' +
            '<div class="col-6"><label> <strong>Cliente  : </strong>' + vent[0]["cliente"] + '</label></div>' +
            '<div class="col-6"><label><strong> Monto: </strong>S/.' + vent[0]["monto"] + '</label></div>' +
            '<div class="col-12"><label><strong>Fecha de anulación: </strong>' + formatoFecha(new Date(),1) + ' </label> </div>';
         $("#infoPed").html(data);
         $("#modalAnulados").modal({ backdrop: 'static', keyboard: false });
    });
}

$(document).ready(function () {
    let param = new Object();
    param.estado = "";
    cargaCXC2(param);

    $('#bfecd').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#bfeca').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#fecp').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date() });

    $(".gj-icon").each(function () {
        if ($(this).parent().parent().parent().parent()[0].id === "busqueda") {
            $(this).css({ "margin-left": "-2px", "margin-top": "-5px" }).parent().height("17px").css({ "margin-left": "-7px", "margin-right": "10px" }).hide();
        }
        else {
            $(this).css({ "margin-top": "0" });
        }
    });
    $("#selectall").on("click", function () {
        $(".case").prop("checked", this.checked);
    });
    $(".case").on("click", function () {
        if ($(".case").length === $(".case:checked").length) {
            $("#selectall").prop("checked", true);
        } else {
            $("#selectall").prop("checked", false);
        }
    });

    $("#opc").on("change", function () {
        $("#bfecd").hide();
        $("#bfeca").hide();
        $("#bval").hide();
        $(".gj-icon").parent().hide();

        if ($(this).val() === "4") {
            $("#bfecd").show();
            $("#bfeca").show();

            $(".gj-icon").parent().show();
        }
        else if ($(this).val() === "5") {
            $("#bedo").show();
        } else if ($(this).val() === "1") {
            $("#bval").show();
        } else if ($(this).val() === "2") {
            $("#bval").show();
        } else if ($(this).val() === "3") {
            $("#bval").show();
        }
        else if ($(this).val() === "0") {
            $("#bfecd").hide();
            $("#bfeca").hide();
            $("#bval").hide();
            $(".gj-icon").parent().hide();

        }
    });


    $("#bus").on("click", function () {
        let param = new Object();

        if ($("#bfecd").val() !== "" && $("#bfeca").val() !== "") {
            param.feci = $("#bfecd").datepicker().fecha();
            param.fecf = $("#bfeca").datepicker().fecha();
        }
        else {
        //    Alerta("Debe especificar una fecha", "AVISO!");
        //    continue;
        }

        param.nom = $("#nombreVal").val() !== "" ? $("#nombreVal").val().trim(): "";
        param.cont = $("#contactoVal").val() !== "" ? $("#contactoVal").val().trim() : "";
        param.ruc = $("#rucVal").val() !== "" ? $("#rucVal").val().trim() : "";
        /*agregado*/
        param.serie = $("#serieVal").val() !== "" ? $("#serieVal").val().trim() : "";
        param.estado = $("#filtroEstado").val() !== "" ? $("#filtroEstado").val().trim() : "";
       cargaCXC2(param);
    });

    $("#anulvent").on("click", function () {
        guardaRegistro();
    });

    /*agregado*/
    $("#restablecer").on("click", function () {
        $("#nombreVal").val("");
        $("#contactoVal").val("");
        $("#rucVal").val("");
        $("#bfecd").val("");
        $("#bfeca").val("");
        $("#serieVal").val("");
        $("#filtroEstado").val("").change();
        cargaCXC2(param);
    });

    /*agregado*/
    $("#canv").on("click", function () {
        $("#motivo").val("");
        $("#modalAnulados").modal("toggle");
        vent = new Array();
    });

    $("#closeMP").on("click", function () {
        $("#motivo").val("");
        $("#modalAnulados").modal("toggle");
        vent = new Array();
    });

    /*agregado*/
    $("#guav").on("click", function () {
       let obs = $("#motivo").val();
        
        if (vent.length > 0) {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea anular el registro seleccionado?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/RegVtas.aspx/AnularReg`, {
                    method: 'POST', body: JSON.stringify({ infov: JSON.stringify(vent) , motivo : obs }), headers: { 'Content-Type': 'application/json' }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        );
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                let res = JSON.parse(result.value.d);
                if (res.Respuesta === 1) {
                    Alerta("El pedido se anuló correctamente");
                    /*agregado*/
                    $("#motivo").val();
                    $("#modalAnulados").modal("toggle");
                    cargaCXC2(param);
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    } else {
        Alerta("Debe seleccionar un registro", "Error!", typIconoAlerta.error);
    }
    });
});
