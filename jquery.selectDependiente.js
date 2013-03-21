/*
* Plugin para controlar la dependencia simple entre un select y otro.
* ----------------------
* Opciones que acepta:
* ----------------------
* | - empty: Indica si lleva opcion vacia en el combo dependiente.
* | Valor por defecto: true.
* | Opcional.
* |
* | - emptyValue: Indica el valor de la opcion vacia en el combo dependiente.
* | Valor por defecto: "".
* | Opcional.
* |
* | - emptyLabel: Indica el texto de la opcion vacia en el combo dependiente.
* | Valor por defecto: "".
* | Opcional.
* |
* | - data: Información que se envia al servidor para la recarga del select dependiente.
* | Valor por defecto: ninguno.
* | Opcional (si viene form informado).
* |
* | - form: Identificador del formulario que se quiere enviar al servidor para la recarga del select dependiente. Si data viene informado no se tiene en cuenta.
* | Valor por defecto: ninguno.
* | Opcional (si viene data informado).
* |
* | - select: Identificador del select dependiente.
* | Valor por defecto: ninguno.
* | Obligatorio.
* |
* | - selectFirst: Indica si queremos seleccionar el primer elemento del select dependiente por defecto.
* | Valor por defecto: false.
* | Opcional.
* |
* | - url: URL de la que obtener la información del servidor.
* | Valor por defecto: ninguno.
* | Obligatorio.

* |
* --------------------
*/
$.fn.selectDependiente = function(options){
	// Merge entre parametros por defectos y los dados.
	var opts = $.extend({}, $.fn.selectDependiente.defaults, options);

	$(this).change(function(){

		var data = null;
		if (opts.data != undefined) {
			data = opts.data;
		} else if (opts.form != undefined && opts.form != "") {
			data = $(opts.form).serialize();
		}

		$.ajax({
			type : "POST",
			url : opts.url,
			dataType : 'json',
			data : data,
			success : function(remoteData) {
				var options = "";
				if (opts.empty == true) {
					options = '<option value=' + opts.emptyValue + '> ' + opts.emptyLabel + '</option>';
				}
				$.each(remoteData, function(index, element) {
					options += '<option value="' + element.value + '">' + element.label + '</option>';
				});
				$(opts.select).html(options);

				if (opts.selectFirst) {
					var selectedIndex = 0;
					if (opts.empty == true) {
						selectedIndex = 1;
					}
					$(opts.select).prop("selectedIndex", selectedIndex);
				}
			},
			error: function (xhr, textStatus, errorThrown) {
				alert(xhr.responseText);
			}
		});

	});

};

// Valores por defecto.
$.fn.selectDependiente.defaults = {
    empty: true,
	emptyValue: "",
	emptyLabel: "",
	selectFirst: false
};