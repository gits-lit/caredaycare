$(document).ready(() => {
  let updateCount = () => {
    $.ajax({
      method: "GET",
      url: "/alexa/pillCount"
    }).done(res => {
      $('#red-count').html(res[0]);
    });
  }

  $('#dispenseBtn').on('click', () => {
    console.log('test');
  });

  //update pill count on page load
  updateCount();
})