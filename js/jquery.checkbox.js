/**
 * checkbox/radio inputs jQuery plugin
 *
 * @author sap1ens - http://sap1ens.com
 * @requires jQuery 1.6+
 */
(function($) {
	
	var callback;
	
	function init(options) {
		callback = options.callback;
	}
	
	function enable(element) {
		var mode = element.data("mode");
		element.addClass(mode+'_yes').removeClass(mode+'_no');
		element.children().prop('checked', true);
	}
	
	function disable(element) {
		var mode = element.data("mode");
		element.addClass(mode+'_no').removeClass(mode+'_yes');
		element.children().prop('checked', false);
	}
	
	function isEnabled(element) {
		return element.hasClass(element.data("mode")+'_yes');
	}
	
	function isDisabled(element) {
		return element.hasClass(element.data("mode")+'_no');
	}	
	
	function actionHandler() {
		var fake = $(this);
		var mode = fake.data("mode");
		var orig = fake.children();
		
		if(mode == "radio" && isEnabled(fake)) {
			return;
		}
		
		if(isEnabled(fake)) {
			disable(fake);
			
		} else if(isDisabled(fake)) {
			enable(fake);
		}	
		
		if(mode == "radio") {
			var name = orig.attr("name");
			$('input[name='+name+']').each(function(i, el) {
				var other_fake = $(el).parent();
				
				if($(el)[0] !== orig[0] && isEnabled(fake)) {
					disable(other_fake);
				} else if($(el)[0] !== orig[0] && isDisabled(fake)) {
					enable(other_fake);
				}
			});
		}
		
		if(typeof callback !== "undefined") callback.call(fake);
	}
	
	$.fn.checkbox = function(options) {
		if (typeof options == 'object') {
			options = $.extend({}, $.fn.checkbox.defaults, options);
		} else {
			options = $.fn.checkbox.defaults;
		}			
		
		init(options);
		
		$(this).each(function(i, el) {
			var orig = $(el);
			orig.after('<div class="' + options.mode + '_fake"></div>');
			var fake = orig.next();
			orig.appendTo(fake);
			
			fake.data("mode", options.mode);
			
			if(orig.is(":checked")) {
				enable(fake);
			} else {
				disable(fake);
			}
			
			if(typeof callback !== "undefined") callback.call(fake);
			
			fake.click(actionHandler);
		});
	};
	
	$.fn.checkbox.defaults = {
		mode: "checkbox" // checkbox/radio
	};
	
})(jQuery);