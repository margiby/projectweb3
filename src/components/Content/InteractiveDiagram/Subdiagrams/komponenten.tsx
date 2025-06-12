import { tryRegisterDiagram } from "../utils/diagramRegistry";
import { createFlexibleDiagram } from "../utils/diagramFactory";
import type { FlexibleDiagramConfig, DiagramFactoryOptions } from "../data/flow-types";

export function registerKomponentenSubdiagram() {
  const diagramId = "komponenten";

  tryRegisterDiagram(diagramId, () => {
    console.log(`AKTION: Registriere Komponenten Diagram (${diagramId})...`);

    const config: FlexibleDiagramConfig = {
      nodes: [
        { id: "k-hws", data: { label: "Heißwasserspeicher" } },
        { id: "k-biomassekessel", data: { label: "Biomassekessel" } },
        { id: "k-bhkw", data: { label: "Gas-BHKW" } },
        { id: "k-waermetauscher", data: { label: "Wärmetauscher" } },
      ],
      edges: [
        { id: "k-e1", source: "k-biomassekessel", target: "k-hws" },
        { id: "k-e2", source: "k-bhkw", target: "k-hws" },
        { id: "k-e3", source: "k-hws", target: "k-waermetauscher" },
      ],
    };
    // Standartwerte
    const options : DiagramFactoryOptions = {
      defaultClassName: "komponenten-node",
      // elkOptions könnten hier hinzugefügt werden, falls gewünscht
    };
    createFlexibleDiagram(diagramId, config, options);
  });
}