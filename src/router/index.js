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
    path: '/test',
    name: 'test',
    filePath: 'views/test'
  },
  {
    path: '/example/:id?',
    name: 'example',
    filePath: 'views/example/index',
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