var map_default;
var map;
var marker;
var center_lat = '34.851747492179066';
var center_lng = '135.6176956788463';
var styles;
//カスタムマーカーのデフォルトアイコン
var default_icon;

//カスタムカラー変数
var c_water = "#efefef";
var c_wide_road = "#eeeeee";
var c_narrow_road = "#eeeeee";


function initMap() {
    //マップデフォルト位置設定（JR高槻駅）
    //map_default = new google.maps.LatLng(34.851747492179066, 135.6176956788463);
    map_default = { lat: 34.851747492179066, lng: 135.6176956788463 };
    //マップ表示
    map = new google.maps.Map(document.getElementById("map"), {
        center: map_default,
        zoom: 15,
    });
}

function LoadDefaultStyle() {
    var request = new XMLHttpRequest();
    request.open('GET', './MapStyle.json');
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        styles = request.response;
    }

    map.setOptions({ styles: styles });
}

function changeMap(type, color, MapType) {
    if (type == 'water')
        c_water = color;
    else if (type == 'wide_road')
        c_wide_road = color;
    else if (type == 'narrow_road')
        c_narrow_road = color;
    map.setOptions({ styles: styles[MapType] });
}

function changeMap0(MapType) {
    map.setOptions({ styles: styles[MapType] });
}


var newData, changeData;    //デバッグのためにグローバル変数化
function changeColor(type, color) {
    switch (type) {
        case "river":
            newData = styles.filter(function (item) {
                if (item.featureType != "water" || item.elementType != "all") return true;
            });
            changeData = styles.filter(function (item) {
                if (item.featureType == "water" && item.elementType == "all") return true;
            });

            changeData[0].stylers = [{ "color": color }, { "visibility": "on" }];
            break;

        case "wide_road":
            newData = styles.filter(function (item) {
                if (item.featureType != "road.highway" || item.elementType != "geometry") return true;
                if (item.featureType != "road.arterial" || item.elementType != "geometry") return true;
            });
            changeData = styles.filter(function (item) {
                if (item.featureType == "road.highway" && item.elementType == "geometry") return true;
                if (item.featureType == "road.arterial" && item.elementType == "geometry") return true;
            });

            for (var i = 0; i < changeData.length; i++) {
                changeData[i].stylers = [{ "color": color }];
            }
            break;

        case "narrow_road":
            newData = styles.filter(function (item) {
                if (item.featureType != "road.local" || item.elementType != "geometry.fill") return true;
            });
            changeData = styles.filter(function (item) {
                if (item.featureType == "road.local" && item.elementType == "geometry.fill") return true;
            });

            changeData[0].stylers = [{ "color": color }];
            break;
    }

    newData.push(changeData[0]);

    styles = newData;

    map.setOptions({ styles: styles });
}

LoadDefaultStyle();
