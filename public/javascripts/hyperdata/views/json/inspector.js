hyper.views.json.inspector.init = function() {
  let wrapper = hyper.views.json.elems.GET.inspector.wrapper;
  let blocks = hyper.views.json.object.STATE.blocks;
  blocks.forEach(function (block) {
    console.log(block);
    let elem = hyper.views.json.elems.getBlockW();
    hyper.views.json.inspector.configureBlock({elem, block});    
    wrapper.appendChild(elem);
  });
};
hyper.views.json.inspector.configureBlock = function(params={}) {
  let { elem, block } = params;
  let header = elem.querySelector('.header');
  header.textContent = `Block ${block.id}`;
};