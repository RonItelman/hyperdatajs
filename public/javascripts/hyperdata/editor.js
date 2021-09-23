hyper.editor.STATES = {
  inFocus: true,
  curLine: 1,
  lastLine: 5,
  curField: 0
};

hyper.editor.initIndents = function(editor) {
  let lines = editor.querySelectorAll('.line');
  lines.forEach(function (line) {
    let indent = line.getAttribute('data-indent');
    line.style.marginLeft = `${indent * 20}px`;
  });
};



hyper.editor.getCurrentLine = function() {
  let line_num = hyper.editor.STATES.curLine;
  return document.querySelector(`#jsonEditor .lineW[data-line_num="${line_num}"]`);
};

hyper.editor.getLine = function(params = {}) {
  let {line_num} = params;  
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
  let field_num = parseInt(hyper.editor.STATES.curField)+1;

  let field =  document.querySelector(`#jsonEditor .lineW[data-line_num="${line_num}"] .field[data-field_num="${field_num}"]`);
  if (field) {
    return field_num;
  }
  else {
    return null;
  }
};

/**
 * 
 * @returns the next field num if there is one, null if not
 */
hyper.editor.getPrevFieldNum = function() {
  
  let field_num = hyper.editor.STATES.curField-1;  
  if (field_num > -1) {
    return field_num;
  }
  else {
    return null;
  }
};

hyper.editor.setSelectedLine = function(params) {
  let {line_num} = params;
  let line_elem = document.querySelector(`#jsonEditor .lineW[data-line_num="${line_num}"]`);
  let selected = document.querySelector(`#jsonEditor .lineW[data-selected="true"]`);
  selected.setAttribute('data-selected', 'false');
  line_elem.setAttribute('data-selected', 'true');
  hyper.editor.STATES.curLine = line_num;
  return line_elem;
};

hyper.editor.clearFocusedField = function() {

  let focused = document.querySelector('#jsonEditor .field[data-focused="true"]');  
  focused.setAttribute('data-focused', 'false');  
};


hyper.editor.goToNextLine = function() {
  if (hyper.editor.STATES.curLine < hyper.editor.STATES.lastLine) {
    let line_num = ++hyper.editor.STATES.curLine;
    let line_elem = hyper.editor.setSelectedLine({ line_num });
    hyper.editor.setSelectedField({ line_elem });
  }
};

hyper.editor.getLastFieldOfLine = function(params) {
  let {line_elem} = params;
  let parent = line_elem.querySelector('.line');
  let last = parent.lastChild;
  return last;
};

hyper.editor.getPrevLine = function() {
  let line_num = --hyper.editor.STATES.curLine;
  let curLine = hyper.editor.setSelectedLine({ line_num });
  return curLine;
}

hyper.editor.goToPrevLine = function(params = {}) {
  
  let {field_num} = params;
  if (hyper.editor.STATES.curLine > 1) {
    let line_elem = hyper.editor.getPrevLine();

    if (!field_num) {
      
      hyper.editor.setSelectedField({ line_elem });
    }
    else {
      
      let field = hyper.editor.getLastFieldOfLine({curLine});
      let field_num = field.getAttribute('data-field_num');
      hyper.editor.setSelectedField({ curLine, field_num });

    }
  }
};


hyper.editor.selectFieldInLine = function(params = {}) {  
  let {field_num, line_elem, line_num} = params;  
  let field_elem = line_elem.querySelector(`.field[data-field_num="${field_num}"]`);
  field_elem.setAttribute('data-focused', true);
  hyper.editor.STATES.curField = field_num;
  hyper.editor.STATES.curLine = line_num;
  return {line_elem, field_elem};

};


hyper.editor.selectFieldInCurrentLine = function(params = {}) {
  
  let {field_num} = params;
  let line_elem = hyper.editor.getCurrentLine();
  let field_elem = line_elem.querySelector(`.field[data-field_num="${field_num}"]`);
  field_elem.setAttribute('data-focused', true);
  hyper.editor.STATES.curField = field_num;
  return {line_elem, field_elem};

};

