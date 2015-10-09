console.log("Inicia o Programa");
var key = "AIzaSyBcdBYRJIOLAjeOQd5_87nuG9iqwRzkIhQ";
var dadosAuxOtimizado = 0;
var dadosAuxNaoOtimizado = 0;
var site = '';	
var htmlResponseBytesFormatted;
var cssResponseBytesFormatted;
var imageResponseBytesFormatted;
var javascriptResponseBytesFormatted;
var numberJsResources, numberCssResources, numberStaticResources;

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
						
						
						numberResources = data.pageStats.numberResources;
						numberHosts = data.pageStats.numberHosts;
						totalRequestBytes = data.pageStats.totalRequestBytes;
						numberStaticResources = data.pageStats.numberStaticResources;
						htmlResponseBytes = data.pageStats.htmlResponseBytes/1000;
						htmlResponseBytesFormatted = htmlResponseBytes.toFixed(2);
						cssResponseBytes = data.pageStats.cssResponseBytes/1000;
						cssResponseBytesFormatted = cssResponseBytes.toFixed(2);
						imageResponseBytes = data.pageStats.imageResponseBytes/1000;
						imageResponseBytesFormatted = imageResponseBytes.toFixed(2);
						javascriptResponseBytes = data.pageStats.javascriptResponseBytes/1000;
						javascriptResponseBytesFormatted = javascriptResponseBytes.toFixed(2);
						otherResponseBytes = data.pageStats.otherResponseBytes;
						numberJsResources = data.pageStats.numberJsResources;
						numberCssResources = data.pageStats.numberCssResources;
						
						desenhaGrafico();
						desenhaGraficoBarras(); 
						desenhaGraficoPizzaTotal();
						
						dataImage = data.screenshot.data;
						dataImageFormatted = dataImage.split("_").join("/");
						img = "<img src=\" data:" + data.screenshot.mime_type + ";base64," + dataImageFormatted + "\" >"
						
						document.getElementById('img').innerHTML = img;
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
						google.setOnLoadCallback(desenhaGraficoBarras);
						function desenhaGraficoBarras(){
							var data = new google.visualization.DataTable();
							
							data.addColumn('string','Otimizações gerais');
							data.addColumn('number', 'kB');
							
							data.addRows(4);
							//htmlResponseBytes
							data.setValue(0, 0, 'Tamanho HTML');
							data.setValue(0, 1, htmlResponseBytesFormatted);
							//cssResponseBytes
							data.setValue(1, 0, 'Tamanho CSS');
							data.setValue(1, 1, cssResponseBytesFormatted);
							//javascriptResponseBytes
							data.setValue(2, 0, 'Tamanho JS');
							data.setValue(2, 1, javascriptResponseBytesFormatted);
							//imageResponseBytes
							data.setValue(3, 0, 'Tamanho Imagens');
							data.setValue(3, 1, imageResponseBytesFormatted);
							
							var chart = new google.visualization.ColumnChart(document.getElementById('meu_grafico'));
							 chart.draw(data, {
								width: 600, height: 240, title: 'Tamanho dos arquivos.'});
							
						}
						google.setOnLoadCallback(desenhaGraficoPizzaTotal);
						function desenhaGraficoPizzaTotal(){ 	
							var dados = new google.visualization.DataTable();
							dados.addColumn('string', 'Solicitações');
							dados.addColumn('number', 'Valor');

							dados.addRows(3);

							dados.setValue(0,0,'JS');
							dados.setValue(0,1,numberJsResources);

							dados.setValue(1,0,'CSS');
							dados.setValue(1,1, numberCssResources);
							
							dados.setValue(2,0,'Estatico');
							dados.setValue(2,1, numberStaticResources);

							var div = document.getElementById('pie_chart_total');

							var grafico = new google.visualization.PieChart(div);
							grafico.draw(dados, {width: "100%", height: "400", title: "Resultado das requisições"});
						}

	
