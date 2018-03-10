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

  let resetPillCount = () => {
    $.ajax({
      method: "GET",
      url: "/alexa/resetPillCount"
    }).done(res => {
      $('#red-count').text(res);
    });
  }

  let updateTime = () => {
    $.ajax({
      method: "GET",
      url: "/moment"
    }).done(res => {
      $('#time').text(res);
    });
  }

  $('#dispenseLaterForm').submit((event) => {
    event.preventDefault();
    const timeInput = {input:$('input:first').val()};
    $.ajax({
      method: 'POST',
      url: '/setTimer',
      contentType: 'application/json',
      data: JSON.stringify(timeInput)
    })
    console.log(timeInput);
  })

  $('#dispenseBtn').on('click', () => {
    dispensePill();
  });

  $('#resetBtn').on('click', () => {
    resetPillCount();
  })

  //update pill count on page load
  checkPillCount();

  setInterval( () => {
    // update time every second
    updateTime();
  }, 1000); 
  updateTime();
})