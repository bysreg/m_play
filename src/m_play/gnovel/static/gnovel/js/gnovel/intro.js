 $(document).ready(function () {
    $('.forgot-pass').click(function(event) {
      $(".pr-wrap").toggleClass("show-pass-reset");
    });

    $('.pass-reset-submit').click(function(event) {
      $(".pr-wrap").removeClass("show-pass-reset");
    });

    window.addEventListener('resize', function(event) {
       var container = document.getElementById("container");

      var aspect_ratio = window.innerWidth / window.innerHeight;

      if (aspect_ratio > 16 / 9) {
        // fill height
        container.height = window.innerHeight;
        container.width = (16 / 9) * container.height;
      } else {
        // fill width
        container.width = window.innerWidth;
        container.height = (9 / 16) * container.width;
      }
    });

});
