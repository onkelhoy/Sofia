function Element(type, options){
  var elm = document.createElement(type);

  // iterate the options
  iterateOBJ(
    options,
    function(key, attr, type, parent){
      var selected = elm;
      // go to its destination e.g. elm[style][margin]
      if(parent) {
        for(var i=0; i<parent.length; i++){
          if(typeof selected[parent[i]] == 'undefined') selected[parent[i]] = {};
          selected = selected[parent[i]];
        }
      }

      // type is function and selected is a DOM object
      if(type == 'function' && typeof selected.nodeType && selected.nodeType > 0) {
        selected.addEventListener(key, attr);
      }
      // not a function or a DOM object
      else selected[key] = attr;
    }
  );

  return elm;
}


function iterateOBJ(obj, callback, parent){
  for(var a in obj){
    var type = typeof obj[a];

    // as its object, iterate it (recursive)
    if(type == 'object') {
      if(typeof parent == 'undefined') parent = [];
      // reference to parent object
      parent.push(a);
      iterateOBJ(obj[a], callback, parent);
    }
    else {
      // reached a lead node
      callback(a, obj[a], type, parent);
    }
  }
  // reset the parent array now
  if(typeof parent != 'undefined' && parent.length > 0) parent.length--;
}


function createNodes(data){
  console.log('hello');
}
