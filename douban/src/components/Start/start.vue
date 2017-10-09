<template>
  <div>
    <div class="item-rating">
      <div class="rank" v-show="item.rating.average>0">
                    <span class="rating-stars" v-for="start in starsClass(item.rating.average)">
                      <span class="icon-star-empty start" :class="{'heightlight':start}"></span>
                    </span>
        <span>{{item.rating.average}}</span>
      </div>
      <div class="rank" v-show="item.rating.average===0">暂无评分</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: Object
    },
    data () {
      return {}
    },
    methods: {
      starsClass(starRating) {
        let arr = []
        let score = Math.floor(starRating / 2)
        for (let i = 1; i < 6; i++) {
          if (i < score) {
            arr.push(true)
          } else if (i >= score && i < starRating / 2) {
            arr.push(true)
          } else {
            arr.push(false)
          }
        }
        return arr
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .item-rating {
    color: #aaa;
    line-height: .94rem;
    margin-top: .3rem;
    font-size: .72rem;
    .rank {
      .rating-stars {
        display: inline-block;
        vertical-align: middle;
        .start {
          display: inline-block;
          font-size: 1px;
          color: #ccc;
          &.heightlight {
            color: gold;
          }
        }
      }
    }
  }
</style>
