(function($) {

  module('jQuery.flipbooker', {
    setup: function() {
      this.arr = [
        {href: "http://placehold.it/350x151", pause: 500},
        {href: "http://placehold.it/350x152", caption: "hi"},
        {href: "http://placehold.it/350x153"},
        {href: "http://placehold.it/350x154", pause: 500},
        {href: "http://placehold.it/350x155"},
        {href: "http://placehold.it/350x156", caption: "hi"},
        {href: "http://placehold.it/350x157"},
        {href: "http://placehold.it/350x158"},
        {href: "http://placehold.it/350x159"}
      ];
    }
  });

  test('ovrrides the defaults with options', function() {
    expect(2);
    $.flipbooker(this.arr, {
        container: '#qunit-fixture'
      });

    ok($('#qunit-fixture').children('img'), 'overriden container has an image element');
    ok($('#qunit-fixture').children('div'), 'overriden container has a div element');
  });


}(jQuery));
