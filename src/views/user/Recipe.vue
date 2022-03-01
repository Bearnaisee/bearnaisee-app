<template>
  <div>
    <div class="recipe-img">
      <div class="recipe-top-btn">
        <div class="recipe-back">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.84 6.403H3.988L7.595 2.28a1.47 1.47 0 0 0 0-1.888c-.457-.523-1.195-.523-1.652 0l-5.6 6.4a1.436 1.436 0 0 0-.145.203c-.018.032-.028.064-.046.096a.618.618 0 0 0-.061.133c-.014.043-.023.086-.037.134-.01.037-.024.074-.033.117-.028.17-.028.352 0 .523.01.042.019.08.033.117.009.043.018.09.037.133.019.048.042.091.06.134.015.032.029.064.047.096.042.074.094.144.145.202l5.6 6.4c.229.262.527.39.826.39.298 0 .597-.128.826-.39a1.47 1.47 0 0 0 0-1.888L3.987 9.07H19.84c.644 0 1.167-.598 1.167-1.334 0-.736-.523-1.333-1.167-1.333Z"
              fill="#000" />
          </svg>
        </div>
        <div class="recipe-like">
          <svg width="23" height="24" viewBox="0 0 23 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="m3.742 11.376 7.37 8.85 7.369-8.85.064-.064a2.909 2.909 0 0 0 .082-.103l.044-.056a8.08 8.08 0 0 1 .142-.177c1.583-1.9 1.583-4.984 0-6.885-1.581-1.9-4.145-1.9-5.726 0a4.851 4.851 0 0 0-.251.33l-1.725 2.245L9.387 4.42a4.841 4.841 0 0 0-.251-.329c-1.582-1.9-4.145-1.9-5.727 0-1.583 1.901-1.583 4.984 0 6.885.056.067.106.13.143.177.018.024.032.04.043.056a4.504 4.504 0 0 0 .083.103l.064.064ZM11.112 24 2.24 13.345c-.096-.096-.182-.206-.27-.317a5.116 5.116 0 0 0-.133-.167c-2.45-2.942-2.45-7.712 0-10.654C3.905-.277 7.057-.664 9.464 1.046a6.67 6.67 0 0 1 1.182 1.087l.062.074c.018.02.035.042.053.064.084.103.165.209.243.316.03.042.107.104.107.104s.077-.062.107-.104a7.528 7.528 0 0 1 .358-.454c.12-.139.243-.272.369-.398.259-.259.531-.489.814-.69 2.406-1.71 5.559-1.322 7.626 1.162 2.45 2.942 2.45 7.712 0 10.654-.045.055-.089.11-.133.167-.087.11-.173.22-.27.317L11.112 24Z"
              fill="#FF7D61" />
          </svg>

        </div>
      </div>
      <Image class="bg-img" />
    </div>
    <div class="recipe-wrapper">
      <div class="recipeinfo">
        <h1>{{ $route.params.slug }}</h1>
        <div>
          <h2>By {{ $route.params.username }}</h2>
          <div class="rc-wrapper">
            <div class="rc-icon">
              <svg width="15" height="15" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.52 10.624A5.224 5.224 0 1 1 10.744 5.4a5.23 5.23 0 0 1-5.224 5.224Zm0-9.448a4.224 4.224 0 1 0 0 8.448 4.224 4.224 0 0 0 0-8.448Zm2.634 4.456a.498.498 0 0 0-.5-.5H6.02v-2.4a.5.5 0 1 0-1 0v2.9a.5.5 0 0 0 .5.5h2.134a.5.5 0 0 0 .5-.5Z"
                  :fill="rccolor" />
              </svg>
            </div>
            <div>{{ time }}</div>

            <div class="rc-icon">
              <svg width="15" height="15" viewBox="0 0 8 11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.104 10.05c-.154 0-.306-.033-.446-.096a1.086 1.086 0 0 1-.658-1V1.852a1.102 1.102 0 0 1 1.1-1.1h4.976a1.102 1.102 0 0 1 1.1 1.1v7.096a1.1 1.1 0 0 1-1.846.8l-1.742-1.6-1.742 1.6c-.2.19-.465.299-.742.302Zm0-8.298a.1.1 0 0 0-.1.1v7.096a.1.1 0 0 0 .168.072l1.946-1.8a.702.702 0 0 1 .948 0l1.946 1.8a.1.1 0 0 0 .168-.072V1.852a.1.1 0 0 0-.1-.1H1.104Z"
                  :fill="rccolor" />
              </svg>
            </div>
            <div>
              <router-link v-for="(tag, tagIndex) of tags" :key="tagIndex" :to="`#${tag}`">
                {{ tagIndex === 0 ? tag : `, ${tag}` }}
              </router-link>
            </div>
          </div>
          <p>A simple Read More, Read Less pen in Vue.js</p>
          <div v-if="showMore">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Venenatis lectus magna
              fringilla urna. Etiam tempor orci eu lobortis. Integer quis auctor elit sed vulputate
              mi sit. Lacinia
              at quis risus sed vulputate odio ut enim blandit. Nibh praesent tristique magna sit
              amet purus. Eleifend donec pretium vulputate sapien nec
              sagittis. Facilisi morbi tempus iaculis urna id volutpat. Ultrices neque ornare aenean
              euismod.
            </p>
          </div>
          <a @click="toggleShowMore">
            <span v-if="showMore">Hide</span>
            <span v-else>More</span>
          </a>


        </div>
        <div>
          <h3>Ingredients</h3>
        </div>
        <div>
          <h3>Steps</h3>
          <a @click="toggleHideSteps">
            <div v-if="hideStep">
              <h4>Step 1</h4>
              <p>uno uno uno uno uno uno uno</p>
            </div>
            <div v-else>Step 1</div>
          </a>
          <a @click="toggleHideSteps">
            <div v-if="hideStep">
              <h4>Step 2</h4>
              <p>dos dos dos dos dos dos</p>
            </div>
            <div v-else>Step 2</div>
          </a>
          <a @click="toggleHideSteps">
            <div>
              <h4>Step 3</h4>
              <p>tres tres tres tres tres</p>
            </div>
            <div>Step 3</div>
          </a>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {
    defineAsyncComponent
  } from 'vue';

  export default {
    name: 'Recipe',
    data() {
      return {
        showMore: false,
        hideStep: true
      }
    },
    props: {
      rccolor: {
        type: String,
        default: '#D53F29',
      }
    },
    components: {
      Image: defineAsyncComponent(() => import('@/components/Image.vue')),
    },
    methods: {
      toggleShowMore() {
        this.showMore = !this.showMore
      }
    }

  };

