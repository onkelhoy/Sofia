function addNotes(data){
  const re = /\b[\w']+(?:\s+[\wåäöÅÄÖ']+){0,2}/g;

  console.log(data.recept[0]);
  for(i = 0; i < data.recept.length; i++){
    // console.log(data.recept[i]);

    // var splits = data.recept[i].beskrivning.match( re );
    // console.log(splits);
    // console.log(splits.join('</p><p>'));

    var notes = [];
    // ingredienser
    notes.push({text: 'ingredienser', type: 'h2'});
    for(k=0; k<data.recept[i].ingredienser.length; k++){
      notes.push({text: 'Del '+ (k+1)+' '+data.recept[i].ingredienser[k].del, type: 'h3'});
      for(j=0; j<data.recept[i].ingredienser[k].ingredienser.length; j++){
        notes.push('<span>'+data.recept[i].ingredienser[k].ingredienser[j]['namn']+'</span><span>'+data.recept[i].ingredienser[k].ingredienser[j]['mått']+'</span>')
      }
    }
    // tillagning
    notes.push({text: 'tillagning', type: 'h2'});
    for(k=0; k<data.recept[i].tillagning.length; k++){
      notes.push({text: 'Del '+ (k+1)+' '+data.recept[i].tillagning[k].del, type: 'h3'});
      for(j=0; j<data.recept[i].tillagning[k].moment.length; j++){
        notes.push(data.recept[i].tillagning[k].moment[j]['steg']);
        if(data.recept[i].tillagning[k].moment[j]['notis'] != '') notes.push({text:'('+data.recept[i].tillagning[k].moment[j]['notis']+')', className: 'right'});
      }
    }

    addNote({
      head: data.recept[i].titel,
      target: 'target',
      notes: notes
    });
  }
}
