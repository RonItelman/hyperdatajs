hyper.views.json.observable.inputFocus = function(params={}) {
  let {input_elem} = params;
  if (input_elem.value) {
    let valid = hyper.views.json.input.checkIfValidJson({ input_elem });
    hyper.views.json.input.setInputColors({ valid, input_elem });
  }
};

hyper.views.json.observable.inputBlur = function(params={}) {
  let {input_elem} = params;
  let valid = hyper.views.json.input.checkIfValidJson({ input_elem });
  if (valid) {
    hyper.views.json.input.resetInputColors({ input_elem });
  }
  else {
    hyper.views.json.input.setInputColors({ valid, input_elem });
  }
};

hyper.views.json.observable.inputKeyUp = function (params = {}) {
  let { input_elem, meta_elem } = params;
  let valid = hyper.views.json.input.checkIfValidJson({ input_elem });
  if (valid) {
    hyper.views.json.input.update({ input_elem, meta_elem });
  }
  else {
    hyper.views.json.input.error();
  }
  hyper.views.json.input.setInputColors({ input_elem, valid });

  // if (meta_val != "") {


  // }
  // else {
  //   console.log('no input');
  //   hyper.views.json.input.resetInputColors({ input_elem });
  // }
};

// hyper.views.json.observable.inputUpdate = function(params={}) {

// };

hyper.views.json.observable.input = function(params={}) {
  let {array} = params;  
  hyper.views.json.editor.reset();
  hyper.views.json.object.generate(array);
  hyper.views.json.inspector.init();
  hyper.views.json.input.clearError();
  hyper.views.json.editor.init();
  // let array = hyper.views.json.array.convertInput({ meta:meta_elem, log: false });
  // hyper.views.json.array.setMeta(array);
  // hyper.views.json.input.update();
};