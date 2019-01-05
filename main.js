var map_default;
var map;
var marker;
var my_marker = [];
var infoWindow;
var i = 0;

function initMap() {
    //マップデフォルト位置設定（JR高槻駅）
    map_default = new google.maps.LatLng(34.851747492179066, 135.6176956788463);

    //マップ表示
    map = new google.maps.Map(document.getElementById("map"), {
        center: map_default,
        zoom: 18
    });

    //デフォルト位置マーカー
    marker = new google.maps.Marker({
        position: map_default,
        map: map,
        draggable: true     //ドラッグ可能
    });

    //デフォルトマーカードラッグ終了イベント
    google.maps.event.addListener(marker, 'dragend', function (event) {
        alert(event.latLng.lat() + '\n' + event.latLng.lng());
    });

    //カスタムマーカーのデフォルトアイコン
    var default_icon = new google.maps.MarkerImage('./img/custom_icon.png');

    //任意の位置をクリックしてカスタムマーカーを表示
    google.maps.event.addListener(map, 'click', function (event) {
        i++;
        my_marker[i] = new google.maps.Marker({
            position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
            map: map,
            draggable: true,
            icon: default_icon
        });
        my_marker[i].setMap(map);

        //カスタムマーカードラッグ終了イベント
        google.maps.event.addListener(my_marker[i], 'dragend', function (event) {
            //alert(event.latLng.lat() + '\n' + event.latLng.lng());
        });

        //カスタムマーカーのメッセージ欄表示（マーカーをクリックで展開）
        attachMassage(my_marker[i], '<a href="#" onclick="clear_marker(' + i + ')">マーカーを削除</a><br><a href="#" onclick="changeIcon(' + i + ')">アイコン変更</a>');
    });
}

//カスタムマーカーの削除
function clear_marker(num) {
    my_marker[num].setMap(null);
    my_marker[num] = null;
};

//カスタムマーカーのアイコン変更
function changeIcon(num) {
    var custom_icon = new google.maps.MarkerImage('./img/custom_icon2.png');
    my_marker[num].setIcon(custom_icon);
}

//カスタムマーカーのメッセージ追加処理
function attachMassage(marker, msg) {
    google.maps.event.addListener(marker, 'click', function () {       //マーカーをクリックで展開
        new google.maps.InfoWindow({
            content: msg
        }).open(marker.getMap(), marker);
    });
}

window.onload = initMap();