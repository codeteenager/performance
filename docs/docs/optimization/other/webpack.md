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

## 合理配置resolve参数
配置resolve参数可以为我们在编写代码引入模块时提供不少便利，比如使用extensions省略引入JavaScript文件的后缀，使用alias减少书写所引入模块的多目录层级，使用mainFiles声明目录下的默认使用文件等，但当我们使用这些参数带来便利的同时，如果滥加使用也会降低打包速度。下面举例来说明。

当我们引入JavaScript代码模块时，通常的写法如下：
```js
import Hello from './src/component/hello.js';
```
当项目规模比较大时，为方便代码的组织维护，会拆分出多个模块文件进行引用，可想而知，每次引用模块都填写文件后缀是一件很麻烦的事情，因为代码模块的文件后缀无非就是js，或者是React中的.jsx、TypeScript中的.ts。

我们可以使用resolve中的extensions属性来申明这些后缀，让项目在构建打包时，由webpack帮我们查找并补全文件后缀。同时对组件路径的引用也可通过resolve的alias配置来进行简化，配置如下：
```js
module.exports = {
    resolve: {
        extensions: ['js','jsx','ts'],
        alias: {
            cpn:path.resolve(__dirname,'src/component'),
        }
    }
}
```
如此配置的含义是，当所引入的模块默认了文件后缀时，webpack会在其自定路径下依次查找是否有.js、.jsx、.ts这三种后缀的文件，如果有便使用，并且在模块引入的同时用cpn代替src/component。当有了上述配置后，之前提到的Hello模块的引入便可携程如下形式：
```js
import Hello from 'cpn/hello';
```
可能有人会想既然webpack可以根据resolve的配置进行自动查找，那么是否可以将这种能力充分利用，也添加css文件或图片文件的自动后缀识别呢？最好不要，这样配置不仅会存在同名文件的引用冲突，更严重的是它还会增加许多不必要的文件查找，从而降低打包构建的速度。

另外，resolve还有一个mainFiles属性，通过对他的配置可以指定让webpack查找引入模块路径下的默认文件名，虽然它能在很大程度上简化模块引用的编码量，但付出的代价是增加了打包构建过程中对目标文件的查找时间，所以不建议使用。

## 使用DllPlugin
前端项目中经常会用到庞大的第三方库，来协助我们完成特定功能的开发，而每当发生修改需要重新进行打包时，webpack会默认去分析所有引用的第三方组件库，最后将其打包进我们的项目代码中。在通常情况下，第三方组件包的代码是稳定的，不更换所引用的版本其代码是不会发生修改的，所以这就给出了一条优化的思路，我们仅需要在第一次打包时去分析这些第三方库，而在之后的打包过程中只需使用之前的结果即可。

这便会用到DllPlugin，它是基于Windows动态链接库(DLL)的思想创建出来的，该插件会把第三方库单独打包到一个文件中，作为一个单纯的依赖库，它不会和我们的项目代码一起参与重新打包，只有当依赖自身发生版本变化时才会重新进行打包。

使用DllPlugin处理文件的过程可分为两步：首先基于动态链接库专属的配置文件打包dll库文件，然后再基于webpack的构建文件打包项目代码。下面以一个简单的React组件为例：
```js
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
class App extends Component{
    render(){
        return {
            <div>
                <div>{_.join(['hello','workd'],' ')}</div>
            </div>
        }
    }
}
ReactDom.render(<App />,document.getElementById('root'));
```
这里引入了三个在React项目中经常会遇到的第三方包react、react-dom和lodash，如果我们不进行任何处理，每当修改该文件后进行重新打包，则都会引起webpack去分析它们，若打包次数频繁，显然会浪费许多时间。

接下来我们进行优化，具体分为两步，首先将所依赖的第三方库打包成dll文件，然后检查第三方库的版本是否在其后的迭代中发生了变化，若无变化就都使用之前的打包结果。这里可以为第三方库创建单独的配置文件，内容如下：
```js
//可定义文件名为webpack.dll.js区别于主配置文件
module.exports = {
    mode: 'production',
    entry:{
        vendors: ['react','react-dom','lodash']
    },
    output:{
        filename: '[name].dll.js',
        path:path.resovle(__dirname,'../dll'),
        library: '[name]'
    },
    //分析并输出第三方包的映射关系
    plugins:[
        new webpack.DllPlugin({
            name: '[name]',
            path:path.resolve(__dirname,'../dll/[name].manifest.json')
        })
    ]
}
```
该配置文件中将react、react-dom和lodash三个包的包名存储在数组中，并赋值给vendors，其含义是经过打包后，这三个包归于一个名为vendors的包，output中声明了该包的文件名及输出路径，library字段表示该第三方包对外暴露的引用名，即在其他地方可以使用该字段值引用包中的内容。最后使用webpack的DllPlugin插件对该包中的映射关系进行分析，并将结果输出到指定路径下的json文件。

