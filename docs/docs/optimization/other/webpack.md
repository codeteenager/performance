# webpack优化
webpack的优化瓶颈主要体现在两方面：打包构建过程太浪费时间，打包结果体积太大。对大部分前端项目来说，每次的修改调试都有可能需要对全部或部分的代码进行打包构建，可想而知如果这个过程十分耗时，将会非常影响开发效率，并且如果打包结果过大，必然也让HTTP的单次请求花费过长时间。

## 尽量与时俱进
如果想要提高webpack的打包速度，我们可以首先选择升级webpack的版本、nodejs的版本及yarn或npm包管理工具的版本。因为webpack每个版本更新时，其内部肯定会进行相应的优化，当更新了webpack的版本后，其打包构建速度便会相应的得到提升。而webpack又是建立在nodejs运行环境之上的，如果nodejs进行了升级，就意味着它的运行效率会得到提升，同样当安装了新版本的yarn或npm包管理工具后，对于项目中模块之间的相互引用，新的包管理器便会更快的进行依赖分析或包的引入，这也会间接的提升webpack的打包速度。

因此在项目中尽可能使用最新稳定版本的webpack、nodejs、npm或yarn能有效的提升打包构建的效率。

## 减少Loader的执行
根据具体情况使用include或exclude，在尽可能少的模块上执行Loader，webpack的配置文件如下：
```js
const path = require('path');
module.exports = {
    entry:{
        main: './src/index.js'
    },
    module:{
         rules:[
            {
                test: /\.js$/,
                //针对出node_modules文件夹路径之外的JavaScript
                exclude: /node_modules/,
                use:[{loader:'babel-loader'}]
            }
         ]
    }
}
```
这里关注module字段中对JavaScript文件的处理规则，如果不加exclude字段，则webpack会对该配置文件所在路径下的所有JavaScript文件使用babel-loader，虽然babel-loader的功能强大，但它执行起来很慢。

这样所处理的JavaScript不仅包含我们的项目源代码，还会涉及node_modules路径下项目引用的所有第三方文件。由于第三方库的文件在发布前本身已经执行过一次babel-loader，没必要再重复执行一次，增加不必要的打包构建耗时，所以exclude字段不可省略。