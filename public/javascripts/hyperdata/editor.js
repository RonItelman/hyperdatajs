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
  let field_num = hyper.editor.STATES.curField+1;
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
  console.log('hyper.editor.getPrevFieldNum');
  console.log('hyper.editor.STATES.curField', hyper.editor.STATES.curField);
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
    console.log(field_num);
    if (!field_num) {
      console.log("IF");
      hyper.editor.setSelectedField({ line_elem });
    }
    else {
      console.log('NONE');
      let field = hyper.editor.getLastFieldOfLine({curLine});
      let field_num = field.getAttribute('data-field_num');
      hyper.editor.setSelectedField({ curLine, field_num });

    }
  }
};


hyper.editor.setSelectedField = function (params) {
  let { line_elem, field_num } = params;
  hyper.editor.clearFocusedField();
  console.log(line_elem);
  console.log(field_num);
  if (!line_elem && field_num) {
    //select field in current line
    line_elem = hyper.editor.getCurrentLine();
    let field_elem = line_elem.querySelector(`.field[data-field_num="${field_num}"]`);
    field_elem.setAttribute('data-focused', true);
    hyper.editor.STATES.curField = field_num;
    return {line_elem, field_elem};
    // hyper.editor.setSelectedField({field_num:0});
  }
  else if (line_elem && field_num == undefined) {
    //select first field
    field_num = 0;
    let field_elem = line_elem.querySelector(`.field[data-field_num="${field_num}"]`);
    field_elem.setAttribute('data-focused', true);
    hyper.editor.STATES.curField = 0;
    return {line_elem, field_elem};
    // hyper.editor.setSelectedField({field_num:0});
  }
  if (!line_elem && field_num == undefined) {
    //go to previous line, set last field
    line_elem = hyper.editor.getPrevLine();
    console.log(line_elem);
    field_elem = hyper.editor.getLastFieldOfLine({line_elem});
    field_elem.setAttribute('data-focused', 'true');
    hyper.editor.STATES.curField = field_elem.getAttribute('data-field_num');
    return {line_elem, field_elem};
    
  }
  // else if (!curLine && field_num) {
  //   //current line, set field
    
  // }
  // else if (!field_num && curLine) {
  //   //current line, first field
  //   let firstField = curLine.querySelector('.field');
  //   firstField.setAttribute('data-focused', 'true');
  //   hyper.editor.STATES.curField = 0;
  //   return firstField;
  // }
  // else {
  //   // hyper.editor.STATES.curField = field_num;
  //   // let nextField = curLine.querySelector(`.field[data-field_num="${field_num}"]`);

  //   // nextField.setAttribute('data-focused', 'true');
  //   // return nextField;
  // }
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
        console.log(field_num);
        hyper.editor.setSelectedField({field_num});        
      }
      else {
        hyper.editor.goToNextLine();        
      }      
    }
    else if (key == "ArrowLeft") {
      let field_num = hyper.editor.getPrevFieldNum();
      console.log(field_num);
      hyper.editor.setSelectedField({field_num});
      // if (field_num > -1) {
      //   let line_num = hyper.editor.STATES.curLine;
      //   let field = document.querySelector(`#jsonEditor .lineW[data-line_num="${line_num}"] .field[data-field_num="${field_num}"]`);
      //   if (field) {
      //     return field_num;
      //   }
      //   else {
      //     return null;
      //   }
      // }
      // else {
      //   let line_num = hyper.editor.STATES.curLine - 1;
      //   let line = hyper.editor.getLine({ line_num });
      //   let last = line.lastChild;
      //   console.log("GO TO PREV LINE", last);
      // }
      // console.log(`GET PREVIOUS FIELD NUM: ${field_num}`);
      // if (field_num != undefined || field_num != null) {
      //   console.log("there IS a previous field num");
      //   hyper.editor.setSelectedField({field_num});        
      // }
      // else {
      //   console.log("there IS NOT a previous field num");
      //   hyper.editor.goToPrevLine();        
      // }      
      
            
    }
  });
};



hyper.editor.initEditor = function(elemId) {
  let editor = document.querySelector(elemId);  
  hyper.editor.initIndents(editor);
  hyper.editor.initLinePointer(editor);

};