var moment = require("alloy/moment");
var log    = require("lib/log");

Ti.App.idleTimerDisabled = true;// dont dim (& lock) the phone screen

var osname          = Ti.Platform.osname;
var osversion       = Ti.Platform.version;
var OSVersionSimple = osversion.charAt(0);// either "6" or "7", etc.
var osmodel         = Ti.Platform.model;
var isIPhone        = (osname === 'iphone');
var isIPad          = (osname === 'ipad');
var isIOS           = (isIPhone || isIPad);
var isSimulator     = (osmodel === 'Simulator' || osmodel.indexOf('sdk') !== -1);

log.memory();
log.info("osname " + osname);
log.info("osversion " + osversion);
log.info("osmodel " + osmodel);

Alloy.Globals.OpenSans = "Open Sans";

Alloy.Globals.topMargin = "0dp";
if (OSVersionSimple === "7") {
	Alloy.Globals.topMargin = "20dp";
}

Alloy.Globals.openNewWindow = function(controller, data) {
	var win = Alloy.createController(controller, data).getView();
	Alloy.Globals.navGroup.openWindow(win);
};