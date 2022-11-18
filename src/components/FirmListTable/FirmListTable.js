
import FirmAddForm from "../FirmAddForm/FirmAddForm";
import FirmListTableRow from "./FirmListTableRow/FirmListTableRow";
import React, { useState } from "react";
function FirmListTable(props) {
  const baseUrl = props.baseUrl;
  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;
  const [initCompletedState, setInitCompleted] = useState(false);
  const [firmListFromDbState, setFirmListFromDb] = useState([]);
    console.log(firmListFromDbState);
    debugger;

    function Init(){
      setPreloaderShown(true);
      const firmListFromDbPromise = fetch(`${baseUrl}/GetFirms`, {
        method: "POST", // or 'PUT'
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`hata meydana geldi: Status: ${response.status}`);
        }
        return response.json();
      });

      firmListFromDbPromise.then(x=>{setFirmListFromDb(x);setInitCompleted(true);}).finally(()=>setPreloaderShown(false));
  
    }
 if (initCompletedState == false){
  Init();
  
 }

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
    <div> {initCompletedState ? ( <div>
      <h1>firma listesi</h1>
      <table>
        <thead><tr>
            <th>Firma Adı</th>
            <th>Firma kontak</th>          
            <th>Güncelle </th>
            <th>Sil</th>
            </tr></thead>
        <tbody>

          {firmListFromDbState.map(x => {return (<FirmListTableRow firmFromDb={x}  setMyModal={setMyModal}
        setPreloaderShown={setPreloaderShown}
        baseUrl={baseUrl} />)})}
        </tbody>
      </table>
      <button onClick={onAdd}>Ekle</button>
    </div>): null}</div>
   
  );
}
export default FirmListTable;