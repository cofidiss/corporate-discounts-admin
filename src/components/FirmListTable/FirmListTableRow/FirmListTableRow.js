import FirmUpdateForm from "../../FirmUpdateForm/FirmUpdateForm";

function FirmListTableRow(props) {
  const firmFromDb = props.firmFromDb;
  const baseUrl = props.baseUrl;
  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;
const onDelete = e => {

    const deleteFirmPromise = fetch(`${baseUrl}/DeleteFirm`, {
        method: "POST", // or 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(firmFromDb.id),
      }).then((response) => {
        if (!response.ok) {
          return response.text().then((x) => Promise.reject(x));
        }
        return response.text();
      });
      deleteFirmPromise
      .then((x) => {
        setMyModal({ isOpen: true, content: x });
      })
      .catch((x) => setMyModal({ isOpen: true, content: x }))
      .finally(() => setPreloaderShown(false));

}

  const onUpdate = (e) => {
    const modalContent = (
      <FirmUpdateForm
         setMyModal={setMyModal}
        setPreloaderShown={setPreloaderShown}
        baseUrl={baseUrl}
        firmFromDb={firmFromDb}
      />
    );
    setMyModal({ isOpen: true, content: modalContent });
  };

  return (
    <tr>
      <td>{firmFromDb.name}</td>
      <td>{firmFromDb.contactInfo}</td>
      <td>
        <button onClick={onUpdate}>Güncelle</button>
      </td>
      <td>
        <button  onClick={onDelete}>sil</button>
      </td>
    </tr>
  );
}

export default FirmListTableRow;
