$('#calcular').click(function(e) {
    e.preventDefault();
    if(verifyInputs()){
        $('#loading').show();
        $('#result_values_div').hide();
        $('#resultClasifica').text(ImcClasify());
        $('#resultIMC').text('IMC: ' + getIMC());
        $('#resultValue').text(getGET() + ' Kcal');
        $('#loading').hide();
        $('#result_values_div').show();
        $('#result').modal('show');
    }
});


function verifyInputs(){
    //caso algum campo esteja vazio ou com um valor indevido, retorne um alerta
    if(getIdade() == '' || getIdade() < 0 || getIdade() > 120){
        alert('Idade invalida');
        return false;
    }
    if(getAltura() == '' || getAltura() < 0){
        alert('Altura invalida');
        return false;
    }
    if(getPeso() == '' || getPeso() < 0){
        alert('Peso invalido');
        return false;
    }
    return true;
}


function clearInputs() {
    $('#idade').val('');
    $('#altura').val('');
    $('#peso').val('');
}

function getIMC() {
    var peso = getPeso();
    var altura = getAltura() / 100;
    var imc = peso / (altura * altura);
    return imc.toFixed(5);
}

function getATV() {
    var Atv = $('input[name="get"]:checked').val();
    return Atv;
}

function getData() {
    console.log(
        'Altura: ' + getAltura() + '\n' +
        'Peso: ' + getPeso() + '\n' +
        'Idade: ' + getIdade() + '\n' +
        'Genero: ' + getGender() + '\n' +
        'Nivel de Atividade: ' + getATV() + '\n' +
        'IMC: ' + getIMC() + '\n' +
        'AF: ' + getAF()
    );
}

function getAF() {
    var genero = getGender();
    var imc = getIMC();
    var nivelAtv = getATV();
    var afValues = {
        '1': { 'masculino': 1.0, 'feminino': 1.0 },
        '2': { 'masculino': imc < 25 ? 1.11 : 1.12, 'feminino': 1.12 },
        '3': { 'masculino': imc < 25 ? 1.25 : 1.29, 'feminino': 1.27 },
        '4': { 'masculino': imc < 25 ? 1.48 : 1.44, 'feminino': 1.45 }
    };
    return afValues[nivelAtv][genero];
}

function ImcClasify() {
    var imc = getIMC();
    var genero = getGender();
    var imcClassify = {
        'masculino': {
            'Abaixo do peso (muito grave)': imc < 16,
            'Abaixo do peso (grave)': imc >= 16 && imc < 16.99,
            'Abaixo peso': imc >= 17 && imc < 18.49,
            'Peso normal': imc >= 18.5 && imc < 24.99,
            'Sobrepeso': imc >= 25 && imc < 29.99,
            'Obesidade grau I': imc >= 30 && imc < 34.99,
            'Obesidade grau II': imc >= 35 && imc < 39.99,
            'Obesidade grau III': imc >= 40
        },
        'feminino': {
            'Abaixo peso muito grave': imc < 16,
            'Abaixo peso grave': imc >= 16 && imc < 16.99,
            'Abaixo peso': imc >= 17 && imc < 18.49,
            'Peso normal': imc >= 18.5 && imc < 24.99,
            'Sobrepeso': imc >= 25 && imc < 29.99,
            'Obesidade grau I': imc >= 30 && imc < 34.99,
            'Obesidade grau II': imc >= 35 && imc < 39.99,
            'Obesidade grau III': imc >= 40
        }
    };

    var classify = imcClassify[genero];
    for (var key in classify) {
        if (classify[key]) {
            return key;
        }
    }
}

function getAltura() {
    return $('#altura').val();
}

function getEstaturaMetros() {
    return getAltura() / 100;
}

function getIdade() {
    return $('#idade').val();
}

function getPeso() {
    return $('#peso').val();
}

function getGender() {
    var genero = $('#sex1').is(':checked') ? 'feminino' : 'masculino';
    return genero;
}

function getBaseValue() {
    var genero = getGender();
    var imc = getIMC();
    var baseValues = {
        'masculino': imc < 25 ? 662 : 1086,
        'feminino': imc < 25 ? 354 : 448
    };
    return baseValues[genero];
}

function getSubtractBaseValue() {
    var genero = getGender();
    var imc = getIMC();
    var subtractBaseValues = {
        'masculino': imc < 25 ? 9.53 : 10.1,
        'feminino': imc < 25 ? 6.91 : 7.95
    };
    return subtractBaseValues[genero];
}

function getMathValue1() {
    var genero = getGender();
    var imc = getIMC();
    var mathValues1 = {
        'masculino': imc < 25 ? 15.91 : 13.7,
        'feminino': imc < 25 ? 9.36 : 11.4
    };
    return mathValues1[genero];
}

function getMathValue2() {
    var genero = getGender();
    var imc = getIMC();
    var mathValues2 = {
        'masculino': imc < 25 ? 539.5 : 416,
        'feminino': imc < 25 ? 726 : 619
    };
    return mathValues2[genero];
}

function getGET() {
    var get = getBaseValue() - (getSubtractBaseValue() * getIdade()) + (getAF() * (getMathValue1() * getPeso() + getMathValue2() * getEstaturaMetros()));
    return get.toFixed(2);
}

