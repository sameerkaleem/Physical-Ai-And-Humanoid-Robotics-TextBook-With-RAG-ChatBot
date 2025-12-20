import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

/**
 * EmbodiedLesson Component
 * Provides a structured format for Physical AI lessons following the
 * Embodied Lesson Template: Physical Intuition, Component, Control Logic, Simulation Outcome
 */
function EmbodiedLesson({
  physicalIntuition,
  component,
  controlLogic,
  simulationOutcome,
  title = "Embodied Lesson",
  showCodeBlock = true
}) {
  return (
    <div className="embodied-lesson-container">
      <div className="embodied-lesson-header">
        <h3>{title}</h3>
      </div>

      <div className="embodied-lesson-section">
        <h4>Physical Intuition (The "Why")</h4>
        <div className="lesson-content">
          {physicalIntuition}
        </div>
      </div>

      <div className="embodied-lesson-section">
        <h4>The Component (The "What")</h4>
        <div className="lesson-content">
          {component}
        </div>
      </div>

      <div className="embodied-lesson-section">
        <h4>The Control Logic (The "How")</h4>
        <div className="lesson-content">
          {showCodeBlock && controlLogic ? (
            <pre>
              <code className="language-javascript">{controlLogic}</code>
            </pre>
          ) : (
            <div>{controlLogic}</div>
          )}
        </div>
      </div>

      <div className="embodied-lesson-section">
        <h4>The Simulation Outcome (The "Result")</h4>
        <div className="lesson-content">
          {simulationOutcome}
        </div>
      </div>
    </div>
  );
}

// Wrapper component that handles browser-only execution
export default function EmbodiedLessonWrapper(props) {
  return (
    <BrowserOnly>
      {() => <EmbodiedLesson {...props} />}
    </BrowserOnly>
  );
}