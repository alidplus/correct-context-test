import client from './client'

export const saveReport = (payload) => {
    return client.post('/post', payload)
}