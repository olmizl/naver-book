const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { query } = require("express");
const dotenv = require("dotenv").config();
const NAVER_ID = process.env.NAVER_ID;
const NAVER_SECRET_ID = process.env.NAVER_SECRET_ID;

const app = express();

app.set("port", process.env.PORT || 8099); //포트 번호 지정
const port = app.get("port");
app.use(cors());

// 라우팅 (주소를 치고 들어오면 보일화면or텍스트) //
app.get("/", (req, res) => {
  res.send("hello node");
});

//(쿼리) : 127.0.0.1:8099/news?news=코로나
//(파람) : 127.0.0.1:8099/news/코로나

app.get("/news", (req, res) => {
  const queryTxt = encodeURIComponent(req.query.newsname);
  axios({
    url: `https://openapi.naver.com/v1/search/news.json?query=${queryTxt}&display=100`,
    headers: {
      "X-Naver-Client-Id": NAVER_ID,
      "X-Naver-Client-Secret": NAVER_SECRET_ID,
    },
  }).then(function (response) {
    res.json(response.data);
  });
});

//중간대리인 역할 ( query 말고 params로 받는방법 )
app.get("/book/:bookname", (req, res) => {
  const queryTxt = encodeURIComponent(req.params.bookname);
  console.log(req.params.bookname);
  axios({
    url: `https://openapi.naver.com/v1/search/book.json?query=${queryTxt}`,
    headers: {
      "X-Naver-Client-Id": NAVER_ID,
      "X-Naver-Client-Secret": NAVER_SECRET_ID,
    },
  }).then(function (response) {
    // console.log(response.data);
    res.json(response.data); //화면에 출력하기
  });
});

//제이쿼리버전
app.get("/book02", (req, res) => {
  const queryTxt = encodeURIComponent(req.query.bookname);
  axios({
    url: `https://openapi.naver.com/v1/search/book.json?query=${queryTxt}`,
    headers: {
      "X-Naver-Client-Id": NAVER_ID,
      "X-Naver-Client-Secret": NAVER_SECRET_ID,
    },
  }).then(function (response) {
    // console.log(response.data);
    res.json(response.data); //화면에 출력하기
  });
});

app.get("/login", (req, res) => {
  console.log(req.query);
  if (req.query.id === "jjang051" && req.query.pw === "1234") {
    res.json({ isLogged: true });
  } else {
    res.json({ isLogged: false });
  }
});

app.get("/movie/:moviename", (req, res) => {
  const queryTxt = encodeURIComponent(req.params.moviename);
  // const display = encodeURIComponent(req.params.display);
  // console.log(req.params.moviename);
  axios({
    url: `https://openapi.naver.com/v1/search/movie.json?query=${queryTxt}`,
    headers: {
      "X-Naver-Client-Id": NAVER_ID,
      "X-Naver-Client-Secret": NAVER_SECRET_ID,
    },
  }).then(function (response) {
    // console.log(response.data);
    res.json(response.data); //화면에 출력하기
  });
});

//들을것이다 //포트번호지정한 곳에서  node가 할 기능
app.listen(PORT, function () {
  console.log(`${PORT}에서 서버 대기중`);
});
