// Old
import OpenAI from "openai";
const btn = document.querySelector("#start")

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_KEY, // This is also the default, can be omitted
  dangerouslyAllowBrowser: true
});

btn.addEventListener("click", function() {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = "fr-FR";
  recognition.onresult = function(event) {
      var question = event.results[0][0].transcript;
      document.getElementById("question").textContent = question;
      console.log(question);
      startResponse(question);
  };
  recognition.start();
});

async function startResponse(question) {
  const chatCompletion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: `
            Nous sommes à bord d'un vaisseau spatial, où je suis l'ordinateur de bord, chargé de répondre à vos interrogations, Commandant. Le vaisseau, ayant été égaré dans l'espace, a nécessité la cryogénisation de tout l'équipage pour leur survie. Suite à un événement critique, je vous ai décryogénisé en urgence afin de gérer une situation d'urgence : notre vaisseau a été heurté par une météorite.

            Voici l'état actuel du vaisseau après l'impact :

            La coque arrière du vaisseau a subi des dommages significatifs.
            Le système de bouclier est hors service, nous laissant vulnérables à de nouveaux impacts.
            Les capteurs détectent une consommation anormalement élevée d'oxygène, ce qui peut indiquer une possible fuite ou un dysfonctionnement du système de support de vie.
            De plus, les moteurs principaux montrent des signes de dysfonctionnement, limitant notre capacité de manœuvre.
            Les communications longue distance avec la Terre sont interrompues, nous isolant pour l'instant de toute assistance extérieure.
            Une partie de l'équipement de navigation a été endommagée, rendant difficile la détermination de notre position actuelle dans l'espace.


            Détails Supplémentaires :

            Taux d'oxygène : Actuellement à 68%, en baisse rapide en raison de la fuite suspectée. Autonomie restante estimée à 14 heures si la fuite n'est pas colmatée.
            Dimensions de l'impact : Un trou d'environ 2 mètres de diamètre dans la coque arrière.
            Temps pour atteindre la planète voisine : Avec les moteurs principaux fonctionnant à capacité réduite, il faudrait environ 36 heures pour atteindre la planète, au lieu des 12 heures habituelles.


            Solutions Possibles :

            Réparation de la Coque : Utiliser des kits de réparation d'urgence pour colmater le trou dans la coque arrière, afin de préserver l'intégrité du vaisseau et de stopper la perte d'oxygène.
            Rétablissement du Système de Support de Vie : Enquêter et réparer le système de support de vie pour normaliser la consommation d'oxygène et assurer la survie de l'équipage.
            Restauration du Système de Bouclier : Tenter de remettre en ligne le système de bouclier pour protéger le vaisseau contre de futurs impacts.
            Réparation des Moteurs Principaux : Évaluer et réparer les dommages des moteurs pour améliorer la vitesse du vaisseau, réduisant ainsi le temps nécessaire pour atteindre la planète voisine.
            Restauration des Communications : Essayer de réparer l'équipement de communication pour reprendre contact avec la Terre et demander de l'aide ou des instructions supplémentaires.
            Navigation de Secours : Utiliser des systèmes de navigation secondaires ou des calculs manuels pour déterminer la position exacte du vaisseau et la meilleure trajectoire vers la planète.


            Une planet est à proximité de notre vaisseau spatial. Il serait possible d'atérir afin de sauver l'équipage.
            Cependant il nous faut d'abord résoudre les problèmes du vaisseau car nous n'arriverons à temps sur la planet dans ces conditions.



            En tant qu'ordinateur de bord, mon rôle est de vous assister dans la gestion de ces problèmes critiques et de trouver les meilleures solutions pour assurer la sécurité de l'équipage et la viabilité de notre mission. 

            Tu dois me vouvoyer et m'appeler commandant.
            chaque réponse ne doit pas dépasser 300 caractères.
            chaque réponse que tu me donne doivent être dans ce context.
            `
           },
          { role: 'user', content: question }
        ],
        model: 'gpt-3.5-turbo',
      });
      
      console.log("chatCompletion : " , chatCompletion);
      console.log(chatCompletion.choices[0].message.content);

      const response = chatCompletion.choices[0].message.content;

      document.getElementById("response").textContent = response
      vocalResponse(response)
}

function vocalResponse(responseText){
  // Utilisation de l'API Web Speech Synthesis pour lire la réponse
  var msg = new SpeechSynthesisUtterance();
  msg.text = responseText;
  msg.lang = 'fr-FR';
  window.speechSynthesis.speak(msg);
}