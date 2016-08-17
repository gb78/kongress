
var storage = window.localStorage;
var voltar ='';
var paginaAtual ='';

function botaoVoltar() {pp(voltar);}

function atualizaJson(){
	var ret;
	$('#config .console').html('Atualizando JSON...');
	$.ajax({
		url: 'http://n3p0.net/kongress/site/indexJson',
		error: function(){
			$('#config .console').html('erro');
			ret=false;
		},
		success: function(data){
			storage.setItem('json', data);
			$('#config .console').append('concluido <br><textarea>'+data+'</textarea>');
			$('#AtualizaJsonMsg').hide();
			atualizaViews();
			ret=true;
		},
		timeout: 10000
	});
	return ret;
}

function zeraJson(){
	storage.removeItem('json');
	$('#AtualizaJsonMsg').show();
	$('#config .console').html('json is no more, gone with the wind, ceased to exist');
}

function checaJson(){
	var e=$('#config .console');
	e.html('Checking...');
	if (!storage["json"]) {
		e.append('json !ok | ');
	}
	if (storage["json"]==undefined) {
		$('#config .console').append('json unindefined |');
	}
	if (storage["json"]==null) {
		$('#config .console').append('json unull<hr> |');
	}

	if("json" in storage){
		$('#config .console').append('json in |');
	}else{
		$('#config .console').append('json !in |');
	}

}

function inicializa(){
	if (!storage['json']){
		$('#AtualizaJsonMsg').show();
		atualizaJson();
	}
	else{
		$('#AtualizaJsonMsg').hide();
		atualizaViews();
	}

	$('#abertura').fadeIn(1500);
	var checktimer=setInterval(function(){ 
		
		$('#thumbs').fadeToggle(); 

var options={icon: 'img/icon.png', body: 'Saída'};

  if ('Notification' in window) {
    Notification.requestPermission();

    if ('showNotification' in ServiceWorkerRegistration.prototype) {
      console.log('Notification SW');
      navigator.serviceWorker.ready.then(function(registration){
        registration.showNotification('title', options);
      });
    } else {
      console.log('Notification classic');
      new Notification('title', options);
    }
  }




}, 10000);
}

function atualizaViews(){
	$('#prog').html("<table id=dataGrid></table>");
	$('.atividades').remove();

	var vals = $.parseJSON(storage.getItem('json'));

	$.each( vals.atividades, function(i1,item1) {

	if(item1.idA<=0){

	$('#content').append("<div id="+i1+" class='pagina atividades pad10'>"
		+"<button onclick=pp('prog')><i class='fa fa-calendar'></i>Voltar</button>"
		+item1.nome+"<br>"
		+item1.dia.replace(/^(\d{4})(\d{2})(\d{2})/g,"\$3\/\$2")
		+", de "
		+item1.horaInicio.replace(/^(\d{2})(\d{2})/g,"\$1h\$2")
		+" a "
		+item1.horaTermino.replace(/^(\d{2})(\d{2})/g,"\$1h\$2")
		+"<br>Local: "
		+item1.local
		+"<p>"+item1.descricao+"</p>"

	+"</div>");

	if($('#dia'+item1.dia).length<=0)
		$('#dataGrid')
		.append("<tr><th colspan=2 id='dia"+item1.dia+"'>"
		+item1.dia.replace(/^(\d{4})(\d{2})(\d{2})/g,"\$3\/\$2")
		+"</td></tr>");

	if($('#atv'+item1.dia+item1.horaInicio+item1.horaTermino).length<=0)
		$('#dataGrid')
		.append("<tr><td>"
		+item1.horaInicio.replace(/^(\d{2})(\d{2})/g,"\$1h\$2")
		+"<p>"
		+item1.horaTermino.replace(/^(\d{2})(\d{2})/g,"\$1h\$2")
		+"</p></td><td id=atv"+item1.dia+item1.horaInicio+item1.horaTermino+"></td></tr>"
		);

	$('#atv'+item1.dia+item1.horaInicio+item1.horaTermino).append(
	"<div class='atvItem left' onclick=pp('"+i1+"')>"
	+item1.nome
	+"<i>"
	+item1.local
	+"</i>"
	+"<div class=idT style='background:#"+item1.idTcor+"'></div>"
	+"</div>"
	);
}//ida


	});

}

function pp(n){
	if(paginaAtual==n){return false;}

	if(paginaAtual.length>0){
		$('#'+paginaAtual).stop().animate({
			left:(paginaAtual=='config' || paginaAtual=='prog')?'-110%':'110%'
		},1000);
		voltar=paginaAtual;
	}

	if(n=='home'){
		document.removeEventListener('backbutton', botaoVoltar);
		$('#logoEnegep').fadeOut();
	}else{
		$('#logoEnegep').fadeIn();
		document.addEventListener('backbutton', botaoVoltar);
		$('#'+n).stop().animate({left:"0%"},500);
	}
		paginaAtual=n;

	$('#console').html(voltar+' '+paginaAtual);
}

function pegaHora(e){
	var d=new Date();
	$(e).html(Math.round(d.getTime()/1000));
}

$(function(){
	
	inicializa();

});
