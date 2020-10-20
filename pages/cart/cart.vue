<template>
	<view class="container">
		<view class="top">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" v-for="(item,index) in list" :key="item.id">
				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.checked" @click="dan(index)"/>
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="item.img" mode=""></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="jian(index)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="add(index)">+</label>
							</view>
						</view>
					</view>
				</view>
				<view class="cartDel" id="demo2" @click="del(index,item.id)"><label for="">删除</label></view>
			</scroll-view>
		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="isAllCheck"   @click="doAllCheck"/>
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{total}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="jiesuan">
				<!-- 被选中的商品的个数 -->
				<label>去结算(34件)</label>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cartlist,
		cartedit,
		cartdelete
	} from "../../utils/api.js"
	import {
		baseUrl
	} from "../../utils/tool.js"
	export default {
		data() {
			return {

				list: []


			}
        
		},
		computed:{
			total() {
				var sum = 0;
				this.list.forEach(item => {
					if (item.checked) {
						sum += item.price * item.num;
					}
				});
				return sum;
			},
			
			
			isAllCheck: {
				get: function() {
					return this.list.every(item => {
						return item.checked == true;
					});
				},
				set: function(val) {
					//把每个商品的checked状态和全选保持一致
					this.list.forEach(item=>{
						item.checked=val;
					})
				}
			}
		},
		
		methods:{
			async add(index){
				this.list[index].num +=1
				this.toEdit(index)
			},
			
			async jian(index){
				if(this.list[index].num==1){
					wx.showToast({
						title:"不能再少了",
						icon:"none"
					})
				}else{
					this.list[index].num -=1
					this.toEdit(index)
				}
				
			},
			
			dan(index){
				this.list[index].checked = !this.list[index].checked
				this.toEdit(index)
				
			},
			
			
			doAllCheck(){
				this.isAllCheck=!this.isAllCheck
			},
			
			async toEdit(index){
				let { id, num, checked } = this.list[index];
				checked = checked ? 1 : 0; //数据类型要和mysql数据库保持一致
				let { token } = uni.getStorageSync('userInfo');
				var result = await cartedit(id, num, checked, token);
			},
			
			async del(index,id){
				let { token } = uni.getStorageSync('userInfo');
			    let result = await cartdelete(id,token)
			    this.list.splice(index,1)
				
			},
			
			jiesuan(){
				var result = this.list.filter(item=>{
					return item.checked == true
				})
				uni.setStorageSync("result",result)
				uni.navigateTo({
					url:"../confirm/confirm"
				})
				
			}
			
		},
		
		onLoad(){
			let {token} = uni.getStorageSync('userInfo')
			if(token){
				return
		     }else{
		     	uni.navigateTo({
		     		url: '/pages/send/send'
		     	})
		     }
		},
		
		

		async onShow() {
			
				let {
					uid,
					token
				} = uni.getStorageSync("userInfo")
				let result = await cartlist(uid, token)
				console.log(result)
				
				result.data.list.forEach(item=>{
					item.img = baseUrl + item.img
					item.checked = item.checked==1?true:false
				})
				this.list = result.data.list
				
			
			  
			
			
			
            
            


		},
		
		


	};
</script>

<style>
	@import url('../../common/css/cart.css');

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}
</style>
