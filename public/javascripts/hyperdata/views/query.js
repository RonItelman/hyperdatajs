hyper.views.query.addInputListener = function() {
  let input = document.querySelector('#queryInputW input');
  
  let social = document.querySelector('#labelsW .labelW[data-schema_id="135"]');
  
  let fire = document.querySelector('#labelsW .labelW[data-schema_id="159"]');
  
  input.addEventListener('keyup', function(event) {
    let val = input.value;
    val.toLowerCase();
    
    if (val == "pla" || val == "plan" || val == "plane" || val == "planet" || val == "cli" || val == "clim" || val == "clima" || val == "climat" || val == "climate" || val == "arm" || val == "arma" || val == "armag" || val == "armage" || val == "armaged" || val == "armagedd" || val == "armageddo" || val == "armageddon") {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="135"]');;
      // console.log('show planet', elem);
      gsap.set(elem, {display:"flex"});
      gsap.to(elem, {opacity:1, duration:0.1});
    }
    else {
      
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="135"]');
      // console.log('show planet', elem);
    
      gsap.set(elem, {display:"none", delay:0.1});
      gsap.to(elem, {opacity:0, duration:0.1});
    }
    
    if (val == "soc" || val == "soci" || val == "socia" || val == "social" || val == "consp") {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="147"]');;
      // console.log('show planet', elem);
      gsap.set(elem, { display: "flex" });
      gsap.to(elem, { opacity: 1, duration: 0.1 });
    }
    else {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="147"]');
      // console.log('show planet', elem);

      gsap.set(elem, { display: "none", delay: 0.1 });
      gsap.to(elem, { opacity: 0, duration: 0.1 });
      
    }
    if (val == "fire" || val == "com" || val == "spo") {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="159"]');
      // console.log('show planet', elem);

      gsap.set(elem, { display: "flex" });
      gsap.to(elem, { opacity: 1, duration: 0.1 });
    }
    else {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="159"]');
      // console.log('show planet', elem);

      gsap.set(elem, { display: "none", delay: 0.1 });
      gsap.to(elem, { opacity: 0, duration: 0.1 });

    }
    if (val == "hea" || val == "heart" || val == "obesity" || val == "heart attack risk") {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="215"]');
      // console.log('show planet', elem);

      gsap.set(elem, { display: "flex" });
      gsap.to(elem, { opacity: 1, duration: 0.1 });
    }
    else {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="215"]');
      // console.log('show planet', elem);

      gsap.set(elem, { display: "none", delay: 0.1 });
      gsap.to(elem, { opacity: 0, duration: 0.1 });

    }
    if (val == "exe" || val == "exer" || val == "exerc" || val == "exerci" || val == "exercis" || val == "exercise") {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="251"]');
      // console.log('show planet', elem);

      gsap.set(elem, { display: "flex" });
      gsap.to(elem, { opacity: 1, duration: 0.1 });
    }
    else {
      let elem = document.querySelector('#labelsW .labelW[data-schema_id="251"]');
      // console.log('show planet', elem);

      gsap.set(elem, { display: "none", delay: 0.1 });
      gsap.to(elem, { opacity: 0, duration: 0.1 });

    }
    
  });
};

hyper.views.query.init = function() {
  hyper.views.query.addInputListener();
  let table = document.querySelector("#tableW");
  // let ts = document.querySelectorAll('#labelsW .tooltip');
  // ts.forEach(function(t) {
  //   t.addEventListener('mouseover', function() {
  //     gsap.to(table, {y:"=200", duration:0.25});
  //   });
  //   t.addEventListener('mouseout', function() {
  //     gsap.to(table, {y:"-=200", duration:0.25});
  //   });
  // });
};
