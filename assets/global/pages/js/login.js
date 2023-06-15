(function ($) {
    function Valida() {
        let usu = new Object();

        usu.usu = $("#usu").val();
        usu.pwd = $("#pas").val();

        get('/ws/default.aspx/VALIDAUSUARIO', JSON.stringify({ info: JSON.stringify(usu) }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $("#valido").show();
                    Cookies.set("idu", res.Info.id, { path: '/' });
                    Cookies.set("nom", unescape(res.Info.nom), { path: '/' });
                    Cookies.set("usu", res.Info.usu, { path: '/' });
                    Cookies.set("chk", res.Info.chk, { path: '/' });
                    Cookies.set("per", res.Info.per, { path: '/' });
                    Cookies.set("vacos", unescape(res.Info.viscostos), { path: '/' });
                    Cookies.set("foto", res.Info.foto, { path: '/' });

                    window.location.href = "/pages/";
                }
                else {
                    Alerta(res.Mensaje, 'Error!', typIconoAlerta.error);
                }
            }, function (res) {
                Alerta(res.Mensaje, 'Error!', typIconoAlerta.error);
            })
            .catch(function (res) {
                Alerta("No fue posible validar el usuario\nError desconocido: " + res, 'Error!', typIconoAlerta.error)
            });
    }
    function sendemail() {
        get('/ws/configsistema.aspx/SendEmail', JSON.stringify({ correo: $("#email").val(), nombre: $("#nompapp").val() }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        Alerta(res.Mensaje, "Correo Enviado");
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
            });
    }
    $(document).ready(function () {
        $("#ing").on("click", function () {
            if (valForm()) {
                Valida();
            }
        });

        //$("#forgotpassword").on("click", function () {
        //    $("#reccontr").modal({ backdrop: 'static', keyboard: false });
        //    limpiaControles('reccontr');

        //});
        //$("#canp").on("click", function () {
        //    $("#reccontr").modal("toggle");
        //});
        //$('#forma').keypress(function (e) {
        //    if (e.which === 13) {
        //        if ($("#usu").val() !== "" && $("#pas").val() !== "")
        //            $("#ing").trigger("click");
        //        else if ($("#usu").val() === "")
        //            $("#usu").focus();
        //        else if ($("#pas").val() === "")
        //            $("#pas").focus();
        //    }
        //});

        $("#env").on("click", function () {
            sendemail();
        });
    })
})(jQuery);