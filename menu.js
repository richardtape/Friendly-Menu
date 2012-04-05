;(function($) {

	$.friendlyMenu = function(el, options) {
	
		var defaults = {
			selector: '#nav',
			autoAlign: false
		}
		
		var plugin = this;
		
		plugin.settings = {}
		
		var init = function() {
			
			plugin.settings = $.extend({}, defaults, options);
			plugin.el = el;
			
			var selector = plugin.el ? plugin.el.selector : plugin.settings.selector;
			
			//$(selector + " ul").css({display: "none"});		//Opera…why you so not working?
			$(selector + " a").removeAttr("title");			//Title hover styles can cause problems
			
			if(plugin.el && plugin.el.autoAlign){
            	
            	$(selector + '>li').has('ul').each(function(){
            		
            			//If the hovered menu would cause a horizontal scrollbar, force it to go the left, not right
						var ww = $(window).width();
	           	 		var subUL = $(this).find("ul:first");
	            		var locUL = subUL.offset().left + subUL.width();
	            		
	            		//We're storing things 9999px off-screen. Do some maths
	            		//Having to guess a bit. If you're having issues, change this number
	            		var newPos = 9499 + locUL;
	            		console.log( "Pos: " + newPos + " :: " + "Window Width: " + ww );

						//IE just gets everything wrong. Everything. So you *could* force everything to go left in IE?
						if( $('body').hasClass('ie') ){
							$(this).addClass("goleft");
						}
	            		
	            		if (newPos > ww) {
	            			$(this).addClass("goleft");
	            		}
             		
            	});
				
			}
			
			$(selector + " li").hover(function(){
			
				$(this).find('ul:first').css({visibility: "visible", display: "none"}).fadeIn(300);
			
			},function(){
			
				$(this).find('ul:first').css({visibility: "hidden"});
			
			});
			
			//Add a class to the 'main' menu item when we're hovering over one of its children
			$(selector + " > li > ul").hover(function(){
			
				$(this).parent().addClass("hovering");
			
			},function(){
			
				$(this).parent().removeClass("hovering");
			
			});
		
		}
		
		init();
	
	}

})(jQuery);

$(document).ready(function(){
	var myplugin = new $.friendlyMenu({selector: "#nav", autoAlign: true});
});