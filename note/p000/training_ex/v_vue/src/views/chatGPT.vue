<template>
  <div>
    <div class="chat-container">
      <div class="gpt-chat">
        <div
          v-for="(chat, index) in chatHistory"
          :key="index"
          :class="{ 'user-message': chat.from === 'user' }"
        >
          <span>{{ chat.content }}</span>
        </div>
      </div>
    </div>
    <div class="user-input">
      <input
        @keyup.enter="gpt()"
        v-model="inData"
        type="text"
        placeholder="질문할 내용을 입력하시오"
      />
      <button @click="gpt()">묻기</button>
    </div>
  </div>
</template>

<script>
import { chatgptApi } from '../../public/chatgpt.js'
export default {
  data() {
    return {
      inData: '',
      chatHistory: []
    }
  },
  methods: {
    gpt: async function () {
      const ask = this.inData
      const userMessage = { from: 'user', content: ask }
      this.chatHistory.push(userMessage)
      const answer = await chatgptApi(ask, 32, 0.6, 0.7, 1)
      const gptMessage = { from: 'gpt', content: answer }
      this.chatHistory.push(gptMessage)
      this.inData = ''

      // Scroll to the bottom after adding new messages
      this.$nextTick(() => {
        const container = this.$el.querySelector('.gpt-chat')
        container.scrollTop = container.scrollHeight
      })
    }
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column-reverse;
  height: 400px; /* Limit the chat history height */
  overflow-y: scroll; /* Enable scrolling if the content exceeds the height */
}

.gpt-chat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}

.gpt-chat .user-message {
  align-self: flex-end;
}

.user-message {
  background-color: plum; /* Set background color for both user's question and chatbot's answer */
}

.user-input {
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.2);
}

textarea {
  width: 500px;
  font-size: 1.1em;
  color: rgb(254, 254, 254);
  resize: none;
  font-weight: bold;
  background-color: rgb(8, 176, 253);
}

input {
  flex: 1;
  height: 30px;
  margin-right: 10px;
}

button {
  width: 45px;
  height: 36px;
}
</style>
