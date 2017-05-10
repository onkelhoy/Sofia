$(document).ready(function(){

  $('.segment.first')
  .visibility({
    once: false,
    observeChanges: true,
    onBottomPassed: function(){
      console.log("passed");
    }
  });

  $('.ui.search')
    .visibility({
      type: "fixed",
      offset: 30
  });
})


function setFooter(){
  if($(window).height() > $('div.ui.container').height()){
    console.log('nope');
    // console.log($(window).height(), $('div.ui.container').height());
    $('footer').css({
      position: 'absolute',
      bottom: '-10%',
      display: 'block'
    });
  }
  else
    $('footer').css({
      position: 'relative',
      bottom: 'auto'
    }).show();
}

function checkWidth(){
  if(window.innerWidth < 700){
    setRot(0);
  }
  else setRot(1);
}

window.onresize = function(){
  checkWidth();
}
