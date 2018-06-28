$(window).on('beforeunload', function(){
    $(window).scrollTop(0);
  });
  
  $(document).ready(function() {
      
      // GRID GALLERY
      var elem = document.querySelector('.grid-item-gallery');
      var flkty = new Flickity( elem, {
          // options
          cellAlign: 'center',
          contain: true,
          wrapAround: true,
          prevNextButtons: false,
          autoPlay: 5000,
      });
      
      var elem = document.querySelector('.grid-item-img-gallery');
      var flkty = new Flickity( elem, {
          // options
          cellAlign: 'center',
          contain: true,
          wrapAround: true,
          asNavFor: '.grid-item-gallery',
          prevNextButtons: false,
          pageDots: false,
          draggable: false,
          selectedAttraction: 0.06,
          friction: 0.8
      });
      
      // top navigation fix
      var distance = $('.top-nav_wrap').offset().top;
  
      $(window).scroll(function() {
          if ( $(this).scrollTop() >= distance ) {
              $('.top-nav_wrap').addClass('fixed');
          } else {
              $('.top-nav_wrap').removeClass('fixed');
          }
      });
      
      // mobile hamburger
      $('.top-menu').click(function() {
          $('.top-nav_wrap').toggleClass('active');
      });
      
      // NAVIGATION CLICK
      $('.side-nav-item').on('click', function(event) {
          $('.side-nav').find('.side-nav-item').removeClass('active');
          $(this).addClass('active');
      });
      
      // NAVIGATION SCROLLing
      $(window).on('scroll', function() {
          $('.nav-sec').each(function() {
              if ( $(window).scrollTop() >= $(this).offset().top - 50 ) {
                  var id = $(this).attr('id');
                  $('.side-nav').find('.side-nav-item').removeClass('active');
                  $('.side-nav-item a[href="#' + id + '"]').parent().addClass('active');
              }
          })
      });
      
      // SMOOTH SCROLLING
      $('a').click(function(){
          $('html, body').animate({
              scrollTop: $( $(this).attr('href') ).offset().top
          }, 1200);
          return false;
      });
      
      // fade in side nav after scroll vh * 2
      $(window).scroll(function() {    
          var scroll = $(window).scrollTop();    
          if (scroll >= 1 * $(window).height()) {
              $(".side-nav").removeClass('fadeout');
          } else {
              $(".side-nav").addClass('fadeout');
          }
      });
      
      // temporarily disable scrolling
      setTimeout(function() {
          $('body').removeClass('stop-scrolling');
      }, 4000);
      
      
      // APARTMENT
  //    var galleryElems = document.querySelectorAll('.apartment-content-gallery');
  //    for ( var i=0, len = galleryElems.length; i < len; i++ ) {
  //        var galleryElem = galleryElems[i];
  //        new Flickity( galleryElem, {
  //            // options
  //            cellAlign: 'right',
  //            contain: true,
  //            adaptiveHeight: true
  //        });
  //    }
      
      var galleryElems = $('.apartment-content-gallery').flickity({
          // options
              cellAlign: 'right',
              contain: true,
              //adaptiveHeight: true,
              arrowShape: 'M2.46 50.02l26.59-26.53 1.9 1.84L7.54 48.67l89.92-.02v2.61l-89.92.09 23.31 23.31-1.77 1.76-26.62-26.4z'
      });
      
      $('.apartment-tab').on( 'click', function() {
          console.log('resize');
          galleryElems.show().flickity('resize');
      });
      
      galleryElems.show().flickity('resize');
      
      
      // AMENITY MAP
      mapboxgl.accessToken = 'pk.eyJ1IjoidGF0aW1ibGluIiwiYSI6ImNqM2RkZzNqNDAwMGMzM281dTdqMnNuNnYifQ.f-78RB94egBVWUwbVNYAig';
      var bounds = [
          [-75.219885, 39.930095], // Southwest coordinates
          [-75.169532, 39.975333]  // Northeast coordinates
      ];
      var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/tatimblin/cjgckds5y02rt2spsey99bjgt',
          zoom: 12,
          maxBounds: bounds,
          center: [-75.203826, 39.950386],
      });
  
      var toggleableLayerIds = [ 'caffeine-fix', 'sunday-brunch', 'retail-therapy', 'happy-hour', 'midnight-snack', 'night-shift', 'the-essentials', 'class-time', 'brain-food' ];
  
      for (var i = 0; i < toggleableLayerIds.length; i++) {
          var id = toggleableLayerIds[i];
  
          var link = document.createElement('a');
          link.href = '#';
          if ( i < 3 || i > 5) {
              link.className = 'active';
          }
          else {
              link.className = '';
          }
          link.idName = id;
          link.textContent = id;
  
          link.onclick = function (e) {
  
              var clickedLayer = this.textContent;
              e.preventDefault();
              e.stopPropagation();
  
              var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
  
              if (visibility === 'visible') {
                  map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                  this.className = '';
                  //console.log(clickedLayer);
              } else {
                  this.className = 'active';
                  map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                  //console.log(i);
              }
          };
          map.scrollZoom.disable();
  
          var layers = document.getElementById('menu');
          layers.appendChild(link);
      }
      
      // start night related categories hidden
      map.on('load', function() {
          map.setLayoutProperty('happy-hour', 'visibility', 'none');
          map.setLayoutProperty('midnight-snack', 'visibility', 'none');
          map.setLayoutProperty('night-shift', 'visibility', 'none');
      })
      
      // day / night mode for map
      $('.neighborhood-map-nav-time').click(function() {
          $('.neighborhood-map-nav-time').toggleClass('time-day');
          $('.neighborhood-map-nav-time').toggleClass('time-night');
          
          $('#menu').toggleClass('menu-day');
          $('#menu').toggleClass('menu-night');
          
          $('body').toggleClass('night');
      });
      
      // FLICKITY
      
      // AMENITIES SLIDER
      var elem = document.querySelector('.amenity-slide-gallery');
      var flkty = new Flickity( elem, {
          // options
          cellAlign: 'right',
          contain: true,
          wrapAround: true,
          autoPlay: 5000,
          pageDots: false,
      });
      
      var amenitySlide = $('.amenity-slide-copy').flickity({
          // options
          draggable: false,
          cellAlign: 'right',
          contain: true,
          wrapAround: true,
          asNavFor: '.amenity-slide-gallery',
          pageDots: false,
          prevNextButtons: false,
          selectedAttraction: 1,
          friction: 1
      });
      
  });
  