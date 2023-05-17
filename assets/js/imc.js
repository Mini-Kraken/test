//quando o botão de submit do formulario "calc" for pressionado execute um alert com a mensagem "teste"
document.getElementById("calc").addEventListener("submit", function (e) {
    e.preventDefault();




    var calc_result = calc();
    imc = calc_result[0];
    classificacao = calc_result[1];
    //modifique o texto do item de id resultClasifica para teste
    document.getElementById("resultClasifica").innerHTML = classificacao;
    document.getElementById("resultIMC").innerHTML = `seu IMC é ${imc}`;
    $("#result").modal("show");
});


//função que calcula o IMC
function calc() {
    var idade = document.getElementById("idade").value;
    var peso = document.getElementById("peso").value;1
    var altura = document.getElementById("altura").value;

    //existe dois labels chamados sex1 e sex2 
    //se o sex1 estiver checado o genero é masculino
    //se o sex2 estiver checado o genero é feminino
    var sex1 = document.getElementById("sex1")
    if (sex1.checked) {
        var genero = "feminino";
    } else {
        var genero = "masculino"
    }
    //deixe altura em função de metros
    altura = altura / 100;
    //calcule o IMC e Classifique-o baseado em genero use os dados da Organização Mundial da saude para classificar
    //altura estrá em centrimentros e peso em kilogramas
    var imc = peso / (altura * altura);
    var classificacao = "";
    if (genero == "masculino") {
        if (imc < 20.7) {
            classificacao = "Abaixo do peso";
        } else if (imc < 26.4) {
            classificacao = "Peso normal";
        } else if (imc < 27.8) {
            classificacao = "Sobrepeso";
        } else if (imc < 31.1) {
            classificacao = "Obesidade grau 1";
        } else {
            classificacao = "Obesiade grau 2";
        }
    } else { 
        if (imc < 19.1) {
            classificacao = "Abaixo do peso";
        } else if (imc < 25.8) {
            classificacao = "Peso normal";
        } else if (imc < 27.3) {
            classificacao = "Sobre peso";
        } else if (imc < 32.3) {
            classificacao = "Obesidade grau 1";
        } else {
            classificacao = "Obesidade grau 2";
        }
    }

    //calcular valor nutricional

    var vpeso = 0;
    var valtura = 0;
    var vidade = 0;
    var vresultado = 0;
    var vnenhuma = 0;   
    var vmoderada = 0;      
    var vintensa = 0;
    var idade = document.getElementById("idade").value;
    var peso = document.getElementById("peso").value;1
    var altura = document.getElementById("altura").value;
    vpeso = parseFloat(peso);
    valtura = parseFloat(altura);
    vidade = parseFloat(idade);



    if (genero == 'masculino'){
        vresultado = parseFloat(66 + (13.7 * vpeso) + (5 * valtura) - (6.8 * vidade));
        document.getElementById("result_1").innerHTML = vresultado.toFixed(2);
        var total = vresultado + (vresultado * 0.25);
        vnenhuma = parseFloat(total); 
        document.getElementById("result_2").innerHTML = vnenhuma.toFixed(2);
        
        total = vresultado + (vresultado * 0.35);
        vmoderada = parseFloat(total); 
        document.getElementById("result_3").innerHTML = vmoderada.toFixed(2);
        total = vresultado + (vresultado * 0.45);
        vintensa = parseFloat(total); 
        document.getElementById("result_4").innerHTML = vintensa.toFixed(2);        
     }else{
        vresultado = parseFloat(655 + (9.6 * vpeso) + (1.7 * valtura) - (4.7 * vidade));
        document.getElementById("result_1").innerHTML = vresultado.toFixed(2);
        var total = vresultado + (vresultado * 0.20);
        vnenhuma = parseFloat(total); 
        document.getElementById("result_2").innerHTML = vnenhuma.toFixed(2);   
        
           total = vresultado + (vresultado * 0.30);
        vmoderada = parseFloat(total); 
        document.getElementById("result_3").innerHTML = vmoderada.toFixed(2);
        
        total = vresultado + (vresultado * 0.40);
        vintensa = parseFloat(total); 
        document.getElementById("result_4").innerHTML = vintensa.toFixed(2);             
     } 

    return [imc.toFixed(2), classificacao]
}