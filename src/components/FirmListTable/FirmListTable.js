
import FirmAddForm from "../FirmAddForm/FirmAddForm";
import FirmListTableRow from "./FirmListTableRow/FirmListTableRow";
import React, { useState } from "react";
function FirmListTable(props) {
  const baseUrl = props.baseUrl;
  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;
  const [initTriedState, setInitTried] = useState(false);
  const [initSuccesfullState, setInitSuccesfull] = useState(false);
  const [firmListFromDbState, setFirmListFromDb] = useState([]);
    console.log(firmListFromDbState);
    debugger;

    function Init(){
      setPreloaderShown(true);
      setInitTried(true);
      const firmListFromDbPromise = fetch(`${baseUrl}/GetFirms`, {
        method: "POST", // or 'PUT'
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`hata meydana geldi: Status: ${response.status}`);
        }
        return response.json();
      });

      firmListFromDbPromise.then(x=>{setFirmListFromDb(x);setInitSuccesfull(true);}).catch(x => setInitSuccesfull(false)).finally(()=>setPreloaderShown(false));
  
    }
 if (initTriedState == false){
  Init();
  
 }

const onAdd = e =>{


  const modalContent = (
    <FirmAddForm
    setInitTried={setInitTried}
      setMyModal={setMyModal}
      setPreloaderShown={setPreloaderShown}
      baseUrl={baseUrl} 

    />
  );
  setMyModal({isOpen:true,content:modalContent});


}

  return (
    <div> {initSuccesfullState ? ( <div>
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
        baseUrl={baseUrl} setInitTried={setInitTried}/>)})}
        </tbody>
      </table>
      <button onClick={onAdd}>Ekle</button>
    </div>): null}</div>
   
  );
}
export default FirmListTable;