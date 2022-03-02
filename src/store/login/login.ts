import { Module } from 'vuex'
import router from '@/router'
import { IRootState } from '../type'
import { ILoginState } from './type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '../../service/login/login'
import { mapMenusToRoutes } from '@/utils/map-menus'
import localCache from '@/utils/cache'

const loginState: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // userMenus -> routes
      const routes = mapMenusToRoutes(userMenus)

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      console.log('loginResult', loginResult)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    // 初始化 store 中的数据
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      token && commit('changeToken', token)
      const userInfo = localCache.getCache('userInfo')
      userInfo && commit('changeUserInfo', userInfo)
      const userMenus = localCache.getCache('userMenus')
      userMenus && commit('changeUserMenus', userMenus)
    }
    // phoneLoginAction({ commit }, payload) {
    //   console.log('phoneLoginAction', payload)
    // }
  }
}

export default loginState
