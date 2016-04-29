var fetch = require('node-fetch');

function ehecatlCore(callback) {
    var aireUrl = "http://www.aire.df.gob.mx/default.php";

    fetch(aireUrl)
        .then(function(res) {
            return res.text();
        })
        .then(function(body) {
            //console.log(body);
            var salidas = JSON.stringify(body.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/i, "_").replace(/'/i, "-"));

            var calidadDelAireDivId = "iconos-recomendaciones-calidad-aire";
            var indiceUVImgId = "iconos-uv";

            var calidadIdx = salidas.indexOf(calidadDelAireDivId) + calidadDelAireDivId.length + 1;
            var indiceIdx = salidas.indexOf(indiceUVImgId) + indiceUVImgId.length + 1;

            var calidadRegExp = /.*(.png)/gi;
            var indiceRegExp = /(\d)+/gi;

            var calidadFragmentStr = salidas.slice(calidadIdx, calidadIdx + 10);
            var indiceFragmentStr = salidas.slice(indiceIdx, indiceIdx + 10);

            var calidadHelper = calidadFragmentStr.match(calidadRegExp);
            var calidadHelperMatchedZero = calidadHelper[0].match(calidadRegExp)[0];

            var calidadResult = calidadHelperMatchedZero.slice(0, calidadHelperMatchedZero.indexOf("."));
            var indiceResult = indiceFragmentStr.match(indiceRegExp)[0];

            //console.log("Calidad del aire:", calidadResult);
            //console.log("Indice UV:", indiceResult);

            var outputObj = {
                calidad: "Calidad del aire: " + calidadResult,
                indice: "Indice UV: " + indiceResult
                , publico: (indiceResult > 5) ? "@channel:" : ""
            };

            console.log(outputObj);
            callback(outputObj);

        });
}

module.exports = ehecatlCore;