然后我们需要在webpack主配置文件中，声明对上述打包好的第三方包的使用规则：
```js
//此为webpack主配置文件，以下仅列出与内容说明相关的配置项
module.exports = {
    plugins:[
        //引入打包的第三方包
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname,'../dll/vendors.dll.js')
        }),
        //引入第三方包的映射关系
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
        })
    ]
}
```
这样配置的意思是首先引入第三方包的打包结果路径，其次引入第三方包的映射关系，当发生重新打包构建时，webpack会首先查看引用的第三方包是否包含在已建议的映射关系文件vendor.manifest.json中，若存在便通过所声明的全局变量vendors去使用，若不存在便去node_modules中获取所需的模块，动态的进行打包操作。

上述方式虽然能够降低重复打包构建的时间，但将项目中所有第三方包都打包进一个文件，势必会使其体积过大从而导致请求国漫，所以在实际项目中，我们也应根据各个第三方包的大小进行拆分，就上述代码而言，可将react和react-dom从vendors中组成为一个新包，代码如下：
```js
//webpack.dll.js文件，为说明方便以下仅保留入口字段，其余省略
module.exports = {
    entry: { //将所引用的第三方包，拆分为两个文件
        vendors: ['lodash'],
        react: ['react','react-dom']
    }
}
```
如此在执行webpack构建后会生成四个文件，分别是vendors包的代码文件vendors.dll.js和其映射关系文件vendors.manifest.json，react包的代码文件react.dll.js和其映射关系文件react.manifest.json，同时对应的主配置文件也需要进行相应的修改，以引入打包的代码文件和映射关系文件。
```js
const plugins = [];
//读取dll路径下的所有打包文件
const files = fs.readdirSync(path.resolve(__dirname,'../dll'));
//使用循环方式引入相应的代码文件和映射文件
files.forEach(file=>{
    //通过正则过滤目标文件
    if(/.*\.dll.js/.test(file)){
        plugins.push(new AddAssetHtmlWebpackPlugin({
            filepath:path.resolve(__dirname,'../dll',file)
        }))
    }
    if(/.*\.manifest.json/.test(file)){
        plugins.push(new webpack.DllReferencePlugin({
            filepath:path.resolve(_dirname,'../dll',file)
        }))
    }
});
//为说明方便以下仅保留插件字段，其余省略
module.exports = {
    plugins
}
```
这样处理后，既降低了重复构建时的打包时间，又规避了打包成单一文件时，可能由于代码文件体积过大而存在加载过慢的风险。

## 将单进程转化为多进程
我们都知道webpack是单进程的，就算有多个任务同时存在，他们也只能一个一个排队一次执行，这是nodejs的限制。

但好在大多数cpu已经都是多核的了，我们可以使用happypack充分释放cpu在多核并发方面的优势，帮助我们把多包构建任务分解成多个子任务去并发执行，这将大大提高打包的效率。其使用方法也很简单，就是将原有的loader配置转义到happypack中去处理：
```js
//引入happypack
const Happypack = require('happypack');
//创建线程池
const happyThreadPool = Happypack.ThreadPool({size:os.cpus().length});
module.exports = {
    modules:{
        rules:[
            ...
            {
                test: /\.js$/,
                //指定处理这类文件及相应happypack的实例
                loader: 'happypack/loader?id=happyBabel',
                ...
            }
        ]
    },
    plugins:[
        new Happypack({
            id: 'happyBabel',   //对应规则中的'happyBabel'，表示实例名
            threadPool: happyThreadPool, //指定线程池
            loaders: ['babel-loader?chacheDirectory']
        })
    ]
}
```
## 压缩打包结果的体积
若能使打包构建的结果体积减小，所带来的性能受益是显而易见的，这里来介绍一下常见的压缩思路。
1. 删除冗余代码

