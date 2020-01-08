import request from '@/utils/request'

export function loadResultList(data) {
    return request({
        url: 'api/result',
        method: 'get',
        params: data
    })
}

