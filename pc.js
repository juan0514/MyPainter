
(function($){

var drawing ={ 
		canvas : $('canvas'),
		ctx: $('canvas').get(0).getContext('2d'),
   		color:$('#color'),
		ranges :$('#range'),
		$box :$('.box'),
		imgarr:[],
		
    init:function(){
    	this.ctx.lineCap = "round";
		this.ctx.lineJoin = "round";
		this.drawing();
		this.clear();
	},
	
	drawing:function(){		
		var cavs  = this.canvas,
		    ctx = this.ctx,
		    self = this, 
		    cx = self.canvas.offset().left,
		    cy = self.canvas.offset().top;
		cavs.mousedown(function(e){	
			    self.flag = true;  
			    
				var e = e || window.event;
				var x = e.pageX - cx,
					y = e.pageY - cy;				
				ctx.beginPath();
				ctx.moveTo(x, y);
			cavs.mousemove(function(e) {
					var e = e || window.event;
					if(self.flag){
						ctx.lineTo(e.pageX - cx, e.pageY - cy);
						ctx.stroke();						
			      }					
		    })		   		
			cavs.mouseup(function(){
				ctx.closePath();
				self.flag  = false;			
			})
			cavs.mouseleave(function(){
				self.ctx.closePath();
				self.flag = false;	
		    })
		
			var imgdate = ctx.getImageData(0,0,self.canvas.width(),self.canvas.height());
			self.imgarr.push(imgdate);
			console.log(self.imgarr);
		})
	},
	
	clear:function(){
		var self = this;
		
		   self.color.change(function(){
		   	   self.ctx.strokeStyle = $(this).val();
		   })
		   
		   self.ranges.change(function(){
		   	   self.ctx.lineWidth = $(this).val();
		   })
		   
		   self.$box.on('click',function(e){
		   	  switch(e.target.id){
		   	  	case "clear":
		   	  	   self.ctx.clearRect(0,0,self.canvas.width(),self.canvas.height());
		   	  	break;
		   	  	
		   	  	case "eraser":
		   	  	   self.ctx.beginPath();
		   	  	   self.ctx.strokeStyle ="#fff";
		   	  	   self.ctx.stroke();
		   	  	break;
		   	  	 
		   	  	case "back":		   	  	  
		          if(self.imgarr.length > 0){
		          	 self.ctx.putImageData(self.imgarr.pop(),0,0);
		          }
		   	  	break;
		   	  }
		   })		
	}
	
}

drawing.init();
	
	
	
})(jQuery)
