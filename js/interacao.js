
function atualizaQualificaAtividade(id){
	$('#interacaoQualifica').scrollTop(0).html('').load('html/interacao_qualifica_atividade.html',
	function(){
		$('#interacaoQualifica form input[name=ida]').val(id);
		$('#interacaoQualifica form input[name=ida]').val(id);
		$('.stars').barrating({theme: 'fontawesome-stars'});
		pp('interacaoQualifica');
	});
}


function atualizaQualificaEvento(){
	$('#interacaoQualifica').scrollTop(0).html('').load('html/interacao_qualifica_evento.html',
	function(){
		$('.stars').barrating({theme: 'bars-reversed'});
		pp('interacaoQualifica');
	});
}

function salvaQualificacao(){
	if(!storage.qualificacao)
		storage.setItem('qualificacao');
	var qualifications=storage.getItem('qualificacao');

	qualifications.push(dados);
	enviaQualificacao();
}

function enviaQualificacao(){
	var qualifications=storage.getItem('qualificacao');
	$.each(qualifications, function(i,o){
		if(o.enviado<=0){
			$.post();
		}
	});
	qualifications.push(dados);
	enviaQualificacao();
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
	
	
}
