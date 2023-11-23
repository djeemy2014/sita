import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react"; //"@storybook/react"
import { Viewer as CesiumViewer, Cesium3DTileStyle } from "cesium";
import { useRef } from "react";

import { CesiumComponentRef } from "resium/src/core";
import { events } from "resium/src/core/storybook"; // "../core/storybook"
//import Viewer from "resium/src/Viewer";
import {Viewer} from "resium";
//const Cesium3DTilesetProps = Cesium3DTileset.Cesium3DTilesetProps
import Cesium3DTileset, { Cesium3DTilesetProps } from 'resium/src/Cesium3DTileset/Cesium3DTileset';

export default {
  title: "Cesium3DTileset",
  component: Cesium3DTileset,
} as Meta;

export const Basic: Story<Cesium3DTilesetProps> = args => {
  const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);
  return (
    //<Viewer full ref={ref}>
    //  <Cesium3DTileset
    //    {...args}
    //    url="./tileset/tileset.json"
    //    onAllTilesLoad={action("onAllTilesLoad")}
    //    onInitialTilesLoad={action("onInitialTilesLoad")}
    //    onTileFailed={action("onTileFailed")}
    //    onTileLoad={action("onTileLoad")}
    //    onTileUnload={action("onTileUnload")}
    //    onReady={tileset => {
    //      ref.current?.cesiumElement?.zoomTo(tileset);
    //    }}
    //    {...events}
    //  />
    //</Viewer>
  );
};
