(function ($) {
    var menus ='<hr class="sidebar-divider my-0"> ';
    
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
                    var num = 0;
                    $(res).each(function () {
                        //Valida si el nivel es 1
                        if (this.MenuNivel === 1) {
                            var dtarget = this.MenuNombre.substring(1, 4) +num;
                            var idm = this.MenuId;
                           var men1 = '<li class="nav-item"> ';
                            men1 += '<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#' + dtarget+'" aria-expanded="true" aria-controls="collapseTwo"> ';
                            if (this.MenuUrlIcono === null) {
                                men1 += '<i class="fas fa-cart-plus icono imp" ></i> ';
                            } else {
                                men1 += '<img style="width:20px;height:20px;" src="' + this.MenuUrlIcono + '" /> ';
                            }
                            men1 += '<span class="">' + this.MenuNombre + '</span></a> ';
                            var men2 = '<div id="' + dtarget + '" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar"> ' +
                                '<div class="bg-white py-2 collapse-inner rounded"> ';
                            $(res).each(function () {
                                if (this.MenuPadre === idm) {
                                    men2 += '<a class="collapse-item" href="' + this.MenuHref + '"> ';
                                    if (this.MenuUrlIcono === null) {
                                        men2 += '<i class="fa fa-plus imp"></i> ';
                                    } else {
                                        men2 += '<img style="width:20px;height:20px;" src="' + this.MenuUrlIcono + '" /> ';
                                    }
                                    men2 += '&nbsp;' + this.MenuNombre + '</a > ';
                                }
                            })
                            men2 += '</div> </div > ';

                            men1 += men2;
                            men1 += '</li> ';
                            menus += men1;
                        }
                        num++;
                    })
                    GetMenu();
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de registros<br />" + error, "ERROR!");
            })
    }
    function GetMenu() {
        var men;        
        //Logo
        men = '<a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html"> '+
            '<img src= "/assets/global/img/logo.jpeg" class="img-fluid" style= "max-height: 60px" /> '+
            ' </a > ';
        //Divider
        men += '<hr class="sidebar-divider my-0"> ';
        //Nav Item - Dashboard
        men += '<li class="nav-item active"> '+
            '<a class="nav-link" href= "/pages/" > '+
                '<i class="fas fa-fw fa-tachometer-alt"></i> '+
                '<span>Dashboard</span></a > '+
            '</li >';
        //Divider
        men += '<hr class="sidebar-divider my-0"> ';
        
        //agrega los menus
        men += menus;
        //fin
        men += '<hr class="sidebar-divider d-none d-md-block"> ';
        men += '<div class="text-center d-none d-md-inline mt-4"> '+
               '<button class="rounded-circle border-0" id="sidebarToggle"></button> '+
            '</div> ';
        
        $("#accordionSidebar").append(men);

    }
   
    $(document).ready(function () {
        obtmenu();
        if ($(window).width() < 768) {
            $(".sidebar").addClass("toggled");
            $(".arrow-h").hide();
        }
        else {
            $(".sidebar").removeClass("toggled");
            //$(".arrow-h").show();
        }
        //$(".imp").on("click", function () {
        //    window.location.href = "/pages/imps/impd.aspx"
        //});
        $("#logout").on("click", function () {
            window.location.href = "/csesion.aspx";
        });
        //$(".arrow-h").on("click", function () {
        //    if ($(this).hasClass("fa-chevron-right")) {
        //        $(this).removeClass("fa-chevron-right").addClass("fa-chevron-down");
        //        $(this).parent().removeClass("collapsed")
        //        $(this).attr("aria-expanded", "true");

        //        $($(this).parent().data("target")).addClass("show");
        //    }
        //    else {
        //        $(this).removeClass("fa-chevron-down").addClass("fa-chevron-right");
        //        $(this).parent().addClass("collapsed")
        //        $(this).attr("aria-expanded", "false");

        //        $($(this).parent().parent().data("target")).removeClass("show");

        //    }
        //});
        //$(".nav-item").on("mouseout", function () {
        //    $(".menu").each(function () {
        //        $(this).removeClass("show");
        //    })
        //})
        //$("#musu").on("mouseover", function () {
        //    $("#fusu").removeClass("fa-chevron-right").addClass("fa-chevron-down");
        //    $("#fusu").parent().removeClass("collapsed");
        //    $("#fusu").attr("aria-expanded", "true");

        //    $("#usu").addClass("show");

        //}).on("mouseout", function () {
        //    /*$("#fusu").removeClass("fa-chevron-down").addClass("fa-chevron-right");
        //    $("#fusu").parent().addClass("collapsed");
        //    $("#fusu").attr("aria-expanded", "false");

        //    $("#usu").removeClass("show");*/
        //}).on("touchstart", function () {
        //    $("#fusu").removeClass("fa-chevron-right").addClass("fa-chevron-down");
        //    $("#fusu").parent().removeClass("collapsed");
        //    $("#fusu").attr("aria-expanded", "true");

        //    $("#usu").addClass("show");
        //});
    });
})(jQuery);