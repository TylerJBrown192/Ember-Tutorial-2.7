import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['list-filter'],
    filterValue: '',

    init() {
        this._super(...arguments);
        // this.get('filterByCity')('').then(function(results) {
        //     this.set('results', results);
        // });

        this.get('filterByCity')('').then((results) => this.set('results', results));
    },

    actions: {
        handleFilterEntry() {
            let filterInputValue = this.get('filterValue');
            let filterAction = this.get('filterByCity');

            // filterAction(filterInputValue).then(function(filterResults) {
            //     this.set('results', filterResults);
            // });
            filterAction(filterInputValue).then((filterResults) => this.set('results', filterResults));
        }
    }
});
