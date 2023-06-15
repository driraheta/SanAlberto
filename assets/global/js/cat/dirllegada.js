let dddirlleg = "#dlleg"
    


function cargaDireccionLlegada(id) {
    $(dddirlleg).empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarDir', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $(dddirlleg).append('<option value="' + this.id + '">' + this.desc + "-" + this.pues + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de direcciones<br />" + error, "ERROR!");
        });
}