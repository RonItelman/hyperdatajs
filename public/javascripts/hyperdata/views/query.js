hyper.views.query.addInputListener = function() {
  let input = document.querySelector('#queryInputW input');
  
  let social = document.querySelector('#labelsW .labelW[data-schema_id="135"]');
  
  let fire = document.querySelector('#labelsW .labelW[data-schema_id="159"]');
  
  input.addEventListener('keyup', function(event) {
    let val = input.value;
    val.toLowerCase();
    console.log(val);
    if (val == "pla" || val == "plan" || val == "plane" || val == "planet" || val == "cli" || val == "clim" || val == "clima" || val == "climat" || val == "climate") {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="135"]');;
      console.log('show planet', elem);
      gsap.set(elem, {display:"flex"});
      gsap.to(elem, {opacity:1, duration:0.1});
    }
    else {
      
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="135"]');
      console.log('show planet', elem);
    
      gsap.set(elem, {display:"none", delay:0.1});
      gsap.to(elem, {opacity:0, duration:0.1});
    }
    if (val == "soc" || val == "soci" || val == "socia" || val == "social" || val == "consp") {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="147"]');;
      console.log('show planet', elem);
      gsap.set(elem, { display: "flex" });
      gsap.to(elem, { opacity: 1, duration: 0.1 });
    }
    else {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="147"]');
      console.log('show planet', elem);

      gsap.set(elem, { display: "none", delay: 0.1 });
      gsap.to(elem, { opacity: 0, duration: 0.1 });
      
    }
    if (val == "fire" || val == "com" || val == "spo") {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="159"]');
      console.log('show planet', elem);

      gsap.set(elem, { display: "flex" });
      gsap.to(elem, { opacity: 1, duration: 0.1 });
    }
    else {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="159"]');
      console.log('show planet', elem);

      gsap.set(elem, { display: "none", delay: 0.1 });
      gsap.to(elem, { opacity: 0, duration: 0.1 });

    }
    
  });
};

hyper.views.query.init = function() {
  hyper.views.query.addInputListener();
};