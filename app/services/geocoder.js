import Service, {inject as service} from '@ember/service';
import { reads } from '@ember/object/computed'

export default Service.extend({
    googleMapsApi: service(),
    google: reads('googleMapsApi.google'),

    init(){
        this._super(...arguments)
        this.get('google').then((google) => {
            let geocoder = new google.maps.Geocoder()
            this.set('geocoder', geocoder)
        })
    },
    decode(address){
        this.get('geocoder').geocode({address: address}, function(results, status){
            if (status == 'OK'){
                return results
            }
        })
    }
});