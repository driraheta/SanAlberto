let fotoPorDefecto;
var fileContent = "";
var fileName = "";
(function ($) {
    var menus = '';
    var menuData = '';

    function obtmenu() {
        var userper = Cookies.get('per');
        get('/ws/perfiles.aspx/ConsultarPM', JSON.stringify({ id: userper }))
            .then(function (res) {
                var r = JSON.stringify(res);
                if (r.startsWith('[{"Error":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR!");
                } else {
                    menuData = res;
                    $(res).each(function () {
                        //Valida si el nivel es 1
                        if (this.MenuNivel === 1) {

                            var idm = this.MenuId;
                            let direccion = String(this.MenuHref).split("/");
                            let url = "";
                            //crea el Menu de primera linea
                            if (this.MenuHref == null) {
                                var men1 = '<div class="line" onclick="efecto01(this)">';
                            } else {
                                let cont = 0;
                                direccion.forEach(elm => {
                                    if (cont == 0) {

                                    }
                                    else if (cont == 1) {
                                        url += elm;

                                    } else {
                                        url += " " + elm;
                                    }
                                    cont++;
                                });

                                var men1 = '<div class="line" onclick="irA(\'' + url.trim() + '\')">';
                            }

                            //Valida si existe urlIcono
                            if (this.MenuUrlIcono === null) {
                                men1 += '<label class="fas fa-cart-plus"></label>';
                            } else {
                                men1 += '<label class="' + this.MenuUrlIcono + '"></label >';
                            }
                            men1 += '<div class="menP">' +
                                '<font >' + this.MenuNombre + '</font>' +
                                '</div>' +
                                '</div>';

                            var men2 = '<div class="subLine" hidden><ul>';
                            var men3 = '';
                            $(res).each(function () {
                                var idm2 = this.MenuId;
                                if (this.MenuPadre === idm && this.MenuNivel === 2) {
                                    if (this.MenuHref === null) {
                                        men2 += '<div class="lines" onclick="efecto01s(this)">';
                                        men2 += '<label class="fas fa-circle nav-icon"></label>';
                                        men2 += '<div class="menP">' +
                                            '<font>' + this.MenuNombre + '</font>' +
                                            '</div>' +
                                            '</div>';
                                        //men2 += '<li><a href="#" onclick="efecto01(this)">' + this.MenuNombre + '</a></li>';
                                    } else {
                                        men2 += '<li><a href="' + this.MenuHref + '">' + this.MenuNombre + '</a></li>';
                                    }

                                    men2 += '<div class="subLine" hidden><ul>';
                                    $(res).each(function () {
                                        if (this.MenuPadre === idm2 && this.MenuNivel === 3) {
                                            if (this.MenuHref === null) {
                                                men2 += '<li><a href="#">' + this.MenuNombre + '</a></li>';
                                            } else {
                                                men2 += '<li><a href="' + this.MenuHref + '">' + this.MenuNombre + '</a></li>';
                                            }
                                        }
                                    })
                                    men2 += '</ul>' + '</div>';
                                }
                            })

                            men2 += '</ul>' + '</div>';
                            men1 += men2;
                            //men1 += men3;
                            menus += men1;
                        }
                    })
                    GetMenu();
                    GetMenuNew();
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de registros<br />" + error, "ERROR!");
            });
    }

    function GetMenu() {
        var men = '<div class="menuLACR" onmouseleave="efecto02(this)">';
        //Logo

        //Divider
        //men += '<hr>';
        //Nav Item - Dashboard
        men += '<div class="line" onclick="homePage()">' +
            '<label class="fas fa-home"></label>' +
            '<div class="menP">' +
            '<font>Home</font>' +
            '</div>' +
            '</div>' +
            '<hr>';
        //'<a class="nav-link row" href= "/pages/" > ' +

        //agrega los menus
        men += menus;
        //fin
        men += '</div> ';

        $("#navBarLat").append(men);

    }

    function GetMenuNew() {
        var men = '';

        //agrega item estático home
        men += '<li class="custom-nav-item">' +
            '<a class="custom-nav-link custom-enlace-ajax" href="/pages"><i class="custom-icon fas fa-home"></i>Home</a>' +
            '</li> ';

        //agrega los items
        $(menuData).each(function () {
            var parent = this;
            var isParent = parent["MenuNivel"] === 1;
            //obtenemos submenues
            var children = [];

            $(menuData).each(function () {
                var child = this;
                if (child["MenuNivel"] === 2 && child["MenuPadre"] === parent["MenuId"]) {
                    children.push(child);
                }
            });

            var icon = parent["MenuUrlIcono"] !== null ? parent["MenuUrlIcono"] : 'fas fa-cart-plus';
            var url = parent["MenuHref"] !== null ?
                'href="' + parent["MenuHref"] + '"' :
                'onclick="toggleChildren(' + parent["MenuId"] + ')"';

            if (isParent) {
                var childrenHtml = "";
                $(children).each(function () {
                    var child = this;
                    var thirdChildrenHtml = "";
                    //verificamos menu 3er nivel
                    $(menuData).each(function () {
                        var thirdChild = this;
                        if (thirdChild["MenuNivel"] === 3 && thirdChild["MenuPadre"] === child["MenuId"]) {
                            thirdChildrenHtml += '<a class="custom-child-nav-link custom-enlace-ajax custom-third-child" href="' + thirdChild["MenuHref"] + '" parentId="' + parent["MenuId"] + '">' +
                                thirdChild["MenuNombre"] + '</a>';
                        }
                    });

                    var urlChildren = thirdChildrenHtml != "" ? '' : 'href="' + child["MenuHref"] + '"';

                    childrenHtml += '<a class="custom-child-nav-link custom-enlace-ajax" ' + urlChildren + ' parentId="' + parent["MenuId"] + '">' +
                        child["MenuNombre"] + '</a>' +
                        thirdChildrenHtml;
                });

                men += '<li class="custom-nav-item">' +
                    '<a class="custom-nav-link custom-enlace-ajax" ' + url + '>' +
                    '<i class="custom-icon ' + icon + '"></i>' + parent["MenuNombre"] + '</a>' +
                    childrenHtml +
                    '</li> ';
            }
        });

        $("#customNavBarLat").append(men);

    }

    function obtmenu2() {
        var men1 = '';
        var userper = Cookies.get('per');
        get('/ws/perfiles.aspx/ConsultarPM', JSON.stringify({ id: userper }))
            .then(function (res) {
                var r = JSON.stringify(res);
                if (r.startsWith('[{"Error":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR!");
                } else {
                    men1 += ' <ul class="nav side-menu">';
                    $(res).each(function () {

                        //Valida si el nivel es 1
                        if (this.MenuNivel === 1) {
                            men1 += '<li>';

                            var idm = this.MenuId;
                            let direccion = String(this.MenuHref).split("/");
                            let url = "";
                            //crea el Menu de primera linea
                            if (this.MenuHref == null) {
                                men1 += '<a>';
                                if (this.MenuUrlIcono === null) {
                                    men1 += '<i class="' + this.MenuUrlIcono + '"></i>';
                                } else {
                                    men1 += '<i class="fa fa-sticky-note-o"></i>';
                                }
                                men1 += this.MenuNombre + '<span class="fa fa-chevron-down"></span></a>';
                            } else {
                                let cont = 0;
                                direccion.forEach(elm => {
                                    if (cont == 0) {

                                    }
                                    else if (cont == 1) {
                                        url += elm;

                                    } else {
                                        url += " " + elm;
                                    }
                                    cont++;
                                });
                                men1 += '<a href="' + this.MenuHref + '">';
                                if (this.MenuUrlIcono === null) {
                                    men1 += '<i class="' + this.MenuUrlIcono + '"></i>';
                                } else {
                                    men1 += '<i class="fa fa-sticky-note-o"></i>';
                                }
                                men1 += this.MenuNombre + '</a>';
                            }
                            men1 += '<ul class="nav child_menu">';

                            $(res).each(function () {
                                var idm2 = this.MenuId;
                                if (this.MenuPadre === idm && this.MenuNivel === 2) {
                                    if (this.MenuHref === null) {
                                        men1 += '<li><a href="#">' + this.MenuNombre + '</a></li>';

                                    } else {
                                        men1 += '<li><a href="' + this.MenuHref + '">' + this.MenuNombre + '</a></li>';
                                    }

                                    $(res).each(function () {
                                        if (this.MenuPadre === idm2 && this.MenuNivel === 3) {
                                            if (this.MenuHref === null) {
                                                men1 += '<li><a href="#">' + this.MenuNombre + '</a></li>';
                                            } else {
                                                men1 += '<li><a href="' + this.MenuHref + '">' + this.MenuNombre + '</a></li>';
                                            }
                                        }
                                    })
                                }

                            });

                            men1 += '</ul>';
                            men1 += '</li>';

                        }
                    });
                    men1 += '</ul>';

                    $("#navBarLat").append(men1);

                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de registros<br />" + error, "ERROR!");
            })
    }

    $(document).ready(function () {

        obtmenu();

        $("#logout").on("click", function () {
            window.location.href = "/csesion.aspx";
        });

        $('#changePicture').change(function () {
            readImgUrlAndPreview(this);

            function readImgUrlAndPreview(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('#userImage').removeClass('hide').attr('src', e.target.result);
                    }

                    var reader2 = new FileReader();
                    reader2.onload = function (e) {
                        fileContent = reader.result;
                    }

                };
                reader.readAsDataURL(input.files[0]);
                reader2.readAsText(input.files[0]);
                fileName = input.files[0].name;
            }
        });
    });


})(jQuery);

function toggleChildren(parentId) {
    $(".custom-child-nav-link").each(function () {
        var child = $(this);

        if (Number(child.attr("parentId")) != Number(parentId)) {
            child.removeClass("custom-open");
            child.closest("li").removeClass("custom-open");
            child.closest("li").find(".custom-nav-link").removeClass("custom-open");
            child.closest("li").find(".custom-icon").removeClass("custom-open");
        } else {
            if (child.attr("class").indexOf("custom-open") >= 0) {
                child.removeClass("custom-open");
                child.closest("li").removeClass("custom-open");
                //child.closest("li").find(".custom-nav-link").removeClass("custom-open");
                child.closest("li").find(".custom-nav-link").each(function () {
                    $(this).removeClass("custom-open");
                });
                child.closest("li").find(".custom-icon").removeClass("custom-open");
            } else {
                child.addClass("custom-open");
                child.closest("li").addClass("custom-open");

                //child.closest("li").find(".custom-nav-link").addClass("custom-open");
                child.closest("li").find(".custom-nav-link").each(function () {
                    $(this).addClass("custom-open");
                });

                child.closest("li").find(".custom-icon").addClass("custom-open");
            }
        }
    });
}

function datosUsuario() {
    var nom = Cookies.get('nom');
    fotoPorDefecto = '/assets/global/img/letters/' + nom.substr(0, 1) + '.png';
    var iduser = Cookies.get('idu');
    get('/ws/usuarios.aspx/Consultar', JSON.stringify({ id: iduser }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#userid").val(res.Info.id);
                $("#username").val(res.Info.usu);
                $("#nombreUsuario").val(res.Info.nom);
                $("#eMailUsuario").val(res.Info.cor);
            }
            else {
                Alerta("No fue posiebla cargar la información del usuario<br/>" + res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }, function (res) {
            Alerta("No fue posiebla cargar la información del usuario<br/>" + res.Mensaje, "Error!", typIconoAlerta.error);
        })
        .catch(function (error) {
            Alerta("No fue posible cargar la información del usuario<br/>" + error, "Error!", typIconoAlerta.error);
        })
}

function eliminarImagen() {
    $('#changePicture').value = '';
    $('#userImage').removeClass('hide').attr('src', fotoPorDefecto);
    fileContent = null;
    fileName = "";
}

function guardarSettings() {
    var iduser = Cookies.get('idu');
    var username = Cookies.get('usu');
    var nombreUsuario = $("#nombreUsuario").val();
    var mailUsuario = $("#eMailUsuario").val();
    var telUser = $("#telUser").val();
    var filedata = "";
    if (fileContent != null && fileContent!="") {
        filedata = btoa(fileContent);
    }

    // Looping over all files and add it to FormData object  
    //'file': btoa(fileContent),

    $.ajax({
        url: '/ws/usuarios.aspx/setSettings',
        type: "POST",
        data: JSON.stringify({
            'iduser': iduser,
            'username': username,
            'nombre': nombreUsuario,
            'mail': mailUsuario,
            'tel': telUser,
            'file': filedata,
            'filename': fileName
        }),
        async: true,
        contentType: "application/json; charset=utf-8",
        success: function (data, status) {
            console.log("CallWM");
            Alerta("Datos actualizados. Los cambios se actualizaran en el siguiente inicio de sesión.");
            $("#settingsModal").modal('hide');
        },
        failure: function (data) {
            alert(data.d);
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}

function limpiezaPassword() {
    $("#chPassword").val("");
    $("#chPasswordConfirm").val("");
}


function actualizarPassword() {
    var usu = {};
    var iduser = Cookies.get('idu');
    var password = $("#chPassword");
    var passwordconfirm = $("#chPasswordConfirm");
    usu.id = iduser;
    usu.pwd = password.val();
    if (password.val() != passwordconfirm.val()) {
        Alerta("Las contraseñas no son iguales, por favor confirmar",
            "AVISO");
        return;
    }
    if (password.val()=="" ||  passwordconfirm.val()== "") {
        Alerta("Debe digitar la contraseña y su repeticion, por favor confirmar",
            "AVISO");
        return;
    }

    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea cambiar su contraseña?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            get("/ws/usuarios.aspx/ActualizarContrasena", JSON.stringify({ info: JSON.stringify(usu) }))
                .then(function (res) {
                    if (res.Respuesta === 1) {
                        Alerta("La contraseña se cambió correctamente");
                        $("#chPassword").val("");
                        $("#chPasswordConfirm").val("");

                        $("#chPasswordModal").modal('hide');
                    }
                    else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                }, function (res) {
                    Alerta("No fue posible modificar la contraseña<br />" + res.Mensaje, "Error!", typIconoAlerta.error);
                })
                .catch(function (res) {
                    Alerta("No fue posible modificar la contraseña<br />" + res, "Error!", typIconoAlerta.error);
                })
        }
    })

}

function efecto01(el) {
    $('.line').next().removeClass("subLineS");
    $('.line').removeClass("lineS");

    $(el).toggleClass("lineS");

    let subLine = $(el).next();
    $(subLine).fadeIn(400);
    $(subLine).toggleClass("subLineS");
    $(subLine).attr("style", "");

}

function efecto01s(el) {
    $('.lines').next().removeClass("subLineS");
    $('.lines').removeClass("lineS");

    $(el).toggleClass("lineS");

    let subLine = $(el).next();
    $(subLine).fadeIn(400);
    $(subLine).toggleClass("subLineS");
    $(subLine).attr("style", "");
}

function efecto02(el) {
    $('.line').removeClass("lineS");
    $('.line').next().removeClass("subLineS");

}

function efecto03(el) {
    let altoVentana = $(document).height();
    $('.menuLACR').attr("style", "height:" + (altoVentana - 70) + "px;");

}

function homePage() {
    $(location).attr('href', "/pages");
}

function irA(direccion) {
    let dir = "/" + direccion.replaceAll(' ', '/');

    $(location).attr('href', dir);
}

function filtrarTodos(idTabla, idInput, opcion) {
    let normalizarTexto = (function () {
        let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç',
            a = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc',
            re = new RegExp('[' + de + ']', 'ug');

        return texto =>
            texto.replace(
                re,
                match => a.charAt(de.indexOf(match))
            );
    })();
    if (opcion === "busqueda") {
        let textoBuscar = normalizarTexto($("#" + idInput).val().toLowerCase());

        $.each($("#" + idTabla + " tbody tr"), function () {

            let texto = normalizarTexto($(this).text().toLowerCase());

            if (texto.indexOf(textoBuscar) === -1)
                $(this).hide();
            else
                $(this).show();

        });
    } else {
        $.each($("#" + idTabla + " tbody tr"), function () {
            $(this).show();
        });
    }



}
