hyper.views.json.editor.STATE = {
  inFocus: true,
  curLine: 1,
  lastLine: 13,
  curField: 0
};


hyper.views.json.editor.selectFirstFieldInLine = function (params = {}) {

  let { line_elem } = params;  
  field_num = 0;
  let field_elem = line_elem.querySelector(`.field[data-field_num="${field_num}"]`);
  field_elem.setAttribute('data-focused', true);
  hyper.views.json.editor.STATE.curField = 0;
  return { line_elem, field_elem };

};

hyper.views.json.editor.clearFocusedField = function () {

  let editor = hyper.views.json.elems.GET.editor.pane;
  let focused = editor.querySelector('.field[data-focused="true"]');
  if (focused) {
    focused.setAttribute('data-focused', 'false');

  }
};


hyper.views.json.editor.getCurrentLine = function () {
  let line_num = hyper.views.json.editor.STATE.curLine;
  let pane = hyper.views.json.elems.GET.editor.pane;
  return pane.querySelector(`.lineW[data-line_num="${line_num}"]`);
};

hyper.views.json.editor.selectFieldInCurrentLine = function (params = {}) {

  let { field_num } = params;
  let line_elem = hyper.views.json.editor.getCurrentLine();
  
  let field_elem = line_elem.querySelector(`.field[data-field_num="${field_num}"]`);
  field_elem.setAttribute('data-focused', true);
  hyper.views.json.editor.STATE.curField = field_num;
  return { line_elem, field_elem };

};


hyper.views.json.editor.getLastFieldOfLine = function (params) {
  let { line_elem } = params;
  let parent = line_elem.querySelector('.line');
  let last = parent.lastChild;
  return last;
};



hyper.views.json.editor.selectLastFieldInPrevLine = function () {

  line_elem = hyper.views.json.editor.getPrevLine();

  field_elem = hyper.views.json.editor.getLastFieldOfLine({ line_elem });
  field_elem.setAttribute('data-focused', 'true');
  hyper.views.json.editor.STATE.curField = field_elem.getAttribute('data-field_num');
  return { line_elem, field_elem };
};


hyper.views.json.editor.setSelectedField = function (params) {
  let { line_elem, field_num, line_num } = params;
  console.log(line_elem, field_num, line_num);
  if (!line_elem && field_num != undefined) {
    hyper.views.json.editor.clearFocusedField();
    return hyper.views.json.editor.selectFieldInCurrentLine({ field_num });
  }
  if (line_elem && field_num != undefined) {
    hyper.views.json.editor.clearFocusedField();
    return hyper.views.json.editor.selectFieldInLine({ field_num, line_elem, line_num });
  }
  else if (line_elem && field_num == undefined) {
    hyper.views.json.editor.clearFocusedField();
    return hyper.views.json.editor.selectFirstFieldInLine({ line_elem });
  }
  if (!line_elem && field_num == undefined) {
    if (hyper.views.json.editor.STATE.curLine > 1) {
      hyper.views.json.editor.clearFocusedField();
      return hyper.views.json.editor.selectLastFieldInPrevLine();
    }
  }
};

hyper.views.json.editor.setSelectedLine = function (params) {
  let { line_num } = params;
  let editor = hyper.views.json.elems.GET.editor.pane;
  let line_elem = editor.querySelector(`.lineW[data-line_num="${line_num}"]`);
  let selected = editor.querySelector(`.lineW[data-selected="true"]`);
  if (selected) {
    selected.setAttribute('data-selected', 'false');
    line_elem.setAttribute('data-selected', 'true');
    hyper.views.json.editor.STATE.curLine = line_num;
  }
  return line_elem;
};


hyper.views.json.editor.goToNextLine = function () {
  
  if (hyper.views.json.editor.STATE.curLine < hyper.views.json.editor.STATE.lastLine) {
    let line_num = ++hyper.views.json.editor.STATE.curLine;
    
    let line_elem = hyper.views.json.editor.setSelectedLine({ line_num });
    hyper.views.json.editor.setSelectedField({ line_elem });
  }

};


