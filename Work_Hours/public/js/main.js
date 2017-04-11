// add new table row
function add(start, rast, slut){
  if(start == '' || slut == ''){
    showError('submit', {
      on       : 'focus',
      position : 'bottom left',
      title    : 'Nu blev det fel',
      content  : 'Du har inga start och slut värden!'
    });
  }
  else {
    if(rast == '') rast = 0;
    var values = [start, rast, slut], noerror = true;
    for(var i = 0; i < values.length && noerror; i++){
      var d = getTime(values[i]);
      if(d.length <= 0) noerror = false;
      else values[i] = d;
    }

    if(noerror){
      var h = values[2][0] - values[0][0];

      var min = 0;
      if(values[0].length == 2) min += values[0][1];
      if(values[2].length == 2) min += values[2][1];
      if(values[1].length == 2){
        h -= values[1][0];
        min -= values[1][1];
      }
      else min -= values[1][0];

      var oMin = min % 60, mHours = (min - oMin) / 60;
      h += mHours;

      if(oMin < 0) {
        h--;
        oMin = 60 + oMin;
      }

      var tr = $('<tr>');
      tr.append(
        $('<td>').addClass('collapsing').append(
          $('<button>').addClass('circular ui icon button').click(function(){remove($(this))}).append(
            $('<i>').addClass('minus icon')
          )),
        $('<td>').text(start), $('<td>').text(rast), $('<td>').text(slut), $('<td>').text(h+'h '+oMin+'min').attr('h', h).attr('m', oMin));

      $('table > tbody').append(tr);
      update();

      $(window).scrollTop($(document).height());
    }
  }
}

// remove this table row
function remove(btn){
  btn.parent().parent().remove();
  update();
}

// update the total time
function update(){
  var trs = $('table > tbody').children();
  var hours = 0, mins = 0;

  for(var i = 0; i < trs.length; i++){
    var tar = trs.eq(i).children().eq(4); // target
    hours += Number(tar.attr('h'));
    mins += Number(tar.attr('m'));
  }

  var omin = mins % 60;
  hours += (mins - omin) / 60;

  $('#total')
    .val(hours+'h ' + omin+'min')
    .attr('h', hours)
    .attr('m', omin);
}

// get time by value
function getTime(value){
  // try split
  var vals = value.split(/[\s,.:-]+/), error = false;
  for(var i = 0; i < vals.length && !error; i++){
    var num = Number(vals[i]);
    if(!isNaN(num)) vals[i] = num;
    else {
      // error
      showError('submit', {
        on       : 'focus',
        position : 'bottom left',
        title    : 'Nu blev det fel',
        content  : 'Du har fel värde på tiden.. [0-9], m.a.o. inga bokstäver'
      });
      error = true;
    }
  }

  if(!error) return vals;
  else return [];
}

// show the ammount of cash
function show(){
  var h = $('#total').attr('h');
  if(typeof h == 'undefined') {
    showError('ammount', {
      on       : 'focus',
      position : 'bottom right',
      title    : 'Uppgifter saknas',
      content  : 'Du måste ha några tider innan du kan kolla.'
    });
  }
  else {
    var m = Number($('#total').attr('m'));
    h = Number(h);
    if(m == 0) m = 1;

    var cash = (h + 60/m) * 150;

    // poor use of name..
    showError('ammount', {
      on       : 'focus',
      position : 'bottom right',
      title    : 'Du har',
      content  : 'Änsålänge har du tjänat ihop: '+ cash +'kr [innan skatt]'
    });

  }
}

// dynamic error
function showError(id, data){
  $('#'+id).popup(data).popup("show").focus().focusout(function(){
    $(this).popup('remove popup').popup('destroy').unbind('focusout');
  });
}
