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
		afterDisplayLinkCallback : undefined,
		componentError : "Only control div with html table.",
		multiselection : false,
		selectable : false,
		selection : null,
		showError : false
	},
	// Widget initialization
	_init : function() {
		// Only control element of table type.
		if ($(this.element).is("div")
				&& $(this.element).children("table").length == 1) {
			var self = this;
			self._configuration();
		} else {
			if (this.options.showError) {
				alert(this.options.componentError);
			}
		}
	},
	// Init widget configuration
	_configuration : function() {
		var self = this, o = this.options;
		// Pagination links
		$(self._getComponentId() + " .pagelinks a").click(function() {
			return self._clickDisplaytagLink($(this));
		});
		// Sortable links
		$(self._getComponentId() + " .sortable a").click(function() {
			return self._clickDisplaytagLink($(this));
		});

		// Selection control
		if (o.selectable) {
			if (o.selection == null) {
				// Init selection attribute
				o.selection = new Array();
			}

			if (o.multiselection) {
				$(self._getComponentId() + " :checkbox").click(function() {
					self._clickSelection($(this));
				});
				// Multiselection
			} else {
				// Single selection
				$(self._getComponentId() + " :radio").click(function() {
					self._clickSelection($(this));
				});

				$("table tbody tr", $(self._getComponentId())).filter(":has(:radio)").click(function(event){
					self._rowClick(event, $(this));
				});
			}
		}
	},
	// Click function for pagination/sortable links
	_clickDisplaytagLink : function(source) {
		var self = this, o = this.options, href = source.attr("href");

		var aux = href.split("?");

		var url = aux[0];
		var params = aux[1];
		$.ajax({
			url : url,
			data : params,
			success : function(remoteData) {
				$(self._getComponentId()).html(remoteData);
				self._configuration();
				self._markSelection();
				if (o.afterDisplayLinkCallback != undefined) {
					o.afterDisplayLinkCallback();
				}
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
			self.clearSelection();
			o.selection.push(valor);
		}
	},
	// Clear the selection array.
	clearSelection : function() {
		var o = this.options;
		o.selection = new Array();
	},
	// Get component Id selector
	_getComponentId : function() {
		return "#" + $(this.element).attr("id");
	},
	// Public method for return the selection array.
	getSelection : function() {
		return this.options.selection;
	},
	// Mark selected options after ajax clicks.
	_markSelection : function() {
		var self = this, o = this.options;
		if (o.selectable) {
			$.each(o.selection, function(index, element) {
				if (o.multiselection) {
					$(
							self._getComponentId() + " :checkbox[value='"
									+ element + "']").attr("checked", true);
				} else {
					$(
							self._getComponentId() + " :radio[value='"
									+ element + "']").attr("checked", true);
				}
			});
		}
	},
	// Mark selected when click on row
	_rowClick : function(event, row) {
		var self = this, o = this.options;
		if (event.target.type != 'checkbox' && event.target.type != 'radio') {
			if (o.multiselection == true) {
				$(':checkbox', row).attr('checked', function() {
					self._clickSelection($(this));
					return !this.checked;
				});
			} else {
				$(':radio', row).attr('checked', function() {
					self._clickSelection($(this));
					return !this.checked;
				});
			}
		}
	}
});