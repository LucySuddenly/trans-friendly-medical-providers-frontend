import Controller from '@ember/controller';
import { set } from '@ember/object';

export default Controller.extend({
    showNewProvider: false,
    showError: false,
    name: '',
    description: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    website: '',
    phone: '',
    actions: {
        toggleProviderShow: function() {
            this.toggleProperty('showNewProvider')
        },
        toggleMarkerShow: function(provider) {
            set(provider, 'markerOpen', !provider.markerOpen)
        },
        toggleErrorShow: function() {
            this.toggleProperty('showError')
        },
        save: function() {
            fetch('https://trans-friendly-providers.herokuapp.com/providers',{
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                provider: {
                    name: this.get('name'),
                    description: this.get('description'),
                    address1: this.get('address1'),
                    address2: this.get('address2'),
                    city: this.get('city'),
                    state: this.get('state'),
                    zip: this.get('zip'),
                    website: this.get('website'),
                    phone: this.get('phone')
                }
            })
            })
            .then(resp => resp.json())
            .then(json => {
                if (json.id) {
                    location.reload()
                } else {
                    this.set('errorMessage', json)
                    this.toggleProperty('showError')
                }
            })
        }
    }
});
