import {request} from './tool.js';


//分类导航
async function getcate(){
	return await request("/api/getcate");
}


//轮播图
async function getbanner(){
	return await request("/api/getbanner");
}


//秒杀
async function getseckill(){
	return await request("/api/getseckill");
}


async function getindexgoods(){
	return await request("/api/getindexgoods");
}

async function search(obj){
	return await request("/api/search",obj);
}


async function getcates(){
	return await request("/api/getcates");
}

async function getgoodsinfo(id){
	return await request("/api/getgoodsinfo",id);
}

async function sms(phone){
	return await request("/api/sms",phone);
}

async function login(obj){
	return await request("/api/wxlogin",obj);
}


async function cartadd(uid,goodsid,num,token){
	return await request("/api/cartadd",{uid,goodsid,num},"GET",{
		 authorization:token
	})
}


async function cartlist(uid,token){
	return await request("/api/cartlist",{uid},"GET",{
		authorization:token
	})
}


async function cartedit(id,num,checked,token){
	return await request("/api/cartedit",{id,num,checked},"GET",{
		authorization:token
	})
}


async function cartdelete(id,token){
	return await request("/api/cartdelete",{id},"GET",{
		authorization:token
	})
}

async function checktoken(token){
	return await request("/api/checktoken",{},"GET",{
		authorization:token
	})
}


export {
	getcate,
	getbanner,
	getseckill,
	getindexgoods,
	search,
	getcates,
	getgoodsinfo,
	sms,
	login,
	cartadd,
	cartlist,
	cartedit,
	cartdelete,
	checktoken
	
	
	
}