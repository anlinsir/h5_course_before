<template>
    <div class="answer">
        <div class="bg"></div>
        <div class="answer-card" >
            <div v-if="false" class="answer-sheet-all" >
                <template v-for="item in 2">
                <div  class="answer-sheet-all-section-title">
                        基础
                    </div>
                <div class="answer-sheet-all-section">

                    <div class="answer-sheet-item" v-for="item in 19">{{item}}</div>
                </div>
                </template>
            </div>

            <div class="answer-card-top">
                <div class="time">
                    <img src="@/assets/images/Answer_icon_time.png" alt="">
                    {{currentCountDown}}
                </div>
                <div class="sheet">
                    <span @click="openDiagStatusCard(1)" class="has">已答{{hasAnswerQurestionMum}}</span>
                    <span @click="openDiagStatusCard(2)" class="not">未答{{notMakeNum}}</span>
                    <img src="@/assets/images/Answer_icon_sheet.png" alt="">
                </div>
                <div  v-show="diagStatusCard === 1" class="answer-sheet">
                    <div @click="jumpDiag(index)" v-if="item" :key="index" class="answer-sheet-item" v-for="(item,index) in this.answerList">{{index + 1}}</div>
                </div>
                <div  v-show="diagStatusCard === 2" class="answer-sheet">
                    <div @click="jumpDiag(index)" v-if="!item" :key="index" class="answer-sheet-item no-anwser" v-for="(item,index) in this.answerList">{{index + 1}}</div>
                </div>
            </div>

            <div v-if="currentQuestion && currentQuestion.length"  v-for="(item,index) in currentQuestion" :key="index" class="answer-card-content">

                <div @click="handleBodyClick" class="answer-card-content-topic">
                   {{index + 1 + '. '}} <span v-html="item.question_title || item.question_body"></span>
                </div>
                 <!-- 单选题 -->
                <div v-if="item.question_type === 1">
                    <div @click="handleBodyClick" class="answer-card-content-key-box">
                        <div @click="chooseAnswer(item,index,option)" class="answer-card-content-key-box-item" :class="{active:item.answer && item.answer.includes(option.option_name)}" v-for="(option,opnIndex) in item.option_list" :key="opnIndex">
                            <span class="label">{{option.option_name }}</span>
                            {{option.option_title}}
                        </div>
                    </div>
                </div>
                <!-- 填空题 -->

                <div v-if="item.question_type === 4">
                   <!--  <Render :html="item.question_body" /> -->
                    <div id="gap" class="answer-card-content-topic" v-html="shiftAnswer(item.question_body)" />
                </div>

                <!-- 多题目 -->
                <template v-if="item.question_type === 6">
                    <div class="complex-content" v-html="item.question_body">

                    </div>
                    <div class="complex" :style="{height: openAnsert ? '70%' : ''}">
                        <!-- <div style="height:0.6rem"></div> -->
                        <div class="drag" @click="openAnsert = !openAnsert">
                            <div class="drag-section"></div>
                        </div>
                        <div v-for="(subQue,subIndex) in item.sub_question" :key="subIndex" class="complex-item">
                            <div  class="answer-card-content-topic">
                                 {{subIndex + 1 + '. '}} <span v-html="subQue.question_title || subQue.question_body"></span>
                            </div>

                            <div class="answer-card-content-key-box" v-if="subQue.question_type === 1">
                                <div  @click="subQuestionCheced(sqitem,index,subQue)" class="answer-card-content-key-box-item" :class="{active:subQue.answer && subQue.answer.includes(sqitem.option_name)}" v-for="(sqitem,sqindex) in subQue.option_list" :key="sqindex">
                                    <span class="label">{{sqitem.option_name}}</span>
                                    {{sqitem.option_title}}
                                </div>
                            </div>

                            <div class="answer-card-content-topic" v-if="subQue.question_type === 4">
                              <!--   <Render /> -->
                                <div class="subGap" v-html="shiftAnswer(subQue.question_body)" />
                            </div>

                        </div>
                    </div>
                </template>

            </div>

            <div class="answer-card-btn">
                <div @click="chengeQuestion(1)" class="answer-card-btn-item previous">上一题</div>
                <div @click="chengeQuestion(2)" class="answer-card-btn-item next">下一题</div>

            </div>

        </div>
        <van-overlay :show="show" @click="show = false">
            <div class="wrapper" @click.stop>
                <Dialog :data="data" />
            </div>
        </van-overlay>
    </div>
</template>

<script>
import Dialog from '@/components/dialog'
import { ImagePreview } from 'vant'
import { diagnoseGetPaper } from '@/libs/axios/modules/diag'
const questionType = {
  1: '单选题',
  2: '填空题',
  6: '多选题'
}

