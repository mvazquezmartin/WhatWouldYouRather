const url = "/api/dilemma";
const opt1Element = document.getElementById("opt1");
const opt2Element = document.getElementById("opt2");
const opt1Percentage = document.getElementById("percentageOp1");
const opt2Percentage = document.getElementById("percentageOp2");

let idOpt;

//FUNCION GETRANDOM DILEMMA
function randomDilemmaFetch() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      opt1Element.textContent = data.opt1;
      opt2Element.textContent = data.opt2;
      idOpt = data._id;
      opt1Element.disabled = false;
      opt2Element.disabled = false;
    })
    .catch((error) => {
      console.log("error request", error);
    });
}

//FUNCION VOTE AND GET PERCENTAGE
function voteFunction() {
  const sendVote = (opt) => {
    fetch(`${url}/${idOpt}/${opt}`, {
      headers: {
        "Countent-Type": "application/json",
      },
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {        
        opt1Percentage.textContent = "%" + data.opt1Percentage;
        opt2Percentage.textContent = "%" + data.opt2Percentage;
        opt1Element.disabled = true;
        opt2Element.disabled = true;
        renderNexButton(data.dilemmaVotes);
      })
      .catch((error) => {
        console.log("error request", error);
      });
    };
    
    opt1Element.addEventListener("click", () => {
      sendVote("opt1");
    });
    opt2Element.addEventListener("click", () => {
      sendVote("opt2");
    });
  }
  
  //FUNCION RENDER BUTTON NEXT
  function renderNexButton(votes) {
    const nextContainer = document.getElementById("nextContainer");
    const nextDilemma = document.getElementById("nextDilemma");    
    
    if (!nextDilemma) {
    const miNodoButton = document.createElement("button");
    miNodoButton.textContent = "NEXT";
    miNodoButton.setAttribute("id", "nextDilemma");
    const miNodoVote = document.createElement("p");
    miNodoVote.setAttribute("id", "totalVotes");
    miNodoVote.textContent = "Total " + votes;
    nextContainer.appendChild(miNodoButton);
    nextContainer.appendChild(miNodoVote);
    miNodoButton.addEventListener("click", () => {
      opt1Percentage.textContent = "";
      opt2Percentage.textContent = "";
      opt1Element.textContent = "";
      opt2Element.textContent = "";      
      nextContainer.removeChild(miNodoButton)
      nextContainer.removeChild(miNodoVote)      
      randomDilemmaFetch();
    });
    nextContainer.appendChild(miNodoButton)
    nextContainer.appendChild(miNodoVote)
  }
}

randomDilemmaFetch();
voteFunction();
