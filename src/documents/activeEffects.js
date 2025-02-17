/* eslint-disable consistent-return */
// import A5E from '../config';

/** TODO:
 * - Allow editing of owned items.
 * - Enable active effects on item equip/unequip.
 * - Allow references to core actor data.
 * - Allow arithmetic in data definitions.
 * - Priority of effects.
 * - Allow macros to be executed.
 *
 * Add system-specific logic to the base ActiveEffect Class
*/
export default class ActiveEffectA5e extends ActiveEffect {
  static fallbackIcon = 'icons/svg/aura.svg';

  source = undefined;

  get isSuppressed() {
    const { parentItem } = this;

    if (!parentItem) return false;

    return parentItem?.system?.equipped;
  }

  get parentItem() {
    if (this.parent instanceof Actor) return null;

    const idRegex = /Item\.([a-zA-Z0-9]+)/;

    const itemId = this.origin?.match(idRegex)?.[1];
    if (!itemId) return null;

    return this.parent.items.get(itemId);
  }

  /**
   * @inheritdoc
   */
  apply(document, change) {
    if (this.isSuppressed) return null;

    return super.apply(document, change);
  }

  /** @inheritdoc */
  _applyAdd(document, change, current, delta, changes) {
    if (current instanceof Set) {
      if (Array.isArray(delta)) delta.forEach((item) => current.add(item));
      else current.add(delta);
      return;
    }
    super._applyAdd(document, change, current, delta, changes);
  }

  /** @inheritdoc */
  _applyOverride(document, change, current, delta, changes) {
    if (current instanceof Set) {
      current.clear();
      if (Array.isArray(delta)) delta.forEach((item) => current.add(item));
      else current.add(delta);
      return;
    }
    return super._applyOverride(document, change, current, delta, changes);
  }

  /**
   * Transfer the affect to another token.
   */
  transferEffect(token) {
    const data = [{
      label: this.label,
      origin: this.parent.uuid,
      changes: this.changes
    }];

    token.actor.createEmbeddedDocuments('ActiveEffect', data);
  }
}
