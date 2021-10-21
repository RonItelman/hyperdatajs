hyper.ui.top_nav.init = function() {
  let menu = document.querySelector('#tableFunctionsC');
  let opts = menu.querySelectorAll('.tableFunction');
  opts.forEach(function(opt) {
    hyper.ui.top_nav.addListener(opt);
  });
};

hyper.ui.top_nav.clearSelector = function() {
  let selected = document.querySelector('#tableFunctionsC .tableFunction[data-state="active"]');
  selected.setAttribute('data-state', 'enabled');
};

hyper.ui.top_nav.setSelected = function(opt) {
  opt.setAttribute('data-state', 'active');
};

hyper.ui.top_nav.addListener = function(opt) {
  opt.addEventListener('click', function() {
    hyper.ui.top_nav.clearSelector();
    hyper.ui.top_nav.setSelected(opt);
  });
};