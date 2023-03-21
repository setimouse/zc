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
  return html
}
