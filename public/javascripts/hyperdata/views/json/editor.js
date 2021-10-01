hyper.views.json.editor.update = function(blocks) {
  blocks.forEach(block => {
    console.log(block);
  });
};

hyper.views.json.editor.init = function() {
  let blocks = hyper.views.json.object.STATE.blocks;
  hyper.views.json.editor.update(blocks);
};