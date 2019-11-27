import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    geocoder: service(),
        model(){
        return fetch('http://localhost:3000/providers')
        .then(resp => resp.json())
        .then(json => {
            const geocoder = this.get('geocoder')
            return json.map( async provider => {
                provider.latlon = await geocoder.decode(provider.address1 + " " + provider.address2 + " " + provider.city + " " + provider.state)
                console.log(provider.latlon)
                return provider
            });
        })
    }
});
