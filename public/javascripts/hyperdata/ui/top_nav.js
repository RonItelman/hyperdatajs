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

hyper.ui.top_nav.setCurrentView = function(selector) {
  console.log('selector', selector);
  let view = document.querySelector(`${selector}`);
  view.setAttribute('data-state', 'selected');
};

hyper.ui.top_nav.hideCurrentView = function(){
  let current = document.querySelector('.viewW[data-state="selected"]');
  current.setAttribute('data-state', 'hidden');
};

hyper.ui.top_nav.addListener = function(opt) {
  opt.addEventListener('click', function() {
    hyper.ui.top_nav.clearSelector();
    hyper.ui.top_nav.setSelected(opt);
    hyper.ui.top_nav.hideCurrentView();
    let view = opt.getAttribute('data-view');
    hyper.ui.top_nav.setCurrentView(view);
    let nav = document.querySelector('#tableFunctionsW');
    if(view == "#tableView") {
      gsap.set(nav, {width:"100%"});
    }
    else if (view == "#jsonView") {
      gsap.set(nav, {width:"100vw - 720px"});

    }
    
  });
};