module.exports = function() {
  'use strict';

  /*
  EXAMPLE HTML

  <div class="m_plug">
    <span class="plug__trigger">Click</span>
    <span class="plug__destroy">Destroy</span>
  </div>
  */

  var pluginName = 'pluginName', //!! Change this name to match plugin
      pluginId = 0, //This is default, gets auto replaced later
      elements = { //Dom Elements of plugin
        el : { 'view' : '.m_plug',
               'controller' : { 'mouseenter': 'hoverTrigger' }},
        clickTrigger: { 'view' : '.plug__trigger', 
                       'controller' : { 'click': 'clickTrigger' }},
        destroyTrigger: { 'view' : '.plug__destroy', 
                       'controller' : { 'click': 'destroy' }}
      },
      model = { //Model elements of plugin, includes default query match
        query : 'screen and (min-width:860px)',
        value : 'value'
      };

  Plugin.prototype = { //Start Plugin prototype
    init : function() {
      this.addEventListeners();
      this.handleQuery(this.mm);
    },
    destroy : function() {
      this.removeEventListeners();
      this.$el.remove();
      delete window.plugins[this.id];
    },
    addEventListeners : function(){
      $(window).on(('resize.'+this.id), $.proxy(this.resize, this));
      this.mm.addListener(this.handleQuery);
      self = this;
        
      $.each(this.selectors, function(key, value) {
        if(key=='el'){
          var selector = $(self.$el);
          if( this.controller ){
            $.each(this.controller, function(key, value) {
              $(selector).on(key, $.proxy(eval('self.'+value), self));
            });
          } 
        } else {
          var selector = $(self.$el.find(''+value.view+''));
          $.each(this.controller, function(key, value) {
            $(selector).on(key, $.proxy(eval('self.'+value), self));
          });
        }
      });
    },
    removeEventListeners : function(){
      $(window).off(('resize.'+this.id), $.proxy(this.resize, this));
      this.mm.removeListener(this.handleQuery);
      self = this;

      $.each(this.selectors, function(key, value) {
        if(key=='el'){
          var selector = $(self.$el);
          if( this.controller ){
            $.each(this.controller, function(key, value) {
              $(selector).off(key, $.proxy(eval('self.'+value), self));
            });
          } 
        } else {
          var selector = $(self.$el.find(''+value.view+''));
          $.each(this.controller, function(key, value) {
            $(selector).off(key, $.proxy(eval('self.'+value), self));
          });
        }
      });
    },
    resize: debounce(function(){
      o('resize');
    }, 250), 
    handleQuery : function(mql) {
      if(mql.matches){ //matches query
        o('match');
      }else{
        o('no match');
      }
    },
      
    clickTrigger : function(){
      o(this.id);
    },
    hoverTrigger : function(){
      o('hover');
    }
      
  }; //End Plugin prototype

  // The plugin constructor
  function Plugin( element, id, selectors, content ) {
    this.id = id;
    this.element = element;
    this.$el = $(this.element);
    this.selectors =  $.extend({}, elements, selectors); // raw query options
    this.elements = {};
    self = this;
    $.each(this.selectors, function(key, value) {
      if(key=='el'){
        self.elements[''+key+''] = $(self.$el);
      } else {
        self.elements[''+key+''] = $(self.$el.find(''+value.view+''));
      }
    });
    this.model = $.extend({}, model, content); // model object
    this.mm = window.matchMedia(this.model.query); //ie10 and up, below needs polyfill
    this.init();
  }

  $.fn[pluginName] = function ( options, content ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        pluginId = ''+pluginName+'-'+guid();
        while( window.plugins[pluginId] != undefined ){
            pluginId = ''+pluginName+'-'+guid();
        }
        $.data(this, "plugin_" + pluginName,
          window.plugins[pluginId] = new Plugin( this, pluginId, options, content )
        );
      }
    });
  };

  function init(){
    $(elements.el.view)[pluginName]();
  };
  init();

}
