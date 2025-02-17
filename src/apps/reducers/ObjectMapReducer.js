// eslint-disable-next-line import/no-unresolved
import { DynMapReducer } from '@typhonjs-fvtt/runtime/svelte/store';

export default class ObjectMapReducer extends DynMapReducer {
  initialize() {
    this.filters.add((item) => item.type === 'object');
    this.sort.set((a, b) => a.sort - b.sort);

    this._types = {};
    Object.keys(CONFIG.A5E.objectTypes).forEach((key) => {
      this._types[key] = this.derived.create(key);
    });

    Object.entries(this._types).forEach(([key, reducer]) => {
      reducer.filters.add((item) => item.system.objectType === key);
    });

    this._types.Uncategorized = this.derived.create('uncategorized');
    this._types.Uncategorized.filters.add((item) => item.system.objectType === '');
  }
}
