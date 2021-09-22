hyper.editor.initIndents = function(editor) {
  let lines = editor.querySelectorAll('.line');
  lines.forEach(function (line) {
    let indent = line.getAttribute('data-indent');
    line.style.marginLeft = `${indent * 20}px`;
  });
};

hyper.editor.STATES = {
  inFocus:true,
  curLine:1,
  lastLine:4
};

hyper.editor.initLinePointer = function(editor) {
  let pointer = document.querySelector('#linePointer');
  window.addEventListener('keydown', function(event) {
    let key = event.key;
    
    if (key == "ArrowDown") {
      if (hyper.editor.STATES.curLine < hyper.editor.STATES.lastLine) {
        ++hyper.editor.STATES.curLine;      
        console.log(hyper.editor.STATES.curLine);
      }
    }
    else if (key == "ArrowUp") {
      if (hyper.editor.STATES.curLine > 1) {
        --hyper.editor.STATES.curLine;        
        console.log(hyper.editor.STATES.curLine);
      }

    }
    gsap.to(pointer, { top: `${(hyper.editor.STATES.curLine-1) * 30}px`, duration: 0.05 });
  });
};

hyper.editor.initEditor = function(elemId) {
  let editor = document.querySelector(elemId);  
  hyper.editor.initIndents(editor);
  hyper.editor.initLinePointer(editor);
};