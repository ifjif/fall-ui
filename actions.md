1. 外部透传
   如果组件根元素有动态 :style / :class 绑定，同时又希望支持外部透传，最好用 useAttrs() 手动合并，而不是依赖自动透传。(自动可能被优化杀死)

2. 所有组件未显示使用useAttrs将外部style合并到内部根中的组件
   请勿外部传style或class,除非声明了style或class属性
