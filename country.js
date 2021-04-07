function showData(c) {
    document.title = c+"'s statistics";
    fetch("https://coronavirus-19-api.herokuapp.com/countries/"+c).then(function(response) {
        return response.json();
    }).then(function(json) {
        var retrieved = json;
        console.log(retrieved) ;
        document.getElementById("countryName").innerHTML = c;
        document.getElementById("total").innerHTML = retrieved["cases"];
        document.getElementById("todayCases").innerHTML = retrieved["todayCases"];
        document.getElementById("deaths").innerHTML = retrieved["deaths"];
        document.getElementById("todayDeaths").innerHTML = retrieved["todayDeaths"];
        document.getElementById("active").innerHTML = retrieved["active"];
        document.getElementById("recovered").innerHTML = retrieved["recovered"];
        document.getElementById("critical").innerHTML = retrieved["critical"];
        document.getElementById("totalTests").innerHTML = retrieved["totalTests"];
        document.getElementById("TPM").innerHTML = retrieved["testsPerOneMillion"];
        document.getElementById("DPM").innerHTML = retrieved["deathsPerOneMillion"];
        document.getElementById("CPM").innerHTML = retrieved["casesPerOneMillion"];
    });
    countryFlag(c) ;
}

function countryFlag(coun) {
    fetch("https://restcountries.eu/rest/v2/name/"+coun).then(function(resp) {
        return resp.json() ;
    }).then(function(json) {
        var img = `<img src="${json[0].flag}" width="100"/>` ;
        document.getElementById('countryFlag').innerHTML = img ;
    })
}