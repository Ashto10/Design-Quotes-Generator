'use strict';

var quoteText = "";   /** Holds the returned quote text */
var authorText = "";  /** Holds the quote author's name */

/**
* Randomly generates a css color selection string, and applies it to the required elements.
*/
function ChangeColor() {

  var goldenRatio = 0.61803398875;
  var rand = (Math.random() + goldenRatio) % 1;
  rand = Math.floor(rand * 255);

  var color = "hsl(" + rand + ", 70%, 28%)";

  $("body").css({background:color,color:color});
  $("#next").css({background:color});
  $("#twitter, #tumblr").css({backgroundColor:color});
}

/**
* Ajax call that fetches quote data, parses the quote and author, and updates their respective containers.
*/
function FetchQuote() {
  // Depending on where the file is hosted, cors-anywhere may be required
  var cors = ""; // https://cors-anywhere.herokuapp.com/

  $("#quote, #author").slideUp();

  $.ajax({
    url: cors + "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
    dataType: "json",
    cache : false,
    timeout: 5000,
    success : function(quote) {
      quoteText = $(quote[0].content).text();
      authorText = quote[0].title;
      $("#quote").html(quoteText).slideDown();
      $("#author").html($('<a></a>')
        .attr({'href': quote[0].link, 'target': '_blank'})
        .html("&mdash; "+authorText)
      ).slideDown();
    },
    error : function() {
      quoteText = "Something appears to have gone wrong. Please try again later.";
      $("#quote").html(quoteText).show();
    }
  });
}

/**
* Helper function to open up an external page.
* 
* @param {String} The page to open.
*/
function LoadSite(url) {
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

/**
* Calls ChangeColor and hides quote text at page load, to assure a clean starting point for visitors.
*/
function InitializePage() {
  $("#quote, #author").hide();
  ChangeColor();
}


$(document).ready(function(){
  InitializePage();
  FetchQuote();

  $("#next").on("click",function(){
    ChangeColor();
    FetchQuote();
  });


  $("#twitter").on("click",function(){
    LoadSite('https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + quoteText + '" -' + authorText));
  });

  $("#tumblr").on("click",function(){
    LoadSite('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption='+encodeURIComponent(authorText)+'&content=' + encodeURIComponent(quoteText)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
  });
});