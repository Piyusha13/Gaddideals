export const updateLanguage = (value) => {
  var selectIndex = 0;
  var a = document.querySelector("#google_translate_element select");
  switch (value) {
    case "en":
      selectIndex = 28;
      break;
    case "hi":
      selectIndex = 46;
      break;
  }
  console.log(selectIndex);
  a.selectedIndex = selectIndex;
  a.dispatchEvent(new Event("change"));
};
