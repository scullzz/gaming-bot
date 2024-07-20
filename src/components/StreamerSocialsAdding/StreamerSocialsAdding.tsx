import { useState } from "react";
import {
  useAddSocialMutation,
  useGetAvailableSocialsQuery,
} from "../../features/api";
import { useQueryError } from "../../functions/useQueryError";
import { Details } from "../Details/Details";
import "./StreamerSocialsAdding.scss";
import Select from "react-select";
import { handleError } from "../../functions/handleError";
interface IStreamerSocialsAddingProps {
  id: string;
}
interface OptionType {
  value: string;
  label: string;
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
  const options: OptionType[] =
    availableSocials?.map((t) => ({ value: t, label: t })) || [];
  const [link, setLink] = useState<string | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const handleChange = (option: OptionType | null) => {
    setSelectedOption(option);
  };
  const [
    addSocial,
    { isLoading: addingSocial, error: addSocialError, reset: resetSocialError },
  ] = useAddSocialMutation();
  const addSocialErrorText = handleError(addSocialError);
  const onAdd = () => {
    addSocial({ link: link || "", name: selectedOption?.value || "", id });
  };
  return (
    <div className="streamer-socials-adding">
      <Details
        isLoading={(!availableSocials && socialsAdding) || addingSocial}
        error={socialsErrorText || addSocialErrorText}
        onClose={() => {
          setSeT(undefined);
          resetSocialError();
        }}
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
            onChange={handleChange}
            styles={customStyles}
          ></Select>
          <div
            className="line"
            style={{ width: "calc(100% - 20px)", marginLeft: "20px" }}
          ></div>
          <input
            type="text"
            className="input"
            placeholder="URL ссылки"
            value={link}
            onChange={(e) => setLink(e.currentTarget.value)}
          />
        </div>
        <div
          className="btn attention-btn streamer-socials-adding__form-btn"
          onClick={onAdd}
        >
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
