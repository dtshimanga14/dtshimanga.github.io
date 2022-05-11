let timer;

$(() => {
   timer = setTimeout(growCircle, 250);

   $('#stop').on('click',() => {
        clearInterval(timer);
    }); 
   $('.circle').on('click', function(){
     $(this).remove();
     let number = $('#number').val();
     let newCount = number-1;
     $('#number').val(newCount);

   }).on('mouseenter', function (){ $(this).animate({ opacity : 0.5 }) })
    .on('mouseleave', function (){ $(this).animate({ opacity : 1 }) });  

   $('#start').on('click',() => {
    $('.circle').toggle();
});
});

function getInterval() {
    let y = $('#interval').val();
    let result = y ? parseInt(y) : 250;
    return result;
}
function growCircle() {

    let $circle = $('.circle');
    let $container = $('#container');
    let growth = $('#growth').val();
    let number = $('#number').val();
    let childrenCount = $container.children().length;
    let count =  number > childrenCount ? (number - childrenCount) : 0;


    for (let i = 0; i < count; i++) {
        let newElt =  $("<div></div>")
        .addClass("circle")
        .on('click',function (){
             $(this).remove();
             let number = $('#number').val();
             let newCount = number-1;
             $('#number').val(newCount);
        }).on('mouseenter', function (){ $(this).animate({ opacity : 0.5 }) })
        .on('mouseleave', function (){ $(this).animate({ opacity : 1 }) });  
        $container.append(newElt);
    }

    let addSize = growth ? growth : 10;
    let currSize = $circle.width();
    let size = parseInt(currSize) + parseInt(addSize);
    let sPixel = size + 'px';

    $circle.css({ 
        width : sPixel,  
        height : sPixel,   
        top : '-=1%',
        left : '-=0.3%',
        'border-radius': sPixel
    });
    timer = setTimeout(growCircle, getInterval());
}