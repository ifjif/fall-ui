import { createRouter, createWebHistory } from "vue-router";
import comData from "@/assets/com-data";
import { menuData } from "@/assets/menuData";

const dir = '../views'
const comDir = '../components'

const modules = import.meta.glob('../views/**/*.vue')
const comModules = import.meta.glob('../components/**/*.vue')

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

// 组件路由
function generateComRoutes(coms) {
  return coms.map(com => {
    const path = comDir + com.index + '.vue'
    const component = comModules[path]
    const route = {
      path: com.index,
      name: com.title,
      component,
      meta: { title: com.title, icon: com.icon }
    }

    if (com.children && com.children.length > 0) {
      route.children = generateComRoutes(com.children)
      route.component = () => import('../views/EmptyLayout.vue')
    } else if (com.title === 'menu') {
      route.children = generateRoutes(menuData)
    }

    return route
  })
}

const routes = [
  ...generateComRoutes(comData),
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
