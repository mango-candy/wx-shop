<template>
	<view>
		Cart
	</view>
</template>

<script>
  // 按需导入 badgeMix(底部tag栏徽标) 这个辅助方法
  import badgeMix from '@/mixins/tabbar-badge.js' 
  
	export default {
    mixins:[badgeMix], //引用badgeMix(底部tag栏徽标)这个方法
    computed: {},
    // 生命周期函数，在页面刚刷新出来的时候执行
    onShow(){},
		data() {
			return {};
		},
    methods:{}
	}
</script>

<style lang="scss">

</style>
