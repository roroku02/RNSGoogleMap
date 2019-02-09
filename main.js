var map_default;
var map;
var marker;
var center_lat = '34.851747492179066';
var center_lng = '135.6176956788463';
var my_marker = [];
var marker_list;
var infoWindow;
var i = 0;
var value = [];
var kmlLayer = [];
var ai_kml = [         //安威川浸水域KMLデータ
    "https://dl.dropboxusercontent.com/s/05bfeortffnmpez/flooded_area_ai_river_1.kml",
    "https://dl.dropboxusercontent.com/s/kgqainjjs8eirkm/flooded_area_ai_river_2.kml",
    "https://dl.dropboxusercontent.com/s/yg7fmvjgusn0eu1/flooded_area_ai_river_3.kml",
    "https://dl.dropboxusercontent.com/s/586k8vuoqu8uvpc/flooded_area_ai_river_4.kml"
]
var LoadKMLbutton;

//カスタムマーカーのデフォルトアイコン
var default_icon;

function initMap() {
    //マップデフォルト位置設定（JR高槻駅）
    //map_default = new google.maps.LatLng(34.851747492179066, 135.6176956788463);
    map_default = { lat: 34.851747492179066, lng: 135.6176956788463 };
    //マップ表示
    map = new google.maps.Map(document.getElementById("map"), {
        center: map_default,
        zoom: 18
    });

    default_icon = new google.maps.MarkerImage('./img/custom_icon.png')

    //デフォルト位置マーカー
    /*marker = new google.maps.Marker({
        position: map_default,
        map: map,
        draggable: true     //ドラッグ可能
    });*/

    //デフォルトマーカードラッグ終了イベント
    /*google.maps.event.addListener(marker, 'dragend', function (event) {
        //alert(event.latLng.LatLng());
        center_lat = event.latLng.lat();
        center_lng = event.latLng.lng();
        streetView = new google.maps.StreetViewPanorama(
            document.getElementById('streetView'),{
                position:  new google.maps.LatLng(center_lat,center_lng),
                pov: {
                    heading: 34,
                    pitch: 10
                }
            }
        )
    });*/

    var streetView = new google.maps.StreetViewPanorama(
        document.getElementById('streetView'), {
            position: map_default,
            pov: {
                heading: 34,
                pitch: 10
            }
        }
    );

    map.setStreetView(streetView);

    /*for (let kml_load_count = 0; kml_load_count < ai_kml.length; kml_load_count++) {
        kmlLayer = new google.maps.KmlLayer({
            url: ai_kml[kml_load_count],
            suppressInfoWindows: true,
            map: map,
            preserveViewport: true
        });
        //KMLデータをマップに反映
        kmlLayer.setMap(map);
    }*/

    //KMLデータ読み込みボタン
    //ボタン生成
    LoadKMLButton = document.createElement('input');
    LoadKMLButton.id = "LoadKML";
    LoadKMLButton.type = "button";
    LoadKMLButton.value = "KMLデータ読み込み";
    LoadKMLButton.setAttribute('onclick', 'LoadKML("ai")');
    const text = document.createTextNode('KMLデータ読み込み');
    LoadKMLButton.appendChild(text);
    //ボタンをマップに追加
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(LoadKMLButton);


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
        attachMessage(my_marker[i],
            '<form id="title_form' + i + '" name="title_form">'
            + '<input id="marker_title' + i + '" class="marker_title_form" name="marker_title" type="text" placeholder="タイトルを入力">'
            + '<input type="text" style="display:none;" />'
            + '<button type="button" onclick="title_submit(' + i + ')">確定</button>'
            + '</form>'
            + '<br />'
            //マーカーの削除処理呼び出し
            + '<a href="#" onclick="clear_marker(' + i + ')">マーカーを削除</a>'
            + '<br>'
            + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon.png\')"><img src="./img/custom_icon.png"></a>'
            + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon2.png\')"><img src="./img/custom_icon2.png"></a>'
            + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon3.png\')"><img src="./img/custom_icon3.png"></a>'
            + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon4.png\')"><img src="./img/custom_icon4.png"></a>'
            + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon5.png\')"><img src="./img/custom_icon5.png"></a>'
            , i
        );
        marker_list = [i];
        marker_list[i] = { "marker_img": "", "marker_title": "" };
        $('.marker_list').append('<li id="marker_num' + i + '">マーカー' + i + '</li>');
        i++;
    });


}

//カスタムマーカーの削除
function clear_marker(num) {
    my_marker[num].setMap(null);
    my_marker[num] = null;
    marker_list.unshift(num);
    $('#marker_num' + num).remove();
};

