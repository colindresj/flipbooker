# Flipbooker
[![Build Status](https://travis-ci.org/colindresj/flipbooker.svg?branch=master)](https://travis-ci.org/colindresj/flipbooker)

Create a dynamic flipbook with jQuery.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/colindresj/flipbooker/master/dist/flipbooker.min.js
[max]: https://raw.github.com/colindresj/flipbooker/master/dist/flipbooker.js

Create a container somewhere on your page for your flipbook:

```html
<div id="flipbook"></div>
```

Include the required scripts and call Flipbooker with an array of image objects and any options:

```html
<script src="jquery.js"></script>
<script src="flipbooker.min.js"></script>
<script>
  $(function(){
    $.flipbooker(array, [options]);
  });
</script>
```

## Documentation
Flipbooker works by taking an array of image objects, and creates a dynamic flipbook/gif style presentation that is inserted into the flipbook  container:

```js
$(function(){
  $.flipbooker([
    { source: "http://placehold.it/350x151", caption: 'This is cool', pause: 5000 },
    { source: "http://placehold.it/350x152"},
    { source: "http://placehold.it/350x153"}
  ]);
});
```

###Image Attributes
A few attributes can be set on the images being passed into Flipbooker:

Name             | Type             | Required? | Description
-----------------|---------------   |-----------|-------------
source / image  | string or object | Yes       | The image source as a string or the *native image object
caption          | string           | No        | Text to be overlaid onto the image
captionPosition  | string           | No        | The location of your caption ('Top Left', 'Top Right', 'Bottom Left', 'Bottom Right')
pause            | number           | No        | An amount to pause the image for before flipping to the next one

Captions are styled using the included stylesheet, however the CSS is simple enough to be overriden with your own styles. If you plan on doing so, make sure to maintain the overall `.image-cap` class's position set to absolute.

#####*Native Image Objects
Instead of passing in a string that points to the image source as shown above, you can alternatively pass in a native HTML image object as the value mapped to the image key. This does require a bit more work, but definitely improves performance. Passing in image objects might look something like this:

```js
$(function(){
  var image1 = new Image(), image2 = new Image();
  image1.src = 'http://placehold.it/350x151', image2.src = 'http://placehold.it/350x152';

  $.flipbooker([
    { image: image1, caption: 'This is so native', pause: 5000 },
    { image: image2 }
  ]);
});
```

###Plugin Options
There are some overall options that can be passed into flipbooker after the arry of image objects:

Name          | Type          | Default      | Description
------------- |---------------| -------------|-------------
container     | string        | '#flipbook'  | Element selector for your flipbook container
loop          | boolean       | true         | Run through the presentation in a loop or just a single time
delay         | number        | 50           | The delay between flipping images
height        | string        | '400px'      | The default container height
width         | string        | '400px'      | The default container width
cb            | function      | -            | A callback function that is fired after a presentation runs through all of its images

```js
$(function(){
  $.flipbooker(array, {
    container: '#myContainer',
    loop: false,
    delay: 100,
    height: '500px',
    width: '500px',
    cb: function(){
      // your code here
    }
  });
});
```

###Pausing and Playing
You can pause and play your presentation by calling the following methods:

```js
$.flipbooker.pause();
$.flipbooker.play();
```
These methods work similar to a pub/sub mechanism through the global object, so you are free to use them independent of Flipbooker.
