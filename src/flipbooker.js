/*
 * flipbooker
 * https://github.com/colindresj/flipbooker
 *
 * Copyright (c) 2014 JC
 * Licensed under the MIT license.
 */

(function($) {

  $.flipbooker = function(imgArr, options) {

    var opts = $.extend(true, {}, $.flipbooker.defaults, options),
        currentIndex = 0,
        $container = $(opts.container),
        image,
        $image,
        $caption,
        imgArrSize = imgArr.length,
        currentImg;

    // set up the container styles
    $container.css({
      'height': opts.height,
      'width': opts.width,
      'position': 'relative',
      'overflow': 'hidden'
    });

    // set up the image element
    image = new Image();
    $image = $(image).appendTo($container);
    $caption = $('<div>').appendTo($container);

    function plugin(){

      // set the image source to the currentImg
      // object's source or image.src value and fit it to the container
      currentImg = imgArr[currentIndex];
      if (currentImg.source) {
        $image[0].src = currentImg.source;
      } else {
        image.src = currentImg.image.src;
      }

      // add the caption text
      if (currentImg.caption) {
        $caption.text(currentImg.caption).addClass('image-cap');

        // apply the appropriate caption position
        applyClasses(currentImg.captionPosition);

      } else {
        $caption.text('').removeClass('image-cap');
      }

      function applyClasses(captionPosition){
        var cases = {
          'Top Left': function($caption){
            $caption.removeClass('cap-bottom cap-right');
            $caption.addClass('cap-top cap-left');
          },
          'Top Right': function($caption){
            $caption.removeClass('cap-bottom cap-left');
            $caption.addClass('cap-top cap-right');
          },
          'Bottom Left': function($caption){
            $caption.removeClass('cap-top cap-right');
            $caption.addClass('cap-bottom cap-left');
          },
          'Bottom Right': function($caption){
            $caption.removeClass('cap-top cap-left');
            $caption.addClass('cap-bottom cap-right');
          },
          _default: function($caption){
            $caption.removeClass('cap-bottom cap-right');
            $caption.addClass('cap-top cap-left');
          }
        };

        if (captionPosition) {
          cases[captionPosition].call(cases, $caption);
        } else {
          cases._default($caption);
        }
      }

      // pause if the currentImg object requests it, otherwise
      // recursively call the function with the normal delay
      if (currentImg.pause) {
        looper = setTimeout(plugin, currentImg.pause);
      } else {
        looper = setTimeout(plugin, opts.delay);
      }

      // move onto the next image object
      currentIndex++;

      // after all images have been cycled through
      if (currentIndex >= imgArrSize) {

        // fire callback and reset the index
        opts.cb.call(this);
        currentIndex = 0;

        // loop?
        if (!opts.loop) {
          $.flipbooker.pause();
        }
      }
    }

    // start the initial loop
    var looper = setTimeout(plugin, opts.delay);

    // listen for events
    $(window).on('pause:flipbooker', function(){
      clearTimeout(looper);
    });
    $(window).on('play:flipbooker', function(){
      looper = setTimeout(plugin, opts.delay);
    });

  };

  // Utilities and defaults
  $.flipbooker.pause = function(){
    $(window).trigger('pause:flipbooker');
  };

  $.flipbooker.play = function(){
    $(window).trigger('play:flipbooker');
  };

  $.flipbooker.defaults = {
    container: '#flipbook',
    loop: true,
    delay: 100,
    height: '400px',
    width: '400px',
    cb: function(){}
  };

}(jQuery));
