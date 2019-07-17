import Axios from 'axios';

const Service = Axios.create({ baseURL: `http://localhost:${process.env.PORT || 3001}`});
export default Service;