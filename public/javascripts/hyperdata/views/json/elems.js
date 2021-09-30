hyper.views.json.elems.GET = {
  editor:{},
  inspector:{},
  rightMenu:{
    buttons: {

    }
  }
};

//queries the HTML elements and stores pointer to element by path
hyper.views.json.elems.init = function() {
  hyper.views.json.elems.initArray();   
};

hyper.views.json.elems.getBlockW = function() {
  let blockW = document.createElement('div');
  blockW.classList.add('blockW');
  let block = document.createElement('div');
  block.classList.add('block');
  let details = document.createElement('div');
  details.classList.add('details');
  let header = document.createElement('div');
  header.classList.add('header');
  let line = document.createElement('div');
  line.classList.add('line');
  let type = document.createElement('div');
  type.classList.add('type');
  let direction = document.createElement('div');
  direction.classList.add('direction');
  let id = document.createElement('div');
  id.classList.add('id');
  let string = document.createElement('div');
  string.classList.add('string');
  let indent = document.createElement('div');
  indent.classList.add('indent');
  details.appendChild(line);
  details.appendChild(type);
  details.appendChild(direction);
  details.appendChild(id);
  details.appendChild(string);
  details.appendChild(indent);
  block.appendChild(header);
  block.appendChild(details);
  blockW.appendChild(block);
  return blockW;
};

hyper.views.json.elems.initArray = function() {
  hyper.views.json.elems.GET.first_line = document.querySelector("#jsonView .jsonEditor .line .field");
  hyper.views.json.elems.GET.meta_array = document.querySelector(`#jsonView #jsonMetaArray`);
  hyper.views.json.elems.GET.meta_input = document.querySelector('#jsonView #jsonMetaInput');
  hyper.views.json.elems.GET.textarea = document.querySelector(`#jsonView #jsonInput textarea`);
  hyper.views.json.elems.GET.rightMenu.buttons.all = document.querySelectorAll('#jsonView #rightPaneMenuC .menu .button');
  hyper.views.json.elems.GET.rightMenu.buttons.wrapper = document.querySelector('#jsonView #rightPaneMenuC .menu');
  hyper.views.json.elems.GET.editor.wrapper = document.querySelector('#jsonView .jsonEditor');
  hyper.views.json.elems.GET.inspector.wrapper = document.querySelector("#jsonView .inspectorW .inspector");
};
