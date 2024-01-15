import Cesium from 'cesium'


const obj1 = {
    "uid": 1,
    "type": "scena",
    "name": "testScena",
    "layer":[
        {
            "id":1,
            "uid":"001",
            "type": "layer",
            "name": "testLayer!",
            "path":"/VDC_4326.geojson",
            "className":"Тестовый Класс",
            "sudClassName":"Тестовый ПодКласс",
            "defaultChecked": true
        },
        {
            "id":2,
            "uid":"002",
            "type": "layer",
            "name": "Дороги",
            "path":"/road_4326.geojson",
            "defaultChecked": false
        },
        {
            "id":3,
            "uid":"003",
            "type": "layer",
            "name": "Здания",
            "path":"/bild_4326.geojson",
            "className":"Тестовый Класс",
            "sudClassName":"Тестовый ПодКласс",
            "defaultChecked": true
        }
        ,
        {
            "id":4,
            "uid":"003",
            "type": "layer",
            "name": "Здания2",
            "path":"/bild_4326.geojson",
            "className":"Тестовый Класс 2",
            "defaultChecked": true
        }
        ,
        {
            "id":5,
            "uid":"003",
            "type": "layer",
            "name": "Здания3",
            "path":"/bild_4326.geojson",
            "className":"Тестовый Класс",
            "defaultChecked": true
        }
    ]
}

const arr = obj1.layer
const arr2=[1,1,2,3,6,5,6,6,5,8,12]
let arrN=arr2.filter((x,i,a)=>a.indexOf(x)===i)
console.log(arrN)
///////////////////////////////////////////////////////

// A simple demo of 3D Tiles feature picking with hover and select behavior
// Building data courtesy of NYC OpenData portal: http://www1.nyc.gov/site/doitt/initiatives/3d-building.page
const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
  });
  
  viewer.scene.globe.depthTestAgainstTerrain = true;
  
  // Set the initial camera view to look at Manhattan
/*   const initialPosition = Cesium.Cartesian3.fromDegrees(
    -74.01881302800248,
    40.69114333714821,
    753
  );
  const initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(
    21.27879878293835,
    -21.34390550872461,
    0.0716951918898415
  );
  viewer.scene.camera.setView({
    destination: initialPosition,
    orientation: initialOrientation,
    endTransform: Cesium.Matrix4.IDENTITY,
  }); */
  
  // Load the NYC buildings tileset
