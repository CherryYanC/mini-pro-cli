##### 简易小程序脚手架(构建还需要优化, 基本使用没啥问题)
 typescript + gulp

  完成了ts编译并压缩js代码
  完成了增量编译，提高了开发时编译的速度
  加入sourcemaps，方便debug时调试
###### 项目运行
  1. yarn 安装依赖
  2. gulp watch 运行项目，并创建dist，小程序开发者工具导入项目可直接到dist或者上一层目录均可
  3. gulp build编译项目

###### 实现目的
  将 .ts 文件编译为 .js 、 .less 文件编译为 .wxss ，以支持 TypeScript 、 Less 语法。
  支持 sourcemaps 方便错误调试与定位。
  压缩图片和各类文件，减少小程序代码包大小。
  分析代码，依赖自动提取，支持提取普通 npm 包与小程序专用 npm 包。
  其余文件将直接拷贝至目标路径。
  添加watch，方便开发者调试。