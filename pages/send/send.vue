<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12"/>
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="fsyzm">{{wait?num+"秒后可再发送":"发送"}}</text>
			</view>
			<input type="text" v-model="code"  placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="toLogin" :disabled="code.length==4?false:true">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;" >通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import {sms,login} from "../../utils/api.js"
	export default {
		data(){
				
			return{
				
				phone:"",
				code:"",
				wait:false,
				num :10,
				
			}
			
		},
		
			
		methods:{
			async fsyzm(){
				var reg = /^1[3-9]\d{9}$/;
				var bool = reg.test(this.phone)
				
				if(bool){
					
					if(this.wait == false){
						this.wait = true
						let phone = this.phone
						let result = await sms({phone})
						console.log(result)
						wx.setStorageSync("code",result.data.list.code)
						var djs = setInterval(()=>{
							this.num = this.num-1
							if(this.num == 0){
								this.num = this.num-1
								clearInterval(djs)
								this.wait = false,
								this.num = 10
							}
							
							
						},1000)
						
					}else{
						return
					}
					
					
				}else{
					uni.showToast({
						title:"请输入正确的手机格式",
						icon:"none"
					})
				}
				
				
				
				
			},
			
			async toLogin(){
				var phone = this.phone
				var code = wx.getStorageSync("code")
				if(this.code == code){
					let result = await login({phone})
					console.log(result)	
					var userInfo = result.data.list
					wx.setStorageSync("userInfo",userInfo)
					uni.switchTab({
					    url: '/pages/mine/mine'
					});
					
				}else{
					wx.showToast({
						title:"验证错误",
						icon:"none"
					})
					
					
				}
				
				
				
				
			}
			
			
			
		}
		
		
		
	}
	
	
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box{
		position: relative;
	}

	.row{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}
	.send{
		display: flex;
		justify-content: space-between;
	}
	.send text:nth-of-type(2){
		color: #00BB00;
	}
	text{
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}
	input{
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
	
</style>
