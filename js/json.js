var areas=[
'atividade',
'ocorrencias',
'informacoes'
];
//'palestrantes',

var baseUrl=[
	"http://kongress-env.us-west-2.elasticbeanstalk.com/api",
	"http://facilgrafica.com.br/api",
	"http://n3p0.net/kongress/site/indexJson",
	"https://hostx.hostseguro.com/~nepopo/_n3p0/kongress/json/",
	"https://hostx.hostseguro.com/~nepopo/_n3p0/kongress/json/atividade.json",
	"http://n3p0.net/kongress/json/atividade.json"
];

function atualizaJsons(){
	var e=$('#atualizaJsonsConsole');
	e.html('');
	$.each(areas,function(i,o){
		e.append("<div class='"+o+" pad10 full'>"+o+" ... </div>");
		atualizaJson(o);
	});
}

function atualizaJson(id){
	var ret;
	$('#config .console').html('Atualizando JSON...');
	$('.'+id+'Updater').addClass('fa-spin');
	$.ajax({
		type:'GET',
		dataType: 'JSON',
		crossDomain: true,
		url: baseUrl[0]+"/GET/JSON/"+id+".json?"+pegaHora(),
		error: function(e){
			$('#config .console').html('erro <textarea rows=10>'+ JSON.stringify(e)+'</textarea>');
			$('#atualizaJsonsConsole .'+id).append('erro');
			$('.'+id+'Updater').removeClass('fa-spin').addClass('JSONerror');
			return false;
		},
		success: function(data){
			var leJson=JSON.stringify(data);
			storage.setItem(id, leJson);
			$('#config .console').append('concluido <br><textarea>'+leJson+'</textarea>');
			$('#AtualizaJsonMsg').hide();
			atualizaView(id);
			$('#atualizaJsonsConsole .'+id).append('ok');
			$('.'+id+'Updater').removeClass('fa-spin').addClass('JSONok');
			return true;
		},
		timeout: 28000
	});
}


function atualizaViews(){
	$.each(areas,function(i,o){
		atualizaView(o);
	});
}

function atualizaView(id){
	switch(id){
		case 'atividade': atualizaAtividades();break;
		case 'ocorrencias':atualizaOcorrencias();break;
		case 'informacoes':atualizaInformacoes();break;
		case 'palestrantes':atualizaPalestrantes();break;
	}
}

function atualizaOcorrencias(){
	var e=$('#ocorrencias div.conteudo');

	var vals = $.parseJSON(storage.getItem('ocorrencias'));
	$.each(vals,function(i,o) {
		e.append("<div style='background:#aaa' class=pad5>"+i+"</div><div class=pad5>"+o+"</div>");
	});
}

function atualizaAtividades(){
	var eProg="programacao";
	$('#prog').html("<div id="+eProg+" class=rel></div>");
	$('#'+eProg).append("<div class=progControl><div onclick=atualizaJson('atividade')><i class='atividadeUpdater fa fa-refresh'></i></div></div>");
	$('.atividades').remove();

	var vals = $.parseJSON(storage.getItem('atividade'));
	$.each(vals.atividades, function(i1,item1) {

	if(item1.idA<=0){

	var isFav=$.inArray(item1.id,favoritos)>=0?true:false;

	//Elemento do dia (título)
	if($('#dia'+item1.dia).length<=0){
		$('#'+eProg).append(
		"<div id='dia"+item1.dia+"' class='progDia full'><h3>"
		+item1.dia.replace(/^(\d{4})(\d{2})(\d{2})/g,"\$3\/\$2")
		+", "+DiaDaSemana(item1.dia)
		+"</h3></div>"
		);

		$('.progControl')
		.append("<div onclick=mostraDia(this) rel="+item1.dia+">"
		+item1.dia.replace(/^(\d{4})(\d{2})(\d{2})/g,"\$3")
		+"</div>");
	}

	//Elemento grupo de horários
	if($('#atv'+item1.dia+item1.horaInicio+item1.horaTermino).length<=0)
		$('#dia'+item1.dia)
		.append(
		"<div id=atv"+item1.dia+item1.horaInicio+item1.horaTermino+" class='atvHorario full'>"
		+"<h4>&nbsp;"
		+item1.horaInicio.replace(/^(\d{2})(\d{2})/g,"\$1h\$2")
		+" ~ "
		+item1.horaTermino.replace(/^(\d{2})(\d{2})/g,"\$1h\$2")
		+"</h4>"
		+"</div>"
		);

	//Itens do calendário
	$('#atv'+item1.dia+item1.horaInicio+item1.horaTermino).append(
	"<div id=atv"+item1.id+" class='atvItem2 full' rel="+item1.id+" onclick=atualizaAtividade('"+item1.id+"')>"
	+"<div class='idTL' style='background:#"+item1.idTcor+"'></div>"
	+"<b>"+item1.nome +"</b>"
	+"<i>"+item1.local+"</i>"
//	+"<div class='idT hidden' style='background:#"+item1.idTcor+"'></div>"
	+"</div>"
	);
	if(isFav)
		$('#atv'+item1.id)
			.addClass('fav')
			.parent().addClass('hasFav')
			.parent().addClass('hasFav')
		;
	
}//ida

	});
	$('.progControl').clone().appendTo('#'+eProg);
}


