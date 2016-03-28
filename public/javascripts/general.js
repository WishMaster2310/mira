function setMenuActiveState (indx) {
	var items = document.querySelectorAll('.c-header__menu-item');
	items[indx].className += ' c-header__menu-item--active';
	return
}


$(function() {
	$('.c-slider').slick({
		dots: false,
		nextArrow: '<div class="c-slider__arrow c-slider__arrow--next"></div>',
		prevArrow: '<div class="c-slider__arrow c-slider__arrow--prev"></div>'
	})

	$('.c-wtf__slider')
		.slick({
			dots: false,
			arrows: false,
			infinite: false,
			fade: true,
			draggable: false
			//swipe: false
		})
		.on('afterChange', function(e, slick, currentSlide) {
				console.log(currentSlide)
				var menu = $('.c-wtf__menu-item[data-slide='+ currentSlide +']');
				menu.addClass('c-wtf__menu-item--active')
		})
		.on('beforeChange', function(e, slick, currentSlide) {
			$('.c-wtf__menu-item--active').removeClass('c-wtf__menu-item--active')
		});
	$('.c-wtf__menu-item').first().addClass('c-wtf__menu-item--active');
		
	$('.c-wtf__menu-item').on('click', function(e) {
		e.preventDefault();
		$('.c-wtf__slider').slick('slickGoTo', $(this).attr('data-slide'));
		$(this).addClass('c-wtf__menu-item--active');
	});

	$('.c-map__toggler').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.c-map__block').addClass('c-map__block--active')
	});

	$('.c-map__form-close').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.c-map__block').removeClass('c-map__block--active')
	})

	var myMap;

	
	ymaps.ready(init);

	function init () {
	    
   	var myMap = new ymaps.Map('yamap', {
      //center:[56.843417, 60.575493], // Москва
      center:[56.843517, 60.573733], // Москва
      zoom:17
    }, {
      suppressMapOpenBlock: true
    }),

   	myPlacemark = new ymaps.Placemark([56.843417, 60.575493], {}, {
      iconLayout: 'default#image',
      iconImageHref: '/images/map-pin.png',
      iconImageSize: [165, 55],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-86, -65]
    });

    myMap.geoObjects.add(myPlacemark);
	}

});