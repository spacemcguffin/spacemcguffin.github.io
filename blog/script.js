$(function(){
  $('a[href^="#"]:not([href="#"])').click(function(){
    $("html, body").animate({
      scrollTop: $($(this).attr("href")).position().top + 1
    }, 500);
    return false;
  });
});

//Nav Scroll snippet:
var lastLink;

function setTab(){
  $('.tab').each(function(){
    var scrollPos = $(document).scrollTop();
    var linkRef = $(this).attr("href");
    var refPos = $(linkRef).position().top;
    var refHeight = $(linkRef).height();
    if(refPos <= scrollPos && refPos + refHeight > scrollPos){
      //Run this only if the section has changed...
      if(linkRef != lastLink){
        //Update tab position:
        $('.tab').removeClass("active-tab");
        $(this).addClass("active-tab");
        var tabPos = $(this).position();
        var tabHeight = $(this).height();
        $(".indicator-line").css({"top": tabPos.top});
        $(".indicator-line").css({"height": tabHeight+"px"});
        //History and URL hash update:
        history.pushState(null, null, linkRef);
        //Refhresh control var:
        lastLink = linkRef;
      };
    };
  });
};

//Handlers:
$(document).ready(function(){
  setTab();
  $(window).on("scroll resize", setTab);
});
