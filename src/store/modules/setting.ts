//小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是收起的控制
      refresh: false, //用户控制刷新
    }
  },
})

export default useLayOutSettingStore
