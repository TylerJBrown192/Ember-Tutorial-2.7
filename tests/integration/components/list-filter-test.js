import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('list-filter', 'Integration | Component | list filter', {
    integration: true
});

const items = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const filteredItems = [{city: 'San Francisco'}];

test('should initially load all listings', function(assert) {
    this.on('filterByCity', function(val) {
        if (val === '') {
            return RSVP.resolve(items);
        } else {
            return RSVP.resolve(filteredItems);
        }
    });

    this.render(hbs`
        {{#list-filter filterByCity=(action 'filterByCity') as |results|}}
            <ul>
                {{#each results as |item|}}
                    <li class="city">
                        {{item.city}}
                    </li>
                {{/each}}
            </ul>
        {{/list-filter}}
    `);

    return wait().then(function() {
        assert.equal(this.$('.city').length, 3);
        assert.equal(this.$('.city').first().text().trim(), 'San Francisco');
    });
});

test('should update with matching listings', function(assert) {
    this.on('filterByCity', function(val) {
        if (val === '') {
            return RSVP.resolve(items);
        } else {
            return RSVP.resolve(filteredItems);
        }
    });

    this.render(hbs`
        {{#list-filter filterByCity=(action 'filterByCity') as |results|}}
            <ul>
                {{#each results as |item|}}
                    <li class="city">
                        {{item.city}}
                    </li>
                {{/each}}
            </ul>
        {{/list-filter}}
    `);

    this.$('.list-filter input').val('San').keyup();

    return wait().then(function() {
        assert.equal(this.$('.city').length, 1);
        assert.equal(this.$('.city').text().trim(), 'San Francisco');
    });
});