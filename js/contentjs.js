console.log("Inicia o Programa");
var key = "AIzaSyBcdBYRJIOLAjeOQd5_87nuG9iqwRzkIhQ";
var dadosAuxOtimizado = 0;
var dadosAuxNaoOtimizado = 0;
var site = '';	
	function pegarDados(url){
		console.log("Entrando na função pegaDados");
		var url = document.getElementById('url').value;
		do{
			console.log("Iniciou um do/while");
			var verificaUrl = url.search("http");
				if ( verificaUrl == '0'){
					console.log("entrou no if");
					var loading = "Aguarde o Resultado da análise...";
					document.getElementById('resultadoHeader').innerHTML = loading;
					$.getJSON("https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=" + url + "&locale=pt_BR&screenshot=true&key="+ key, 
						function(data){
						var loading = "Aguarde o Resultado da análise...";
						console.log("Entrou na função JSON");
						document.getElementById('resultadoHeader').innerHTML = data.error;
						document.getElementById('resultadoHeader').style.display = "none";
						site = data.id;
						document.getElementById('urlM').innerHTML = "Url: "+ site;
						document.getElementById('responseCode').innerHTML = "Código de Resposta: "+data.responseCode;
						document.getElementById('title').innerHTML = "Título da Página: "+ data.title;
						dadosAuxOtimizado = data.ruleGroups.SPEED.score;
						document.getElementById('ruleGroupsSPEED').innerHTML = "Nível de Otimização: "+ dadosAuxOtimizado + "/100";
						dadosAuxNaoOtimizado = 100-data.ruleGroups.SPEED.score;
						document.getElementById('notOptimized').innerHTML = "Nível não otimizado: "+ dadosAuxNaoOtimizado + "/100";
					})
				}else{
					console.log("Entrou no else para modificar a url");
					url = "http://"+url;
			}
		}while(verificaUrl == '-1');
	}
						console.log('Utilizando o Google Chart Tools');
						google.load('visualization', '1', {'packages' : ['corechart']});
						google.setOnLoadCallback(desenhaGrafico);
						function desenhaGrafico(){ 	
							var dados = new google.visualization.DataTable();
							dados.addColumn('string', 'Otimizado');
							dados.addColumn('number', 'Valor');

							dados.addRows(2);

							dados.setValue(0,0,'Nivel de otimização do ' + site);
							dados.setValue(0,1,dadosAuxOtimizado);

							dados.setValue(1,0,'Nivel de não otimização ' + site);
							dados.setValue(1,1, dadosAuxNaoOtimizado);

							var div = document.getElementById('chart_div');

							var grafico = new google.visualization.PieChart(div);
							grafico.draw(dados, {width: "100%", height: "400", title: "Resultado das otimizações"});
						}

	
