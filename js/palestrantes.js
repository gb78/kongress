function atualizaPalestrantes(){
	var vals = $.parseJSON(storage.getItem('palestrantes'));

	$('#palestrantes >div.conteudo').html('');

	$.each( vals, function(i1,o1) {
		$('#palestrantes >div.conteudo').append(
			"<div class='infoBloco full' onclick=mostraPalestrante("+o1.id+")>"
			+o1.nome
			+"<br>"
			+(o1.mostra>0?o1.conteudo:'')
			+"</div>"
			+"<div class='full height1'></div>"
		);
	});

}

function mostraPalestrante(id){
	var vals = $.parseJSON(storage.getItem('palestrantes'));
	var result = $.grep(
		vals,
		function(e){ return e.id == id;}
	);
	var item1=result[0];

	$('#palestrantesDetalhes').html('');

	$.each( vals, function(i1,o1) {
		if( o1.id==id ){
			$('#palestrantesDetalhes').append(''
		+"<div class='pad10 atividadesHeader full' style='background:#555;color:#fff;'>"
		+"<i onclick=pp('palestrantes') class='fa fa-2x fa-arrow-left left'></i> "
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
	pp('palestrantesDetalhes');

}

