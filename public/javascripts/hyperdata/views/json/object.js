hyper.views.json.object.STATE = {
  ids:1,
  lines:1,
  indents:0,
  blocks:[],
  line_blocks:[],
  curLine:1
};


hyper.views.json.object.setLine = function (params = {}) {
  let { obj, elem } = params;
  let line_blocks = hyper.views.json.object.STATE.line_blocks;
  if (elem == "{" || elem == "[" || elem == ",") {
    obj.line = hyper.views.json.object.STATE.lines++;
    curLine = obj.line;
    // console.log(curLine);
    let blocks = line_blocks[obj.line-1];
    if(!blocks) {
      blocks = [];
      blocks.push(obj);
      line_blocks[obj.line - 1] = blocks;
    }
    else {
      blocks.push(obj);

    }
          
    
  }
  else if (elem == "}" || elem == "]") {
    obj.line = ++hyper.views.json.object.STATE.lines;
    // console.log(curLine);
    let blocks = line_blocks[obj.line - 1];
    if (!blocks) {
      blocks = [];
      blocks.push(obj);
      line_blocks[obj.line - 1] = blocks;
    }
    else {
      blocks.push(obj);
  
    }
          
    
    
  }
  else {
    // console.log(obj);
    obj.line = hyper.views.json.object.STATE.lines;
    // console.log(curLine);
    let blocks = line_blocks[obj.line - 1];
    if (!blocks) {
      blocks = [];
      blocks.push(obj);
      line_blocks[obj.line - 1] = blocks;
    }
    else {
      blocks.push(obj);
  
    }
          
    
  }
};

hyper.views.json.object.setMatchingBraces = function (params = {}) {
  let { obj, elem } = params;
  let arr = hyper.views.json.object.STATE.blocks;
  if (elem == "}") {
    target_line = obj.line;
    for (let i = target_line - 1; i > 0; --i) {
      //look at the block at the line
      // console.log(target_line, i);
      //get the block at the search_line


    }
    //find matching { by looping through X that doesn't already have a match set
    //start with current line and subtract by 1 until find a match
    // obj.match = "unknown";
  }
  else if (elem == "]") {
    //find first matching [
    obj.match = "unknown";

  }
};

hyper.views.json.object.create = function() {
  return {
    line:null,
    type:null,
    direction:null,
    id:null,
    string:null,
    indent:null
  };
};

hyper.views.json.object.setDirection = function(params = {}) {
  let { obj, elem } = params;
  if (elem == "{" || elem == "[") {
    obj.direction = "open";
  }
  else if (elem == "}" || elem == "]") { 
    obj.direction = "close";
  }
  else {
    obj.direction = null;
  }

};


hyper.views.json.object.setString = function(params = {}) {
  let { obj, elem } = params;
  obj.string = elem;
};

hyper.views.json.object.setId = function(params = {}) {
  let { obj, elem } = params;
  let id = hyper.views.json.object.STATE.ids++;
  obj.id = id;
};

hyper.views.json.object.setType = function(params = {}) {
  let { obj, elem } = params;
  if (elem == "{" || elem == "}") {
    obj.type = "curly brackets";
  }
  else if (elem == '[' || elem == ']') {
    obj.type = "square brackets";
  }   
  else if (elem == ":") {
      obj.type="colon";   
  }
  else if (elem == ",") {
      obj.type="comma";   
  }
  else if (elem == null) {
      obj.type = "null";   
  }
  else {
    obj.type = "string";
  }
};


hyper.views.json.object.setIndents = function(params = {}) {
  let {obj, elem} = params;
  
  if (elem == "{") {
    obj.indent = hyper.views.json.object.STATE.indents++;
  }
  else if (elem == "[") {
    obj.indent = hyper.views.json.object.STATE.indents++;
  }
  else if (elem == "}") {
    obj.indent = --hyper.views.json.object.STATE.indents;
  }
  else if (elem == "]") {
    obj.indent = --hyper.views.json.object.STATE.indents;
  }
  else {
    obj.indent = hyper.views.json.object.STATE.indents;
  }
};


hyper.views.json.object.configureBlock = function(elem) {
  let obj = hyper.views.json.object.create();  
  hyper.views.json.object.setDirection({obj, elem});
  hyper.views.json.object.setLine({obj, elem});  
  hyper.views.json.object.setString({obj, elem});
  hyper.views.json.object.setId({obj, elem});          
  hyper.views.json.object.setType({obj, elem});          
  hyper.views.json.object.setIndents({obj, elem});
  hyper.views.json.object.setMatchingBraces({obj, elem});
  
  return obj;
};

hyper.views.json.object.resetBlocks = function() {
  hyper.views.json.object.STATE.blocks = [];
  hyper.views.json.object.STATE.ids = 1;
  hyper.views.json.object.STATE.lines = 1;
  hyper.views.json.object.STATE.indents = 0;
};

hyper.views.json.object.generate = function() {
  let array_meta = hyper.views.json.array.getMeta();
  let array = JSON.parse(array_meta);
  hyper.views.json.object.resetBlocks();
  let blocks = hyper.views.json.object.STATE.blocks;
  array.forEach(function (elem) {
    let obj = hyper.views.json.object.configureBlock(elem);
    blocks.push(obj);
  });
  let line_blocks = hyper.views.json.object.STATE.line_blocks;
  line_blocks.forEach(function(lb, index) {
    lb.forEach(function(l) {
      console.log(index, l.string);
    });
  });
  
};

hyper.views.json.object.init = function() {
  hyper.views.json.object.generate();  
};