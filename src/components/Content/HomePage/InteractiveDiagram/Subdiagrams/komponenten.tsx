import { tryRegisterDiagram } from "../utils/diagramRegistry";
import { createFlexibleDiagram } from "../utils/diagramFactory";
import type { DiagramFactoryOptions } from "../data/flow-types";
import { diagramConfigs } from "./diagramConfigs";

export function registerKomponentenSubdiagram() {
  const diagramId = "komponenten";
  tryRegisterDiagram(diagramId, () => {
    const options: DiagramFactoryOptions = {
      defaultClassName: "komponenten-node",
    };
    createFlexibleDiagram(diagramId, diagramConfigs[diagramId], options);
  });
}