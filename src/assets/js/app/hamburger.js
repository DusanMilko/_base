var $ = require('jquery');

module.exports = function() {

  $('.js-hamburger').on( "click", function(e) {
    e.preventDefault;

    if( $(this).hasClass('is-active') ){
      $(this).removeClass('is-active');
      $('.js-hamburger-cont').removeClass('is-active');
    } else {
      $(this).addClass('is-active');
      $('.js-hamburger-cont').addClass('is-active');
    }

    return false;
  });

  // On click outside 
  $(document).mouseup(function (e) {
    var hamburgerCont = $('.js-hamburger-cont');
    var hamburgerBtn = $('.js-hamburger');

    if (
      (!hamburgerCont.is(e.target) // if the target of the click isn't the container...
      && hamburgerCont.has(e.target).length === 0) // ... nor a descendant of the container
      &&
      (!hamburgerBtn.is(e.target) // if the target of the click isn't the container...
      && hamburgerBtn.has(e.target).length === 0) // ... nor a descendant of the container
    ){
      $('.js-hamburger').removeClass('is-active');
      $('.js-hamburger-cont').removeClass('is-active');
    }
  });
}
