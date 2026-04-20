import { createRouter, createWebHistory } from "vue-router";

import { menuData } from "@/assets/menuData";
const dir = '../views'

const modules = import.meta.glob('../views/**/*.vue')
console.log(modules)

// 根据菜单 动态生成路由
function generateRoutes(menus, parentPath = '') {
  return menus.map(menu => {
    const path = dir + menu.index + '.vue'
    const component = modules[path]
    const route = {
      path: menu.index,
      name: menu.title,
      component,
      meta: { title: menu.title, icon: menu.icon }
    }

    if (menu.children && menu.children.length > 0) {
      route.children = generateRoutes(menu.children, menu.index)
      // 父级路由通常需要一个默认的渲染组件
      route.component = () => import(`../views/EmptyLayout.vue`)
    }
    return route
  })
}

const routes = [
  ...generateRoutes(menuData)
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
