var fO = {
  flipin: "",
  flipout : "",
  flipArray : [],
  word : "",
  canFlip: true
}

function wordChopper(flipString, flipIn){

  fO.flipArray = flipString.split("");

  if(flipIn){
    fO.word = "<h1 id='flip-me-in'>";
  } else if(!flipIn){
    fO.word = "<h1 id='flip-me-out'>";
  }

  for(i = 0; i < fO.flipArray.length; i++){
    fO.word += "<span>" + fO.flipArray[i] + "</span>"
  }

  fO.word += "</h1>"

  $("#flipper").prepend(fO.word);

  if(flipIn){
    absolutize("#flip-me-in");
  } else if (!flipIn){
    absolutize("#flip-me-out");
  }
}

function absolutize(absolute){

  var t,l;

  $(absolute).children().each(function(){
    t = $(this).offset().top;
    l = $(this).offset().left;
    $(this).css({
      "top": "150px",
      "left": l
    })
  });

  $(absolute).children().each(function(){
    $(this).css("position", "absolute");
  });
}

function finallyFlipMe(){

  var delay = 0;
  fO.canFlip = false;

  $("#flip-me-out").children().each(function(i){
    delay = i * .02;
    delay = delay + "s";
    $(this).css({
      "-webkit-animation-delay": delay
    });
    $(this).addClass("letter-rotate-out");

    if(i === $(this).length){

      setTimeout(function(){

        $("#flip-me-in").children().each(function(i){
          delay = i * .02;
          delay = delay + "s";
          $(this).css({
            "-webkit-animation-delay": delay
          });
          $(this).addClass("letter-rotate-in");
        })

      }, 300);
    }
  })

  setTimeout(function(){
    $("#flipper h1:nth-child(1)").attr("id", "flip-me-out");
    $("#flip-me-out").children().each(function(){
      $(this).removeClass()
    });
    $("#flipper h1:nth-child(2)").remove();
    fO.canFlip = true;

  }, 2000)
}

function launchFlipper(){
  wordChopper($("#flip-this").val(), true);
  finallyFlipMe();
  $("#flip-this").val("");
}


$("#button").click(function(){
  if(fO.canFlip){
    launchFlipper();
  }
});

$("#flip-this").keydown(function(event){
  if(fO.canFlip && event.which === 13){
    launchFlipper();
  }
})

$(document).ready(function(){

  wordChopper("Flip Me!", false);

  var tcl = $("#text-container").offset().left;

  $("#text-container").css({
    "top": "250px",
    "left": tcl,
    "position": "absolute"
  });

});
