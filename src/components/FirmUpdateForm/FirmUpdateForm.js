import React, { useState } from "react";

function FirmUpdateForm(props) {
  const firmFromDb = props.firmFromDb;
  const baseUrl = props.baseUrl;
  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;
  const [formState, setForm] = useState({
    id: firmFromDb.id,
    firmName: firmFromDb.name,
    firmContact: firmFromDb.contactInfo,
  });
  const onFormChange = (e) => {
    debugger;
    if (e.target.getAttribute("name") === "firmName") {
      setForm((prevState) => {
        return { ...prevState, firmName: e.target.value };
      });
    }
    if (e.target.getAttribute("name") === "firmContact") {
      setForm((prevState) => {
        return { ...prevState, firmContact: e.target.value };
      });
    }
  };

  const onUpdate = (e) => {
    setPreloaderShown(true);
    const updateFirmPromise = fetch(`${baseUrl}/UpdateFirm`, {
      method: "POST", // or 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    }).then((response) => {
      if (!response.ok) {
        return response.text().then((x) => Promise.reject(x));
      }
      return response.text();
    });
    updateFirmPromise
      .then((x) => {
        setMyModal({ isOpen: true, content: x });
      })
      .catch((x) => setMyModal({ isOpen: true, content: x }))
      .finally(() => setPreloaderShown(false));
  };

  return (
    <div onChange={onFormChange}>
      <div>
        <label>Firma Adı</label>
        <input type="text" name="firmName" value={formState.firmName} />
      </div>

      <div>
        <label>Firma Kontak</label>
        <input type="text" name="firmContact" value={formState.firmContact} />
      </div>
      <button onClick={onUpdate}>Güncelle</button>
    </div>
  );
}

export default FirmUpdateForm;
