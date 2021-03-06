
// @private
// Note: name is prefixed by "agent:" and can't contain spaces
//       (because it's transformed in a Backbone event in the Panel)
var sendAppComponentReport = function(name, report) {
    // the timestamp is tipicaly used by the panel to exclude old reports
    report.timestamp = new Date().getTime();

    sendMessage({
        name: "agent:"+name,
        data: report
    });
};



