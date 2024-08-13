import { Information } from "../Information/Information";

interface IDetailsProps {
  isLoading: boolean;
  error: string | undefined;
  onClose: () => void;
}

export const Details = ({ isLoading, error, onClose }: IDetailsProps) => {
  return (
    <>
      {(isLoading || error) && (
        <Information
          isLoading={isLoading}
          error={error}
          onClose={onClose}
        ></Information>
      )}
    </>
  );
};
