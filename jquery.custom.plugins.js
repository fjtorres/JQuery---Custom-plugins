/*
* Plugin para controlar la dependencia simple entre un select y otro.
* ----------------------
* Opciones que acepta:
* ----------------------
* |	- empty: Indica si lleva opcion vacia en el combo dependiente.
* | Valor por defecto: true. 
* | Opcional.
* |
* |	- emptyKey: Indica el valor de la opcion vacia en el combo dependiente.
* | Valor por defecto: "". 
* | Opcional.
* |
* |	- emptyValue: Indica el texto de la opcion vacia en el combo dependiente.
* | Valor por defecto: "". 
* | Opcional.
* |
* |	- data: Información que se envia al servidor para la recarga del select dependiente.
* |	Valor por defecto: ninguno.
* | Opcional (si viene form informado).
* |
* |	- form: Identificador del formulario que se quiere enviar al servidor para la recarga del select dependiente. Si data viene informado no se tiene en cuenta. 
* | Valor por defecto: ninguno.
* | Opcional (si viene data informado).
* |
* |	- select: Identificador del select dependiente.
* | Valor por defecto: ninguno.
* | Obligatorio.
* |
* |	- selectFirst: Indica si queremos seleccionar el primer elemento del select dependiente por defecto.
* | Valor por defecto: false.
* | Opcional.
* |
* |	- url: URL de la que obtener la información del servidor.
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
	
		$.getJSON(opts.url, data, function(remoteData) {
			var options = "";
			if (opts.empty == true) {
				options = '<option value=' + opts.emptyKey + '> ' + opts.emptyValue + '</option>';
			}
			$.each(remoteData, function(index, element) {
				options += '<option value="' + element.key + '">' + element.value + '</option>';
			});
			$(opts.select).html(options);
		});
	});

};

// Valores por defecto.
$.fn.selectDependiente.defaults = {
    empty: true,
	emptyKey: "",
	emptyValue: "",
	selectFirst: false
};

/*
* Plugin para submitir un formulario por ajax y cargar el resultado en un contenedor indicado.
* ----------------------
* Opciones que acepta:
* ----------------------
* |	- result: Indica donde se debe cargar el resultado de submitir el form.
* | Valor por defecto: ninguno. 
* | Obligatorio.
* |
* | - emptyResult: Indica que no existe resultado de la acción.
* | Valor por defecto: false. 
* | Opcional.
* |
* --------------------
*/
$.fn.ajaxForm = function(options){

	// Merge entre parametros por defectos y los dados. 
	var opts = $.extend({}, $.fn.selectDependiente.defaults, options);

	$(this).submit(function(){
		$.ajax({
			url: $(this).attr("action"),
			data: $(this).serialize(),
			success: function(remoteData) {
				if (opts.emptyResult != true) {
					$(opts.result).html(data);
				}
			}
		});
	});
};

// Valores por defecto.
$.fn.ajaxForm.defaults = {
    emptyResult: false
};
