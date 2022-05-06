//人员管理配置
export  default {
    namespaced:true,
    actions: {
        addPersonChen(context,value){
            if(value.name.indexOf('陈')===0){
                context.commit('ADDPERSON',value)
            }else{
                alert('姓氏错误')
            }
        }
    },
    mutations: {
        ADDPERSON(state, value) {
          return  state.personList.unshift(value)
        }
    },
    getters: {
        firstPersonName(state){
            return state.personList[0].name
        }
    },
    state: {
        personList: [{
            id:'001',
            name: '陈康'
        }]
    }
}