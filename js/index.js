var storage = window.localStorage;
var voltar ='';
var paginaAtual ='';


function valores(){
	$('#interacaoConsole').append(
		$('#interacaoQualifica form').serialize()
	)
	.append(' . ')
	.append(window.location.href)
	;
}

function botaoVoltar() {pp(voltar);}

function pp(n){
//	$(this).removeClass('updated');

	if(paginaAtual==n){return false;}

	if(paginaAtual.length>0){
		$('#'+paginaAtual)
		.css({
			//left:(paginaAtual=='config' || paginaAtual=='prog')?'-110%':'110%'
			left:(Math.floor((Math.random() * 10)+1)>5?'':'-')+'110%'
		});
		voltar=paginaAtual;
	}

	if(n=='home'){
		document.removeEventListener('backbutton', botaoVoltar);
		$('#logoEnegep').fadeOut();
	}else{
		$('#logoEnegep').fadeIn();
		document.addEventListener('backbutton', botaoVoltar);
		$('#'+n)
		.css({
			left:"0"
		});
	}
		paginaAtual=n;

	$('#console').html(voltar+' '+paginaAtual);


}

function pegaHora(){
	var d=new Date();
	var ret=Math.round(d.getTime()/1000);
	return ret;
}

function DiaDaSemana(data){
	var d = new Date();
	var days = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
	d.setFullYear(
	data.replace(/^(\d{4})(\d{2})(\d{2})/g,"\$1"),
	data.replace(/^(\d{4})(\d{2})(\d{2})/g,"\$2")-1,
	data.replace(/^(\d{4})(\d{2})(\d{2})/g,"\$3")
	);
	return days[d.getDay()];
}


function inicializa(){

	if (!storage['atividade']){
//		storage.setItem('updates',"{'atividade':0,'ocorrencias':0,'local':0}");
		$('#AtualizaJsonMsg').show();
		atualizaJson('atividade');
	}else{
		$('#AtualizaJsonMsg').hide();
	}

	if (!storage['favoritos']){
		storage.setItem('favoritos','{}');
	}else{
		favoritos = $.map(
			$.parseJSON(storage.getItem('favoritos')),
			function(el) { return el }
		);
	}

	if (!storage['qualificacao']){
		storage.setItem('qualificacao','{}');
	}else{
		qualifications = $.map(
			$.parseJSON(storage.getItem('qualificacao')),
			function(el) { return el }
		);
	}

/*
	atualizaJsons();
*/

	$('#abertura').fadeIn(1500);
	atualizaViews();

	//var checktimer=setInterval(function(){atualizaJson('ocorrencias'); }, 600000);
	//var posicao=setInterval(function(){var p=$('#dia20161004').offset();$('#pos').html( p.top );}, 100);
}

function calculaCor(corHex)
{
	if(!corHex) return '000';
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = corHex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(result){
		color= {
        R: parseInt(result[1], 16),
        G: parseInt(result[2], 16),
        B: parseInt(result[3], 16)
		}
    var luma= 1 - ( 0.299 * color.R + 0.587 * color.G + 0.114 * color.B)/255;
    }
    return luma > 0.5 ? 'fff' : '000';
}


var app = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady: function() {
		app.receivedEvent('deviceready');
	},
	receivedEvent: function(id) {
//		$('#abertura').append(2);
		inicializa();
	}
};

app.initialize();
