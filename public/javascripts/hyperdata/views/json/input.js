hyper.views.json.input.setInputColors = function (params = {}) {
  let { valid, input_elem } = params;
  if (valid) {
    gsap.to(input_elem, { backgroundColor: "rgb(196, 255, 215)", borderColor: "green", duration: 0.3 });
  }
  else {
    gsap.to(input_elem, { backgroundColor: "rgb(255, 215, 215)", borderColor: "red", duration: 0.3 });
  }
};

hyper.views.json.input.checkIfValidJson = function (params = {}) {
  let { input_elem } = params;
  try {
    if (input_elem.value) {
      let obj = JSON.parse(input_elem.value);
      return true;
    }
    else {
      return true;
    }
  }
  catch (err) {
    return false;
  }
};

hyper.views.json.input.getElems = function () {
  let meta_elem = hyper.views.json.elems.GET.meta_input;
  let input_elem = hyper.views.json.elems.GET.textarea;
  return { meta_elem, input_elem };
};

hyper.views.json.input.clearError = function() {
  
  let editor = hyper.views.json.elems.GET.input.header;
  let err = editor.getAttribute('data-error');
  if (err == "true") {
    editor.textContent = `Convert JSON To JSON-HD`;
    gsap.to(editor, {backgroundColor:"#555", duration:0.3});
    editor.setAttribute('data-error', 'false');
  }
};

hyper.views.json.input.error = function() {
  let editor = hyper.views.json.elems.GET.input.header;
  editor.setAttribute('data-error', 'true');
  gsap.to(editor, {backgroundColor:"rgba(200,50,50,1)", duration:0.3});
  editor.textContent = `ERROR: JSON NOT VALID`;
  hyper.views.json.editor.reset();
  hyper.views.json.inspector.reset();
};

hyper.views.json.input.resetInputColors = function(params = {}) {
  let {input_elem} = params;
  gsap.to(input_elem, { backgroundColor: "rgb(255,255,255)", borderColor: "#ccc", duration: 0.3 });
};

//updates the meta html input element with the input value or empty 
hyper.views.json.input.updateMetaElemVal = function (params = {}) {
  let { meta_elem, input_elem } = params;
  if (input_elem.value != undefined) {
    meta_elem.value = input_elem.value;
  }
  else {
    meta_elem.value = "";
  }
  return meta_elem.value;
};

hyper.views.json.input.addBlurListener = function (params = {}) {
  let { input_elem, meta_elem } = params;
  input_elem.addEventListener('blur', function () {
    hyper.views.json.observable.inputBlur({input_elem});
  });
};

//if input is focused on, validates JSON and sets error message or color changes
hyper.views.json.input.addFocusListener = function (params = {}) {
  let { input_elem } = params;
  input_elem.addEventListener('focus', function () {
    hyper.views.json.observable.inputFocus({input_elem});
  });
};

//adds listeners for focus, blur, and key strokes, in order 
//to validate JSON and run an update observable
hyper.views.json.addListeners = function (params = {}) {
  let { meta_elem, input_elem } = params;
  hyper.views.json.input.addFocusListener({ input_elem });
  hyper.views.json.input.addBlurListener({ input_elem });
  hyper.views.json.input.addKeyListener({ input_elem, meta_elem });
};

hyper.views.json.input.addKeyListener = function (params = {}) {
  let { input_elem, meta_elem } = params;

  input_elem.addEventListener('keyup', function () {
    hyper.views.json.observable.inputKeyUp({ input_elem, meta_elem });
  });

};

//called whenever the input has been updated and validated
hyper.views.json.input.update = function(params={}) {  
  console.log('hyper.views.json.input.update');
  let {input_elem, meta_elem} = params;
  hyper.views.json.input.updateMetaElemVal({ meta_elem, input_elem });  
  hyper.views.json.input.clearError();
  let array = hyper.views.json.array.convertInput({ meta_elem });
  hyper.views.json.object.generate(array);
  hyper.views.json.inspector.init();
  hyper.views.json.editor.init();
};

//adds listeners and runs update on json in textarea
hyper.views.json.input.init = function () {  
  console.log('hyper.views.json.input.init');
  let { input_elem, meta_elem } = hyper.views.json.input.getElems();
  hyper.views.json.addListeners({ meta_elem, input_elem });  
  hyper.views.json.input.update({meta_elem, input_elem});
};