</script>

<style lang="scss" scoped>
  
  .recipe-img {
    height: 35vh;
    width: auto;
    margin-bottom: 0%;
    z-index: 0;

    .bg-img{
    border-radius: 0px;
    width: 100%;
    margin-top: 0vh;
    z-index: -1;
    position: absolute;
    overflow: hidden;

  }
  }

  .recipe-top-btn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .recipe-back {
    height: 50px;
    width: 50px;
    background-color: #E8E8E8;
    border-radius: 50%;
    display: flex;

    svg {
      display: block;
      justify-content: center;
      margin: auto;
    }
  }

  .recipe-like {
    height: 50px;
    width: 50px;
    background-color: #E8E8E8;
    border-radius: 50%;
    display: flex;

    svg {
      display: block;
      justify-content: center;
      margin: auto;
    }
  }
.recipeinfo {
    margin: 10%;
  }
  h1 {
    font-family: var(--header-text);
  }

  

  h2 {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    color: #7E7E7E;
  }

  .recipe-wrapper {
    background-color: rgb(255, 233, 191);
    border-radius: 50px 50px 0 0;
    z-index: 1;
    margin-top: -25%;
    width: auto;
    height: 55vh;
    bottom: 0;
  }

  a {
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
  }

  .rc-wrapper {
    display: grid;
    grid-template-columns: 30px 150px;
    grid-template-rows: repeat(2, 0fr);
  }

  .rc-icon {
    margin: 0px auto;
    text-align: center;
    margin-top: 1.5px;
  }

</style>
