[TOC]

# Vue2

1. Vue实例和容器是一一对应的
2. 实际开发中一个页面只有Vue实例，并配合着组件使用
3. data数据的变化，模板中引用的数据也会变化，（原型、深浅拷贝、moudle）
4. 4.{{}}中只能写js表达式



## 模板语法

指令语法（用于解析标签包括标签属性、标签体内容、绑定事件。。。。）：

1. ​	插值用于标签体内容，指令用于标签属性

- v-bind:动态绑定并查找解析（简写 ==>:），单项数据绑定

- v-on:v-on:click==>缩写 @click

- v-for:

- v-if:

- v-model:双向数据绑定，且只能运用在表单类标签上，简写 v-model,因为获取的就是value,<input type="text" v-model='msg'>

  2.动态参数 v-bind:[attributeName]   v-on:[eventName]

  - 动态求值:
  - 动态绑定处理函数:
  - 动态参数值的约束:预期求出一个字符串，异常为Null,可以显示的用来移除绑定
  - 动态参数表达式的约束：空格引号无效，键名避免使用大写

## 数据代理

![](C:\Users\ck\Desktop\照片\数据代理.png)

## 事件处理

### 事件修饰符

方法只有纯碎的数据逻辑，而不是去处理DOM事件细节

- .stop:@click.stop->阻止冒泡（常用）

- .prevent:@submit.prevent->提交页面不再重载页面（常用）

- .capture：事件的捕获模式

- .self：只有event.target是当前操作的元素才触发事件

- .once：只触发一次（常用）

- .passive:提升移动端性能，不能和.prevent一起使用，`.passive` 会告诉浏览器你*不*想阻止事件的默认行为，无需等待事件回调执行完毕。

  使用修饰符，注意顺序：

  @click.prevent.self->阻止所有点击

  @click.self.prevent->只阻止自身元素点击

### 键盘修饰符

- .enter
- .tab：@keydown.tab，才有效
- .delete:捕获删除和退格键
- .esc
- 还可以通过config.keyCodes自定义按键修饰符别名 Vue.config.keyCodes.f1=112

### 系统修饰键

- .ctrl
- .alt
- .shift
- .meta
- 以上都必须使用@keydown

## 计算属性

计算属性是基于它们的响应式依赖进行缓存的（computed）

### 计算属性缓存 && 方法

缓存：只有当所依赖的数据发生改变，即使多次访问也会返回之前的计算结果，而不必再次执行函数

方法：每当触发重新渲染时，调用方法总会再次执行函数

如果不希望有缓存，则使用方法

如果计算的属性要更改，则加入set函数

### 监视属性-Wacth

通过watch响应数据的变化，可以用在当需要数据变化执行异步或开销较大的操作时，！！！（这个方式最有用)

- 当监视的属性发生变化，回调函数自动调用
- 监视的属性必须存在，才能监视
- 写法 new Vue写入watch配置：试用监听属性确定
- vm.$watch:适用监听属性不确定

### Watch深度监视

numbers:{ a:1,b:1  }

watch配置deep:true可以监视对象内部值的改变

Vue自身可以监测对象内部值得改变，而配置watch，默认不行

使用watch需根据数据的具体结构，决定是否使用深度监视

```
data:{
    isHot:true,
    numbers:{
        a:1,
        b:1
    }
    },
'numbers.a':{//监视多级结构中单个属性变化
    handler(){
         console.log('#');
    }
},

///////
numbers:{ 
immediate:true,//立即监听，不论数据有无变化
deep:true,//开启深度监视，监视多级结构中所有属性变化
handler(){
    console.log('!');
}
   },
 /////
isHot(){
console.log('@');
}
```



```

```



### watch与computed区别

- watch可以进行异步操作，computed不行
- computed和watch都可以完成相同得任务
- 所有不被vm所管理得函数（定时器、ajax回调）都写成箭头
- 所有被vm所管理的函数都写成普通函数 this=>vm

## Class与Style绑定

字符串写法：适用于样式类名不确定需要动态指定

数组写法：适用于名字，个数不确定

对象写法：适用于个数，名字确定，需要动态决定用不用

