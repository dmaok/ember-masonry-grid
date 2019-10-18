import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

let items;

module('Integration | Component | masonry grid', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(function() {
    items = [
      { name: 'one' },
      { name: 'two' }
    ];
  });

  test('it renders a default layout', async function(assert) {
    let $grid;
    let $items;

    assert.expect(4);

    run(() => {
      this.set('items', A(items));
    });

    await render(hbs`
      {{#masonry-grid items=items as |item|}}
        {{item.name}}
      {{/masonry-grid}}
    `);

    $grid = this.$('.masonry-grid');
    $items = $grid.find('.masonry-item');

    assert.ok($grid.length, 'the masonry-grid component renders');
    assert.equal($items.length, 2, 'there is a masonry-item for every item');

    $items.each(function(index) {
      assert.equal($(this).text().trim(), items[index].name);
    });
  });

  test('the masonry-item class is based on the itemSelector passed to masonry-grid', async function(assert) {
    let $items;

    assert.expect(1);

    run(() => {
      this.set('items', A(items));
      this.set('customSelector', '.piece');
    });

    await render(hbs `
      {{#masonry-grid items=items itemSelector=customSelector as |item|}}
        {{item.name}}
      {{/masonry-grid}}
    `);

    $items = this.$('.piece');

    assert.equal($items.length, items.length, 'there is a masonry-item for ever item');
  });

  test('it renders a custom layout', async function(assert) {
    let $grid;
    let $items;

    assert.expect(4);

    run(() => {
      this.set('items', A(items));
    });

    await render(hbs`
      {{#masonry-grid items=items customLayout=true as |item index grid|}}
        {{#masonry-item grid=grid item=item}}
          {{item.name}}
        {{/masonry-item}}
      {{/masonry-grid}}
    `);

    $grid = this.$('.masonry-grid');
    $items = $grid.find('.masonry-item');

    assert.ok($grid.length, 'the masonry-grid component renders');
    assert.equal($items.length, 2, 'there is a masonry-item for every item');

    $items.each(function(index) {
      assert.equal($(this).text().trim(), items[index].name);
    });
  });

  test('it triggers masonry\'s layoutComplete event after rendering', async function(assert) {
    assert.expect(1);

    run(() => {
      this.set('items', A(items));
      this.actions.layoutComplete = () => {
        assert.ok(true, 'layoutComplete action called');
      };
    });

    await render(hbs `
      {{#masonry-grid items=items onLayoutComplete=(action 'layoutComplete')}}
        {{item.name}}
      {{/masonry-grid}}
    `);
  });

  test('it triggers a click event when an item is clicked', async function(assert) {
    assert.expect(1);

    this.set('items', A(items));

    this.actions.itemClicked = (ev, item) => {
      assert.deepEqual(this.get('items.firstObject'), item);
    };

    this.actions.layoutComplete = () => {
      let $items = this.$('.masonry-item');
      $items.first().click();
    };

    await render(hbs `
      {{#masonry-grid items=items onItemClick=(action 'itemClicked') onLayoutComplete='layoutComplete' as |item|}}
        {{item.name}}
      {{/masonry-grid}}
    `);
  });
});

