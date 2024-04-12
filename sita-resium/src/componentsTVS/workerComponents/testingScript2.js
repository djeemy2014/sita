import Cesium from 'cesium'

// A simple demo of 3D Tiles feature picking with hover and select behavior
// Building data courtesy of NYC OpenData portal: http://www1.nyc.gov/site/doitt/initiatives/3d-building.page
const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
  });
  
  viewer.scene.globe.depthTestAgainstTerrain = true;
  
  // Set the initial camera view to look at Manhattan
  const initialPosition = Cesium.Cartesian3.fromDegrees(
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
  });
  
  // Load the NYC buildings tileset
  try {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(75343);
    viewer.scene.primitives.add(tileset);
  } catch (error) {
    console.log(`Error loading tileset: ${error}`);
  }
  
  // HTML overlay for showing feature name on mouseover
  
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
  
  
  // Create the HTML that will be put into the info box that shows
  // information about the currently selected feature
  
  
  // If silhouettes are supported, silhouette features in blue on mouse over and silhouette green on mouse click.
  // If silhouettes are not supported, change the feature color to yellow on mouse over and green on mouse click.
  
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
  
      //updateNameOverlay(pickedFeature, movement.endPosition);
  
      if (!Cesium.defined(pickedFeature)) {
        return;
      }
  
      // Highlight the feature if it's not already selected.
      if (pickedFeature !== selected.feature) {
        silhouetteBlue.selected = [pickedFeature];
      }
    },
    Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  
   