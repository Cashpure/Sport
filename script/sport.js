document.addEventListener("DOMContentLoaded", () => {
   $(function () {

      function scrollStatus() {
         if (window.innerWidth <= 430 && getComputedStyle(document.querySelector('body'), null).overflow === 'auto') {
            document.querySelector('body').style.overflow = 'hidden'
         } else document.querySelector('body').style.overflow = 'auto'
      }

      $('.slider').slick({
         arrows: false,
         dots: true,
         slidesToShow: 1,
         infinite: true,
         draggable: false,
         autoplay: false,
         pauseOnHover: false,
         pauseOnFocus: false,
         variableWidth: true
      });
      $('.comments__slider').slick({
         slidesToShow: 1,
         arrows: false,
         dots: true,
         infinite: true,
         adaptiveHeight: false
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
         $('.overlay').toggleClass('overlay--open')
         scrollStatus()
      });

      const formWrapper = document.querySelector('.form-wrapper')
      const forms = Array.from(document.getElementsByClassName('header-main__form'))
      const log = document.querySelector('.header__login')
      const overlay = document.querySelector('.overlay')

      log.onclick = () => {
         overlay.classList.add('overlay--open')
         formWrapper.classList.toggle('form-wrapper--active')
         forms[1].classList.toggle('header-main__form--active')
         forms[0].style.display = 'none'
         $('.burger').toggleClass('burger--active')
         $('.header__nav').toggleClass('header__nav--open')
         $('.header__nav-search').toggleClass('header__nav-search--closed')
      }

      $('.overlay').on('click', function (e) {
         e.preventDefault()
         formWrapper.classList.remove('form-wrapper--active')
         forms.forEach(el => {
            if (el.classList.contains('header-main__form--active')) {
               el.classList.remove('header-main__form--active')
            }
         })
         $('.burger').removeClass('burger--active')
         $('.header__nav').removeClass('header__nav--open')
         $('.header__nav-search').removeClass('header__nav-search--closed')
         $(this).removeClass('overlay--open')
         scrollStatus()
      });

      const input = document.getElementById('header__nav-input');
      const clearBtn = document.querySelector('.header__search-clear');
      const container = document.body;
      const excludedTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'OBJECT', 'INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'BUTTON', 'SVG', 'CANVAS']);
      let debounceTimer = null;

      function escapeRegExp(s) {
         return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      function removeHighlights() {
         const marks = container.querySelectorAll('mark.search-highlight');
         marks.forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
         });
      }

      function highlightTerm(term) {
         removeHighlights();
         if (!term) return;

         const regex = new RegExp(escapeRegExp(term), 'gi');

         const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
               if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
               const parent = node.parentElement;
               if (!parent) return NodeFilter.FILTER_REJECT;
               if (parent.closest('.header__nav-search')) return NodeFilter.FILTER_REJECT;
               if (parent.closest('[data-no-highlight]')) return NodeFilter.FILTER_REJECT;
               if (excludedTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
               if (parent.closest('mark')) return NodeFilter.FILTER_REJECT;
               return NodeFilter.FILTER_ACCEPT;
            }
         });

         let node;
         while ((node = walker.nextNode())) {
            const text = node.nodeValue;
            let match;
            const matches = [];
            while ((match = regex.exec(text)) !== null) {
               matches.push({ start: match.index, end: match.index + match[0].length });
               if (regex.lastIndex === match.index) regex.lastIndex++;
            }

            for (let i = matches.length - 1; i >= 0; i--) {
               const m = matches[i];
               const range = document.createRange();
               try {
                  range.setStart(node, m.start);
                  range.setEnd(node, m.end);
                  const mark = document.createElement('mark');
                  mark.className = 'search-highlight';
                  range.surroundContents(mark);
               } catch (e) {
                  const before = node.splitText(m.start);
                  const after = before.splitText(m.end - m.start);
                  const mark = document.createElement('mark');
                  mark.className = 'search-highlight';
                  mark.appendChild(before.cloneNode(true));
                  before.parentNode.replaceChild(mark, before);
               }
            }
         }
      }

      input.addEventListener('input', (e) => {
         clearTimeout(debounceTimer);
         const val = e.target.value.trim();
         debounceTimer = setTimeout(() => highlightTerm(val), 200);
      });

      clearBtn.addEventListener('click', () => {
         input.value = '';
         removeHighlights();
         input.focus();
      });

      $('.header__search-link').on('click', function (e) {
         e.preventDefault()
         $('.header__nav-search').toggleClass('header__nav-search--active')
         $('.header__search-text').toggleClass('header__search-text--disabled')
         $('.header__search-icon').toggleClass('header__search-icon--active')
         $('.header__nav-input').toggleClass('header__nav-input--active')
         $('.header__search-clear').toggleClass('header__search-clear--active')

         if ($(window).width() < 605) {
            $('.header__logo').toggleClass('header__logo--disabled')
         }
      });

      $(".header__nav-link").on("click", function (e) {
         scrollStatus()
         e.preventDefault();
         var anchor = $(this);
         $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
         }, 777);
         if ($(window).width() <= 1300) {
            $('.header__nav').removeClass('header__nav--open')
            $('.overlay').removeClass('overlay--open')
            $('.burger').removeClass('burger--active')
         }
         return false;
      });
      $(".footer__content-logo").on("click", function (e) {
         scrollStatus()
         e.preventDefault();
         var anchor = $(this);
         $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
         }, 777);
         if ($(window).width() <= 1300) {
            $('.header__nav').removeClass('header__nav--open')
            $('.overlay').removeClass('overlay--open')
            $('.burger').removeClass('burger--active')
         }
         return false;
      });


   });

   const clear = document.querySelector('.header__search-clear');
   clear.onclick = function () {
      document.getElementById('header__nav-input').value = '';
   };

   $('.comments__slider').on('setPosition', function (event, slick) {
      let commentSlider = document.querySelector('.comments__slider')
      const slickList = commentSlider.querySelector('.slick-list')
      const slickTrack = commentSlider.querySelector('.slick-track')
      if (slickTrack) {
         let slickTrackHeight = getComputedStyle(slickTrack).height
         setTimeout(() => {
            slickList.style.height = slickTrackHeight + 'px'
         }, 1);
         console.log(slickTrackHeight)
         console.log(slickList.style.height)
      }
   })
})