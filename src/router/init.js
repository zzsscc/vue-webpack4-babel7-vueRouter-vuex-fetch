import Vue from 'vue'
import Router from 'vue-router'
import routersData from 'router'

function lazyLoad(path) {
  return () => import('../' + path + '.vue')
}

const base = '/activity/'
try {
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
        let children = children
        item.children = initRouter(children)
      }
      result.push(item)
    })
    return result
  })(routersData)
  console.log(routes)
} catch (err) {
  console.log(err)
}



Vue.use(Router)

const router = new Router({
  base,
  mode: 'hash',
  routes
})

export default router
