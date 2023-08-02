require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const url =
  "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84";

// const TelegramBot = require('node-telegram-bot-api'): node-telegram-bot-api 모듈을 사용하여 Telegram 봇을 생성합니다.
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.telbot;

// const bot = new TelegramBot(token, { polling: true }): 토큰을 사용하여 텔레그램 봇을 생성하고
// polling: true 옵션을 사용하여 봇이 메시지를 수신할 수 있도록 합니다.
const bot = new TelegramBot(token, { polling: true });

bot.onText(/^움짤/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp =
    "https://thumbs.gfycat.com/AdolescentHotBluegill-size_restricted.gif";
  bot.sendAnimation(chatId, resp);
});

bot.onText(/^사진/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp =
    "https://social-phinf.pstatic.net/20210307_237/16150733102294sSWV_JPEG/B110E207-BB0F-4A24-A9AC-0A80C86BB3B3.jpeg";
  bot.sendPhoto(chatId, resp);
});

bot.onText(/^이름이뭐야/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "저는 봇이에요^^";
  console.log(resp);
  bot.sendMessage(chatId, resp);
});

bot.onText(/^잘가/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "또 만나요~";
  console.log(resp);
  bot.sendMessage(chatId, resp);
});

// bot.onText(/^음악챠트/, (msg, match) => { ... }): 사용자가 "음악챠트"라는 메시지를 보낼 때 실행되는 이벤트 핸들러입니다.
bot.onText(/^음악챠트/, (msg, match) => {
  const chatId = msg.chat.id;
  // 봇은 axios를 사용하여 네이버 음악챠트 페이지를 가져옵니다
  axios.get(url).then((res) => {
    // 가져온 HTML 데이터를 cheerio를 사용하여 파싱
    const $ = cheerio.load(res.data);
    const song = [];
    $(".tit_area").each(function () {
      // tit_area 클래스를 갖는 요소들을 찾아 해당 텍스트를 추출합니다
      song.push($(this).text());
    });

    // 추출한 음악챠트 정보를 chart 변수에 저장하고, 이를 텔레그램 체팅으로 전송합니다.
    // .join('\n')은 map 메서드에서 생성된 배열을 개행 문자(\n)로 연결하여 하나의 문자열로 만드는 역할을 합니다.
    // 따라서, chart 변수에는 '1위: 노래1\n2위: 노래2\n3위: 노래3'과 같은 문자열이 저장됩니다.
    // 텔레그렘은 text형식 밖에 인식을 못하므로 .join()이 필수이다!!!
    const chart = song.map((v, i) => `${i + 1}위: ${v}`).join("\n");
    bot.sendMessage(chatId, chart);
  });
});
