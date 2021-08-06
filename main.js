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
    menu('.header__menu', '.header-mobile', '.header-mobile__close');

    function tabs() {
		if (document.querySelector('.shedule')) {
			var $ = function (selector) {
				return document.querySelectorAll(selector);
			};
			
			var tabs = [
			'.shedule__selector-tab-1',
			'.shedule__selector-tab-2'
			];
			
			var toggleTab = function(element) {
				var parent = element.parentNode;
				
				$(element)[0].addEventListener('click', function(){
					this.parentNode.childNodes[1].classList.remove('active');
					this.parentNode.childNodes[3].classList.remove('active');
				
					this.classList.add('active');
					
					if(this.classList.contains('shedule__selector-tab-1')) {
						$('.shedule-section-1')[0].classList.remove('hidden');
						$('.shedule-section-1')[0].classList.add('visible');
						
						$('.shedule-section-2')[0].classList.remove('visible');
						$('.shedule-section-2')[0].classList.add('hidden');
						document.querySelector('.first-screen__mainImage').classList.remove('first-screen__mainImage--red')
					}
				
					if(this.classList.contains('shedule__selector-tab-2')) {
						$('.shedule-section-2')[0].classList.remove('hidden');
						$('.shedule-section-2')[0].classList.add('visible');
						
						$('.shedule-section-1')[0].classList.remove('visible');
						$('.shedule-section-1')[0].classList.add('hidden');
						document.querySelector('.first-screen__mainImage').classList.add('first-screen__mainImage--red')
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

  	function productMobileTabs() {
		$(document).ready(function(){
      
			$('.shedule__product').each(function() {
				let ths = $(this);
				ths.find('.shedule__contentItem').not(':first').hide();
				$('.shedule__product-tab').eq(1).css('margin-top', $('.shedule__contentItem').eq(0).height() + 67)
				
				ths.find('.shedule__product-tab').click(function() {
					
					ths.find('.shedule__product-tab').removeClass('shedule__product-tab--activeTab').eq($(this).index()).addClass('shedule__product-tab--activeTab');
					ths.find('.shedule__product-tab').each(function(item) {
						$(this).css('margin', '10px 0 0 0')
					}) 
					ths.find('.shedule__product-tab svg').each(function(item) {
						$(this).css('transform', 'rotate(0)')
					}) 

					let pos = ths.find('.shedule__product-tab--activeTab').position().top + 54
					let offset = 63 + ths.find('.shedule__contentItem').eq($(this).index()).height()
					console.log(ths.find('.shedule__contentItem').eq($(this).index()).height())
					ths.find('.shedule__product-content').css('top', pos)
					
					ths.find('.shedule__product-tab--activeTab svg').css('transform', 'rotate(180deg)')
					ths.find('.shedule__product-tab--activeTab').next().css('margin-top', offset)
					if (ths.find('.shedule__product-tab').last().hasClass('shedule__product-tab--activeTab')) {
						ths.find('.shedule__product-tab--activeTab').css('margin-bottom', offset)
					}
					ths.find('.shedule__contentItem').hide().eq($(this).index()).fadeIn()
				}).eq(0).addClass('active');
			});
		})
	}

	function setTabs() {
		$(document).ready(function() {
			if (document.documentElement.clientWidth < 767) {
				productMobileTabs();
			} else {
				productTabs();
			}
		})
		
	}
	setTabs();

	function openSheduleFromAboutUs() {
        $(document).ready(function() {
			let offLine = document.querySelector('.shedule-ofline'),
			onLine = document.querySelector('.shedule-online')
			if (offLine) {
				offline.addEventListener('click', () => {
					localStorage.setItem('link', 'offline')
				})
			}
			if (onLine) {
				onLine.addEventListener('click', () => {
					localStorage.setItem('link', 'online')
				})
			}
			console.log(localStorage.getItem('link'))
			if (document.querySelector('.shedule')) {
				if (localStorage.getItem('link') == 'offline') {
					$('.shedule__selector-tab-1')[0].classList.add('active');
					$('.shedule-section-1')[0].classList.remove('hidden');
					$('.shedule-section-1')[0].classList.add('visible');
				}
				if (localStorage.getItem('link') == 'online') {
					$('.shedule__selector-tab-1')[0].classList.remove('active')
					$('.shedule__selector-tab-2')[0].classList.add('active')
					$('.shedule-section-1')[0].classList.add('hidden');
					$('.shedule-section-2')[0].classList.remove('hidden');
					$('.shedule-section-2')[0].classList.add('visible');
				}
				localStorage.setItem('link', '')
			}
		})
    }
    openSheduleFromAboutUs(); 

	$(document).ready(function(){
		$(".first-screen__btn--event").on("click", function (event) {
			event.preventDefault();
			var id  = $(this).attr('href'),
				top = $(id).offset().top;
			$('body,html').animate({scrollTop: top}, 1500);
		});
	});

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
      
      $(document).ready(function(){
        function CreateRelax(itemName, itemClass, itemSpeed) {
          var itemName = new Rellax(itemClass, {
            speed: itemSpeed
           });
        }
        if (document.querySelector('.classes__block') && document.documentElement.clientWidth > 1280) {
          CreateRelax('classes1', '.classes__item1', 2)
          CreateRelax('classes2', '.classes__item2', 2.4)
          CreateRelax('classes3', '.classes__item3', 2.3)
          CreateRelax('classes4', '.classes__item4', 2)
          CreateRelax('classes5', '.classes__item5', 2.2)
          CreateRelax('classes6', '.classes__item6', 2)
          CreateRelax('bg1', '.classes__bg1', -3)
          CreateRelax('bg2', '.classes__bg2', -5)
        }
        if (document.querySelector('.about__block') && document.documentElement.clientWidth > 1280) {
          CreateRelax('about1', '.about__item--first', 2)
          CreateRelax('about2', '.about__item--second', 2.4)
          CreateRelax('about3', '.about__item--third', 2.3)
          CreateRelax('about4', '.about__item--four', 2.4)
          CreateRelax('about5', '.about__item--five', 1.8)
        }
        if (document.querySelector('.product__block') && document.documentElement.clientWidth > 1280) {
          CreateRelax('product1', '.product__item--first', 2)
          CreateRelax('product2', '.product__item--second', 2.4)
          CreateRelax('product3', '.product__item--third', 2)
          CreateRelax('product4', '.product__item--four', 2.4)
          CreateRelax('product5', '.product__item--five', 1.8)
          CreateRelax('product6', '.product__item--six', 3)
        }
        if (document.querySelector('.about-us__block') && document.documentElement.clientWidth > 1280) {
          CreateRelax('about-us1', '.about-us__item--first', 2)
          CreateRelax('about-us2', '.about-us__item--second', 2.4)
          CreateRelax('about-us3', '.about-us__item--third', 2)
          CreateRelax('about-us4', '.about-us__item--four', 2.4)
        }
       
       
       });
      	$('.our-teachers__slider').slick({
			centerMode: true,
			centerPadding: '100px',
			dots: true,
			slidesToShow: 3,
			variableWidth: true,
			prevArrow: "<div class='prev'><img src='../img/btn-slider.png' alt='1'></div>",
			nextArrow: "<div class='next'><img src='../img/svg/arrow.svg' alt='2'></div>",
			responsive: [
			{
				breakpoint: 768,
				settings: {
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1
				}
			}
			]
      	});

		$('.award__slider').slick({
			centerMode: true,
			centerPadding: '100px',
			dots: true,
			slidesToShow: 3,
			variableWidth: true,
			prevArrow: "<div class='prev'><img src='../img/btn-slider.png' alt='1'></div>",
			nextArrow: "<div class='next'><img src='../img/svg/arrow.svg' alt='2'></div>",
			responsive: [
			{
				breakpoint: 768,
				settings: {
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
			prevArrow: "<div class='prev'><img src='../img/btn-slider.png' alt='1'></div>",
			nextArrow: "<div class='next'><img src='../img/svg/arrow.svg' alt='2'></div>",
        });

        $('.one-news__sliderFor').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			fade: true,
			asNavFor: '.one-news__sliderNav',
			prevArrow: "<div class='prev'><img src='../img/btn-slider.png' alt='1'></div>",
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
		$('.shedule__formInput').each(function(){
			$(this).on('blur', function(){
				if($(this).val().trim() != "") {
					$(this).addClass('has-val');
				}
				else {
					$(this).removeClass('has-val');
				}
			})    
		})
    })

});