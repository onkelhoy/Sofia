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
