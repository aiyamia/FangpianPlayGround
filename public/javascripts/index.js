$(function(){
  $(document.body).bind('mouseup', function(e){
    if(e.ctrlKey == true)
    {
      var selection;
      
      if (window.getSelection) {
        selection = window.getSelection();
      } else if (document.selection) {
        selection = document.selection.createRange();
      }
      $message = $(`<p id="card">${selection.toString()}</p>`);
      $message.css({"top": e.pageY, "left": e.pageX});
      $message.appendTo('#Content');
      // selection.toString() !== '' && alert('"' + selection.toString() + '" was selected at ' + e.pageX + '/' + e.pageY);
  
    }  
  });
});