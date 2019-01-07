var map_default;
var map;
var marker;
var my_marker = [];
var infoWindow;
var i = 0;
var KmlLayer;
var ai_kml = [         //安威川浸水域KMLデータ
    "https://dl.dropboxusercontent.com/s/05bfeortffnmpez/flooded_area_ai_river_1.kml",
    "https://dl.dropboxusercontent.com/s/kgqainjjs8eirkm/flooded_area_ai_river_2.kml",
    "https://dl.dropboxusercontent.com/s/yg7fmvjgusn0eu1/flooded_area_ai_river_3.kml",
    "https://dl.dropboxusercontent.com/s/586k8vuoqu8uvpc/flooded_area_ai_river_4.kml"
]
var LoadKMLbutton;

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

    LoadKMLbutton = document.getElementById('LoadKML');
    LoadKMLbutton.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(LoadKMLbutton);
    google.maps.event.addDomListener(LoadKMLbutton, 'click', function () {
        //KMLデータの読み込み
        for (let kml_load_count = 0; kml_load_count < ai_kml.length; kml_load_count++) {
            kmlLayer = new google.maps.KmlLayer({
                url: ai_kml[kml_load_count],
                suppressInfoWindows: true,
                map: map,
                preserveViewport: true
            });
            //KMLデータをマップに反映
            kmlLayer.setMap(map);
        }
        google.maps.event.addListener(KmlLayer, 'click', function (event) {
            my_marker[i] = new google.maps.Marker({
                position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
                map: map,
                draggable: true,
                icon: default_icon
            });
            my_marker[i].setMap(map);

            //カスタムマーカーのメッセージ欄表示（マーカーをクリックで展開）
            attachMassage(my_marker[i],
                //マーカーの削除処理呼び出し
                '<a href="#" onclick="clear_marker(' + i + ')">マーカーを削除</a>'
                + '<br>'
                // 変更アイコンの選択リスト
                /** (TODO)現在のmarkerアイコンの取得とselectedの出力 **/
                //+ '<select id="select_icon' + i + '" onchange="changeIcon(' + i + ')">'
                //+ ' <option value="icon1" ' + current_icon(i, "custom_icon.png") + '>icon1</option>'
                //+ ' <option value="icon2" ' + current_icon(i, "custom_icon2.png") + '>icon2</option>'
                //+ '</select>'
                + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon.png\')"><img src="./img/custom_icon.png"></a>'
                + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon2.png\')"><img src="./img/custom_icon2.png"></a>'
            );
            i++;
        });
    });


    //任意の位置をクリックしてカスタムマーカーを表示
    google.maps.event.addListener(map, 'click', function (event) {
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
            /** (TODO)現在のmarkerアイコンの取得とselectedの出力 **/
            //+ '<select id="select_icon' + i + '" onchange="changeIcon(' + i + ')">'
            //+ ' <option value="icon1" ' + current_icon(i, "custom_icon.png") + '>icon1</option>'
            //+ ' <option value="icon2" ' + current_icon(i, "custom_icon2.png") + '>icon2</option>'
            //+ '</select>'
            + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon.png\')"><img src="./img/custom_icon.png"></a>'
            + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon2.png\')"><img src="./img/custom_icon2.png"></a>'
        );
        i++;
    });


}

//カスタムマーカーの削除
function clear_marker(num) {
    my_marker[num].setMap(null);
    my_marker[num] = null;
};

//カスタムマーカーのアイコン変更
function changeIcon(num, icon) {
    /*var selected_icon = document.getElementById('select_icon' + num).value;
    console.log('id => select_icon' + num + '::' + selected_icon);      //ログに変更IDと選択アイコンを出力（デバッグ用）
    if (selected_icon == 'icon1') {
        var custom_icon = new google.maps.MarkerImage('./img/custom_icon.png');
    } else if (selected_icon == 'icon2') {
        custom_icon = new google.maps.MarkerImage('./img/custom_icon2.png');
    } else alert('予期せぬエラー');
    //marker.getIcon().urlで現在のmarkerアイコンURL取得を取得
    my_marker[num].setIcon(custom_icon);*/
    var custom_icon = new google.maps.MarkerImage('./img/' + icon);
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

function current_icon(num, name) {
    var current_icon_path = my_marker[num].getIcon().url;
    var current_icon_name = current_icon_path.split('/').pop();
    if (current_icon_name == name) {
        console.log(current_icon_name + ' == ' + name + 'selected');
        return 'selected';
    } else { return '' };
}

window.onload = initMap();