hyper.views.json.editor.STATE = {  
  curLine: 1,
  lastLine: 13,
  curField: 0,
  curBlock: 1,
  line_blocks:[]
};

hyper.views.json.editor.setLastLine = function(num) {
  hyper.views.json.editor.STATE.lastLine = num;
};

hyper.views.json.editor.update = function (blocks) {
  
  let pane = hyper.views.json.elems.GET.editor.pane;
  blocks.forEach(function (block, index) {
    // console.log(block);
    let elem = hyper.views.json.editor.getBlockElem({ block, index });
    pane.appendChild(elem);
  });
  //select first field
  
  let focused = pane.querySelector(`.field[data-id="1"]`);
  
  hyper.views.json.editor.setSelectedBlock(focused);
  // hyper.views.json.inspector.setSelectedBlock(1);
  
  
};

hyper.views.json.editor.addFieldListeners = function(params={}) {
  let pane = hyper.views.json.elems.GET.editor.pane;
  let fields = pane.querySelectorAll(`.field`);
  fields.forEach(function(field) {
    // field.addEventListener('click', function() {
    //   let id = field.getAttribute('data-id');
    //   hyper.views.json.editor.setSelectedBlock(field);      
    // });
    field.addEventListener('focus', function() {
      let id = field.getAttribute('data-id');
      hyper.views.json.editor.setSelectedBlock(field);      
    });
  });
};

hyper.views.json.editor.setSelectedBlock = function (field) {
  
  let id = parseInt(field.getAttribute('data-id'));
  hyper.views.json.editor.STATE.curBlock = id;
  hyper.views.json.editor.clearFocusedField();
  let field_num = field.getAttribute('data-field_num');
  let line_num = field.closest('.lineW').getAttribute('data-line_num');
  hyper.views.json.editor.STATE.curField = field_num;
  field.setAttribute('data-focused', true);
  hyper.views.json.inspector.setSelectedBlock(id);
  hyper.views.json.editor.setSelectedLine({line_num});
};


hyper.views.json.editor.setSelectedField = function (params) {
  let { line_elem, field_num } = params;  

  if (!line_elem && field_num != undefined) {
    hyper.views.json.editor.clearFocusedField();
    return hyper.views.json.editor.selectFieldInCurrentLine({ field_num });
  }
  // if (line_elem && field_num != undefined) {
  //   hyper.views.json.editor.clearFocusedField();
  //   return hyper.views.json.editor.selectFieldInLine({ field_num, line_elem, line_num });
  // }
  if (line_elem && field_num == undefined) {
    hyper.views.json.editor.clearFocusedField();
    return hyper.views.json.editor.selectFirstFieldInLine({ line_elem });
  }
  if (!line_elem && field_num == undefined) {
    if (hyper.views.json.editor.STATE.curLine > 1) {
      hyper.views.json.editor.clearFocusedField();
      return hyper.views.json.editor.selectLastFieldInPrevLine();
    }
  }
  if(line_elem == undefined && field_num == null) {
    console.log('null');
    return {field_elem:null};
  }
};

hyper.views.json.editor.selectFirstFieldInLine = function (params = {}) {

  let { line_elem } = params;  
  field_num = 0;
  let field_elem = line_elem.querySelector(`.field[data-field_num="${field_num}"]`);
  // field_elem.setAttribute('data-focused', true);
  hyper.views.json.editor.STATE.curField = 0;
  hyper.views.json.editor.STATE.curBlock = field_elem.getAttribute('data-id');
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
  // field_elem.setAttribute('data-focused', true);
  hyper.views.json.editor.STATE.curField = field_num;
  hyper.views.json.editor.STATE.curBlock = field_elem.getAttribute('data-id');
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
  // field_elem.setAttribute('data-focused', 'true');
  hyper.views.json.editor.STATE.curField = field_elem.getAttribute('data-field_num');
  hyper.views.json.editor.STATE.curBlock = field_elem.getAttribute('data-id');
  return { line_elem, field_elem };
};


hyper.views.json.editor.clearSelectedLine = function() {
  let editor = hyper.views.json.elems.GET.editor.pane;
  let selected = editor.querySelector(`.lineW[data-selected="true"]`);
  if (selected) {
    selected.setAttribute('data-selected', 'false');
  }
};

hyper.views.json.editor.setSelectedLine = function (params) {
  let { line_num } = params;
  
  let editor = hyper.views.json.elems.GET.editor.pane;
  hyper.views.json.editor.clearSelectedLine();
  let line_elem = editor.querySelector(`.lineW[data-line_num="${line_num}"]`);
  line_elem.setAttribute('data-selected', 'true');
  hyper.views.json.editor.STATE.curLine = line_num;
  return line_elem;
};


