//define globals
var name = ""
var position = ""
var match = 0
var team = 0
var counting = false
var countexchange = 0
var countrswitch = 0
var countbswitch = 0
var countscale = 0
var countdrop = 0
var autocross = false
//get objects from document
scale = document.getElementById("scale")
redswitch = document.getElementById("redswitch")
blueswitch = document.getElementById("blueswitch")
redexchange = document.getElementById("redexchange")
blueexchange = document.getElementById("blueexchange")
redcollect = document.getElementById("redcollect")
bluecollect = document.getElementById("bluecollect")
autocrosstrue = document.getElementById("autocrosstrue")
undo = document.getElementById("undo")
drop = document.getElementById("drop")
//make action queue
actions = []
//onclicks, probably better way to do this
scale.addEventListener('click', () =>   actions.push("scale"))
redswitch.addEventListener('click', () => actions.push("redswitch"))
blueswitch.addEventListener('click', () => actions.push("blueswitch"))
redexchange.addEventListener('click', () => actions.push("redexchange"))
blueexchange.addEventListener('click', () => actions.push("blueexchange"))
redcollect.addEventListener('click', () => actions.push("redcollect"))
bluecollect.addEventListener('click', () => actions.push("bluecollect"))
autocrosstrue.addEventListener('click', () => actions.push("autocrosstrue"))
undo.addEventListener('click', () => actions.pop())
drop.addEventListener('click', () => actions.push("drop"))
//define functions
function sumbmitform() {
    name = document.getElementById("name").value
    position = document.getElementById("position").value
    team = document.getElementById("team").value
    match = document.getElementById("match").value
    document.getElementById("login").style.display = "none"
    document.getElementById("app").style.display = "initial"
    switch (position) {
        case "red-top":
            document.getElementById("blueexchange").style.display = "none"
            break
        case "red-mid":
            document.getElementById("blueexchange").style.display = "none"
            break
        case "red-bot":
            document.getElementById("blueexchange").style.display = "none"
            break
        case "blue-top":
            document.getElementById("redexchange").style.display = "none"
            break
        case "blue-mid":
            document.getElementById("redexchange").style.display = "none"
            break
        case "blue-bot":
            document.getElementById("redexchange").style.display = "none"
            break
    }
    document.getElementById("gameinfo").innerHTML = "Match #" + match + " Team #" + team
}
function end(auto) {
    // executes at the end of time loop
    
    actions.forEach((element) => {
        switch (element) {
            case "redswitch":
            	countrswitch++
                break
            case "blueswitch":
            	countbswitch++
                break
            case "scale":
            	countscale++
                break
            case "redexchange":
            	countexchange++
                break
            case "blueexchange":
            	countexchange++
                break
            case "autocrosstrue":
            	autocross = true
                break
            case "drop":
                countdrop++
                break
                

        }
    })
   //auto return auto values
    if (auto === true) {
        return [autocross, countscale, countbswitch, countrswitch, countdrop]
        actions = []
    }
     //returns match #, position, team #, name of scouter, exchange, red switch, blue switch, scale, drop
    return [match, position, team, name, countexchange, countrswitch, countbswitch, countscale, countdrop, autocross]
}
function starttimer() {
    if (counting === true) {return}
    counting = true
    var timer = document.getElementById("timer")
    var time = 150
    var auto
    timer.style.color = "darkgreen"
    loop = setInterval(() => {
        if (time > 0) {
            timer.innerHTML = time + " seconds left in match"
            if (time === 135) {
                auto = end(true)
                console.log("auto")
                timer.style.color = "black"
            }
        } else {
            timer.innerHTML = "Match Complete"
            console.log(actions)
            clearInterval(loop)
            main();
            /*
            FULL Array:
            [match#, position, team#, name of scouter, NORMAL exchange, NORMAL red switch, NORMAL blue switch, NORMAL scale, NORMAL drop, AUTO exchange, AUTO red switch, AUTO blue switch, AUTO scale, AUTO drop]
            God that is cancerous.
            If you can just add it to the sheet
            */
            console.log(end(false).concat(auto))
            
        }
        time--
    }, 1000)
}


//-=-----------------------

// Client ID and API key from the Developer Console
var CLIENT_ID = '707804938842-4sohume6rrs6i9phfubuvq3dsedulert.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAmEro2NteEFuEGABCj8d0hnRRKKlnurfw';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    document.getElementById("authclass").classList.add('green');
    document.getElementById("authclass").classList.remove('red');
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    document.getElementById("authclass").classList.add('red');
    document.getElementById("authclass").classList.remove('green');


  }
}

/**
 *    Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  window.location.reload();
}

/**
*   Main body of code to be run after the client is authorized
*/
function main(){
  let pocCaller = createCaller("1bx6V5X5v74Hy_kPZpJ-cLfHiOn_VidAyMDTY1kSt1dw", "A1:I", "RAW", "INSERT_ROWS"); //create caller is defined at the bottom of the page


  let formValues = [[match, position, team, name, countexchange, countrswitch, countbswitch, countscale, countdrop, autocross]];
    pocCaller(formValues).then(response => console.log(response.result)).catch(err => console.log(err.result));
  /**
  *   Calls the google api to record values and resets form
  *
  **/
}

/**
*   Curried function to create response generators
*   @param spreadsheetId The ID of the spreadsheet to update.
*   @param range The A1 notation of a range to search for a logical table of data.
*   @param valueInputOption How the input data should be interpreted. (RAW or USER_ENTERED)
*   @param insertDataOption How the input data should be inserted. (OVERWRITE or INSERT_ROWS)
*
*   @param values The spreadsheet values in nested array form.
*/

let createCaller = (spreadsheetId, range, valueInputOption, insertDataOption) => (values) => {
  var params = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: valueInputOption,
    insertDataOption, insertDataOption
  }
  var valueRangeBody = {
    values: values
  }
  var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
  return request;
}