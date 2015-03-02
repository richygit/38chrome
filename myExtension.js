// gmail code
var runCode = function() {
  var gmail = Gmail();

  function getEmailAddr(id) {
    var email = null;
    var currentEmail = gmail.get.email_data(id);
    console.log("current email data: " + JSON.stringify(gmail.get.email_data(id)));
    var peopleInvolved = currentEmail["people_involved"];
    peopleInvolved.forEach(function(elem) {
      console.log("Person involved...");
      console.log(elem);
      if(elem[1].indexOf('@38degrees.org.uk') < 0) {
        email = elem[1];
      }
    });
    return email;
  }

  function showMemberDetails(memberDetails) {
    console.log("#showing member details: " + emailAddr);
    $('.member-details').remove();
    $('body').append('<div>' + memberDetails + '</div>');
  }

  function getMemberDetails(emailAddr) {
    $.get( "http://analytics.apps.38degrees.org.uk/sidebar/" + emailAddr, function( memberDetails ) {
      console.log("#loaded data: " + data);
      showMemberDetails(memberDetails);
    });
  }

  gmail.observe.after('open_email', function(id, url, body) {
    console.log('#open email event', id);
    var emailAddr = getEmailAddr(id);

    if(emailAddr !== null) {
      getMemberDetails(emailAddr);
    } else {
      console.log("#No email found.");
    }
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