/*   try {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(75343);
    viewer.scene.primitives.add(tileset);
  } catch (error) {
    console.log(`Error loading tileset: ${error}`);
  } */
  
  // HTML overlay for showing feature name on mouseover
  const nameOverlay = document.createElement("div");
  viewer.container.appendChild(nameOverlay);
  nameOverlay.className = "backdrop";
  nameOverlay.style.display = "none";
  nameOverlay.style.position = "absolute";
  nameOverlay.style.bottom = "0";
  nameOverlay.style.left = "0";
  nameOverlay.style["pointer-events"] = "none";
  nameOverlay.style.padding = "4px";
  nameOverlay.style.backgroundColor = "black";
  
  // Information about the currently selected feature
  const selected = {
    feature: undefined,
    originalColor: new Cesium.Color(),
  };
  
  // An entity object which will hold info about the currently selected feature for infobox display
  const selectedEntity = new Cesium.Entity();
  
  // Get default left click handler for when a feature is not picked on left click
  const clickHandler = viewer.screenSpaceEventHandler.getInputAction(
    Cesium.ScreenSpaceEventType.LEFT_CLICK
  );
  
  // Update the 'nameOverlay' for the given picked feature,
  // at the given (screen) position.
  function updateNameOverlay(pickedFeature, position) {
    if (!Cesium.defined(pickedFeature)) {
      nameOverlay.style.display = "none";
      return;
    }
    // A feature was picked, so show its overlay content
    nameOverlay.style.display = "block";
    nameOverlay.style.bottom = `${
      viewer.canvas.clientHeight - position.y
    }px`;
    nameOverlay.style.left = `${position.x}px`;
    const name = pickedFeature.getProperty("BIN");
    nameOverlay.textContent = name;
  }
  
  // Create the HTML that will be put into the info box that shows
  // information about the currently selected feature
  function createPickedFeatureDescription(pickedFeature) {
    const description =
      `${
        '<table class="cesium-infoBox-defaultTable"><tbody>' +
        "<tr><th>BIN</th><td>"
      }${pickedFeature.getProperty("BIN")}</td></tr>` +
      `<tr><th>DOITT ID</th><td>${pickedFeature.getProperty(
        "DOITT_ID"
      )}</td></tr>` +
      `<tr><th>SOURCE ID</th><td>${pickedFeature.getProperty(
        "SOURCE_ID"
      )}</td></tr>` +
      `<tr><th>Longitude</th><td>${pickedFeature.getProperty(
        "Longitude"
      )}</td></tr>` +
      `<tr><th>Latitude</th><td>${pickedFeature.getProperty(
        "Latitude"
      )}</td></tr>` +
      `<tr><th>Height</th><td>${pickedFeature.getProperty(
        "Height"
      )}</td></tr>` +
      `<tr><th>Terrain Height (Ellipsoid)</th><td>${pickedFeature.getProperty(
        "TerrainHeight"
      )}</td></tr>` +
      `</tbody></table>`;
    return description;
  }
  
  // If silhouettes are supported, silhouette features in blue on mouse over and silhouette green on mouse click.
  
  // If silhouettes are not supported, change the feature color to yellow on mouse over and green on mouse click.
  
  // Создание алгоритма силуэта
 /*  if (
    Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene)
  ) { */
    // Silhouettes are supported
    const silhouetteBlue = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
    silhouetteBlue.uniforms.color = Cesium.Color.BLUE;
    silhouetteBlue.uniforms.length = 0.01;
    silhouetteBlue.selected = [];
  
    const silhouetteGreen = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
    silhouetteGreen.uniforms.color = Cesium.Color.LIME;
    silhouetteGreen.uniforms.length = 0.01;
    silhouetteGreen.selected = [];
  
    viewer.scene.postProcessStages.add(
      Cesium.PostProcessStageLibrary.createSilhouetteStage([
        silhouetteBlue,
        silhouetteGreen,
      ])
    );
  
    // Silhouette a feature blue on hover.
    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(
      movement
    ) {
      // If a feature was previously highlighted, undo the highlight
      silhouetteBlue.selected = [];
  
      // Pick a new feature
      const pickedFeature = viewer.scene.pick(movement.endPosition);
  
      updateNameOverlay(pickedFeature, movement.endPosition);
  
      if (!Cesium.defined(pickedFeature)) {
        return;
      }
  
      // Highlight the feature if it's not already selected.
      if (pickedFeature !== selected.feature) {
        silhouetteBlue.selected = [pickedFeature];
      }
    },
    Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  
    // Silhouette a feature on selection and show metadata in the InfoBox.
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(
      movement
    ) {
      // If a feature was previously selected, undo the highlight
      silhouetteGreen.selected = [];
  
      // Pick a new feature
      const pickedFeature = viewer.scene.pick(movement.position);
      if (!Cesium.defined(pickedFeature)) {
        clickHandler(movement);
        return;
      }
  
      // Select the feature if it's not already selected
      if (silhouetteGreen.selected[0] === pickedFeature) {
        return;
      }
  
      // Save the selected feature's original color
      const highlightedFeature = silhouetteBlue.selected[0];
      if (pickedFeature === highlightedFeature) {
        silhouetteBlue.selected = [];
      }
  
      // Highlight newly selected feature
      silhouetteGreen.selected = [pickedFeature];
  
      // Set feature infobox description
      viewer.selectedEntity = selectedEntity;
      selectedEntity.description = createPickedFeatureDescription(
        pickedFeature
      );
    },
    Cesium.ScreenSpaceEventType.LEFT_CLICK);
  /* } else {
    // Silhouettes are not supported. Instead, change the feature color.
  
    // Information about the currently highlighted feature
    const highlighted = {
      feature: undefined,
      originalColor: new Cesium.Color(),
    };
  
    // Color a feature yellow on hover.
    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(
      movement
    ) {
      // If a feature was previously highlighted, undo the highlight
      if (Cesium.defined(highlighted.feature)) {
        highlighted.feature.color = highlighted.originalColor;
        highlighted.feature = undefined;
      }
      // Pick a new feature
      const pickedFeature = viewer.scene.pick(movement.endPosition);
      updateNameOverlay(pickedFeature, movement.endPosition);
  
      if (!Cesium.defined(pickedFeature)) {
        return;
      }
  
      // Highlight the feature if it's not already selected.
      if (pickedFeature !== selected.feature) {
        highlighted.feature = pickedFeature;
        Cesium.Color.clone(
          pickedFeature.color,
          highlighted.originalColor
        );
        pickedFeature.color = Cesium.Color.YELLOW;
      }
    },
    Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  
    // Color a feature on selection and show metadata in the InfoBox.
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(
      movement
    ) {
      // If a feature was previously selected, undo the highlight
      if (Cesium.defined(selected.feature)) {
        selected.feature.color = selected.originalColor;
        selected.feature = undefined;
      }
      // Pick a new feature
      const pickedFeature = viewer.scene.pick(movement.position);
      if (!Cesium.defined(pickedFeature)) {
        clickHandler(movement);
        return;
      }
      // Select the feature if it's not already selected
      if (selected.feature === pickedFeature) {
        return;
      }
      selected.feature = pickedFeature;
      // Save the selected feature's original color
      if (pickedFeature === highlighted.feature) {
        Cesium.Color.clone(
          highlighted.originalColor,
          selected.originalColor
        );
        highlighted.feature = undefined;
      } else {
        Cesium.Color.clone(pickedFeature.color, selected.originalColor);
      }
      // Highlight newly selected feature
      pickedFeature.color = Cesium.Color.LIME;
  
      // Set feature infobox description
      viewer.selectedEntity = selectedEntity;
      selectedEntity.description = createPickedFeatureDescription(
        pickedFeature
      );
    },
    Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }  */



  ///////////////////////////////////////////////////////////////////////////////////
  const scene = viewer.scene;
  if (!scene.pickPositionSupported) {
    window.alert("This browser does not support pickPosition.");
  }
  
  //let handler;
    const pickedEntities = new Cesium.EntityCollection();
    const pickColor = Cesium.Color.YELLOW.withAlpha(0.5);
    function makeProperty(entity, color) {
      const colorProperty = new Cesium.CallbackProperty(function (
        time,
        result
      ) {
        if (pickedEntities.contains(entity)) {
          return pickColor.clone(result);
        }
        return color.clone(result);
      },
      false);
  
      entity.polygon.material = new Cesium.ColorMaterialProperty(
        colorProperty
      );
    }
  
    const red = viewer.entities.add({
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          -70.0,
          30.0,
          -60.0,
          30.0,
          -60.0,
          40.0,
          -70.0,
          40.0,
        ]),
        height: 0,
      },
    });
    makeProperty(red, Cesium.Color.RED.withAlpha(0.5));
  
    const blue = viewer.entities.add({
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          -75.0,
          34.0,
          -63.0,
          34.0,
          -63.0,
          40.0,
          -75.0,
          40.0,
        ]),
        height: 0,
      },
    });
    makeProperty(blue, Cesium.Color.BLUE.withAlpha(0.5));
  
    const green = viewer.entities.add({
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          -67.0,
          36.0,
          -55.0,
          36.0,
          -55.0,
          30.0,
          -67.0,
          30.0,
        ]),
        height: 0,
      },
    });
    makeProperty(green, Cesium.Color.GREEN.withAlpha(0.5));
  
    // Move the primitive that the mouse is over to the top.
    let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (movement) {
      // get an array of all primitives at the mouse position
      const pickedObjects = scene.drillPick(movement.endPosition);
      if (Cesium.defined(pickedObjects)) {
        //Update the collection of picked entities.
        pickedEntities.removeAll();
        for (let i = 0; i < pickedObjects.length; ++i) {
          const entity = pickedObjects[i].id;
          pickedEntities.add(entity);
        }
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  
  