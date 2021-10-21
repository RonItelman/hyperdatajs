hyper.views.query.addInputListener = function() {
  let input = document.querySelector('#queryInputW input');
  input.addEventListener('keyup', function(event) {
    let val = input.value;
    val.toLowerCase();
    if (val == "pla") {
      console.log('show planetphobia')
    }
    if (val == "soc") {
      console.log('show social')
    }
    if (val == "com") {
      console.log('show comb')
    }
    if (val == "clima") {
      console.log('show planet')
    }
    if (val == "conspi") {
      console.log('show planet')
    }
  });
};

hyper.views.query.init = function() {
  hyper.views.query.addInputListener();
};