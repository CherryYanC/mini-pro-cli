##### 简易小程序脚手架(构建还需要优化, 基本使用没啥问题)
 typescript + gulp
  待集成mobx状态管理
  完成了ts编译并压缩js代码
  完成了增量编译，提高了开发时编译的速度
  加入sourcemaps，方便debug时调试
###### 项目运行
  1. yarn 安装依赖
  2. gulp watch 运行项目，并创建dist，小程序开发者工具导入项目可直接到dist或者上一层目录均可
  3. gulp build编译项目
