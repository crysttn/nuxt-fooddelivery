import Strapi from 'strapi-sdk-javascript/build/main'

const apiUrl = process.env.API_URL || 'https://hidden-springs-04285.herokuapp.com/'
const strapi = new Strapi(apiUrl)

export default strapi;
export { apiUrl }