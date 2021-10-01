hyper.views.json.editor.STATE = {
  curLine:0
};

hyper.views.json.editor.reset = function() {
  let pane = hyper.views.json.elems.GET.editor.pane;
  pane.innerHTML = '';
  hyper.views.json.editor.STATE.curLine = 0;
};

hyper.views.json.editor.update = function(blocks) {
  blocks.forEach(block => {
    // console.log(block);
    let pane = hyper.views.json.elems.GET.editor.pane;
    let elem = hyper.views.json.editor.getBlockElem(block);
    pane.appendChild(elem);
  });
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
  let field = hyper.views.json.editor.getField(block);
  lineW.appendChild(field);
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

hyper.views.json.editor.getField = function(block) {
  let elem = document.createElement('div');
  elem.classList.add('field');
  elem.setAttribute('contenteditable', 'true');
  elem.setAttribute('data-type', block.type);
  elem.setAttribute('data-focused', false);
  elem.setAttribute('data-field_num', block.id);
  elem.setAttribute('data-match', block.match);
  
  if (!block.string) {
    block.string = "null";
  }
  elem.textContent = block.string;
  return elem;
};

hyper.views.json.editor.addLineToPane = function(params = {}) {
  let {block} = params;
  let lineW = hyper.views.json.editor.getLineW({ curLine: hyper.views.json.editor.STATE.curLine, block });
  hyper.views.json.elems.GET.editor.pane.appendChild(lineW);
};

hyper.views.json.editor.getBlockElem = function(block) {
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
      let field = hyper.views.json.editor.getField(block);
      curLine.appendChild(field);
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
};