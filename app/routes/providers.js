import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

const DECODE_IN_SEQUENCE = true;

export default Route.extend({
  geocoder: service(),

  async model() {
    return DECODE_IN_SEQUENCE
      ? this.sequencedModelHook(...arguments)
      : this.parrallelModelHook(...arguments);
  },

  async parrallelModelHook() {
    let json = await fetch('https://trans-friendly-providers.herokuapp.com/providers').then(r => r.json());
    let decodes = json.map(async provider => {
      let { address1, address2, city, state } = provider;
      let geocodeAddress = [address1, address2, city, state].join(' ');
      let latlon = await this.geocoder.decode(geocodeAddress);
      let markerOpen = false
      return { ...provider, latlon, markerOpen };
    });
    return await Promise.all(decodes);
  },

  async sequencedModelHook() {
    let providers = [];
    let json = await fetch('https://trans-friendly-providers.herokuapp.com/providers').then(r => r.json());
    for (let provider of json) {
      let { address1, address2, city, state } = provider;
      let geocodeAddress = [address1, address2, city, state].join(' ');
      let latlon = await this.geocoder.decode(geocodeAddress);
      let markerOpen = false
      providers.push({ ...provider, latlon, markerOpen });
    }
    return providers;
  }

});


