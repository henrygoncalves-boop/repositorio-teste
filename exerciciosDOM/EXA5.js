const btnLista = document.querySelector('#Lista');
console.log(btnLista);
let btnItem = document.createElement("li");
btnItem.textContent = "CSS";
console.log(btnItem);
btnLista.appendChild(btnItem);

const btnItem2 = document.createElement("li");
btnItem2.textContent = "JavaScript";
btnLista.appendChild(btnItem2);

const btnItem3 = document.createElement("li");
btnItem3.textContent = "HTML";
btnLista.appendChild(btnItem3);

const btnItem4 = document.createElement("li");
btnItem4.textContent = "C#";
btnLista.appendChild(btnItem4);


