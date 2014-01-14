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
    expect(1);
    ok(
      $.flipbooker(this.arr, {
        container: '#qunit-fixture',
        delay: 100
      }),
      'accepts options'
    );
  });


}(jQuery));