export default {
  data () {
    return ({
      html: `
        <p>(1) 不识庐山真面目，a</p>
        <p>(2) a ，不教胡马度阴山</p>
      `,
      openAnsert: false,
      show: false,
      data: { title: '确认交卷', content: '本次诊断还有题目未作答', cancel: '取消', ok: '确认' },
      previewImages: [],
      questionList: [], /* 试卷列表 */
      questionIndex: 0, /* 题目序号 */
      currentQuestion: [], /* 当前题目 */
      activeItem: '', /* 单选题选中的答案 */
      answerList: [], /* 试卷答案列表 */
      diagTime: '', /* 测试时间 */
      currentCountDown: '', /* 当前时间 */
      startTimespan: 0,
      finishTime: 0,
      isOutTime: false, // 当前答题已超时
      diagStatusCard: false, /* 已作答 和未做答 卡片状态 */
      moreTopicsAnwer: [], /* 多题目答案保存 */
      moreTopicsAnwerActive: [] /* 多题目答案单选 多选 保存 */

    })
  },
  computed: {
    // 是否倒计时完结
    isCountDownEnd () {
      return this.currentCountDown.replace(/0|:/gi, '').length === 0
    },
    /* 未作答题目数量 */
    notMakeNum () {
      return this.questionList.length - this.hasAnswerQurestionMum
    },
    /* 已作答题目数量 */
    hasAnswerQurestionMum () {
      let num = 0
      for (var i of this.answerList) {
        if (i) {
          num++
        }
      }
      return num
    }
  },
  components: {
    Dialog
  },
  async created () {
    /* 在这个页面刷新 重新加载试卷数据 */
    if (!this.$store.getters.getPaper) {
      await this.diagnoseGetPaper()
    } else {
      this.questionList = this.$store.getters.getQuestionList
      this.diagTime = this.$store.getters.getPaper.paper_question.json_description.paper_total_time
      this.currentQuestion = [this.questionList[this.questionIndex]]
      for (var i in this.questionList) {
        this.answerList[i] = ''
      }
      this.initDown()
    }
  },

  methods: {
    openDiagStatusCard (type) {
      this.diagStatusCard = this.diagStatusCard ? false : type
    },
    /* 单选题选择答案 */
    chooseAnswer (item, index, option) {
      this.activeItem = option.option_name
      this.currentQuestion[0].answer = [option.option_name]
      let data = {
        warehouse_question_id: item.question_id,
        warehouse_know1edge_category_id: item.warehouse_knowledge_category_id,
        answer_json: JSON.stringify([this.activeItem]),
        is_correct: option.is_answer === 1 ? 1 : 0,
        student_score: this.is_correct ? item.question_score : 0,
        type: item.question_type
      }
      this.$set(this.answerList, this.questionIndex, data)
    },
    /* 单题填空题 获取答案 */
    gapFill () {
      let arr = []
      let has = true
      for (var i of document.getElementById('gap').getElementsByTagName('input')) {
        arr.push(i.value)
      }
      has = arr.every(item => {
        return !item
      })
      return has ? '' : arr
    },
    /* 切换试题还原数据 */
    chengeQuestionResetData (index) {
      if (this.currentQuestion[0].question_type === 1) {
        this.activeItem = JSON.parse(this.answerList[index].answer_json)[0]
      } else if (this.currentQuestion[0].question_type === 4) {
        this.$nextTick(() => {
          for (var i in document.getElementById('gap').getElementsByTagName('input')) {
            if (this.answerList[index] && this.answerList[index].answer_json && JSON.parse(this.answerList[index].answer_json)) {
              document.getElementById('gap').getElementsByTagName('input')[String(i)].value = JSON.parse(this.answerList[index].answer_json)[i]
            }
          }
        })
      } else if (this.currentQuestion[0].question_type === 6) {
        for (var i in this.currentQuestion[0].sub_question) {
          this.moreTopicsAnwer[i] = ''
          this.moreTopicsAnwerActive[i] = []
        }
      }
    },
    /* 点击切换到对应试题 */
    jumpDiag (index) {
      this.questionIndex = index
      this.currentQuestion = [this.questionList[this.questionIndex]]
      this.diagStatusCard = false
      this.chengeQuestionResetData(index)
    },

    /* 切换试题 */
    chengeQuestion (type) {
      if (type === 1) {
        if (this.questionIndex > 0) {
          this.questionIndex--
          this.currentQuestion = [this.questionList[this.questionIndex]]
        } else {
          this.$toast({
            message: '第一题'
          })
        }
      } else {
        if (this.currentQuestion[0].question_type === 4) { /* 题型为填空题时 在切换到下一题之前保存答案信息 */
          let data = {
            warehouse_question_id: this.currentQuestion[0].question_id,
            warehouse_know1edge_category_id: this.currentQuestion[0].warehouse_knowledge_category_id,
            answer_json: JSON.stringify(this.gapFill()),
            type: this.currentQuestion[0].question_type
          }
          this.$set(this.answerList, this.questionIndex, this.gapFill() ? data : '')
        } else if (this.currentQuestion[0].question_type === 6) {
          for (var i in document.getElementsByClassName('subGap')) {
            for (const j in document.getElementsByClassName('subGap')[i].getElementsByTagName('input')) {
              console.log(j)
              let arr = []
              if (document.getElementsByClassName('subGap')[i].getElementsByTagName('input')[j].value) {
                arr.push(document.getElementsByClassName('subGap')[i].getElementsByTagName('input')[j].value)
              }
              this.$set(this.moreTopicsAnwer, i, arr)
            }
          }
        }
        if (this.questionIndex < this.questionList.length - 1) {
          this.questionIndex++
          this.currentQuestion = [this.questionList[this.questionIndex]]
        } else {
          this.$toast({
            message: '最后一题'
          })
        }
      }
      this.chengeQuestionResetData(this.questionIndex)
    },
    /* 多题目 单选 多选 选择 */
    subQuestionCheced (item, index, parentItem) {
      this.currentQuestion[0].sub_question[index].answer = [item.option_name]
      this.moreTopicsAnwerActive[index] = [item.option_name]
      this.moreTopicsAnwer[index] = {
        warehouse_question_id: parentItem.warehouse_question_id,
        warehouse_know1edge_category_id: parentItem.warehouse_knowledge_category_id,
        answer_json: JSON.stringify([item.option_name])
      }
    },
    initDown () {
      if (this.diagTime) {
        let m = this.diagTime
        let h = Math.floor(this.diagTime / 60)
        if (h > 0) {
          m = h * 60 - m
        }
        this.currentCountDown = `${
          h > 0 ? ('' + h).padStart(2, 0) + ':' : ''
        }${('' + m).padStart(2, '0')}:00`
      }
      this.startCountDown()
    },
    /** 停止倒计时 */
    stopCounDown () {
      if (this.startCountDown.timer) {
        clearInterval(this.startCountDown.timer)
        this.startCountDown.timer = null
      }
      this.startTimespan = 0
    },
    /** 开始倒计时 */
    startCountDown () {
      if (this.startCountDown.timer) {
        clearInterval(this.startCountDown.timer)
        this.startCountDown.timer = null
      }
      this.finishTime = 0
      this.startTimespan =
        new Date(`2000/1/1`).getTime() + this.diagTime * 1000

      this.startCountDown.timer = setInterval(() => {
        this.startTimespan -= 1000
        let c = new Date(this.startTimespan)
        let h = ('' + c.getHours()).padStart(2, '0')
        let m = ('' + c.getMinutes()).padStart(2, '0')
        let s = ('' + c.getSeconds()).padStart(2, '0')

        this.currentCountDown = `${h !== '00' ? h + ':' : ''}${m}:${s}`

        this.finishTime++ // 记录已经耗费的秒数

        // 倒计时结束，表示为超时状态
        if (this.isCountDownEnd) {
          // 结束倒计时Timer
          this.stopCounDown()
          // 设置当前为超时状态
          this.isOutTime = true
          // 超时状态，设置最终检测花费时间为考试时间
          this.finishTime = this.diagTime
          this.$toast({
            message: '答题已结束'
          })
          // 超时，弹出答题卡,并自动触发交卷操作
        /*   this.handleAnswerCard()
          this.handleSubmit() */
        }
        // console.log(this.currentCountDown);
      }, 1000)
    },
    diagnoseGetPaper () {
      diagnoseGetPaper({ paper_id: 3 })
        .then(r => {
          this.$store.commit('setPaperInfo', r.data)
          this.questionList = r.data.paper_question.json_description.question_list
          this.diagTime = r.data.paper_question.json_description.paper_total_time
          this.currentQuestion = [this.questionList[this.questionIndex]]
          for (var i in this.questionList) {
            this.answerList[i] = ''
          }
          this.initDown()
        })
        .catch(e => {
          this.$router.push({ name: 'over-time' })
        })
    },
    /* 预览图片 */
    handleBodyClick (e) {
      if (event.target.tagName.toLowerCase() === 'img') {
        ImagePreview([event.target.src])
      }
    },
    shiftAnswer (html) {
      /* return html.replace(/a/g, `<input class='fill' />`) */
      return html.replace(/ *\_{[^}]*\) */g, '').replace(/}_/g, `<input   class='fill' />`)
    }
  }
}
</script>

<style lang="scss">

.fill{
    width:296px;
    height:60px;
    background:rgba(255,255,255,1);
    border:2px solid rgba(255,174,0,1);
    border-radius:40px;
    vertical-align: middle;
    padding: 0 38px;

    box-sizing: border-box;
}
.answer-card-content-topic{
    img{
        width: 100%;
    }
}
</style>
