
let puerto = "";
$(document).ready(function () {
    $("#guapuerto").on("click", function () {
        if (valForm("mpOrigen")) {

            GuardaPuertos($("#mpOrigen h4").text());
            
        }
    });

    $("#canpuerto").on("click", function () {
        Swal.fire({
            html: '¿Confirma que desea cancelar la acción?',
            title: 'Confirmación',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí'
        }).then((result) => {
            if (result.value) {
                limpiaControles('mpOrigen');
                $("#mpOrigen").modal("toggle");
            }
        })
    });
});


function cargaPuertoOrigen(param,imp1) {
    $("#"+param).empty().append("<option value=''></option>");
    //$("#"+param).empty().append("<option  value=''></option>");
    get('/ws/PuertoOrigen.aspx/Consultar', JSON.stringify({ id: 0 })).then(function (res) {

        if (res.Respuesta === 1) {

            let combobox = document.getElementById(param);
            //let combo2 = document.getElementById("ptoorgv");
           // combobox.innerHTML = "";
            //combo2.innerHTML = "";
            $.each(res.Info, function () {

                let option = document.createElement("option");
                option.value = this.ido;
                option.text = this.deso;
                combobox.add(option);
               // combo2.add(option);
               // $("#ptoorgv").append("<option class='form-control' id='" + this.ido + "'>" + this.deso + "</option>");

            });
            $(combobox).val(imp1).change();
        }
        else {
            Alerta(res.Mensaje, "ERROR!");

        }

    }).catch(function (error) {

        Alerta("No fue posible cargar los puertos de destino </br>" + error, "ERROR!");
    });
};



function cargaPuertoDestino(param,imp1) {
    get('/ws/PuertoDestino.aspx/Consultar', JSON.stringify({ id: 0 })).then(function (res) {

        if (res.Respuesta === 1) {

            $("#" + param).empty().append('<option></option>');
            //$("#ptodest option").remove();

           // $("#"+param).append('<option></option>');
            //$("#"+param).append('<option></option>');
            if (res.Info != null) {
                let combobox = document.getElementById(param);
                //combobox.innerHTML = "";
                //combo2.innerHTML = "";
                $.each(res.Info, function () {
                    let option = document.createElement("option");
                    option.value = this.idp;
                    option.text = this.pdescripcion;
                    combobox.add(option);
                    //combo2.add(option);
                   // $("#ptodestv").append('<option  id="' + this.idp + '">' + ' ' + this.pdescripcion + ' ' + '</option>');

                });
                $(combobox).val(imp1).change();
            }
        }
        else {
            Alerta(res.Mensaje, "ERROR!");

        }

    }).catch(function (error) {

        Alerta("No fue posible cargar los puertos de destino </br>" + error, "ERROR!");
    });
};

function GuardaPuertos(param) {
    console.log(param);
    let obj = new Object();
    url = "";
    if (param == "Puerto Origen") {
        url = `/ws/PuertoOrigen.aspx/Insertar`;
        obj.deso = $("#descPuerto").val();
    } else if (param = "Puerto Destino") {
        url = `/ws/PuertoDestino.aspx/Insertar`;
        obj.pdescripcion = $("#descPuerto").val();
    }

    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el puerto de ' + param + ' <b>' + $("#descPuerto").val() + '</b> ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(url, {
                method: 'POST', body: JSON.stringify({ info: JSON.stringify(obj) }), headers: { 'Content-Type': 'application/json' }
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
                Alerta("El puerto se insertó correctamente");
                limpiaControles("mpOrigen");
               // $("#c").empty();
                if (param == "Puerto Origen") {
                    cargaPuertoOrigen("ptoorg", $("#ptoorg").val());
                } else if (param = "Puerto Destino") {
                    cargaPuertoDestino("ptodest", $("#ptodest").val());
                }
                
                $("#mpOrigen").modal("toggle");
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    });


}
