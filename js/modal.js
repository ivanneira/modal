//Documentación
/*
Se llama con un objeto options que puede tener lo siguiente

var options = {
	title: titulo a mostrar, por defecto es "Edición"
	columndefs: es la variable que se usa para definir las columnas para datatable
	doOnClose: una función que se ejecuta al cerrar el modal


}


*/

var createModal = function(options){


	var modalHtml = '<div id="dynModal" class="modal fade" > </div>';

	//creación del esqueleto del modal
	$("body").append(modalHtml);

	var title = typeof(options.title)!= 'undefined' ? options.title : "Edición";

	//se agrega titulo y otras yerbas
	$("#dynModal").append('<div id="modalDialog" class="modal-dialog modal-md"></div>');
	$("#modalDialog").append('<div id="modalMessageContent" class="modal-content"></div>');
	$("#modalMessageContent").append('<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 id="modalMensajestitulo" class="modal-title">' + title + '</h4></div>');

	if(typeof(options.columns) == 'object'){
		
		console.dir(options.columns)

		appendItems(options.columns);
	}else{
		console.log("hubo un problema al cargar la configuración de la columna ¿Está columndefs definido?");
	}

	$("#dynModal")
			  .modal("show")
			  .on('hidden.bs.modal', function (e) {

					if(typeof(options) != 'undefined' && typeof(options.doOnClose)=='function'){

						onCloseModal(options.doOnClose);
					}

					onCloseModal();
				});
	}

//creación del contenido del modal según columndefs de datatables
var appendItems = function(columns){

	
		for(var index in columns){
			
				if(typeof(columns[index].editable) != 'undefined' && columns[index].editable === true){
					console.log("uno editable")

					appendEditableItems(columns[index]);

				}
			
		}
		

	
}

//agrego los items editables
var appendEditableItems = function(item){
	
	console.dir(item)

	if(typeof(item.type) != 'undefined'){

		if(typeof(item.type) != 'undefined'){
			
				switch(item.type){

					case 'string':

						var htmlToAppend = '<div class="form-group"><label>'+ item.title +'</label><input type="text" class="form-control" id="'+ item.title +'"></input></div>';

						break;



				}
			
			
			$("#modalMessageContent").append(htmlToAppend);
		}else{
			console.error("El ítem no tiene un 'data' o un 'title' definido");
		}

	}else{
		console.error("No hay un ítem que agregar");
	}
}

//

//evento al cerrar el modal, se destruye al finalizar
var onCloseModal = function(doOnClose){


	if(typeof(doOnClose)=='function'){

		doOnClose();
	}

	$("#dynModal").remove();
}
