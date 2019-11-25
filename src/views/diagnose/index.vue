<template>
    <div class="diag-page">
        <div class="diag-info">
           <div class="diag-info-user-info">
                <img  src="@/assets/images/user-img.png" alt="">
                <span class="name">何蒽芮</span>
                <span class="grade">二年级</span>
           </div>

           <div class="diag-info-title">
               2020寒假二年级语文模底测试
           </div>

            <div v-if="false" class="diag-info-notice">
                s
            </div>
            <div v-else class="diag-info-error">
               <img src="@/assets/images/error-page.png" alt="">
            </div>

            <div  v-if="false" class="diag-info-btn-part">
                <div class="base-btn base-btn-large">准备好了，开始诊断</div>
            </div>

            <div   class="diag-info-pay-course">
                <div class="base-btn base-btn-large">去买课</div>
            </div>

        </div>
    </div>
</template>
