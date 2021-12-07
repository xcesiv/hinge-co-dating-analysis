export default function hideInput() {
  const fileSelect = document.getElementById("file-select");
  const helpText = document.getElementById("help-text");
  removeElements([fileSelect, helpText]);
}
