<template>
  <div>
    <header class="head">
      <div class="primary">
        <h1>我的图书</h1>
        <nav>
          <ul>
            <router-link :to="{path:'/header'}">
              <li style="color: rgb(35, 132, 232)">电影</li>
            </router-link>
            <router-link :to="{path:'/book'}">
              <li style="color: rgb(159, 120, 96);">图书</li>
            </router-link>
            <li class="icon-menu3" style=" color: #00b600;"></li>
          </ul>
        </nav>
      </div>
      <div class="secondary">
        <form action="">
          <div>
            <input type="text" placeholder=" 输入书名 / 作者" v-model="message">
          </div>
        </form>
        <h3 class="close-nav" @click="refresh">搜索</h3>
      </div>
    </header>
    <div class="detils">
      <h1 class="title">找到如下图书</h1>
      <div class="grid">
        <div class="preces" v-for="(item, index) in search" v-if="index<num">
          <div class="cover">
            <div class="wppear">
              <router-link :to="{path:'/bookMessage',query:{id:item.id}}">
                <img :src="item.images.small" alt="" ref="itemImg">
              </router-link>
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
  export default {
    data () {
      return {
        message: '',
        search: {},
        time: 0,
        num: 9,
        n: 1
      }
    },
    created() {
      this.$nextTick(() => {
        this.$http.get('/book/search?q=' + this.$route.query.Message)
          .then((res) => {
            this.search = res.data.books
            console.log(res.data)
          }, (err) => {
            console.log(err)
          })
        this.message = this.$route.query.Message
      })
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('scroll', () => {
          let srcollTop = document.documentElement.scrollTop || document.body.scrollTop
          console.log(srcollTop)
          if (srcollTop > (30 * this.n)) {
            this.num += 3
            this.n++
          }
          console.log(this.num)
        })
      })
    },
    methods: {
      refresh() {
        this.$http.get('/book/search?q=' + this.message)
          .then((res) => {
            this.search = res.data.books
            console.log(res.data)
          }, (err) => {
            console.log(err)
          })
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
      top: 46px;
      bottom: 0;
      z-index: 999;
      background: #fff;
      .close-nav {
        position: absolute;
        top: 20px;
        right: 18px;
        height: 20px;
        width: 32px;
        line-height: 20px;
        color: #42bd56;
        font-size: 16px;
      }
      form {
        border-bottom: 1px solid #f3f3f3;
        padding: 15px 60px 15px 18px;
        background: #fff;
        input {
          box-sizing: border-box;
          -webkit-appearance: none;
          padding-left: 10px;
          border: 0;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABGdBT…B/WBsUDu2HQ0ND33Ou41KOTpsm51SVYEZHR3cN/5Pq/wfEdlFyq1lD2AAAAABJRU5ErkJggg==) no-repeat 50% #f3f3f3;
          background-size: 17.33333px;
          border-radius: 3px;
          width: 100%;
          height: 31px;
          font-size: 14px;
        }
      }
    }
  }

  .detils {
    padding-top: 100px;
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
