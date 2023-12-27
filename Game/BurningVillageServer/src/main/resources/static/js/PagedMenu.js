class PagedMenu
{
	scene = {};
	
	x = 0;
	y = 0;
	
	background_image_name = "pergamino";
	background_image = {};
	
	elements_per_page = 0;
	elements_list = []; //the list that contains the data.
	objects_list = []; //the list that contains the objects that visually represent the data on screen.
	
	current_page = 0;
	total_pages = 0;
	
	button_left_image_name = 'stone_button_left';
	button_right_image_name = 'stone_button_right';
	button_left = {};
	button_right = {};
	
	update_on_list_edges = false;
	
	//Function callbacks for object setup and modification:
	object_creation_function = function(scene,data_list,obj_list,index,global_index){};
	object_destruction_function = function(scene,data_list,obj_list,index,global_index){};
	object_reset_function = function(scene,data_list,obj_list,index,global_index){};
	object_update_function = function(scene,data_list,obj_list,index,global_index){};
	
		/*
			- Object Creation:
				Function to create the objects/elements that will appear on the list. Each element will be an object that contains a group of phaser objects, custom classes and such that can be used for whatever purpose.
			
			- Object Destruction:
				Does not need to be strictly called in 99% of cases. Use only when you REALLY need to re-generate the table during runtime (eg: change number of elements to display in the table without exiting the scene where the table object exists)
				
			- Object Reset:
				Function to "reset" the objects in the elements list. (making them invisible, using default information, etc...)
				Basically, a setup process that happens each time the page display information is changed so that it can display the elements accordingly.
			
			- Object Update:
				Function to update the object status with the current information stored within the element info list.
				It internally calls object reset first, then it proceeds with the update process.
			
		*/
	
	
	
	constructor(scene, x = config.width/2, y = config.height/2, num_elems_per_page = 10, img = 'pergamino', img_r = 'stone_button_right', img_l = 'stone_button_left')
	{
		this.scene = scene;
		
		this.x = x;
		this.y = y;
		this.elements_per_page = num_elems_per_page;
		this.current_page = 0;
		this.update_total_pages();
		
		this.background_image_name = img;
		this.button_left_image_name = img_l;
		this.button_right_image_name = img_r;
		
		this.elements_list = [];
		this.objects_list = [];
		
		
		
		//a placeholder setup.
		this.object_creation_function = function(scene, data_list, obj_list, index){
			//some dirty and basic setup
			let obj_structure = {
				placeholder_background: null
			};
			obj_list.push(obj_structure);
			
			//create some placeholder backgrounds
			let currentBg = scene.add.image(200,170 + 30 * index, 'background_slice').setOrigin(0,0);
			currentBg.displayHeight = 25;
			currentBg.displayWidth = 400;
			currentBg.setTint(index % 2 === 0 ? 0xFFFFFF : 0xAAAAAA);
			currentBg.visible = true;
			obj_list[index].placeholder_background = currentBg;
		};
		
		
		
		
		

		this.createPagedMenu();
	}
	
	set_elements_per_page(value)
	{
		this.elements_per_page = value;
	}
	
	set_elements_list(new_list)
	{
		this.elements_list = new_list;
	}
	
	set_update_on_list_edges(value)
	{
		this.update_on_list_edges = value;
	}
	
	calculate_total_pages(list_len, elems_per_page)
	{
		let ans = Math.ceil(list_len / elems_per_page);
		return ans;
	}
	
	update_total_pages()
	{
		this.total_pages = this.calculate_total_pages(this.elements_list.length, this.elements_per_page);
	}
	
	get_total_pages()
	{
		this.update_total_pages();
		return this.total_pages;
	}
	
	update_paged_menu(list, elems)
	{
		this.set_elements_list(list);
		this.set_elements_per_page(elems);
		this.update_total_pages();
	}
	
	
	update_info(list)
	{
		this.elements_list = list;
		this.update_total_pages();
		
		//make sure to clamp the current page so that we don't find ourselves in the wrong page if the update contains less pages than what we had previously.
		this.current_page = clampValue(this.current_page, 0, this.total_pages - 1);
		
		this.update_objects();
	}
	
	create_objects()
	{
		this.process_objects(this.object_creation_function);
	}
	
	reset_objects()
	{
		this.process_objects(this.object_reset_function);
	}
	
	update_objects()
	{
		//reset the list of displayed objects (hide them or reset their state to default, etc...)
		this.reset_objects();
		
		//if the elements list is empty, then return and do nothing else.
		if(this.elements_list.length === 0){
			return;
		}
		
		//calculate the number of elements to display on this page.
		let elements_to_display = this.get_elements_to_display();
		console.log("-------Displaying " + elements_to_display + " elements on page " + this.current_page + " (there are " + this.total_pages + " pages in total)");
		
		this.process_objects(this.object_update_function, elements_to_display);
	}
	
	
	//function to change page
	//direction: +1 is right, -1 is left (could very well use an enum...)
	//TODO: maybe make it so that the arrows become invisible once we reach the edge of the table?
	change_page(direction)
	{
		//calculate the total pages each time we change the menu so that we can update it accordingly if the data is modified during runtime.
		let current_total_pages = this.get_total_pages();
		
		//early return in the case that there are no pages for the menu to explore.
		if(current_total_pages <= 0){
			return;
		}
		
		//store the old page and calculate the new page
		let old_page = this.current_page;
		let new_page = clampValue(this.current_page + direction, 0, current_total_pages - 1);
		
		//update the current page
		this.current_page = new_page;
		
		
		//this step only matters if the paged menu has been configured to actually prevent updates on the "edges" of the list (the first and last pages are considered to be the edges of the list).
		//if the new page is different from the old one, update the displayed elements from the list of elements. Otherwise (if it's the same page, aka we're on the edge of the table/list), keep the same list to prevent flickering when the elements need time to update (example: connection status of players).
		if(this.update_on_list_edges || old_page !== new_page){
			this.update_objects(); //this function depends on the implementation give by the user of this list class.
		}
	}
	
	createPagedMenu()
	{
		//good old javascript hack, episode 2.
		let that = this;
		
		this.background_image = this.scene.add.image(config.width/2, config.height/2, this.background_image_name).setDisplaySize(config.width - config.width/10, config.height - config.height/10);
		
		//move one page to the left
		this.button_left = new Button(this.scene, 64, config.height/2, "", this.button_left_image_name);
		this.button_left.setButtonFunction(function(){
			that.change_page(-1);
		});
		this.button_left.setCanBePressed(true);
		
		//move one page to the right
		this.button_right = new Button(this.scene, config.width - 64, config.height/2, "", this.button_right_image_name);
		this.button_right.setButtonFunction(function(){
			that.change_page(1);
		});
		this.button_right.setCanBePressed(true);
	}
	
	
	//apply some transform to all of the objects in the list of elements to be displayed.
	process_objects(object_processing_function = function(scene, data_list, obj_list, index, global_index){}, limit = this.elements_per_page)
	{
		for(let i = 0; i < limit; ++i)
		{
			let current_index = i; //used for the elements that display things on screen
			let global_index = i + this.elements_per_page * this.current_page; //used for the large list that contains the data under the hood
			object_processing_function(this.scene, this.elements_list, this.objects_list, current_index, global_index);
		}
	}
	
	//returns the number of elements that have to be displayed on the current page
	get_elements_to_display()
	{
		//if the list is empty, then we cannot display any elements.
		if(this.elements_list.length === 0)
		{
			return 0;
		}
		console.log("there are these many elements in the list: " + this.elements_list.length);
		//if the current page is the last page, then we need to display however many elements are there on the last page.
		let elements_on_last_page = Math.floor(this.elements_list.length % this.elements_per_page);
		if(this.current_page === this.total_pages - 1 && elements_on_last_page !== 0) //makes sure that it will properly display in the case that the last page is filled.
		{
			//number of elements on last page
			return elements_on_last_page;
		}
		
		//else, just return the total amount of elements available per page.
		return this.elements_per_page;
	}
	
}


function preloadPagedMenuData(scene)
{
	//backgrounds for the paged menu:
	scene.load.image('pergamino', './assets/player_list_papyrus.png');
	scene.load.image('lobby_list_background', "./assets/LobbyListBackground.png");
	
	//buttons for the menu
	scene.load.image('stone_button', './assets/StoneButton01.png');
	scene.load.image('stone_button_right', './assets/StoneButton02.png');
	scene.load.image('stone_button_left', './assets/StoneButton03.png');
	
	//slices and decorations for the background of each element in the lit of the paged menu
	scene.load.image('background_slice', './assets/progress_bar/progress_bar_default_middle.png');
	
	//status buttons and other special elements
	scene.load.image('status_offline', './assets/online_status_square_offline.png');
	scene.load.image('status_online', './assets/online_status_square_online.png');
}

