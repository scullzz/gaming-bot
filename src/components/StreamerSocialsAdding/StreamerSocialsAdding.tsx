import { useGetAvailableSocialsQuery } from "../../features/api";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";
import "./StreamerSocialsAdding.scss";
import Select from "react-select";
interface IStreamerSocialsAddingProps {
  id: string;
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    marginLeft: "10px",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "#007aff",
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
};
export const StreamerSocialsAdding = ({ id }: IStreamerSocialsAddingProps) => {
  const {
    data: availableSocials,
    isLoading: socialsAdding,
    error: socialsError,
  } = useGetAvailableSocialsQuery();
  const { errorText: socialsErrorText, setErrorText: setSeT } =
    useQueryError(socialsError);
  const options = availableSocials?.map((t) => ({ value: t, label: t }));
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="streamer-socials-adding">
      <Details
        isLoading={!availableSocials && socialsAdding}
        error={socialsErrorText}
        onClose={() => setSeT(undefined)}
      ></Details>
      <span
        className="details-text details-text_add"
        style={{ textTransform: "uppercase", marginInline: "20px" }}
      >
        Ссылки на соцсети
      </span>
      <form className="streamer-socials-adding__form">
        <div className="wrapper">
          <Select
            placeholder="Название ссылки"
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            styles={customStyles}
          ></Select>
          <div
            className="line"
            style={{ width: "calc(100% - 20px)", marginLeft: "20px" }}
          ></div>
          <input type="text" className="input" placeholder="URL ссылки" />
        </div>
        <div className="btn attention-btn streamer-socials-adding__form-btn">
          Добавить
        </div>
      </form>
      <span
        className="details-text details-text_add"
        style={{ marginTop: "8px", marginInline: "20px" }}
      >
        Добавьте до 5 ссылок на социальные сети, которые будут отображаться в
        профиле канала.
      </span>
    </div>
  );
};
