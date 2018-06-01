pragma solidity ^0.4.2;

import "./strings.sol";

contract Butterfly {

    using strings for *;

    enum Status { Created, Assigned, Solved, Accepted, Rejected, TimedOut }

    event PuzzledAssignedTo(address _to);
    event PuzzledAcceptedBy(address _by);
    

    struct Puzzle {
        bytes32 question;
        string answer;
        bytes32 hashedAnswer;
        Status status;
        address creator;
        address assignedTo;
        uint ttl;
        uint willPay;
        uint willAccept;
    }

    mapping(address => bool) registered;

    mapping(address => bytes32) players;

    Puzzle[] availablePuzzles;
    address[] availablePlayers;

    uint puzzleCount;

    function unregisterUser() public returns(bool){
        registered[msg.sender] = false;
        return true;
    }

    function registerUser(bytes32 _username) public returns(bool){
        players[msg.sender] = _username;
        registered[msg.sender] = true;
        availablePlayers.push(msg.sender);
        return true;
    }

    function viewUserName() public view returns (bytes32){
        require(registered[msg.sender]);
        return players[msg.sender];
    }

    function registerQuestion(bytes32 _question, string _answer, uint _willPay, uint _willAccept, address _to) public returns(bool){
        require(registered[msg.sender]);
        bytes32 hashedAnswer = keccak256(_answer);
        availablePuzzles.push(Puzzle(_question, _answer, hashedAnswer, Status.Assigned, msg.sender, _to, 0, _willPay, _willAccept));
        return depositFunds(_willPay);
    }

    function depositFunds(uint _willDeposit) payable public returns(bool){
        return address(this).send(_willDeposit);
    }

    function widrawFunds(uint _willPay) payable public returns(bool){
        require(registered[msg.sender]);
        msg.sender.transfer(_willPay);
        return true;
    }

    function() payable public{}

    function assignQuestion(address _to, uint _puzzleId) private returns(bool){
        require(availablePuzzles[_puzzleId].creator == msg.sender);
        availablePuzzles[_puzzleId].assignedTo = _to;
        availablePuzzles[_puzzleId].assignedTo = _to;
        emit PuzzledAssignedTo(_to);
    }

    function checksAnswer(string _answer, uint _puzzleId) public returns(bool){
        require(registered[msg.sender]);
        require(now < availablePuzzles[_puzzleId].ttl);
        if (keccak256(_answer) == availablePuzzles[_puzzleId].hashedAnswer){
            availablePuzzles[_puzzleId].status = Status.Solved;
            availablePuzzles[_puzzleId].ttl = 0;
            return true;
        } else {
            availablePuzzles[_puzzleId].status = Status.Rejected;
            return false;
        }   
    }

    function claimPayback(uint _puzzleId) payable public {
        require(availablePuzzles[_puzzleId].creator == msg.sender);
        require(availablePuzzles[_puzzleId].status == Status.Solved);
        widrawFunds(availablePuzzles[_puzzleId].willAccept);
    }

    function claimPaybackTimedOut(uint _puzzleId) payable public {
        require(availablePuzzles[_puzzleId].creator == msg.sender);
        require(availablePuzzles[_puzzleId].ttl < now);
        widrawFunds(availablePuzzles[_puzzleId].willAccept);
    }

    function acceptQuestion(uint _puzzleId) public returns(bool){
        require(availablePuzzles[_puzzleId].assignedTo == msg.sender);
        availablePuzzles[_puzzleId].status = Status.Accepted;
        availablePuzzles[_puzzleId].ttl = now + 1 days;
        emit PuzzledAcceptedBy(msg.sender);
    }

    function getUserQuestions() public view returns(bytes32[], address[], uint[], Status[], uint[], uint[]){
        
        bytes32[]  memory questions = new bytes32[](availablePuzzles.length);
        address[] memory assignedTos = new address[](availablePuzzles.length);
        uint[]    memory ttls = new uint[](availablePuzzles.length);
        Status[]  memory statuses = new Status[](availablePuzzles.length);
        uint[]    memory willPays = new uint[](availablePuzzles.length);
        uint[]    memory willAccepts = new uint[](availablePuzzles.length);


        for (uint i = 0; i < availablePuzzles.length; i++){
            //if (availablePuzzles[i].creator == msg.sender || availablePuzzles[i].assignedTo == msg.sender){

            questions[i] = availablePuzzles[i].question;
            assignedTos[i] = availablePuzzles[i].assignedTo;
            ttls[i] = availablePuzzles[i].ttl;
            statuses[i] = availablePuzzles[i].status;
            willPays[i] = availablePuzzles[i].willPay;
            willAccepts[i] = availablePuzzles[i].willAccept;
                  
            //}
                   
        }

        return (questions, assignedTos, ttls, statuses, willPays, willAccepts);
    }

    function bytesToBytes32(bytes b, uint offset) private pure returns (bytes32) {
        bytes32 out;

        for (uint i = 0; i < 32; i++) {
            out |= bytes32(b[offset + i] & 0xFF) >> (i * 8);
        }
        return out;
    }       

    function getListOfPlayers() public view returns (address[]){
        return availablePlayers;
    }
}