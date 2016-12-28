//Documentación
/*
Se llama con un objeto options que puede tener lo siguiente

var options = {

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

	if(typeof(options.columndefs) == 'object'){

		appendItems(options.columndefs);
	}else{
		console.log("hubo un problema al cargar la configuración de la columna ¿Está columndefs definido?");
		console.error("columndefs:")
		console.dir(options.columndefs);
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
var appendItems = function(columndefs){



	for(var index in columndefs){

		if(typeof(columndefs[index].editable)!= 'undefined' && columndefs[index].editable === true){

			appendEditableItems(columndefs[index]);
		}
	}
}

//agrego los items editables
var appendEditableItems = function(item){

	if(typeof(item.type)!=undefined){

		switch(item.type){

			case 'string':



				break;



		}

	}else{
		//appendEdit();
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
