var map_default;
var map;
var overlay;
var center_lat = '34.851747492179066';
var center_lng = '135.6176956788463';
var styles;
//カスタムマーカーのデフォルトアイコン
var default_icon;

var shelter;

//氾濫河川KML
var kml_url = {
    "ai": [
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/ai/1.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/ai/2.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/ai/3.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/ai/4.kml"
    ],
    "akuta": [
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/akuta/1.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/akuta/2.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/akuta/3.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/akuta/4.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/akuta/5.kml"
    ],
    "hio": [
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/hio/1.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/hio/2.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/hio/3.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/hio/4.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/hio/5.kml"
    ],
    "minase": [
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/minase/1.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/minase/2.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/minase/3.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/minase/4.kml"
    ],
    "nyoze": [
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/nyoze/1.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/nyoze/2.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/nyoze/3.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/nyoze/4.kml"
    ],
    "pref": [
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/pref/1.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/pref/2.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/pref/3.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/pref/4.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/pref/5.kml"
    ],
    "yodo": [
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/yodo/1.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/yodo/2.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/yodo/3.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/yodo/4.kml",
        "http://w3.hz.kutc.kansai-u.ac.jp/exp/city.takatsuki/hazard/sites/city.takatsuki/k/f/yodo/5.kml",
    ]
}

//カスタムカラー変数
var c_water = "#efefef";
var c_wide_road = "#eeeeee";
var c_narrow_road = "#eeeeee";

//問題
var question = [
    {
        "id": '001',
        "icon": "./img/custom_icon.png",
    },
    {
        "id": '002',
        "icon": "./img/custom_icon2.png",
    },
];

function initMap() {
    //マップデフォルト位置設定（JR高槻駅）
    //map_default = new google.maps.LatLng(34.851747492179066, 135.6176956788463);
    map_default = { lat: 34.851747492179066, lng: 135.6176956788463 };
    //マップ表示
    map = new google.maps.Map(document.getElementById("map"), {
        center: map_default,
        zoom: 15,
    });
    overlay = new google.maps.OverlayView();
    overlay.draw = function () { };
    overlay.setMap(map);

    generateQuestion(question);
}

function LoadJSON(path) {   //改修中
    var result;     //?
    var request = new XMLHttpRequest();
    request.open('GET', path);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        result = request.response;
    }

    return result;
}

function LoadDefaultStyle() {
    $.getJSON('./MapStyle.json', function (style) {
        styles = style;
    });
    map.setOptions({ styles: styles });
}

function LoadCSV(file_path) {
    var request = new XMLHttpRequest();
    request.open('GET', file_path, true);
    request.responseType = 'csv';
    request.send();

    var result = [];
    request.onload = function () {
        var tmp = request.responseText.split('\n');

        for (var i = 0; i < tmp.length; i++) {
            result[i] = tmp[i].split(',');
        }
    }
    return result;
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

//KMLファイル
function setKML(kasen) {
    for (var i = 0; i < kml_url[kasen].length; i++) {
        kmlLayer = new google.maps.KmlLayer({
            url: kml_url[kasen][i],
            suppressInfoWindows: true,
            map: map,
            preserveViewport: true
        });

        //KMLデータをマップに反映
        kmlLayer.setMap(map);
    }
}

function generateQuestion(data) {
    for (var i = 0; i < data.length; i++) {
        if (!data[i].id) break;
        var content = '<li><img data-id="' + data[i].id + '" src=" ' + data[i].icon + '"/ class="dragicon"></li>';
        $('#question_drag').append(content);
    }
    //JQ UIのドラッグ機能利用
    $('.dragicon').draggable({
        stop: function (e, ui) {
            var index = question.itemIndex('id', $(this).data('id'));
            dragIn(e, this, index);
        }
    });
}

//配列内のインデックスを返す
Array.prototype.itemIndex = function (key, item) {
    for (i = 0; i < this.length; i++) {
        if (this[i][key] == item) {
            return i;
        }
    }
    return -1;
};

function dragIn(e, icon, index) {
    //ドラッグエンド時のマウス位置を取得（ピクセル単位）
    var x = e.pageX - $('#map').offset().left;
    var y = e.pageY;
    if (x > 0) {
        var point = new google.maps.Point(x, y);
        //ドラッグエンド位置のピクセルをGoogleMaps上の緯度経度に変換
        var position = overlay.getProjection().fromContainerPixelToLatLng(point);
        question[index].mapPosition = [position.lat(), position.lng()];
        //GoogleMapsMarkerに変換
        generateMarker(question, true);

        //GoogleMapsMarkerに変換後，JQのアイコンは元位置に戻す
        $(icon).attr('style', 'position: relative; left: 0; top: 0;');
    }
}

function generateMarker(data, drag) {
    for (const i in data) {
        if (data[i].mapPosition) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(data[i].mapPosition[0], data[i].mapPosition[1]),
                map: map,
                draggable: drag,
                icon: {
                    url: data[i].icon,
                },
            });
        }
        if (data[i].lat) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(data[i].lat, data[i].lng),
                map: map,
                draggable: drag,
            });
        }
    }
}

function displayShelter() {
    $.getJSON('./data/shelter_list.json', function (json) {
        shelter = json;
    });
    generateMarker(shelter, false);     //ここでスタック
}

LoadDefaultStyle();