webpack从2.0版本开始，便基于ES6推出了Tree-shaking，它能根据import、export的模块导入导出语法，在构建编译过程中分析每个模块是否被真实的使用，对于没用到的代码，会在最后的打包结果中删除。

比如在某个组件中通过import引入了两个模块module1和module2，但只使用了module1并未使用module2，由于引用模块的使用情况，是可以在静态分析过程中识别出来的，所以当打包进行到该组件时，Tree-shaking便会直接帮我们将module2删除。

容易看出Tree-shaking对处理模块级的代码冗余比较擅长，但对更细粒度的代码冗余，比如console语句、注释等，可能就需要在CSS和JavaScript压缩过程中进行处理了，常用的方式是通过uglifyjs-webpack-plugin来实现的，具体配置方式如下：
```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    plugins:[
        new UglifyJsPlugin({
            cache:true, //开启缓存
            parallel: true, //允许并发执行
            compress: {
                drop_console: true, //删除代码中所有console语句
                reduce_vars: true  //把代码中使用多次的静态值定义成变量
            },
            output:{
                comment: false:    //删除代码中的所有注释
                beautify: false   //删除多余空格，让最后输出的代码尽量紧凑
            }
        })
    ]
}
```
由于webpack在3.x版本与4.x版本中存在较大不同，这里额外补充一下，webpack同所有活跃的前端项目一样，都处在快速迭代演进过程中，现在的这种写法，可能会在下个更新的版本中，会存在不同的配置方式。

2. 代码拆分按需加载

正如使用DllPlugin来拆分出第三方库的打包文件一样，对我们的项目代码来说，如果不惊醒代码拆分按需加载，则也会降低首屏性能体验。

项目源代码也需要拆分，可以根据路由来划分打包文件，当访问到不同路由时再触发相应回调请求打包文件，对于webpack的打包输出的配置如下：
```js
module.exports = {
    output:{
        path:path.join(__dirname,'/../dist'),
        filename: 'app.js',
        publicPath: defaultSettings.publishPath,
        chunkFilename: '[name].[chunkhash:5].chunk.js'
    }
}
```
以React项目为例，在配置路由时还需添加如下内容：
```js
const getComponent =>(location,callback){
require.ensure([],require=>callback(null,require('../pages/MyComponent').default),'mine')
<Route path="/mine" getComponent={getComponent}>
}
```
此处的关键方法就是require.ensure这个异步方法，webpack会将我们这里定义的组件单独打包成一个文件，仅当路由跳转到mine时，才会触发回调去获取MyComponent组件的内容。

3. 可视化分析
有时候在进行了常规优化之后，可能还是会觉得性能不佳，但我们又不知道哪里出了问题，此时就特别需要一个分析工具，来辅助评估打包构建的结果到底如何。这里推荐一个不错的分析打包结果的可视化工具:webpack-bundle-analyze。

该插件的工作原理也比较简单，就是分析在compiler.plugin('done',function(stats));时传入的参数stats，它是webpack的一个统计类Stats的实例，然后通过对实例调用toJson()方法转成json文件，再从中提取出chunks各个包的大小信息，最后在Canvas中进行画图。通过该图能让开发者快速意识到哪些模块异常的大，然后找出过大的原因去优化它。

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    plugins:[
        new BundleAnalyzerPlugin({
            //支持'server'、'static'或'disabled'三种模式
            //在server模式下，分析器将启动HTTP服务器来显示软件包报告
            //在静态模式下，会生成带有报告的单个HTML文件
            //在disabled模式下，支持用这个插件生成Webpack Stats JSON文件
            analyzerMode: 'server',
            //将在server模式下使用主机启动HTTP服务器
            analyzerHost: '127.0.0.1',
            //将在server模式下使用端口启动HTTP服务器
            analyzerPort: 8888,
            //生成的报告文件
            reportFilename: 'report.html',
            //在默认浏览器中自动打开报告
            openAnalyzer: true,
            //如果为true，则Webpack Stats JSOn文件将在bundle输出目录中生成
            generateStateFile: false,
            //相对于捆绑输出目录
            statsFilename: 'stats.json',
            //排除统计文件中模块的来源
            statsOptions: null,
            //日志级别
            logLevel: 'info'
        })
    ]
}
```