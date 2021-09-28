hyper.json_input.init = function() {
  let {input, meta} = hyper.json_input.getElems();
  hyper.json_input.updateMetaVal({meta, input});  
  hyper.json_input.addFocusListener({ input, meta});
  hyper.json_input.addBlurListener({ input, meta });
  hyper.json_input.addKeyListener({ input, meta });
  hyper.json_input.convertJSONToArray({meta});
};

hyper.json_input.getElems = function() {
  let meta = document.querySelector('#jsonMetaInput');
  let input = document.querySelector(`#jsonInput textarea`);
  return {meta, input};
};

hyper.json_input.updateMetaVal = function(params = {}) {
  let {meta, input} = params;
  if (input.value != undefined) {
    meta.value = input.value;
  }
  else {
    meta.value = "";
  }
  return meta.value;
};





hyper.json_input.convertJSONToArray = function(params = {}) {
  let {meta} = params;
  let json = meta.value;
  jsonObj = JSON.parse(json);
  const parseJSONToArray = obj => {
    var res = [];
    if (Array.isArray(obj)) {
      res.push('[');
      for (entry of obj) {
        var parsed = parseJSONToArray(entry);
        //while (Array.isArray(parsed)) parsed = parseJSONToArray(entry);
        res.push(parsed, ',');
      }
      res.splice(-1);
      res = [...res, ']', ','];
    }
    else if (obj && typeof obj === 'object') {
      obj = Object.entries(obj);
      res.push("{");
      for (entry of obj) {
        res = [...res, entry[0], ":", ...parseJSONToArray(entry[1]), ','];
      }
      res.splice(-1);
      res.push("}");
    } else {
      res = typeof obj === 'string' ? [obj] : obj;
    }
    return Array.isArray(res) ? res.flat() : res;
  };
  let arr = parseJSONToArray(jsonObj);
  let editor = document.querySelector("#jsonEditor .line .field");
  
  editor.textContent = JSON.stringify(arr, null, 4);
  

};

hyper.json_input.error = function() {
  let editor = document.querySelector("#jsonEditor .line .field");
  editor.textContent = `//ERROR IN JSON`;
};

hyper.json_input.addFocusListener = function(params = {}) {
  let {input, meta} = params;
  input.addEventListener('focus', function () {
    if (meta.value != undefined && meta.value != null && meta.value != "") {

      let valid = hyper.json_input.checkIfValidJson({input, meta});
      hyper.json_input.setInputColors({valid, input});
    }
    
    
  });
  
};

hyper.json_input.resetInputColors = function(params = {}) {
  let {input} = params;
  gsap.to(input, { backgroundColor: "rgb(255,255,255)", borderColor: "#ccc", duration: 0.3 });
};

hyper.json_input.addBlurListener = function(params = {}) {
  let {input, meta} = params;
  input.addEventListener('blur', function () {
    let valid = hyper.json_input.checkIfValidJson({input, meta});
    if (valid) {

      hyper.json_input.resetInputColors({input});
    }
    else {

      hyper.json_input.setInputColors({valid, input});
    }

  });

};

hyper.json_input.addKeyListener = function(params={}) {
  let {input, meta} = params;
  
  input.addEventListener('keyup', function () {
    let meta_val = hyper.json_input.updateMetaVal({meta, input});
    if (meta_val != "") {
      
      let valid = hyper.json_input.checkIfValidJson({input, val:meta.val});
      if(valid) {
        hyper.json_input.convertJSONToArray({meta});
      }
      else {
        hyper.json_input.error();
      }
      hyper.json_input.setInputColors({input, valid});
      
    }    
    else {
      console.log('no input');
      hyper.json_input.resetInputColors({input});
    }
  });

};


hyper.json_input.setInputColors = function(params={}) {
  let {valid, input} = params;
  if (valid) {
    gsap.to(input, { backgroundColor: "rgb(196, 255, 215)", borderColor: "green", duration: 0.3 });
  }
  else {
    gsap.to(input, { backgroundColor: "rgb(255, 215, 215)", borderColor: "red", duration: 0.3 });
  }
};

hyper.json_input.checkIfValidJson = function(params={}) {
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

