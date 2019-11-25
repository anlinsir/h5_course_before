<template>
    <div class="answer">
        <div class="bg"></div>
        <div class="answer-card" >
            <div class="answer-card-top">
                <div class="time">
                    <img src="@/assets/images/Answer_icon_time.png" alt="">
                    20:10
                </div>
                <div class="sheet">
                    <span class="has">已答3</span>
                    <span class="not">未答13</span>
                    <img src="@/assets/images/Answer_icon_sheet.png" alt="">
                </div>
            </div>

            <div class="answer-card-content">
                <!-- 单选题 -->
                <div>
                    <div class="answer-card-content-topic">
                        <span>1.“得亏”中的“得”读音为（    ）。(5分)</span>
                    </div>

                    <div class="answer-card-content-key-box">
                        <div class="answer-card-content-key-box-item" v-for="(item,index) in 3" :key="item">
                            <span class="label">{{String.fromCharCode(65+index)}}</span>
                            dsds
                        </div>
                    </div>
                </div>
                <!-- 填空题 -->
            </div>

            <div class="answer-card-btn">
                <div class="answer-card-btn-item previous">上一题</div>
                <div class="answer-card-btn-item next">下一题</div>

            </div>

        </div>
    </div>
</template>
