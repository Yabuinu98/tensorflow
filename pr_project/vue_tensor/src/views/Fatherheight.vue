<template>
  <div id="All">
    <h2>아버지 키로 아들 키 예측하기</h2>
    <!-- 엑셀 파일 올릴곳 -->
    <input type="file" @change="readExcel" />
    <!-- 파일 분석 하는곳 -->
    <button @click="predictSonHeight()">분석시작</button>
    <hr />
    <!-- 예측파트 -->
    <table>
      <tr>
        <td>아빠키</td>
        <td>
          <input
            type="text"
            id="input"
            placeholder="값을 입력해주세요"
            v-model="fatherHeight"
          />
        </td>
      </tr>
      <tr>
        <td>아들키</td>
        <td>
          <p id="rst">{{ resultMessage }}</p>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import * as tf from '@tensorflow/tfjs'
// import * as tfvis from '@tensorflow/tfjs-vis'
import * as XLSX from 'xlsx'

export default {
  data() {
    return {
      fatherHeight: '',
      resultMessage: '훈련할 자료가 없습니다.',
      father: [],
      son: []
    }
  },
  methods: {
    readExcel(event) {
      const input = event.target
      const reader = new FileReader()
      reader.onload = () => {
        const data = reader.result
        const workBook = XLSX.read(data, { type: 'binary' })
        const sheetName = 'train' // 대상 엑셀 파일의 시트 이름을 지정
        const sheet = workBook.Sheets[sheetName]
        const range = XLSX.utils.decode_range(sheet['!ref'])
        const { s, e } = range
        this.father = []
        this.son = []
        for (let row = s.r + 1; row <= e.r; row++) {
          const ftArr = []
          const sonArr = []
          const cellFather = sheet[XLSX.utils.encode_cell({ r: row, c: s.c })]
          const cellSon = sheet[XLSX.utils.encode_cell({ r: row, c: s.c + 1 })]
          if (cellFather && cellFather.t === 'n') {
            // Check if it's a number value ('n') instead of a string value ('s')
            ftArr.push(cellFather.v)
          }
          if (cellSon && cellSon.t === 'n') {
            // Check if it's a number value ('n') instead of a string value ('s')
            sonArr.push(cellSon.v)
          }
          this.father.push(ftArr)
          this.son.push(sonArr)
        }
      }
      reader.readAsBinaryString(input.files[0])
    },
    predictSonHeight() {
      if (!this.fatherHeight) {
        this.resultMessage = '아빠키를 입력해주세요.'
        return
      }

      const fatherHeight = parseFloat(this.fatherHeight)

      if (isNaN(fatherHeight)) {
        this.resultMessage = '올바른 숫자를 입력해주세요.'
        return
      }

      if (this.father.length === 0 || this.son.length === 0) {
        this.resultMessage = '훈련할 자료가 없습니다.'
        return
      }

      this.resultMessage = '데이터 로딩중...'

      const x = this.father.map((arr) => [parseFloat(arr[0])])
      const y = this.son.map((arr) => [parseFloat(arr[0])])
      const xt = tf.tensor(x)
      const yt = tf.tensor(y)

      /* 2. 모델 만들기 */
      const xx = tf.input({ shape: [1] })
      const h1 = tf.layers.dense({ units: 50, activation: 'relu' }).apply(xx)
      const h2 = tf.layers.dense({ units: 25, activation: 'sigmoid' }).apply(h1)
      const yy = tf.layers.dense({ units: 1 }).apply(h2)
      const model = tf.model({ inputs: xx, outputs: yy })
      const cparam = {
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError
      }
      model.compile(cparam)

      /* 3. 모델로 훈련시작 */
      const fparam = {
        epochs: 1000,
        batchSize: 32,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log('epoch:', epoch, logs, 'RMSE=>', Math.sqrt(logs.loss))
          }
        }
      }
      model.fit(xt, yt, fparam).then(() => {
        const prediction = model
          .predict(tf.tensor([[fatherHeight]]))
          .dataSync()[0]
        this.resultMessage = `아빠의 키가 ${fatherHeight}cm일 때, 아들의 예상 키는 ${prediction.toFixed(
          2
        )}cm입니다.`

        // 예측이 끝난 학습데이터들
        xt.dispose()
        yt.dispose()
      })
    }
  }
}
</script>
<style scoped>
#All {
  padding: 3%;
  background-color: burlywood;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  padding: 10px;
  text-align: center;
  margin-top: 2%;
}
button {
  margin-top: 20px;
  color: white;
  font-weight: bold;
  background-color: brown;
  padding: 10px;
  border: none;
  border-radius: 15px;
  width: 20%;
}
button:hover {
  background-color: yellow;
  color: black;
  box-shadow: inset 2px 2px 5px black;
}
table {
  width: 80%;
  height: 300px;
  color: white;
  text-align: center;
  border-collapse: collapse;
  background-color: brown;
}
tr,
td {
  padding: 10px;
  border: 3px dashed white;
}
#chart {
  margin-top: 3%;
  width: 80%;
  height: 400px;
}
</style>
