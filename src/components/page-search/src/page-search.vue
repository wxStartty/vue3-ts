<template>
  <div class="page-search">
    <wx-form v-bind="searchFormConfig" v-model="formData">
      <!-- <template #header>
        <h1 class="header">高级检索</h1>
      </template> -->
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </wx-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import WxForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    WxForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? []

    const formOriginData: any = {}

    for (const item in formItems) {
      formOriginData[(item as any).field] = ''
    }

    const formData = ref(formOriginData)

    // 重置
    const handleResetClick = () => {
      // 重置解决方式一
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      //   // formData.value[key] = formOriginData[key]
      // }
      // 重置解决方式二
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
