import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const dummyElement = {};

let MapUtilStub = Ember.Object.extend({
    createMap(element, location) {
        this.assert.ok(element, 'createMap called with element');
        this.assert.ok(location, 'createMap called with location');

        return dummyElement;
    }
});

moduleFor('service:maps', 'Unit | Service | maps', {
    // Specify the other units that are required for this test.
    needs: ['util:google-maps']
});

test('should create a new map if one isnt cached for location', function(assert) {
    assert.expect(4);

    let stubMapUtil = MapUtilStub.create({ assert });
    let mapService = this.subject({ mapUtil: stubMapUtil });
    let element = mapService.getMapElement('San Francisco');

    assert.ok(element, 'element exists');
    assert.equal(element.className, 'map', 'element has a class name of map');
});

test('should use existing map if one is cached for location', function(assert) {
    assert.expect(1);

    let stubCachedMaps = Ember.Object.create({
        sanFrancisco: dummyElement
    });
    let mapService = this.subject({ cachedMaps: stubCachedMaps });
    let element = mapService.getMapElement('San Francisco');

    assert.equal(element, dummyElement, 'element fetched from cache');
});