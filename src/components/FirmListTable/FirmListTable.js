
import FirmAddForm from "../FirmAddForm/FirmAddForm";
import FirmListTableRow from "./FirmListTableRow/FirmListTableRow";

function FirmListTable(props) {
  const baseUrl = props.baseUrl;
  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;
    const firmListFromDb = props.firmListFromDb;
    console.log(firmListFromDb);
    debugger;
const onAdd = e =>{


  const modalContent = (
    <FirmAddForm
      setMyModal={setMyModal}
      setPreloaderShown={setPreloaderShown}
      baseUrl={baseUrl} 

    />
  );
  setMyModal({isOpen:true,content:modalContent});


}

  return (
    <div>
      <h1>firma listesi</h1>
      <table>
        <thead><tr>
            <th>Firma Adı</th>
            <th>Firma kontak</th>          
            <th>Güncelle </th>
            <th>Sil</th>
            </tr></thead>
        <tbody>

          {firmListFromDb.map(x => {return (<FirmListTableRow firmFromDb={x}  setMyModal={setMyModal}
        setPreloaderShown={setPreloaderShown}
        baseUrl={baseUrl} />)})}
        </tbody>
      </table>
      <button onClick={onAdd}>Ekle</button>
    </div>
  );
}
export default FirmListTable;