hyper.views.json.array.init = function() {
  
  
};

hyper.views.json.array.setMeta = function(array) {
  let elem = hyper.views.json.elems.GET.meta_array;
  elem.value = JSON.stringify(array, null, 4);  
};

hyper.views.json.array.getMeta = function() {
  let elem = hyper.views.json.elems.GET.meta_array;
  return elem.value;
};



hyper.views.json.array.convertJSON = function (params = {}) {
  let { meta } = params;
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
  hyper.views.json.array.setMeta(arr);
  

};