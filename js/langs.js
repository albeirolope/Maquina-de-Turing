var es = {
    "titulo": "Máquina de Turing",
    "creditos": "Por: César Torres y Faiber Hernández.",
    "expresion": "Expresión a analizar... ",
    "cargar": "Cargar",
    "velocidad": "Velocidad:",
    "lenguaje": "Lenguaje",
    "español": "Español",
    "ingles": "Inglés",
    "portugues": "Portugués",
    "atencion": "Atención:",
    "validarAyB": "Por favor ingrese una cadena sobre a y b.",
    "cadenaProcesada": "La cadena ha sido procesada con éxito."
};

var en = {
    "titulo": "Turing machine",
    "creditos": "By: César Torres and Faiber Hernández.",
    "expresion": "Expression to parse... ",
    "cargar": "Load",
    "velocidad": "Speed:",
    "lenguaje": "Language",
    "español": "Spanish",
    "ingles": "English",
    "portugues": "Portuguese",
    "atencion": "Attention:",
    "validarAyB": "Please enter a string about a and b.",
    "cadenaProcesada": "The string has been processed successfully."
};

var pt = {
    "titulo": "Máquina de Turing",
    "creditos": "Por: César Torres e Faiber Hernández.",
    "expresion": "Expressão para analisar... ",
    "cargar": "Carregar",
    "velocidad": "Velocidade:",
    "lenguaje": "Linguagem",
    "español": "Espanhol",
    "ingles": "Inglês",
    "portugues": "Português",
    "atencion": "Atenção:",
    "validarAyB": "Insira uma string sobre a e b.",
    "cadenaProcesada": "A string foi processada com sucesso."
};


$(function () {
    $("#language").change(function (e) { 
        cambiarIdioma($("#language").val())
    });
});

function cambiarIdioma(lang) {
    //cambiando idioma, español = 1, ingles = 2
    let lg
    if(lang == 1){
        lg = es
        $(".titulo").removeClass("en")
        $(".titulo").addClass("es")
    }else if(lang == 2){
        lg = en
        $(".titulo").removeClass("es")
        $(".titulo").addClass("en")
    }else if(lang == 3){
        lg = pt
        $(".titulo").removeClass("en")
        $(".titulo").addClass("es")
    }

    $(".titulo").text(lg.titulo)
    $(".creditos").text(lg.creditos)
    $("#expresion").attr("placeholder", lg.expresion)
    $("#cargar").text(lg.cargar)
    $("#speed").text(lg.velocidad)
    $("#lenguaje").text(lg.lenguaje)
    $("#ES").text(lg.español)
    $("#EN").text(lg.ingles)
    $("#PT").text(lg.portugues)
    atencion = lg.atencion
    txValidarAyB = lg.validarAyB
    cadenaProcess = lg.cadenaProcesada
}
