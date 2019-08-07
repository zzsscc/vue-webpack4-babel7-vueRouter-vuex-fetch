export default [
  {
    path: '*',
    name: 'index',
    filePath: 'views/other/404'
  },
  {
    path: '/',
    name: 'home',
    filePath: 'views/home/index'
  },
  {
    path: '/home',
    name: 'home',
    filePath: 'views/home/index'
  },
  {
    path: '/redirect-path',
    name: 'redirect-path',
    filePath: 'views/home/index',
    redirect: { path: '/test-alias' }
  },
  {
    path: '/redirect-name',
    name: 'redirect-name',
    filePath: 'views/home/index',
    redirect: { name: 'redirect-path' }
  },
  {
    path: '/redirect-fun',
    name: 'redirect-fun',
    filePath: 'views/home/index',
    redirect: to => {
      // console.log(to)   to：这个路由本身
      return '/redirect-name'
    }
  },
  {
    path: '/test',
    name: 'test',
    filePath: 'views/test',
    alias: '/test-alias'
  },
  {
    path: '/example/:id?',
    name: 'example',
    filePath: 'views/example/index',
    props: true,  // 在组件中也可以使用props: ['id']获取定义，this.id即可使用。同时this.$route.params.id获取依然有效
    children: [
      {
        path: 'detail/:detailId?',   // 子路由params参数命名detailId不能和父级params参数命名id相同，不然无法在自路由中取得上级路由对应的params参数
        name: 'exampleDetail',
        filePath: 'views/example/detail/index'
      },
      {
        path: 'list',
        name: 'exampleList',
        filePath: 'views/example/detail/list'
      }
    ]
  }
]