/*
 * flipbooker
 * https://github.com/corporadobob/flipbooker
 *
 * Copyright (c) 2014 JC
 * Licensed under the MIT license.
 */

(function($) {

  $.flipbooker = function(imgArr, options) {

    var opts = $.extend(true, {}, $.flipbooker.defaults, options),
    currentIndex = 0,
    $container = $(opts.container),
    $image,
    imgArrSize = imgArr.length,
    currentImg;

    // set up the image element
    $container.append('<img>');
    $image = $container.children('img');

    function plugin(){

      // set the image source to the currentImg
      // object's href value
      currentImg = imgArr[currentIndex];
      $image.attr('src', currentImg.href);

      // sleep if the currentImg object requests a pause
      if (currentImg.pause) {
        $.flipbooker.sleep(currentImg.pause);
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

    // loop through the plugin action
    var looper = setInterval(plugin, opts.delay);

    // listen for events
    $(window).on('pause:flipbooker', function(){
      clearInterval(looper);
    });
    $(window).on('play:flipbooker', function(){
      looper = setInterval(plugin, opts.delay);
    });

  };

  // Utilities and defaults
  $.flipbooker.pause = function(){
    $(window).trigger('pause:flipbooker');
  };

  $.flipbooker.play = function(){
    $(window).trigger('play:flipbooker');
  };

  $.flipbooker.sleep = function(milliseconds){
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  };

  $.flipbooker.defaults = {
    container: '#flipbook',
    loop: true,
    delay: 50,
    cb: function(){}
  };

}(jQuery));
