! function() {
  var miraApp = {
    initMapBlock: function() {
      if ($('.c-map__back').length > 0) {
        var myMap;
        ymaps.ready(init);

        function init() {

          var myMap = new ymaps.Map('yamap', {
              //center:[56.843417, 60.575493], // Москва
              center: [56.843517, 60.573733], // Москва
              zoom: 17
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

        $('.c-map__toggler').on('click', function(e) {
          e.preventDefault();
          $(this).closest('.c-map__block').addClass('c-map__block--active')
        });

        $('.c-map__form-close').on('click', function(e) {
          e.preventDefault();
          $(this).closest('.c-map__block').removeClass('c-map__block--active')
        });
      }
    },
    initWTFSlider: function() {
      if ($('.c-wtf__slider').length > 0) {
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
            var menu = $('.c-wtf__menu-item[data-slide=' + currentSlide + ']');
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
      }
    },
    initMediaSlider: function() {
      if($('.c-media-slider__list').length > 0) {
        $('.c-media-slider__list').slick({
          dots: false,
          slidesToShow: 1,
          variableWidth: true,
          infinite: false,
          nextArrow: '<div class="c-media-slider__arrow c-media-slider__arrow--next"></div>',
          prevArrow: '<div class="c-media-slider__arrow c-media-slider__arrow--prev"></div>'
        });
      }
    },  
    initSlider: function() {
      if ($('.c-slider').length > 0) {
        $('.c-slider').slick({
          dots: false,
          nextArrow: '<div class="c-slider__arrow c-slider__arrow--next"></div>',
          prevArrow: '<div class="c-slider__arrow c-slider__arrow--prev"></div>'
        });
      }
    },
    gallery: function(id, data, active) {
      var popup = document.createElement('div'),
      	container = document.createElement('div'),
        galleryHeader = document.createElement('div'),
        galleryTitle = document.createElement('div'),
        galleryView = document.createElement('div'),
        galleryViewInner = document.createElement('div'),
        gallery = document.createElement('div'),
        galleryWrapper = document.createElement('div'),
        galleryNextArrow = document.createElement('div'),
        galleryPrevArrow = document.createElement('div'),
        galleryLoader = new Image,
        gVideo = gImgs = 0,
        activeSlide = active ? parseInt(active) : 0,
        link = document.createElement('a'),
        slickOpts = {
        	initialSlide: activeSlide,
        	slidesToShow: 5,
          slidesToScroll: 1,
          infinite: false,
          nextArrow: '<div class="c-gallery__list-arrow c-gallery__list-arrow--next"></div>',
          prevArrow: '<div class="c-gallery__list-arrow c-gallery__list-arrow--prev"></div>'
        };

      galleryHeader.className = 'c-gallery__header';
      container.className = 'c-gallery';
      galleryView.className = 'c-gallery__view';
      galleryViewInner.className = 'c-gallery__view-inner';
      gallery.className = 'c-gallery__list';
      galleryWrapper.className = 'c-gallery__wrapper';
      galleryTitle.className = 'c-gallery__title';
      galleryNextArrow.className = 'c-gallery__arrow c-gallery__arrow--next';
      galleryPrevArrow.className = 'c-gallery__arrow c-gallery__arrow--prev';
      galleryView.innerHtml = '<div class="c-gallery__view-inner"></div>';
      gallery.id = id;
      galleryLoader.src = '/images/loader.gif';
      galleryLoader.className = 'c-gallery__loader';
      link.setAttribute('href', data.btnUrl);
      link.innerHTML = data.btnText;
      link.className = 'c-gallery-link';

			

      for (var i = 0; i < data.items.length; i++) {
        var elem = document.createElement('div');
        var elemImg = document.createElement('div');
        elemImg.className = 'c-gallery__list-img c-gallery__list-img--type-' + data.items[i].type;
        elemImg.style.backgroundImage = 'url("' + data.items[i].thumbs + '")';
        data.items[i].type === 'img' ? gImgs += 1 : gVideo += 1;
        elem.className = 'c-gallery__list-item';

        elem.setAttribute("data-src", data.items[i].src);
        elem.setAttribute("data-type", data.items[i].type);
        elem.setAttribute("data-title", data.items[i].caption);

        if (elem.addEventListener) {
          elem.addEventListener("click", function () { return galleryClick.apply(this, arguments)});
        } else if (elem.attachEvent) {
          elem.attachEvent("onclick", function () { return galleryClick.apply(this, arguments)});
        }

        elem.appendChild(elemImg);
        gallery.appendChild(elem);
        if (i === activeSlide) {
        	galleryClick.apply(elem, arguments)
        }
      }

      if (galleryNextArrow.addEventListener) {
        galleryNextArrow.addEventListener("click", function () {
        	nextArrwClick ()
        });
      } else if (elem.attachEvent) {
        galleryNextArrow.attachEvent("onclick", function () {
        	nextArrwClick ()
       });
      }

      if (galleryPrevArrow.addEventListener) {
        galleryPrevArrow.addEventListener("click", function () {
        	return prevArrwClick ()
        });
      } else if (elem.attachEvent) {
        galleryPrevArrow.attachEvent("onclick", function () {
        	return prevArrwClick ()
       });
      }


      function galleryClick () {
      	var that = this;
      	galleryViewInner.className = 'c-gallery__view-inner c-gallery__view-inner--inactive';
      	galleryTitle.innerHTML = this.getAttribute('data-title');
      	$(this).addClass('c-gallery__list-item--active').siblings().removeClass('c-gallery__list-item--active');

      	if (that.getAttribute('data-type') === 'img') {
	      	var img = new Image;
	      	img.className = 'c-gallery__view-img';
	      	img.src = that.getAttribute('data-src');
	      	img.onload = function() {
						setTimeout(function() {
							galleryViewInner.innerHTML = "";
							galleryViewInner.appendChild(img);
							galleryViewInner.className = 'c-gallery__view-inner';
						}, 500)
	    		}
	    	} else {
	    		var iframe = document.createElement("iframe");
	    		iframe.style.width = "576px";
	    		iframe.style.height = "390px";
	    		iframe.className = 'c-gallery__view-iframe';
	    		iframe.src = that.getAttribute('data-src');

	    		setTimeout(function() {
						galleryViewInner.innerHTML = "";
						galleryViewInner.appendChild(iframe);
						galleryViewInner.className = 'c-gallery__view-inner';
					}, 500)
	    	}

	    	if ($(that).index() === 0) {
	    		$(galleryPrevArrow).addClass('c-gallery__arrow--disabled')
	    	} else if ($(that).index() === (gImgs + gVideo -1)) {
	    		$(galleryNextArrow).addClass('c-gallery__arrow--disabled')
	    	} else {
	    		$(galleryNextArrow).removeClass('c-gallery__arrow--disabled')
	    		$(galleryPrevArrow).removeClass('c-gallery__arrow--disabled')
	    	}
      } 

      function nextArrwClick () {
      	var len = $(gallery).find('.c-gallery__list-item').length;
      	var active = $(gallery).find('.c-gallery__list-item--active').index();
    
      	if (active < len-1) {
      		var next = $(gallery).find('.c-gallery__list-item')[active + 1];
      		$(gallery).slick('slickNext');
      		return galleryClick.apply(next, arguments);
      	}
      } 

      function prevArrwClick () {
      	var len = $(gallery).find('.c-gallery__list-item').length;
      	var active = $(gallery).find('.c-gallery__list-item--active').index();
      	
      	if (active > 0) {
      		var next = $(gallery).find('.c-gallery__list-item')[active - 1];
      		$(gallery).slick('slickPrev');

      		return galleryClick.apply(next, arguments);
      	}
      } 

      galleryWrapper.appendChild(gallery);
      galleryHeader.innerHTML = '<div class="c-gallery__header-top"><span class="c-gallery__name">' + data.title + '</span><span class="c-gallery__meta">' + gImgs + ' Фото</span><span class="c-gallery__meta"> ' + gVideo + ' Видео</span></div>';
      galleryHeader.appendChild(galleryTitle);

      galleryView.appendChild(galleryLoader);
			galleryView.appendChild(galleryViewInner);
			galleryView.appendChild(galleryNextArrow);
			galleryView.appendChild(galleryPrevArrow);
		
      container.appendChild(galleryHeader);
      container.appendChild(galleryView);
      container.appendChild(galleryWrapper);
      
      popup.appendChild(container);
      popup.appendChild(link)
      

      vex.open({
        content: popup,
        contentClassName: 'c-gallery-popover',
        afterOpen: function($vexContent) {
          $(gallery).slick(slickOpts);
        },
      });
    },
    appInit: function() {
      this.initMapBlock();
      this.initWTFSlider();
      this.initMediaSlider();
      this.initSlider();
    },

    openGallery: function(id, active) {
      var source = '/uploads/' + id + '.json';
      $.getJSON(source, function(data) {
        miraApp.gallery(id, data, active)
      });
    }
  }

  $(function() {
    miraApp.appInit();

    $('.j-gallery').on('click', function(e) {
      e.preventDefault();
      var gID = $(this).attr('data-gid');
      var gActive = $(this).attr('data-gactive');
      miraApp.openGallery(gID, gActive);
    })
  });
}()
