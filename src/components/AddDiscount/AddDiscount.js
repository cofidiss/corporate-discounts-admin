import { useEffect,useState } from "react";
function AddDiscount(props) {



  const baseUrl = props.baseUrl;
  const setPreloaderShown = props.setPreloaderShown;
  const firmLov = props.firmLov;
  const setMyModal = props.setMyModal;
  const discountCategoryLov = props.discountCategoryLov;
  const discountScopeLov = props.discountScopeLov;
  const discountFromDb = props.discountFromDb;

  const [formState, setForm] = useState({
    firmId: firmLov[0].id,
    discountInfo: "",
    discountScopeId: discountScopeLov[0].id,
    discountCategoryId: discountCategoryLov[0].id,
    firmContact:  firmLov[0].ContactInfo
  });

const onAddDiscount = e => {

    setPreloaderShown(true);
    const updateDiscountsPromise =    fetch(`${baseUrl}/AddDiscount`,{
      method: 'POST', // or 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formState)
        })
      .then((response) => {
  if (!response.ok){

 return   response.text().then(x =>Promise.reject(x) );

  
  }
  return response.text(); })
  updateDiscountsPromise.then(x=>{document.getElementById("search-button").click();  setMyModal({isOpen:true,content:x});} ).catch(x=> setMyModal({isOpen:true,content:x})).finally(() => setPreloaderShown(false));




};

  const onFormChange = (e) => {
    if (e.target.getAttribute("name") === "firm.select") {
      let firmContact = "firma kontak bulunamadı";
      let selectedFirmId = parseInt(e.target.value);
      for (let firm of firmLov) {
        if (firm.id === selectedFirmId) {
          firmContact = firm.contactInfo;
        }
      }

      setForm((prevState) => {
        return {
          ...prevState,
          firmId: selectedFirmId,
          firmContact: firmContact,
        };
      });
    }

    if (e.target.getAttribute("name") === "discount.info") {
      setForm((prevState) => {
        return { ...prevState, discountInfo: e.target.value };
      });
    }

    if (e.target.getAttribute("name") === "discountScope.select") {
      let selectedDiscountScopeId = parseInt(e.target.value);
      setForm((prevState) => {
        return { ...prevState, discountScopeId: selectedDiscountScopeId };
      });
    }

    if (e.target.getAttribute("name") === "discountCategory.select") {
      let selectedDiscountCategoryId = parseInt(e.target.value);
      setForm((prevState) => {
        return { ...prevState, discountCategoryId: selectedDiscountCategoryId };
      });
    }
  };

  return (
    <div>
      <div>
        <label>Firma Adı:</label>
        <select
          onChange={onFormChange}
          value={formState.firmId}
          name="firm.select"
        >
          {firmLov.map((e) => (
            <option value={e.id}>{e.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>İndirim Açıklaması:</label>
        <input
          onChange={onFormChange}
          type="text"
          name="discount.info"
          value={formState.discountInfo}
        ></input>
      </div>

      <div>
        <label>İndirim Kapsamı:</label>
        <select
          onChange={onFormChange}
          value={formState.discountScopeId}
          name="discountScope.select"
        >
          {discountScopeLov.map((e) => (
            <option value={e.id}>{e.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>İndirim Kategorisi:</label>
        <select
          onChange={onFormChange}
          value={formState.discountCategoryId}
          name="discountCategory.select"
        >
          {discountCategoryLov.map((x) => {
            return (
              <option className={"level-" + x.levelNo} value={x.id}>
                {x.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label>Firma Kontak:</label>
        <span>{formState.firmContact}</span>
      </div>
      <button onClick={onAddDiscount}>Ekle</button>
    </div>
  );
}

export default AddDiscount;
