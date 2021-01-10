<template>
	<view>
		My
	</view>
</template>

<script>
  // 按需导入 badgeMix(底部tag栏徽标) 这个辅助方法
  import badgeMix from '@/mixins/tabbar-badge.js' 
  
	export default {
    mixins:[badgeMix], //引用badgeMix(底部tag栏徽标)这个方法
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
