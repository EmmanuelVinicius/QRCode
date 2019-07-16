import Axios from 'axios';

const Service = Axios.create({ baseURL: `https://massas-api.herokuapp.com`});
export default Service;