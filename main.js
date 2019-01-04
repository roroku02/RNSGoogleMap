var map_default;
var map;
var marker;
var my_marker = [];
var infoWindow;
var i = 0;

function initMap() {
    map_default = new google.maps.LatLng(35.01, 135.867);

    map = new google.maps.Map(document.getElementById("map"), {
        center: map_default,
        zoom: 18
    });

    marker = new google.maps.Marker({
        position: map_default,
        map: map,
        draggable: true
    });


    google.maps.event.addListener(marker, 'dragend', function (event) {
        alert(event.latLng.lat() + '\n' + event.latLng.lng());
    });

    google.maps.event.addListener(map, 'click', function (event) {
        i++;
        my_marker[i] = new google.maps.Marker({
            position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
            map: map,
            draggable: true
        });

        infoWindow = new google.maps.InfoWindow({
            content: '<a href="#" onclick="clear_marker(' + i + ')">マーカーを削除</a>'
        });
        my_marker[i].setMap(map);

        my_marker[i].addListener('click', function () {
            infoWindow.open(map, my_marker[i]);
        });

        google.maps.event.addListener(my_marker[i], 'dragend', function (event) {
            alert(event.latLng.lat() + '\n' + event.latLng.lng());
        });
    });

}

function clear_marker(num) {
    my_marker[num].setMap(null);
};
window.onload = initMap();