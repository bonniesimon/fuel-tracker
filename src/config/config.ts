// import config from './config.json';

const API_URL_DEV = process.env.REACT_APP_API_URL_DEV;
const API_URL_PROD = process.env.REACT_APP_API_URL_PROD;

const NODE_ENV = process.env.NODE_ENV;

let url;
switch(NODE_ENV){
	case "production":
		url = API_URL_PROD;
		break;
	case "development":
		url = API_URL_DEV;
		break;
	default:
		break;
}
const API_URL = url;

const config = {
	API_URL
};


export default config;