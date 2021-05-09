import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    console.log('It works here');
   }
  
  ngOnInit(){
//  start-smoth-scrolling 
$(document).ready(function() {
  var elem = window.location.hash;
  $(".scroll").click(function(event){		
    event.preventDefault();
    $('html,body').animate({scrollTop:$(elem).offset().top},1000);
  });
});

// start-smoth-scrolling 

//  Bootstrap Core JavaScript 
$(document).ready(function(){
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideDown("fast");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideUp("fast");
            $(this).toggleClass('open');       
        }
    );
});

//script-for sticky-nav 
	$(document).ready(function() {
		 var navoffeset=$(".agileits_header").offset().top;
		 $(window).scroll(function(){
			var scrollpos=$(window).scrollTop(); 
			if(scrollpos >=navoffeset){
				$(".agileits_header").addClass("fixed");
			}else{
				$(".agileits_header").removeClass("fixed");
			}
		 });
		 
	});
//script-for sticky-nav 


  }

}
