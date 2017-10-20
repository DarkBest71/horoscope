exports.action = function(data, callback, config, SARAH){

 // CONFIG
  config = config.modules.horoscope;
  if (!config.signe){
    console.log("horoscope config missing");
    callback({ 'tts': "J'ai besoin de ton signe pour prédire l'avenir. Renseigne le dans le fichier de propriété" });
    return;
  }
  
  var signe = config.signe;
  var url = 'http://horoscope.20minutes.fr/horoscope-jour-'+signe;
  var request = require('request');
  request({ 'uri' : url }, function (err, response, body){
    
    if (err || response.statusCode != 200) {
      callback({'tts': "Je n'arrive pas à prédire ton avenir"});
      return;
    }
		
		var $ = require('cheerio').load(body, { xmlMode: true, ignoreWhitespace: false, lowerCaseTags: false });
		txt  = getRandomVdm($);
		console.log(txt);
		callback({'tts': txt});
		return;
  
  });
}else {
	callback({'tts': txt});
}
exports.action = action;

  // ------------------------------------------
  //  SCRAPING
  // ------------------------------------------

var getRandomVdm = function($){
  vdm = $('p.block').first().find('a').text();
  // On remplace le VDM pour la lecture
  return vdm.replace(/vdm/gi, ", horoscope.");
}