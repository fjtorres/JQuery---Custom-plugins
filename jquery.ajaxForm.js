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
