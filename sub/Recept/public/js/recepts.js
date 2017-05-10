// manage notes
function create(){
  
}


// display notes..
function addNotes(data){
  const re = /\b[\w']+(?:\s+[\wåäöÅÄÖ']+){0,8}/g;

  for(i = 0; i < data.recept.length; i++){
    var splits = data.recept[i].beskrivning.match( re );

    var noteElm = addNote({
      head: data.recept[i].titel,
      target: 'target',
      notes: splits,
      obj: data.recept[i]
    });
  }
}

function viewNote(note){
  $('#target').hide();

  var notes = [];
  // ingredienser
  notes.push({text: 'ingredienser', type: 'h2'});
  for(k=0; k<note.ingredienser.length; k++){
    notes.push({text: 'Del '+ (k+1)+' '+note.ingredienser[k].del, type: 'h3'});
    for(j=0; j<note.ingredienser[k].ingredienser.length; j++){
      notes.push('<span>'+note.ingredienser[k].ingredienser[j]['namn']+'</span><span>'+note.ingredienser[k].ingredienser[j]['mått']+'</span>')
    }
  }
  // tillagning
  notes.push({text: 'tillagning', type: 'h2'});
  for(k=0; k<note.tillagning.length; k++){
    notes.push({text: 'Del '+ (k+1)+' '+note.tillagning[k].del, type: 'h3'});
    for(j=0; j<note.tillagning[k].moment.length; j++){
      notes.push(note.tillagning[k].moment[j]['steg']);
      if(note.tillagning[k].moment[j]['notis'] != '') notes.push({text:'('+note.tillagning[k].moment[j]['notis']+')', className: 'right'});
    }
  }

  var noteElm = addNote({
    head: note.titel,
    target: 'display',
    notes: notes,
    displayType: true
  });
  $('footer').hide();
  setTimeout(function(){
    setFooter();
  }, 100);
  $('.display-con').show();
}

function goBack(){
  $('.display-con').hide();
  $('#display').empty();

  $('footer').hide();
  setTimeout(function(){
    setFooter();
  }, 100);

  $('#target').show();
}


function setRot(state){
    var notes = document.getElementsByClassName('note');
    for(i=0; i<notes.length; i++){
      if(state == 0) { //turn off
        if(notes[i].style.transform != 'none') {
          notes[i].trans = notes[i].style.transform;
          notes[i].shad = notes[i].style['box-shadow'];
        }
        notes[i].style.transform = 'none';
        notes[i].style['box-shadow'] = '0px 5px #aaa';
      }
      else if(typeof notes[i].trans != 'undefined') {
        notes[i].style.transform = notes[i].trans;
        notes[i].style['box-shadow'] = notes[i].shad;
      }
    }
}
