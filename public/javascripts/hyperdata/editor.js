hyper.editor.initIndents = function(editor) {
  let lines = editor.querySelectorAll('.line');
  lines.forEach(function (line) {
    let indent = line.getAttribute('data-indent');
    line.style.marginLeft = `${indent * 20}px`;
  });
};

hyper.editor.STATES = {
  inFocus:true,
  curLine:0
};

hyper.editor.initLinePointer = function(editor) {
  window.addEventListener('keydown', function(event) {
    let key = event.key;
    let curLine = hyper.editor.STATES.curLine;
    if (key == "ArrowDown") {
      ++hyper.editor.STATES.curLine;
      console.log(hyper.editor.STATES.curLine);
    }
    else if (key == "ArrowUp") {

    }
  });
};

hyper.editor.initEditor = function(elemId) {
  let editor = document.querySelector(elemId);  
  hyper.editor.initIndents(editor);
  hyper.editor.initLinePointer(editor);
};