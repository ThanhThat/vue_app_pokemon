import axiosClient from '../axiosClient'

const SCHEMA = 'user'
const userApi = {
  gelAll(params) {
    const url = `/${SCHEMA}`
    return axiosClient.get(url, params)
  },
  get(id) {
    const url = `${SCHEMA}/${id}`
    return axiosClient.get(url)
  },
  add(data) {
    const url = `/${SCHEMA}`
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `${SCHEMA}/${data.id}`
    return axiosClient.patch(url, data)
  },
  delete(id) {
    const url = `${SCHEMA}/${id}`
    return axiosClient.delete(url)
  },
  import() {
    console.log('Feature will coming soon!')
  }
}

export default userApi
