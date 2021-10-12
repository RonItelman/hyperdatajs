hyper.views.json.array.setMeta = function(array) {
  let elem = hyper.views.json.elems.GET.meta_array;
  elem.value = JSON.stringify(array, null, 4);  
  hyper.views.json.meta.setArray({array});
};

hyper.views.json.array.getMeta = function() {
  let elem = hyper.views.json.elems.GET.meta_array;
  return elem.value;
};

hyper.views.json.array.parse = function(obj) {
  
  var res = [];
  if (Array.isArray(obj)) {
    res.push('[');
    for (entry of obj) {
      var parsed = hyper.views.json.array.parse(entry);
      //while (Array.isArray(parsed)) parsed = parseJSONToArray(entry);
      res.push(parsed, ',');
    }
    res.splice(-1);
    res = [...res, ']'];
    
  }
  else if (obj && typeof obj === 'object') {
    obj = Object.entries(obj);
    res.push("{");
    for (entry of obj) {
      res = [...res, entry[0], ":", ...hyper.views.json.array.parse(entry[1]), ','];
    }
    res.splice(-1);
    res.push("}");
  } else {
    res = typeof obj === 'string' ? [obj] : obj;
  }
  return Array.isArray(res) ? res.flat() : res;
};

hyper.views.json.array.convertInput = function (params = {}) {
  let { meta_elem, log } = params;  
  let json = meta_elem.value;
  jsonObj = JSON.parse(json);  
  if (log) {
    console.log(json);
    console.log(JSON.stringify(jsonObj));
  }
  let arr = hyper.views.json.array.parse(jsonObj);  
  return arr;  
};