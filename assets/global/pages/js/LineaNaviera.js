
$(document).ready(function () {
    $("#guaLinea").on("click", function () {
        if (valForm("mpLineaNaviera")) {

            GuardaLinea();

        }
    });

    $("#canLinea").on("click", function () {
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
                limpiaControles('mpLineaNaviera');
                $("#mpLineaNaviera").modal("toggle");
            }
        })
    });
});

function cargaLineaNaviera() {
    get('/ws/LineaNaviera.aspx/Consultar', JSON.stringify({ id: 0 })).then(function (res) {

        if (res.Respuesta === 1) {

            $("#lin").empty();
            $("#linv").empty();
            //$("#ptodest option").remove();

            $("#lin").append('<option></option>');
            $("#linv").append('<option></option>');
            if (res.Info != null) {
                //let combobox = document.getElementById(param);
                //combobox.innerHTML = "";
                //combo2.innerHTML = "";
                $.each(res.Info, function () {
                    //let option = document.createElement("option");
                    //option.value = this.idp;
                    //option.text = this.pdescripcion;
                    //combobox.add(option);
                    //combo2.add(option);
                    $("#lin").append('<option  id="' + this.id + '">' + ' ' + this.lineaN + ' ' + '</option>');
                    $("#linv").append('<option  id="' + this.id + '">' + ' ' + this.lineaN + ' ' + '</option>');
                });
            }
        }
        else {
            Alerta(res.Mensaje, "ERROR!");

        }

    }).catch(function (error) {

        Alerta("No fue posible cargar los puertos de destino </br>" + error, "ERROR!");
    });
};

function GuardaLinea() {
    let obj = new Object();
    obj.lineaN = $("#descLinea").val();
   

    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar la linea naviera <b>' + $("#descLinea").val() + '</b> ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/LineaNaviera.aspx/Insertar`, {
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
                Alerta("La linea naviera se insertó correctamente");
                limpiaControles("mpLineaNaviera");
                // $("#c").empty();
                cargaLineaNaviera();
                $("#mpLineaNaviera").modal("toggle");
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    });


}
