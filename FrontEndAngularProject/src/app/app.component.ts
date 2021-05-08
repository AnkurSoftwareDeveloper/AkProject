import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
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


  }

}