```
data:{
                str:'str',
                classArr:['other1','other2'],
                classObj:{
                    'other1':false,
                    'other2':true
                }
            },
```

## 条件渲染

### v-if&&v-show

1. v-if:真正的条件渲染，确保在切换的过程中事件监听器和组件被销毁和重建
2. v-if：有更高的切换开销
3. v-show:有更高的初始渲染开销
4. v-show:所渲染的元素仍然保留在DOM中，仅通过display切换
5. v-show不支持<temmplate>和v-else
6. 对于两者的使用：对于要切换的元素频率高用v-show,反之用v-if

### key管理可复用元素

vue通常会复用已有的元素而不是从头开始渲染，这样可以更加高效的渲染元素

除此之外还可以允许用户在不同的登录方式之间切换

当某些元素不需要复用时可以添加key attribute,表示完全独立

```
<label>Username</label>
<input type="text" placeholder="Enter you username" key='username-input'>
 
 以上代码 label可以复用，而输入框每次切换都会重新渲染
```

### v-if&&v-for

不推荐同时使用，

Vue2中当一起使用时，**v-for比v-if有更高优先级**

Vue3中当一起使用时，**v-if比v-for有更高优先级**

## 列表渲染

v-for遍历数组

```
<li v-for="(item,index) in array" :key="item.id">
array:[//遍历数组
                    {id:'001',name:'陈康',age:18},
                    {id:'002',name:'CK',age:18},
                ],
```

v-for遍历对象

```
<li v-for='(value,key) in object' :key="key">{{key}}~{{value}}</li>
object:{
                    title:'罗密欧',
                    author:'陈康',
                    publishDate:'2022-1-27'
                }
```

### key(!important)

每次页面的重新渲染都会使新旧VNodes进行对比,若key相同，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法,若key不同，则创建新的真实DOM.

```
index作为key
<li v-for="(item,index) in array" :key="index">
如果对数据进行破坏顺序操作，则会导致页面问题且效率低
仅用于页面渲染列表无问题
```

```
id作为key
<li v-for="(item,index) in array" :key="item.id">
有相同父元素的子元素必须有独特的 key
它也可以用于强制替换元素/组件而不是重复使用它
1.完整地触发组件的生命周期钩子
2.触发过渡
```

### 列表过滤与排序

通过computed，不必变更和重置原有数据属性

## Vue监视数据原理

1. Vue会监视data中所有层次的数据

2. 监测对象中数据

   通过setter实现监测

   vm.$set()&&Vue.set(target,key,value)实现添加属性的响应式

3. 监测数组中的数据	

   ​	通过包裹数组更新元素的方法实现，本质实现原理

   ​	1.调用原生对应的方法对数组进行更新

   ​	2.重新解析模板，进而更新页面

   ​	改变原生数组的方法：push,pop,unshift,shift.splice,sort,reverse

4. 注意，Vue.set()不能给vm和跟数据对象添加属性

## 表单输入绑定

### v-model修饰符

- .lazy:对数据的输入不想同步，而是在change事件之后进行同步
- .number:对表单的输入数据，不想返回字符串，而是原始的值
- .trim:过滤首位空格

### v-molde实现原理

1. **：value**和**@input**实现

   ```
   <input :value='msg'@input="msg=$event.target.value">
   同<input v-model='msg'>
   data:{
   		msg:''
   	}
   ```

   

2. 还可以实现父子组件数据同步

   ```
   父：<Event  v-model='msg'/>
   子：
   <input :value='msg' @input='$emit('input',$e.target.value)'
   ```

   

## 过滤器

定义:对要显示的数据进行特定格式化后在显示，适用简单的逻辑处理

使用限制：插值语法             v-bind:

全局过滤：Vue.filter（name,callback）

局部过滤器：new Vue(){filters：{}} 

## 内置指令

1. v-bind:

2. v-model:绑定的值不允许是props传过来的值，props是不能修改的

3. v-if:

4. v-for:

5. v-show:

6. v-on:

7. v-text:向其所在的文本节点渲染文本内容

   ```
    <h2 v-text="name"></h2>
     data:{
                   name:'陈康'，
                    str:'<h2>解析标签</h2>'
               }
               会将data的值替换掉h2中所有的数据
   1.
   2.不能解析标签，str
   ```

