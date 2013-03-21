/*
* Plugin para controlar la dependencia múltiple entre un select y otros.
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
$.fn.selectMultiDependiente = function(options){
	// Merge entre parametros por defectos y los dados.
	var opts = $.extend({}, $.fn.selectMultiDependiente.defaults, options);

	$(this).change(function(){

		//Limpiamos los combos dependientes
		$.each(opts.select, function(clave, combo){
			$(combo.id).val('');
		});

		var data = null;
		if (opts.data != undefined) {
			data = opts.data;
		} else if (opts.form != undefined && opts.form != "") {
			data = $(opts.form).serialize();
		}

		//Recorremos el vector de los distintos combos que hemos de recargar
		$.each(opts.select, function(clave, combo){

			$.ajax({
				type : "POST",
				url : combo.url,
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
					$(combo.id).html(options);

					if(combo.callback != undefined) {
						combo.callback();
					}
				},
				error: function (xhr, textStatus, errorThrown) {
					alert(xhr.responseText);
				}
			});
		});
	});

};

// Valores por defecto.
$.fn.selectMultiDependiente.defaults = {
    empty: true,
	emptyValue: "",
	emptyLabel: "",
	selectFirst: false
};