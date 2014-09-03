Alloy.Globals.navGroup = $.navgroup;

$.btnTimerPomodoro.addEventListener('singletap', function() {
	Alloy.Globals.openNewWindow('timer', {
		timer_duration: 25
	});
});

$.btnTimerShortBreak.addEventListener('singletap', function() {
	Alloy.Globals.openNewWindow('timer', {
		timer_duration: 5
	});
});

$.btnTimerLongBreak.addEventListener('singletap', function() {
	Alloy.Globals.openNewWindow('timer', {
		timer_duration: 15
	});
});

// Alloy.Globals.navGroup.open();

Alloy.Globals.navGroup.open({
	transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});