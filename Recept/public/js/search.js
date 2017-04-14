$(document).ready(function(){

  $('.ui.search')
   .search({
    type          : 'category',
    minCharacters : 2,
    apiSettings   : {
      onResponse: function(receptResponse) {
        var
          response = {
            results : {}
          }
        ;
        // translate GitHub API response to work with search
        $.each(receptResponse, function(index, recept) {

          var
            category   = recept.kategori || 'Övrigt',
            maxResults = 8
          ;
          if(index >= maxResults) {
            return false;
          }
          // create new language category
          if(response.results[category] === undefined) {
            response.results[category] = {
              name    : category,
              results : []
            };
          }
          // add result to category
          response.results[category].results.push({
            title       : recept.titel,
            description : recept.beskrivning,
            url         : "javascript:select("+recept.id+")"
          });
        });
        return response;
      },
      url: 'search?q={query}'
    }
  });

});

function select(id){
  console.log(id);
}
