hyper.views.json.inspector.clearSelectedBlock = function() {
  let pane = hyper.views.json.elems.GET.editor.inspector;
  let block = pane.querySelector(`.blockW[data-focused="true"]`);
  if(block) {    
    block.setAttribute('data-focused', 'false');    
  }

};

hyper.views.json.inspector.scrollToBlock = function(id) {    
  let target = `.jsonInspector .inspectorW .blockW[data-id="${id}"]`;
  let wrapper = '#jsonView #jsonContentW';
  let test = document.querySelector(target);
  
  if (test) {
    gsap.to(wrapper, { duration: 0.3, scrollTo: {y:target, offsetY:30}});
    // gsap.to(target, { duration: 0.3, scrollTo: wrapper});
  }

};

hyper.views.json.inspector.setSelectedBlock = function(id) {
  let pane = hyper.views.json.elems.GET.editor.inspector;  
  hyper.views.json.inspector.clearSelectedBlock();    
  let block = pane.querySelector(`.blockW[data-id="${id}"]`);  
  block.setAttribute('data-focused', 'true');  
  hyper.views.json.inspector.scrollToBlock(id);
};

hyper.views.json.inspector.reset = function() {
  let wrapper = hyper.views.json.elems.GET.inspector.wrapper;
  wrapper.innerHTML = '';
};

hyper.views.json.inspector.init = function() {  
  let wrapper = hyper.views.json.elems.GET.inspector.wrapper;
  wrapper.innerHTML = '';
  let blocks = hyper.views.json.object.STATE.blocks;
  blocks.forEach(function (block) {    
    let elem = hyper.views.json.elems.getBlockW();
    elem.setAttribute('data-id', block.id);
    elem.setAttribute('data-focused', 'false');
    hyper.views.json.inspector.configureBlock({elem, block});        
    wrapper.appendChild(elem);
  });
  hyper.views.json.inspector.setBlockListeners(wrapper);
  hyper.views.json.inspector.setSelectedBlock(1);
};



hyper.views.json.inspector.addBlockListener = function(block) {
  let id = block.getAttribute('data-id');
  let selector = `#jsonView .jsonEditor .field[data-id="${id}"]`;
  let target = document.querySelector(selector);
  target.click();  
};

hyper.views.json.inspector.setBlockListeners = function(wrapper) {
  let blocks = wrapper.querySelectorAll('.blockW');
  blocks.forEach(function (block) {
    block.addEventListener('click', function () {
      hyper.views.json.inspector.addBlockListener(block);
    });
  });
};

hyper.views.json.inspector.configureBlock = function(params={}) {
  let { elem, block } = params;
  let header = elem.querySelector('.header');
  header.textContent = `Block ${block.id}`;
  let string = elem.querySelector('.elem_value[data-type="string"]');
  string.textContent = block.string;
  let id = elem.querySelector('.elem_value[data-type="id"]');
  id.textContent = block.id;
  let line = elem.querySelector('.elem_value[data-type="line"]');
  line.textContent = block.line;
  let direction = elem.querySelector('.elem_value[data-type="direction"]');
  direction.textContent = block.direction;
  if (block.direction == null) {
    gsap.set(direction.closest(".elem_wrapper"), {display:"none"});
  }
  let indent = elem.querySelector('.elem_value[data-type="indent"]');
  indent.textContent = block.indent;
  let open_match = elem.querySelector('.elem_value[data-type="open_match"]');
  open_match.textContent = block.open_match;
  if (block.open_match == null) {
    gsap.set(open_match.closest(".elem_wrapper"), {display:"none"});
  }
  let close_match = elem.querySelector('.elem_value[data-type="close_match"]');
  close_match.textContent = block.close_match;
  if (block.close_match == null) {
    gsap.set(close_match.closest(".elem_wrapper"), {display:"none"});
    
  }
  let match_line = elem.querySelector('.elem_value[data-type="match_line"]');
  match_line.textContent = block.match_line;
  if (block.match_line == null) {
    gsap.set(match_line.closest(".elem_wrapper"), {display:"none"});
    
  }
  // let url = elem.querySelector('.elem_value[data-type="url"]');
  
  // if (block.url == null && url) {
  //   gsap.set(url.closest(".elem_wrapper"), {display:"none"});
    
  // }
  // else if (url) {
  //   url.textContent = block.url;
  // }
};