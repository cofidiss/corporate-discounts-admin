import CategoryUpdateForm from "../../CategoryUpdateForm/CategoryUpdateForm";

function CategoryListTableRow(props) {
  const baseUrl = props.baseUrl;
  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;
  const categoryFromDb = props.categoryFromDb;
  const categoryLov = props.categoryLov;
  const onUpdate = (e) => {
    const modalContent = (
      <CategoryUpdateForm
        setMyModal={setMyModal}
        setPreloaderShown={setPreloaderShown}
        baseUrl={baseUrl} categoryFromDb={categoryFromDb}
        categoryLov={categoryLov}
      />
    );
    setMyModal({isOpen:true,content:modalContent});


  };

  return (
    <tr>
      <td>{categoryFromDb.categoryName}</td>
      <td>{categoryFromDb.parentCategoryName}</td>
      <td>
        <button onClick={onUpdate}>Güncelle</button>
      </td>
      <td>
        <button>Sil</button>
      </td>
    </tr>
  );
}

export default CategoryListTableRow;
