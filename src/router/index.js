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
        path: 'detail/:detailId?',
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