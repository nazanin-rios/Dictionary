const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.querySelector("#result");
const sound = document.querySelector("#sound");
const btn = document.querySelector(".search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.querySelector("#inp-word").value;

  fetch(`${url}${inpWord}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      result.innerHTML = ` <div class="word">
          <h3>${inpWord}</h3>
          <button onclick="playSound()"><i class="fas fa-volume-up"></i></button>
        </div>
        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>${data[0].phonetic}</p>
        </div>
        <p class="word-meaning">
        ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || ""}
        </p>`;

      sound.setAttribute(
        "src",
        data[0].phonetics[0].audio.startsWith("https")
          ? data[0].phonetics[0].audio
          : `https:${data[0].phonetics[0].audio}`
      );
    })
    .catch(() => {
      result.innerHTML = `<h3 class="rej">couldn't find the word</h3>`;
    });
});

function playSound() {
  sound.play();
}
