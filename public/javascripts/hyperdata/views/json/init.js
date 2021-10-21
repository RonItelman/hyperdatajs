hyper.views.json.init = function() {  
  let textarea = document.querySelector("#jsonTextArea");
  textarea.value = JSON.stringify(window.JSON_IMPORT, null, 4);
  hyper.views.json.elems.init();
  hyper.views.json.input.init();  
  hyper.views.json.editor.init();  
  hyper.views.query.init();
  // hyper.views.json.inspector.init();
};