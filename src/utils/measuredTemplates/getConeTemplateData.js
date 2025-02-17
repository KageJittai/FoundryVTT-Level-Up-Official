export default function getConeTemplateData(item, actionId) {
  const length = Number(item.actions[actionId]?.area.length);

  return {
    angle: CONFIG.MeasuredTemplate.defaults.angle,
    direction: 0,
    distance: length,
    fillColor: game.user.color,
    t: 'cone',
    user: game.user.id,
    x: 0,
    y: 0
  };
}
