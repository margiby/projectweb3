import { tryRegisterDiagram } from "../utils/diagramRegistry";
import { createFlexibleDiagram } from "../utils/diagramFactory"; 
import { Position } from "@xyflow/react";
import type { ElkLayoutOptions } from "../utils/ElkLayout-utils";
import type { FlexibleDiagramConfig, DiagramFactoryOptions } from "../data/flow-types";

export function registerVSKSubdiagram(): void {
  const diagramId = "versorgungskonzepte";

  tryRegisterDiagram(diagramId, () => {
    console.log(`AKTION: Registriere Versorgungskonzepte-Diagramm (${diagramId})...`);

    const config: FlexibleDiagramConfig = {
  nodes: [
    { id: "tech4biowaste", data: { label: "TECH FOR BIOWASTE" }, className: "tech-logo-node" },
    { id: "feedstocks", data: { label: "Feedstocks" }, className: "tech-category-node" },
    { id: "food-waste", data: { label: "Food waste" }, className: "tech-item-node" },
    { id: "garden-park-waste", data: { label: "Garden and park waste" }, className: "tech-item-node" },

    { id: "technologies", data: { label: "Technologies" }, className: "tech-category-node" },
    { id: "pre-processing", data: { label: "Pre-processing" }, className: "tech-item-node" },
    { id: "conversion", data: { label: "Conversion" }, className: "tech-item-node" },
    { id: "post-processing", data: { label: "Post-processing" }, className: "tech-item-node" },
    { id: "pilot-demo", data: { label: "Pilot and demo facilities" }, className: "tech-item-node" },

    { id: "products", data: { label: "Products" }, className: "tech-category-node" },
    { id: "chemicals", data: { label: "Chemicals" }, className: "tech-item-node" },
    { id: "energy-fuels", data: { label: "Energy and fuels" }, className: "tech-item-node" },
    { id: "food-ingredients", data: { label: "Food ingredients" }, className: "tech-item-node" },
    { id: "materials", data: { label: "Materials" }, className: "tech-item-node" },
  ],
  edges: [
    { source: "tech4biowaste", target: ["feedstocks", "technologies", "products"] },
    { source: "feedstocks", target: ["food-waste", "garden-park-waste"] },
    { source: "technologies", target: ["pre-processing", "conversion", "post-processing"] },
    { source: "pre-processing", target: "pilot-demo" },
    { source: "conversion", target: "pilot-demo" },
    { source: "post-processing", target: "pilot-demo" },
    { source: "products", target: ["chemicals", "energy-fuels", "food-ingredients", "materials"] },
  ],
};

    const vskElkOptions: ElkLayoutOptions = {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "org.eclipse.elk.layered.spacing.nodeNodeBetweenLayers": "80",
      "org.eclipse.elk.spacing.nodeNode": "30",
      "org.eclipse.elk.layered.considerModelOrder.strategy": "PORTS_EAST_WEST",
      "org.eclipse.elk.layered.nodePlacement.strategy": "LINEAR_SEGMENTS",
      "org.eclipse.elk.portConstraints": "FIXED_SIDE",
    };

    const options: DiagramFactoryOptions = {
      elkOptions: vskElkOptions,
      defaultTargetPosition: Position.Left,
      defaultSourcePosition: Position.Right,
    };

    createFlexibleDiagram(diagramId, config, options);
  });
}

