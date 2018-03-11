$(document).ready(() => {
  let checkPillCount = () => {
    $.ajax({
      method: "GET",
      url: "/alexa/pillCount"
    }).done(res => {
      $('#red-count').text(res);
    });
  }

  let checkGreenPillCount = () => {
    $.ajax({
      method: "GET",
      url: "/alexa/greenPillCount"
    }).done(res => {
      $('#green-count').text(res);
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

  let dispenseGreenPill = () => {
    $.ajax({
      method: "GET",
      url: "/alexa/dispenseGreenPill"
    }).done(res => {
      $('#green-count').text(res);
    });
  }

  let resetPillCount = () => {
    $.ajax({
      method: "GET",
      url: "/alexa/resetPillCount"
    }).done(res => {
      $('#red-count').text(res);
      $('#green-count').text(res);
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

  $('#dispensePillForm').submit((event) => {
    event.preventDefault();
    let option = ($("#pill option:selected").text())
    if (option === "Red Pill") {
      $.ajax({
        method: "GET",
        url: "/dispenseRedPill"
      })
      dispensePill();
    } else if (option === "Green Pill") {
      $.ajax({
        method: "GET",
        url: "/dispenseGreenPill"
      })
      dispenseGreenPill();
    }
  })

  $('#dispenseLaterForm').submit((event) => {
    event.preventDefault();
    let timeInput = {
      input: $('#timeInput').val(),
      pill: $("#pill option:selected").text()
    };
    $.ajax({
      method: 'POST',
      url: '/setTimer',
      contentType: 'application/json',
      data: JSON.stringify(timeInput)
    }).done(res => {
      // set pill count when done
      let option = ($("#pill option:selected").text())
      if (option === "Red Pill") {
        $('#red-count').text(res);
      } else if (option === "Green Pill") {
        $('#green-count').text(res);
      }
    })

    // timeInput parsed to moment
    timeInput = moment($('#timeInput').val(), "HH:mm");
    console.log(timeInput);
    if (timeInput < moment()) {
      //if input is earlier, set to timeInput to next day
      console.log("this timeInput is earlier than today");
      timeInput = timeInput.add(1, 'day');
    }

    // console log time input
    console.log(timeInput.format("dddd, MMMM Do YYYY, h:mm:ss a"));
    alert("Alarm set to " +  timeInput.format("dddd, MMMM Do YYYY, h:mm:ss a"))
  })

  $('#resetBtn').on('click', () => {
    resetPillCount();
  })

  setInterval( () => {
    // update time every second
    updateTime();
  }, 1000); 

  //update pill count on page load
  checkPillCount();
  checkGreenPillCount();
  updateTime();
})