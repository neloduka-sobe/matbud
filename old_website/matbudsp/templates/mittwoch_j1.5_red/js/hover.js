window.addEvent('domready', function() {
		
				

	 	var list = $$('.moduletable_menu ul.menu li a, a.mainlevel');
		list.each(function(element) {
		 
			var fx = new Fx.Styles(element, {duration:350, wait:false, transition: Fx.Transitions.Quad.easeInOut});
		 
			element.addEvent('mouseenter', function(){
				fx.start({
					'padding-left': 30,			        
			         'color': '#888'			
				});
			});
		 
			element.addEvent('mouseleave', function(){
				fx.start({
				    'padding-left': 15,			        
			        'color': '#999'
				});
			});
		 
		});
		
		
	    	var list = $$('.moduletable_menu ul.menu li li a, a.sublevel');
               list.each(function(element) {
 
	           var fx = new Fx.Styles(element, {duration:350, wait:false,transition: Fx.Transitions.Quad.easeInOut});
 
	          element.addEvent('mouseenter', function(){
	             	fx.start({
	        		'padding-left': 35,
	        		'background-color': '#fff',
	        		color: '#888'
	           	});
	          });
 
	         element.addEvent('mouseleave', function(){
	        	fx.start({
		    	'padding-left': 15,
		    	'background-color': '#fafbfb',
		    	'color': '#999'
		     });
        	});
 
          });
		
		
			var list = $$('ul#mainlevel-nav li a');
		list.each(function(element) {
		 
			var fx = new Fx.Styles(element, {duration:450, wait:false});
		 
			element.addEvent('mouseenter', function(){
				fx.start({
			         'color': '#f8f8f8'			
				});
			});
		 
			element.addEvent('mouseleave', function(){
				fx.start({		
			        'color': '#fff'
				});
			});
		 
		});
		
					var list = $$('.button');
		list.each(function(element) {
		 
			var fx = new Fx.Styles(element, {duration:450, wait:false});
		 
			element.addEvent('mouseenter', function(){
				fx.start({							        
			         'color': '#a70303'			
				});
			});
		 
			element.addEvent('mouseleave', function(){
				fx.start({				    		        
			        'color': '#999'
				});
			});
		 
		});

		
						var list = $$('a.latestnews, a.mostread, .blogsection');
		list.each(function(element) {
		 
			var fx = new Fx.Styles(element, {duration:450, wait:false});
		 
			element.addEvent('mouseenter', function(){
				fx.start({							        
			         'color': '#484848'			
				});
			});
		 
			element.addEvent('mouseleave', function(){
				fx.start({				    		        
			        'color': '#888'
				});
			});
		 
		});
							var list = $$('.readon, .banneritem_text a');
		list.each(function(element) {
		 
			var fx = new Fx.Styles(element, {duration:450, wait:false});
		 
			element.addEvent('mouseenter', function(){
				fx.start({							        
			         'color': '#df0404'			
				});
			});
		 
			element.addEvent('mouseleave', function(){
				fx.start({				    		        
			        'color': '#ba0303'
				});
			});
		 
		});
		
							var list = $$('.inputbox');
		list.each(function(element) {
		 
			var fx = new Fx.Styles(element, {duration:450, wait:false});
		 
			element.addEvent('mouseenter', function(){
				fx.start({							        
			         'background-color': '#fafbfb'			
				});
			});
		 
			element.addEvent('mouseleave', function(){
				fx.start({				    		        
			        'background-color': '#fdfefe'
				});
			});
		 
		});
	
		
});
