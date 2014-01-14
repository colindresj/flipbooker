/*
 * flipbooker
 * https://github.com/corporadobob/flipbooker
 *
 * Copyright (c) 2014 JC
 * Licensed under the MIT license.
 */

(function($) {

  $.fn.flipbooker = function(elems, delay) {

    var currentIndex = 0,
    $container = this,
    $image,
    elemsLength = elems.length,
    currentImg;

    // set up the image element
    $container.append('<img>');
    $image = $container.children('img');

    setInterval(function(){

      currentImg = elems[currentIndex];
      $image.attr('src', currentImg.href);

      if (currentImg.pause) {
        // sleep here
        // console.log('sleep');
      }

      currentIndex++;

      // loop
      if (currentIndex >= elemsLength) {
        currentIndex = 0;
      }

    }, delay);

    return this;
  };

}(jQuery));
