/*! Flipbooker - v0.1.0 - 2014-01-16
* https://github.com/corporadobob/flipbooker
* Copyright (c) 2014 JC; Licensed MIT */

(function($) {

  $.flipbooker = function(imgArr, options) {

    var opts = $.extend(true, {}, $.flipbooker.defaults, options),
    currentIndex = 0,
    $container = $(opts.container),
    $image,
    $caption,
    imgArrSize = imgArr.length,
    currentImg;

    // set up the image element
    $image = $('<img>').appendTo($container);
    $caption = $('<div>').appendTo($container);

    function plugin(){

      // set the image source to the currentImg
      // object's href value
      currentImg = imgArr[currentIndex];

      // add the caption text
      $image.attr('src', currentImg.href);
      if (currentImg.caption) {
        $caption.text(currentImg.caption);
      } else {
        $caption.text('');
      }

      // pause if the currentImg object requests it, otherwise
      // recurseively call the function with the normal delay
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
    cb: function(){}
  };

}(jQuery));
