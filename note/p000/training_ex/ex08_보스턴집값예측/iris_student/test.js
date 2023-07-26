const fs = require("fs");
const IRIS_CLASSES = ["Iris-setosa", "Iris-versicolor", "Iris-Virginica"];
const IRIS_FILE_PATH = "./IRIS.csv";
const IRIS_DATA = [];

// 파일을 읽어서 IRIS_DATA에 저장하는 함수
function readIrisData() {
  fs.readFile(IRIS_FILE_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    // 데이터를 줄 단위로 분리하여 배열로 만듭니다.
    const lines = data.trim().split("\n");

    // 첫 번째 줄은 헤더입니다. 헤더를 제외하고 데이터만 처리합니다.
    const headers = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");

      // 각 줄의 데이터를 객체로 변환합니다. 헤더를 키로 사용하여 값을 매핑합니다.
      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        // 'species' 속성이 존재하고, IRIS_CLASSES 배열에 해당 값이 있는 경우 인덱스 값으로 대체합니다.
        const key = headers[j].trim(); // 헤더의 앞뒤 공백 제거
        const value = values[j].trim(); // 값의 앞뒤 공백 제거

        if (key === "species" && IRIS_CLASSES.includes(value)) {
          entry[key] = IRIS_CLASSES.indexOf(value);
        } else {
          entry[key] = value;
        }
      }

      // IRIS_DATA 배열에 객체 밀기
      IRIS_DATA.push(entry);
    }

    console.log("IRIS_DATA loaded successfully.");
    console.log(IRIS_DATA);
  });
}

// 함수 호출로 데이터를 불러옵니다.
readIrisData();
