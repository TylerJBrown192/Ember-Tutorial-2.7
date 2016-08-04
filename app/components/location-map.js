import Ember from 'ember';

export default Ember.Component.extend({
    maps: Ember.inject.service(),

    didInsertElement() {
        this._super(...arguments);

        let cityDisplayed = this.get('cityDisplayed');
        let mapElement = this.get('maps').getMapElement(cityDisplayed);
        this.$('.map-container').append(mapElement);
    }
});
