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
  let indent = elem.querySelector('.elem_value[data-type="indent"]');
  indent.textContent = block.indent;
  let match = elem.querySelector('.elem_value[data-type="match"]');
  match.textContent = block.match;
};