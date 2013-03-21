/**
 * Plugin de JQuery para sustiuir ciertos caracteres por otros especificados,
 * los caracteres se especifican mediante cadenas de igual longitud.
 *
 * @param specialCharacters
 *            Cadena con los caracteres que se quieren sustituir.
 * @param overrideCharacters
 *            Cadena con los caracteres con los que se debe sustituir.
 */
$.fn.overrideSpecialCharacters = function (specialCharacters, overrideCharacters) {
	var keyCodesSpecial = new Array();
	var keyCodesOverride = new Array ();

	for (var i=0;i<specialCharacters.length;i++) {
		keyCodesSpecial.push(specialCharacters.charCodeAt(i));
	}

	for (var i=0;i<overrideCharacters.length;i++) {
		keyCodesOverride.push(overrideCharacters.charCodeAt(i));
	}

	var getSelectionPosition = function (el) {
		if (el.selectionStart) {
			return el.selectionStart;
		} else if (document.selection) {
			el.focus();

			var r = document.selection.createRange();
			if (r == null) {
				return 0;
			}

			var re = el.createTextRange(), rc = re.duplicate();
			re.moveToBookmark(r.getBookmark());
			rc.setEndPoint('EndToStart', re);

			return rc.text.length;
		}
		return 0;
	};


	$(this).live("keypress", function (event){
		var maxlength = $(this).attr("maxlength");
		if (typeof maxlength != 'undefined' && maxlength != false) {
			if (event.target.value.length == maxlength) {
				return;
			}
		}

		var keyCode = event.charCode?event.charCode:event.keyCode;
		var index = $.inArray(keyCode, keyCodesSpecial);
		if (index != -1) {
			event.preventDefault();
			var strLeft = event.target.value.substring(0, getSelectionPosition(event.target));
			event.target.value = strLeft + String.fromCharCode(keyCodesOverride[index]);
		}
	});
};