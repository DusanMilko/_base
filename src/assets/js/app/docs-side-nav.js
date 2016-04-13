var $ = require('jquery');

module.exports = function() {

  $('.js-docs-side-nav').on( "click", function(e) {
    e.preventDefault;

    if( $('.docs-side-nav').hasClass('is-active') ){
      $('.docs-side-nav').removeClass('is-active');
    } else {
      $('.docs-side-nav').addClass('is-active');
    }

    return false;
  });

  $(document).mouseup(function (e)
  {
    if( $('.docs-side-nav').length > 0 ) {
      var container = $('.docs-side-nav');

      if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
        //container.hide();
        $('.docs-side-nav').removeClass('is-active');
      } else {
      }
    }
  });
}
