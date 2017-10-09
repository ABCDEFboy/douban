<template>
  <div>
    <div class="myScroll" ref="MyScroll">
      <div class="page">
        <div class="scroller-pullDown" style="display: none" ref="down">
          <div id="pullDown-msg" class="pull-down-msg">松手刷新哦</div>
        </div>
        <div class="card">
          <section>
            <header>
              <h2>影院热映</h2>
              <router-link :to="{path:'/deatil',query:{data:subjects_data}}"><span>更多</span></router-link>
            </header>
            <div class="section-content">
              <ul class="items">
                <li class="item-movie" v-for="(item, index) in subjects" :key="item.id">
                  <router-link :to="{path:'/messages',query:{id:item.id}}">
                    <div class="item-poster" :style="{backgroundImage:'url('+item.images.medium+')'}"></div>
                  </router-link>
                  <span class="item-title">{{item.title}}</span>
                  <start :item="item"></start>
                </li>
              </ul>
            </div>
          </section>
          <section>
            <header>
              <h2>电影排行榜</h2>
              <router-link :to="{path:'/deatil',query:{data:top_data}}"><span>更多</span></router-link>
            </header>
            <div class="section-content">
              <ul class="items">
                <li class="item-movie" v-for="item in top" :key="item.id">
                  <router-link :to="{path:'/messages',query:{id:item.id}}">
                    <div class="item-poster" :style="{backgroundImage:'url('+item.images.medium+')'}"></div>
                  </router-link>
                  <span class="item-title">{{item.title}}</span>
                  <start :item="item"></start>
                </li>
              </ul>
            </div>
          </section>
          <section>
            <header>
              <h2>即将上映</h2>
              <router-link :to="{path:'/deatil',query:{data:coming_soon_data}}"><span>更多</span></router-link>
            </header>
            <div class="section-content">
              <ul class="items">
                <li class="item-movie" v-for="item in coming_soon" :key="item.id">
                  <router-link :to="{path:'/messages',query:{id:item.id}}">
                    <div class="item-poster" :style="{backgroundImage:'url('+item.images.medium+')'}"></div>
                  </router-link>
                  <span class="item-title">{{item.title}}</span>
                  <start :item="item"></start>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <div class="scroller-pullUp" style="display: none" ref="up">
          <span id="pullUp-msg" class="pull-up-msg">玩命加载中...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import start from '../Start/start'
  import IScroll from 'iscroll/build/iscroll-probe'
  export default {
    data () {
      return {
        subjects: [],
        top: [],
        coming_soon: [],
        subjects_data: [],
        top_data: [],
        coming_soon_data: [],
        isPulled: false
      }
    },
    created() {
      this.$nextTick(() => {
        this.$http.get('/movie/in_theaters')
          .then((res) => {
            this.subjects = res.data.subjects.slice(0, 9)
            this.subjects_data = res.data
            console.log(res.data)
          }, (err) => {
            console.log(err)
          })
        this.$http.get('/movie/top250')
          .then((res) => {
            this.top = res.data.subjects.slice(0, 9)
            this.top_data = res.data
            console.log(res.data)
          }, (err) => {
            console.log(err)
          })
        this.$http.get('/movie/coming_soon')
          .then((res) => {
            this.coming_soon = res.data.subjects.slice(0, 9)
            this.coming_soon_data = res.data
            console.log(res.data)
          }, (err) => {
            console.log(err)
          })
        this.myScroll = new IScroll(this.$refs.MyScroll, {
          probeType: 3,
          click: true
        })
      })
    },
    updated() {
      let that = this
      this.myScroll.on('scroll', () => {
        let height = this.myScroll.y
        let bottomHeight = this.myScroll.maxScrollY - height
        console.log(this.myScroll.maxScrollY - height)
        if (height >= 40) {
          that.$refs.down.style.display = 'block'
        } else if (height < 40 && height >= 0) {
          that.$refs.down.style.display = 'none'
        }
        if (bottomHeight >= 80) {
          that.$refs.up.style.display = 'block'
        } else if (bottomHeight < 80 && bottomHeight >= 0) {
          that.$refs.up.style.display = 'none'
        }
      })
      this.myScroll.on('scrollEnd', () => {
        console.log('拖动结束')
      })
      this.myScroll.refresh()
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

  .myScroll {
    max-height: 667px;
    overflow: hidden;
    .page {
      padding-top: 47px;
      max-width: 650px;
      background: #fff;
      margin: 0 auto;
      overflow-x: hidden;
      .scroller-pullDown {
        width: 100%;
        height: 30px;
        padding: 10px 0;
        text-align: center;
      }
      .card {
        margin: 0;
        section {
          margin: 0;
          overflow: hidden;
          background-color: #fff;
          &:first-child {
            padding-top: 10px;
          }
          header {
            padding: 0 18px;
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
            span {
              float: right;
              font-size: .9rem;
              line-height: 1.5rem;
              color: #42bd56;
              &:after {
                display: block;
                content: '';
                clear: both;
              }
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
      .scroller-pullUp {
        width: 100%;
        height: 30px;
        padding: 10px 0;
        text-align: center;
      }
    }
  }
</style>
