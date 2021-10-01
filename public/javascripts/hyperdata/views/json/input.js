hyper.views.json.input.update = function () {
  hyper.views.json.editor.reset();
  hyper.views.json.object.generate();
  hyper.views.json.inspector.init();
  hyper.views.json.input.clearError();
  hyper.views.json.editor.init();
};

hyper.views.json.input.init = function() {
  let {input, meta} = hyper.views.json.input.getElems();
  hyper.views.json.input.updateMetaVal({meta, input});  
  hyper.views.json.addListeners({meta, input});
  hyper.views.json.array.convertJSON({meta});
  hyper.views.json.input.update();
};

hyper.views.json.addListeners = function(params = {}) {
  let {meta, input} = params;
  hyper.views.json.input.addFocusListener({ input, meta });
  hyper.views.json.input.addBlurListener({ input, meta });
  hyper.views.json.input.addKeyListener({ input, meta });
};

hyper.views.json.input.getElems = function() {
  let meta = hyper.views.json.elems.GET.meta_input;
  let input = hyper.views.json.elems.GET.textarea;
  return {meta, input};
};

hyper.views.json.input.updateMetaVal = function(params = {}) {
  let {meta, input} = params;
  if (input.value != undefined) {
    meta.value = input.value;
  }
  else {
    meta.value = "";
  }
  return meta.value;
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
};

hyper.views.json.input.addFocusListener = function(params = {}) {
  let {input, meta} = params;
  input.addEventListener('focus', function () {
    if (meta.value != undefined && meta.value != null && meta.value != "") {

      let valid = hyper.views.json.input.checkIfValidJson({input, meta});
      hyper.views.json.input.setInputColors({valid, input});
    }
    
    
  });
  
};

hyper.views.json.input.resetInputColors = function(params = {}) {
  let {input} = params;
  gsap.to(input, { backgroundColor: "rgb(255,255,255)", borderColor: "#ccc", duration: 0.3 });
};

hyper.views.json.input.addBlurListener = function(params = {}) {
  let {input, meta} = params;
  input.addEventListener('blur', function () {
    let valid = hyper.views.json.input.checkIfValidJson({input, meta});
    if (valid) {

      hyper.views.json.input.resetInputColors({input});
    }
    else {

      hyper.views.json.input.setInputColors({valid, input});
    }

  });

};



hyper.views.json.input.addKeyListener = function(params={}) {
  let {input, meta} = params;
  
  input.addEventListener('keyup', function () {
    let meta_val = hyper.views.json.input.updateMetaVal({meta, input});
    if (meta_val != "") {
      
      let valid = hyper.views.json.input.checkIfValidJson({input, val:meta.val});
      if(valid) {
        hyper.views.json.array.convertJSON({meta});
        hyper.views.json.input.update();
      }
      else {
        hyper.views.json.input.error();
      }
      hyper.views.json.input.setInputColors({input, valid});
      
    }    
    else {
      console.log('no input');
      hyper.views.json.input.resetInputColors({input});
    }
  });

};


hyper.views.json.input.setInputColors = function(params={}) {
  let {valid, input} = params;
  if (valid) {
    gsap.to(input, { backgroundColor: "rgb(196, 255, 215)", borderColor: "green", duration: 0.3 });
  }
  else {
    gsap.to(input, { backgroundColor: "rgb(255, 215, 215)", borderColor: "red", duration: 0.3 });
  }
};

hyper.views.json.input.checkIfValidJson = function(params={}) {
  let {input, meta} = params;
  try {
    if (input.value) {
      let obj = JSON.parse(input.value);    
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

