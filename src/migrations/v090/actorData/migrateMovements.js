export default function migrateMovements(actorData, updateData) {
  const old = actorData?.system?.attributes?.movement;
  const unitMap = {
    miles: ['mile', 'miles', 'mi.', 'mi'],
    kilometers: ['kilometer', 'kilometers', 'km.', 'km'],
    meters: ['meter', 'meters', 'm.', 'm']
  };

  const newMovements = Object.entries(old ?? {}).reduce((acc, [mode, distance]) => {
    if (mode === 'traits') {
      acc[mode] = { hover: distance.hover };
      return acc;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const [unit, strings] of Object.entries(unitMap)) {
      if (strings.some((el) => distance.toString().includes(el))) {
        acc[mode] = { distance: parseInt(distance, 10) || 0, unit };
        return acc;
      }
    }
    acc[mode] = { distance: parseInt(distance, 10) || 0, unit: 'feet' };
    return acc;
  }, {});

  updateData['system.attributes.movement'] = newMovements;

  return updateData;
}
