import ReactSlider from "react-slider";
import "./RaffleResultWinnerGenerator.scss";

import Switch from "react-switch";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGenerateWinnersMutation } from "../../features/api";
import { Details } from "../Details/Details";
import { handleError } from "../../functions/handleError";
export const RaffleResultWinnerGenerator = () => {
  const [sliderValue, setSliderValue] = useState(4);
  const [switchValue, setSwitchValue] = useState(false);
  const { id } = useParams();
  const [generateWinners, { isLoading, error, reset }] =
    useGenerateWinnersMutation();
  const errorText = handleError(error);
  const marks = [1, 10, 20, 30, 40, 50];
  const onGenerate = () => {
    generateWinners({
      id: parseInt(id || "1"),
      exceptRepeats: switchValue,
      amountOfWinners: sliderValue,
    });
  };
  return (
    <div className="raffle-result__winner-generator">
      <Details
        isLoading={isLoading}
        error={errorText}
        onClose={() => reset()}
      ></Details>
      <div className="raffle-result__winner-generator__header">
        Победителей:{" "}
        {
          <span className="raffle-result__winner-generator__header_count">
            {sliderValue}
          </span>
        }
      </div>

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
        marks={marks}
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
      <span className="details-text raffle-result__winner-generator__details">
        Выберите, сколько победителей должно быть определено в розыгрыше.
      </span>
      <div className="line" style={{ marginTop: "20px" }}></div>
      <div className="raffle-result__winner-generator-slider">
        <span>Исключить повторения:</span>
        <Switch
          onChange={setSwitchValue}
          checked={switchValue}
          onColor="#35C759"
          offColor="#B0B0B0"
          onHandleColor="#fff"
          offHandleColor="#fff"
          handleDiameter={15}
          uncheckedIcon={false}
          checkedIcon={false}
          height={28}
          width={56}
          className="react-switch"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          borderRadius={20}
        />
      </div>
      <span
        className="details-text raffle-result__winner-generator__details"
        style={{ marginTop: "6px" }}
      >
        Включите, если хотите чтобы уже победившие в этом розыгрыше участники
        больше не побеждали.
      </span>
      <button
        className="raffle-result__winner-generator__button"
        onClick={onGenerate}
      >
        Сгенерировать
      </button>
    </div>
  );
};
