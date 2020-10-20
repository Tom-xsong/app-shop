<template>
	<view>
		<uni-search-bar :radius="100" bgColor="#ffffff" class="input_"></uni-search-bar>
		<view class="list" v-if="goodsList.length>0">
			<view class="row" v-for="item in goodsList" :key="item.id">
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>
					<text>原价￥{{item.price}}</text>
					<text>现价￥{{item.price}}</text>
					<text>3242评论</text>
				</view>
			</view>

		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {
		search
	} from "../../utils/api.js"
	import {
		baseUrl
	} from "../../utils/tool.js"
	export default {
		data() {

			return {


				goodsList: []
			}



		},

		async onLoad(options) {
			var keywords = options.keyword

			let result = await search({
				keywords
			})

		     var arr = result.data.list||[]
			arr.forEach(item => {
				item.img = baseUrl + item.img
			})
		
			this.goodsList = arr
			



		}



	}
</script>

<style>
	.row {
		position: relative;
		margin: 10rpx 20rpx;
		height: 190rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}

	image {
		position: absolute;
		top: 0;
		left: 10rpx;
		width: 160rpx;
	}

	.info {
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}

	.info text:nth-of-type(2) {
		color: red;
	}

	.info text:nth-of-type(3) {
		font-size: 20rpx;
		color: #AAAAAA;
	}

	.tishi {
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
