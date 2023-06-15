<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="SanAlberto._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="KVTFbSVhwsKX3AKFcnvPgect7YO3eY8T4c1dgzCR">
    <title>Inicio de Sesión | San Alberto</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" rel="stylesheet" />
    <link href="/assets/global/css/Login.css" rel="stylesheet" />
    <%--<link href="/assets/global/plugins/others/bootstrap.min.css" rel="stylesheet" />--%>
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,600,700&display=swap" rel="stylesheet" type="text/css">
</head>
<body>
    <div id="app" class="min-h-screen flex">
        <main class="self-center p-12  md:max-w-md md:flex-0  mx-auto">
            <img class="mx-auto" src="/assets/global/img/logo.jpeg" alt="San Alberto Logo" style="width: 250px">
            <div class="text-neutral">
                <div class="text-3xl text-center py-6 ">Acceso Sistema</div>
                <div>
                    <form>
                        <input type="hidden" name="_token" value="KVTFbSVhwsKX3AKFcnvPgect7YO3eY8T4c1dgzCR">
                        <label class="block">
                            <input type="text" class="form-input mt-1 block w-full" data-val="true" id="usu" placeholder="Usuario" name="user" autofocus="autofocus" />
                        </label>
                        <div class="mt-5">
                            <label class="block">
                                <span class="icon-eye"><i class="fa-solid fa-eye-slash"></i></span>
                                <input type="password" class="form-input mt-1 block w-full" id="pas" name="pass" placeholder="Contraseña" required />
                            </label>
                        </div>
                        <button type="submit" id="ing" class="mt-5 bg-primary hover:bg-primary-darker text-white font-bold py-3 px-2 rounded w-full">
                            Ingresar
                        </button>
                        <div class="text-center mt-5">
                            <a class="reset_pass" href="#recover">Olvidé mi contraseña</a>
                        </div>
                        <div class="text-center">
                            <label id="valido" style="display: none">Usuario válido, ingresando...</label>
                        </div>
                    </form>
                </div>
            </div>
            <div class="container mx-auto text-center text-xs mt-10 text-neutral-60">
                <p class="mb-2">
                    Desarrollado por
                    <a href="http://www.grupodcs.com">DCS CORP</a>          
                </p>
            </div>
        </main>
        <aside class="  md:flex-1 flex-col login-bg">
            <div class="flex min-h-screen justify-center">
            </div>
        </aside>
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
    
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>

	<script>
        //ICON EYE
        const iconEye = document.querySelector(".icon-eye");
        iconEye.addEventListener("click", function () {
            const icon = this.querySelector("i");
            if (this.nextElementSibling.type === "password") {
                this.nextElementSibling.type = "text";
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            } else {
                this.nextElementSibling.type = "password";
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            }
        });
    </script>
</body>
</html>
