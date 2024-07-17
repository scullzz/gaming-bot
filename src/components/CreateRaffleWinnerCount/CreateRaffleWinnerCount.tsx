import ReactSlider from "react-slider";
import "./CreateRaffleWinnerCount.scss";
import { useState } from "react";
export const CreateRaffleWinnerCount = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const marks = [1, 10, 20, 30, 40, 50];

  return (
    <div className="create-raffle__winner-count">
      <div className="create-raffle__winner-count__header">
        <span className="create-raffle__header-label">Количество</span>
        <span className="create-raffle__header-label">4 победителя</span>
      </div>
      <div className="wrapper">
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          value={sliderValue}
          onChange={(value) => setSliderValue(value)}
          renderThumb={(props) => <div {...props}></div>}
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`example-track ${
                state.index === 0 ? "filled-track" : ""
              }`}
            ></div>
          )}
          min={1}
          max={50}
          marks={marks} // Преобразуем массив в объект для корректного отображения меток
          renderMark={(props) => {
            const { key, style } = props;
            const markPosition = Number(key);
            const isBeforeThumb = markPosition <= sliderValue;

            return (
              <div
                className="slider-mark"
                style={{
                  ...style,
                  top: "-45px",
                  position: "absolute",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span className="mark-text">{markPosition}</span>
                <span
                  style={{
                    backgroundColor: isBeforeThumb ? "#007bff" : "#ddd",
                    height: "12px",
                    width: "3px",
                  }}
                  className="mark"
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
