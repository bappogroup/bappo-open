// @flow

import debounce from 'lodash/debounce';
import ViewBase from './ViewBase';

const registry: Map<string, ViewBase> = new Map();

const triggerAll = () => {
  registry.forEach(instance => {
    instance._onLayout();
  });
};
window.addEventListener('resize', debounce(triggerAll, 16), false);

export const register = (id: string, instance: ViewBase) => {
  registry.set(id, instance);
};

export const unregister = (id: string) => {
  registry.delete(id);
};
