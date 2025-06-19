import { useState, useEffect, ReactElement } from "react";
import DiagramContainer from "./DiagramContainer";
import { registerMain } from "./MainDiagram";
import { registerAllSubdiagrams as registerSubs } from "./Subdiagrams";
import { FormattedMessage } from "react-intl";

/**
 * Steuert die einmalige Initialisierung aller Diagramme.
 * Zeigt einen Ladezustand an, bis alle Diagramme in der Registry
 * registriert sind, und rendert erst dann die Haupt-Diagrammkomponente.
 */

const DiagramOrchestrator = (): ReactElement => {
  const [isRegistryReady, setIsRegistryReady] = useState<boolean>(false);

  // Einmaliger Effekt nach dem ersten Rendern, um alle Diagramme zu registrieren.
  useEffect(() => {
    // console.log("[Orchestrator] useEffect: Starte Diagramm-Registrierungen...");
    registerMain(); // Registriert das Hauptdiagramm
    registerSubs(); // Registriert alle Subdiagramme

    // Markiert die Registrierung als abgeschlossen, um die UI zu aktualisieren.
    setIsRegistryReady(true);
  }, []);

  if (!isRegistryReady) {
    return (
      <div className="box">
        <p className="loading-text">
          <FormattedMessage
            id="diagram_initializing"
            defaultMessage="Diagramm wird initialisiert..."
          />
        </p>
      </div>
    );
  }

  return <DiagramContainer />;
};

export default DiagramOrchestrator;
