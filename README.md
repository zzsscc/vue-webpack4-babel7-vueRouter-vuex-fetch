# ------

## 安装依赖

  yarn

## 开发模式启动

npm start

## 关于项目的一些编程规范建议

1. 所有需求的图片都放在`src/static`目录，小图片(小于10K)都放在`src/static/sprites`下，大图片都放在`src/static/images`下，大的图片一定要到这个网站下压缩后再放进来： https://tinypng.com/

   然后我们在文件中就可以这样引用了：  `import xx from 'sprites/xx.png'`

## 打包

npm run prod
