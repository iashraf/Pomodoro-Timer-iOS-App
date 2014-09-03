function timestamp() {
	return moment().format('YYYY-MM-DD HH:mm:ss');
}

exports.info = function(str) {
	Ti.API.info(timestamp() + ': ' + str);
};

exports.warn = function(str) {
	Ti.API.warn(timestamp() + ': ' + str);
};

exports.error = function(str) {
	Ti.API.error(timestamp() + ': ' + str);
};

exports.debug = function(str) {
	Ti.API.debug(timestamp() + ': ' + str);
};

exports.memory = function() {
	Ti.API.info('Available memory: ' + Math.round( Ti.Platform.availableMemory ));
};

exports.properties = function(){
	var props = Ti.App.Properties.listProperties();
	for (var i = 0, ilen = props.length; i < ilen; i++){
		var value = Ti.App.Properties.getString(props[i]);
		Ti.API.info("Property: " + props[i] + ' = ' + value);
	}
};