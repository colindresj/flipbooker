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

    var looper = setInterval(function(){

      // set the image source to the currentImg
      // object's href value
      currentImg = imgArr[currentIndex];
      $image.attr('src', currentImg.href);

      // sleep if the currentImg object requests a pause
      if (currentImg.pause) {
        $.sleep(currentImg.pause);
      }

      // move onto the next image object
      currentIndex++;

      // after all images have been cycled through
      if (currentIndex >= imgArrSize) {

        // fire callback
        opts.cb.call(this);

        // loop?
        if (opts.loop) {
          currentIndex = 0;
        } else {
          clearInterval(looper);
        }
      }

    }, opts.delay);

  };

  $.flipbooker.defaults = {
    container: '#slideshow',
    loop: true,
    delay: 50,
    cb: function(){}
  };

  $.sleep = function(milliseconds){
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  };

}(jQuery));
