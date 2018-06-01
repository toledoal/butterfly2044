import React, { Component } from 'react';
import update from 'react-addons-update';
import Web3 from 'web3';

export const AppContext = React.createContext();

var Butterfly = "";

var web3Infura = new Web3('wss://rinkeby.infura.io/ws');

//const fromAdde = "0x86DB317a70706c3D3305A35D0BEa0C30fad6bA23";

//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
//var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/rGBNYSwK03htkd9ZYRkR'));"0x4a2faa6c2b4b1cbe3cfaef9011cec32238560643";
const ADDRESS = "0xa138da55c7a66c3a8144602591ef5cc56976002d";//"0xAB1FFc9cf4c05Fb89C8253d587ea07672022c397";//"0x3af826f08978bebe7dafc14fc7e2a41eaf6881fb";



var ABI = [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "_by",
					"type": "address"
				}
			],
			"name": "PuzzledAcceptedBy",
			"type": "event"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_puzzleId",
					"type": "uint256"
				}
			],
			"name": "acceptQuestion",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_answer",
					"type": "string"
				},
				{
					"name": "_puzzleId",
					"type": "uint256"
				}
			],
			"name": "checksAnswer",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_puzzleId",
					"type": "uint256"
				}
			],
			"name": "claimPayback",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "_to",
					"type": "address"
				}
			],
			"name": "PuzzledAssignedTo",
			"type": "event"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_puzzleId",
					"type": "uint256"
				}
			],
			"name": "claimPaybackTimedOut",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_willDeposit",
					"type": "uint256"
				}
			],
			"name": "depositFunds",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_question",
					"type": "bytes32"
				},
				{
					"name": "_answer",
					"type": "string"
				},
				{
					"name": "_willPay",
					"type": "uint256"
				},
				{
					"name": "_willAccept",
					"type": "uint256"
				},
				{
					"name": "_to",
					"type": "address"
				}
			],
			"name": "registerQuestion",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_username",
					"type": "bytes32"
				}
			],
			"name": "registerUser",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "unregisterUser",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"payable": true,
			"stateMutability": "payable",
			"type": "fallback"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_willPay",
					"type": "uint256"
				}
			],
			"name": "widrawFunds",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getListOfPlayers",
			"outputs": [
				{
					"name": "",
					"type": "address[]"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getUserQuestions",
			"outputs": [
				{
					"name": "",
					"type": "bytes32[]"
				},
				{
					"name": "",
					"type": "address[]"
				},
				{
					"name": "",
					"type": "uint256[]"
				},
				{
					"name": "",
					"type": "uint8[]"
				},
				{
					"name": "",
					"type": "uint256[]"
				},
				{
					"name": "",
					"type": "uint256[]"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "viewUserName",
			"outputs": [
				{
					"name": "",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}
	]

	

class AppProvider extends Component {
    state = {
      number : 10,
	  currentAddress : "",
	  acceptAnswer: this.acceptAnswer.bind(this),
      username: "",
      setUserName: this.setUserName.bind(this),
      handleChangeName: this.handleChangeName.bind(this),
      contracts: {},
	  ContractInstance: {},
	  isLoading: false,
	  logged: false,
	  filteredBy: "all",
	  players: [],
	  puzzleAccepted: "",
	  puzzleAssigned: "",
	  answer: "",
	  stopPropagation: function(e){ e.stopPropagation();},
	  submitAnswer: this.submitAnswer.bind(this),
	  handleChangeAnswer: this.handleChangeAnswer.bind(this),
	  handleFilterChange: this.handleFilterChange.bind(this),
	  createNewChallenge: this.createNewChallenge.bind(this),
	  handleFormChange: this.handleFormChange.bind(this),
	  newQuestionData: {assignedTo: "", question: "", answer: "", willPay:"", willAccept:""},
	  puzzles: [{id: 0, backChild: <p>Back</p>, frontChild: <p>Front</p>, isFlipped: true, toggle: this.toggle.bind(this) }]
    }

    constructor(props){
        super(props); 
    }

	toggle(id, e){
		const puzzles = this.state.puzzles;
		if (puzzles[id].isFlipped){
			puzzles[id].isFlipped = false;
		} else {
			puzzles[id].isFlipped = true;
		}
		
		this.setState({ 
		puzzles,
		});
	}

    handleChangeName(e) {
        this.setState({username: e.target.value});  
	}

	handleChangeAnswer(e) {
		e.preventDefault();
        this.setState({answer: e.target.value});  
	}
	
	handleFilterChange(e){
		this.setState({filteredBy: e.target.value}); 
	}

	handleFormChange(e){
		let newQuestionData = Object.assign({}, this.state.newQuestionData); 
		newQuestionData[e.target.id] = e.target.value;
		this.setState({ newQuestionData }); 
	}

	async submitAnswer(id, e){
		e.stopPropagation();
		this.state.ContractInstance.methods.checksAnswer(window.web3.utils.fromAscii(this.state.answer, 32), id)
		.estimateGas(res => 
				{ 
					console.log(res); 
					return res;}
			)
		
		//.estimateGas(res => 
		//	{ console.log(res); return res;},  {gas: 999999999}
		//)
		//.send({from: this.state.currentAddress, gas: 900000})
		//.then(response => {
		//	console.log(response);
		//  })
	}

	async createNewChallenge(){
		//bytes32 _question, string _answer, uint _willPay, uint _willAccept, address _to
		var _question = window.web3.utils.fromAscii(this.state.newQuestionData.question, 32);
		var _answer = window.web3.utils.fromAscii(this.state.newQuestionData.answer, 32);
		var _willPay = this.state.newQuestionData.willPay;
		var _willAccept = this.state.newQuestionData.willAccept;
		var _address_to = this.state.newQuestionData.assignedTo;

		this.state.ContractInstance.methods.registerQuestion(_question,_answer, _willPay, _willAccept, _address_to)
		.send({from: this.state.currentAddress})
		.then(response => {
			console.log(response);
		  })
	}

	async acceptAnswer(id){
		this.state.ContractInstance.methods.acceptQuestion(id)
		.send({from: this.state.currentAddress})
		.then(response => {
			console.log(response);
		  })
	}


    setUserName(e) {
            if (e.key === 'Enter' || e.type === 'click') {
				console.log('do validate');
				this.setState({isLoading: true});
				this.state.ContractInstance.methods.registerUser(window.web3.utils.fromAscii(this.state.username, 32))
				.send({from: this.state.currentAddress})
				.then( res => { 
					this.setState({isLoading: false});
					console.log(res + "God");
				});
			
            }  
    }

    async viewUserName(){
      this.state.ContractInstance.methods.viewUserName().call().then(name => {
		this.setState({username: window.web3.utils.toAscii(name), logged: true}); 
		this.getGameData();
      }).catch( error => console.log(error));
	}
	
	async getGameData(){
		var me = this.state.currentAddress;
		this.state.ContractInstance.methods.getListOfPlayers().call().then(players => {
		  players.splice(players.indexOf(me), 1);
		  this.setState({players: players}); 
		}).catch( error => console.log(error));

		this.state.ContractInstance.methods.getUserQuestions().call().then(response => {

			var userPuzzles = [];

			var questions = response[0];
			var assignedTos = response[1];
			var ttls = response[2];
			var statuses = response[3];
			var willPays = response[4];
			var willAccepts = response[5];

			questions.forEach((element, i) => {
				userPuzzles.push({
					id: i,
					question: window.web3.utils.toAscii(element),
					assignedTo: assignedTos[i],
					ttl: new Date(ttls[i]),
					status: statuses[i],
					willPay: willPays[i],
					willAccept: willAccepts[i],
					isFlipped: false,
					toggle: this.toggle.bind(this),
				});
			});

			//{id: 0, backChild: <p>Back</p>, frontChild: , isFlipped: true, toggle: this.toggle.bind(this) }

			this.setState({puzzles: userPuzzles}); 
		  }).catch( error => console.log(error));
	}

	puzzledAcceptedBy = (error,response) => {
		this.setState({puzzleAccepted: response.address});
	}

	puzzledAssignedTo = (error,response) => {
		this.setState({puzzleAssigned: response.address});
	}

    componentDidMount() {


		if(typeof window.web3 != 'undefined'){
			console.log("Using web3 detected from external source like Metamask");
			window.web3 = new Web3(window.web3.currentProvider);
			console.log(window.web3.givenProvider);
			
		}else{
		   // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
		   window.web3 = new Web3('https://ropsten.infura.io/rGBNYSwK03htkd9ZYRkR');
		
		}
      


		window.web3.eth.getAccounts().then( currentAddress => { 
         const options = {
            from: currentAddress[0], // default from address
            //gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
		}

         this.setState({currentAddress:currentAddress[0]}); 
		 console.log(currentAddress[0]); 
		 console.log(window.web3.eth.defaultAccount);

         const MyContract = new window.web3.eth.Contract(ABI, ADDRESS, options);
		 this.setState({ContractInstance:MyContract}); 
		 

		const MyWebSocketContract = new web3Infura.eth.Contract(ABI, ADDRESS, options);
		MyWebSocketContract.events.PuzzledAcceptedBy({fromBlock: 0}, this.puzzledAcceptedBy);
		MyWebSocketContract.events.PuzzledAssignedTo({fromBlock: 0}, this.puzzledAssignedTo); 

		// var subscription = web3Infura.eth.subscribe('logs', {
		// 	address: ADDRESS,
		// 	topics: [ADDRESS]
		// }, function(error, result){
		// 	if (!error)
		// 		console.log(result);
		// })
		// .on("data", function(log){
		// 	console.log(log);
		// })
		// .on("changed", function(log){
		// });

         this.viewUserName();

         });    
         
    }
    render() {
      return (<AppContext.Provider value={this.state}>
      {this.props.children}
      </AppContext.Provider>)
    }
  }

  export default AppProvider;