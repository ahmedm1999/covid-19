fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=4565750e398544928fa219fa59b25024").then(function(response) {
    return response.json();
}).then(function(json) {
    var data = json;
    document.getElementById("userCountry").innerHTML = data["country"];
    document.getElementById("userCountryFlag").setAttribute("src", "https://www.countryflags.io/"+data["country_code"]+"/flat/64.png");
    document.getElementById("countryDetails").setAttribute("href", "country.html?name="+data["country"]);
    fetch("https://coronavirus-19-api.herokuapp.com/countries/"+data["country"]).then(function(response) {
        return response.json();
    }).then(function(json) {
        var stats = json;
        document.getElementById("totalCases").innerHTML = stats["cases"];
        document.getElementById("activeCases").innerHTML = stats["active"];
        document.getElementById("todayCases").innerHTML = stats["todayCases"];
        document.getElementById("todayDeaths").innerHTML = stats["todayDeaths"];
    });
});


let copy = document.getElementById('copy') ;
let date = new Date() ;
copy.innerHTML = date.getFullYear() ;

const drop = document.getElementById('drop') ;
const open_drop = () => {
    drop.style.top = '0px' ;
} 
const close_drop = () => {
    drop.style.top = '-200%' ;
}
window.addEventListener('scroll', close_drop) ;