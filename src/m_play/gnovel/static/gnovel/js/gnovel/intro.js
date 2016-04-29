 $(document).ready(function () {
    $('.forgot-pass').click(function(event) {
      $(".pr-wrap").toggleClass("show-pass-reset");
    });

    $('.pass-reset-submit').click(function(event) {
      $(".pr-wrap").removeClass("show-pass-reset");
    });

    window.addEventListener('load',function(){

      var container = document.getElementById("container");
      var aspect_ratio = window.innerWidth / window.innerHeight;


        container.style.height = window.innerHeight + "px";
        container.style.width = window.innerWidth + "px";
        container.height = window.innerHeight;
        container.width = window.innerWidth;
    });

    window.addEventListener('resize', function(event) {
       var container = document.getElementById("container");

      var aspect_ratio = window.innerWidth / window.innerHeight;

      if (aspect_ratio > 16 / 9) {
        // fill height
        container.style.height = window.innerHeight + "px";
        container.height = window.innerHeight;
        container.style.width = ((16 / 9) * container.height) + "px";
      } else {
        // fill width
        container.style.width = window.innerWidth + "px";
        container.width = window.innerWidth;
        container.style.height = ((9 / 16) * container.width) + "px";
      }
    });

});
