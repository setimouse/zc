import { Platform } from "react-native";
import { mapUrlPrefix, baseURL } from "../../webserve/http_config";

const fmmapScript = `
<script>
  var ready = false;
  var oriCenter = {};
  if (window.postMessage === undefined) {
    window.postMessage = (data) => {
      window.ReactNativeWebView.postMessage(data)
    }
  }

  function reloadFloor() {
    var floor = indoorMap.getFloor(indoorMap.getLevel());
    floor.traverse((fm) => {
      if (fm.type === fengmap.FMType.EXTENT_LAYER) {
        fm.visible = false;
      }
    })
  }

  //生成自定义视图模式切换按钮
  function renderViewModeBtn() {
    console.log('viewMode', map.getViewMode())
    let mapEl = document.querySelector('.fm-control-groups')
    console.log(mapEl);
    let viewModeDom = document.createElement("div");
    viewModeDom.id = 'customViewMode'
    viewModeDom.classList.add('fm-view');
    viewModeDom.style = 'width: 36px; height: 36px;'
    mapEl.appendChild(viewModeDom);
    function renderText() {
      let el = document.querySelector('#customViewMode')
      el.innerHTML = map.getViewMode() == fengmap.FMViewMode.MODE_3D
        ? '2D' : '3D';
    }
    renderText()
    viewModeDom.addEventListener('touchstart', () => {
      const viewMode = map.getViewMode() == fengmap.FMViewMode.MODE_2D
        ? fengmap.FMViewMode.MODE_3D : fengmap.FMViewMode.MODE_2D
      map.setViewMode({
        mode: viewMode,
        finish: () => {
          renderText()
        }
      })
    })
  }

  map.on('buildingEntered', (event) => {
    console.log('buildingEntered')
    setTimeout(() => {
      renderViewModeBtn()
    }, 500);
  })

  map.on('buildingExited', (event) => {
    console.log('buildingExited')
    setTimeout(() => {
      renderViewModeBtn()
    }, 500);
  })

  map.on('loaded', function() {
    var scrollFloorCtlOpt = {
      position: fengmap.FMControlPosition.RIGHT_TOP,
      floorButtonCount: 3,
      offset: {
          x: {{floorControlPositionX}},
          y: {{floorControlPositionY}}
      },
      viewModeControl: false,
      floorModeControl: true,
      needAllLayerBtn: true,
      entranceIcon: true,
    };
    var scrollFloorControl = new fengmap.FMToolbar(scrollFloorCtlOpt);
    scrollFloorControl.addTo(map)

    renderViewModeBtn()

    ready = true;
    oriCenter = map.getCenter()
    window.ReactNativeWebView.postMessage("mapready")
    // setMarkers(deviceList)
    map.pickFilterFunction = function (event) {
      if (event.type == fengmap.FMType.DYNAMIC_MODEL_MARKER) {
        return true;
      }
    }

    document.querySelector('.fm-floor-list').style.height = (parseInt(document.querySelector('.fm-floor-list').style.height) - 2) + 'px'

    // var scrollZoomCtlOpt = {
    //   position: fengmap.FMControlPosition.RIGHT_BOTTOM,
    //   offset: {
    //     x: {{zoomControlPositionX}},
    //     y: {{zoomControlPositionY}},
    //   },
    // };
    // var toolbar = new fengmap.FMZoomBar(scrollZoomCtlOpt);
    // toolbar.addTo(map)

    // reloadFloor()
  });

  var devices = {}
  function addMarker(device) {
    try {
      const consumerTypeIcon = device.consumerTypeIcon;
      device.fengGLBIcon = consumerTypeIcon;
      if (consumerTypeIcon != null) {
        device.fengGLBIcon = '{{baseURL}}'
          + "/static/images/pages/"
          // ""
          + consumerTypeIcon.substring(consumerTypeIcon.lastIndexOf('/'), consumerTypeIcon.lastIndexOf('.')).substring(1)
          + "_model" + ".glb";
      }
      window.ReactNativeWebView.postMessage("glb icon: " + device.fengGLBIcon)
      /*
      var marker = new fengmap.FMImageMarker({
        url: 'https://developer.fengmap.com/fmAPI/images/blueImageMarker.png',
        x: device.x,
        y: device.y
      });
      /*/
      const maxLength = 15
      let markerText = device.consumerName ? device.consumerName : device.deviceId
      markerText = markerText.length > maxLength ? markerText.substr(0, maxLength) + '...' : markerText
      var combineMarker = [
        new fengmap.FMDynamicModel({
          url: device.fengGLBIcon,
          // url: imageurl,
          id: 'uuid',
          // height: device.consumerEntityExtend && device.consumerEntityExtend.height || 1,
          height: 0,
          scale: device.consumerEntityExtend && device.consumerEntityExtend.scale !== null ?
            device.consumerEntityExtend.scale : 8,
          heading: device.angle ?? 270,
          fadeIn: false, fadeOut: false,
          x: device.x,
          y: device.y
        }),
        new fengmap.FMTextMarker({
          text: markerText,
          fontsize: 12,
          fillColor: device.consumerEntityExtend && device.consumerEntityExtend.color || '#ccc',
          height: device.consumerEntityExtend && device.consumerEntityExtend.height || 1,
          x: device.x,
          y: device.y,
        }),
      ];
      //*/
      /* 将 Marker 添加到地图的指定楼层上 */
      if (map.getLevels().includes(device.baseFloor)) {
        var floor = map.getFloor(device.baseFloor);
        combineMarker.forEach(e => e.addTo(floor))
      }
      devices[device['deviceId']] = combineMarker
    } catch (e) {
      window.ReactNativeWebView.postMessage('addMarker error ' + JSON.stringify([e.stack, e.message]))
    }
  }

  function removeMarker(device) {
    let marker = devices[device['deviceId']]
    if (marker === undefined) {
      return
    }
    marker.remove()
    delete devices[device['deviceId']]
  }

  function ClearMarkers() {
    for (const key in devices) {
      if (Object.hasOwnProperty.call(devices, key)) {
        const element = devices[key];
        removeMarker(element)
      }
    }
  }

  function setMarkers(deviceList) {
    ClearMarkers()
    deviceList.forEach(m => addMarker(m))
  }

  function move(marker, device) {
    marker.forEach(e => {
      const isModel = e.type === fengmap.FMType.DYNAMIC_MODEL_MARKER;
      isModel && e.startAction(e.getActionNames()[0]);
      isModel && e.rotateTo({
          heading: device.angle ?? 270,
          animate: false,
        })
      e.moveTo({
        x: device.x,
        y: device.y,
        animate: false,
        duration: .35,
      })
    })
  }

  function moveMarkers(deviceList) {
    deviceList.forEach(d => {
      try {
        if (!devices[d['deviceId']]) {
            addMarker(d)
        }
        move(devices[d['deviceId']], d)
      } catch (e) {}
    });
    const deviceListIdSet = new Set(deviceList.map(e => e['deviceId']))
    for (key in devices) {
      if (!deviceListIdSet.has(key)) {
        removeMarker(devices[key])
      }
    }
  }

  function setMapCenter(x, y) {
    map.setCenter({
      x: x,
      y: y,
      animate: true,
      duration: 0.35,
    })
  }

  function setMapLevel(level) {
    map.setLevel({
      level: level,
      animate: true,
    })
  }

  function focusDevice(device) {
    map.setLevel({
      level: device.baseFloor,
      animate: false,
    })
    setMapCenter(device.x, device.y)
  }

  function resetMapLocation() {
    setMapCenter(oriCenter.x, oriCenter.y)
  }
</script>
`

