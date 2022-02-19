/* *** SWITCH THEME *** */
((d) => {
  const $background = d.querySelector("body"),
    $switch = d.querySelector(".switch");

  $switch.addEventListener("click", (e) => {
    $background.classList.toggle("dark");
  });
})(document);

/* *** TIMER *** */
((d) => {
  // Selector para la etiqueta p del temporizador
  const $minutesSelector = document.querySelector("#minutes"),
    $secondsSelector = document.querySelector("#seconds"),
    // Boton aceptar del menu modal custom
    $aceptButton = document.querySelector("#acept-timer"),
    // Toman los valores de los inputs en la seccion modal-custom
    $pomodoroTime = document.querySelector("#pomodoro-time"),
    $shortTime = document.querySelector("#short-time"),
    $longTime = document.querySelector("#long-time"),
    // Modifican el temporizador con los valores tomados de la seccion custom (-time)
    $pomodoroButton = document.querySelector("#pomodoro"),
    $shortButton = document.querySelector("#break-short"),
    $longButton = document.querySelector("#break-long"),
    // Controlan el temporizador (iniciar, pausar, parar/reiniciar)
    $play = document.querySelector("#play"),
    $pause = document.querySelector("#pause"),
    $stop = document.querySelector("#stop");
  // Sonido de alarma que suena al finalizar el tiempo
  let alarmSong = new Audio("assets/alarm.mp3");

  function timerStop() {
    $play.classList.remove("none");
    $pause.classList.add("none");
    clearInterval(timer);
    $secondsSelector.innerText = "00";
    d.title = "Pomodoro Timer";
  }

  $pomodoroButton.addEventListener("click", (e) => {
    $minutesSelector.innerText = $pomodoroTime.value;
    $minutesSelector.setAttribute("value", "1");
    timerStop();
  });
  $shortButton.addEventListener("click", (e) => {
    $minutesSelector.innerText = $shortTime.value;
    $minutesSelector.setAttribute("value", "2");
    timerStop();
  });
  $longButton.addEventListener("click", (e) => {
    $minutesSelector.innerText = $longTime.value;
    $minutesSelector.setAttribute("value", "3");
    timerStop();
  });

  // Cargar los valores del menu custom
  $aceptButton.addEventListener("click", (e) => {
    if ($minutesSelector.getAttribute("value") == "1") {
      $minutesSelector.innerText = $pomodoroTime.value;
      timerStop();
    } else if ($minutesSelector.getAttribute("value") == "2") {
      $minutesSelector.innerText = $shortTime.value;
      timerStop();
    } else if ($minutesSelector.getAttribute("value") == "3") {
      $minutesSelector.innerText = $longTime.value;
      timerStop();
    }
  });

  $play.addEventListener("click", (e) => {
    let minutes = $minutesSelector.textContent;
    let seconds = $secondsSelector.textContent;

    $play.classList.add("none");
    $pause.classList.remove("none");

    timer = setInterval(() => {
      seconds--;

      if (minutes > 0 && seconds < 0) {
        seconds = 59;
        minutes--;
      } else if (minutes == 0 && seconds == 0) {
        alarmSong.play();
        timerStop();
      }
      
      if (seconds < 10) {
        $minutesSelector.innerText = minutes;
        $secondsSelector.innerText = "0" + seconds;
        d.title = minutes + ":0" + seconds;
      } else {
        $minutesSelector.innerText = minutes;
        $secondsSelector.innerText = seconds;
        d.title = minutes + ":" + seconds;
      }
    }, 1000);
  });

  $pause.addEventListener("click", (e) => {
    $play.classList.remove("none");
    $pause.classList.add("none");
    clearInterval(timer);
  });

  $stop.addEventListener("click", (e) => {
    timerStop();
    $minutesSelector.innerText = $pomodoroTime.value;
  });

})(document);


/*** ADD TASK *** */
((d) => {
  const $addTask = d.querySelector("#acept-task"),
    $contentTask = d.querySelector("#cont-task"),
    $taskContainer = d.querySelector("#to-do-container");

  $addTask.addEventListener("click", (e) => {
    if ($contentTask.value != 0) {
      let a = d.createElement("A");
      let div = d.createElement("DIV");
      let button = d.createElement("BUTTON");

      button.classList.add("task-button");
      button.innerHTML = `<svg width="32" height="32" viewBox="0 0 25 22" xmlns="http://www.w3.org/2000/svg"> <path d="M16.7364 6.59845L12.4934 10.8404L8.2514 6.59845L6.8374 8.01245L11.0794 12.2544L6.8374 16.4964L8.2514 17.9104L12.4934 13.6684L16.7364 17.9104L18.1504 16.4964L13.9084 12.2544L18.1504 8.01245L16.7364 6.59845Z"/> </svg>`;

      button.addEventListener("click", (e) => {
        const item = e.target.parentElement,
        $modalDelete = d.querySelector("#delete"),
        $yesDelete = d.querySelector("#delete-yes"),
        $noDelete = d.querySelector("#delete-not");

        $modalDelete.classList.add("display");

        $yesDelete.addEventListener("click", () => {
          $taskContainer.removeChild(item.parentElement.parentElement);
          $modalDelete.classList.remove("display");
        });

        $noDelete.addEventListener("click", () => $modalDelete.classList.remove("display"));
      });

      div.classList.add("task-add-details");
      div.innerHTML = `<p>${$contentTask.value[0].toUpperCase() + $contentTask.value.slice(1)}</p>`;
      div.appendChild(button);

      a.appendChild(div);
      a.setAttribute("id", `task`);
      a.classList.add("box-shadow-1", "task");

      $taskContainer.appendChild(a);
      $contentTask.value = "";
    }
  });
})(document);