8. v-html:

   1. 可以解析标签
   2. 安全性问题
      1. 在网站上动态渲染任意HTML是非常危险的，容易导致XSS（劫持cookie）攻击
      2. 一定要在可信的内容上使用v-html，永远不要用在用户提交内容上

9. v-cloak:

10. v-once:仅执行一次  <h2 v-once>{{n}}</h2>

    1. v-once所在节点在初次动态渲染后，就视为静态内容
    2. 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能

## 自定义指令

1. 自定义指令的this=》window
2. 配置对象常用的3个回调
   1. .bind:指令与元素成功绑定调用
   2. .inserted：指令所在元素被插入页面时调用
   3. .update：指令所在模板结构被重新解析时调用

## 生命周期

beforeUpdate:数据是新的、页面是旧的=>页面和数据尚未保持同步

updated:页面和数据保持同步

mouted:发送AJAX请求、启动定时器、绑定自定义事件、订阅消息【等初始化操作】

beforeDestroy：清除定时器、解绑自定时间、取消订阅消息【等收尾工作】

# 	Vue组件化编程

1. 非单文件组件：一个文件中包含多个组件
2. 单文件组件：一个文件中只有一个组件
3. 组件配置：this->VueComponet（vc）
4. new Vue()配置：this->Vue实例对象(vm)
5. 组件本质是VueComponet的构造函数，是Vue.extend生成，每次调用返回都是新的VueCompone

## Vue和VueComponent的关系

VueComponent.prototype._proto_ === Vue.prototype

 让VC可以访问到Vue原型上的属性和方法

![1](C:\Users\陈康·\Desktop\照片\1.png)

## ref属性

1. 被用来给元素和子组件注册引用信息（id的替代）
2. 应用在HTML元素标签获取的是真实的DOM元素，在子组件上获取的是组件实例对象

## prop

1. 作用：让组件接收外部传来的数据
2. prop优先级比data高，会先读取prop的数据
3. prop的数据只能读不能写，若要根据业务需求需要修改将prop数据备份到data中，然后修改data数据
4. 写法：传递数据/接收数据
5. 组件的通信：
   1. 父组件=>子组件
   2. 子组件=>父组件（父传子一个函数）【状态提升】

6. props传过来的值若是对象类型的值，即使修改不会报错，但不建议这样。

## mixin

将多个组件共用的配置提取成一个混入对象

组件和混入对象含有同名选项的不同情况

1. 数据对象：以组件数据为主
2. 同名钩子：组件和混入钩子都会被调用
3. 值为对象的选项（methods、compontents、directives):以组件对象为主
4. important:Vue.extends()也使用同样的策略进行合并。

## 组件化编码流程

1. 拆分静态组件：组件要按照功能点拆分，命名不得与html元素冲突。
2. 实现动态组件：考虑数据存放的位置
   1. 一个组件在用：放自身组件即可
   2. 一些组件在用：放共同的父组件上
3. 实现交互：从绑定事件开始

## $emit | $refs | $on

$emit(自定义组件)：子组件调用父组件方法并传入数据

$refs:父组件调用子组件的方法并传入数据

$on:兄弟组件之间调用方法互传数据

## 组件的自定义事件

一种组件的通信方式，适用于：子组件===>父组件

触发自定义事件this.$emit('自定义事件名'，'数据')

解绑自定义事件this.$off('自定义事件名')

组件上也可以绑定原生DOM事件 

```
<Student ref="Student" @click.native="show"/>
```

注意使用$refs

```
this.$refs.Student.$on('自定义事件名',回调)
回调要么配置在methods中或者写成箭头函数（否则this指向其调用的子组件）
```

## 全局事件总线

**实现任意组件通信**

![](C:\Users\ck\Desktop\照片\事件总线.png)

![](C:\Users\ck\Desktop\照片\全局事件总线.png)

main.js中安装全局事件总线

```
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this//安装全局事件总线
  }
```

使用事件总线：A组件想接受其他组件的数据，则在A中给$bus绑定自定义事件，事件的回调留在A组件自身。

