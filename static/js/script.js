//REMEMBER TO DELETE THIS AT THE END, THIS IS NOT USED ANY MORE, BUT REQUIRES A CHANGE AT THE HTML AS WELL!
function libraryFunction() {
    document.getElementById("library-dropdown").classList.toggle("show");
}

function cafeFunction() {
    document.getElementById("cafe-dropdown").classList.toggle("show");
}


function libraryFilter() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("library-input");
    filter = input.value.toUpperCase();
    div = document.getElementById("library-dropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function cafeFilter() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("cafe-input");
    filter = input.value.toUpperCase();
    div = document.getElementById("cafe-dropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}


document.addEventListener("load", getRatings('moffitt'));
document.addEventListener("load", getRatings('doe'));
document.addEventListener("load", getRatings('wurster'));
document.addEventListener("load", getRatings('bechtel'));
document.addEventListener("load", getRatings('mainstacks'));
document.addEventListener("load", getRatings('etcheverry'));
document.addEventListener("load", getRatings('soda'));

//GET ratings for cafes
document.addEventListener("load", getRatings('milano'));
document.addEventListener("load", getRatings('strada'));
document.addEventListener("load", getRatings('fsm'));
document.addEventListener("load", getRatings('yali'));
document.addEventListener("load", getRatings('northside'));
document.addEventListener("load", getRatings('peet'));
document.addEventListener("load", getRatings('starbucks'));


function getRatings(getname){
 var getrequest =  'http://localhost:3001/rates?name='+getname;

    var reqRget = new XMLHttpRequest();

reqRget.open("GET", getrequest, true);
reqRget.onreadystatechange = function () { 
    if (reqRget.readyState == 4 && reqRget.status == 200) {
        var getRes = JSON.parse(reqRget.responseText);
        console.log(getRes.name + ", " + getRes.review)

        localStorage.setItem(getname, getRes.review);
		console.log(localStorage);
    }
};
reqRget.send();

};



//NOW I HAVE A GET REQUEST TO RETREIVE THE RATING AND A POST TO ADD A REVIEW, BUT I THINK IT SHOULD BE POSSIBLE TO COMBINE THIS IN ONE POST IF WE LET THE API RESPOND BASED ON A POST QUERY AS WELL!
function reviewing(num, name){
    console.log(num);
    console.log(name);

    
    //var getrequest = 'http://localhost:3001/rates?name='+name; //THIS SHOULD BE USED AS A QUERY FOR A POST REQUEST AS WELL, THEN LET THE API DO THE SAME FOR POST AS FOR GET + ADD ROW!
    var postrequest = 'http://localhost:3001/rates';

    console.log(postrequest);
    //var reqRget = new XMLHttpRequest();
    var reqRpost = new XMLHttpRequest();


reqRpost.open("POST", postrequest, true);
reqRpost.setRequestHeader("Content-type", "application/json");

reqRpost.onreadystatechange = function () { 
    if (reqRpost.readyState == 4 && reqRpost.status == 200) {
        var postRes = JSON.parse(reqRpost.responseText);
        console.log(postRes.name + ", " + postRes.review)

        localStorage.setItem(name, postRes.review);
		console.log(localStorage);
    }
}
var data = JSON.stringify({"name":name,"review":num});
reqRpost.send(data);

};



//BASED ON LOCALSTORAGE VARIABLE FOR RATING WE CHANGE THE STARS OR DISPLAY THE RATING.