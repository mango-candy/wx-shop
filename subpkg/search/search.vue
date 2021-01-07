<template>
	<view class="search-box">
		<uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,  //延时器
        kw: '' //搜索框输入内容
			};
		},
    methods:{
      // 搜索框输入监听事件
      input(e){
        // console.log(e.value)
        clearTimeout(this.timer)   // 第二步,若500毫秒内重复触发input输入事件,则清除上一个延时器重新计时

        this.timer=setTimeout(()=>{        // 第一步建议一个500毫秒的延时器
          this.kw=e.value
        },500)
      }
    }
	}
</script>

<style lang="scss">
 .uni-searchbar {
    background-color: #c00000 !important;
 }
.search-box{
   position: sticky;
    top: 0;
    z-index: 999;
}
</style>
