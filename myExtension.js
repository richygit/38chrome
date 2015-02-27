// gmail code
var runCode = function() {
  var gmail = Gmail();

  gmail.observe.after('open_email', function(id, url, body) {
    console.log('#open email event', id);
    var currentEmail = gmail.get.email_data();
    console.log("current email id: " + gmail.get.email_id());
    console.log("current email data: " + JSON.stringify(gmail.get.email_data(id)));
    var peopleInvolved = currentEmail["people_involved"];
  });

}


// check if jquery is loaded and init
var checkLoaded = function() {
  if(window.jQuery) {
    $.fn.onAvailable = function(e) {
      var t = this.selector;
      var n = this;
      if (this.length > 0) e.call(this);
      else {
        var r = setInterval(function () {
          if ($(t).length > 0) {
            e.call($(t));
            clearInterval(r);
          }
        }, 50);
      }
    };

    // your code
    runCode();

  } else {
    setTimeout(checkLoaded, 100);
  }
}

checkLoaded();
