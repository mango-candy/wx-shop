export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: [],
  }),

  // 模块的 mutations 方法
  mutations: {
    // 1.定义addToCart添加购物车方法，形参内state代表模块内的state数据，goods代表外界传递过来的商品数据
    addToCart(state,goods){
      // 2.使用find方法，寻找当前购物车内的商品id和后续添加的商品id是否相等
      // 如find寻找到对应条件，则findResult返回结果为是寻找到的商品对象/数组，说未找到则findResult返回undefined
     const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
     // 3.1 如果不相等，则证明需要添加的商品不在购物车内，需要添加到购物车
     if(!findResult) {
       state.cart.push(goods)
     }else{
       // 3.2 如果相等，则证明需要添加的商品已存在购物车，只需要将购物车内的商品数量加1即可
       findResult.goods_count++
     }
    }
  },

  // 模块的 getters 属性
  getters: {},
}