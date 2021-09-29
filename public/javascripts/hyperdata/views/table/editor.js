hyper.views.json.editor.init = function() {
  let buttons = hyper.views.json.elems.GET.rightMenu.buttons.all;
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      hyper.views.json.editor.clearSelected();
      let view = button.getAttribute('data-view');
      console.log(view);
      button.setAttribute('data-selected', 'true');
      hyper.views.json.editor.getPane(button.getAttribute('data-view'));
    });
  });
};

hyper.views.json.editor.getPane = function(view) {
  let pane = hyper.views.json.elems.GET.editor;
  // let 
  
};

hyper.views.json.editor.clearSelectedPane = function() {
  let pane = hyper.views.json.elems.GET.editor;
  let selectedPane = pane.querySelector('.paneW[data-selected="true"]');
  selectedPane.setAttribute('data-selected', 'false');
  
};

hyper.views.json.editor.clearSelectedButton = function() {
  let buttonsW = hyper.views.json.elems.GET.rightMenu.buttons.wrapper;
  let selected_button = buttonsW.querySelector('.button[data-selected="true"]');
  selected_button.setAttribute('data-selected', 'false');

};

hyper.views.json.editor.clearSelected = function() {
  hyper.views.json.editor.clearSelectedPane();
  hyper.views.json.editor.clearSelectedButton();
};