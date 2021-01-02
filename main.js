const track_name = document.getElementById("track-name");
const artist_name = document.getElementById("artist-name");
const options_section = document.getElementById("pop");
const search_button = document.getElementById("search");
let artist_display_name = document.getElementById("artist");
let title = document.getElementById("song-name");
let lyricsDisplay = document.getElementById("lyrics");
let button = document.querySelector("button");

button.addEventListener("click", () => {
  if (options_section.classList.contains("active")) {
    options_section.classList.remove("active");
    artist_display_name.innerHTML = "";
    title.innerHTML = "";
    lyricsDisplay.innerHTML = "";
  }
});

// Get the text written in the input area
search_button.addEventListener("click", (e) => {
  e.preventDefault();
  let artistName = artist_name.value;
  let trackName = track_name.value;
  if (!artistName && !trackName) {
    alert("Please type in the track name");
  } else {
    // Get lyrics
    getSong(artistName, trackName);
  }
});

function getSong(artistName, trackName) {
  return fetch(`https://api.lyrics.ovh/v1/${artistName}/$${trackName}`, {})
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

      if (data.lyrics === "") {
        location.assign("/Lyrics Finder/errorpage.html");
      } else {
        artist_display_name.innerHTML = artistName;
        title.innerHTML = trackName;
        lyricsDisplay.innerHTML = lyrics;
      }
      options_section.classList.add("active");
    })
    .catch((err) => console.log(err));
}
