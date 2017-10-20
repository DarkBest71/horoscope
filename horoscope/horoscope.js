exports.action = function(data, callback, config, SARAH){

 // CONFIG
  config = config.modules.horoscope;
  if (!config.signe){
    console.log("horoscope config missing");
    callback({ 'tts': "J'ai besoin de ton signe pour prédire l'avenir. Renseigne le dans le fichier de propriété" });
    return;
  }
  
  var signe = config.signe;
  var url = 'http://www.horoscope-gratuit.org/horoscope-'+signe+'.php';
  
  var request = require('request');
  request({ 'uri' : url }, function (err, response, body){
    
    if (err || response.statusCode != 200) {
      callback({'tts': "Je n'arrive pas à prédire ton avenir"});
      return;
    }
    var $ = require('cheerio').load(body, { xmlMode: true, ignoreWhitespace: false, lowerCaseTags: false });
	var = $('div:nth-child(1)').text();
	callback({ 'tts': " "});
  
  });
}
