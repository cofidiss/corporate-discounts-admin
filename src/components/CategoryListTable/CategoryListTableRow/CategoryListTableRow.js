function CategoryListTableRow(props) {
  const baseUrl = props.baseUrl;
  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;

  const categoryFromDb = props.categoryFromDb;

  return (
    <tr>
      <td>{categoryFromDb.categoryName}</td>
      <td>{categoryFromDb.parentCategoryName}</td>
      <td>
        <button>Güncelle</button>
      </td>
      <td>
        <button>Sil</button>
      </td>
    </tr>
  );
}

export default CategoryListTableRow;