```
mounted() {
    this.$bus.$on('hello',data=>{
      console.log('School',data);
    })
  },
```

提供数据的组件：this.$bus.$emit('A组件自定义事件名'，数据)

```
 methods: {
    sendStudentName() {
      this.$bus.$emit("hello",this.name);
    },
  },
```

销毁自定义组件：

```
 beforeDestroy() {
    this.$bus.$off('hello')//解绑
  },
```

## 消息订阅与发布

一种组件通信的方式，适用于**任意组件间的通信**

安装pubsub:npm i pubsub-js

引入 模块

```
import pubsub from 'pubsub-js'
```

接收数据:：A组件想接受其他组件的数据，则在A中绑定自定义事件，事件的回调留在A组件自身

```
组件A:
mounted() {
   this.pubId = pubsub.subscribe('hello',(msgName,data)=>{
      console.log('事件触发,接受消息',msgName,data);
    })
  },
```

提供数据：

```
组件B:
      pubsub.publish('hello','数据')

```

销毁：

```
组件A:
beforeDestroy() {
    pubsub.unsubscribe(this.pubId )//
  },
```

对于两者的通信方式：全局事件总线更适用

## nextTick（生命周期钩子之一）

语法：

```
this.$nextTick(回调)
```

作用：在下一次DOM更新结束后执行指定的回调

何时用：当改变数据后，**要基于更新后的新的DOM进行操作**，要在nextTick所指定的回调函数中执行

可以保证页面中的结构是一定有的，经常和许多插件一起使用

## Vue过渡&动画

使用过渡动画：前提组件|元素必须要有V-if  |v-show

```
transition中包含多个动画<transition-group>同时子动画需要key值
<transition-group appear name="animation1">
      <h1 v-show="!isShow" key="1">Hello</h1>
      <h1 v-show="isShow" key="2">ck</h1>
 </transition-group>
 
 transition只有一个动画
 <transition>
 <h1 v-show="isShow">ck</h1>
 </transition
 
```

![](C:\Users\ck\Desktop\照片\过度&动画.png)

# 配置代理

处理服务器请求跨域问题（解决方案）

1. cros 服务器端设置响应头处理跨域

   ```
   Access-Control-Allow-Headers
   ```

   

2.  JSONP 创建script标签但只能处理GET请求

   ```
   <script src="http://127.0.0.1:8000/jsonp-server"></script>
   
   ```

   

3. 代理 vue-cli 配置Vue.config.js

   ```
   // devServer: {
       //     proxy: 'http://localhost:5000'
       }  
       该代理方式：1.只能配置一个代理，只能请求5000
       无法灵活控制是否走代理
       工作方式：当请求了前端不存在的资源时，那么请求就会转发给服务器（有限匹配前端资源）
   ```

   ```
   devServer: {
           proxy: {
             '/api': {
               target: 'http://localhost:5000',
               pathRewrite:{'^/api':''},
               ws: true,//用于支持webscoket
               changeOrigin: true//
             },
             '/foo': {
               target: 'http://localhost:5001',
               pathRewrite:{'^/foo':''}
             }
           }
         }
        //解决了上述的缺点
   ```

   # 插槽
   
   **插槽 prop 允许我们将插槽转换为可复用的模板，这些模板可以基于输入的 prop 渲染出不同的内容。**这在设计封装数据逻辑同时允许父级组件自定义部分布局的可复用组件时是最有用的。
   
   **只要出现多个插槽，请始终为*所有的*插槽使用完整的基于 `<template>` 的语法**
   
   作用：让如组件可以向子组件指定位置插入**HTML结构**，也是组件通信方式，父组件==>子组件

## 默认插槽

```
子组件：<slot></slot>
一个不带 name 的 <slot> 出口会带有隐含的名字“default”。
父组件：<template v-slot:default>
	   </template>
	   
	   
v-slot:default="slotProps"简写v-slot="slotProps"
```

**！！！注意默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确：**

## 具名插槽

当需要多个插槽时，可以使用<slot>中的**name**属性，用来定义额外的插槽

```js
<header>
<slot name="header"></slot>
</header>

<template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
template所有内容都会传入插槽中


v-slot:header具名插槽缩写#header
```

