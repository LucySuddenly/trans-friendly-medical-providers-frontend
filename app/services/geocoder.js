import Service, {inject as service} from '@ember/service';
import { reads } from '@ember/object/computed'
import { computedPromise } from 'ember-google-maps/utils/helpers';

export default Service.extend({
    googleMapsApi: service(),
    google: reads('googleMapsApi.google'),
    geocoder: computedPromise(function() {
        return this.get('google').then((google) => new google.maps.Geocoder());
      }),
    init(){
        this._super(...arguments)
        // this.get('google').then((google) => {
        //     let geocoder = new google.maps.Geocoder()
        //     this.set('geocoder', geocoder)
        // })
    },
    decode(address){
        this.get('geocoder').then(geocoder => geocoder.geocode({address: address}, function(results, status){
            if (status == 'OK'){
                return results
            }
        }))
    }
});