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
        attachMassage(my_marker[i],
            //マーカーの削除処理呼び出し
            '<a href="#" onclick="clear_marker(' + i + ')">マーカーを削除</a>'
            + '<br>'
            // 変更アイコンの選択リスト
            + '<select id="select_icon' + i + '" onchange="changeIcon(' + i + ')">'
            + ' <option value="icon1">icon1</option>'
            + ' <option value="icon2">icon2</option>'
            + '</select>'
        );
    });
}

//カスタムマーカーの削除
function clear_marker(num) {
    my_marker[num].setMap(null);
    my_marker[num] = null;
};

//カスタムマーカーのアイコン変更
function changeIcon(num) {
    var selected_icon = document.getElementById('select_icon' + num).value;
    console.log('id => select_icon' + num + '::' + selected_icon);      //ログに変更IDと選択アイコンを出力（デバッグ用）
    if (selected_icon == 'icon1') {
        var custom_icon = new google.maps.MarkerImage('./img/custom_icon.png');
    } else if (selected_icon == 'icon2') {
        custom_icon = new google.maps.MarkerImage('./img/custom_icon2.png');
    } else alert('予期せぬエラー');
    //marker.getIcon().urlで現在のmarkerアイコンURL取得を取得
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