/////elements/////
const moodsEl = document.querySelectorAll(".mood");
const selectedMoodBoxEl = document.querySelector(".selected-mood-box");
const addMoodBtn = document.querySelector(".btn-add");
const noteInputEl = document.querySelector(".note-input");
const DisplaydataContainerEl = document.querySelector(".show-mood-container");
const displayEmojiConEl = document.querySelector(".show-mood-container .emoji");
const displayNoteConEl = document.querySelector(".show-mood-container .note");
const displayDateConEl = document.querySelector(".show-mood-container .date");
const inputContainerEl = document.querySelector(".input-container");
/////variable/////
const state = {
  moods: [
    {
      date: "2025-03-11",
      mood: "😊",
      note: "Feeling great today!",
    },
    {
      date: "2025-03-12",
      mood: "😐",
      note: "Just an average day.",
    },
    {
      date: "2025-03-13",
      mood: "😴",
      note: "Tired but productive.",
    },
    {
      date: "2025-03-14",
      mood: "😢",
      note: "A bit down today.",
    },
    {
      date: "2025-03-15",
      mood: "🤩",
      note: "Excited about the weekend!",
    },
    {
      date: "2025-03-16",
      mood: "😠",
      note: "Frustrating day at work.",
    },
    {
      date: "2025-03-17",
      mood: "😀",
      note: "Back to feeling happy!",
    },
    {
      date: "2025-03-18",
      mood: "😀",
      note: "Back to feeling happy!",
    },
  ],
};
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/////functions/////
//adding mood
const addMood = (mood, note) => {
  const date = Date.now().toLocaleString();
  state.moods.push({ date, mood, note });
  console.log(state.moods);
};
//function to search mood based on date
const getMood = (date) => {
  const index = state.moods.findIndex((mood) => mood.date === date);
  return state.moods[index];
};
//fn to selected mood into selection box
const selectMood = (mood) => {
  selectedMoodBoxEl.textContent = mood;
};
//validating input before adding mood
const validateInputs = () => {
  const selectedMood = selectedMoodBoxEl.textContent;
  const note = noteInputEl.value;
  if (!selectedMood || !note) {
    alert("Selected your mood or may be you forget to write a note.🤗");
    return false;
  }
  return true;
};

const displayData = (date) => {
  //get data based on date
  console.log(date);
  const mood = getMood(date);
  console.log(mood);
  //tooggle input and display
  DisplaydataContainerEl.style.display = "flex";
  inputContainerEl.style.display = "none";

  //fill data
  displayEmojiConEl.textContent = mood.mood;
  displayNoteConEl.textContent = mood.note;
  const day = days[new Date(date).getDay()];
  const month = months[new Date(date).getMonth()];
  const dateNum = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  displayDateConEl.textContent = `${day}, ${month} ${dateNum}, ${year}`;
};
displayData("2025-03-12");
const displayInputs = () => {
  DisplaydataContainerEl.style.display = "none";
  inputContainerEl.style.display = "flex";
};

////helper functions
//date formater to store
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
const init = () => {};
/////events/////
moodsEl.forEach((mood) => {
  mood.addEventListener("click", () => {
    selectMood(mood.textContent);
  });
});

addMoodBtn.addEventListener("click", () => {
  //guard clause for invalid input
  if (!validateInputs()) return;
  const currentDate = new Date();
  const formatedDate = formatDate(currentDate);

  const selectedMood = selectedMoodBoxEl.textContent;
  const note = noteInputEl.value;
  state.moods.push({ formatedDate, selectedMood, note });
  //clearing inputs
  selectedMoodBoxEl.textContent = "";
  noteInputEl.value = "";
});