hyper.views.json.editor.goToNextLine = function () {
  
  if (hyper.views.json.editor.STATE.curLine < hyper.views.json.editor.STATE.lastLine) {
    let line_num = ++hyper.views.json.editor.STATE.curLine;
    
    let line_elem = hyper.views.json.editor.setSelectedLine({ line_num });
    return hyper.views.json.editor.setSelectedField({ line_elem });
  }
  else {
    return {field_elem:null};
  }

};


hyper.views.json.editor.goToPrevLine = function (params = {}) {


  let { field_num } = params;
  if (hyper.views.json.editor.STATE.curLine > 1) {
    let line_elem = hyper.views.json.editor.getPrevLine();

    if (!field_num) {

      return hyper.views.json.editor.setSelectedField({ line_elem });
    }
    else {

      let field = hyper.views.json.editor.getLastFieldOfLine({ curLine });
      let field_num = field.getAttribute('data-field_num');
      return hyper.views.json.editor.setSelectedField({ curLine, field_num });

    }
  }
  else {
    return { field_elem: null };
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
  let field_num = parseInt(hyper.views.json.editor.STATE.curField) + 1;
  let pane = hyper.views.json.elems.GET.editor.pane;
  let field = pane.querySelector(`.lineW[data-line_num="${line_num}"] .field[data-field_num="${field_num}"]`);  
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

//blur focused item
hyper.views.json.editor.blurFocusedField = function() {
  document.activeElement.blur();
};

hyper.views.json.editor.scrollWithArrows = function(params={}) {
  let {key, event} = params;
  if (key == "ArrowDown") {
    event.preventDefault();
    let { field_elem } = hyper.views.json.editor.goToNextLine();
    if (field_elem) {
      hyper.views.json.editor.setSelectedBlock(field_elem);
    }
  }
  else if (key == "ArrowUp") {
    event.preventDefault();
    let { field_elem } = hyper.views.json.editor.goToPrevLine();
    if (field_elem) {
      hyper.views.json.editor.setSelectedBlock(field_elem);
    }


  }
  else if (key == "ArrowRight") {
    event.preventDefault();
    let field_num = hyper.views.json.editor.getNextFieldNum();
    if (field_num) {

      let { field_elem } = hyper.views.json.editor.setSelectedField({ field_num });
      hyper.views.json.editor.setSelectedBlock(field_elem);
    }
    else {
      let { field_elem } = hyper.views.json.editor.goToNextLine();
      if (field_elem) {
        hyper.views.json.editor.setSelectedBlock(field_elem);
      }
    }
  }
  else if (key == "ArrowLeft") {
    event.preventDefault();

    let field_num = hyper.views.json.editor.getPrevFieldNum();
    let { field_elem } = hyper.views.json.editor.setSelectedField({ field_num });
    if (field_elem) {
      hyper.views.json.editor.setSelectedBlock(field_elem);
    }
  }
  else if (key == "Escape") {
    console.log('escape');
    // hyper.views.json.editor.reset();
  }
};

hyper.views.json.editor.initLinePointer = function (editor) {
  window.addEventListener('keydown', function (event) {
    let key = event.key;
    let focused = document.activeElement;
    if (focused.id != "jsonTextArea") {
      hyper.views.json.editor.blurFocusedField();
      hyper.views.json.editor.scrollWithArrows({key, event});
    }
    else {
      //do nothing in json editor
    }
    // let field_num = hyper.views.json.editor.STATE.curField;
    // let line_num = hyper.views.json.editor.STATE.curLine;
    
    // hyper.views.json.editor.setSelectedTableColumn({ field_num, line_num });
    // hyper.views.json.editor.setSelectedTableCell({ field_num: hyper.views.json.editor.STATE.curField, line_num: hyper.views.json.editor.STATE.curLine });
  });
};

hyper.views.json.editor.clearContent = function() {
  let pane = hyper.views.json.elems.GET.editor.pane;
  pane.innerHTML = '';
};

hyper.views.json.editor.resetState = function() {
  hyper.views.json.editor.STATE.curLine = 1;
  hyper.views.json.editor.STATE.curField = 0;
  hyper.views.json.editor.STATE.curBlock = 1;
  hyper.views.json.editor.STATE.line_blocks = [];
};

//clears content in the editor
//resets the editor block index
hyper.views.json.editor.reset = function() {
  console.error('hyper.views.json.editor.reset');
  hyper.views.json.editor.clearContent();
  hyper.views.json.editor.resetState();
  // hyper.views.json.editor.setLastLine(hyper.views.json.object.STATE.line_blocks.length);
  // console.error('this is wrong, line_blocks is not updating, need to set last line');
  // console.log(hyper.views.json.object.STATE.line_blocks);
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
  hyper.views.json.editor.setSelectedLine({ line_num:1 });
  hyper.views.json.editor.initLinePointer();
  hyper.views.json.editor.addFieldListeners();
};