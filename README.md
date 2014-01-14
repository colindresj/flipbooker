# Flipbooker
Create a dynamic flipbook with jQuery.

**This is WIP and not production-ready.**

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/corporadobob/flipbooker/master/dist/flipbooker.min.js
[max]: https://raw.github.com/corporadobob/flipbooker/master/dist/flipbooker.js

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
Flipbooker works by taking an array of image objects, and creates a dynamic flipbook/gif style presentation that is inserted into flipbook  container:

```js
<script>
$(function(){
  $.flipbooker([
    { href: "http://placehold.it/350x151", caption: 'This is cool', pause: 5000 },
    { href: "http://placehold.it/350x152"},
    { href: "http://placehold.it/350x153"}
  ]);
});
</script>
```

###Plugin Options

Name          | Type          | Default      | Description
------------- |---------------| -------------|-------------
container     | string        | '#flipbook'  | Element selector for your flipbook container
loop          | boolean       | true         | Run through the presentation in a loop or just a single time
delay         | number        | 50           | The delay between flipping images
cb            | function      | function(){} | A callback function that is fired after a presentation runs through all of its images


###Image Attributes
A few attributes can be set on the images being passed into Flipbooker.

Name     | Type          | Required? | Description
---------|---------------|-----------|-------------
href     | string        | Yes       | The image source
caption  | string        | No        | Text to be overlaid onto the image
pause    | number        | No        | An amount to pause the image for before flipping to the next one

###Pausing and Playing
You can pause and play your presentation by calling the following methods:

```js
$.flipbooker.pause();
$.flipbooker.play();
```
These methods work similar to a pub/sub mechanism through the global object, so you are free to use them independent of Flipbooker.


## Examples
_(Coming soon)_
