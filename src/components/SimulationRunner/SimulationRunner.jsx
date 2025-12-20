import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

/**
 * SimulationRunner Component
 * Provides an interactive environment for running Physical AI simulations
 * embedded within the textbook content.
 */
function SimulationRunner({
  code,
  title = "Physical AI Simulation",
  description = "Interactive simulation demonstrating Physical AI concepts",
  onRun = null,
  onStop = null
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(null);
  const [simulationData, setSimulationData] = useState(null);

  // Initialize simulation environment
  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      // Setup any required simulation libraries or environments
      console.log("Simulation environment initialized");
    }
  }, []);

  const handleRunSimulation = () => {
    setIsRunning(true);
    setError(null);

    try {
      // In a real implementation, this would execute the simulation code
      // For now, we'll simulate the execution
      const simulatedOutput = [
        "Initializing Physical AI simulation...",
        "Loading sensor data...",
        "Processing actuator commands...",
        "Running control loop...",
        "Simulation complete!"
      ];

      setOutput(simulatedOutput);

      if (onRun) {
        onRun();
      }

      // Simulate simulation completion
      setTimeout(() => {
        setIsRunning(false);
        setSimulationData({
          startTime: new Date(),
          duration: 2.5, // seconds
          status: "completed"
        });
      }, 2000);
    } catch (err) {
      setError(err.message);
      setIsRunning(false);
    }
  };

  const handleStopSimulation = () => {
    setIsRunning(false);
    setError(null);

    if (onStop) {
      onStop();
    }
  };

  const handleResetSimulation = () => {
    setOutput([]);
    setError(null);
    setSimulationData(null);
  };

  return (
    <div className="simulation-runner-container">
      <div className="simulation-header">
        <h4>{title}</h4>
        <p className="simulation-description">{description}</p>
      </div>

      <div className="simulation-controls">
        <button
          className={`button button--primary ${isRunning ? 'button--secondary' : ''}`}
          onClick={isRunning ? handleStopSimulation : handleRunSimulation}
          disabled={isRunning && !onStop}
        >
          {isRunning ? 'Stop Simulation' : 'Run Simulation'}
        </button>

        <button
          className="button button--secondary"
          onClick={handleResetSimulation}
          disabled={isRunning}
        >
          Reset
        </button>
      </div>

      {error && (
        <div className="alert alert--danger">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {simulationData && (
        <div className="alert alert--success">
          <p>Simulation completed in {simulationData.duration}s</p>
        </div>
      )}

      <div className="simulation-output">
        <h5>Output:</h5>
        <div className="simulation-output-content">
          {output.length > 0 ? (
            <ul>
              {output.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="text--muted">No output yet. Click "Run Simulation" to start.</p>
          )}
        </div>
      </div>

      <div className="simulation-code">
        <h5>Simulation Code:</h5>
        <pre>
          <code className="language-javascript">{code}</code>
        </pre>
      </div>
    </div>
  );
}

// Wrapper component that handles browser-only execution
export default function SimulationRunnerWrapper(props) {
  return (
    <BrowserOnly>
      {() => <SimulationRunner {...props} />}
    </BrowserOnly>
  );
}