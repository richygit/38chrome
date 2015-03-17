var runCode = function() {
  var gmail;
  if(globalGmailMode) {
    gmail = Gmail();
  } else {
    if (document.URL === "https://38degrees.nationbuilder.com/admin/signups") {
      return;
    }
  }

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
    var memberDetails = $('body').append('<iframe src="https://analytics.38degrees.org.uk/sidebar/' + emailAddr + '" class="member-details"></iframe>');
  }

  function addHideButtonBehaviour() {
    $('.hide-button').click(function() {
      $('.member-details').hide(); 
      $('.hide-button').hide();
      $('.min-button').hide();
    });
  }

  function addMinButtonBehaviour() {
    $('.min-button').click(function() {
      $('.member-details').toggleClass("max");
      $('.min-button').toggleClass("max");
      $('.hide-button').toggleClass("max")
    });
  }

  function displayFrameButtons() {
    $('body').append('<div class="hide-button">X</div>');
    addHideButtonBehaviour();
    $('body').append('<div class="min-button">&ndash;</div>');
    addMinButtonBehaviour();
  }

  function getNationBuilderEmailAddress() {
    return $('a[href^="mailto:"]').attr('href').substring(7);
  }

  if(globalGmailMode) {
    gmail.observe.after('open_email', function(id, url, body) {
      $('.hide-button').click();
      console.log('#open email event', id);
      var emailAddr = getEmailAddr(id);

      if(emailAddr !== null) {
        showMemberData(emailAddr);
        displayFrameButtons();
      } else {
        console.log("#No email found.");
      }
    });
  } else {
    showMemberData(getNationBuilderEmailAddress());
    displayFrameButtons();
  }
}


// check if jquery is loaded and init
var checkLoaded = function() {
  if(window.jQuery && ( !globalGmailMode || window.Gmail)) {
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

var globalGmailMode;

function checkMode() {
  if (document.URL.indexOf("https://38degrees.nationbuilder.com") === -1) {
    globalGmailMode = true;
    console.log("this is gmail");
  } else {
    globalGmailMode = false;
    console.log("this is nationbiulder");
  }
}

checkMode();
checkLoaded();
