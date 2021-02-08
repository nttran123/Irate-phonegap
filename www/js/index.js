$(document).on("ready", function(){
    handleDb.createDatabase();
});
document.getElementById("btn_add_form").addEventListener("click", addReview);
function addReview(){
    var resName = $("#res_name").val();
    var resType = $("#res_type").val();
    var dateVisit = $("#date_visit").val();
    var avgPrice = $("#avg_price").val();
    var serRate = $("#ser_rate").val();
    var cleanRate = $("#clean_rate").val();
    var foodRate = $("#food_rate").val();
    var notes = $("#notes").val();
    var reporter = $("#reporter").val();
    var currentDate = new Date().getTime();
    var idateVisit = document.querySelector('input[type="date"]');
    let regex = new RegExp("^[A-Za-z0-9 ]+$","i");

    if(!resName){
        alert("Restaurant Name is required ! \nPlease fill in the Restaurant Name field");
    }else if(resName.length > 20){
        alert("Restaurant Name is 20 characters maximum !");
    }else if(!regex.test(resName)){
        alert("Restaurant Name contains invalid characters !");
    }else if(!resType){
        alert("Restaurant Type is required ! \nPlease fill in the Restaurant Type field!");
    }else if(!dateVisit){
        alert("Visit date is required ! \nPlease fill in the Visit date field!");
    }else if(currentDate < idateVisit.valueAsNumber){
        alert("Entered date is a future date ! \nPlease fill correct the information!");
    }else if(!avgPrice){
        alert("Average price is required ! \nPlease fill in the Average Price field!");
    }else if(avgPrice <= 0){
        alert("Average price is invalid ! \nInput value must be greater than 0!");
    }else if(!serRate){
        alert("Service rating is required ! \nPlease rate the Service quality!");
    }else if(!cleanRate){
        alert("Cleanliness rating is required !\nPlease rate the Clean quality!");
    }else if(!foodRate){
        alert("Food rating is required !\nPlease rate the food quality!");
    }else if(notes.length > 100){
        alert("Note is 100 characters maximum !");
    }else if(!regex.test(notes) && notes.length > 0){
        alert("Note contains invalid characters !");
    }else if(!reporter){
        alert("Reporter is required !\nPlease fill in the Reporter field!");
    }else if(reporter.length > 30){
        alert("Reporter is 30 characters maximum !");
    }else if(!regex.test(reporter)){
        alert("Reproter contains invalid characters !");
    }else{
        var r = confirm("Please confirm the information:\nRestaurant Name: " + resName + "\nRestaurant Type: " + resType + "\nDate of the visit: " + dateVisit + "\nAverage price of the meal: " + avgPrice + "\nService Rating: " + serRate + "\nCleanliness Rating: " + cleanRate + "\nFood Rating: " + foodRate + "\nNotes: " + notes + "\nReporter: " + reporter);
           if(r == true) {
            handleTable.addReview(resName, resType, dateVisit, avgPrice, serRate, cleanRate, foodRate, notes, reporter);
            $("#res_name").val("");
            $("#res_type").val("");
            $("#date_visit").val("");
            $("#avg_price").val("");
            $("#ser_rate").val("");
            $("#clean_rate").val("");
            $("#food_rate").val("");
            $("#notes").val("");
            $("#reporter").val("");
            alert("successful added !");
        }
    }
}
var currentReview={
id: -1,
resName: "",
resType: "",
dateVisit: Date.now(),
avgPrice: 0,
serRate: 0,
cleanRate: 0,
foodRate: 0,
notes: "",
reporter: ""
}
function displayReviews(results){
    var resultLength = results.rows.length;
    var ratingList = $("#ratingList");
    ratingList.empty();
    for(var i = 0; i< resultLength; i++){
        var item = results.rows.item(i);
        var avg = Math.round((parseInt(item.serRate)+parseInt(item.cleanRate)+parseInt(item.foodRate))/3);
        var avgtext = "";
        switch(avg){
            case 0:
                avgtext = "Need to improve";
                break;
            case 1:
                avgtext = "OKAY";
                break;
            case 2:
                avgtext = "Good";
                break;
            case 3:
                avgtext = "Excellent";
                break;
            default:
                avgtext = "Error";
        }
        var a = $("<a />");
        var p = $("<p />").text("Id: ");
        var h1 = $("<h3 />").text("Restaurant name: ");
        var h2 = $("<h3 />").text("Average Rating: ");
        var h3 = $("<h3 />").text("Reporter: ");
        var h4 = $("<h4 />").text("Note: ");
        var spanId = $("<span />").text(item._id);
        spanId.attr("name", "_id");
        var spanResName = $("<span />").text(item.resName);
        spanResName.attr("name", "resName");
        var spanAvgRate = $("<span />").text(avgtext);
        spanAvgRate.attr("name", "avgPrice");
        var spanReporter = $("<span />").text(item.reporter);
        spanReporter.attr("name", "reporter");
        var spanNote = $("<span />").text(item.notes);
        spanNote.attr("name", "user_note");
        p.append(spanId);
        h1.append(spanResName);
        h2.append(spanAvgRate);
        h3.append(spanReporter);
        h4.append(spanNote);
        a.append(p);
        a.append(h1);
        a.append(h2);
        a.append(h3);
        a.append(h4);
        var li = $("<li/>");
        li.append(a);
        ratingList.append(li);
        $('h4').css('display','none');
    }
    ratingList.listview("refresh");
    ratingList.on("click", "li", function(){
        currentReview.id = $(this).find("[name='_id']").text();
        currentReview.resName = $(this).find("[name='resName']").text();
        currentReview.reporter = $(this).find("[name='reporter']").text();
        currentReview.resType = item.resType;
        currentReview.dateVisit = item.dateVisit;
        currentReview.avgPrice = item.avgPrice;
        currentReview.serRate = item.serRate;
        currentReview.cleanRate = item.cleanRate;
        currentReview.foodRate = item.foodRate;
        currentReview.notes = $(this).find("[name='user_note']").text();
        currentReview.reporter = item.reporter;
        $("#popup_update_delete").popup("open");
        console.log(currentReview.notes);
    });
}
$(document).on("pagebeforeshow", "#home", function(){
    handleTable.loadReviews(displayReviews);
});
document.getElementById("btn_del").addEventListener("click", deleteReview);
function deleteReview(){
    var r = confirm("Delete rating\nRestaurant ID: "+currentReview.id+
                    "\nRestaurant name: " + currentReview.resName);
    if(r==true){
        handleTable.deleteReview(currentReview.id);
        handleTable.loadReviews(displayReviews);
        alert("Delete rating successfully !")
    }
    $("#popup_update_delete").popup("close");
}

$(document).on("pagebeforeshow", "#update_dialog", function(){
    $("#new_notes").val(currentReview.notes);
});
document.getElementById("btn_update").addEventListener("click", updateReview);
function updateReview(){
    var newNotes = $("#new_notes").val();
    let regex = new RegExp("^[A-Za-z0-9 ]+$","i");
    if(!newNotes){
        alert("Restaurant Name is required ! \nPlease fill in the new note field!");
    }
    else if(!regex.test(newNotes)){
        alert("The new note field contain invalid character!");
    }
    else{
        handleTable.updateReview(currentReview.id, newNotes);
        alert("Update note successfully !");
        $("#update_dialog").dialog("close");
    }
}