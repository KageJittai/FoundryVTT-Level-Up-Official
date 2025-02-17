import migrate5ftRange from './migrate5ftRange';

export default function migrateActionsConfig(itemData, updateData) {
  const { actions } = itemData.system;

  // Step 0: Check if action is needed
  const {
    actionOptions, activation, duration, range, target
  } = itemData.system;

  if (!actionOptions?.length && !activation?.type
    && !duration?.unit && !range?.length && !target?.type
  ) return;

  // Step 1: Create an action for the item
  const action = {
    name: itemData.name
  };

  // Step 2: Get actionOptions and delete it

  // Step 3: Migrate activation data
  action.activation = foundry.utils.duplicate(itemData.system.activation);

  // Step 4: Migrate duration
  action.duration = foundry.utils.duplicate(itemData.system.duration);

  // Step 5: Migrate range
  if (itemData.system.range?.length) {
    action.ranges = {};
    itemData.system.range.forEach((r) => {
      // eslint-disable-next-line no-param-reassign
      r = migrate5ftRange(r);
      action.ranges[foundry.utils.randomID()] = { range: r };
    });
  }

  // Step 6: Migrate area config
  action.area = foundry.utils.duplicate(itemData.system.area);
  action.area.placeTemplate = itemData.flags.a5e?.placeTemplate ?? false;
  updateData['flags.a5e'] = { '-=placeTemplate': null };

  // Step 7: Migrate target data
  action.target = foundry.utils.duplicate(itemData.system.target ?? {});

  // Step 8: Rolls & Prompts
  if (actionOptions.includes('attack')) {
    const attack = foundry.utils.duplicate(itemData.system.attack ?? {});
    attack.attackType = attack.type;
    attack.type = 'attack';
    attack.ability = itemData.system.ability;
    action.rolls = {
      ...action.rolls,
      [foundry.utils.randomID()]: attack
    };
  }

  if (actionOptions.includes('damage')) {
    itemData.system.damage.forEach((d) => {
      const damage = foundry.utils.duplicate(d);
      damage.type = 'damage';
      damage.formula = replaceMod(itemData, 'default', damage.formula);
      action.rolls = {
        ...action.rolls,
        [foundry.utils.randomID()]: damage
      };
    });
  }

  if (actionOptions.includes('healing')) {
    itemData.system.healing.forEach((h) => {
      const healing = foundry.utils.duplicate(h);
      healing.formula = replaceMod(itemData, 'default', healing.formula);
      healing.type = 'healing';
      action.rolls = {
        ...action.rolls,
        [foundry.utils.randomID()]: healing
      };
    });
  }

  if (actionOptions.includes('abilityCheck')) {
    const { check } = itemData.system;

    action.rolls = {
      ...action.rolls,
      [foundry.utils.randomID()]: {
        ability: check.ability,
        type: 'abilityCheck'
      }
    };
  }

  if (actionOptions.includes('savingThrow')) {
    const { save } = itemData.system;

    action.prompts = {
      ...action.prompts,
      [foundry.utils.randomID()]: {
        ability: save.targetAbility,
        onSave: save.onSave,
        saveDC: {
          type: 'custom',
          bonus: replaceMod(itemData, save.targetAbility, save.dc)
        },
        type: 'savingThrow'
      }
    };
  }

  // Step 9: Delete old data
  updateData.system = {
    '-=actionOptions': null,
    '-=activation': null,
    '-=duration': null,
    '-=range': null,
    '-=area': null,
    '-=target': null,
    '-=attack': null,
    '-=damage': null,
    '-=healing': null,
    '-=check': null,
    '-=savingThrow': null
  };

  // Step 10: Add action to update data
  updateData['system.actions'] = {
    ...actions,
    [foundry.utils.randomID()]: action
  };
}

function replaceMod(itemData, fieldAbility, field) {
  if (!field) return field;
  // eslint-disable-next-line no-param-reassign
  field = String(field);

  const attackType = itemData.system.attack.type;
  const { ability } = itemData.system;

  if (attackType && ['meleeWeaponAttack', 'rangedWeaponAttack'].includes(attackType)) {
    if (itemData.system.objectType === 'weapon') {
      if (itemData.system.weaponProperties.includes('finesse')) {
        return field.replaceAll('@mod', '@finesse.mod');
      }
      return field.replaceAll('@mod', '@str.mod');
    }
  }

  if (!ability) return field;

  if (fieldAbility === 'default') {
    return field.replaceAll('@mod', `@${ability}.mod`);
  }

  return field.replaceAll('@mod', `@${fieldAbility}.mod`);
}
