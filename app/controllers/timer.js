Ti.include("lib/stepper.js");
Ti.include("lib/countdown.js");

var win = $.timer;

var alarm = Ti.App.Properties.getString("alarm", "Keys");

// get arguments passed in
var args = arguments[0] || {};

var timer_started = false;
var timer_duration = args.timer_duration;

/*
	DURATION STEPPER
*/
var duration_stepper = new Stepper(timer_duration, 60);
$.labelStepper.text = timer_duration;

$.btnStepperUp.addEventListener("singletap", function(e) {
	duration_stepper.up();
	timer_duration = duration_stepper.getValue();
	$.labelStepper.text = timer_duration;
	if (timer_duration > 1) {
		$.labelMetric.text = "minutes";
	}
});

$.btnStepperDown.addEventListener("singletap", function(e) {
	duration_stepper.down();
	timer_duration = duration_stepper.getValue();
	$.labelStepper.text = timer_duration;
	if (timer_duration < 2) {
		$.labelMetric.text = "minute";
	}
});

$.btnTimerAction.addEventListener("singletap", function(e) {
	if (!timer_started) {
		start_timer();
	} else {
		stop_timer();
	}
});

/*
	COUNTDOWN TIMER
*/

$.labelCountdown.hide();

var timer = null;
var alert_sound = Ti.Media.createSound({
	allowBackground: true,
	volume: 1.0,
	looping: true
});

Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;

var kill_timer = function() {
	clearInterval(timer);
	timer = null;
};

var start_timer = function() {
	kill_timer();
	var time_gone_over_label = "";
	var countdown_to = new Date(moment().add("minutes", timer_duration));
	timer =
		countdown(
			countdown_to,
			function(timespan){

				$.labelCountdown.show();
				$.labelCountdown.text = time_gone_over_label + timespan;

				if (timespan.minutes === 0 && timespan.seconds === 0) {
					// sound the alarm!
					alert_sound.url = "sounds/" + alarm + ".mp3";
					alert_sound.play();
				}

				if (timespan.end > countdown_to && time_gone_over_label === "") {
					// time has ran out and the timer is counting over
					time_gone_over_label = "over by ";
				}

			},
			countdown.MINUTES|
			countdown.SECONDS
		);
	timer_started = true;
	$.btnTimerAction.title = "Stop";
	$.stepperContainer.hide();
	$.labelCountdown.show();
};

var stop_timer = function() {
	alert_sound.stop();
	kill_timer();
	timer_started = false;
	$.btnTimerAction.title = "Start timer";
	$.stepperContainer.show();
	$.labelCountdown.hide();
};

/*
	BACK BUTTON
*/
$.btnBack.addEventListener("singletap", function(e) {
	alert_sound.stop();
	win.close();
});

/*
	CHOOSE ALARM
*/
$.alarmPickerContainer.hide();

$.btnAlarm.addEventListener("singletap", function(e) {
	$.alarmPickerContainer.show();
});

$.alarmPicker.addEventListener("change", function(e){
	alarm = e.row.title;
	var preview_alert_sound = Ti.Media.createSound({
		url: "sounds/" + alarm + ".mp3",
		allowBackground: true,
		volume: 1.0,
		looping: false
	});
	preview_alert_sound.play();
});

$.btnSaveAlarm.addEventListener("singletap", function(e) {
	Ti.App.Properties.setString("alarm", alarm);
	$.alarmPickerContainer.hide();
});