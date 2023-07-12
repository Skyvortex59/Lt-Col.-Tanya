const { prefix } = require("../../Storage/config.json");
const http = require("http")

exports.run = async(bot, message, args) => {

    var data = {
        "object":"Back_from_Heaven"
    }
    data = JSON.stringify(data);
    console.log(data);

    var urlparams = {
        host: 'localhost', //No need to include 'http://' or 'www.'
        port: 80,
        path: `/API_php/api/oeuvre/${data}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', //Specifying to the server that we are sending JSON 
        }
    };
    
    function SendRequest(datatosend) {
        function OnResponse(response) {
            var data = '';
    
            response.on('data', function(chunk) {
                data += chunk; //Append each chunk of data received to this variable.
            });
            response.on('end', function() {
                console.log(data); //Display the server's response, if any.
            });
        }
    
        var request = http.request(urlparams, OnResponse); //Create a request object.
    
        request.write(datatosend); //Send off the request.
        request.end(); //End the request.
    }
    
    SendRequest("{testfield: 'Boop'"); //Execute the function the request is in.
    

}

exports.help = {
    name: "request",
    aliases: ['http'],
    description: `Cette commande sert à faire une requête http : ${prefix}ping`
}

exports.requirements = {
    botOwner: true,
    botPerms: [],
    userPerms: []
}