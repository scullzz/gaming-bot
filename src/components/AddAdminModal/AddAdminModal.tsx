import "./AddAdminModal.scss";
import { DefaultModalProps, ModalWindow } from "../ModalWindow/ModalWinodw";

import { useState } from "react";
import { components, OptionProps, SingleValueProps } from "react-select";
import { UserView } from "../UserView/UserView";
import AsyncSelect from "react-select/async";
import { useGetTgUsersMutation } from "../../features/api";
interface IAddAdminModalProps extends Omit<DefaultModalProps, "children"> {
  onSubmit: () => void;
  setValue: (v: string) => void;
  value: string;
}

interface OptionType {
  username?: string | null;
  firstName: string;
  value: string;
  imageUrl?: string | null;
}

const CustomSingleValue: React.FC<SingleValueProps<OptionType>> = (props) => {
  return (
    <components.SingleValue {...props}>
      <div style={{ padding: "10px 0px", paddingTop: "0px" }}>
        <UserView
          id={props.data.value}
          name={props.data.firstName}
          withLine={false}
          img={props.data.imageUrl}
          detailsText={`@${props.data.username || "#"}`}
        ></UserView>
      </div>
    </components.SingleValue>
  );
};
const CustomOption: React.FC<OptionProps<OptionType>> = (props) => {
  return (
    <components.Option {...props}>
      <UserView
        id={props.data.value}
        name={props.data.firstName}
        img={props.data.imageUrl}
        detailsText={`@${props.data.username || "#"}`}
      ></UserView>
    </components.Option>
  );
};
export const AddAdminModal = ({
  setValue,
  onSubmit,
  ...rest
}: IAddAdminModalProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const handleChange = (option: OptionType | null) => {
    setSelectedOption(option);
    setValue(option.value);
  };
  const [getUsers, result] = useGetTgUsersMutation();
  const onLoad = (query?: string) => {
    return getUsers(query)
      .unwrap()
      .then((users) =>
        users?.map((u) => ({
          username: u.username,
          value: u.tgId,
          firstName: u.firstName,
          imageUrl: u.imageUrl,
        }))
      );
  };
  return (
    <ModalWindow {...rest}>
      <div className="add-admin">
        <AsyncSelect
          components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
          value={selectedOption}
          placeholder="Введите имя пользователя"
          onChange={handleChange}
          loadOptions={onLoad}
          isLoading={result.isLoading}
        ></AsyncSelect>
        <button className="attention-btn" onClick={onSubmit}>
          Добавить
        </button>
      </div>
    </ModalWindow>
  );
};
