hyper.views.json.elems.GET = {
  editor:{},
  rightMenu:{
    buttons: {

    }
  }
};

//queries the HTML elements and stores pointer to element by path
hyper.views.json.elems.init = function() {
  hyper.views.json.elems.initArray();
};

hyper.views.json.elems.initArray = function() {
  hyper.views.json.elems.GET.first_line = document.querySelector("#jsonView #jsonEditor .line .field");
  hyper.views.json.elems.GET.meta_array = document.querySelector(`#jsonView #jsonMetaArray`);
  hyper.views.json.elems.GET.meta_input = document.querySelector('#jsonView #jsonMetaInput');
  hyper.views.json.elems.GET.textarea = document.querySelector(`#jsonView #jsonInput textarea`);
  hyper.views.json.elems.GET.rightMenu.buttons.all = document.querySelectorAll('#jsonView #rightPaneMenuC .menu .button');
  hyper.views.json.elems.GET.rightMenu.buttons.wrapper = document.querySelector('#jsonView #rightPaneMenuC .menu');
  hyper.views.json.elems.GET.editor.wrapper = document.querySelector('#jsonView #jsonEditor');
};
