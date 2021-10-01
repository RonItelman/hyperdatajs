hyper.views.json.inspector.init = function() {
  let wrapper = hyper.views.json.elems.GET.inspector.wrapper;
  wrapper.innerHTML = '';
  let blocks = hyper.views.json.object.STATE.blocks;
  blocks.forEach(function (block) {    
    let elem = hyper.views.json.elems.getBlockW();
    hyper.views.json.inspector.configureBlock({elem, block});    
    wrapper.appendChild(elem);
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
};