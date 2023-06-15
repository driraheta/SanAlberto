function sortTable(n, type, idTable, dir = "asc") {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

    table = document.getElementById(idTable);
    switching = true;
    //Set the sorting direction to ascending:

    /*Make a loop that will continue until no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare, one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (y !== undefined) {
                let tmpX = parseFloat(x.innerHTML).toFixed(2);
                let tmpY = parseFloat(y.innerHTML).toFixed(2);
                x.innerHTML = tmpX;
                y.innerHTML = tmpY;

                /*check if the two rows should switch place, based on the direction, asc or desc:*/
                if (dir == "asc") {
                    if ((type == "str" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) || (type == "int" && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if ((type == "str" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) || (type == "int" && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            } 
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function formatoFechaSimple(fecha) {

    let d = new Date(fecha);

    if (fecha != '') {
        let ano, mes, dia;
        ano = d.getFullYear();
        mes = d.getMonth() + 1;
        dia = d.getDate();
        if (mes < 10) {
            mes = '0' + mes;
        }
        if (dia < 10) {
            dia = '0' + dia;
        }
        fecha = '' + ano + '-' + mes + '-' + dia;
        return fecha;
    } else {
        return '';
    }
}

$('.line').on("click", function () {
    $('.line').next().removeClass("subLineS");
    $('.line').removeClass("lineS");

    $(this).toggleClass("lineS");

    let subLine = $(this).next();
    $(subLine).fadeIn(400);
    $(subLine).toggleClass("subLineS");
    $(subLine).attr("style", "");

});

$('.menuLACR').on('mouseleave', function () {
    $('.line').removeClass("lineS");
    $('.line').next().removeClass("subLineS");
});

$(window).resize(function () {

    let altoVentana = $(window).height();
    let altoContent = $("#content").height();
    if (altoContent < altoVentana) {
        $('.menuLACR').css("height", altoVentana - 70);
    } else {
        $('.menuLACR').css("height", altoContent);
    }



});

$(window).on("load", function () {
    let altoVentana = $(window).height();
    let altoContent = $("#content").height();
    if (altoContent < altoVentana) {
        $('.menuLACR').css("height", altoVentana - 70);
    } else {
        $('.menuLACR').css("height", altoContent);
    }
});

$(window).on("scroll", function () {

    let altoVentana = $(window).height();
    let altoContent = $("#content").height();
    if (altoContent < altoVentana) {
        $('.menuLACR').css("height", altoVentana - 70);
    } else {
        $('.menuLACR').css("height", altoContent);
    }

});
