<template>
  <div>
    <h1>카카오톡 <mark>KOGPT 자연어 처리기반</mark> API쳇</h1>
    <hr />
    <textarea
      disabled
      name=""
      id=""
      cols="30"
      rows="10"
      :value="resp"
    ></textarea
    ><br />
    <input
      @keyup.enter="gpt()"
      v-model="inData"
      type="text"
      placeholder="질문할 내용을 입력하시오"
    />
    <button @click="gpt()">묻기</button>
  </div>
</template>
<script>
import { gpt3 } from '../../public/gpt3.js'
// import { gpt3 } from '../../public/gpt3_bk.js'
export default {
  data() {
    return {
      inData: '',
      resp: '',
      init: '',
      history: ''
    }
  },
  methods: {
    gpt: async function () {
      this.resp = '타이핑중...'
      const start = this.inData + this.init + this.history
      try {
        const answer = await gpt3(start)
        this.history += 'Human:' + this.inData + '\nAI:' + this.resp + '\n'
        this.resp = answer
        this.init = 'Human:' + this.inData + '\nAI:' + answer + '\n'
        this.inData = ''
      } catch (error) {
        console.error('Error while fetching GPT3 response:', error)
      }
    }
  }
}
</script>
<style scoped>
textarea {
  font-size: 1.1em;
  color: rgb(255, 255, 255);
  resize: none;
  font-weight: bold;
  background-color: rgb(108, 248, 147);
}
input {
  width: 210px;
  height: 30px;
}
button {
  width: 45px;
  height: 36px;
}
</style>
