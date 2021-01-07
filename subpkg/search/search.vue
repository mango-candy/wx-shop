<template>
	<view class="search-box">
		<uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
    methods:{
      // 搜索框输入事件
      input(){
        
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
