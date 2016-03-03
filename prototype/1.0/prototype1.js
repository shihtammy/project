$(document).ready(function () {

    console.log('ready');

$(function() {
    $( "#interior" ).selectmenu();
 
    $( "#level" ).selectmenu();
 
    $( "#exp" )
      .selectmenu()
      .selectmenu( "menuWidget" )
        .addClass( "overflow" );
  });