**v-slot 只能添加在 <template>**

## 作用域插槽

**有时让插槽内容能够访问子组件中才有的数据是很有用的**

概念:数据在组件自身（定义插槽的组件），但根据数据生成的结构需要组建的的使用者来决定

```
子组件：    <slot :games="games"></slot>
			 data() {
                return {
                  games: ["崩坏", "原神", "明日方舟"],
                };
 			 },

```

```
父组件： <template v-slot="receiveDataObj（自定义名）">
			receiveData：接受子组件传来的所有数据是一个对象
 		</template>
```

## 解构插槽prop

```
根据以上示例父组件接收子组件数据其自定义名可以写成解构赋值
<template v-slot="{games}">
</template>
```

# VUEX

![](C:\Users\ck\Desktop\照片\VUEX.png)

## 什么时候用Vuex

1. 多个组件依赖同一状态
2. 来自不同组件的行为需要变更同一状态

## Vuex工作原理

![](C:\Users\ck\Desktop\照片\vuex原理.png)

**如果没有网络请求和其他业务逻辑可直接越过actions不写dispatch,直接commit**

```
add() {
      this.$store.commit("JIA", this.number);
    },
```

## getters配置

对state中的数据需要进行在加工后使用

```
//对state中的数据在加工
const getters ={
    bigSum(state){
       return state.sum*10
    }
}
```

## mapState & mapGetters 

其主要作用：生成计算属性以简写模板中读取**store.state**的属性

```
简写前：<h3>当前求和:{{ $store.state.sum }}</h3>
简写后：<h3>当前求和:{{ sum }}</h3>

import {mapState,mapGetters} from 'vuex'

computed:{
    // sum(){
    //   return this.$store.state.sum
    // },
    //借助mapState,mapGetters生成计算属性
    ...mapState(['sum','subject']),//数组中sum相当于上面。第一次生成sum(),第二次查找sum
    ...mapGetters(['bigSum'])
  }
```

## mapActions &mapMutations

**mapActions &mapMutations：若需要传递参数，在模板中绑定事件时必须传参，否则参数是事件对象（event）**

```js
import {mapMutations,mapActions} from 'vuex'

    <button @click="add(number)">+</button>
简写前:// add() {
    //   this.$store.commit("JIA", this.number);
    // },
简写后借助mapMutations生成对应的方法调用commit联系Mutation
    ...mapMutations({add:'JIA',del:'JIAN'}),//推荐使用对象写法
```

```js
<button @click="oddAdd(number)">求和为奇数+</button>
简写前: // oddAdd() {
    //   this.$store.dispatch("oddAdd", this.number);
    // 		},
简写后:借助mapActions生成对应的方法调用depatch联系Actions
    ...mapActions(['oddAdd','delayAdd'])
```

**其中数组写法，方法和数据名必须一致**

## 模块化+命名空间

目的:让代码更加好维护，多种数据分类更加明确

# 路由Vue-router

## 路由

1. 一个路由就是一组映射关系（key-value）
2. key为路径，value可以是component或function
2. $route一般获取路由信息【path，query,params】
2. $router:一般进行办成事导航进行路由跳转【push,replace】
2. 注册完路由，路由组件与非路由组件都有【$route，$router】

## **路由分类**

1. 前端路由
   1. value是component，用于展示页面内容
   2. 工作过程：当浏览器路径改变时，对应的组件就会显示
2. 后端路由
   1. 理解：value是function，用户处理客户端提交的请求
   2. 工作过程：服务器接收到一个请求时，根据**请求路径**找到匹配的函数来处理请求，返回响应数据

## 基本使用

1. 路由组件放pages文件夹，一般组件放compoents
2. 路由的切换实际是销毁，需要的时候再去挂载
3. 整个应用只有一个router，可以通过组件的$router获取
4. 每个组件都有自己的$route属性，里面存储着自己的路由信息

## 嵌套（多级）路由

```js
配置路由规则，使用children配置项
{
    path:'/home',
    component:Home,
    children:[
        {
            path:'news',//禁止在添加'/'
            component:News
        },
        {
            path:'message',
            component:Message
        }
    ]
        }
   页面路径（要写完整路径）
 <router-link class="list-group-item " active-class="active" to="/home/message">Messages</router-link> 

```

