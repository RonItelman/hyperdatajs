hyper.views.json.elems.GET = {
  editor:{
    pane:null
  },
  input: {
    header:null
  },
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

hyper.views.json.elems.getStringWrapper = function(block) {
  // let string_wrapper = document.createElement('div');
  // string_wrapper.classList.add('elem_wrapper');
  // let string = document.createElement('div');
  // string.classList.add('string');
  // let string_label = document.createElement('div');
  // string_label.classList.add('elem_label');
  // string_label.textContent = "String:";
  // string_wrapper.appendChild(string_label);
  // string_wrapper.appendChild(string);  
  // return string_wrapper;
};

hyper.views.json.elems.getDetailRow = function(params ={}) {
  let {text, type} = params;
  let wrapper = document.createElement('div');
  wrapper.classList.add('elem_wrapper');
  let label = document.createElement('div');
  label.classList.add('elem_label');
  label.textContent = text;
  let value = document.createElement('div');
  value.classList.add('elem_value');
  value.setAttribute('data-type', type);
  wrapper.appendChild(label);
  wrapper.appendChild(value);
  return wrapper;
};

hyper.views.json.elems.getLineWrapper = function(block) {
  let wrapper = hyper.views.json.elems.getDetailRow("Line: ");
  return wrapper;
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
  let indent = document.createElement('div');
  indent.classList.add('indent');  
  details.appendChild(hyper.views.json.elems.getDetailRow({text:"Id: ", type:"id"}));
  details.appendChild(hyper.views.json.elems.getDetailRow({text:"String: ", type:"string"}));
  details.appendChild(hyper.views.json.elems.getDetailRow({text:"Line: ", type:"line"}));
  details.appendChild(hyper.views.json.elems.getDetailRow({text:"Direction: ", type:"direction"}));
  details.appendChild(hyper.views.json.elems.getDetailRow({text:"Indent: ", type:"indent"}));
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
  hyper.views.json.elems.GET.rightMenu.buttons.all = document.querySelectorAll('#jsonView .rightPaneMenuC .menu .button');
  hyper.views.json.elems.GET.rightMenu.buttons.wrapper = document.querySelector('#jsonView .rightPaneMenuC .menu');
  hyper.views.json.elems.GET.editor.wrapper = document.querySelector('#jsonView .jsonEditor');
  hyper.views.json.elems.GET.inspector.wrapper = document.querySelector("#jsonView .inspectorW .inspector");
  hyper.views.json.elems.GET.input.header = document.querySelector('#jsonInput .header');
  hyper.views.json.elems.GET.editor.pane = document.querySelector('#jsonView .jsonEditor .paneW .pane');
};
