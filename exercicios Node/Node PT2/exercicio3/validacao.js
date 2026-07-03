function validarNome(nome){
    if (nome.lenght > 25){
        console.log("Nome muito grande!");
    }else{
        console.log("Nome valido");
    }
}
function validarIdade(idade){
    if (idade > 50){
        console.log("idoso!");
    }else{
        console.log("Caba Novo"); 
    }
}
module.exports = {
    validarIdade,
    validarNome
}