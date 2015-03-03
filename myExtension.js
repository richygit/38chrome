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

  function showMemberData(emailAddr) {
    console.log("#getting member details: " + emailAddr);
    $('.member-details').remove();
    var memberDetails = $('body').append('<iframe src="https://analytics.apps.38degrees.org.uk/sidebar/' + emailAddr + '" class="member-details" width="300" height="500" style="position: fixed; bottom: 0; right: 20px; z-index: 990;"></iframe>');
  }

  function displayHideButton() {
    $('body').append('<div class="hide-button" style="position: fixed; z-index: 999; bottom: 460px; right: 39px; background-color: #ddd; text-align: center; padding: 10px 15px;cursor: pointer;">X</div>');
    $('body').append("<script>$('.hide-button').click(function() {$('.member-details').hide();});</script>");
  }

  gmail.observe.after('open_email', function(id, url, body) {
    console.log('#open email event', id);
    var emailAddr = getEmailAddr(id);

    if(emailAddr !== null) {
      showMemberData(emailAddr);
      displayHideButton();
    } else {
      console.log("#No email found.");
    }
  });

}


// check if jquery is loaded and init
var checkLoaded = function() {
  if(window.jQuery && window.Gmail) {
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
