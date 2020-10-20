const baseUrl = "http://localhost:3000"

async function request(url = "", data = {}, method = "GET", header = {}) {

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			data: data,
			method: method,
			header: header,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}

		})
	})

}




export {
	request,
	baseUrl,
	
}
