hyper.views.json.editor.STATE = {
  inFocus: true,
  curLine: 1,
  lastLine: 24,
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


hyper.views.json.editor.setSelectedField = function (params) {
  let { line_elem, field_num, line_num } = params;
  console.log(line_elem);
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
    if (hyper.views.json.editor.STATES.curLine > 1) {
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
  console.log('hyper.views.json.editor.goToNextLine');
  console.log(hyper.views.json.editor.STATE.curLine);
  if (hyper.views.json.editor.STATE.curLine < hyper.views.json.editor.STATE.lastLine) {
    let line_num = ++hyper.views.json.editor.STATE.curLine;
    let line_elem = hyper.views.json.editor.setSelectedLine({ line_num });
    hyper.views.json.editor.setSelectedField({ line_elem });
  }

};

hyper.views.json.editor.initLinePointer = function (editor) {
  window.addEventListener('keydown', function (event) {
    let key = event.key;

    if (key == "ArrowDown") {      
      hyper.views.json.editor.goToNextLine();
    }
    else if (key == "ArrowUp") {
      // hyper.views.json.editor.goToPrevLine();
      console.log('up');
      
    }
    else if (key == "ArrowRight") {
      console.log('right');
      
      
      // let field_num = hyper.views.json.editor.getNextFieldNum();
      // if (field_num) {
        
        //   hyper.views.json.editor.setSelectedField({ field_num });
        // }
        // else {
          //   hyper.views.json.editor.goToNextLine();
          // }
        }
        else if (key == "ArrowLeft") {
      console.log('left');
      // let field_num = hyper.views.json.editor.getPrevFieldNum();
      // hyper.views.json.editor.setSelectedField({ field_num });
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

hyper.views.json.editor.getField = function(params={}) {
  let {block} = params;
  let elem = document.createElement('div');
  elem.classList.add('field');
  elem.setAttribute('contenteditable', 'true');
  elem.setAttribute('data-type', block.type);
  elem.setAttribute('data-focused', 'false');
  elem.setAttribute('data-field_num', block.field_num);
  
  elem.setAttribute('data-id', block.id);
  elem.setAttribute('data-match', block.match);
  
  if (!block.string) {
    block.string = "null";
  }
  hyper.views.json.editor.addParenthesis({elem, block});
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