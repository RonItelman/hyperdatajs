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
  lastLine:3,
  
};

// hyper.editor.movePointer = function() {
//   let pointer = document.querySelector('#linePointer');
//   let height = 0;
//   for (let i = 0; i < hyper.editor.STATES.curLine - 1; ++i) {
//     height += hyper.editor.STATES.line_heights[hyper.editor.STATES.curLine - 1];
//     gsap.to(pointer, { top: `${height}px`, duration: 0.05 });
//   }
//   if (hyper.editor.STATES.curLine - 1 == 0) {
//     height = 0;
//     gsap.to(pointer, { top: `${height}px`, duration: 0.05 });

//   }
// };

hyper.editor.initLinePointer = function(editor) {
  window.addEventListener('keydown', function(event) {
    let key = event.key;
    // let height = 0;
    if (key == "ArrowDown") {
      if (hyper.editor.STATES.curLine < hyper.editor.STATES.lastLine) {
        let line_num = ++hyper.editor.STATES.curLine;
        let curLine = document.querySelector(`#jsonEditor .lineW[data-line_num="${line_num}"]`);
        let selected = document.querySelector(`#jsonEditor .lineW[data-selected="true"]`);
        selected.setAttribute('data-selected', 'false');
        curLine.setAttribute('data-selected', 'true');
        // hyper.editor.movePointer();
        // console.log(`${height}px height`);
        // console.log(hyper.editor.STATES.curLine);
      }
    }
    else if (key == "ArrowUp") {
      if (hyper.editor.STATES.curLine > 1) {
        let line_num = --hyper.editor.STATES.curLine;        
        let curLine = document.querySelector(`#jsonEditor .lineW[data-line_num="${line_num}"]`);
        let selected = document.querySelector(`#jsonEditor .lineW[data-selected="true"]`);
        selected.setAttribute('data-selected', 'false');
        curLine.setAttribute('data-selected', 'true');
        // hyper.editor.movePointer();
        // console.log(hyper.editor.STATES.curLine);
      }
      
    }
    
    
  });
};

hyper.editor.initEditor = function(elemId) {
  let editor = document.querySelector(elemId);  
  hyper.editor.initIndents(editor);
  hyper.editor.initLinePointer(editor);
};