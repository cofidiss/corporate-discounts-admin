import CategoryUpdateForm from "../../CategoryUpdateForm/CategoryUpdateForm";

function CategoryListTableRow(props) {
  const setDiscountCategoryLov = props.setDiscountCategoryLov;
  const getDiscountCategoryLov = props.getDiscountCategoryLov;

  const   setIsInitRun=props.setIsInitRun;
  const baseUrl = props.baseUrl;
  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;
  const categoryFromDb = props.categoryFromDb;
  const categoryLov = props.categoryLov;
  debugger;
  const onUpdate = (e) => {
    const modalContent = (
      <CategoryUpdateForm
      getDiscountCategoryLov = {getDiscountCategoryLov} 
        setDiscountCategoryLov={setDiscountCategoryLov}
      setIsInitRun={setIsInitRun}
        setMyModal={setMyModal}
        setPreloaderShown={setPreloaderShown}
        baseUrl={baseUrl} categoryFromDb={categoryFromDb}
        categoryLov={categoryLov}
      />
    );
    setMyModal({isOpen:true,content:modalContent});


  };
const onDelete = e => {
  const deletePromise =    fetch(`${baseUrl}/DeleteCategory`, {
    method: 'POST', // or 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(categoryFromDb.id)
      })
    .then((response) => {
if (!response.ok){
return response.text().then(x =>  Promise.reject(x));

}
return response.text(); });

deletePromise.then(x =>{        

const modalContent = (<span>{x}</span>);

setMyModal({isOpen:true,content:modalContent});
    
}).catch(x=>{
    debugger;
    const modalContent = (<span>{x}</span>);
    setMyModal({isOpen:true,content:modalContent});
}).then(() => {return getDiscountCategoryLov();},() => {return getDiscountCategoryLov();}).
then(x=>setDiscountCategoryLov(x)).catch(x=> {
  const modalContent = (<span>{"Categorylovsi çekilemedi"}</span>);
  
  setMyModal({isOpen:true,content:modalContent});}).finally( () => setPreloaderShown(false));   


}
  return (
    <tr>
      <td>{categoryFromDb.categoryName}</td>
      <td>{categoryFromDb.parentCategoryName}</td>
      <td>
        <button onClick={onUpdate}>Güncelle</button>
      </td>
      <td>
        <button onClick={onDelete}>Sil</button>
      </td>
    </tr>
  );
}

export default CategoryListTableRow;
