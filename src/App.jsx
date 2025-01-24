import React, { useState } from "react";

function App() {
  // <---- 자바스크립트 영역 ---->

  const [country, setCountry] = useState("");
  const [goldMedal, setGoldMedal] = useState(0);
  const [sliverMedal, setSilverMedal] = useState(0);
  const [dongMedal, setDongMedal] = useState(0);
  const [defaultSentence, setDefaultSentence] = useState(
    <p style={{ marginLeft: 30 }}>
      각 입력값에 맞게 설정한 후 국가 추가버튼을 눌러주세요!
    </p>
  );
  const [lists, setLists] = useState([]);

  const countries = (e) => {
    setCountry(String(e.target.value));
  };

  const goldMedals = (e) => {
    setGoldMedal(Number(e.target.value));
  };
  const sliverMedals = (e) => {
    setSilverMedal(Number(e.target.value));
  };
  const dongMedals = (e) => {
    setDongMedal(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDuplicate = lists.some((list) => list.countryName === country);
    if (isDuplicate) {
      alert("동일한 국가입니다. 다시 입력하세요!");
      resetInputs();
      return;
    }

    if (!country.trim()) {
      return;
    }

    const newEntry = {
      id: crypto.randomUUID(),
      countryName: country,
      gold: goldMedal,
      sliver: sliverMedal,
      bronze: dongMedal,
    };

    setLists([...lists, newEntry].sort((a, b) => b.gold - a.gold));
    resetInputs();
    setDefaultSentence(null);
  };

  const onUpdate = () => {
    const noCountryName = lists.some((list) => list.countryName === country);
    if (!noCountryName) {
      alert("해당국가를 업데이트전에 추가를 먼저해야합니다!");
      resetInputs();
      return;
    }
    setLists(
      lists.map((list) => {
        if (list.countryName === country) {
          return {
            ...list,
            gold: goldMedal,
            sliver: sliverMedal,
            bronze: dongMedal,
          };
        }
        return list;
      })
    );
    resetInputs();
  };

  const resetInputs = () => {
    setCountry("");
    setGoldMedal(0);
    setSilverMedal(0);
    setDongMedal(0);
  };

  const onDelete = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  return (
    /* <---- HTML/JSX 영역  ---->*/
    <div
      style={{
        backgroundColor: "grey",
        margin: 50,
        width: 1400,
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 32,
        }}
      >
        2024파리올림픽
      </header>

      <form onSubmit={handleSubmit}>
        {/* 메인로직한줄 */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 80,
            width: "70%",
            marginLeft: 40,
          }}
        >
          {/* 국가명,인풋 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 200,
              textAlign: "center",
            }}
          >
            <span>국가명</span>
            <input
              type="text"
              value={country}
              placeholder="국가입력"
              onChange={countries}
              style={{ height: 35 }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 200,
              textAlign: "center",
            }}
          >
            <span>금메달</span>
            <input
              type="number"
              value={goldMedal}
              placeholder="0"
              min={0}
              onChange={goldMedals}
              style={{ height: 35 }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 200,
              textAlign: "center",
            }}
          >
            <span>은메달</span>
            <input
              type="number"
              value={sliverMedal}
              placeholder="0"
              min={0}
              onChange={sliverMedals}
              style={{ height: 35 }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 200,
              textAlign: "center",
            }}
          >
            <span>동메달</span>
            <input
              type="number"
              value={dongMedal}
              min={0}
              placeholder="0"
              onChange={dongMedals}
              style={{ height: 35 }}
            />
          </div>

          {/* 버튼 */}
          <div>
            <br></br>
            <button
              type="submit"
              style={{
                width: 110,
                height: 35,
              }}
            >
              국가 추가
            </button>
          </div>
          <div>
            <br></br>
            <button
              style={{
                width: 110,
                height: 35,
              }}
              onClick={function () {
                {
                  onUpdate();
                }
              }}
            >
              업데이트
            </button>
          </div>
        </div>{" "}
        {/* 메인로직한줄 */}
      </form>

      {/* 아무것도추가안눌렀을때 기본설정값p태그 */}
      {defaultSentence}
      {/* crud 중 c */}
      <div>
        {lists.map(function (list) {
          return (
            <div key={list.id}>
              <h3
                style={{
                  backgroundColor: "green",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  height: 50,
                  margin: 0,
                  padding: 0,
                  alignItems: "center",
                }}
              >
                <span>국가명</span>
                <span>금메달</span>
                <span>은메달</span>
                <span>동메달</span>
                <span>액션</span>
              </h3>
              <h3
                style={{
                  backgroundColor: "green",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  height: 50,
                  margin: 0,
                  padding: 0,
                  alignItems: "center",
                }}
              >
                <span> {list.countryName}</span>
                <span>{list.gold}</span>
                <span>{list.sliver}</span>
                <span> {list.bronze}</span>
                <button
                  onClick={function () {
                    return onDelete(list.id);
                  }}
                >
                  삭제
                </button>
              </h3>
            </div>
          );
        })}
      </div>

      {/*첫 디브태그 */}
    </div>
  );
}

export default App;
