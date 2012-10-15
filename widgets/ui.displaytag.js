/*
 * JQuery UI Widget for displaytag tables control with ajax calls.
 * This widget controls the paging and sorting links, also support the multi selection and single selection.
 * 
 * FJTORRES
 * 
 */
$.widget("ui.displaytag", {
	// default options
	options : {
		componentError : "Only control html table.",
		multiselection : false,
		selectable : false,
		selection : null
	},
	// Widget initialization
	_init : function() {
		// Only control element of table type.
		if ($(this.element).is("table")) {
			var self = this;
			self._configuration();
		} else {
			alert(this.options.componentError);
		}
	},
	// Init widget configuration
	_configuration : function() {
		var self = this, o = this.options;
		// Pagination links
		$(self._getParentId() + " .pagelinks a").click(function() {
			return self._clickDisplaytagLink($(this));
		});
		// Sortable links
		$(self._getParentId() + " .sortable a").click(function() {
			return self._clickDisplaytagLink($(this));
		});
		// Selection control
		if (o.selectable) {
			// Init selection attribute
			o.selection = new Array();

			if (o.multiselection) {
				$(self._getParentId() + " :checkbox").click(function() {
					self._clickSelection($(this));
				});
				// Multiselection
			} else {
				// Single selection
				$(self._getParentId() + " :radio").click(function() {
					self._clickSelection($(this));
				});
			}
		}
	},
	// Click function for pagination/sortable links
	_clickDisplaytagLink : function(source) {
		var self = this, href = source.attr("href");

		var aux = href.split("?");

		var url = aux[0];
		var params = aux[1];
		$.ajax({
			url : url,
			data : params,
			success : function(remoteData) {
				$(self._getParentId()).html(remoteData);
			}
		});

		return false;

	},
	// This function is executed when selection is produced
	_clickSelection : function(source) {
		var self = this, o = this.options, valor = source.val();
		if (o.multiselection) {
			// Search item in selection
			var aux = $.grep(o.selection, function(element, index) {
				return element == valor;
			});
			if (aux.length == 0) {
				o.selection.push(valor);
			} else {
				// Remove item
				o.selection = $.grep(o.selection, function(element, index) {
					return element != valor;
				});
			}
		} else {
			// For single selection clear current selection.
			self._clearSelection();
			o.selection.push(valor);
		}
	},
	// Clear the selection array.
	_clearSelection : function() {
		var o = this.options;
		o.selection = new Array();
	},
	// Get parent Id selector for displaytag table.
	_getParentId : function() {
		return "#" + $(this.element).parent().attr("id");
	},
	// Get component Id selector
	_getComponentId : function() {
		return "#" + $(this.element).attr("id");
	},
	// Public method for return the selection array.
	getSelection : function() {
		return this.options.selection;
	}
});