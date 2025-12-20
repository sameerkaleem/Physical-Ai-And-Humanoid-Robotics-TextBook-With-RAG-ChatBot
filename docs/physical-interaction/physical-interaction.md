---
title: Physical Interaction
---

# Physical Interaction: Force, Motion, and Environmental Response

## Physical Intuition (The "Why")

Physical interaction is what distinguishes Physical AI from traditional software-based AI. While digital systems process abstract symbols and data, physical systems must manage forces, contacts, and dynamic interactions with their environment. In humanoid robotics, this is crucial for tasks like manipulation, locomotion, and social interaction, where the robot must handle the complexities of real-world physics.

Understanding physical interaction is essential because the same algorithm can behave completely differently when executed in simulation versus on real hardware due to factors like friction, compliance, and environmental uncertainties that only exist in the physical world.

## The Component (The "What")

Physical interaction in humanoid robotics involves:

- **Force control systems**: Manage the forces applied during contact with objects or environment
- **Impedance controllers**: Regulate the robot's mechanical impedance (stiffness, damping) during interaction
- **Contact state estimators**: Detect and classify different types of contact (sliding, rolling, grasping)
- **Tactile sensors**: Provide detailed information about contact forces and surface properties
- **Compliant mechanisms**: Allow controlled flexibility during interaction

These components enable robots to safely and effectively interact with their physical environment.

## The Control Logic (The "How")

```js
// Example: Impedance control for compliant interaction
function impedanceControl(desiredPosition, desiredVelocity, currentForce, stiffness, damping) {
  const positionError = desiredPosition - currentPosition;
  const velocityError = desiredVelocity - currentVelocity;

  // Calculate desired force based on impedance model
  const springForce = stiffness * positionError;
  const damperForce = damping * velocityError;
  const desiredForce = springForce + damperForce;

  // Apply external force feedback
  const interactionForce = desiredForce - currentForce;

  return interactionForce;
}

// Example: Force-limited controller for safe interaction
class ForceLimitedController {
  constructor(maxForce, forceLimit) {
    this.maxForce = maxForce;
    this.forceLimit = forceLimit;
  }

  update(desiredForce, sensedForce, contactState) {
    // Adjust control based on contact state
    if (contactState === 'contact') {
      // Limit forces during contact to prevent damage
      const limitedForce = Math.min(
        Math.abs(desiredForce),
        this.forceLimit
      ) * Math.sign(desiredForce);

      return limitedForce;
    } else {
      // Use full control authority when not in contact
      return Math.min(
        Math.abs(desiredForce),
        this.maxForce
      ) * Math.sign(desiredForce);
    }
  }
}

// Example: Contact detection and response
function handleContact(robotState, contactThreshold) {
  if (Math.abs(robotState.sensedForce) > contactThreshold) {
    return {
      inContact: true,
      contactForce: robotState.sensedForce,
      contactType: classifyContact(robotState.contactSensors)
    };
  } else {
    return { inContact: false };
  }
}
```

The control logic manages the complex dynamics of physical contact, adjusting robot behavior based on sensed forces and contact states to achieve safe and effective interaction.

## The Simulation Outcome (The "Result")

Robots with proper physical interaction capabilities can:

- Manipulate objects with appropriate force control
- Navigate complex terrains and maintain balance during contact
- Respond appropriately to environmental forces and disturbances
- Achieve safe and robust interaction with humans and objects

This enables the emergence of sophisticated behaviors that arise from the robot's ability to engage meaningfully with its physical environment.