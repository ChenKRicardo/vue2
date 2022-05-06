//创建整个应用的路由器
import VueRouter from "vue-router";
//引入组件
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import News from '../components/News.vue'
import Message from '../components/Message.vue'
import DetailNews from '../components/DetailNews.vue'
import DetailMsgs from '../components/DetailMsgs.vue'


//创建路由器
const router = new VueRouter({
    mode:'history',
    routes: [{
            meta:{title:'关于'},
            path: '/about',
            component: About
        },
        {                      
            meta:{title:'主页'},
            path: '/home',
            component: Home,
            children: [{
                    path: 'news', //禁止在添加'/'
                    component: News,
                    meta:{isAuth:true,title:'新闻'},
                    children: [{
                        meta:{title:'详细新闻'},
                        name: 'detailNews',
                        path: 'detailNews/:id/:name',
                        component: DetailNews,
                        //props:对象写法，对象中的key-value属性都会传给组件DetailNews,但数据都写死
                        //props:{a:'ck',b:'IVOU'}
                        //第二种写法：值为Bool，可以将params接收到参数，以props形式传给对应组件
                        //props:true
                        //第三种写法:值为函数
                        props({params}) { //解构赋值
                            return {
                                id: params.id,
                                name: params.name
                            }
                        }
                    }]
                },
                {
                    name:'message',
                    meta:{isAuth:true,title:'信息'},
                    path: 'message',
                    component: Message,
                    children: [{
                        meta:{title:'详细信息'},
                        name: 'detailMsgs',
                        path: 'detailMsgs',
                        component: DetailMsgs,
                        props({query}){
                            return {
                                id: query.id,
                                game: query.game
                            }
                        }
                    }]
                }
            ]
        }
    ]
})
//全局前置路由守卫，初始化与每次切换路由之前都会进行校验
router.beforeEach((to, from, next) => {
    console.log('检验');
   if(to.meta.isAuth){//判断是否需要鉴权
    if(localStorage.getItem('name')==='chenkang'){
        next()
    }else{
        alert('权限等级不够');
    }
   }else{
        next()
    }
})
//路由后置首位
router.afterEach((to)=>{
    document.title = to.meta.title||'IVCK'
})
export default router