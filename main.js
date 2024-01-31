const btn = document.querySelector("#start");
const dialogBox = document.querySelector('.dialog-box');
btn.addEventListener("click", () => {
  initGame()
});

function vocalQuestionAssistant(responseText){
  return new Promise((resolve) => {
    // Utilisation de l'API Web Speech Synthesis pour lire la réponse
    console.log('start vocalResponse')
    var msg = new SpeechSynthesisUtterance();
    msg.text = responseText;
    msg.lang = 'fr-FR';
    const questionEl = document.createElement('p');
    questionEl.innerHTML = `Question: <span>${responseText}</span>`;
    dialogBox.appendChild(questionEl);

    // Ajout d'un écouteur pour l'événement 'end' qui résoudra la promesse une fois la parole terminée
    msg.onend = function(event) {
      resolve();
    };

    window.speechSynthesis.speak(msg);
  })
}

function vocalResponseRecordUser() {
  // <p>Réponse: <span id="response"></span></p>
  return new Promise((resolve) => {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "fr-FR";
    
    recognition.onresult = function(event) {
      console.log('***record event***')
      var response = event.results[0][0].transcript;
      response.toLowerCase()
      console.log('response ' + response)

      const responseEl = document.createElement('p');
      responseEl.innerHTML = `Response: <span>${response}</span>`;
      dialogBox.appendChild(responseEl);

      resolve(response)
    };
    
    recognition.start();
  })
}

async function initGame(){
  // demander pseudo
  await vocalQuestionAssistant("Veuillez décliner votre idendité");
  // écouter pseudo user
  const response1 = await vocalResponseRecordUser();
  console.log("response 1 : ", response1);
  // confirmation pseudo
  await vocalQuestionAssistant("Souhaitez vous confirmer")
  // écouter confirmation
  const response2 = await vocalResponseRecordUser();
  console.log("response 2 : ", response2);
  if(response2.includes('oui') || response2.includes('ouais') || response2.includes('ouaip')){
    console.log('c\'est tout bon !')
  } else {
    initGame();
  }
  // setTimeout lancement animation du scan et réduis la caméra en bas à gauche
  setTimeout(() => {
    console.log('scan en cours...')
  }, 3000);
}