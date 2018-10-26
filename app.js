"use strict";

// Get your own API key from https://uwaterloo.ca/api/register
var apiKey = "f7f734f0ab7bf935da6074c9786eae64";
var endpointUrl = "https://api.uwaterloo.ca/v2/courses/CS.json";

(function(exports) {

	/* A Model class */
    class AppModel {
		constructor() {
			this._observers = [];
            this.course_data = [];
        }

        // Call this function to retrieve data from a UW API endpoint
        loadData(endpointUrl) {
            var that = this;
            $.getJSON(endpointUrl + "?key=" + apiKey,
                function (data) {
                    that.course_data = data.data;
                }
            ).always(function() { // is returned as deffered object
                showComboOptions(that); // show combo options after data is loaded
            });
        }

        filterData() {
            var that = this;
            var course_combo = document.getElementById("course_combo");
            var career_combo = document.getElementById("career_combo");
            var course_num = course_combo.options[course_combo.selectedIndex].value;
            var course_career = career_combo.options[career_combo.selectedIndex].value;
            var course_career_data;
            var course_num_data;
            var course_num_career_data;

            if (course_num === 'Any') {
                if (course_career === 'Any') {
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

    function showComboOptions(model) {
        var careerCombo = document.getElementById("career_combo");
        var careers = new Array('Any','Undergraduate','Graduate');
        for (var i = 0; i < careers.length; i++){
            var option = document.createElement("option");
            option.text = careers[i];
            option.value = careers[i];
            careerCombo.add(option, null);
        }
        var courseCombo = document.getElementById("course_combo");
        var courses = new Array('Any');
        for(var i = 0; i < model.course_data.length; i++){
            courses.push(model.course_data[i].catalog_number);
        }
        for (var i = 0; i < courses.length; i++){
            var option = document.createElement("option");
            option.text = courses[i];
            option.value = courses[i];
            courseCombo.add(option, null);
        }
    }

    function addSearchButtonListener(model) {
        var button = document.getElementById("search_button");
        button.onclick = function(){
            model.filterData();
        };
    }

    function addEnterKeyListener(model) {
        var input = document.getElementById("headContainer");
        input.addEventListener("keyup", function(event) {
            event.preventDefault(); // Cancel the default action, if needed
            if (event.keyCode === 13) { // Number 13 is the "Enter" key on the keyboard
                document.getElementById("search_button").click();
            }
        });
        
    }

    exports.startApp = function() {
        var model = new AppModel();
        var view = new AppView(model, "div#viewContent");
        model.loadData(endpointUrl);
        addSearchButtonListener(model);
        addEnterKeyListener(model);
    }

})(window);

// scroll back to top
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTopBtn").style.display = "block";
    } else {
        document.getElementById("backToTopBtn").style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}