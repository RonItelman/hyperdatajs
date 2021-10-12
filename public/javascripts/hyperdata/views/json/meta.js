hyper.views.json.meta = {
  ARRAY:null
};

hyper.views.json.meta.setArray = function(params = {}) {
  let {array} = params;
  console.log(array);
  hyper.views.json.meta.ARRAY = array;
};

