import Controller from '@ember/controller';
import { set } from '@ember/object';

export default Controller.extend({
    actions: {
        toggle: function(provider) {
            set(provider, 'markerOpen', !provider.markerOpen)
        }
    }
});
