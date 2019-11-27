import Service, { inject as service } from '@ember/service';
import { get } from '@ember/object';

const NULL_LOCATION = {
  lat() {
    return null;
  },
  lng() {
    return null;
  }
};

export default Service.extend({
  googleMapsApi: service(),

  async decode(address) {
    const google = await this.googleMapsApi.google;
    let geocoder = new google.maps.Geocoder();
    let [results, status] = await new Promise(resolve => {
      geocoder.geocode({ address }, (results, status) => resolve([results, status]));
    });
    if (status !== 'OK') {
      let error = new Error(`Geocode resonse had status '${status}'`);
      error.code = 'EGEOCODENOTOK';
      throw error;
    }
    let location = get(results, 'firstObject.geometry.location') || NULL_LOCATION;
    return [location.lat(), location.lng()];
  }
});

// import Service, {inject as service} from '@ember/service';
// import { reads } from '@ember/object/computed'
// import { computedPromise } from 'ember-google-maps/utils/helpers';

// export default Service.extend({
//     googleMapsApi: service(),
//     google: reads('googleMapsApi.google'),
//     geocoder: computedPromise(function() {
//         return this.get('google').then((google) => new google.maps.Geocoder());
//       }),
//     init(){
//         this._super(...arguments)
//     },
//     async decode(address){
//         return await this.get('geocoder').then(geocoder => geocoder.geocode({address: address}, function(results, status){
//             if (status == 'OK'){
//                 const latlon = [results[0].geometry.location.lat(), results[0].geometry.location.lng()]
//                 console.log(latlon)
//                 return latlon
//             }
//         }))
//     }
// });