import { Platform } from "react-native";

const fmmapScript = `
<script>
  var ready = false;
  var oriCenter = {};
  if (window.postMessage === undefined) {
    window.postMessage = (data) => {
      window.ReactNativeWebView.postMessage(data)
    }
  }
  map.on('loaded', function () {
    ready = true;
    oriCenter = map.getCenter()
    window.ReactNativeWebView.postMessage("mapready")
    // setMarkers(deviceList)
    map.pickFilterFunction = function (event) {
      if (event.type == fengmap.FMType.DYNAMIC_MODEL_MARKER) {
        return true;
      }
    }
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
      needAllLayerBtn: true
    };
    var scrollFloorControl = new fengmap.FMToolbar(scrollFloorCtlOpt);
    scrollFloorControl.addTo(map)

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
    renderViewModeBtn()
    const width = '37px';
    document.querySelector('div.fm-control-groups').style.width = width
    document.querySelector('div.fm-layer').setAttribute('style', 'width: 37px;height:37px;border-radius:7px;')
    document.querySelector('div.fm-floor-list-group').style.width = width
    document.querySelector('div.fm-floor-list').style.width = width
    document.querySelectorAll('div.fm-scroll')
      .forEach(e => e.style.height = '10px')
    document.querySelector('.fm-floor-list').style.padding="0 0 0 0"
    document.querySelectorAll('.fm-floor-name-container').forEach(e => e.style.padding = "0 0 0 0")
    document.querySelectorAll('.fm-floor-name').forEach(e => e.style.height = '48px')
  });

  map.on('loaded', function () {
    var scrollZoomCtlOpt = {
      position: fengmap.FMControlPosition.RIGHT_BOTTOM,
      offset: {
        x: {{zoomControlPositionX}},
        y: {{zoomControlPositionY}},
      },

    };
    var toolbar = new fengmap.FMZoomBar(scrollZoomCtlOpt);
    toolbar.addTo(map)
    {
      var e = document.querySelector('.fm-control-zoom-bar')
      e.setAttribute('style', e.getAttribute('style') + 'width:37px;')
    }
    {
      document.querySelectorAll('div.fm-control-zoom-bar-button')
        .forEach(e => e.setAttribute('style', 'width:37px;height:32px;'))
    }
  });

  var devices = {}
  function addMarker(device) {
    const consumerTypeIcon = device.consumerTypeIcon;
    device.fengGLBIcon = consumerTypeIcon;
    if (consumerTypeIcon !== null) {
      device.fengGLBIcon = "/static/images/pages/" 
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
        url: 'http://47.94.249.77' + device.fengGLBIcon,
        // url: imageurl,
        id: 'uuid',
        // height: device.consumerEntityExtend && device.consumerEntityExtend.height || 1,
        height: 0,
        scale: device.consumerEntityExtend && device.consumerEntityExtend.scale !== null ?
          device.consumerEntityExtend.scale : 8,
        heading: 90,
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
    marker.forEach(e => e.moveTo({
      x: device.x,
      y: device.y,
      animate: true,
      duration: 1,
      finish: function () {
        console.log('finished')
      }
    }))
  }

  function moveMarkers(deviceList) {
    deviceList.forEach(d => {
      if (!devices[d['deviceId']]) {
        addMarker(d)
      }
      move(devices[d['deviceId']], d)
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

  function resetMapLocation() {
    setMapCenter(oriCenter.x, oriCenter.y)
  }
</script>
`

const template = `
<!DOCTYPE html>
<html lang="en">

<head>
  <title>地图</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <script src="https://developer.fengmap.com/fmAPI/demos/libs/js/fengmap.map.min.js"></script>
  <script src="https://developer.fengmap.com/fmAPI/demos/libs/js/fengmap.plugin.min.js"></script>
  <link rel="stylesheet" href="https://developer.fengmap.com/fmAPI/demos/libs/css/index.css">
  <link rel="stylesheet" href="https://developer.fengmap.com/fmAPI/demos/libs/css/toolBarStyle.css">
</head>

<body>
  <div id="fengmap"></div>
</body>
<script>
  var map;
  var mapId = '{{mapId}}';
  var mapUrl = '{{baseURL}}';
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
    externalModelURL: mapUrl + "" + mapId + "/",
  }
  map = new fengmap.FMMap(options);
</script>
${fmmapScript}
</html>
`

const baseURL = 'http://47.94.249.77/mediaresource/admin/'

export default function mapHtml(mapInfo) {
  console.log("mapInfo: ", mapInfo)
  if (!mapInfo) {
    return '';
  }
  const map = {
    baseURL: baseURL,
    mapId: mapInfo.configs.mapCode,
    themeId: mapInfo.configs.mapThemeCode,
    level: mapInfo.configs.defaultFloor,
    mapZoom: mapInfo.configs.zoomLevel,
    floorControlPositionX: Platform.OS == 'android' ? -11 : -11,
    floorControlPositionY: Platform.OS == 'android' ? 180 : 240,
    zoomControlPositionX: Platform.OS == 'android' ? -11 : -11,
    zoomControlPositionY: Platform.OS == 'android' ? -165 : -150,
  }
  let html = template;
  for (var key in map) {
    html = html.replace(`{{${key}}}`, map[key])
  }
  // console.log(html)
  return html
}
