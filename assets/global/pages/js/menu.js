(function ($) {
    function cargaMenu(id) {
        $("#men").empty().append('<option value=""></option>');

        get("/ws/menus.aspx/Consultar", JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $.each(res.Info, function () {
                        $("#men").append('<option value="' + this.id + '">' + this.nom + '</option>');
                    });
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }, function (res) {
                Alerta("No fue posible cargar el listado de menus<br/>" + res.Mensaje, "Error!", typIconoAlerta.error);
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de menus<br/>" + typIconoAlerta.error, "Error!", typIconoAlerta.error);
            })
    }

    $(document).ready(function () {
        cargaMenu(0);
    });
})(jQuery);