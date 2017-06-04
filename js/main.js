$(function() {
    var lat,
        lon,
        city,
        temp,
        icon,
        pic,
        digi,
        weatherAPI;

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(pos){

            //get geolocation
            lat = pos.coords.latitude.toFixed(4);
            lon = pos.coords.longitude.toFixed(4);
            weatherAPI = `https://api.apixu.com/v1/current.json?key=0798747ebcf44be8bd7142308170406&q=${lat},${lon}`;

            //get weather info
            $.getJSON(weatherAPI, function(data) {

                //get city name
                city = `${data.location.region}, ${data.location.country}`;
                $("#location>p").text(city);

                //get temperature
                digi = data["current"]["temp_c"];
                temp = `${data["current"]["temp_c"]} °C`;
                $("#digital").text(temp);

                //get picture
                icon = `${data.current.condition.icon}`;
                pic = "img/" + icon.slice(16);
                $("#icon").attr("src",pic);

            });
        })
    }

    //change temperature unit
    $("#digital").click(function(){
        if (temp.indexOf("C")>0){
            digi = 9 / 5 * digi + 32;
            temp = digi.toFixed(0) + " °F";
            $("#digital").text(temp);
        }else{
            digi = 5/9 * (digi - 32);
            temp = digi.toFixed(0) + " °C";
            $("#digital").text(temp);
        }
    });
});
