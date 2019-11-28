<template>
    <div class="diag-page">
        <div class="diag-info">
           <div class="diag-info-user-info">
                <img  :src="user.student_avatar" alt="">
                <span class="name">{{user.real_name}}</span>
                <span class="grade">{{user.grade}}</span>
           </div>

           <div class="diag-info-title">
               {{paperInfo.paper_question.json_description.paper_title}}
           </div>

            <div v-if="status === 1" class="diag-info-notice">
                {{paperInfo.paper_question.json_description.diag_notice}}
            </div>
            <div  v-if="status === 2"  class="diag-info-error">
               <img src="@/assets/images/error-page.png" alt="">
            </div>

            <div  v-if="status === 1"  class="diag-info-btn-part">
                <div @click="startDiag" class="base-btn base-btn-large">准备好了，开始诊断</div>
            </div>

            <div  v-if="status === 2"  class="diag-info-pay-course">
                <div class="base-btn base-btn-large">去买课</div>
            </div>

        </div>
    </div>
</template>

<script>
import { diagnoseGetPaper } from '@/libs/axios/modules/diag'

export default {
  data () {
    return ({
      paperInfo: null,
      status: 1 /* 1：正常 2.没课 3 ：没试卷 --跳转页面 */
    })
  },
  computed: {
    user () {
      return this.$store.getters.getUser || {}
    }
  },
  created () {
    /* 获取试卷详情 */
    this.diagnoseGetPaper()
  },
  methods: {
    async diagnoseGetPaper () {
      var r = await diagnoseGetPaper({ paper_id: 3 })
      this.$store.commit('setPaperInfo', r.data)
      this.paperInfo = r.data
    },
    /* 开始诊断 */
    startDiag () {
      this.$router.push({ name: 'answer' })
    }
  }

}
</script>