const indexCss = `
    <style>
    body,
    html {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      overflow: hidden;
      font-family: MicrosoftYaHei
    }

    ul {
      display: block;
      list-style-type: disc;
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 0
    }

    #fengmap {
      width: 100%;
      height: 100%
    }

    .toolBarDiv {
      position: absolute;
      width: 100%;
      height: 58px;
      background: #fff;
      z-index: 2
    }

    .toolBarDiv>.control {
      display: flex;
      align-items: center;
      height: 100%;
      padding-left: 20px
    }

    #layers {
      list-style: none;
      display: flex;
      justify-content: flex-start;
      margin-top: 10px
    }

    #foo>li>button,
    #layers>li>button {
      font-size: 16px;
      color: #fff;
      background: #076ed7;
      width: 110px;
      height: 36px;
      margin-bottom: 10px;
      cursor: pointer;
      border: none;
      margin-right: 2px
    }

    .set {
      display: flex;
      justify-content: center
    }

    .setup {
      width: 60px;
      height: 32px;
      background: #2f65ee;
      border-radius: 4px;
      color: #fff;
      font-weight: 700
    }

    .title {
      font-size: 14px;
      font-weight: 700;
      color: rgba(0, 0, 0, .9);
      margin-bottom: 16px
    }

    .blue {
      width: 4px;
      height: 12px;
      background: #2776fb;
      border-radius: 2px;
      margin-right: 8px;
      display: inline-block
    }

    .title>i {
      position: absolute;
      right: 18px;
      display: inline-block;
      cursor: pointer;
      user-select: none
    }

    .sliderItem>.layui-input-block {
      padding-top: 6px;
      min-height: 20px
    }

    .tableInfoBox {
      z-index: 9;
      position: absolute;
      width: 100%;
      bottom: 0;
      background: #fff;
      padding: 24px 16px;
      box-sizing: border-box;
      border-radius: 8px 8px 0 0
    }
  </style>
    <style>
    .markerText {
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      width: 100px;
      text-align: center;
    }

    .fm-view {
      width: 36px;
      height: 36px;
    }

    .fm-view-3d {
      background: none;
    }

    .fm-view-2d {
      background: none;
    }

    .fm-control-groups {
      width: 36px;
    }

    .fm-layer {
      width: 36px;
      height: 36px;
      border-radius: 7px;
    }

    .fm-floor-list-group {
      width: 36px;
    }

    .fm-floor-list {
      width: 36px;
      padding: 0px;
    }

    .fm-floor-name-container {
      padding: 0px
    }

    .fm-floor-name {
      height: 48px;
    }

    .fm-enter-exit-building-button-enter {
      width: 36px;
      height: 36px;
    }

    .fm-enter-exit-building-button-exit {
      width: 36px;
      height: 36px;
    }

    .fm-control-zoom-bar {
      width: 36px;
    }

    .fm-control-zoom-bar-button {
      width: 36px;
      height: 36px;
    }
  </style>
`

