import { run } from '@ember/runloop';
import Controller from '@ember/controller';
import { set, get, computed } from '@ember/object';

export default Controller.extend({
  first: true,

  currentObject: computed('first', 'model', function() {
    let modelIndex = this.get('first') ? 0 : 1;

    return this.get('model').objectAt(modelIndex);
  }),

  actions: {
    switchObjects() {
      this.toggleProperty('first');
    },

    switchGutter() {
      const gutter = get(this, 'gutter');
      const newGutter = (gutter === 10) ? 0 : 10;

      set(this, 'gutter', newGutter);
    },

    onLayout() {
      console.log('onLayout', arguments);
    },

    onLayoutComplete() {
      console.log('onLayoutComplete', arguments);
    },

    onItemClick(ev, item) {
      run(() => {
        get(this, 'currentObject').removeObject(item);
      });
    }
  }
});
