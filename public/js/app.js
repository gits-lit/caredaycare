$(document).ready(() => {
  let checkPillCount = () => {
    $.ajax({
      method: "GET",
      url: "/alexa/pillCount"
    }).done(res => {
      $('#red-count').text(res);
    });
  }

  let dispensePill = () => {
    $.ajax({
      method: "GET",
      url: "/alexa/dispensePill"
    }).done(res => {
      $('#red-count').text(res);
    });
  }

  $('#dispenseBtn').on('click', () => {
    dispensePill();
  });

  //update pill count on page load
  checkPillCount();
})