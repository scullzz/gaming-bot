import { useLocation } from "react-router-dom";
import { Prize } from "../Prize/Prize";
import { Preview } from "../Preview/Preview";

export const RafflePreview = () => {
  const location = useLocation();
  const { prize } = location.state;
  return (
    <Preview header="Предпросмотр розыгрыша">
      <Prize {...prize}></Prize>
    </Preview>
  );
};
