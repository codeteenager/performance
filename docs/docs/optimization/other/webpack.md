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

同时与之对应的还有一个include字段，其使用含义与exclude相反，即仅对其指定范围内的JavaScript文件进行处理，以降低loader被执行的频率。

对于图片文件则没有必要通过include或exclude来降低loader的执行频率，因为无论哪里引入的图片，最后打包都需要通过url-loader对其进行处理，所以include或exclude的语法并不适用于所有loader类型，要根据具体的情况而定。

使用exclude或include可以帮助我们规避对庞大的第三方库文件的处理，但仅通过限定文件处理范围所带来的性能提升其实是有限的，除此之外，如果开启缓存将构建结果缓存到文件系统中，则可让babel-loader的工作效率得到成倍增加，处理方式也很简单，只需为loader增加相应的参数即可。
```js
loader: 'babel-loader?cacheDirectory=true'
```

## 确保插件的精简与可靠
通常我们会根据前端代码的执行环境是线上环境还是开发环境来规定不同的webapck配置内容，比如在线上环境中，我们希望打包后的代码尺寸尽可能小，用户加载的速度尽可能快，所以就需要对代码进行压缩，下面的配置项声明使用OptimizeCSSAssetsPlugin插件来压缩CSS资源文件。

如果在开发环境下，由于不需要考虑代码对用户的加载速率，并且压缩了反而会降低代码的可读性，增加开发成本，所以在开发环境下不用引入代码压缩插件。
```js
module.exports = {
    entry:{},
    module:{},
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
        output:{}
    }
}
```
对于有必要使用插件的情况，建议使用webpack官方网站上推荐的插件，因为该渠道的插件性能往往经过了官方测试，如果使用未经验证的第三方公司或个人开发的插件，虽然他们可能会帮助我们解决在打包构建过程中遇到相应的某个问题，但其性能没有保障，可能会导致整体打包的速度下降。
