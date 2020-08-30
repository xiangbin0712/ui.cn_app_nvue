import request from '@/common/request.js'

export function homePageFeatured(data) {
	return request.request({
		url: '/project/homePageFeatured',
		method: 'POST',
		data: data,
		toggle: true
	})
}
