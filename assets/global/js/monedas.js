class Moneda {
    static Consultar(ctrl, id = 0) {
        $(ctrl).empty();
        $(ctrl).append('<option value=""></option>');
        get('/ws/monedas.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $.each(res.Info, function () {
                        $(ctrl).append('<option value="' + this.id + '">' + this.mon + '</option>');
                    });
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta(error, "ERROR!")
            });
    }
}