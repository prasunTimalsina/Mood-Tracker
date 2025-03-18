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
const searchInputEl = document.querySelector(".search-input-box");
const searchBtn = document.querySelector(".btn-search");
///Calendar elements
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");
/////variable/////
const state = {
  moods: [
    /* {
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
    }, */
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
// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth(),
  currDate = date.getDate();

/////functions/////

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
  console.log(state.moods);
  console.log(date);
  const mood = getMood(date);

  //guard clause
  if (!mood) {
    alert("Invalid date or your haven't fill the data for the chosen date😗");
    return;
  }
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
/* displayData("2025-03-12"); */

//display input
const displayInputs = () => {
  DisplaydataContainerEl.style.display = "none";
  inputContainerEl.style.display = "flex";
};

////calender related functions
//handle click event in calendar elements
const handleClickOnDate = (target) => {
  console.log(target);
  const dateEl = target;
  const date = dateEl.dataset.date;
  displayData(date);
};
//rendering calender
const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";

    liTag += `<li class="${isToday} date-ele " data-date = "${currYear}-${
      Number(currMonth) + 1 > 9
        ? `${date.getMonth() + 1}`
        : `0${date.getMonth() + 1}`
    }-${i}">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[Number(currMonth)]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
  //selecting all date elements
  const dateElements = document.querySelectorAll(".date-ele");
  //adding events to date
  dateElements.forEach((dateEl) => {
    dateEl.addEventListener("click", () => {
      handleClickOnDate(dateEl);
    });
  });
};
renderCalendar();

////helper functions
//date formater to store
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate());
  /* const day = String(date.getDate()).padStart(2, "0"); */

  return `${year}-${month}-${day}`;
}
const init = () => {
  //loading data from local storage
  const parsedData = JSON.parse(localStorage.getItem("moods"));
  if (parsedData) {
    state.moods = parsedData;
  }
  const currentDate = formatDate(new Date());
  if (getMood(currentDate)) {
    displayData(currentDate);
  } else {
    displayInputs();
  }
};
init();
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
  state.moods.push({ date: formatedDate, mood: selectedMood, note });
  //persist data
  localStorage.setItem("moods", JSON.stringify(state.moods));
  //clearing inputs
  selectedMoodBoxEl.textContent = "";
  noteInputEl.value = "";

  //show data
  displayData(formatedDate);
});

//event to next and prev in calendar
prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});

//event on search btn
searchBtn.addEventListener("click", () => {
  const date = searchInputEl.value;
  const mood = getMood(date);
  if (!mood) {
    alert("Invalid Date or the data for the date may be not filled.");
    searchInputEl.value = "";
    return;
  }
  displayData(date);
  searchInputEl.value = "";
});