//カスタムマーカーのアイコン変更
function changeIcon(num, icon) {
    var custom_icon = new google.maps.MarkerImage('./img/' + icon);
    my_marker[num].setIcon(custom_icon);
    marker_list[num].marker_img = "./img/" + icon;
    if ($('#marker_num' + num + '> img').length) {
        $('#marker_num' + num + '> img').replaceWith('<img src="./img/' + icon + '" />');
    } else {
        $('#marker_num' + num).prepend('<img src="./img/' + icon + '" />');
    }
}

//カスタムマーカーのメッセージ追加処理
function attachMessage(marker, msg, i) {
    var InfoWindow = new google.maps.InfoWindow({
        content: msg
    });
    google.maps.event.addListener(marker, 'click', function () {       //マーカーをクリックで展開
        InfoWindow.open(marker.getMap(), marker);
    });
    google.maps.event.addListener(InfoWindow, 'domready', function () {
        changeMessage(i);
    });
}

function title_submit(id) {
    console.log("OK");
    /* var title = document.getElementById(id);
    var input = document.title_form.marker_title.value;
    title.setAttribute('value', input);
    */
    var text = document.getElementById("marker_title" + id).value;
    if (text == "") {
        alert("タイトルが空白です");
        return false;
    }
    value[id] = text;
    marker_list[id].marker_title = text;
    $('#marker_num' + id).text(marker_list[id].marker_title);
}

function changeMessage(num) {
    $("#marker_title0").attr("value", value[num]);
    console.log($("#marker_title0"));
    //console.log(document.getElementById("marker_title" + num));
    //console.log(value[num]);
}

function current_icon(num, name) {
    var current_icon_path = my_marker[num].getIcon().url;
    var current_icon_name = current_icon_path.split('/').pop();
    if (current_icon_name == name) {
        console.log(current_icon_name + ' == ' + name + 'selected');
        return 'selected';
    } else { return '' };
}

function LoadKML(kasen_name) {
    console.log(kasen_name);
    default_icon = new google.maps.MarkerImage('./img/custom_icon.png')
    //KMLデータの読み込み
    for (let kml_load_count = 0; kml_load_count < ai_kml.length; kml_load_count++) {
        kmlLayer[kml_load_count] = new google.maps.KmlLayer({
            url: ai_kml[kml_load_count],
            suppressInfoWindows: true,
            map: map,
            preserveViewport: true
        });
        //KMLデータをマップに反映
        kmlLayer[kml_load_count].setMap(map);
        google.maps.event.addListener(kmlLayer[kml_load_count], 'click', function (event) {
            my_marker[i] = new google.maps.Marker({
                position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
                map: map,
                draggable: true,
                icon: default_icon
            });
            my_marker[i].setMap(map);

            //カスタムマーカーのメッセージ欄表示（マーカーをクリックで展開）
            attachMessage(my_marker[i],
                //【未完成】マーカータイトルの設定
                '<form onSubmit="title_submit(\'marker_title' + i + '\')" id="title_form" name="title_form">'
                + '<input id="marker_title' + i + '" name="marker_title" type="text" placeholder="タイトルを入力">'
                + '<input type="submit" value="確定">'
                + '</form>'
                + '<br />'
                //マーカーの削除処理呼び出し
                + '<a href="#" onclick="clear_marker(' + i + ')">マーカーを削除</a>'
                + '<br>'
                // 変更アイコンの選択リスト
                /** (TODO)現在のmarkerアイコンの取得とselectedの出力 **/
                //+ '<select id="select_icon' + i + '" onchange="changeIcon(' + i + ')">'
                //+ ' <option value="icon1" ' + current_icon(i, "custom_icon.png") + '>icon1</option>'
                //+ ' <option value="icon2" ' + current_icon(i, "custom_icon2.png") + '>icon2</option>'
                //+ '</select>'
                + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon.png\')"><img src="./img/custom_icon.png"></a>'
                + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon2.png\')"><img src="./img/custom_icon2.png"></a>'
                + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon3.png\')"><img src="./img/custom_icon3.png"></a>'
                + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon4.png\')"><img src="./img/custom_icon4.png"></a>'
                + '<a href="#" onclick="changeIcon(' + i + ',\'custom_icon5.png\')"><img src="./img/custom_icon5.png"></a>'
            );
            i++;
        });
    }
    console.log("OK");
}

$(function () {
    $('#menu p').click(function () {
        $(this).next('ul').slideToggle();
    });
});
window.onload = initMap();