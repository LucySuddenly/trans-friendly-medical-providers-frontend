import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        toggle: function() {
            this.toggleProperty('markerOpen')
        }
    }
});
