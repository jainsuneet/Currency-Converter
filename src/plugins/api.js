import * as constants from '../statics/constants'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = constants.API_ENDPOINT

// API call to get all the currency symbols
export async function getCurrencySymbols() {
    return axios.get(`/latest`)
}

// API call to get conversion rate against a base currency
export async function getCurrencyConversion(options = {}) {
    return axios.get(`latest?${qs.stringify(options)}`)
}