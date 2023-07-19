require("dotenv").config();
const express = require("express");
const request = require("request");

const app = express();
const client_id = process.env.nid;
const client_secret = process.env.npw;

app.use(express.urlencoded({ extended: true })); // 요청의 본문을 해석하기 위한 미들웨어 등록

app.get("/", function (req, res) {
  // 입력 폼을 표시하는 라우트
  res.send(`
    <form action="/trans" method="POST">
      <input type="text" name="source" placeholder="원본 언어" required>
      <input type="text" name="target" placeholder="목표 언어" required>
      <textarea name="text" placeholder="번역할 텍스트" required></textarea>
      <button type="submit">번역하기</button>
    </form>
  `);
});

app.post("/trans", function (req, res) {
  // 번역을 처리하는 라우트
  const { source, target, text } = req.body;

  const api_url = "https://openapi.naver.com/v1/papago/n2mt";
  const options = {
    url: api_url,
    form: { source, target, text },
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      console.log(body);
      let result = JSON.parse(body);
      let translatedText = result.message.result.translatedText;
      let html = `
        <h1>번역 결과</h1>
        <p>${translatedText}</p>
      `;
      res.end(html);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.listen(3000, function () {
  console.log("http://127.0.0.1:3000 app listening on port 3000!");
});

/*
require('dotenv').config(): .env 파일에서 환경 변수를 로드하기 위한 코드입니다. .env 파일에는 nid와 npw라는 환경 변수가 정의되어 있어야 합니다.

const express = require('express'): Express 모듈을 로드합니다.

const request = require('request'): HTTP 요청을 보내기 위한 Request 모듈을 로드합니다.

const app = express(): Express 애플리케이션을 생성합니다.

const client_id = process.env.nid 및 const client_secret = process.env.npw: 환경 변수에서 클라이언트 ID와 클라이언트 시크릿 값을 가져옵니다. 이 값들은 네이버 Papago API에 요청할 때 사용됩니다.

app.use(express.urlencoded({ extended: true })): 요청의 본문을 해석하기 위한 미들웨어를 등록합니다. 이 미들웨어를 사용하여 폼 데이터를 추출할 수 있습니다.

app.get('/'): 루트 경로로 GET 요청이 오는 경우, 입력 폼을 표시하는 라우트 핸들러입니다. 사용자가 번역할 언어와 텍스트를 입력할 수 있는 폼을 보여줍니다.

app.post('/trans'): '/trans' 경로로 POST 요청이 오는 경우, 번역을 처리하는 라우트 핸들러입니다. 요청 본문에서 source, target, text를 추출하여 번역 API를 호출합니다. 번역 결과를 받아서 웹 페이지에 표시합니다.

request.post(options, function (error, response, body) { ... }): request 모듈을 사용하여 번역 API에 POST 요청을 보냅니다. 요청 옵션과 콜백 함수가 전달됩니다. 콜백 함수에서는 요청이 성공하면 번역 결과를 웹 페이지에 표시하고, 실패하면 에러 상태 코드를 반환합니다.

app.listen(3000, function () { ... }): 3000 포트에서 Express 애플리케이션을 실행합니다. 서버가 시작되면 콘솔에 메시지가 출력됩니다.
*/
