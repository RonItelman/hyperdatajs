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
  if (valid && input_elem.value) {
    hyper.views.json.input.update({ input_elem, meta_elem });
  }
  else {
    hyper.views.json.input.error();
  }
  hyper.views.json.input.setInputColors({ input_elem, valid });

};

