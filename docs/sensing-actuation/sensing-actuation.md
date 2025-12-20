---
title: Sensing & Actuation
---

# Sensing & Actuation: The Foundation of Physical AI

## Physical Intuition (The "Why")

In humanoid robotics, sensing and actuation form the fundamental interface between the intelligent system and its physical environment. Without these capabilities, an AI system remains disembodied and unable to interact with the world. Sensing allows the robot to perceive its environment and internal state, while actuation enables it to influence its surroundings and achieve goals through physical actions.

The coupling between sensing and actuation is essential - they work together to create a complete perception-action loop that enables intelligent behavior. This is fundamentally different from traditional software-only AI systems that operate on abstract data representations.

## The Component (The "What")

Sensing involves various types of sensors that convert physical phenomena into digital signals:

- **Proprioceptive sensors**: Measure internal robot state (joint angles, motor currents, IMU data)
- **Exteroceptive sensors**: Measure external environment (cameras, LIDAR, touch sensors, microphones)
- **Actuators**: Convert digital commands into physical forces and motions (servos, motors, pneumatic systems)

These components work together to provide the robot with awareness of its state and environment while enabling it to perform physical actions.

## The Control Logic (The "How")

```js
// Example: Simple sensor fusion for proprioceptive state estimation
function estimateRobotState(sensorData) {
  const jointAngles = sensorData.encoders.map(e => e.position);
  const imuOrientation = sensorData.imu.orientation;
  const motorCurrents = sensorData.encoders.map(e => e.current);

  return {
    jointConfiguration: jointAngles,
    globalOrientation: imuOrientation,
    actuatorLoads: motorCurrents,
    estimatedExternalForces: estimateExternalForces(motorCurrents)
  };
}

// Example: Basic actuation control with safety limits
function commandActuators(desiredTorques, currentState) {
  // Apply safety limits
  const safeTorques = desiredTorques.map(t =>
    Math.max(-MAX_TORQUE, Math.min(MAX_TORQUE, t))
  );

  // Send commands to hardware
  return sendToHardware(safeTorques, currentState);
}
```

The control logic integrates sensor data to form a coherent understanding of the robot's state and environment, then generates appropriate actuator commands to achieve desired behaviors. Feedback control is critical to handle uncertainties and disturbances in the physical world.

## The Simulation Outcome (The "Result")

Through proper sensing and actuation design, humanoid robots can:

- Navigate complex environments using visual and proprioceptive feedback
- Manipulate objects with appropriate force control
- Maintain balance and stability during dynamic movements
- Adapt to unexpected environmental conditions

This forms the foundation for higher-level intelligent behaviors that emerge from the tight coupling of perception and action in physical systems.