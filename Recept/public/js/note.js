function addNote(options){
  try {
    var note_elm = createElement(null, 'div', 'note'),
        left_elm = createElement(null, 'div', 'left'), // vertical line + holes
        body_elm = createElement(null, 'div', 'body'); // where all the text will be added

    // create and add the holes to our .left element
    for(j=0; j<(options.notes.length > 5 ? 2 : 1); j++){ // need two containers::four holes
      var hole_container_elm = createElement(null, 'div', 'hole-container'); // hole container element

      // create the hole instances
      for(i=0; i<2; i++){ // need two holes
        var hole_elm = createElement('&nbsp;', 'div', 'hole'); // non-breaking space: to have width..
        hole_container_elm.appendChild(hole_elm);
      }

      // adding the hole container
      left_elm.appendChild(hole_container_elm);
    }

    // adding .left & .body element to the .note element
    note_elm.appendChild(left_elm);
    note_elm.appendChild(body_elm);

    // add the header & notes
    // header
    addLine(body_elm, options.head || options.header, 'h1');
    // notes
    for(i=0; i<options.notes.length; i++){
      addLine(body_elm, options.notes[i], 'p');
    }

    // always end line on 5
    var end = options.notes.length%5;
    if(end > 0) end = 5 - end;
    for(i=0; i<end; i++){
      addLine(body_elm, '&nbsp;', 'p');
    }

    // do the design such as rotation etc if options has or just by random..
    var angle = 0;
    if(typeof options.angle != 'undefined')
      angle = options.angle;
    else
      angle = -Math.PI / 2 + Math.random()*Math.PI/10 * Math.random() > .5 ? 1 : -1;

    var pos = null;
    if(typeof options.position != 'undefined')
      pos = options.position;
    else
      pos = {
        x: 0,
        y: 0
      }

    // add the note to a target element
    document.getElementById(options.target).appendChild(note_elm);
  }
  catch (e){
    // something happended
    console.log(e);
    throw e;
  }
}

function createElement(text, type, className){
  var elm = document.createElement(type);
  elm.className = className;
  if(text != null) elm.innerHTML = text;

  return elm;
}

function addLine(note, text, type){
  var line = createElement(text, type, 'line');
  note.appendChild(line);
  // note.appendChild(document.createElement('hr'));
}
