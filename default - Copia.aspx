<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="SanAlberto._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Inicio de Sesión | San Alberto</title>
    <!-- Custom fonts for this template-->
    <%--    <link href="/assets/global/plugins/fontawesome-free/css/all.min.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />--%>
    <!-- Custom styles for this template-->
    <%--    <link href="/assets/global/template/css/sb-admin-2.css" rel="stylesheet" />
    <link href="/assets/global/css/custom.css" rel="stylesheet" />--%>

    <link href="/assets/global/plugins/others/bootstrap.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/others/font-awesome.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/others/nprogress.css" rel="stylesheet" />
    <link href="/assets/global/plugins/others/animate.min.css" rel="stylesheet" />
    <link href="/assets/global/plugins/others/custom.min.css" rel="stylesheet" />
    <link href="/assets/global/css/Login.css" rel="stylesheet" />
    <link href="/assets/global/plugins/others/Site.css" rel="stylesheet" />
    <link href="/assets/global/plugins/customDesign/styles.css" rel="stylesheet" />
</head>

<body>
    <div>
        <a class="hiddenanchor" id="signin"></a>
        <a class="hiddenanchor" id="recover"></a>
        <div class="login_wrapper">
            <div class="row">
                <div class="col-6"></div>
                <div class="col-6">
                    <div class="animate form login_form box_form custom-form-box">
                        <div class="row custom-logo-init-parent">
                            <img src="/assets/global/img/logo.jpeg" class="logoInit custom-logo-init" />
                        </div>
                        <section class="login_content">
                            <form>
                                <h1>Acceso Sistema</h1>
                                <div>
                                    <input type="text" class="form-control" data-val="true" id="usu" placeholder="Usuario" name="user" autofocus="autofocus" />
                                </div>
                                <div>
                                    <input type="password" class="form-control" data-val="true" id="pas" name="pass" placeholder="Contraseña" />
                                </div>
                                <div>
                                    <button class="btn btn-primary submit" id="ing">Ingresar </button>
                                    <a class="reset_pass" href="#recover">Olvidé mi contraseña</a>
                                </div>
                                <div class="text-center">
                                    <label id="valido" style="display: none">Usuario válido, ingresando...</label>
                                </div>
                                <div class="clearfix"></div>

                                <div class="separator">
                                    <div class="clearfix"></div>
                                    <br />


                                    <div>
                                        <p>
                                            <i class="fa fa-registered"></i>
                                            <label id="year"></label>
                                            Todos los derechos reservados.
                                        </p>
                                    </div>

                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>

        <div class="login_wrapperRecover">
            <div id="recover" class="animate form recover_form box_form">
                <div class="row">
                    <img src="/assets/global/img/logo.jpeg" class="logoInit" />
                </div>
                <section class="login_contentRecover">
                    <form>
                        <h1>Recuperación</h1>
                        <div>
                            <input type="email" class="form-control" placeholder="Correo" name="correo" id="email" />
                        </div>
                        <div>
                            <button type="button" class="btn btn-primary submit" id="env">Enviar</button>

                            <p class="change_link">
                                Ya eres usuario?
                                <a href="#signin" class="to_register">Acceso Sistema </a>
                            </p>
                        </div>

                        <div class="clearfix"></div>

                        <div class="separator">
                            <div class="clearfix"></div>
                            <br />

                            <div>
                                <p>
                                    <i class="fa fa-registered"></i>
                                    <label id="year2"></label>
                                    Todos los derechos reservados.
                                </p>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>

    </div>



    <!-- Bootstrap core JavaScript-->
    <script src="/assets/global/plugins/jquery/jquery.min.js"></script>
    <%--    <script src="/assets/global/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>--%>

    <!-- Core plugin JavaScript-->
    <!--script src="/assets/global/plugins/jquery-easing/jquery.easing.min.js"></script> -->

    <!-- Custom scripts for all pages-->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9.15.2/dist/sweetalert2.all.min.js"></script>
    <%--    <script src="/assets/global/template/js/sb-admin-2.min.js"></script>--%>
    <script src="/assets/global/js/js.cookie.js"></script>
    <script src="/assets/global/js/utils.js"></script>
    <script src="/assets/global/pages/js/login.js"></script>
</body>
</html>
