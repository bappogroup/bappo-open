// @flow

import debounce from 'lodash/debounce';

const registry: Map<string, any> = new Map();

const triggerAll = () => {
  registry.forEach(instance => {
    instance._onLayout();
  });
};
window.addEventListener('resize', debounce(triggerAll, 16), false);

export const register = (id: string, instance: any) => {
  registry.set(id, instance);
};

export const unregister = (id: string) => {
  registry.delete(id);
};
