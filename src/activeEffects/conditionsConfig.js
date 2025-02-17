import A5E from '../config';

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                         Changes
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const changes = {
  blinded: [],

  encumbered: [
    {
      key: 'system.attributes.movement.walk',
      value: '5',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      priority: 20,
      label: 'A5E.ConditionEncumbered'
    }
  ],

  fatigue: [],

  frightened: [],

  grappled: [
    {
      key: 'system.attributes.movement.walk',
      value: '0',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      priority: 20,
      label: 'A5E.ConditionGrappled'
    }
  ],

  invisible: [],

  paralyzed: [],

  petrified: Object.keys(A5E.damageTypes).map((damageType) => ({
    key: 'system.traits.damageResistances',
    value: damageType,
    mode: CONST.ACTIVE_EFFECT_MODES.ADD,
    priority: 20,
    label: 'A5E.ConditionPetrified'
  })),

  poisoned: [],

  prone: [],

  rattled: [],

  restrained: [
    {
      key: 'system.attributes.movement.walk',
      value: '0',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      priority: 20,
      label: 'A5E.ConditionRestrained'
    }
  ],

  slowed: [
    {
      key: 'system.attributes.ac',
      value: '-2',
      mode: CONST.ACTIVE_EFFECT_MODES.ADD,
      priority: 20,
      label: 'A5E.ConditionSlowed'
    },
    ...Object.keys(A5E.movement).map((movementType) => ({
      key: `system.attributes.movement.${movementType}`,
      value: 0.5,
      mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
      priority: 20,
      label: 'A5E.ConditionSlowed'
    }))
  ],

  strife: [],

  stunned: [],

  unconscious: []

};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                        Flags
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const flags = {
  blinded: {
    conditions: [],
    rollModifiers: {}
  },

  encumbered: {
    conditions: [],
    rollModifiers: {}
  },

  fatigue: {
    conditions: [],
    rollModifiers: {}
  },

  frightened: {
    conditions: [],
    rollModifiers: {}
  },

  grappled: {
    conditions: [],
    rollModifiers: {}
  },

  invisible: {
    conditions: [],
    rollModifiers: {}
  },

  paralyzed: {
    conditions: ['incapacitated'],
    rollModifiers: {}
  },

  petrified: {
    conditions: ['incapacitated'],
    rollModifiers: {}
  },

  poisoned: {
    conditions: [],
    rollModifiers: {}
  },

  prone: {
    conditions: [],
    rollModifiers: {}
  },

  rattled: {
    conditions: [],
    rollModifiers: {}
  },

  restrained: {
    conditions: [],
    rollModifiers: {}
  },

  slowed: {
    conditions: [],
    rollModifiers: {}
  },

  strife: {
    conditions: [],
    rollModifiers: {}
  },

  stunned: {
    conditions: ['incapacitated'],
    rollModifiers: {}
  },

  unconscious: {
    conditions: ['incapacitated'],
    rollModifiers: {}
  }
};
