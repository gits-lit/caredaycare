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
    let timeInput = {input:$('input:first').val()};
    $.ajax({
      method: 'POST',
      url: '/setTimer',
      contentType: 'application/json',
      data: JSON.stringify(timeInput)
    }).done(res => {
      // set pill count when done
      $('#red-count').text(res);
    })

    // timeInput parsed to moment
    timeInput = moment($('input:first').val(), "HH:mm");

    if (timeInput < moment()) {
      //if input is earlier, set to timeInput to next day
      console.log("this timeInput is earlier than today");
      timeInput = timeInput.add(1, 'day');
    }

    // console log time input
    console.log(timeInput.format("dddd, MMMM Do YYYY, h:mm:ss a"));
    alert("Alarm set to " +  timeInput.format("dddd, MMMM Do YYYY, h:mm:ss a"))
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