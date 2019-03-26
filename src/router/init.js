import Router from 'vue-router'
import routersData from 'router'

function lazyLoad(path) {
  return () => import('src/' + path + '.vue')
}

const routes = (function initRouter(route) {
  let result = []
  route.forEach(r => {
    const { name, path, filePath, redirect, meta, alias, props = false, children } = r
    let item = {
      name,
      redirect,
      meta,
      path,
      alias,
      props
    }
    item.component = lazyLoad(filePath)
    // 如有children递归
    if (children) {
      item.children = initRouter(children)
    }
    result.push(item)
  })
  return result
})(routersData)

const router = new Router({
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  toDepth < fromDepth ? console.log('slide-right') : console.log('slide-left')
  next()
})

console.log(router)

export default router
