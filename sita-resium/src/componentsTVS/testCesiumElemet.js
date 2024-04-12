
export default async function testCesiumElemet(ref,i=0){
    return new Promise((resolve, reject)=>{
        //console.log()
        if (ref.current?.cesiumElement) {
            resolve (ref)
            } else if (i<1000){
                i++;
                setTimeout(()=>{
                    testCesiumElemet(ref, i).then(resolve).catch(reject)
                },10)
            }else {
                reject (new Error(`Waiting more than ${1000*10/1000} seconds.${ref.current}`))
                //console.log(ref)
            }
    })

}
/* 
var Popups = [];
		var viewer = new Cesium.Viewer('cesiumContainer', {
			//imageryProvider: globemap,
			selectionIndicator: false,
			animation: false,
			baseLayerPicker: false,
			geocoder: false,
			timeline: false,
			sceneModePicker: false,
			navigationHelpButton: false,
			infoBox: false,
			fullscreenButton: false,
			homeButton: false,
		});

		viewer.scene.globe.depthTestAgainstTerrain = true;8

		var imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
			url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
			Name: "ArcGIS Image Service"
		});
		viewer.imageryLayers.addImageryProvider(imageryProvider);

		viewer.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(114.21772195, 22.725681793, 53298.0),
		})

		 / / Get the location coordinates of the current click
		var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
		handler.setInputAction(function(movement) {
			var windowPosition = viewer.camera.getPickRay(movement.position);
			var cartesianCoordinates = viewer.scene.globe.pick(windowPosition, viewer.scene);
			var cartoCoordinates = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesianCoordinates);
			var cartesian2 = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
			var carto2 = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian2);
			latitude = carto2.latitude * 180 / Math.PI;
			longitude = carto2.longitude * 180 / Math.PI;
			 // Alert ("latitude:" + latitude + "," + ":" + longitude);
			var cartesian = viewer.scene.pickPosition(movement.position);
			 / / Pop-up parameters 
			var paramObj = {
				id: 'trackPopUpContent',
				HTMLdiv: '<div class="leaflet-popup-content-wrapper" style="background:#FFF;">' +
					 '<div id = "TrackPopupLink" class = "leaflet-popup-content" style = "max-width: 300px; max-height: 500px"> <h5> latitude:' +
					 Latitude + ', <br> Slender:' + longitude + '</ h5> </ div>' +
					'</div>',
				Offset: {
					x: 0,
					y: 0
				},
				 Coordinate: Cartesian, // Cartesian coordinate parameters
				lineStyle: {
					Linewidth: 3,
					Lineheight: 25,
					Linebackground: '#409EFF'
				},
				CircleStyle: {
					Circleradius: 8,
					Circlecolor: '#409EFF'
				},
				 HEIGHIDENUM: 1000, // High hidden value
			}
			 / / Fixed pop-up position
			PopupCoordinatePositioning(paramObj);
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

		 / * Roller event monitor height value * /
		handler.setInputAction(function(wheelment) {
			var height = Math.ceil(viewer.camera.positionCartographic.height);
			 Console.log ("High:" + Height);
		}, Cesium.ScreenSpaceEventType.WHEEL)

		var PopupCoordinatePositioning = function(paramObj) {
			 $ ("#" + paramobj.id) .remove (); // Remove
			var position = paramObj.coordinate;
			if (!position) {
				position = Cesium.Cartesian3.fromDegrees(0, 0, 0);
			}
			var MarkStr = '<div id="' + paramObj.id +
				'" class="leaflet-popup" style="bottom: 0px; left: 0px;background: transparent;">' +
				paramObj.HTMLdiv +
				'<div class="leaflet-popup-tip-container" style="height: initial;">' +
				'<div class="leaflet-popup-tip" style="transform: inherit; width:' + paramObj.lineStyle.Linewidth + 'px; height:' +
				paramObj.lineStyle.Lineheight + 'px; background: ' + paramObj.lineStyle.Linebackground +
				'; margin: auto; box-shadow:' + paramObj.lineStyle.Linebackground + ' 0px 1px 10px;"></div>' +
				'<div style="box-shadow: 0px 0px 8px ' + paramObj.CircleStyle.Circlecolor + ';width:' + paramObj.CircleStyle.Circleradius +
				'px;height:' + paramObj.CircleStyle.Circleradius + 'px;background:' + paramObj.CircleStyle.Circlecolor +
				';margin:auto;border-radius:50%;"></div>' +
				'</div>' +
				'</div>';
			var id = viewer._container.id;
			$("#bubbleContent").append(MarkStr);
			var AllClass = $("#" + paramObj.id).attr("class");
			if (AllClass.indexOf("leaflet-popup-content-wrapper") == -1) {
				$("#" + paramObj.id).attr("class", AllClass + " leaflet-popup-content-wrapper");
			}
			 Var realTime = new object (); // example initializes an Object 
			realTime.PopupsID = paramObj.id;
			realTime.scenePosition = position;
			realTime.paramObj = paramObj;
			if (Popups.length == 0) {
				Popups.push(realTime);
			}
			var bools = true;
			for (var i = 0; i < Popups.length; i++) {
				if (Popups[i].PopupsID == paramObj.id) {
					Popups[i] = realTime;
					bools = false;
				}
			}
			if (bools) {
				Popups.push(realTime);
			}

			$("#" + paramObj.id).show();
			 Viewer.scene.postrender.addeventListener (Function () {// Each frame is calculated to calculate the correct position of the bubble
				if (Popups.length > 0) {
					for (var i = 0; i < Popups.length; i++) {
						var infoboxContainer = document.getElementById(Popups[i].PopupsID); //morphComplete
						if (infoboxContainer != null) {
							//var infoboxContainer = document.getElementById("bubble");//morphComplete
							if (Popups[i].scenePosition) {
								var canvasHeight = viewer.scene.canvas.height;
								var windowPosition = new Cesium.Cartesian2();
								Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, Popups[i].scenePosition, windowPosition);
								infoboxContainer.style.bottom = (canvasHeight - windowPosition.y + Popups[i].paramObj.Offset.y) + 'px';
								infoboxContainer.style.left = (windowPosition.x + -(infoboxContainer.scrollWidth / 2)) + 'px';
							}
						}
					}
				}
				var height = Math.ceil(viewer.camera.positionCartographic.height);
				
			});

		} */