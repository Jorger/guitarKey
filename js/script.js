$(function()
{
    var canvas = $('#canvas');
    var context = canvas[0].getContext('2d');
    var numCuerdas = 26;
    var radius = 13;
    var puntuacion = 0;
    var contador = 0;
    var esferasMuestra = [];

    //Para iniciar el juego...
    $("#start").click(function(event)
	{
		$(this).fadeOut('fast', function()
        {
            //Iniciar...
		});
	});

    //Para crear la esfera, tanto las estáticas como las que se mueven...
    var creaEsfera = function(datos)
    {
        context.beginPath();
        context.arc(datos.x, datos.y, radius, 0, 2 * Math.PI, false);
        context.lineWidth = 1;
        context.fillStyle = datos.color;
        context.strokeStyle = '#525352';
        context.fill();
        context.stroke();
        context.font = "normal 20px Arial";
        context.fillStyle = "white"
        context.fillText(String.fromCharCode(datos.numero + 96).toUpperCase(), (datos.x) - 6.5, datos.y + 6);
    };

    //Para crear las cuerdas...
    var cuerdas = (function cuerdas()
    {
        context.fillStyle = '#F3EFE6';
        context.clearRect(0, 0, 760, 500);
        for(var i = 1; i <= numCuerdas; i++)
        {
            context.beginPath();
            context.moveTo(28 * i, 20);
            context.lineTo(28 * i, 480);
            context.lineWidth = 5;
            context.strokeStyle = "#1A4367"; //"#73EAD9";
            context.stroke();
            creaEsfera({
                            x       : 28 * i,
                            y       : 470,
                            numero  : i,
                            color   : "#525352"
                        });
        }
        return cuerdas;
    })();

    //Para detectar las teclas que se presionan...
    $(document).keypress(function(event)
	{
		if(event.keyCode >= 97 && event.keyCode <= 122)
		{
            //Buscar si la letra existe...
            var letraPresiona = event.keyCode - 96;
            for(var i = 0; i < esferasMuestra.length; i++)
            {
                if(esferasMuestra[i].numero === letraPresiona)
                {
                    //Si existe la letra, revisar si está en el rango correcto para la puntuación...
                    if(esferasMuestra[i].y >= 430 && esferasMuestra[i].y <= 500)
                    {
                        puntuacion++;
                        $("#titulo").html("GUITAR KEY ("+(puntuacion)+")");
                    }
                    esferasMuestra.splice(i, 1);
                    break;
                }
            }
		}
	});

    function randomColor()
	{
    	// from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    	return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
    	(c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
  	};
});