## 路由传参query

```js
对象写法(传参):<router-link :to="{
                  path:'/home/message/detail',
                  query:{
                      id:msg.id,
                      game:msg.game
                  }
              }">
   接受参数：$route.query.id
   			$route.query.game
```

## 命名路由

作用:简化路由跳转path写法

```Js
route页面：
children:[
    {
        name:'detailMsg',//为当前路径重命名
        path:'detail',
        component:Detail
    }
]
/////////////组件页面
<router-link :to="{
 name:'detailMsg',
  query:{
      id:msg.id,
      game:msg.game
  }
}">
```

## parms参数

方法同query类似，只是获取参数的位置，读取参数位置与路由配置不同

```js
路由配置:
children:[
    {   
        name:'detailNews',
        path:'detailNews/:id/:name',//使用占位符接受params参数与NodeJS一致
        component:DetailNews
    }
]
//读取参数
$route.params.id
<router-link :to="{
name:'detailNews',
    params:{
        id:item.id,
        name:item.name,
    }
}">
```

## props

作用：让路由组件接受参数更加方便，简写

```
原写法：
<li>游戏编号:{{$route.query.id}}</li>
<li>游戏名:{{$route.query.game}}</li>
```

```
路由配置：哪个组件需要接受参数就配置在哪
children: [{
name: 'detailNews',
path: 'detailNews/:id/:name',
component: DetailNews,
//props:对象写法，对象中的key-value属性都会传给组件DetailNews,但数据都写死
//props:{a:'ck',b:'IVOU'}
//第二种写法：值为Bool，可以将params接收到参数，以props形式传给对应组件，仅适用于params
//props:true
//第三种写法:值为函数,query和params都使用
props({params}){//解构赋值
    return {id:params.id,name:params.name}
}
}]
```

```
接受参数组件写法
<ul>
    <li>人物编号:{{id}}</li>
    <li>人名:{{name}}</li>
</ul>
<script>
 	props:['id','name'],
</script>

```

## `<router-link`>的replace属性

作用：控制路由跳转时操作浏览器历史记录的模式

浏览器的历史记录写入方式：**push和replace**

push:是追加记录，使得可以回退和前进，默认值

replace：是替换当前记录，不可以回退

开启replace模式：<router-link replace>

## 声明式路由导航

<router-link>:是一个组件，每次进行跳转都会创建一个组件，这也因此会消耗内存

## 编程式路由导航

作用：不借助<router-link>实现路由跳转，使路由跳转更加灵活。

```js
 methods: {
PushShow(msg) {
this.$router.push({
name: 'detailMsgs',
query: {
  id: msg.id,
  game: msg.game
}
})
},
Replace(msg){
this.$router.replace({
name: 'detailMsgs',
query: {
  id: msg.id,
  game: msg.game
}
})
}
```

```
 this.$router.back()//后退
 this.$router.forward()//前进
 this.$router.go(3)//前进3页，负数则后退
```

## 缓存路由组件

作用：让不展示的路由保持挂载，不被销毁

```
<keep-alive include="News">
        <router-view></router-view>
</keep-alive>


include='组件名'   ！！！重要
不写则将组件全部缓存
缓存多个=>   :include=['News','Message']
```

## 路由生命周期钩子

作用:路由独有的两个钩子，用于捕获路由组件的激活状态

1. activated:路由组件被激活时触发
2. deactivated：路由组件失活时触发

## 路由守卫

作用：给路由设置权限，保护安全

## 全局守卫：对所有的路由跳转进行限制

**全局前置路由守卫，初始化与每次切换路由之前都会进行校验**

## **next参数**

1. next放行函数，next()
2. next('/login) 方行到login页 next('path)
3. next(false): 取消当前的导航,URL 地址会重置到 `from` 路由对应的地址

```
 meta:{isAuth:true},///对需要鉴权的路由加上此配置
//在
router.beforeEach((to, from, next) => {
    console.log('检验');
   if(to.meta.isAuth){//判断是否需要鉴权
    if(localStorage.getItem('name')==='chenkang'){
        next()//放行
    }else{
        alert('权限等级不够');
    }
   }else{
        next()
    }
})
```

