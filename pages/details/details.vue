<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="detail.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{detail.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">{{detail.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="jian">-</label>
					<label class="zhi">{{count}}</label>
					<label class="jia" @click="add">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>规格</label>
					<view class="threed3i1" v-for="item in detail.specsattr">{{item}}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<rich-text :nodes="detail.description"></rich-text>
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg" />
					<image src="../../static/detail/pingjia2.jpg" />
					<image src="../../static/detail/pingjia3.jpg" />

				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="addCar">加入购物车</button>
			<button class="footbtn2">立即购买</button>
		</view>
	</view>
</template>
<script>
	import {
		getgoodsinfo,
		cartadd,
		checktoken
	} from "../../utils/api.js"
	import {
		baseUrl
	} from "../../utils/tool.js"
	export default {
		data() {
			return {
				detail: [],
				count: 1,
				id: ""


			}
		},
		methods: {

			add() {

				this.count += 1;

			},

			jian() {

				if (this.count == 0) {
					wx.showToast({
						title: "不能在少了",
						icon: "none"
					})
				} else {
					this.count -= 1
				}

			},

			async addCar() {
				let {token} = uni.getStorageSync('userInfo')
				if (token) {

					let {
						uid,
						token
					} = uni.getStorageSync("userInfo")

					var goodsid = this.id

					var num = this.count

					var result = await cartadd(uid, goodsid, num, token)
					console.log(result)

					wx.showToast({
						title: "成功添加购物车"
					})



				} else {
					uni.navigateTo({
						url: '/pages/send/send'
					})

				}


			}


		},

		async onLoad(options) {
			this.id = options.id

			var result = await getgoodsinfo({
				id: this.id
			});
			result.data.list[0].img = baseUrl + result.data.list[0].img
			result.data.list[0].specsattr = result.data.list[0].specsattr.split(",")
			console.log(result)
			this.detail = result.data.list[0]


		}
	}
</script>
<style>
	@import url("../../common/css/details.css");
</style>
