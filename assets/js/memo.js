history.scrollRestoration = "manual";

//  $(document).on("click", "figure", function () {
//    $(this).toggleClass("expand")
//  });

// ========================================================================================
// OPEN/CLOSE SUPPORT PANE
// ========================================================================================

function openSupport() {
  $(".support-pane").toggle();
  $(".support-pane").addClass("show");
  $("body").toggleClass("support-pane-open");
}

function closeSupport() {
  $(".support-pane").removeClass("show");
  $("body").removeClass("support-pane-open");
  setTimeout(function () {
    $(".support-pane").toggle();
  }, 750);
}

// ========================================================================================
// OPEN/CLOSE FILTER PANE
// ========================================================================================

function openFilter() {
  if ($(".filter-pane").hasClass("show")) {
    setTimeout(function () {
      $(".filter-pane").hide();
    }, 750);
  } else {
    $(".filter-pane").show();
  }

  $(".filter-pane").toggleClass("show");
  $("body").toggleClass("filter-pane-open");
  $(".home-articles").toggleClass("filter-pane-open");
}

function closeFilter() {
  if ($(".filter-pane").hasClass("show")) {
    setTimeout(function () {
      $(".filter-pane").hide();
    }, 750);
  }
  $(".filter-pane").removeClass("show");
  $("body").removeClass("filter-pane-open");
  $(".home-articles").removeClass("filter-pane-open");
}

// ========================================================================================
// OPEN/CLOSE MENU PANE
// ========================================================================================

function openMenu() {
  if (!$(".menu-pane").hasClass("show")) {
    $(".menu-pane").show();
  }
  $(".menu-pane").addClass("show");
  $("body").addClass("menu-pane-open");
  //    document.title = 'Memo Review'
  //    $(window).trigger('pane-closed')
  //    setTimeout(function () {
  //      $('.content-pane-text').html('')
  //    }, 750)
  //    if (push) history.pushState(null, document.title, window.home)
}

function closeMenu() {
  if ($(".menu-pane").hasClass("show")) {
    setTimeout(function () {
      $(".menu-pane").hide();
    }, 750);
  }
  $(".menu-pane").removeClass("show");
  $("body").removeClass("menu-pane-open");
}

// ========================================================================================
// OPEN CONTENT PANE
// ========================================================================================
function openPane(url, push, issue) {
  //   $('.content-pane').toggle();
  $("body").addClass("content-pane-open");
  $(".content-pane").addClass("show");
  $("#issue-number").html(issue);

  $.get(url, function (html) {
    var $html = $("<div />").append(html);
    var title = $html.find("title").text();
    if (push)
      history.pushState(
        {
          pane: true,
        },
        title,
        url
      );
    document.title = title;
    $(".content-pane-text").html($html.find(".content-pane-text").html());
    afterLoadPane();
    matomoTigger(url);
  });
}

var currentUrl = location.href;
function matomoTigger(url) {
  _paq.push(["setReferrerUrl", currentUrl]);
  currentUrl = url;
  _paq.push(["setCustomUrl", currentUrl]);
  _paq.push(["setDocumentTitle", "My New Title"]);

  // remove all previously assigned custom variables, requires Matomo (formerly Piwik) 3.0.2
  _paq.push(["deleteCustomVariables", "page"]);
  _paq.push(["trackPageView"]);

  // make Matomo aware of newly added content
  var content = document.getElementById("content-pane-text");
  _paq.push(["MediaAnalytics::scanForMedia", content]);
  _paq.push(["FormAnalytics::scanForForms", content]);
  _paq.push(["trackContentImpressionsWithinNode", content]);
  _paq.push(["enableLinkTracking"]);
}

// ========================================================================================
// CLOSE CONTENT PANE
// ========================================================================================

function closePane(push) {
  setTimeout(function () {
    $("body").removeClass("content-pane-open");
  }, 500);
  $(".content-pane").removeClass("show");
  document.title = "Memo Review";
  $(window).trigger("pane-closed");
  setTimeout(function () {
    $(".content-pane-text").html("");
  }, 750);
  if (push) history.pushState(null, document.title, window.home);

  setTimeout(function () {
    //   $('.content-pane').toggle()
  }, 750);
}

// ========================================================================================
// DOCUMENT READY FUNCTIONS
// ========================================================================================
$(document).ready(function () {
  $(".video").fitVids();

  // srolled triiger
  var $pane = $(".content-pane-text");
  $pane.on("scroll", paneScroll);
  var $paneOuter = $(".content-pane");
  var paneScrolled;
  function paneScroll() {
    var top = $pane.scrollTop();
    var _paneScrolled = top > window.innerHeight;
    if (paneScrolled !== _paneScrolled) {
      $paneOuter[_paneScrolled ? "addClass" : "removeClass"]("scrolled");
    }
    paneScrolled = _paneScrolled;
  }

  window.addEventListener("popstate", function (event) {
    if (event.state && event.state.pane) {
      openPane(document.location.href, false);
    } else {
      closePane();
    }
  });

  window.scroll({
    behavior: "smooth",
  });

  setTimeout(function () {
    $("body").addClass("ready");
  }, 500);

  // ========================================================================================
  // OPEN/CLOSE CONTENT PANE TRIGGER
  // ========================================================================================

  // OPEN
  $("body").on("click", "a.content-pane-trigger", function (event) {
    event.preventDefault();
    var url = this.href;
    var issue = $(this).data("issue");
    //      var issue = "1"
    //      console.log(issue)
    openPane(url, true, issue);
  });

  //CLOSE
  $(".content-pane-close").on("click", function () {
    closePane(true);
  });

  // ========================================================================================
  // OPEN/CLOSE SUPPORT PANE TRIGGER
  // ========================================================================================
  $("body").on("click", ".support-trigger", function () {
    //      event.preventDefault()//      var url = this.href
    openSupport();
  });

  $("body").on("click", ".content-pane-support-trigger", function () {
    //      event.preventDefault()//      var url = this.href
    openSupport();
  });

  $(".support-close").on("click", function () {
    closeSupport();
  });
  // ========================================================================================
  // OPEN/CLOSE FILTER PANE TRIGGER
  // ========================================================================================
  $("body").on("click", ".filter-trigger", function () {
    //      event.preventDefault()//      var url = this.href
    openFilter();
  });

  $(".filter-close").on("click", function () {
    closeFilter();
  });

  // ========================================================================================
  // OPEN/CLOSE MENU PANE TRIGGER
  // ========================================================================================
  $("body").on("click", ".menu-pane-trigger", function () {
    //      event.preventDefault()//      var url = this.href
    openMenu();
  });

  $(".menu-pane-close").on("click", function () {
    closeMenu();
  });

  // ========================================================================================
  // AFTER PANE LOAD TRIGGER
  // ========================================================================================
  window.afterLoadPane = function () {
    icPrevent();
  };

  icPrevent();

  $("body").on("complete.ic", function (event, el, data, status, xhr, reqId) {
    var title = $(".content-pane").html(xhr.responseText).find("title").text();
    document.title = title;
  });
});

function icPrevent() {
  $("a[ic-get-from]").on("click", function (event) {
    event.preventDefault();
  });
}
