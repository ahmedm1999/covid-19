fetch("https://coronavirus-19-api.herokuapp.com/all").then(function(response) {
    return response.json();
}).then(function(json) {
    var world = json;
    var canvas = document.getElementById('totalChart');
    var ctx = canvas.getContext('2d');

    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontSize = 16;

    var data = {
        labels: ["Total Cases", "Total Deaths", "Recovered Cases"],
        datasets: [
            {
                fill: true,
                backgroundColor: [
                    '#8638a6',
                    '#e2a03f',
                    '#2196f3'
                ],
                data: [world["cases"], world["deaths"], world["recovered"]],
                borderColor:	['transparent', 'transparent'],
                borderWidth: [0,0,0]
            }
        ]
    },
    options = {
        animation: true,
        responsive: false,
        maintainAspectRatio: false
    };
    var myBarChart = new Chart(ctx, {
        type: 'pie',
        data: data,
    });
});
function Percentage(pop, cases, flag) {
    this.pop = pop ;
    this.per = Math.ceil(cases/pop * 100) ;
    this.flag = flag ;
}
function showData(c) {
    var statistics = $('#statistics').DataTable({
        "order": [[ 1, "desc" ]]
    });
    var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","UAE","UK","USA","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    for(var i = 0; i < countries.length; i++) {
        fetch("https://coronavirus-19-api.herokuapp.com/countries/"+countries[i]).then(function(response) {
            return response.json();
        }).then(function(json) {
            var data = json;
            fetch("https://restcountries.eu/rest/v2/name/"+data["country"]).then(function(resp) {
                return resp.json() ;
            }).then(function(json) {
                if(data["country"] == 'India') {
                    var __per = new Percentage(1295210000, data["cases"], json[0].flag) ;
                    return __per ;
                } else {
                    var __per = new Percentage(json[0].population, data["cases"], json[0].flag) ;
                    return __per ;
                }
            }).then(function(per){
                statistics.row.add([`<img src="${per.flag}" width="50"/>`, data["country"], per.pop, data["cases"], data["todayCases"], data["deaths"], data["todayDeaths"], data["recovered"], `${per.per}%`, '<a class="btn btn-primary text-white" href="country.html?name='+data["country"]+'">View</a>']);
                statistics.draw();
            })
        });
    }
}
const drop = document.getElementById('__drop') ;
const __open_drop = () => {
    __drop.style.top = '0px' ;
} 
const __close_drop = () => {
    __drop.style.top = '-200%' ;
}
window.addEventListener('scroll', __close_drop) ;