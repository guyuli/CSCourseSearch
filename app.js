/*
 *  Starter code for University of Waterloo CS349 - Spring 2017 - A3.
 *	Refer to the JS examples shown in lecture for further reference.
 *  Note: this code uses ECMAScript 6.
 *  Updated 2017-07-12.
 */
	
"use strict";

// Get your own API key from https://uwaterloo.ca/api/register
var apiKey = ""; // input your uwaterloo key
var endpointUrl = "https://api.uwaterloo.ca/v2/courses/CS.json";

(function(exports) {

	/* A Model class */
    class AppModel {
		constructor() {
			this._observers = [];
            this.course_data;
		}

        // You can add attributes / functions here to store the data

        // Call this function to retrieve data from a UW API endpoint
        loadData(endpointUrl) {
            var that = this;
            $.getJSON(endpointUrl + "?key=" + apiKey,
                function (data) {
                    // Do something with the data; probably store it
                    // in the Model to be later read by the View.
                    // Use that (instead of this) to refer to the instance 
                    // of AppModel inside this function.
                    that.course_data = data.data;
                }
            );
        }
		
        filterData() {
            var that = this;
            var career_combo = document.getElementById("career_combo");
            var course_num = document.getElementById("course_num").value;
            var course_career = career_combo.options[career_combo.selectedIndex].value;
            var course_career_data;
            var course_num_data;
            var course_num_career_data;
            //console.log(course_num);
            //console.log(course_career);

            if (course_num === '') {
                if (course_career === 'Any') {
                    //console.log("haha");
                    that.notify(this.course_data);
                }
                else if (course_career === 'Undergraduate') {
                    var arr = [];    
                    for(var i = 0; i < that.course_data.length; i++){
                        if(that.course_data[i].academic_level == 'undergraduate'){
                            arr.push(that.course_data[i]);
                        }
                    }
                    if(arr.length == 0){
                        alert ("Course Information Not Found!");
                    }
                    else{
                        course_career_data = arr;
                        that.notify(course_career_data);
                    }
                }
                else if (course_career === "Graduate") {
                    var arr = [];    
                    for(var i = 0; i < that.course_data.length; i++){
                        if(that.course_data[i].academic_level == 'graduate'){
                            arr.push(that.course_data[i]);
                        }
                    }
                    if(arr.length == 0){
                        alert ("Course Information Not Found!");
                    }
                    else{
                        course_career_data = arr;
                        that.notify(course_career_data);
                    }
                }
            } else {
                if (course_career === 'Any') {
                    var arr = [];    
                    for(var i = 0; i < that.course_data.length; i++){
                        if(that.course_data[i].catalog_number == course_num){
                            arr.push(that.course_data[i]);
                        }
                    }
                    if(arr.length == 0){
                        alert ("Course Information Not Found!");
                    }
                    else{
                        course_num_data = arr;
                        that.notify(course_num_data);
                    }

                }
                else if (course_career === 'Undergraduate') {
                    var arr = [];    
                    for(var i = 0; i < that.course_data.length; i++){
                        if(that.course_data[i].catalog_number == course_num){
                            arr.push(that.course_data[i]);
                        }
                    }
                    if(arr.length == 0){
                        alert ("Course Information Not Found!");
                    }
                    else{
                        course_num_data = arr;

                        var arr_1 = [];    
                        for(var i = 0; i < course_num_data.length; i++){
                            if(course_num_data[i].academic_level == 'undergraduate'){
                                arr_1.push(course_num_data[i]);
                            }
                        }
                        if(arr_1.length == 0){
                            alert ("Course Information Not Found!");
                        
                        }
                        else{
                            course_num_career_data = arr_1;
                            that.notify(course_num_career_data);
                        }
                    }
                }
                else if (course_career === "Graduate") {
                    var arr = [];    
                    for(var i = 0; i < that.course_data.length; i++){
                        if(that.course_data[i].catalog_number == course_num){
                            arr.push(that.course_data[i]);
                        }
                    }
                    if(arr.length == 0){
                        alert ("Course Information Not Found!");
                    }
                    else{
                        course_num_data = arr;

                        var arr_1 = [];    
                        for(var i = 0; i < course_num_data.length; i++){
                            if(course_num_data[i].academic_level == 'graduate'){
                                arr_1.push(course_num_data[i]);
                            }
                        }
                        if(arr_1.length == 0){
                            alert ("Course Information Not Found!");
                        
                        }
                        else{
                            course_num_career_data = arr_1;
                            that.notify(course_num_career_data);
                        }
                    }
                }
            }
        }


		// Add observer functionality to AppModel objects:
		
		// Add an observer to the list
		addObserver(observer) {
            this._observers.push(observer);
            observer.updateView(this, null);
        }
		
		// Notify all the observers on the list
		notify(args) {
            _.forEach(this._observers, function(obs) {
                obs.updateView(this, args);
            });
        }
    }

    /*
     * A view class.
     * model:  the model we're observing
     * div:  the HTML div where the content goes
     */
    class AppView {
		constructor(model, div) {
			this.model = model;
			this.div = div;
			model.addObserver(this); // Add this View as an Observer
		}
		
        updateView(obs, args) {
            if (args == null) {
                return;
            }
            //console.log(args);
            // Add code here to update the View
            var courseList = document.getElementById("viewContent");
            document.getElementById("viewContent").innerHTML = ""; // clear viewContent

            for (var i = 0; i < args.length; i++) {
                // outer border div
                var outerBorder = document.createElement("div");
                outerBorder.setAttribute("id","outerBorder"+i);
                outerBorder.setAttribute("class","outerBorder");
                courseList.appendChild(outerBorder);
            
                // course number
                var course_num = document.createElement("h3");
                course_num.textContent = args[i].subject + " " + args[i].catalog_number;
                outerBorder.appendChild(course_num);

                // title
                var title = document.createElement("h4");
                title.setAttribute("class","title");
                title.textContent = args[i].title;
                outerBorder.appendChild(title);

                // inner border div
                var innerBorder = document.createElement("div");
                innerBorder.setAttribute("id","innerBorder"+i);
                innerBorder.setAttribute("class","innerBorder")
                outerBorder.appendChild(innerBorder)

                // course id
                var course_id = document.createElement("p");
                course_id.textContent = "Course ID: " + args[i].course_id;
                innerBorder.appendChild(course_id);

                // units
                var units = document.createElement("p");
                units.setAttribute("class","Units");
                units.textContent = "Units: " + args[i].units;
                innerBorder.appendChild(units);

                // description
                var description = document.createElement("p");
                description.setAttribute("class", "Description");
                description.textContent = "Description: " +args[i].description;
                innerBorder.appendChild(description);

                // academic level
                var academic_level = document.createElement("p");
                academic_level.setAttribute("class", "audience");
                academic_level.textContent = "Academic level: " + args[i].academic_level;
                innerBorder.appendChild(academic_level);

            }
        };        
    }

    function showComboOptions() {
        var combo = document.getElementById("career_combo");
        var careers = new Array('Any','Undergraduate','Graduate');
        for (var i = 0; i < careers.length; i++){
            var option = document.createElement("option");
            option.text = careers[i];
            option.value = careers[i];
            combo.add(option, null); //Standard 
        }
    }

    function addSearchButtonListener(model) {
        var button = document.getElementById("search_button");
        button.onclick = function(){
            //console.log("haha");
            //console.log(model.course_data);
            model.filterData();
        };
    }

	/*
		Function that will be called to start the app.
		Complete it with any additional initialization.
	*/
    exports.startApp = function() {
        showComboOptions();
        var model = new AppModel();
        var view = new AppView(model, "div#viewContent");
        model.loadData(endpointUrl);
        addSearchButtonListener(model);
    }

})(window);
