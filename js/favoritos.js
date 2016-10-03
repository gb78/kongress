var favoritos = [];

function favoritosToggle(e){
	var id=$(e).attr('rel');
	var res=$.inArray(id,favoritos);
	if(res>=0){

		favoritos.pop(res);

		$('#atv'+id).removeClass('fav');
		$(e).addClass('fa-star-o').removeClass('fa-star');
		$('.atvHorario')
			.removeClass('hasFav')
			.has('.fav')
				.addClass('hasFav')
		;

	}else{

		favoritos.push(id);
		$(e).addClass('fa-star').removeClass('fa-star-o');

		$('#atv'+id).addClass('fav')
			.parent().addClass('hasFav')
			.parent().addClass('hasFav');

	}

	storage.setItem('favoritos',JSON.stringify(favoritos));
	atualizaFavoritos();
}

function abreFavoritos(){
	atualizaFavoritos();
	pp('favoritos');
}

function atualizaFavoritos(){
	var e=$('#favoritos');
	e.html("<h3>&nbsp;Favoritos</h3>");
	$(".progDia").has('.fav').clone().appendTo("#favoritos");
	e.find('.atvHorario:not(.hasFav)~hr').remove();
	e.find('.atvHorario:not(.hasFav)').remove();
	e.find('.atvItem2:not(.fav)').remove();
	e.find('.progControl').remove();
	e.find(':hidden').show();
	e.append(
		e.has('.fav').length 
		?""
		:"<div class=pad10>"
		+"Adicione suas atividades favoritas! No topo das páginas de detalhes de cada atividade, "
		+"basta tocar no ícone da estrela para adicionar ou remover:"
		+"<br>"
		+"<br>"
		+"<div class='full pad10' style='background:#fea'>"
		+"<i class='left fa fa-2x fa-arrow-left'></i>"
		+"<i class='right fa fa-2x fa-star-o' onclick=$(this).toggleClass('fa-star').toggleClass('fa-star-o')></i>"
		+"<div class='center tac' >Exemplo <br>(toque nessa estrela)</div>"
		+"<div class='full height1' ></div>"
		+"</div>"

		+"<br><i class='fa fa-star-o'></i> = não está nos favoritos"
		+"<br><i class='fa fa-star'></i> = adicionado aos favoritos"
		+"</div>"
	);
}
