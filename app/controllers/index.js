import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        filterByCity(cityParam) {
            if (cityParam !== '') {
                return this.get('store').query('rental', {city: cityParam});
            } else {
                return this.get('store').findAll('rental');
            }
        }
    }
});
