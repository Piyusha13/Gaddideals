export const updateLanguage = (value) => {
  var selectIndex = 0;
  var a = document.querySelector("#google_translate_element select");
  switch (value) {
    case "en":
      selectIndex = 28;
      //28
      break;
    case "hi":
      selectIndex = 46;
      //46
      break;
  }
  console.log(selectIndex);
  a.selectedIndex = selectIndex;
  // setTimeout(()=>{window.location.reload();},1000);
  a.dispatchEvent(new Event("change"));
  // window.location.reload();
};
