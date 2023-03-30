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
  })

  map.on('loaded', function() {
         var scrollFloorCtlOpt = {
                position: fengmap.FMControlPosition.RIGHT_TOP,
                floorButtonCount: 5,
                offset: {
                    x: -10,
                    y: 260
                },
                viewModeControl: true,
                floorModeControl: true,
                needAllLayerBtn: true
            };
            var scrollFloorControl = new fengmap.FMToolbar(scrollFloorCtlOpt);
            scrollFloorControl.addTo(map)
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
    //*
    var marker = new fengmap.FMImageMarker({
      url: 'https://developer.fengmap.com/fmAPI/images/blueImageMarker.png',
      x: device.x,
      y: device.y
    });
    /*/
    // http://47.94.249.77/static/images/pages/orangeCone_model.glb
    const imageurl = 'https://developer.fengmap.com/fmAPI/images/gongren.gltf'
    var marker = new fengmap.FMDynamicModel({
      // url: 'http://47.94.249.77' + device.fengGLBIcon,
      url: imageurl,
      id: 'uuid',
      height: 0,
      scale: device.consumerEntityExtend && device.consumerEntityExtend.scale !== null ?
        device.consumerEntityExtend.scale : 8,
      heading: 90,
      fadeIn: false, fadeOut: false,
      x: device.x,
      y: device.y
    });
    //*/
    var level = map.getLevel()
    var floor = map.getFloor(level);
    /* 将 Marker 添加到地图的指定楼层上 */
    marker.addTo(floor);
    console.log("device ", device)
    devices[device['deviceId']] = marker
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
    marker.moveTo({
      x: device.x,
      y: device.y,
      animate: true,
      duration: 1,
      finish: function () {
        console.log('finished')
      }
    })
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
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
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
    level: 1,
    mapZoom: mapInfo.configs.zoomLevel,
  }
  let html = template;
  for (var key in map) {
    html = html.replace(`{{${key}}}`, map[key])
  }
  // console.log(html)
  return html
}
