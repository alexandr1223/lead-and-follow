document.addEventListener("DOMContentLoaded", function(event) {

    $('img.img-svg').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        $img.replaceWith($svg);
        }, 'xml');
    }); 

    function menu(menuBtn, block, close) {
        if (document.querySelector(menuBtn)) {
            document.querySelector(menuBtn).addEventListener('click', () => {
                document.querySelector(block).style.cssText = 'left: 0';
                document.body.style.overflow = "hidden"
            })
            document.querySelector(close).addEventListener('click', () => {
                document.body.style.overflow = "auto"
                document.querySelector(block).style.cssText = 'left: -100%';
            })
        }
    } 
    // menu('', '', '');

    function tabs() {
		if (document.querySelector('.shedule')) {
			var $ = function (selector) {
				return document.querySelectorAll(selector);
			};
			
			// Define tabs, write down them classes
			var tabs = [
			'.shedule__selector-tab-1',
			'.shedule__selector-tab-2'
			];
			
			// Create the toggle function
			var toggleTab = function(element) {
				var parent = element.parentNode;
				
				// Do things on click
				$(element)[0].addEventListener('click', function(){
					this.parentNode.childNodes[1].classList.remove('active');
					this.parentNode.childNodes[3].classList.remove('active');
				
					this.classList.add('active');
					
					// Check if the clicked tab contains the class of the 1 or 2
					if(this.classList.contains('shedule__selector-tab-1')) {
					// and change the classes, show the first content panel
					$('.shedule-section-1')[0].classList.remove('hidden');
					$('.shedule-section-1')[0].classList.add('visible');
					
					// Hide the second
					$('.shedule-section-2')[0].classList.remove('visible');
					$('.shedule-section-2')[0].classList.add('hidden');
					}
				
					if(this.classList.contains('shedule__selector-tab-2')) {
					// and change the classes, show the second content panel
					$('.shedule-section-2')[0].classList.remove('hidden');
					$('.shedule-section-2')[0].classList.add('visible');
					// Hide the first
					$('.shedule-section-1')[0].classList.remove('visible');
					$('.shedule-section-1')[0].classList.add('hidden');
					}
				});
			};
			for (var i = tabs.length - 1; i >= 0; i--) {
				toggleTab(tabs[i])
			};
		}
	}
	tabs();

	function productTabs() {
		$('.shedule__product').each(function() {
			let ths = $(this);
			ths.find('.shedule__contentItem').not(':first').hide();
			ths.find('.shedule__product-tab').click(function() {
				ths.find('.shedule__product-tab').removeClass('shedule__product-tab--activeTab').eq($(this).index()).addClass('shedule__product-tab--activeTab');
				ths.find('.shedule__contentItem').hide().eq($(this).index()).fadeIn()
			}).eq(0).addClass('active');
		});
	}
	productTabs();

    $('.first__sliderFor').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.first__sliderNav'
      });
    $('.first__sliderNav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.first__sliderFor',
        variableWidth: true,
        dots: false,
        centerMode: true,
        focusOnSelect: true
    });

    $(document).ready(function(){
      $('.our-teachers__slider').slick({
            centerMode: true,
            centerPadding: '100px',
            dots: true,
            slidesToShow: 3,
            variableWidth: true,
            prevArrow: "<div class='prev'><img src='../img/svg/arrow.svg' alt='1'></div>",
            nextArrow: "<div class='next'><img src='../img/svg/arrow.svg' alt='2'></div>",
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  arrows: false,
                  centerMode: true,
                  centerPadding: '40px',
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 480,
                settings: {
                  arrows: false,
                  centerMode: true,
                  centerPadding: '40px',
                  slidesToShow: 1
                }
              }
            ]
        });

        $('.one-class__slider').slick({
          slidesToShow: 1,
          variableWidth: true,
          prevArrow: "<div class='prev'><img src='../img/btn.png' alt='1'></div>",
          nextArrow: "<div class='next'><img src='../img/svg/arrow.svg' alt='2'></div>",
        });

        $('.one-news__sliderFor').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: true,
          asNavFor: '.one-news__sliderNav',
          prevArrow: "<div class='prev'><img src='../img/btn.png' alt='1'></div>",
          nextArrow: "<div class='next'><img src='../img/svg/arrow.svg' alt='2'></div>",
        });
      $('.one-news__sliderNav').slick({
          slidesToShow: 7,
          slidesToScroll: 1,
          asNavFor: '.one-news__sliderFor',
          variableWidth: true,
          dots: false,
          arrows: false,
          centerMode: true,
          focusOnSelect: true
      });
    })
});