var player1 = {};
var player2 = {};

var world_tiles_width = 20;
var world_tiles_height = 20;

var world_width = 128 * world_tiles_width;
var world_height = 128 * world_tiles_height;

/*
var world_width = 2048;
var world_height = 2048;

var world_tiles_width = world_width / 128;
var world_tiles_height = world_height / 128;
*/

var gameTime = 90; // each game will have a total time of 90 seconds

/**
var styleText_MedievalPixel = {
	fontFamily: 'medieval-pixel',	// Tipografia
	color: '#ffffff',				// Color del texto
	stroke: 0x000,					// Color del contorno
	strokeThickness: 4				// Grosor del contorno
};
//*/
// Estilo de texto para contenidos generales
var styleText_MedievalPixel_30 = {	
	fontFamily: 'medieval-pixel',	// Tipografia
	color: '#ffffff',				// Color del texto
	fontSize: 30,					// Tamaño del texto
	stroke: 0x000,					// Color del contorno
	strokeThickness: 4				// Grosor del contorno
}

// Estilo de texto para botones 1
var styleText_button_1 = {	
	fontFamily: 'ancient-font',	// Tipografia
	color: '#000000',				// Color del texto
	fontSize: 72					// Tamaño del texto
}

// Estilo  de texto para titulos (titulo de créditos)
var styleText_MedievalPixel_90 = {	
	fontFamily: 'medieval-pixel',	// Tipografia
	color: '#ffffff',				// Color del texto
	fontSize: 90,					// Tamaño del texto
	stroke: 0x000,					// Color del contorno
	strokeThickness: 4,				// Grosor del contorno
	align: 'left'					// Alineacion a la derecha
}

/**
var styleText_PixelSansSerif = { 
	fontFamily: 'pixel_sans_serif',	// Tipografia
	stroke: 0x000,					// Color del contorno
	strokeThickness: 4				// Grosor del contorno
}
//*/
// Estilo de texto para subtitulos (desarrolladores en creditos)
var styleText_PixelSansSerif_18 = {
	fontFamily: 'pixel_sans_serif',	// Tipografia
	stroke: 0x000,					// Color del contorno
	strokeThickness: 4,				// Grosor del contorno
	fontSize: 18					// Tamaño del texto
}

//Estilo para botones 2
var styleText_AncientFont_30 = {	
	fontFamily: 'ancient-font',	// Tipografia
	color: '#ffffff',				// Color del texto
	fontSize: 30,					// Tamaño del texto
	stroke: 0x000,					// Color del contorno
	strokeThickness: 4				// Grosor del contorno
}

//Estilo para los créditos
var styleText_AncientFont_90 = {	
	fontFamily: 'ancient-font',	// Tipografia
	color: '#ffffff',				// Color del texto
	fontSize: 90,					// Tamaño del texto
	stroke: 0x000,					// Color del contorno
	strokeThickness: 4				// Grosor del contorno
}
