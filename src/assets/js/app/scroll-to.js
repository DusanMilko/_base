var $ = require('jquery');

module.exports = function() {
  // Click to scroll the a[href] value, value will go to the id of that value
  // Ex:
  // <a class="js-scroll-to" href="#hello">Scroll me to hello</a>
  // takes you to ->
  // <div id="hello">Hello Content</div>
  $('.js-scroll-to').on( "click", function(e) {
    e.preventDefault;

    var $this = $(this),
        $target = $(this.hash),
        offset = ($this.data('offset')) ? $this.data('offset') : 0;

    if(this.hash == "#top"){
      scrollAmount = 0;
    } else {
      scrollAmount = $target.offset().top - offset
    }

    if( $target.length ){
      $('html,body').animate({
          scrollTop: scrollAmount
        }, 700, 'swing');
    }

    return false;
  });

}