const template = `
<!DOCTYPE html>
<html lang="en">

<head>
  <title>地图</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <script src="{{baseURL}}/fengmap/fengmap.map-nologo.min.js"></script>
  <script src="{{baseURL}}/fengmap/fengmap.analyser.min.js"></script>
  <script src="{{baseURL}}/fengmap/fengmap.effect.min.js"></script>
  <script src="{{baseURL}}/fengmap/fengmap.plugin.min.js"></script>
  <script src="{{baseURL}}/fengmap/fengmap.plugins-compositemarker.min.js"></script>
  <script src="{{baseURL}}/fengmap/fengmap.plugins-export.min.js"></script>
  <script src="{{baseURL}}/fengmap/fengmap.plugins-mapedit.min.js"></script>
  <script src="{{baseURL}}/fengmap/fengmap.plugins-track-player.min.js"></script>
  <link rel="stylesheet" href="{{baseURL}}/fengmap/toolBarStyle.css" />
${indexCss}
</head>

<body>
  <div id="fengmap"></div>
</body>
<script>
  var map;
  var mapId = '{{mapId}}';
  var mapUrl = '{{mapUrl}}';
  var themeID = '{{themeId}}';
  var options = {
    container: document.getElementById('fengmap'),
    appName: '综合位置服务',
    key: 'f8101cef78a7bf9fc49881036b18f61c',
    mapID: mapId,
    themeID: themeID,
    // viewMode: fengmap.FMViewMode.MODE_3D,
    mapURL: mapUrl,
    themeURL: mapUrl + "" + mapId + '/',
    level: {{level}},
    mapZoom: {{mapZoom}},
    // externalModelURL: mapUrl + "" + mapId + "/",
    // backgroundColor: "#0b0d1a",
    rotation: 0,
    //初始化倾斜角
    tiltAngle: 70,
    //最小倾斜角
    minTiltAngle: 0,
    //缩放范围
    zoomRange: [11, 29],
    //禁止把地图拖拽出视野范围
    enabledPanRange: false,
    //禁用了选中高亮
    highlightPicker: [],
    logarithmicDepthBuffer: true,
  }
  window.ReactNativeWebView.postMessage(JSON.stringify(options))
  map = new fengmap.FMMap(options);
</script>
${fmmapScript}
</html>
`

export default function mapHtml(mapInfo) {
  console.log("mapInfo: ", mapInfo)
  if (!mapInfo) {
    return '';
  }
  let prefix = mapInfo.filePath.split('/')[1]
  const mapUrl = mapUrlPrefix + prefix + '/'
  const map = {
    baseURL: baseURL,
    mapUrl: mapUrl,
    mapId: mapInfo.configs.mapCode,
    themeId: mapInfo.configs.mapThemeCode,
    level: mapInfo.configs.defaultFloor,
    mapZoom: mapInfo.configs.zoomLevel,
    floorControlPositionX: mapInfo.floorControlPositionX ?? (Platform.OS == 'android' ? -11 : -11),
    floorControlPositionY: mapInfo.floorControlPositionY ?? (Platform.OS == 'android' ? 180 : 240),
    zoomControlPositionX: mapInfo.zoomControlPositionX ?? (Platform.OS == 'android' ? -11 : -11),
    zoomControlPositionY: mapInfo.zoomControlPositionY ?? (Platform.OS == 'android' ? -96 : -96),
  }
  // console.log(map)
  let html = template;
  for (var key in map) {
    html = html.replaceAll(`{{${key}}}`, map[key])
  }
  // console.log(html)
  return html
}
