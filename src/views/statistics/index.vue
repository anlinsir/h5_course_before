<template>
    <div class="statistics-part">
        <div class="statistics-part-tips-section">亲爱的同学们，记得准时参加课前讲座哟！</div>
        <div class="statistics-part-course-title">2020寒假二年级语文模底测试</div>
        <div class="statistics-part-course-info">
            <span class="span">提交时间  2019.11.16 12:00</span>
            <span>答题用时  45:00</span>
        </div>
        <div class="statistics-part-course-score">
            <div class="circle">
                <van-circle
                    v-model="currentRate"
                    :rate="currentRate"
                    :speed="50"
                     size="2.89rem"
                    :color="'#FF9E0A'"
                 />
            </div>
            <div class="circle circle-text">
                <div class="defern">得分</div>
                <div class="score-num">90</div>
                <div class="score-full">满分100分</div>
            </div>
        </div>

        <div class="statistics-part-course-analysis">
            <div class="statistics-part-course-analysis-title">
                <span> 成绩分析</span>
            </div>

            <div class="statistics-part-course-analysis-chart"></div>

            <div class="statistics-part-course-analysis-module-box">
                <div class="statistics-part-course-analysis-module">
                    <div class="statistics-part-course-analysis-module-title">基础</div>
                    <div class="statistics-part-course-analysis-module-content">
                        【目前水平】
                        目前水平处于中等偏上的水平，基础相对同龄学生而言比较有优势；
                        可以对自己的基础有更高层次的要求。
                    </div>
                </div>

                <div class="statistics-part-course-analysis-module">
                    <div class="statistics-part-course-analysis-module-title">基础</div>
                    <div class="statistics-part-course-analysis-module-content">
                        【目前水平】
                        目前水平处于中等偏上的水平，基础相对同龄学生而言比较有优势；
                        可以对自己的基础有更高层次的要求。
                    </div>
                </div>

                <div class="statistics-part-course-analysis-module">
                    <div class="statistics-part-course-analysis-module-title">基础</div>
                    <div class="statistics-part-course-analysis-module-content">
                        【目前水平】
                        目前水平处于中等偏上的水平，基础相对同龄学生而言比较有优势；
                        可以对自己的基础有更高层次的要求。
                    </div>
                </div>
            </div>

            <div class="statistics-part-course-analysis-title" style="margin-bottom:0.4rem">
                <span>答题情况</span>
            </div>

            <div class="statistics-part-course-analysis-answer-box" >
                <div v-for="i in 10">
                    <div class="statistics-part-course-analysis-answer-box-title">
                        基础
                    </div>
                    <div class="statistics-part-course-analysis-answer-box-content">
                        <div class="statistics-part-course-analysis-answer-box-content-item" v-for="i in 10">{{i}}</div>
                    </div>
                </div>
                <div class="statistics-part-course-analysis-answer-box-btn-section">
                <div class="statistics-part-course-analysis-answer-box-btn-section-btn left">
                    全部解析
                </div>
                <div class="statistics-part-course-analysis-answer-box-btn-section-btn right">
                    错题解析
                </div>
            </div>
            </div>

        </div>

    </div>
</template>

<script>
import { Circle } from 'vant'
export default {
  components: {
    'van-circle': Circle
  },
  data () {
    return ({
      currentRate: 90

    })
  }
}
</script>
