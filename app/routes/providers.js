import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    geocoder: service(),
    model(){
        return fetch('http://localhost:3000/providers')
        .then(resp => resp.json())
        .then(json => {
            return json.map(provider => {
                provider.latlon = this.geocoder.decode(provider.address1 + " " + provider.address2 + " " + provider.city + " " + provider.state)
                return provider
            });
        })
    }
});
