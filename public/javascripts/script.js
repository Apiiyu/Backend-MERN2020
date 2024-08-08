$(document).ready(function () {
  // toggle navbar mobile
  $("#togglerButton").each(function (_, navToggler) {
    const target = $(navToggler).data("target");
    $(navToggler).on("click", function () {
      $(target).animate({
        height: "toggle",
      });
    });
  });

  // user avatar dropdown
  const dd_btn = $(".dropdown-button");
  const dd_target = $("#dropdown-target");
  dd_btn.click(function () {
    dd_btn.each(function () {
      if (dd_target.hasClass("hidden")) {
        dd_target.removeClass("hidden").addClass("block");
      } else if (dd_target.hasClass("block")) {
        dd_target.removeClass("block").addClass("hidden");
      }
    });
  });
});
