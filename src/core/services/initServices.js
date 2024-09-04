import ApiService from './apiService';
import { setUserTracking } from './cookiesService';
const initServices = {
  init({ apiServiceLogoutCallback }) {
    setUserTracking(); // sets user visit data in cookies
    ApiService.init(apiServiceLogoutCallback); //initializes api service
  },
};

export default initServices;
