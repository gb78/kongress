function atualizaInformacoes(){
	var vals = $.parseJSON(storage.getItem('informacoes'));
	
	$('#informacoes >div.conteudo').html('');

	$.each( vals, function(i1,o1) {
		$('#informacoes >div.conteudo').append(
			"<div class='infoBloco full' onclick=mostraInformacao("+o1.id+")>"
			+o1.nome
			+"<br>"
			+(o1.mostra>0?o1.conteudo:'')
			+"</div>"
			+"<div class='full height1'></div>"
		);
	});

}

function mostraInformacao(id){
	var vals = $.parseJSON(storage.getItem('informacoes'));
	
	$('#informacoesDetalhes').html('');

	$.each( vals, function(i1,o1) {
		if( o1.id==id ){
			$('#informacoesDetalhes').append(''
		+"<div class='pad10 atividadesHeader full' style='background:#555;color:#fff;'>"
		+"<i onclick=pp('informacoes') class='fa fa-2x fa-arrow-left left'></i> "
		+"<div class='center tac' style='max-width:70%;'>Informações</div>"
		+"<div class='full height1' ></div>"
		+"</div>"

		+"<div class='full pad10'>"
		+"<h3>"+o1.nome+"</h3>"
		+o1.conteudo
		+"</div>"
			);
		}
	
	});
	pp('informacoesDetalhes');

}

