$(function () {


   $('.slider').slick({
      arrows: false,
      dots: true,
      slidesToShow: 1,
      infinite: true,
      draggable: false,
      autoplay: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      variableWidth: true
   });
   $('.comments__slider').slick({
      slidesToShow: 1,
      arrows: false,
      dots: true,
      infinite: true,
      adaptiveHeight: true
      // variableWidth: true, 
      // centerMode: true,
   });

   $('.social__item-1').hover(function () {
      $('.social__item-svg-1').toggleClass('svg-active')
   });
   $('.social__item-2').hover(function () {
      $('.social__item-svg-2').toggleClass('svg-active')
   });
   $('.social__item-3').hover(function () {
      $('.social__item-svg-3').toggleClass('svg-active')
   });

   $('.burger').on('click', function (e) {
      e.preventDefault()
      $(this).toggleClass('burger--active')
      $('.header__nav').toggleClass('header__nav--open')
      $('.header__nav-search').toggleClass('header__nav-search--closed')
      $('.overlay').fadeToggle()
   });


   $('.header__search-link').on('click', function (e) {
      e.preventDefault()
      $('.header__nav-search').toggleClass('header__nav-search--active')
      $('.header__search-text').toggleClass('header__search-text--disabled')
      $('.header__search-icon').toggleClass('header__search-icon--active')
      $('.header__nav-input').toggleClass('header__nav-input--active')
      $('.header__search-clear').toggleClass('header__search-clear--active')

      if($( window ).width() < 605) {
         $('.header__logo').toggleClass('header__logo--disabled')
      }
   });




});

const clear = document.querySelector('.header__search-clear');
clear.onclick = function() {
   document.getElementById('header__nav-input').value = '';
};