hyper.views.json.editor.goToPrevLine = function (params = {}) {


  let { field_num } = params;
  if (hyper.views.json.editor.STATE.curLine > 0) {
    let line_elem = hyper.views.json.editor.getPrevLine();

    if (!field_num) {

      hyper.views.json.editor.setSelectedField({ line_elem });
    }
    else {

      let field = hyper.views.json.editor.getLastFieldOfLine({ curLine });
      let field_num = field.getAttribute('data-field_num');
      hyper.views.json.editor.setSelectedField({ curLine, field_num });

    }
  }
};

hyper.views.json.editor.getPrevLine = function () {
  let line_num = --hyper.views.json.editor.STATE.curLine;
  let curLine = hyper.views.json.editor.setSelectedLine({ line_num });
  return curLine;
};

/**
 * 
 * @returns the next field num if there is one, null if not
 */
hyper.views.json.editor.getNextFieldNum = function () {
  
  let line_num = hyper.views.json.editor.STATE.curLine;
  console.log('prev line: ', line_num);
  let curField = hyper.views.json.editor.STATE.curField;
  console.log('prev field', curField);
  let field_num = parseInt(hyper.views.json.editor.STATE.curField) + 1;
  let pane = hyper.views.json.elems.GET.editor.pane;
  let field = pane.querySelector(`.lineW[data-line_num="${line_num}"] .field[data-field_num="${field_num}"]`);
  console.log('new field', field);
  if (field) {
    return field_num;
  }
  else {
    return 0;
  }
};

/**
 * 
 * @returns the next field num if there is one, null if not
 */
hyper.views.json.editor.getPrevFieldNum = function () {

  let field_num = hyper.views.json.editor.STATE.curField - 1;
  if (field_num > -1) {
    return field_num;
  }
  else {
    return null;
  }
};

hyper.views.json.editor.scrollToBlock = function() {
  //get selected field

  //get block id

  //find in inspector

  //scroll
};

hyper.views.json.editor.initLinePointer = function (editor) {
  window.addEventListener('keydown', function (event) {
    event.preventDefault();
    let key = event.key;

    if (key == "ArrowDown") {      
      hyper.views.json.editor.goToNextLine();
      hyper.views.json.editor.scrollToBlock();
    }
    else if (key == "ArrowUp") {
      hyper.views.json.editor.goToPrevLine();
      hyper.views.json.editor.scrollToBlock();
      
      
    }
    else if (key == "ArrowRight") {
      let field_num = hyper.views.json.editor.getNextFieldNum();
      if (field_num) {        
        
        hyper.views.json.editor.setSelectedField({ field_num });
        hyper.views.json.editor.scrollToBlock();
      }
      else {
        hyper.views.json.editor.goToNextLine();
        hyper.views.json.editor.scrollToBlock();
      }
    }
    else if (key == "ArrowLeft") {
      hyper.views.json.editor.scrollToBlock();
      
      let field_num = hyper.views.json.editor.getPrevFieldNum();
      hyper.views.json.editor.setSelectedField({ field_num });
    }
    else if (key == "Escape") {
      console.log('escape');
      // hyper.views.json.editor.reset();
    }
    // let field_num = hyper.views.json.editor.STATE.curField;
    // let line_num = hyper.views.json.editor.STATE.curLine;
    
    // hyper.views.json.editor.setSelectedTableColumn({ field_num, line_num });
    // hyper.views.json.editor.setSelectedTableCell({ field_num: hyper.views.json.editor.STATE.curField, line_num: hyper.views.json.editor.STATE.curLine });
  });
};


hyper.views.json.editor.reset = function() {
  let pane = hyper.views.json.elems.GET.editor.pane;
  pane.innerHTML = '';
  hyper.views.json.editor.STATE.curLine = 1;
};

