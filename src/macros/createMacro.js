/**
 * Create a Macro when dropping an Item on the macro bar. If a macro already exists for the item,
 * use the existing macro.
 *
 * @param {object} data  The dropped data.
 * @param {number} slot  The macro hot bar slot to use.
 */
// eslint-disable-next-line consistent-return
export default async function createMacro(data, slot) {
  const item = await fromUuid(data.uuid);

  if (foundry.utils.isEmpty(item) || item.parent === null) {
    return ui.notifications.warn(game.i18n.localize('A5E.ActionWarningNoMacrosForUnownedItems'));
  }

  // Create the macro command
  const command = `game.a5e.macros.activateItemMacro("${item.name}");`;

  let macro = game.macros.find((m) => (m.name === item.name) && (m.command === command));

  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: 'script',
      scope: 'actor',
      img: item.img,
      command,
      flags: { 'a5e.itemMacro': true }
    });
  }

  await game.user.assignHotbarMacro(macro, slot);
}
