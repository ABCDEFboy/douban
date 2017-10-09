<template>
  <div>
    <header class="head">
      <div class="primary" v-show="Showing">
        <h1>我的</h1>
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
            <input type="text" placeholder=" 输入 电影名 / 明星 / 书名">
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
    <div class="page">
      <div class="card">
        <h1 class="title">{{Data.title}}</h1>
        <div class="subject-info">
          <div class="right">
            <img :src="Data.images.medium" alt="">
          </div>
          <div class="left">
            <p class="rating">
              <start :item="Data" class="start"></start>
              <span>{{Data.ratings_count}}人评论</span>
            </p>
            <p class="meta">
              120分钟/{{Data.genres[0]}} /
              <span v-for="director in Data.directors">{{director.name}}(导演) / </span>
              <span v-for="casts in Data.casts">{{casts.name}} / </span>
              于 {{Data.year}}年在 {{Data.countries[0]}}上映
            </p>
          </div>
        </div>
        <div class="subject-intro">
          <h2>{{Data.title}}的剧情简介</h2>
          <div class="bd">
            <p class="summary01" v-show="isShow">
              {{Data.summary}}
            </p>
            <span @click="show" v-show="isShow">(详情)</span>
            <p class="summary02" v-show="isShow === false">
              {{Data.summary}}
            </p>
          </div>
        </div>
        <section>
          <header>
            <h2>影人</h2>
          </header>
          <div class="section-content">
            <ul class="items">
              <li class="item-movie" v-for="item in actor" :key="item.id">
                <div class="item-poster" :style="{backgroundImage:'url('+item.avatars.medium+')'}"></div>
                <span class="item-title">{{item.name}}</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import start from '../Start/start'
  export default {
    data () {
      return {
        Data: {},
        actor: [],
        ratings: {},
        isShow: true
      }
    },
    created() {
      this.$nextTick(() => {
        this.$http.get('/movie/subject/' + this.$route.query.id + '')
          .then((res) => {
            this.Data = res.data
            this.Data.directors.forEach((item) => {
              this.actor.push(item)
            })
            this.Data.casts.forEach((item) => {
              this.actor.push(item)
            })
            console.log(res.data)
          }, (err) => {
            console.log(err)
          })
      })
    },
    computed: {
      ...mapGetters(['Showing'])
    },
    methods: {
      ...mapMutations(['SHOW']),
      show() {
        this.isShow = !this.isShow
      }
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

  .page {
    padding: 35px 15px 0;
    max-width: 650px;
    background: #fff;
    margin: 0 auto;
    overflow-x: hidden;
    .card {
      margin-top: 0;
      .title {
        margin: 30px 0 5px;
        font-size: 24px;
        line-height: 32px;
        word-break: break-all;
      }
      .subject-info {
        position: relative;
        margin-bottom: 30px;
        .right {
          float: right;
        }
        .left {
          margin-right: 100px;
          padding-bottom: 30px;
          .rating {
            line-height: 18px;
            font-size: 15px;
            color: #494949;
            .start {
              display: inline-block;
            }
            span {
              margin-left: 10px;
              color: #aaa;
            }
          }
          .meta {
            color: #494949;
            margin-top: 15px;
            padding-right: 24px;
            font-size: 14px;
            line-height: 1.6;
          }
        }
      }
      .subject-intro {
        margin-bottom: 30px;
        h2 {
          color: #aaa;
          margin: 0 0 15px;
          font-size: 15px;
        }
        .bd {
          position: static;
          .summary01 {
            display: inline-block;
            margin: 0;
            padding: 0;
            line-height: 22px;
            height: 66px;
            text-overflow: ellipsis;
            word-wrap: break-word;
            overflow: hidden;
            font-size: 15px;
            color: #494949;
          }
          span {
            float: right;
            font-size: 15px;
            color: #00b600;
          }
          .summary02 {
            display: inline-block;
            margin: 0;
            padding: 0;
            line-height: 22px;
            text-overflow: ellipsis;
            word-wrap: break-word;
            overflow: hidden;
            font-size: 15px;
            color: #494949;
          }
        }
      }
      section {
        margin: 0;
        overflow: hidden;
        background-color: #fff;
        &:first-child {
          padding-top: 10px;
        }
        header {
          padding: 0 10px;
          h2 {
            display: inline-block;
            min-width: 4em;
            margin-top: 2px;
            margin-bottom: 0;
            color: #111;
            padding-left: 0;
            padding-bottom: 0;
            font-size: 1.06rem;
          }
        }
        .section-content {
          margin-bottom: -1.12rem;
          .items {
            padding: 15px 0 43px 0;
            width: 100%;
            overflow-x: auto;
            white-space: nowrap;
            border-bottom: 1px solid #f2f2f2;
            font-size: 0;
            & > * {
              font-size: .94rem;
              white-space: nowrap;
            }
            .item-movie {
              display: inline-block;
              padding-right: 8px;
              vertical-align: top;
              width: 100px;
              text-align: center;
              &:first-child {
                margin-left: 1.12rem;
              }
              .item-poster {
                width: 100%;
                overflow: hidden;
                background-size: cover;
                background-position: center;
                &:before {
                  content: '';
                  float: left;
                  margin-top: 142.85714%;
                }
              }
              .item-title {
                display: block;
                margin-top: .6rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                line-height: .94rem;
              }
            }
          }
        }
      }
    }
  }
</style>
