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
  curField:0
  
};

hyper.editor.getCurrentLine = function() {
  let line_num = hyper.editor.STATES.curLine;
  return document.querySelector(`#jsonEditor .lineW[data-line_num="${line_num}"]`);
};

hyper.editor.getCurrentField = function() {
  let line_num = hyper.editor.STATES.curLine;
  let field_num = hyper.editor.STATES.curField;

  return document.querySelector(`#jsonEditor .lineW[data-line_num="${line_num}"] .field[data-field_num="${field_num}"]`);
};

hyper.editor.getNextField = function() {
  let line_num = hyper.editor.STATES.curLine;
  let field_num = hyper.editor.STATES.curField+1;

  return document.querySelector(`#jsonEditor .lineW[data-line_num="${line_num}"] .field[data-field_num="${field_num}"]`);
};

/**
 * 
 * @returns the next field num if there is one, null if not
 */
hyper.editor.getNextFieldNum = function() {
  let line_num = hyper.editor.STATES.curLine;
  let field_num = hyper.editor.STATES.curField+1;
  let field =  document.querySelector(`#jsonEditor .lineW[data-line_num="${line_num}"] .field[data-field_num="${field_num}"]`);
  if (field) {
    return field_num;
  }
  else {
    return null;
  }
};

hyper.editor.setSelectedLine = function(params) {
  let {line_num} = params;
  let curLine = document.querySelector(`#jsonEditor .lineW[data-line_num="${line_num}"]`);
  let selected = document.querySelector(`#jsonEditor .lineW[data-selected="true"]`);
  selected.setAttribute('data-selected', 'false');
  curLine.setAttribute('data-selected', 'true');
  return curLine;
};

hyper.editor.clearFocusedField = function() {
  let focused = document.querySelector('#jsonEditor .field[data-focused="true"]');
  focused.setAttribute('data-focused', 'false');
};

hyper.editor.setSelectedField = function(params) {
  let {curLine, field_num} = params;
  hyper.editor.clearFocusedField();
  console.log(field_num);
  console.log(curLine);
  if (!curLine) {
    curLine = hyper.editor.getCurrentLine();
  }
  if(!field_num) {
    let firstField = curLine.querySelector('.field');
    firstField.setAttribute('data-focused', 'true');
    hyper.editor.STATES.curField = 0;
    return firstField;
  }
  else {
    hyper.editor.STATES.curField = field_num;
    let nextField = curLine.querySelector(`.field[data-field_num="${field_num}"]`);
    console.log(nextField);
    nextField.setAttribute('data-focused', 'true');
    return nextField;
  }
};

hyper.editor.goToNextLine = function() {
  if (hyper.editor.STATES.curLine < hyper.editor.STATES.lastLine) {
    let line_num = ++hyper.editor.STATES.curLine;
    let curLine = hyper.editor.setSelectedLine({ line_num });
    hyper.editor.setSelectedField({ curLine });
  }
};

hyper.editor.goToPrevLine = function() {
  if (hyper.editor.STATES.curLine > 1) {
    let line_num = --hyper.editor.STATES.curLine;
    let curLine = hyper.editor.setSelectedLine({ line_num });
    hyper.editor.setSelectedField({ curLine });
  }
};

hyper.editor.initLinePointer = function(editor) {
  window.addEventListener('keydown', function(event) {
    let key = event.key;    
    console.log(key);
    if (key == "ArrowDown") {
      hyper.editor.goToNextLine();
    }
    else if (key == "ArrowUp") {
      hyper.editor.goToPrevLine();
      
    }
    else if (key == "ArrowRight") {            
      //are there any more fields?
      let field_num = hyper.editor.getNextFieldNum();
      console.log(field_num);
      if (field_num) {
        hyper.editor.setSelectedField({field_num});
        
      }
      else {
        hyper.editor.goToNextLine();
        
      }
      
      
      //if yes, go to the next field
      //if not, go to the next line
    }
    else if (key == "ArrowLeft") {
      let cur_line = hyper.editor.getCurrentLine();
      console.log(cur_line);
            
    }
  });
};



hyper.editor.initEditor = function(elemId) {
  let editor = document.querySelector(elemId);  
  hyper.editor.initIndents(editor);
  hyper.editor.initLinePointer(editor);

};