const fmmapScript = `
<script>
  var ready = false;
  // window.ReactNativeWebView.postMessage("abc")
  map.on('loaded', function () {
    ready = true;
    console.log(deviceList)
    // window.postMessage(JSON.stringify(deviceList))
    window.postMessage("this is a test")
    setMarkers(deviceList)
    // setInterval(() => {
    //   deviceList.forEach(d => { d.x += Math.random() * 100; d.y += Math.random() * 100 })
    //   moveMarkers(deviceList)
    // }, 1000);
  })

  var devices = {}
  function addMarker(device) {
    var marker = new fengmap.FMImageMarker({
      url: 'https://developer.fengmap.com/fmAPI/images/blueImageMarker.png',
      x: device.x,
      y: device.y
    });
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
    // alert(deviceList)
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
        return
      }
      move(devices[d['deviceId']], d)
    });
  }

  var deviceList = [
    {
      "deviceId": "youda06",
      "deviceType": "HWTEST01",
      "consumerEntityId": "71",
      "consumerId": "514",
      "consumerName": "友达测试数据1",
      "consumerTypeName": "友达测试数据",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 58.87,
      "y": -58.48,
      "z": 2,
      "baseFloor": 1,
      "longitude": 0.000529,
      "latitude": -0.000525,
      "altitude": 2,
      "angle": 0,
      "speed": 10,
      "other": {
        "traceId": "dfb23ad7-d286-455e-baf2-8c359d30b2da"
      },
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": null
    },
    {
      "deviceId": "013403000001",
      "deviceType": "Q2001",
      "consumerEntityId": "65",
      "consumerId": "456",
      "consumerName": "太阳能渔船",
      "consumerTypeName": "油库人员",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "wd01部门",
      "consumerStatus": 1,
      "status": 0,
      "x": 12904370.64,
      "y": 4730136.68,
      "z": 2,
      "baseFloor": 0,
      "longitude": 115.92193378,
      "latitude": 39.05907212,
      "altitude": 2,
      "angle": 205,
      "speed": 0,
      "other": {
        "sos": false
      },
      "note": null,
      "room": "outdoor",
      "consumerEntityExtend": null
    },
    {
      "deviceId": "person-001",
      "deviceType": "person-device",
      "consumerEntityId": "67",
      "consumerId": "446",
      "consumerName": "王磊",
      "consumerTypeName": "中石化控制平台对象",
      "consumerTypeIcon": "/static/images/pages/truck.png",
      "consumerDeptName": "车站油",
      "consumerStatus": 1,
      "status": 0,
      "x": 13934932.647107638,
      "y": 5461045.474394274,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.17963,
      "latitude": 43.971582,
      "altitude": 1,
      "angle": 85,
      "speed": 9,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {}
    },
    {
      "deviceId": "crrc-030",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "64",
      "consumerId": "422",
      "consumerName": "李谷雨",
      "consumerTypeName": "景观介绍",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "部门部门",
      "consumerStatus": 1,
      "status": 0,
      "x": 13935949.841616677,
      "y": 5460894.341751971,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.188767,
      "latitude": 43.970605,
      "altitude": 1,
      "angle": 66,
      "speed": 19,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#000",
        "scale": 16,
        "height": 0
      }
    },
    {
      "deviceId": "crrc-020",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "65",
      "consumerId": "371",
      "consumerName": "曹国华",
      "consumerTypeName": "油库人员",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "东宝山",
      "consumerStatus": 1,
      "status": 0,
      "x": 13934787.762063062,
      "y": 5461149.951217246,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.178328,
      "latitude": 43.972257,
      "altitude": 1,
      "angle": 85,
      "speed": 19,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {}
    },
    {
      "deviceId": "crrc-013",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "64",
      "consumerId": "424",
      "consumerName": "李小满",
      "consumerTypeName": "景观介绍",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "部门部门",
      "consumerStatus": 1,
      "status": 0,
      "x": 13935138.889368214,
      "y": 5461043.169699811,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.181483,
      "latitude": 43.971567,
      "altitude": 1,
      "angle": 84,
      "speed": 2,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#000",
        "scale": 16,
        "height": 0
      }
    },
    {
      "deviceId": "crrc-012",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "64",
      "consumerId": "421",
      "consumerName": "李惊蛰",
      "consumerTypeName": "景观介绍",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "部门部门",
      "consumerStatus": 1,
      "status": 0,
      "x": 13935025.257177457,
      "y": 5461033.081532831,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.180462,
      "latitude": 43.971502,
      "altitude": 1,
      "angle": 3,
      "speed": 4,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#000",
        "scale": 16,
        "height": 0
      }
    },
    {
      "deviceId": "crrc-011",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "64",
      "consumerId": "423",
      "consumerName": "李芒种",
      "consumerTypeName": "景观介绍",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "部门部门",
      "consumerStatus": 1,
      "status": 0,
      "x": 13934978.858187472,
      "y": 5461022.114695258,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.180045,
      "latitude": 43.971431,
      "altitude": 1,
      "angle": 20,
      "speed": 27,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#000",
        "scale": 16,
        "height": 0
      }
    },
    {
      "deviceId": "crrc-010",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "64",
      "consumerId": "420",
      "consumerName": "李雨水",
      "consumerTypeName": "景观介绍",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "部门部门",
      "consumerStatus": 1,
      "status": 0,
      "x": 13935050.045551121,
      "y": 5461012.467189308,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.180684,
      "latitude": 43.971369,
      "altitude": 1,
      "angle": 81,
      "speed": 27,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#000",
        "scale": 16,
        "height": 0
      }
    },
    {
      "deviceId": "crrc-009",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "64",
      "consumerId": "399",
      "consumerName": "景区_车站油库_002",
      "consumerTypeName": "景观介绍",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "车站油",
      "consumerStatus": 1,
      "status": 0,
      "x": 13935031.190528408,
      "y": 5461001.258572932,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.180515,
      "latitude": 43.971296,
      "altitude": 1,
      "angle": 50,
      "speed": 16,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#000",
        "scale": 16,
        "height": 0
      }
    },
    {
      "deviceId": "crrc-008",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "65",
      "consumerId": "370",
      "consumerName": "郭海",
      "consumerTypeName": "油库人员",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "东宝山",
      "consumerStatus": 1,
      "status": 0,
      "x": 13934994.664185388,
      "y": 5460979.719092324,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.180187,
      "latitude": 43.971157,
      "altitude": 1,
      "angle": 50,
      "speed": 18,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {}
    },
    {
      "deviceId": "crrc-007",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "65",
      "consumerId": "369",
      "consumerName": "吕迎秋",
      "consumerTypeName": "油库人员",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "东宝山",
      "consumerStatus": 1,
      "status": 0,
      "x": 13934988.758819504,
      "y": 5460957.521169294,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.180134,
      "latitude": 43.971013,
      "altitude": 1,
      "angle": 12,
      "speed": 6,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {}
    },
    {
      "deviceId": "crrc-006",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "65",
      "consumerId": "368",
      "consumerName": "邓伟",
      "consumerTypeName": "油库人员",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "东宝山",
      "consumerStatus": 1,
      "status": 0,
      "x": 13934994.876353491,
      "y": 5460936.005341675,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.180189,
      "latitude": 43.970874,
      "altitude": 1,
      "angle": 77,
      "speed": 20,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {}
    },
    {
      "deviceId": "crrc-004",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "65",
      "consumerId": "366",
      "consumerName": "邹珍军",
      "consumerTypeName": "油库人员",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "东宝山",
      "consumerStatus": 1,
      "status": 0,
      "x": 13934982.6527447,
      "y": 5460913.754784513,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.180079,
      "latitude": 43.97073,
      "altitude": 1,
      "angle": 49,
      "speed": 7,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {}
    },
    {
      "deviceId": "crrc-003",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "65",
      "consumerId": "365",
      "consumerName": "徐公超",
      "consumerTypeName": "油库人员",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "东宝山",
      "consumerStatus": 1,
      "status": 0,
      "x": 13934976.041590149,
      "y": 5460899.717218586,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.18002,
      "latitude": 43.97064,
      "altitude": 1,
      "angle": 85,
      "speed": 14,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {}
    },
    {
      "deviceId": "wushan-001",
      "deviceType": "Test001",
      "consumerEntityId": "64",
      "consumerId": "398",
      "consumerName": "景区_车站油库_001",
      "consumerTypeName": "景观介绍",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "车站油",
      "consumerStatus": 1,
      "status": 0,
      "x": 13191921.176199265,
      "y": 3680451.933392482,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.505044,
      "latitude": 31.366606,
      "altitude": 19,
      "angle": 47,
      "speed": 25,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#000",
        "scale": 16,
        "height": 0
      }
    },
    {
      "deviceId": "crrc-002",
      "deviceType": "crrc-vehicles",
      "consumerEntityId": "65",
      "consumerId": "364",
      "consumerName": "高万群",
      "consumerTypeName": "油库人员",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "东宝山",
      "consumerStatus": 1,
      "status": 0,
      "x": 13934975.923049822,
      "y": 5460889.373326298,
      "z": 1,
      "baseFloor": 1,
      "longitude": 125.180019,
      "latitude": 43.970573,
      "altitude": 1,
      "angle": 5,
      "speed": 27,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {}
    },
    {
      "deviceId": "20221119-21_20",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "186",
      "consumerName": "20221119-21_20内容超长内容超长内容超长内容超长",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13191407.776297506,
      "y": 3682008.4759192583,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.500432,
      "latitude": 31.378544,
      "altitude": 19,
      "angle": 49,
      "speed": 2,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_19",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "185",
      "consumerName": "20221119-21_19内容超长内容超长内容超长内容超长",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13191470.483817343,
      "y": 3681758.7943983814,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.500996,
      "latitude": 31.376629,
      "altitude": 19,
      "angle": 69,
      "speed": 21,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_18",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "184",
      "consumerName": "20221119-21_18内容超长内容超长内容超长内容超长",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13191634.606220333,
      "y": 3680423.9583403743,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.50247,
      "latitude": 31.366391,
      "altitude": 19,
      "angle": 64,
      "speed": 28,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_17",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "183",
      "consumerName": "20221119-21_17内容超长内容超长内容超长内容超长",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13190625.159772648,
      "y": 3681244.700400182,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.493402,
      "latitude": 31.372686,
      "altitude": 19,
      "angle": 72,
      "speed": 11,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_16",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "182",
      "consumerName": "20221119-21_16内容超长内容超长内容超长内容超长",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13191657.570065023,
      "y": 3681359.6377565,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.502676,
      "latitude": 31.373568,
      "altitude": 19,
      "angle": 21,
      "speed": 21,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_15",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "181",
      "consumerName": "20221119-21_15",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13190659.468504796,
      "y": 3681742.652954313,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.49371,
      "latitude": 31.376505,
      "altitude": 19,
      "angle": 2,
      "speed": 12,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_14",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "180",
      "consumerName": "20221119-21_14",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13190073.425543917,
      "y": 3680574.0788057493,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.488446,
      "latitude": 31.367542,
      "altitude": 19,
      "angle": 49,
      "speed": 11,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_13",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "179",
      "consumerName": "20221119-21_13",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13191972.552949969,
      "y": 3680283.252330852,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.505506,
      "latitude": 31.365312,
      "altitude": 19,
      "angle": 9,
      "speed": 9,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_12",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "178",
      "consumerName": "20221119-21_12",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13190964.163467474,
      "y": 3680613.3546871296,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.496447,
      "latitude": 31.367844,
      "altitude": 19,
      "angle": 63,
      "speed": 4,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_10",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "176",
      "consumerName": "20221119-21_10",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13192225.468185939,
      "y": 3681936.3806206947,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.507778,
      "latitude": 31.377991,
      "altitude": 19,
      "angle": 65,
      "speed": 3,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_9",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "175",
      "consumerName": "20221119-21_9",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13191932.660222685,
      "y": 3680131.789722218,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.505147,
      "latitude": 31.36415,
      "altitude": 19,
      "angle": 58,
      "speed": 4,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_8",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "174",
      "consumerName": "20221119-21_8",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13190935.83782399,
      "y": 3680921.0694426815,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.496193,
      "latitude": 31.370204,
      "altitude": 19,
      "angle": 77,
      "speed": 29,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_7",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "173",
      "consumerName": "20221119-21_7",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13190375.05037561,
      "y": 3682127.64976079,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.491155,
      "latitude": 31.379458,
      "altitude": 19,
      "angle": 88,
      "speed": 4,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_6",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "172",
      "consumerName": "20221119-21_6",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13191762.178538945,
      "y": 3682223.2285527233,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.503616,
      "latitude": 31.380191,
      "altitude": 19,
      "angle": 82,
      "speed": 13,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_5",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "171",
      "consumerName": "20221119-21_5",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13192189.0314492,
      "y": 3680767.340168924,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.50745,
      "latitude": 31.369025,
      "altitude": 19,
      "angle": 33,
      "speed": 22,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_4",
      "deviceType": "Test001",
      "consumerEntityId": "64",
      "consumerId": "407",
      "consumerName": "景区_部门丙_002",
      "consumerTypeName": "景观介绍",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "部门丙",
      "consumerStatus": 1,
      "status": 0,
      "x": 13190413.337403992,
      "y": 3681914.280957795,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.491499,
      "latitude": 31.377822,
      "altitude": 19,
      "angle": 45,
      "speed": 27,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#000",
        "scale": 16,
        "height": 0
      }
    },
    {
      "deviceId": "20221119-21_3",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "169",
      "consumerName": "20221119-21_3",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13192141.866481375,
      "y": 3681568.1963298135,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.507027,
      "latitude": 31.375167,
      "altitude": 19,
      "angle": 86,
      "speed": 2,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_2",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "168",
      "consumerName": "20221119-21_2",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13192136.504927766,
      "y": 3680266.2616891484,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.506979,
      "latitude": 31.365181,
      "altitude": 19,
      "angle": 37,
      "speed": 14,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-21_1",
      "deviceType": "Test001",
      "consumerEntityId": "40",
      "consumerId": "167",
      "consumerName": "20221119-21_1",
      "consumerTypeName": "20221119-21",
      "consumerTypeIcon": "/static/images/pages/orangeCone.png",
      "consumerDeptName": "总部",
      "consumerStatus": 1,
      "status": 0,
      "x": 13190148.712574052,
      "y": 3680808.9158686684,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.489122,
      "latitude": 31.369344,
      "altitude": 19,
      "angle": 54,
      "speed": 7,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#06D",
        "scale": 50,
        "height": 90
      }
    },
    {
      "deviceId": "20221119-20_3",
      "deviceType": "Test001",
      "consumerEntityId": "64",
      "consumerId": "406",
      "consumerName": "景区_部门丙_001",
      "consumerTypeName": "景观介绍",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "部门丙",
      "consumerStatus": 1,
      "status": 0,
      "x": 13190449.045232639,
      "y": 3681973.5931669706,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.49182,
      "latitude": 31.378276,
      "altitude": 19,
      "angle": 84,
      "speed": 14,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#000",
        "scale": 16,
        "height": 0
      }
    },
    {
      "deviceId": "20221119-20_2",
      "deviceType": "Test001",
      "consumerEntityId": "64",
      "consumerId": "404",
      "consumerName": "景区_部门部门_001",
      "consumerTypeName": "景观介绍",
      "consumerTypeIcon": "/static/images/pages/personOfModel.png",
      "consumerDeptName": "部门部门",
      "consumerStatus": 1,
      "status": 0,
      "x": 13190763.178958952,
      "y": 3681320.3043786837,
      "z": 39,
      "baseFloor": 0,
      "longitude": 118.494642,
      "latitude": 31.373266,
      "altitude": 19,
      "angle": 44,
      "speed": 9,
      "other": null,
      "note": null,
      "room": "indoor",
      "consumerEntityExtend": {
        "color": "#000",
        "scale": 16,
        "height": 0
      }
    }
  ]

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