hyper.views.json.editor.update = function(blocks) {
  blocks.forEach(function(block, index) {
    // console.log(block);
    let pane = hyper.views.json.elems.GET.editor.pane;
    let elem = hyper.views.json.editor.getBlockElem({block, index});
    pane.appendChild(elem);
  });
  //select first field
  let editor = hyper.views.json.elems.GET.editor.pane;
  let focused = editor.querySelector('.field');
  focused.setAttribute('data-focused', 'true');
  hyper.views.json.editor.STATE.curLine = 1;
};

hyper.views.json.editor.getLineW = function(params = {}) {  
  let {curLine, block} = params;
  let lineW = document.createElement('div');
  lineW.classList.add('lineW');
  lineW.setAttribute('data-line_num', block.line);
  let lineIndex = hyper.views.json.editor.getLineIndex(block.line);
  lineW.appendChild(lineIndex);
  let line = hyper.views.json.editor.getLine(block.indent);
  lineW.appendChild(line);
  
  let field = hyper.views.json.editor.getField({block});
  line.appendChild(field);
  return lineW;
};

hyper.views.json.editor.getLineIndex = function(num) {
  let elem = document.createElement('div');
  elem.classList.add('lineIndex');
  elem.textContent = num;
  return elem;
};

hyper.views.json.editor.getLine = function(indent) {
  let elem = document.createElement('div');
  elem.classList.add('line');
  elem.setAttribute('data-indent', indent);
  gsap.set(elem, {paddingLeft:`${20*indent}px`})
  return elem;
};

hyper.views.json.editor.setField = function(params = {}) {
  let {block, elem} = params;
  elem.setAttribute('contenteditable', 'true');
  elem.setAttribute('data-type', block.type);
  elem.setAttribute('data-focused', 'false');
  elem.setAttribute('data-field_num', block.field_num);  
  elem.setAttribute('data-id', block.id);
  if(block.close_match) {
    elem.setAttribute('data-close_match', block.close_match);
  }
  if(block.open_match) {
    elem.setAttribute('data-open_match', block.open_match);
  }
  if (block.match_line) {
    elem.setAttribute('data-line_match', block.match_line);    
  }
  hyper.views.json.editor.addParenthesis({ elem, block });  
};

hyper.views.json.editor.getField = function(params={}) {
  let {block} = params;
  let elem = document.createElement('div');
  elem.classList.add('field');
  hyper.views.json.editor.setField({block, elem});
  return elem;
};

hyper.views.json.editor.addParenthesis = function(params={}) {
  let { elem, block } = params;
  let string = null;
  if (block.string != "{" && block.string != ":" && block.string != "," && block.string != "}" && block.string != "[" && block.string != "]") {
    string = JSON.stringify(block.string, null, 4);
  }
  else {
    string = block.string;
  }
  elem.textContent = string;
};

hyper.views.json.editor.addLineToPane = function(params = {}) {
  let {block} = params;
  let lineW = hyper.views.json.editor.getLineW({ curLine: hyper.views.json.editor.STATE.curLine, block });
  hyper.views.json.elems.GET.editor.pane.appendChild(lineW);
};

hyper.views.json.editor.getBlockElem = function(params={}) {
  let {block, index} = params;
  let elemW = document.createElement('div');
  // console.log(block);
  if (hyper.views.json.editor.STATE.curLine < block.line) {
    hyper.views.json.editor.STATE.curLine++;    
    hyper.views.json.editor.addLineToPane({block});
  }
  else {
    //append to current line
    let curLine = document.querySelector(`#jsonView .jsonEditor .lineW[data-line_num="${hyper.views.json.editor.STATE.curLine}"]`);
    if(curLine) {          
      let field = hyper.views.json.editor.getField({block});       
      let line = curLine.querySelector('.line');
      line.appendChild(field);
    }
    else {
      //reset
      hyper.views.json.editor.reset();
      hyper.views.json.editor.addLineToPane({block});
    }
  }
  return elemW;
};

hyper.views.json.editor.init = function() {
  let blocks = hyper.views.json.object.STATE.blocks;
  hyper.views.json.editor.update(blocks);
  hyper.views.json.editor.initLinePointer();
};