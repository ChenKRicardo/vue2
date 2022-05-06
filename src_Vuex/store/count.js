export default  {
    namespaced:true,
    actions: {
        oddAdd(context, value) {
            if (context.state.sum % 2)
                return context.commit('JIA', value)
        },
        delayAdd(context, value) {
            setTimeout(() => {
                context.commit('JIA', value)
            }, 3000)
        }
    },
    mutations: {
        JIA(state, value) {
            state.sum += value
        },
        JIAN(state, value) {
            state.sum -= value
        },
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    },
    state: {
        sum: 0,
        subject: 'WEB前端',
    }
}