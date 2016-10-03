var qualifications=[];

function verificaNomeEmail(){
	var perfil=$.parseJSON(storage.getItem('perfil'));
	if(perfil.nome.length>1 && perfil.email.length>8){return true;}
	else{
		
	$('#interacaoQualifica').html(""
	+"<div class=pad10>"
	+"Nome:<input class=full type=text name=nome id=Unome>"
	+"<div>&nbsp;</div>"
	+"E-mail:"
	+"<input class=full type=text name=email id=Uemail>"
	+"<div>&nbsp;</div>"
	+"<button class=right onclick=salvaPerfil()>Enviar</button>"
	+"</div>");
	pp('interacaoQualifica');
	return false;
	}
}

function salvaPerfil(){
	storage.setItem('perfil',JSON.stringify({
		'nome':$('#Unome').val(),
		'email':$('#Uemail').val()
	}));
	pp('voltar');
}

function atualizaQualificaAtividade(id){
	if(verificaNomeEmail())
	$('#interacaoQualifica').scrollTop(0).html('').load('html/interacao_qualifica_atividade.html',
	function(){
		$('#interacaoQualifica form input[name=ida]').val(id);
		$('.stars').barrating({theme: 'fontawesome-stars'});
		pp('interacaoQualifica');
	});
}


function atualizaQualificaEvento(){
	if(verificaNomeEmail())
	$('#interacaoQualifica').scrollTop(0).html('').load('html/interacao_qualifica_evento.html',
	function(){
		$('.stars').barrating({theme: 'bars-reversed'});
		pp('interacaoQualifica');
	});
}


function qualificaAtividade(){
	var q={};
	q.ide = $('#ide','#qualificaAtividadeForm').val();
	q.ida = $('#ida','#qualificaAtividadeForm').val();
	q.geral = $("#selGeral option:selected","#qualificaAtividadeForm").val();
	q.relevancia = $('#selRelevancia  option:selected',"#qualificaAtividadeForm").val();
	q.rever = $('#selRever option:selected','#qualificaAtividadeForm').val();
	q.opiniao = $('#opiniao','#qualificaAtividadeForm').val();
	
	$('#interacaoConsole').html( JSON.stringify(q) );
	salvaQualificacao(q);
}



function qualificaEvento(){
	var q={};
	q.ide = $('#qeIDE').val();
	q.soube = $('#qeComoSoube').val();
	q.prim = $("input[name=primeiro]:checked","#qualificaEventoForm").val();
	q.geral = $('#selGeral option:selected',"#qualificaEventoForm").val();
	q.cientifica = $('#selCientifica option:selected').val();
	q.social = $('#selSocial option:selected').val();
	
	$('#interacaoConsole').html( JSON.stringify(q) );
	salvaQualificacao(q);
}


function salvaQualificacao(q){
	q.enviado=0;
	qualifications.push(q);
	storage.setItem('qualificacao',JSON.stringify(qualifications));
	enviaQualificacao(q);
}

function enviaQualificacao(q){
	content=q;
	u=$.parseJSON(storage.getItem('perfil'));
	content.nome=u.nome;
	content.email=u.email;

	$.ajax({
		type:'POST',
		//dataType: 'JSON',
		crossDomain: true,
		url: baseUrl[0]+"/POST/QUALIF/",
		data: {'content':JSON.stringify(content)},
		error: function(e){
			alert('e '+ JSON.stringify(e));
			return false;
		},
		success: function(data){
			alert('Obrigado pela sua participação!');
			return true;
		},
		timeout: 28000
	});
}
