export const NotAvailable = ({
  available,
  text,
}: {
  available: boolean;
  text: string;
}) => {
  return (
    <>
      {!available && (
        <span className="details-text" style={{ textAlign: "center" }}>
          {text}
        </span>
      )}
    </>
  );
};
