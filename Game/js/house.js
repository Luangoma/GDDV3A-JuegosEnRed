function House(scene, house_index, x, y)
{
	this.scene = scene;
	this.house_index = house_index;
	this.start_x = x;
	this.start_y = y;
}

function HouseData(key, path){
	this.key = key;
	this.path = path;
}

house_data = [
	new HouseData('house1', './assets/houses/house1.png'),
	new HouseData('house2', './assets/houses/house2.png')
];

function preloadHouse(scene){
	console.log("loading house data...");
	for(let i = 0; i < house_data.length; ++i)
	{
		console.log("loading: " + house_data[i].key + ", " + house_data[i].path);
		scene.load.image(house_data[i].key, house_data[i].path);
	}
}

House.prototype.create = function(){
	this.sprite = this.scene.add.image(this.start_x, this.start_y, house_data[this.house_index].key);
};