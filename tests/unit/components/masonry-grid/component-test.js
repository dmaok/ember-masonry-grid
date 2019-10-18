import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

module('Unit | Component | masonry grid', function(hooks) {
  setupTest(hooks);

  test('the options hash has the correct defaults', function(assert) {
    let component = this.owner.factoryFor('component:masonry-grid').create();

    assert.deepEqual(component.get('options'), {
      isInitLayout: false,
      itemSelector: '.masonry-item'
    });
  });

  test('the options hash handles "null" as a primitive type', function(assert) {
    let component = this.owner.factoryFor('component:masonry-grid').create();

    component.set('containerStyle', 'null');

    assert.deepEqual(component.get('options'), {
      isInitLayout: false,
      itemSelector: '.masonry-item',
      containerStyle: null
    });
  });

  test('the options hash updates when masonry properties are changed', function(assert) {
    let component = this.owner.factoryFor('component:masonry-grid').create();

    component.set('transitionDuration', '1s');

    assert.deepEqual(component.get('options'), {
      isInitLayout: false,
      itemSelector: '.masonry-item',
      transitionDuration: '1s'
    });

    component.set('transitionDuration', '0.5s');

    assert.equal(component.get('options.transitionDuration'), '0.5s');
  });

  test('didUpdateAttrs calls super and destroys masonry if any options have changed', function(assert) {
    let component = this.owner.factoryFor('component:masonry-grid').create();
    let args = [{
      oldAttrs: {
        gutter: 0
      },
      newAttrs: {
        gutter: 10
      }
    }];

    component._super = sinon.stub();
    component._destroyMasonry = sinon.stub();

    component.didUpdateAttrs(...args);

    assert.ok(component._super.calledOnce, '_super was called once');
    assert.deepEqual(component._super.args[0], args, '_super was called with the attrs passed to didUpdateAttrs');

    assert.ok(component._destroyMasonry.calledOnce, 'masonry was destroyed');
  });

  test('didUpdateAttrs does nothing if no masonry-specific options were changed', function(assert) {
    let component = this.owner.factoryFor('component:masonry-grid').create();
    let args = [{
      oldAttrs: {
        gutter: 10
      },
      newAttrs: {
        gutter: 10
      }
    }];

    component._super = sinon.stub();
    component._destroyMasonry = sinon.stub();

    component.didUpdateAttrs(...args);

    assert.ok(component._super.calledOnce, '_super was called once');
    assert.deepEqual(component._super.args[0], args, '_super was called with the attrs passed to didUpdateAttrs');

    assert.ok(component._destroyMasonry.notCalled, 'masonry is not destroyed');
  });
});
