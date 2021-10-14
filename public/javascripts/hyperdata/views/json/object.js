hyper.views.json.object.STATE = {
  ids:1,
  lines:1,
  indents:0,
  blocks:[],
  line_blocks:[],
  curLine:1
};


//returns an array of arrays of objects
//each row in the array is the line number
//each row is an array of objects
//i.e. line 2: "hello":"world"
// array[2] = psuedo code [{"hello"}, {":"}, {"world"}]
hyper.views.json.object.getLineBlocks = function() {
  return hyper.views.json.object.STATE.line_blocks;
};

hyper.views.json.object.getFieldsNumsAtLineNum = function() { 
  // console.log('hyper.views.json.object.getFieldsNumsAtLineNum');
  let line_blocks = hyper.views.json.object.getLineBlocks();
  console.log(line_blocks);
  line_blocks.forEach(function(line) {
    line.forEach(function(block, index) { 
      // console.log(index);
      block.field_num = index;      
      // console.log(block);
    });
  }); 
  // hyper.views.json.editor.setLastLine(line_blocks.length);
  
};

/**
 * 
 * @param {*} array - the array of characters in the json
 * @returns an array of the block objects of the json characters
 */
hyper.views.json.object.configureBlocksArray = function (array) {
  let blocks_array = [];
  for (let i = 0; i < array.length; ++i) {    
    let obj = hyper.views.json.object.configureBlock(array[i]);
    blocks_array.push(obj);
    if (i == array.length - 1) {
      return blocks_array;
    }
  }
};


hyper.views.json.object.generate = function (array) {  
  hyper.views.json.object.resetBlocks();
  let blocks_array = hyper.views.json.object.configureBlocksArray(array);  
  hyper.views.json.object.STATE.blocks = blocks_array;
  hyper.views.json.object.getFieldsNumsAtLineNum();
};


/**
 * 
 * @param {int} line_num the line_number to get the blocks from
 * @returns the array of block objects in the line
 */
hyper.views.json.object.getBlocksAtLineNum = function (line_num) {
  line_num = parseInt(line_num);
  --line_num; //line starts at 0, reduce by one for array index
  let line_blocks = hyper.views.json.object.STATE.line_blocks;
  return line_blocks[line_num];
};

/**
 * 
 * @param {int} line_num the line_number to set the block objects
 * @returns the array of block objects in the line
 */
hyper.views.json.object.setBlocksAtLineNum = function (params={}) {
  // console.log('hyper.views.json.object.setBlocksAtLineNum');
  let {line_num, blocks} = params;
  line_num = parseInt(line_num);
  --line_num; //line starts at 0, reduce by one for array index
  // console.log(line_num);
  // console.log(blocks);
  let line_blocks = hyper.views.json.object.STATE.line_blocks;
  line_blocks[line_num] = blocks;
};


hyper.views.json.object.openNewLine = function(params={}) {
  // console.log('hyper.views.json.object.openNewLine');
  let {obj} = params;  
  let curLine = hyper.views.json.object.STATE.lines++;    
  let blocks = hyper.views.json.object.getBlocksAtLineNum(curLine);
  if (!blocks) {
    blocks = [];
  }
  blocks.push(obj);
  hyper.views.json.object.setBlocksAtLineNum({ line_num: curLine, blocks });
  return curLine;
};

hyper.views.json.object.closeNewLine = function(params={}) {
  // console.log('hyper.views.json.object.closeNewLine');
  let {obj} = params;  
  let curLine = ++hyper.views.json.object.STATE.lines;  
  let blocks = hyper.views.json.object.getBlocksAtLineNum(curLine);
  if (!blocks) {
    blocks = [];
  }
  blocks.push(obj);
  hyper.views.json.object.setBlocksAtLineNum({ line_num: curLine, blocks });
  return curLine;
};

hyper.views.json.object.stayInLine = function(params={}) {
  let {obj} = params;    
  let curLine = hyper.views.json.object.STATE.lines;    
  let blocks = hyper.views.json.object.getBlocksAtLineNum(curLine);
  if (!blocks) {
    blocks = [];    
  }
  blocks.push(obj);  
  hyper.views.json.object.setBlocksAtLineNum({ line_num: curLine, blocks });
  return curLine;
};

hyper.views.json.object.setLine = function(params = {}) {  
  console.log('hyper.views.json.object.setLine');
  let { obj, elem } = params;  
  let line = null;
  if (elem == "{" || elem == "[" || elem == ",") {
    line = hyper.views.json.object.openNewLine({obj});    
  }
  else if (elem == "}" || elem == "]") {
    line = hyper.views.json.object.closeNewLine({obj});    
  }
  else {
    line = hyper.views.json.object.stayInLine({obj});    
  }
  obj.line = line;
};

/**
 * 
 * @param {String} elem - the characters in the json input
 * @returns a block object with the character's meta information
 */
hyper.views.json.object.configureBlock = function (elem) {
  let obj = hyper.views.json.object.create();  
  hyper.views.json.object.setDirection({ obj, elem });
  hyper.views.json.object.setLine({ obj, elem });  
  hyper.views.json.object.setString({ obj, elem });
  hyper.views.json.object.setId({ obj, elem });
  hyper.views.json.object.setType({ obj, elem });
  hyper.views.json.object.setIndents({ obj, elem });
  hyper.views.json.object.setMatchingBraces({ obj, elem });

  return obj;
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
    indent:null,
    field_num:null
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




hyper.views.json.object.resetBlocks = function() {
  hyper.views.json.object.STATE.blocks = [];
  hyper.views.json.object.STATE.ids = 1;
  hyper.views.json.object.STATE.lines = 1;
  hyper.views.json.object.STATE.indents = 0;
  hyper.views.json.object.STATE.line_blocks = [];
};




hyper.views.json.object.init = function() {
  hyper.views.json.object.generate();  
};