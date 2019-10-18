## Module Report
### Unknown Global

**Global**: `Ember.computed.apply`

**Location**: `addon/components/masonry-grid/component.js` at line 56

```js
  init() {
    this._super(...arguments);
    defineProperty(this, 'options', computed.apply(this, [...MASONRY_OPTION_KEYS, this._computeOptions]));
  },

```
