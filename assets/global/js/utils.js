var typAccion = {
    pagoCapital: 1,
    interesesCorrientes: 2,
    interesesMoratorios: 3,
    fondoReserva: 4,
    flujoFondo: 5,
    tasaReferencia: 6,
    fechaTasa: 7,
    Sobretasa: 8,
    tasaInteres: 9
};
var typIconoAlerta = {
    ok: 'success',
    error: 'error',
    aviso: 'warning',
    informacion: 'info',
    pregunta: 'question'
}
$(document).ready(function () {

    $("input[type=text]").focus(function () {
        this.select();
    });
    $('select').on("change", function () {
        $(this).removeClass("has-error");
        $("#" + this.id + "_chosen").find(".chosen-single").css("border", "");
        $("#e" + this.id).text("");
    });
    $("input").on("change", function () {
        $(this).removeClass("has-error");
        $("#e" + this.id).text("");
    });
    //$("input[type=text]").on("change", function () {
    //    $(this).removeClass("has-error");
    //    $("#e" + this.id).text("");
    //});
    //$("input[type=file]").on("change", function () {
    //    $(this).removeClass("has-error");
    //    $("#e" + this.id).text("");
    //});
    //$("input[type=email]").on("change", function () {
    //    $(this).removeClass("has-error");
    //    $("#e" + this.id).text("");
    //});
    //$("input[type=password]").on("change", function () {
    //    $(this).removeClass("has-error");
    //    $("#" + this.id).addClass("hidden");
    //    $("#e" + this.id).text("");
    //});
    //$(".select2").select2();
});
$(document).ajaxStart(function () {
    $(".loader").show();

    $('input [type="button"]').each(function () {
        $(this).attr("disabled", "disabled");
    });

    $("button").each(function () {
        $(this).attr("disabled", "disabled");
    });
});
$(document).ajaxStop(function () {
    $(".loader").hide();

    $('input [type="button"]').each(function () {
        $(this).removeAttr("disabled");
    });

    $("button").each(function () {
        $(this).removeAttr("disabled");
    });
});
function impsIni() {
    id = (new Date()).getTime();
    $('#tblTras tr:last').after('<tr id="' + id + '" style="text-align:center"><td>002-IVA</td><td>Tasa</td><td>0.160000</td><td><img src="/assets/global/img/editar.png" style="width:18px; cursor:pointer" title="Editar impuesto" onclick="editaImp(1,' + id + ')"/>&nbsp;&nbsp;<img src="/assets/global/img/eliminar.png" style="width:18px; cursor:pointer" title="Eliminar impuesto" onclick="eliminaImp(1,' + id + ')"/></td></tr>');
}
function pad(n, l) {
    if (n.length >= l)
        return n;

    var s = "";
    for (i = 1; i <= l - n.toString().length; i++)
        s = "0" + s.toString();

    return s.toString() + n.toString();
}
function cerrarSesion() {
    bootbox.confirm("¿Confirma que desea cerrar la sesi&oacute;n actual?", function (res) {
        if (res)
            location.href = "/csesion.aspx";
    });
}
function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}
function validaRes(res) {
    if (res === "##CS##")
        window.location.href = "/csesion.aspx";
    else
        bootbox.alert(res);
}
function cargaForma(obj) {
    $.each(Object.entries(obj), function () {
        $("#" + this[0]).val(this[1]);
    });
}
function unescapeHTML(s) {
    let p = document.createElement('p');
    p.innerHTML = s;
    return p.innerText.trim();
}
const LetraCapitl = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
function valForm(container) {
    if (container === undefined)
        container = "forma";

    var res = true;
    var inputs = $("#" + container).find('[data-val="true"]');

    $.each(inputs, function (k, valor) {
        if ($(this).data("val") === true) {
            $(valor).removeClass("has-error");
            $("#e" + valor.id.toString()).val("");
            var min = $(valor).data("min");
            var cero = $(valor).data("cero");
            min = min === "" || min === undefined ? 0 : min;
            cer = cero === undefined || cero === "" ? false : true;
            var info = $(valor).data("info");

            switch (info) {
                case "rfc":
                    if (!ValidaRfc($(valor).val())) {
                        errorControl(valor);
                        res = false;
                    }
                    break;
                case "correo":
                    if (!validaCorreo($(valor).val())) {
                        errorControl(valor, "formato de correo incorrecto");
                        res = false;
                    }
                    break;
                case "password":
                    if ($(valor).val() !== $("#c" + this.id).val()) {
                        errorControl(valor, "La confirmación de la contraseña no coincide");
                        res = false;
                    }
                default:
                    if (!($(valor).val()) || $(valor).val() === "" || $(valor).val().length < min) {
                        errorControl(valor, !($(valor).val()) || $(valor).val().length === 0 || $(valor).val() === "" ? "El campo es obligatorio" : "Longitud incorrecta [" + min + "]");
                        res = false;
                    }
                    if (!cero) {
                        if ($(valor).val() === "" || $(valor).val() === "0.00") {
                            errorControl(valor, "El campo es obligatorio");
                            res = false;
                        }
                    }

            }
        }
    });

    return res;
}
function capitalCase(string) {
    let salida = new Array()
    let arreglo = string.split(' ');

    $.each(arreglo, function () {
        salida.push(LetraCapitl(this.toString()))
    });

    return salida.join(' ');
}
function validaCorreo(correo) {
    var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return regex.test(correo);
}
function activaControles(opc) {
    if (opc == 0) {
        $(".loader").show();

        $('input [type="button"]').each(function () {
            $(this).attr("disabled", "disabled");
        });

        $("button").each(function () {
            $(this).attr("disabled", "disabled");
        });
    }
    else {
        $(".loader").hide();

        $('input [type="button"]').each(function () {
            $(this).removeAttr("disabled");
        });

        $("button").each(function () {
            $(this).removeAttr("disabled");
        });
    }
}
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
function daydiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}
function get(url, params, metodo) {
    activaControles(0);

    if (metodo === undefined || metodo === "")
        metodo = "POST";

    if (params === "" || params === undefined)
        params = null;

    // Return a new promise.
    return new Promise(function (resolve) {
        var req = new XMLHttpRequest();

        req.open(metodo, url);
        req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        req.setRequestHeader('Data-Type', 'json');

        req.onload = function () {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                let res = new Object();
                res.Respuesta = 1;
                try {
                    res = JSON.parse(JSON.parse(req.responseText).d);
                }
                catch (e) {
                    try {
                        res.Respuesta = 2;
                        res.Mensaje = "EERROORR";//sreq.responseText;
                    }
                    catch (e) {
                        res.Respuesta = 2;
                        res.Mensaje = "###";// e;
                    }
                }

                activaControles(1);

                resolve(res);
            }
            else if (req.status === 404) {
                let res = new Object();
                res.Respuesta = 2;
                res.Mensaje = "Dirección no encontrada: " + url;

                activaControles(1);

                resolve(res);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                let error = new Object();
                let msg = url.split('/');

                error.Respuesta = 2;
                error.responseText = unescapeHTML(req.responseText);
                error.responseHTML = req.responseText;

                error.Respuesta = 2;
                if (msg.length > 0) {
                    if (error.responseText.indexOf('Método web ' + msg[msg.length - 1]) >= 0) {
                        error.Mensaje = "Método " + msg[msg.length - 1] + " desconocido";
                    }
                    else if (error.responseText.indexOf('Falta un valor para el parámetro') >= 0) {
                        let det = error.responseText.replace(/\\u0027/g, "'").split("'");
                        error.Mensaje = "No se ha enviado el parámetro " + det[1];
                    }
                    else if (error.responseText.indexOf('No se encuentra el recurso') >= 0) {
                        let pos = error.responseText.indexOf('Dirección URL solicitada:') + 26;
                        error.Mensaje = "No se encontró el recurso: " + error.responseText.substring(pos);
                    }
                    else {
                        error.Mensaje = "OTRO ERROR: " + req.status + req.responseText;
                    }
                }
                else {
                    error.Mensaje = "ERROR123";
                }

                activaControles(1);

                resolve(error);
            }
        };

        req.onerror = function () {
            activaControles(1);
            let res = new Object();
            res.Respuesta = 2;
            res.Mensaje = Error("Network Error")
            resolve(res);
        };

        req.send(params);
    });
}
function errorControl(valor, error) {
    $(valor).addClass("has-error");
    $("#" + valor.id + "_chosen").find(".chosen-single").css("border", "2px solid red");
    $("#e" + valor.id.toString()).text(error).show();
}
function objetoForma(forma = "forma") {
    let obj = new Object();

    try {
        $("#" + forma + " :input").each(function () {
            Object.defineProperty(obj, this.id, {
                enumerable: true,
                configurable: false,
                writable: false,
                value: $(this).hasClass("text-uppercase") ? $(this).val().toUpperCase() : ($(this).hasClass("text-lowercase") ? $(this).val().toLowerCase() : $(this).val())
            });
        });

        return obj;
    }
    catch  {
        return null;
    }
}
function equivalenciaCalificacion(val) {
    switch (val.toString()) {
        case "1": return "AAA";
        case "2": return "AA+";
        case "3": return "AA";
        case "4": return "AA-";
        case "5": return "A+";
        case "6": return "A";
        case "7": return "A-";
        case "8": return "BBB+";
        case "9": return "BBB";
        case "10": return "BBB-";
        case "11": return "BB+";
        case "12": return "Sin Calificación";
        default: return "";
    }
}
function limpiaControles(form = "forma") {
    let inputs = $("#" + form).find(":input");
    $.each(inputs, function (k, valor) {
        if ($(valor).prop('type').startsWith('radio')) return;
        $(valor).removeClass("has-error");
        $(valor).val("");

        if ($(valor).prop('type').startsWith('select')) $(valor).trigger('change');
        
        $("#e" + valor.id.toString()).text("");
    });

}
function Toastr(pos, mensaje, titulo, opcion, tm) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "positionClass": pos,
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": tm,
        "extendedTimeOut": "0",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    msg = mensaje;
    title = titulo;
    toastr[opcion](msg, title);
}
function formatoMoneda(amount, decimals, sepmiles) {
    negativo = amount < 0 ? '-' : '';
    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0)
        return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    if (sepmiles)
        return negativo + amount_parts.join('.');
    else
        return negativo + amount_parts.join('.').replace(',', '');
}
function formatoFecha(inputFormat, opc, sep = "/") {
    var meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    var mesesCompleto = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    function pad(s) { return s < 10 ? '0' + s : s; }
    var d = new Date(inputFormat);

    if (opc === 1)//dia primero
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(sep);
    else if (opc === 2)// mes primero
        return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join(sep);
    else if (opc === 3)//años primero
        return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join(sep);
    else if (opc === 4)
        return [pad(d.getDate()), meses[d.getMonth()], d.getFullYear()].join(' ');
    else if (opc === 5) //mes y año
        return [mesesCompleto[d.getMonth()], d.getFullYear()].join(' ');
    else if (opc === 6)
        return [d.getFullYear(), pad(d.getMonth() + 1)].join(sep);
    else
        return [pad(d.getDate()), mesesCompleto[d.getMonth()], d.getFullYear()].join(sep);
}
function convierteFechaValida(fecha, separador, formato) {
    var date;

    date = fecha.split(separador);
    if (date.length >= 3) {
        switch (formato) {
            case 1: return new Date(date[2], date[1] - 1, date[0]); //dia,mes,anio
            case 2: return new Date(date[2], date[0] - 1, date[1]); //mes,dia,anio
            case 3: return new Date(date[0], date[1] - 1, date[2]); //anio,mes,dia
            
        }
    }
    else
        return null;
}
function Alerta(mensaje, titulo = "Operación exitosa!", icono = typIconoAlerta.ok, texto_boton = "Ok") {
    if (titulo.indexOf("ERROR") >= 0)
        icono = typIconoAlerta.error;
    if (titulo.indexOf("AVISO") >= 0)
        icono = typIconoAlerta.aviso;

    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        confirmButtonColor: "#1cc88a",
        confirmButtonText: texto_boton,
        html: mensaje
    });
}
function numerosDecimales(evt, input) {
    // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
    var key = window.Event ? evt.which : evt.keyCode;
    var chark = String.fromCharCode(key);
    var tempValue = input.value + chark;
    if (key >= 48 && key <= 57) {
        if (filter(tempValue) === false) {
            return false;
        } else {
            return true;
        }
    } else {
        if (key == 8 || key == 13 || key == 0) {
            return true;
        } else if (key == 46) {
            if (filter(tempValue) === false) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}
function filter(__val__) {
    var preg = /^([0-9]+\.?[0-9]{0,4})$/;
    if (preg.test(__val__) === true) {
        return true;
    } else {
        return false;
    }

}
function validarIntervaloFechas(fechaIni, fechaFin) {
    let valido = false;
    if (fechaIni.length > 0 && fechaFin.length > 0) {
        if (fechaIni <= fechaFin) {

            valido = true;
        } else {
            Alerta("INTERVALO DE FECHAS NO PERMITIDO<br>Fecha Inicio es mayor a Fecha Final", "ERROR!");
        }
    } else {
        Alerta("INTERVALO DE FECHAS NO DEFINIDO", "ERROR!");
    }

    return valido;
}
