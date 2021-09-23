hyper.table.clearSelectedCell = function () {
  let elem = document.querySelector(`#table tr td[data-focused="true"]`);
  if (elem) {
    elem.setAttribute('data-focused', 'false');
  }
  return elem;
};


hyper.table.getTableHeaders = function(params = {}) {
  let {parent_elem} = params;
  let headers =  parent_elem.querySelectorAll('th');
  return headers;
};

hyper.table.getTableCells = function(params = {}) {
  let {parent_elem} = params;
  let cells =  parent_elem.querySelectorAll('td');
  return cells;
};

hyper.table.setHeaderSelected = function(params = {}) {
  let {header} = params;  
  header.setAttribute('data-focused', 'true');
};

hyper.table.setCellSelected = function(params = {}) {
  let {cell} = params;  
  cell.setAttribute('data-focused', 'true');
};

hyper.table.clearSelectedElem = function() {
  let header = hyper.table.clearSelectedHeader();
  let cell = hyper.table.clearSelectedCell();
  return {cell, header};
};

hyper.table.clearSelectedHeader = function() {
  let elem = hyper.table.STATE.table_parent_elem.querySelector(`th[data-focused="true"]`);
  if(elem) {
    elem.setAttribute('data-focused', 'false');
  }
  return elem;
};

hyper.table.addHeaderListener = function(headers) {
  headers.forEach(function(header) {
    header.addEventListener('click', function(){
      let prev = hyper.table.clearSelectedElem();
      if (prev.header != header) {
        hyper.table.setHeaderSelected({header});
        
        
        let line_num = header.getAttribute('data-line_num');
        let field_num = header.getAttribute('data-field_num');
        
        let line_elem = hyper.editor.getLine({line_num});
        hyper.editor.setSelectedField({line_elem, field_num, line_num});

      }
    });

  });
};

hyper.table.addCellListener = function(cells) {
  cells.forEach(function(cell) {
    cell.addEventListener('click', function() {
      
      let prev = hyper.table.clearSelectedElem();
      
      if (prev.cell != cell) {
        
        hyper.table.setCellSelected({cell});
        
        
        let line_num = cell.getAttribute('data-line_num');
        let field_num = cell.getAttribute('data-field_num');
      
        hyper.editor.setSelectedLine({line_num});
        let line_elem = hyper.editor.getLine({line_num});
        hyper.editor.setSelectedField({line_elem, field_num, line_num});

      }
      
    });

  });
};

hyper.table.STATE = {
  table_parent_id: null,
  table_parent_elem:null
};

hyper.table.initTable = function(params = {}) {
  let {parent_elem_id} = params;
  hyper.table.STATE.table_parent_id = parent_elem_id;

  let parent_elem = document.querySelector(parent_elem_id);
  hyper.table.STATE.table_parent_elem = parent_elem;

  let headers = hyper.table.getTableHeaders({parent_elem});
  hyper.table.addHeaderListener(headers);
  
  let cells = hyper.table.getTableCells({parent_elem});
  hyper.table.addCellListener(cells);
};