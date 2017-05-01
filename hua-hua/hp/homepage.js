function dropdown(){
  let opacity = document.getElementById("navmenu").style.opacity;
  if (opacity == "1") {
    document.getElementById("navmenu").setAttribute("style","display: none; opacity:0; -moz-opacity:0; filter:alpha(opacity=0)");
    document.getElementById("nav-icon-close").setAttribute("style", "display:none; opacity:0; -moz-opacity:0; filter:alpha(opacity=0)");
    document.getElementById("nav-icon-open").setAttribute("style", "display:block; opacity:1; -moz-opacity:1; filter:alpha(opacity=1)");
  } else {
    document.getElementById("navmenu").setAttribute("style","display: block; opacity:1; -moz-opacity:1; filter:alpha(opacity=1)");
    document.getElementById("nav-icon-close").setAttribute("style", "display:block; opacity:1; -moz-opacity:1; filter:alpha(opacity=1)");
    document.getElementById("nav-icon-open").setAttribute("style", "display:none; opacity:0; -moz-opacity:0; filter:alpha(opacity=0)");

  }
}

function selector(){
  let opacity = document.getElementById("makeplay").style.opacity;
  if(opacity == '1'){
    document.getElementById("makeplay").setAttribute("style", "display:none; opacity:0; -moz-opacity:0; filter:alpha(opacity=0)");
    document.getElementById("close-btn").setAttribute("style", "display:none; opacity:0; -moz-opacity:0; filter:alpha(opacity=0)");
  }else{
    document.getElementById("makeplay").setAttribute("style","display:block; opacity:1; -moz-opacity:1; filter:alpha(opacity=1)");
    document.getElementById("close-btn").setAttribute("style","display:block; opacity:1; -moz-opacity:1; filter:alpha(opacity=1)");
 }
}
