export const NotAvailable = ({ available }: { available: boolean }) => {
  return (
    <>
      {available && (
        <span className="details-text" style={{ textAlign: "center" }}>
          Пока нет доступных розыгрышей
        </span>
      )}
    </>
  );
};
