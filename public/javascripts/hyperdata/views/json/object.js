hyper.views.json.object.STATE = {
  ids:1,
  lines:1,
  indents:0,
  blocks:[],
  line_blocks:[],
  curLine:1
};

hyper.views.json.object.getBlocksAtLineNum = function(line_num) {
  --line_num;
  let line_blocks = hyper.views.json.object.STATE.line_blocks;
  return line_blocks[line_num];  
};

hyper.views.json.object.getFieldsNumsAtLineNum = function() { 
  
  let line_blocks = hyper.views.json.object.STATE.line_blocks;
  line_blocks.forEach(function(line) {
    line.forEach(function(block, index) {      
      block.field_num = index;      
    });
  }); 
  hyper.views.json.editor.setLastLine(line_blocks.length);
  
};

hyper.views.json.object.matchBlockStringAtLineNum = function(params={}) {
  let {num, string} = params;
  --num;
  let retVal = null;
  let line = hyper.views.json.object.getBlocksAtLineNum(num);  
  if(line) {
    line.forEach(function(block) {
      if (block.string == string) {
        retVal = block;
      }
    });
  }
  return retVal;
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
  else if (elem == "}" || elem == "]" || elem ==",") {
    
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

hyper.views.json.object.findAndSetMatch = function(params={}) {
  let {obj, string} = params;
  let stop = false;  
  let curLine = obj.line;    
  for (let i = curLine; i > 0 && !stop; --i) {
    let match = false;
    match = hyper.views.json.object.matchBlockStringAtLineNum({ num: i, string });        
    if (match) {
      if (!obj.open_match && !match.close_match) {        
        stop = true;
        match.close_match = obj.id;
        obj.open_match = match.id;        
        obj.match_line = match.line;
        match.match_line = obj.line;
      }      
    }
  }
};

hyper.views.json.object.setMatchingBraces = function (params = {}) {
  let { obj, elem } = params;  
  if (elem == "}") {    
    hyper.views.json.object.findAndSetMatch({obj, elem, string:"{"});
  }
  else if (elem == "]") {    
    hyper.views.json.object.findAndSetMatch({ obj, elem, string: "["});
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
  else if (typeof elem == "null") {
      obj.type = "null";   
  }
  else if(typeof elem == "number") {
    obj.type = "number";
  }
  else if(typeof elem == "undefined") {
    obj.type = "undefined";
  }
  // else if(typeof elem == "function") {
  //   obj.type = "function";
  // }
  // else if(typeof elem == "object") {
  //   obj.type = "object";
  // }
  else if(typeof elem == "boolean") {
    obj.type = "boolean";
  }
  else if(typeof elem == "string") {
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
  hyper.views.json.object.getFieldsNumsAtLineNum();
  
  
  
};

hyper.views.json.object.init = function() {
  hyper.views.json.object.generate();  
};