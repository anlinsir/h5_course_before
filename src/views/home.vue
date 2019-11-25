<template>
    <div class="view-home" @click="getCampusOptions">
      <input type="text">
    </div>
</template>

<script>
import { getCampusOptions } from '@/libs/axios/modules/user'
import { local } from '@/libs/storage'
export default {
  name: 'Home',
  methods: {
    getCampusOptions () {
      getCampusOptions()
        .then(r => {

        })
    }
  }
}
</script>

<style lang="scss">
  .view-home{
    font-size: 20px;
    transform: translateY(-2px);
    >input{
      &:focus{
        border:1px solid red;
      }

    }
  }
</style>