hyper.editor.selectFirstFieldInLine = function(params = {}) {
  
  let { line_elem} = params;
  field_num = 0;
  let field_elem = line_elem.querySelector(`.field[data-field_num="${field_num}"]`);
  field_elem.setAttribute('data-focused', true);
  hyper.editor.STATES.curField = 0;
  return { line_elem, field_elem };

};

hyper.editor.selectLastFieldInPrevLine = function() {
  
  line_elem = hyper.editor.getPrevLine();
  
  field_elem = hyper.editor.getLastFieldOfLine({ line_elem });
  field_elem.setAttribute('data-focused', 'true');
  hyper.editor.STATES.curField = field_elem.getAttribute('data-field_num');
  return { line_elem, field_elem };
};

hyper.editor.setSelectedField = function (params) {
  let { line_elem, field_num, line_num } = params;  

  if (!line_elem && field_num != undefined) {
    hyper.editor.clearFocusedField();
    return hyper.editor.selectFieldInCurrentLine({field_num});    
  }
  if (line_elem && field_num != undefined) {
    hyper.editor.clearFocusedField();
    return hyper.editor.selectFieldInLine({field_num, line_elem, line_num});    
  }
  else if (line_elem && field_num == undefined) {    
    hyper.editor.clearFocusedField();
    return hyper.editor.selectFirstFieldInLine({line_elem});        
  }
  if (!line_elem && field_num == undefined) {    
    if (hyper.editor.STATES.curLine > 1) {
      hyper.editor.clearFocusedField();
      return hyper.editor.selectLastFieldInPrevLine();
    }    
  }  
};



hyper.editor.setSelectedTableColumn = function(params={}) {
  let {line_num, field_num} = params;
  

  hyper.table.clearSelectedHeader();
  let col_elem = document.querySelector(`#table th[data-line_num="${line_num}"][data-field_num="${field_num}"]`);
  if (col_elem) {
    col_elem.setAttribute('data-focused', 'true');
  }
};


hyper.editor.setSelectedTableCell = function(params={}) {
  let {line_num, field_num} = params;
  
  hyper.table.clearSelectedCell();
  let col_elem = document.querySelector(`#table tr td[data-line_num="${line_num}"][data-field_num="${field_num}"]`);
  if (col_elem) {
    col_elem.setAttribute('data-focused', 'true');
  }
};

hyper.editor.initLinePointer = function(editor) {
  window.addEventListener('keydown', function(event) {
    let key = event.key;    
    
    if (key == "ArrowDown") {
      hyper.editor.goToNextLine();
    }
    else if (key == "ArrowUp") {
      hyper.editor.goToPrevLine();
      
    }
    else if (key == "ArrowRight") {            
      

      let field_num = hyper.editor.getNextFieldNum();      
      if (field_num) {
        
        hyper.editor.setSelectedField({field_num});        
      }
      else {
        hyper.editor.goToNextLine();        
      }      
    }
    else if (key == "ArrowLeft") {
      let field_num = hyper.editor.getPrevFieldNum();      
      hyper.editor.setSelectedField({field_num});                  
    }
    let field_num = hyper.editor.STATES.curField;
    let line_num = hyper.editor.STATES.curLine;
    if ((field_num == 0 && line_num == 1) || (line_num == hyper.editor.STATES.lastLine && field_num==0)) {
      hyper.editor.setSelectedTableMeta();
    }
    else {
      hyper.editor.clearSelectedTableMeta();

    }
    hyper.editor.setSelectedTableColumn({field_num, line_num});
    hyper.editor.setSelectedTableCell({ field_num: hyper.editor.STATES.curField, line_num: hyper.editor.STATES.curLine});
  });
};

hyper.editor.clearSelectedTableMeta = function() {
  let meta = document.querySelector("#meta");
  meta.setAttribute('data-focused', 'false');

};

hyper.editor.setSelectedTableMeta = function() {
  let meta = document.querySelector("#meta");
  meta.setAttribute('data-focused', 'true');
};


hyper.editor.initEditor = function(elemId) {
  let editor = document.querySelector(elemId);  
  hyper.editor.initIndents(editor);
  hyper.editor.initLinePointer(editor);

};