function atualizaAtividade(id){
	var vals = $.parseJSON(storage.getItem('atividade'));
	var result = $.grep(
		vals.atividades,
		function(e){ return e.id == id;}
	);
	var item1=result[0];

	var isFav=($('#atv'+id).hasClass('fav')?true:false);
	var isSub=(item1.idA>0?true:false);
	var addSub=isSub?'Sub':'';

	//Página da atividade
	$('#atividade'+addSub).scrollTop(0).html(""
		+"<div class='pad10 atividadesHeader full' style='background:#"
		+item1.idTcor+";color:#"+calculaCor(item1.idTcor)+";'>"
		+"<i onclick=pp('"+(isSub?'atividade':paginaAtual)+"') class='fa fa-2x fa-arrow-left left'></i> "

		+(isSub
		?''
		:"<i class='fa fa-2x fa-star"+(isFav?"":"-o")+" right' onclick=favoritosToggle(this) rel="+item1.id+"></i>"
		)

		+"<div class='center tac' style='max-width:70%;'>"+(item1.idTnome?item1.idTnome:'')+"</div>"
		+"<div class='full height1' ></div>"
		+"</div>"

		+"<div class='pad10' >"
	+"<p><b>"+item1.nome+"</b></p>"
		+item1.dia.replace(/^(\d{4})(\d{2})(\d{2})/g,"\$3\/\$2")
		+", de "
		+item1.horaInicio.replace(/^(\d{2})(\d{2})/g,"\$1h\$2")
		+" a "
		+item1.horaTermino.replace(/^(\d{2})(\d{2})/g,"\$1h\$2")
		+"<br>"
		+"Local: "
		+item1.local
		+"<p>"+item1.descricao+"</p>"
		+"<p class='btAvaliaAtividade right "+(pegaHora()>=item1.horaAvalia?'':'hidden')+"' onclick=atualizaQualificaAtividade("+item1.id+")>Avaliar atividade</p>"
		+(isSub
		?"<div class='full'>&nbsp;</div>"
		+"<i class='fa fa-2x fa-arrow-left left' onclick=pp('"+(isSub?'atividade':paginaAtual)+"') ></i> "
		+"<i class='right fa fa-arrow-up  fa-2x' onclick=$('#atividadeSub').scrollTop(0)></i>"
		+"<div class='full'>&nbsp;</div>"
		:''
		)

		+"</div>"
	);
	pp('atividade'+addSub);
}


function mostraDia(el){
	var leDia=$(el).attr('rel');
	$('#prog').scrollTop(0);
	if(leDia>0){
		$('.progDia').hide();
		$('#dia'+leDia).show();
	}else{
		$('.progDia').show();
	}
}
