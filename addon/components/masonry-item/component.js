import { oneWay } from '@ember/object/computed';
import { htmlSafe } from '@ember/template';
import Component from '@ember/component';
import { get } from '@ember/object';
import layout from './template';

export default Component.extend({
  layout,
  classNameBindings: ['itemClass'],
  attributeBindings: ['masonryItemStyle:style'],

  masonryItemStyle: htmlSafe('position: absolute'),

  itemClass: oneWay('grid.itemClass'),

  click(ev) {
    const onItemClick = get(this, 'onItemClick');
    const item = get(this, 'item');

    if (onItemClick && typeof onItemClick === 'function') {
      onItemClick(ev, item);
    }
  }
});
