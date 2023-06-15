$(document).ready(function () {
    //convertir el combo en select2
    $('.select2').each(function () {
        $(this).select2({
            width: '100%'
        });
    });
    /*CAMBIO DE BUSQUEDA DE SELECT 2--EXPRESIONES REGULARES*/
    $("#nomp").select2({
        width: '100%',
        placeholder: "Selecciona",
        allowClear: true,
        matcher: function (params, data) {
            // If there are no search terms, return all of the data
            if ($.trim(params.term) === '') {
                return data;
            }
            var palabra = params.term;
            var filtro = ".*" + palabra.replace(/\s+/g, ".*") + ".*";
            /*
            rex = new RegExp(filtro, 'i');
              Do not display the item if there is no 'text' property
              if (typeof data.text === 'undefined') {
                  return data;
              }
              */
            // `params.term` should be the term that is used for searching
            // `data.text` is the text that is displayed for the data object
            //console.log(data.text);

            if (data.text.toUpperCase().search(filtro.toUpperCase()) > -1) {
                var modifiedData = $.extend({}, data, true);
                modifiedData.text += '';
                // You can return modified objects from here
                // This includes matching the `children` how you want in nested data sets
                return modifiedData;
            }

            // Return `null` if the term should not be displayed
            return null;
        }

    });
});