**全局后置路由守卫，初始化与每次切换路由之后都会进行校验**

作用:可以对每个路由的网页标题的名字进行切换

```JS
路由配置：meta:{isAuth:true,title:'新闻'},

router.afterEach((to)=>{
    document.title = to.meta.title||'IVCK'
})
```

## 独享路由守卫

```
 为单个路由设置权限,在路由配置上写
 beforeEnter：(to,from,next)=>{} 路由配置项
```

## 组件内路由守卫

在组件内部设置路由守卫

```
 //通过路由规则，进入该组件时被调用
  beforeRouteEnter (to, from, next) {
  },
    //通过路由规则，离开该组件时被调用
  beforeRouteLeave (to, from, next) {
  }
  权限的设置与全局前值路由一致
```

## hash&&history(路由器的两种工作模式)

路由配置：mode:'history',     使路径不带**“#”**，默认：hash

区别

1. hash兼容性高
2. 项目部署到后端推荐使用hsah
3. NodeJS npm connecthistory-api-fallback,解决用history部署后端，路径请求404请求错误

```
const history = require('connecthistory-api-fallback')
app.use（history()）
```

## 路由懒加载

**只有路由被访问的时候才加载对应组件**

```
//路由懒加载只有路由被访问的时候才加载对应组件
component: () => import("@/pages/Home/Home.vue"),
动态导入
```



# 自定义插件

1. Vue插件暴露的必须是一个对象

   ```
   let myPlugins = {}
   ```

   

2. 暴露一个**install**放法

   ```
   myPlugins.install = function(Vue,options){
    	//Vue.prototype.$bus
       //Vue.directive，自定义指令
       //Vue.component
       Vue.directive(options.name,(element,params)=>{
           //element绑定在当前元素
           //params绑定的值
           console.log(params);
           element.innerHTML = params.value
       })
   }
   ```

3. 在入口文件注册

   ```
   import myPlugins from '@/plugins/myPlugins'
   Vue.use(myPlugins,{
     name:'super'
   })
   ```

4. 使用

   ```
   <h1 v-super></h1>
   ```

5. 用途

   1. 添加全局方法和属性

      ```
      Vue.myGlobalMethod = function () {
          // 逻辑...
        }
      ```

      

   2. 添加全局自定义指令

      ```
      Vue.directive('my-directive', {
          bind (el, binding, vnode, oldVnode) {
            // 逻辑...
          }
      ```

      

   3. 注入组件选项

      ```
      Vue.mixin({
          created: function () {
            // 逻辑...
          }
          ...
        })
      ```

      

   4. 添加实例方法

      ```
       Vue.prototype.$myMethod = function 	(methodOptions) {
          // 逻辑...
        }
      ```

      

# 面试

1. **！！！ params传参不可以与path结合使用**

2. 如何指定params参数可传可不传？

   ```
   配置路由时，params参数占位，但路由跳转并不带参数，路径就会出现问题
   
   path:'/search/:shop?'
   ?=>代表可传可不传
   ```

3. params参数传递空串如何解决？

   ```
   this.$router.push（{
   params: {
   	shop: ''//传递空串，导致路径报错
   	可写成=>shop:''||undefined
   }
   }）
   ```

4. 路由组件能否传递props数据

   **详情参考：params笔记**

5. 编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误

   ```js
   在vue-route@3版本中引入了promise
   解决：
   1.给push方法传递相应的成功，失败回调，可以捕获当前错误(治标不治本)
   this.$router.push({
   name:'search',
   query:{},
   ()=>{},相当于promise的resolve
   ()=>{}相当于promise的reject
   })
   、、、、、、、、、、、、、、、、、、、
   2.重写push|replace方法
   //先将VueRouter原型对象的push|replace,保存一份
   let originPush = VueRouter.prototype.push;
   //重写push|replace
   //第一个参数，告诉push往哪里跳转
   VueRouter.prototype.push = function(location,resolve,reject){
       if(resolve && reject){
          originPush.call(this,location,reject,resolve)
       }else{
           originPush.call(this,location,()=>{},()=>{})
       }
   }
   ```

   ## 防抖&&节流

