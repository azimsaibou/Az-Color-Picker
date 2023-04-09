let button = document.querySelector(".picker button")
let couleurs = JSON.parse(localStorage.getItem("titre")) || [];
let ul = document.querySelector("ul");
let clear = document.querySelector(".annexe span")

function afficherCouleurs(){
	let couleursEnregistrer = JSON.parse(localStorage.getItem("titre"))
	let chaine = couleursEnregistrer.map(function(element){
		element = `
			<li>
				<span class="carre" style="background-color: ${element}"></span>
				<span class="code" data-couleur = "${element}">${element}</span>
			</li>`;
		return element
	}).join("")

	ul.innerHTML = chaine;

	document.querySelectorAll("ul li").forEach(function(li){
		li.addEventListener("click", function(e){
			navigator.clipboard.writeText(e.currentTarget.lastElementChild.innerText)
			let v = e.currentTarget.lastElementChild
			v.innerText = "COPIE"

			setTimeout(()=>{
				v.innerText = v.dataset.couleur;
			}, 1000);
		})
	})

}


function pick(e){

	setTimeout(
	async ()=>{
		try {
			const eyeDropper = new EyeDropper();
			let promesse = await eyeDropper.open();
			if(!couleurs.includes(promesse.sRGBHex)){
				couleurs.push(promesse.sRGBHex)
				localStorage.setItem("titre", JSON.stringify(couleurs));
			}			
			afficherCouleurs()
		} catch(e) {	
			console.log("Il y'a erreur : " + e);
		}
	}, 1000)

}


function copierCouleur(e){
	let couleurClicke = e.currentTarget.lastChild.innerText;

	navigator.clipboard.writeText = couleurClicke;
}

function toutEffacer(){
	couleurs.length = 0;
	localStorage.setItem("titre", "[]");
	afficherCouleurs();
}

afficherCouleurs()
button.addEventListener("click", pick);
clear.addEventListener("click", toutEffacer)