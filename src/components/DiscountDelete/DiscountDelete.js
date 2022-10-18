

function DiscountDelete(props) {
  const baseUrl = props.baseUrl;
  const setMyModal = props.setMyModal;
  const setPreloaderShown = props.setPreloaderShown;
  const discountFromDb = props.discountFromDb;


  const deleteDiscount = e => {
    setPreloaderShown(true);
    const deleteDiscountPromise =    fetch(`${baseUrl}/DeleteDiscount`,{
      method: 'POST', // or 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(discountFromDb.id)
        })
      .then((response) => {
  if (!response.ok){

 return   response.text().then(x =>Promise.reject(x) );

  
  }
  return response.text(); })
  deleteDiscountPromise.then(x=>{document.getElementById("search-button").click();  setMyModal({isOpen:true,content:x});} ).catch(x=> setMyModal({isOpen:true,content:x})).finally(() => setPreloaderShown(false));

    
    

  };
  return (
    <div>
      <div>Aşağıdaki bilgileri olan inidirm silinsin mi?</div>
      <div>
        <label>Firma Adı:</label>
        <span>{discountFromDb.firmName}</span>
      </div>

      <div>
        <label>İndirim Açıklaması:</label>
        <span>{discountFromDb.discountDescription}</span>
      </div>

      <div>
        <label>İndirim Kapsamı:</label>
        <span>{discountFromDb.discountScopeName}</span>
      </div>

      <div>
        <label>İndirim Kategorisi:</label>
        <span>{discountFromDb.discountCategoryName}</span>
      </div>
      <div>
        <label>Firma Kontak:</label>
        <span>{discountFromDb.firmContact}</span>
      </div>

      <div>
        <button onClick={deleteDiscount} >Evet</button>
        <button
          onClick={(e) => {
            setMyModal({ isOpen: false, content: null });
          }}
        >
          Hayır
        </button>
      </div>
    </div>
  );
}

export default DiscountDelete;
