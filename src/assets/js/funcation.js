// JavaScript Document

/***************************************************
//  Vertically center Modal Windows Script
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/* center modal */
function centerModals(){
  $('.modal').each(function(i){
    var $clone = $(this).clone().css('display', 'block').appendTo('body');
    var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
    top = top > 0 ? top : 0;
    $clone.remove();
    $(this).find('.modal-content').css("margin-top", top);
  });
}
$('.modal').on('show.bs.modal', centerModals);
$(window).on('resize', centerModals);
$('.modal').modal({
  backdrop: 'static',
  show: false;
});

//**********************************************************************************************

$(document).ready(function() {
  function setHeight() {
    //windowHeight = $(window).innerHeight() - $('.header-space-inner').height();
	windowHeight = $(window).innerHeight();
	//$('#boxscroll4').height(windowHeight);
	$('.set-height1').height($(window).height() - 185);
  };
  setHeight();
  $(window).resize(function() {
    setHeight();
  });
});

//**********************************************************************************************
$(function() { 
	$('#left-nav').click(function(){
	  $('.wrap-call').toggleClass('close-nav');
	});
});

//****
$('.demo-1').percentcircle({
	fillColor: '#87b55a',
	percentSize: '40px'
});

$('.demo-2').percentcircle({
	animate : true,
	diameter : 100,
	guage: 3,
	coverBg: '#fff',
	bgColor: '#efefef',
	fillColor: '#f2b27e',
	percentSize: '40px',
	percentWeight: 'normal'
});

$('.demo-3').percentcircle({
	animate : true,
	diameter : 100,
	guage: 3,
	coverBg: '#fff',
	bgColor: '#efefef',
	fillColor: '#f2b27e',
	percentSize: '40px',
	percentWeight: 'normal'
});
$('.demo-4').percentcircle({
	animate : true,
	diameter : 100,
	guage: 3,
	coverBg: '#fff',
	bgColor: '#efefef',
	fillColor: '#82c9ec',
	percentSize: '40px',
	percentWeight: 'normal'
});		
$('.demo-5').percentcircle({
	animate : true,
	diameter : 100,
	guage: 3,
	coverBg: '#fff',
	bgColor: '#efefef',
	fillColor: '#e39f9f',
	percentSize: '40px',
	percentWeight: '20px'
});	
$('.demo-6').percentcircle({
	fillColor: '#87b55a',
	percentSize: '40px'
});

$('.demo-7').percentcircle({
	animate : true,
	diameter : 100,
	guage: 3,
	coverBg: '#fff',
	bgColor: '#efefef',
	fillColor: '#f2b27e',
	percentSize: '40px',
	percentWeight: 'normal'
});
$('.demo-8').percentcircle({
	animate : true,
	diameter : 100,
	guage: 3,
	coverBg: '#fff',
	bgColor: '#efefef',
	fillColor: '#e39f9f',
	percentSize: '40px',
	percentWeight: '20px'
});	
//**********************************************************************************************

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Minor", "Moderate", "Critical"],
        datasets: [{
            label: "Open",
            backgroundColor: 'rgb(247, 183, 131)',
            borderColor: 'rgb(247, 183, 131)',
            data: [30, 50, 20],
        },{
            label: "Closed",
            backgroundColor: 'rgb(96, 182, 226)',
            borderColor: 'rgb(96, 182, 226)',
            data: [20, 10, 40],
        },{
            label: "Assigned",
            backgroundColor: 'rgb(141, 186, 96)',
            borderColor: 'rgb(141, 186, 96)',
            data: [10, 40, 30],
        }]
    },

    // Configuration options go here
    options: {
		scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
			
	}
});





//**********************************************************************************************


var ctx = document.getElementById("myChart2").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Minor", "Moderate", "Critical"],
        datasets: [{
            //label: '# of Votes',
            data: [6, 4, 11],
            backgroundColor: [
                'rgba(135, 181, 90, 0.9)',
                'rgba(242, 174, 126, 0.9)',
                'rgba(228, 115, 114, 0.9)'
            ],
            borderColor: [
                'rgba(135, 181, 90, 0.9)',
                'rgba(242, 174, 126, 0.9)',
                'rgba(228, 115, 114, 0.9)'
            ],
            borderWidth: 0
        }]
    },
    options: {}
});


//**********************************************************************************************

