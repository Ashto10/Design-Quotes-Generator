var quoteText = "";
var authorText = "";    

/// <summary> Changes the background color that the page will use. </summary>
function ChangeColor() {
  var color = ["FIREBRICK","DARKGREEN","SEAGREEN","DARKSLATEGRAY","DARKGOLDENROD","REBECCAPURPLE","DARKORANGE","SADDLEBROWN","DARKSLATEBLUE","BLACK"];
  var i = Math.floor((Math.random() * 10));

  $("body").css({background:color[i],color:color[i]});
  $("#next").css({background:color[i]});
  $("#twitter").css({backgroundColor:color[i]});
  $("#tumblr").css({backgroundColor:color[i]});
}

/// <summary> Ajax call that fetches quote data, parses the quote and author, and updates their respective containers. </summary>
function LoadQuote() {

  $("#quote, #author").slideUp();

  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
    dataType: "json",
    cache : false,
    success : function(quote) {
      quoteText = CleanQuote(quote[0].content);
      authorText = quote[0].title;
      $("#quote").html(quoteText).slideDown();
      $("#author").html("&mdash; "+authorText).slideDown();
    },
    failure : function() {
      quoteText = "Something appears to have gone wrong. Please try again later.";
      $("#quote").html(quoteText).show();
    }
  });
}

/// <summary> A wrapper function to open up a new page. </summary>
/// <param name="url" type="String"> The page to open. </param>
function LoadSite(url) {
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

/// <summary> Cleans up quote text to avoid runtime errors. </summary>
/// <param name="quote type="String"> The text to clean. </param>
function CleanQuote(quote) {
  return quote.replace(/(<([^>]+)>)/ig,"").trim();
}

/// <summary> Function that runs immediately on page load, in order to assure smooth animations
function InitializePage() {
  $("#quote, #author").hide();
  ChangeColor();
}

InitializePage();

$(document).ready(function(){
  LoadQuote();


  $("#next").on("click",function(){
    ChangeColor();
    LoadQuote();
  });


  $("#twitter").on("click",function(){
    LoadSite('https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + quoteText + '" -' + authorText));
  });

  $("#tumblr").on("click",function(){
    LoadSite('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption='+encodeURIComponent(authorText)+'&content=' + encodeURIComponent(quoteText)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
  });
});