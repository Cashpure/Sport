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
})