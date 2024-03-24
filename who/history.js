$(function(){
  $(document).ready(function(){
    $('tr.h').hide();
    $('tr.sidet2h').hide();
    $('tr.sidet3h').hide();
    $('tr.sidet3footer').hide();
    $('tr.sidet4h').hide();
    $('tr.sidet4footer').hide();
    $('tr.footer').hide();
  });

  $('.sidet3header').click(function(){
    $(this).find('span').text(function(_, value){return value=='(more)'?'(less)':'(more)'});
    $(this).nextUntil('tr.sidet3footer').next('tr.sidet3footer').andSelf().slideToggle(0, function(){
    });
  });

  $('.sidet3hdr').click(function(){
    $(this).find('span').text(function(_, value){return value=='(more)'?'(less)':'(more)'});
    $(this).next('tr').slideToggle(0, function(){
    });
  });

  $('.sidet4header').click(function(){
    $(this).find('span').text(function(_, value){return value=='(more)'?'(less)':'(more)'});
    $(this).nextUntil('tr.sidet4footer').next('tr.sidet4footer').andSelf().slideToggle(0, function(){
    });
  });

  $('.sidet4hdr').click(function(){
    $(this).find('span').text(function(_, value){return value=='(more)'?'(less)':'(more)'});
    $(this).next('tr').slideToggle(0, function(){
    });
  });

  $('.header').click(function(){
    $(this).nextUntil('tr.header').andSelf().slideToggle(0, function(){
    });
  });

  $('.footer').click(function(){
    $(this).prevUntil('tr.header').andSelf().prev('tr.header').andSelf().slideToggle(0, function(){
    });
  });
});

$(function(){
 $("#toplinks1").load("./toplinks1.html");
});

$(function(){
 $("#toplinks2").load("./toplinks2.html");
});

$(function(){
 $("#toplinks3").load("./toplinks3.html");
});

$(function(){
 $("#toplinks4").load("./toplinks4.html");
});

$(function(){
 $("#toplinks5").load("./toplinks5.html");
});

$(function(){
 $("#toplinks6").load("./toplinks6.html");
});

$(function(){
 $("#toplinks7").load("./toplinks7.html");
});

$(function(){
 $("#toplinks8").load("./toplinks8.html");
});

$(function(){
 $("#toplinks9").load("./toplinks9.html");
});

$(function(){
 $("#toplinks10").load("./toplinks10.html");
});

$(function(){
 $("#toplinks11").load("./toplinks11.html");
});

$(function(){
 $("#toplinks12").load("./toplinks12.html");
});

$(function(){
 $("#toplinks13").load("./toplinks13.html");
});

$(function(){
 $("#toplinks14").load("./toplinks14.html");
});

$(function(){
 $("#toplinks15").load("./toplinks15.html");
});
