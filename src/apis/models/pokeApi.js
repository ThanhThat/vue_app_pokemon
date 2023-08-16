import axiosClient from '../axiosClient'

const SCHEMA = 'pokemon'

const pokeApi = {
  get(params) {
    const url = `/${SCHEMA}/${params}`

    return axiosClient.get(url)
  },
  getAll() {
    return axiosClient.get(`/${SCHEMA}`)
  }
}

export default pokeApi