1. 节流：在规定时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

1. 函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。

   ```
   _.debounce(func, [wait=0], [options=])
   ```

   

7. 防抖：用户操作很频繁，但最后只执行一次

   ```
   _.throttle(func, [wait=0], [options=])
   ```

3. 使用插件Lodash插件（闭包+延迟器）

9. 回调函数禁止写成箭头

## 组件通信的方式

1. props  父子  | 路由

2. 自定义事件

3. 全局事件总线

4. pubsub-js

5. Vuex

6. 插槽 父子

7. v-model 还可以实现父子组件数据同步

8. sync实现父子组件数据同步

   1. ```
      父:<Event :money.sync='money'/>
      :money.sync=>{
      	1.：money给子组件传递了props:['money']	
      	2.绑定了自定义事件：update:money
      }
      子：<button @click='$emit('update:money',data)'>
      	props:['money']	
      ```

      

9. **$attrs&&$listener**

10. **ref**可以获取真是的DOM节点，也可以获取子组件标签（操作子组件的数据和方法）[只能获取一个组件的数据方法]

    ```
    父：<Son ref='son'>
    父：this.$ref.son.money =''
    子：子组件data中有money数据
    ```

    

11. **$children&$parent**

    

    ## 事件注意事项 给组件绑定系统事件

```
<Event @click='事件名'/>：会被当成自定义事件
<Event @click.native='事件名'/>加上修饰符native被作为系统事件
原理:@click.native将事件绑定给组件的根节点---事件委派
```

# $attrs&&$listener

## $attrs

1. **$attrs**可以获取到父组件传递过来的props数据

2. 如果子组件通过props获取数据，则$attrs不在获取用props接受的数据

3. **this.$attrs**属于组件上的一个属性

3. 比如，A 组件引用了 B 组件，而 B 组件又引用了 C 组件，那么怎么在 A 中将数据传给 C ；在 C 中，怎么触发 A 中的方法呢？这就是 `$attrs` 和 `$listeners` 的作用了。

4. ```
   父中子：<child-dom
     :foo="foo"
     :coo="coo"
     :coo1="foo"
     @eventBindOnB="eventMethodInA"
   >
   子中孙：<child-dom-child 
   :coo="coo1" 
   v-bind="$attrs" 
   v-on="$listeners" 
   @change="eventMethodInB"></child-dom-child>
   
   （v-bind）不能缩写
   但是测试发现，去掉这个绑定操作，C 中默认也是有$attrs 属性，也可以得到父组件的值。
   ```

## $listener

1. this.$listener可以接受父组件传递的方法

   ```
   C  的事件 = A 的监听事件 eventBindOnB +  B 的监听事件 change
   并通过$emit触发
   this.$emit('change')  //触发 B 的监听事件
   this.$emit(eventBindOnB) // 触发 A 的监听事件
   ```

# $children&$parent

## **$children**

1. 相比ref只能获取一个子组件数据方法，它可以获取所有子组件数据

   ```
   父:<Son>
     <Sister>
   log(this.$children)输出的是数组
   ```

## **$parent**

1.可以获取**父组件**的方法和数据

# 混入mixin

1. 如果项目当中出现很多结构类似功能=>组件复用
2. 如果项目当中很多组件JS业务逻辑相似=>mixin(把多个组件JS部分重复相似的地方抽离)
   1. 抽离相似JS 
   2. 在需要地方导入
   3. minxins:['文件名']

# 深度选择器

1. scoped：其样式只对当前组件生效

   1. 为当前组件的每个结构添加上自定义属性 data-v-xxxx
   2. 其样式通过属性选择器添加 h3[data-v-xxx]

2. 父组件中添加子组件，其子组件的根标签也会有父组件的自定义属性，而子组件跟标签<div>里面的结构没有父组件自定义属性，只有自己组件的自定义属性

3. 父组件加上scoped，并且影响到子组件（深度选择器）

   1. 深度选择器可以实现样式的穿透

   2. 原生CSS  >>>

   3. less    deep

   4. sass  ::v-deep

      ```
      >h3{
      	color:red
      }
      ```

      