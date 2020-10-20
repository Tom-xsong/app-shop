<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view :class="[num == index?'left_list activeList':'left_list']" v-for="(item,index) in fenleiList" :key="item.id" @click="fu(index)">
				<label for="">{{item.catename}}</label>
			</view>
			
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<view class="bottom_list"v-for="item in fenleiList[num].children">
						<!-- 每个最多显示6个 -->
						<view>
							<image :src="item.img" alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		getcates
	} from "../../utils/api.js"
	import {
		baseUrl
	} from "../../utils/tool.js"
	export default {

		data() {
			return {
				fenleiList: [],
				num:0

			}
		},
		methods:{
			
			fu(index){
				console.log(index)
			  this.num = index
			}
		},




		async onLoad() {

			let result = await getcates()
			
			var arr = result.data.list
			arr.forEach(item =>{
				
				if(item.children){
					item.children.forEach(item1=>{
						item1.img = baseUrl + item1.img
					})
				}else{
					item.children = []
					
				}
		
				

			})
            console.log(arr)
            this.fenleiList = arr
			 
			 

		}




	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");

	/* 点击左侧导航，显示动态样式 */
	.activeList {
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
