<template>
  <div>
    <header class="head">
      <div class="primary" v-show="Showing">
        <h1>图书清单</h1>
        <nav>
          <ul>
            <router-link :to="{path:'/header'}">
              <li style="color: rgb(35, 132, 232)">电影</li>
            </router-link>
            <router-link :to="{path:'/book'}">
              <li style="color: rgb(159, 120, 96);">图书</li>
            </router-link>
            <li class="icon-menu3" style=" color: #00b600;" @click="SHOW"></li>
          </ul>
        </nav>
      </div>
      <div class="secondary" v-show="Showing === false">
        <h3 class="close-nav" @click="SHOW">关闭</h3>
        <form action="">
          <div>
            <input type="text" placeholder="输入 作者 / 书名">
          </div>
        </form>
        <ul>
          <li>
            <div>
              <span>
                <strong style="color: rgb(35, 132, 232);">电影</strong>
                <span>影院热播</span>
              </span>
              <span>
                <strong style="color: rgb(230, 70, 126);">同城</strong>
                <span>周末活动</span>
              </span>
              <span>
                <strong style="color: rgb(159, 120, 96);">阅读</strong>
                <span>电子书</span>
              </span>
              <span>
                <strong style="color: rgb(225, 100, 77);">东西</strong>
                <span>心爱之物</span>
              </span>
            </div>
          </li>
          <li>
            <div>
              <span>
                <strong style="color: rgb(122, 106, 219);">电视</strong>
                <span>正在热播</span>
              </span>
              <span>
                <strong style="color: rgb(42, 184, 204);">小组</strong>
                <span>志趣相投</span>
              </span>
              <span>
                <strong style="color: rgb(87, 116, 197);">游戏</strong>
                <span>虚拟世界</span>
              </span>
              <span>
                <strong style="color: rgb(64, 207, 169);">FM</strong>
                <span>红心歌曲</span>
              </span>
            </div>
          </li>
          <li>
            <div>
              <span>
                <strong style="color: rgb(159, 120, 96);">图书</strong>
                <span>畅销排行</span>
              </span>
              <span>
                <strong style="color: rgb(244, 143, 46);">音乐</strong>
                <span>新碟榜</span>
              </span>
              <span>
                <strong style="color: rgb(89, 108, 221);">应用</strong>
                <span>玩手机</span>
              </span>
              <span>
                <strong style="color: rgb(66, 189, 86);">市集</strong>
                <span>购买原创</span>
              </span>
            </div>
          </li>
        </ul>
        <div class="navBottom">
          <div class="nav-item">
            <a href="">注册账号</a>
            <a href="">登录豆瓣</a>
          </div>
          <div class="nav-item">
            <a href="">使用桌面版</a>
            <a href="">使用豆瓣App</a>
          </div>
        </div>
      </div>
    </header>
    <div class="detils" v-show="Showing">
      <h1 class="title">更多</h1>
      <div class="grid">
        <div class="preces" v-for="(item, index) in teatils" v-if="index<num">
          <div class="cover">
            <div class="wppear">
              <img :src="item.images.small" alt="" ref="itemImg">
            </div>
          </div>
          <div class="info">
            <h3 class="title2">{{item.title}}</h3>
            <div class="starts">
              <start :item="item"></start>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import start from '../Start/start'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        teatils: Object,
        num: 9
      }
    },
    created() {
      this.teatils = this.$route.query.data
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('scroll', () => {
          let srcollTop = document.documentElement.scrollTop || document.body.scrollTop
          if (srcollTop > (30 * this.n)) {
            this.num += 3
            this.n++
          }
          console.log(this.num)
        })
      })
    },
    computed: {
      ...mapGetters(['Showing'])
    },
    methods: {
      ...mapMutations(['SHOW'])
    },
    components: {
      start
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .head {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
    background: #fff;
    font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
    .primary {
      border-bottom: 1px solid #f3f3f3;
      -webkit-box-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      align-items: center;
      padding: 0 18px;
      background: #fff;
      height: 47px;
      box-sizing: border-box;
      display: -webkit-box;
      display: flex;
      & > * {
        white-space: nowrap;
      }
      h1 {
        margin: 0;
        padding: 0;
        color: #00b600;
        background-size: cover;
        height: 22px;
        width: 46px;
        font-size: 22px;
        font-weight: 700;
        display: inline-block;
      }
      nav {
        display: inline-block;
        vertical-align: middle;
        li {
          float: left;
          font-size: 15px;
          margin-right: 19px;
        }
      }
    }
    .secondary {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 9999;
      background: #fff;
      .close-nav {
        position: absolute;
        top: 20px;
        left: 18px;
        height: 20px;
        width: 32px;
        line-height: 20px;
        color: #42bd56;
        font-size: 16px;
      }
      form {
        border-bottom: 1px solid #f3f3f3;
        padding: 15px 18px 15px 60px;
        input {
          box-sizing: border-box;
          -webkit-appearance: none;
          border: 0;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABGdBT…B/WBsUDu2HQ0ND33Ou41KOTpsm51SVYEZHR3cN/5Pq/wfEdlFyq1lD2AAAAABJRU5ErkJggg==) no-repeat 50% #f3f3f3;
          background-size: 17.33333px;
          border-radius: 3px;
          width: 100%;
          height: 31px;
          font-size: 14px;
        }
      }
      ul {
        padding-top: 25px;
        overflow: hidden;
        display: -webkit-box;
        display: flex;
        justify-content: space-around;
        li {
          width: 33.3%;
          div {
            float: left;
            position: relative;
            left: 50%;
            top: 0;
            span {
              display: block;
              text-align: center;
              margin-bottom: 25px;
              position: relative;
              left: -50%;
              top: 0;
              strong {
                display: block;
                font-weight: 400;
                font-size: 24px;
                line-height: 28px;
              }
              span {
                display: block;
                transform: translateX(50%);
                color: #999;
                height: 17px;
                font-size: 12px;
                letter-spacing: 1px;
              }
            }
          }
        }
      }
      .navBottom {
        width: 100%;
        border-bottom: 1px solid #f3f3f3;
        .nav-item {
          border-top: 1px solid #f3f3f3;
          padding: 13px 0;
          a {
            display: inline-block;
            margin: 0 auto;
            width: 49%;
            height: 20px;
            text-align: center;
            text-decoration: none;
            font-size: 15px;
            color: #42bd56;
            &:first-child {
              border-right: 1px solid #e5e5e5;
            }
          }
        }
      }
    }
  }

  .detils {
    padding-top: 47px;
    padding-left: 2%;
    padding-right: 2%;
    max-width: 650px;
    margin: 0 auto;
    overflow-x: hidden;

    .title {
      font-size: 24px;
      font-weight: normal;
      box-sizing: border-box;
      max-width: 660px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 6px;
      padding-left: 4%;
      padding-top: 20px;
    }
    .grid {
      padding: 10px 0;
      margin-left: auto;
      margin-right: auto;
      max-width: 660px;
      overflow: hidden;
      box-sizing: border-box;
      .preces {
        float: left;
        box-sizing: border-box;
        width: 33.33333%;
        padding-left: 3%;
        padding-right: 4%;
        margin-bottom: 20px;
        overflow: hidden;
        .cover {
          width: 100px;
          height: 130px;
          overflow: hidden;
          position: relative;
          .wppear {
            position: relative;
            &:before {
              content: "";
              display: block;
              padding-top: 100%;
            }
            img {
              display: block;
              position: absolute;
              margin: auto;
              left: -100%;
              right: -100%;
              top: -100%;
              bottom: -100%;
              min-height: 100%;
              min-width: 100%;
            }
          }
        }
        .info {
          height: 45px;
          overflow: hidden;
          .title2 {
            font-size: 13px;
            font-weight: normal;
            padding: 5px 0 0;
            color: #494949;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .starts {
            height: 16px;
            font-size: 12px;
            padding-top: 3px;
            text-align: center;
          }
        }
      }
    }

  }
</style>
