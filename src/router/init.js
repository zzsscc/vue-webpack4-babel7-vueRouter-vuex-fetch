import Vue from 'vue'
import Router from 'vue-router'
import routersData from 'router'

function lazyLoad(path) {
  return () => import('src/' + path + '.vue')
}

const routes = (function initRouter(route) {
  let result = []
  route.forEach(r => {
    const { name, path, filePath, redirect, meta, children } = r
    let item = {}
    item.name = name
    item.component = lazyLoad(filePath)
    item.redirect = redirect
    item.meta = meta
    item.path = path
    if (children) {
      item.children = initRouter(children)
    }
    result.push(item)
  })
  return result
})(routersData)
console.log(routes)

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    } else {
        return {
            x: 0,
            y: 0
        };
    }
},
  routes
})
console.log(router)

export default router
