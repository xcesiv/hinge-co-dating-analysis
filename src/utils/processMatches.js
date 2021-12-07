function processMatches(input) {
  const file = input.files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const textContent = reader.result;
    const matchData = JSON.parse(textContent);
    makeStats(matchData);
  };

  reader.readAsText(file);
}
