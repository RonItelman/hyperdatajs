hyper.json_input.init = function() {
  let meta = document.querySelector('#jsonMetaInput');
  let input = document.querySelector(`#jsonInput textarea`);
  input.addEventListener('focus', function() {
    let valid = hyper.json_input.checkIfValidJson({input, val:meta.value});
    if (valid) {
      gsap.to(input, { backgroundColor: "rgb(196, 255, 215)", borderColor: "green", duration: 0.3 });
    }
  });
  input.addEventListener('keyup', function() {    
    meta.value = input.value;    
    if (meta.value) {
      console.log(meta.value);
      try {
        let obj = JSON.parse(meta.value);
        gsap.to(input, { backgroundColor:"rgb(196, 255, 215)", borderColor:"green", duration:0.3});
      }
      catch(err) {
        gsap.to(input, { backgroundColor:"rgb(255, 215, 215)", borderColor:"red", duration:0.3});
      }        
    }
    else {
      gsap.to(input, { backgroundColor: "rgb(255, 255,255)", borderColor: "#ccc", duration: 0.3 });
    }
  });
  input.addEventListener('blur', function() {
    let valid = hyper.json_input.checkIfValidJson({ input, val: meta.value });
    if (valid || !meta.value) {
      gsap.to(input, { backgroundColor:"rgb(255, 255,255)", borderColor:"#ccc", duration:0.3});
    }    
  });
};

hyper.json_input.checkIfValidJson = function(params={}) {
  let {input, val} = params;
  try {
    let obj = JSON.parse(val);
    gsap.to(input, { backgroundColor: "rgb(196, 255, 215)", borderColor: "green", duration: 0.3 });
    return true;
  }
  catch (err) {
    console.log('invalue');
    gsap.to(input, { backgroundColor: "rgb(255, 215, 215)", borderColor: "red", duration: 0.3 });
    return false;
  }
};

