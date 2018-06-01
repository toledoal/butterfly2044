var Butterfly = artifacts.require("./Butterfly.sol");

contract("Butterfly", function(accounts) {
    var electionInstance;

    it("User is able to register as a user with a username", function(){
        return Butterfly.deployed().then(function(instance){
            return instance.registerUser("Alejandros");
        }).then(function(response){
            assert.equal(response, true);
        });
    });

    // it("User is able to unregister", function(){
    //     return Butterfly.deployed().then(function(instance){
    //         return instance.unregisterUser();
    //     }).then(function(response){
    //         assert.equal(response, true);
    //     });
    // });

    it("User is able to read its username", function(){
        return Butterfly.deployed().then(function(instance){
            return instance.viewUserName();
        }).then(function(response){
            var resp = web3.utils.toAscii(response);
            assert.equal(resp, "Alejandros");
        });
    });

    it("registers a new question and challenges user", function(){

    });

    it("registers a new question but doesn't challenge a user", function(){

    });

    it("checks if anwser is right", function(){

    });

    it("checks if anwser is wrong", function(){

    });

    it("checks timed out questions and performs payment", function(){

    });

    it("user is able to accept a challenge", function(){

    });

    it("gets all current players", function(){

    });


    it("gets all questions related to user", function(){

    });


    it("initializes with four candidates", function(){
        return Butterfly.deployed().then(function(instance){
            return instance.candidatesCount();
        }).then(function(count){
            assert.equal(count, 4);
        });
    });

    it("initiliazes the correct names of the candidates ", function(){
        return Butterfly.deployed().then(function(instance){
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate){
            assert.equal(candidate[0], 1, "Contains the correct id");
            assert.equal(candidate[1], "Andres Manuel Lopez Obrador", "Contains the correct name");
            assert.equal(candidate[2], 0, "contains no votes");
            return electionInstance.candidates(2);
        }).then(function (candidate){
            assert.equal(candidate[0], 2, "Contains the correct id");
            assert.equal(candidate[1], "Ricardo Anaya", "Contains the correct name");
            assert.equal(candidate[2], 0, "contains no votes");
            return electionInstance.candidates(3);
        }).then(function (candidate){
            assert.equal(candidate[0], 3, "Contains the correct id");
            assert.equal(candidate[1], "Jose Antonio Meade Kuri", "Contains the correct name");
            assert.equal(candidate[2], 0, "contains no votes");
            return electionInstance.candidates(4);
        }).then(function (candidate){
            assert.equal(candidate[0], 4, "Contains the correct id");
            assert.equal(candidate[1], "Jaime Rodriguez Bronco", "Contains the correct name");
            assert.equal(candidate[2], 0, "contains no votes");
            return electionInstance.candidates(4);
        })
    });

});