var express = require('express');
var passport = require('passport');
var router = express.Router();
var server = require("http").Server(router);

//Models
var User = require('../models/user');
var Game = require("../models/game").game;
var Player = require("../models/player").player;
var Round = require("../models/round").round;
var Card = require("../models/card").card;
var StateMachine = require("../node_modules/javascript-state-machine/state-machine.js");

var util = require('util'); //Esta librería la uso para mostrar algunas cosas
//con nsc obtengo la sesion del jugador conectado, nsc = nombre de sesion corriente

/* GET home page. */
router.get('/', function (req, res){
  var game = new Game();
  res.render('index', { user : req.user });
});

/* GET register page.*/
router.get('/register', function(req, res) {
    res.render('register', { });
});

/* POST register page */
router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        passport.authenticate('local')(req, res, function () {
        res.redirect('/');
        });
    });
});

/* GET login page. */
router.get('/login', function(req, res) {
    //var nsc = req.session.passport.user;
    //console.log(nsc);
    res.render('login', { user : req.user });

});

/* POST login page. */
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

/* GET logout page. */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/* GET host page. */
router.get('/host',function(req,res){
    res.render('host', { });
});


/* POST host page. */
router.post('/host', function(req,res){    
  var p1 = new Player (req.session.passport.user);
  var g = new Game ({name : req.body.GameName, player1 : p1});

  g.save(function (err, game){
    if(err){
      console.log(err);
    }  
    console.log(game._id);
    res.redirect('/espera?gameid=' + game._id);
<<<<<<< HEAD
  });
});

/* GET lobby page */
router.get('/lobby', function(req,res){
    Game.find(function(err,game){
    //for (var i = game.length - 1; i >= 0; i--) 
      //console.log(game[i]["name"]);
      //console.log(game.length);
    if (err)
      console.log(err);
    else
      res.render('lobby', {g : game});
  });  
});

/* POST lobby page */
router.post('/lobby/:id', function(req,res){
  Game.findOne({_id: req.params.id},function(err,game){
    if (err)
      console.log(err);
    var p2 = new Player (req.session.passport.user);
    game.player2 = p2;
    game.currentHand = p2;
    game.save(function(err,game){
      res.redirect ('/espera?gameid=' + req.params.id);
    });
  });
});

=======
  });
});

/* GET lobby page */
router.get('/lobby', function(req,res){
    Game.find(function(err,game){
    //for (var i = game.length - 1; i >= 0; i--) 
      //console.log(game[i]["name"]);
      //console.log(game.length);
    if (err)
      console.log(err);
    else
      res.render('lobby', {g : game});
  });  
});

/* POST lobby page */
router.post('/lobby', function(req,res){
  Game.findOne({_id: req.body.gameid},function(err,game){
    var p2 = new Player (req.session.passport.user);
    //Aca esta el problema dani, porque esta guardando el player2 pero no se como resolverlo, yo tampoco. Lo que se me ocurre a priori es ir viendo como hacer para esos botones asociarles un campo o un parametro es conocer un poquito de htm nada mas y ya estaria, porque de esa manera no tendriamos que verlo tan abstracto , bueno, éro cucha, de ultima lo vemos esta noche, ahora subi lo que hay, con la base de datos eliminada y toda la onda queres? Dale pero pasame el y haceme manejar tu tterminal jaja dale dale ahi te paso pero primero pasame el rar
    //para descomprimirlo. Mandamelo por fave
    
    game.player2 = p2;
    console.log(game.player2.name);
    game.currentHand = p2;
    game.save(function(err,game){
      console.log(game.player2.name);
      res.redirect ('/espera?gameid=' + req.body.gameid);
    });
    //Game.update({ _id: req.body.gameid[2]}, { $set :{player2 : p2, currentHand : p2}},function (err,resultado){     
    });
});

>>>>>>> branchforwebsocket
/* GET espera page */
router.get('/espera', function(req,res){
  Game.findOne({_id:req.query.gameid},function(err,game){
    res.render('espera',{g : game, usuario : req.session.passport.user});          
  });
});  

/* POST espera page */
router.post('/espera', function(req,res){
	Game.findOne({_id:req.body.gameid},function(err,game){
    	if (req.session.passport.user==game.player1.name){
        	if (req.body.accion == 'Actualizar') 
				res.redirect('/espera?gameid=' + game._id); 
    	    if (req.body.accion == 'Iniciar partida'){
     			game.newRound();
	        	game.save(function(err,game){
	        		res.redirect('/play?gameid=' + game._id); 
	        	});
			}
		}    	
		else{
	        if (req.body.accion == 'Actualizar')
	        	res.redirect('/espera?gameid=' + game._id);         
			if (req.body.accion == 'Entrar')
				res.redirect('/play?gameid=' + game._id); 
		}    
	});
});  


/* GET play page. */
router.get('/play',function(req,res){
  console.log('VENIMOS BIEN !');
  var g = Game.findOne({_id:req.query.gameid},function(err,game){
    if (err)
<<<<<<< HEAD
        console.log(err);  
=======
        console.log(err);
    console.log(game.player1.name);
    console.log(game.player2.name);  
>>>>>>> branchforwebsocket
    var currentRound = game.currentRound;
    var r = game.currentRound;
    r.__proto__ = Round.prototype;    
    r.fsm = r.newTrucoFSM(r.fsm.current);
    console.log('--------------');
    console.log(game.currentRound.currentTurn.name);
    console.log(req.session.passport.user);
    console.log('--------------');
    console.log('Este es el jugador 1: '+ game.player1.name);
    console.log('Este es el jugador 2: '+ game.player2.name);
    console.log('--------------');
    res.render('play', {g : game, usuario : req.session.passport.user});	        
    ////console.log(util.inspect(game, {showHidden: false, depth: 12}));
	
  });
}); 



/* POST play page. */
router.post('/play', function(req,res){
	////console.log("Hola, estoy dentro del post de play");
	Game.findOne({_id:req.body.gameid},function(err,game){
<<<<<<< HEAD
		console.log(req.body.accion);
=======
<<<<<<< HEAD
		console.log('ACA ESTOY');
		io.on('connection', function(socket){
			console.log('Esta conectado el socket');
  			socket.on('jugada', function(data){	
    				location.reload();
  			});
		});        	
>>>>>>> 1e664068d0134e7b22854ef91ae209742312b07a
		var currentRound = game.currentRound;
    	var r = game.currentRound;
    	r.__proto__ = Round.prototype;    
    	r.fsm = r.newTrucoFSM(r.fsm.current);
		if (game.currentRound.hayGanador(r.fsm.current,game) == true){
			res.redirect ('/finRonda?gameid=' + game._id);
		}		
		if ((game.score[0] >= 6) || (game.score[1] >= 6))
			res.redirect('/exit?gameid=' + game._id);		 		
		else{
			if (req.body.accion !== 'Jugar carta 1' && req.body.accion !== 'Jugar carta 2' && req.body.accion !== 'Jugar carta 3'){
				if (req.body.accion == 'Truco'){					
					game.play(r.currentTurn,'truco');
				}
				if (req.body.accion == 'Envido'){
					game.play(r.currentTurn,'envido');
				}
				if (req.body.accion == 'Quiero'){
					game.play(r.currentTurn,'quiero');
				}
				if (req.body.accion == 'No-quiero'){
					game.play(r.currentTurn,'no-quiero');	
				}	
				if (req.body.accion == 'Re-Truco'){
					game.play(r.currentTurn,'retruco');
				}
				if (req.body.accion == 'Vale-4'){
					game.play(r.currentTurn,'vale4');	
				}	
				if (req.body.accion == 'Reviro-Envido'){
					game.play(r.currentTurn,'envido-envido');
				}
				if (req.body.accion == 'Real-Envido'){
					game.play(r.currentTurn,'realenvido');	
				}	
				if (req.body.accion == 'Falta-Envido'){
					game.play(r.currentTurn,'faltaenvido');
				}
		}
			else{			
				if (req.body.accion == 'Jugar carta 1')
      					game.play(r.currentTurn,'playcard',r.currentTurn.cards[0]);	
    				if (req.body.accion == 'Jugar carta 2')
      					game.play(r.currentTurn,'playcard',r.currentTurn.cards[1]);   
    				if (req.body.accion == 'Jugar carta 3')
      					game.play(r.currentTurn,'playcard',r.currentTurn.cards[2]);   
<<<<<<< HEAD
    			}
			console.log(game.currentRound.player1.cards);
    			console.log(game.currentRound.player2.cards);
			if (game.currentRound.hayGanador(r.fsm.current,game) == true){
				game.score[0] += game.currentRound.score[0];					
				game.score[1] += game.currentRound.score[1];
				if ((game.score[0] >= 6) || (game.score[1] >= 6))
					Game.update({ _id: game._id }, { $set :{score : game.score, currentRound:r}},function (err,resultado){	 		
						res.redirect ('/exit?gameid=' + game._id);
        				});		 		
			    else
				Game.update({ _id: game._id }, { $set :{score : game.score, currentRound:r}},function (err,resultado){	 
				    res.redirect ('/finRonda?gameid=' + game._id);
        		});
			}else							
				Game.update({ _id: game._id }, { $set :{score : game.score, currentRound:r}},function (err,resultado){    
					console.log('Volviendo al play');						
					res.redirect('/play?gameid=' + game._id);
				});                				
		}		
=======
    				}
				console.log(game.currentRound.player1.cards);
    				console.log(game.currentRound.player2.cards);
				if (game.currentRound.hayGanador(r.fsm.current,game) == true){
=======
        var currentRound = game.currentRound;
    		var r = game.currentRound;
    		r.__proto__ = Round.prototype;    
    		r.fsm = r.newTrucoFSM(r.fsm.current);
    	//console.log(r.fsm.transitions());
        //console.log(r.fsm);
        //game.currentRound.fsm = game.currentRound.newTrucoFSM();
		if(err){
		    //console.log("Aca tenemos el error de recursividad.");
      		//console.log(err);
        	}
        //Game.hydrate(game.currentRound); 
        //console.log(r.fsm);
		//console.log(r);
		//console.log(r.currentTurn);
		//console.log('Mostrando los puntos del jueoOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO: ');
		//console.log(game.score);
			if ((game.score[0] >= 6) || (game.score[1] >= 6)){
				res.redirect('/exit?gameid=' + game._id);		 		
			}
			else{
			////console.log('Estoy dentro del juego');
      			////console.log(game.currentRound.fsm.cannot('truco'));
				////console.log(req.body.accion);
				//console.log(game.currentRound.fsm.current);
				if (req.body.accion !== 'Jugar carta 1' && req.body.accion !== 'Jugar carta 2' && req.body.accion !== 'Jugar carta 3'){
					if (req.body.accion == 'Truco'){
						game.play(r.currentTurn,'truco');
					}
					if (req.body.accion == 'Envido'){
						game.play(r.currentTurn,'envido');
					}

					if (req.body.accion == 'Quiero'){
						game.play(r.currentTurn,'quiero');
					}
					if (req.body.accion == 'No-quiero'){
						game.play(r.currentTurn,'no-quiero');	
					}	
					if (req.body.accion == 'Re-Truco'){
						game.play(r.currentTurn,'retruco');
					}
					if (req.body.accion == 'Vale-4'){
						game.play(r.currentTurn,'vale4');	
					}	
					if (req.body.accion == 'Reviro-Envido'){
						game.play(r.currentTurn,'envido-envido');
					}
					if (req.body.accion == 'Real-Envido'){
						game.play(r.currentTurn,'realenvido');	
					}	
					if (req.body.accion == 'Falta-Envido'){
						game.play(r.currentTurn,'faltaenvido');
					}
				}
				else{			
					if (req.body.accion == 'Jugar carta 1'){
      						game.play(r.currentTurn,'playcard',r.currentTurn.cards[0]);	
    					}
    					if (req.body.accion == 'Jugar carta 2'){
      						game.play(r.currentTurn,'playcard',r.currentTurn.cards[1]);   
    					}
    					if (req.body.accion == 'Jugar carta 3'){
      						game.play(r.currentTurn,'playcard',r.currentTurn.cards[2]);   
    					}
				}
					if (game.currentRound.hayGanador(r.fsm.current,game) == true){
>>>>>>> branchforwebsocket
					game.score[0] += game.currentRound.score[0];					
					game.score[1] += game.currentRound.score[1];
					if ((game.score[0] >= 6) || (game.score[1] >= 6))
						Game.update({ _id: game._id }, { $set :{score : game.score, currentRound:r}},function (err,resultado){	 
				        	//console.log(game.score);   			
							res.redirect ('/exit?gameid=' + game._id);
        					});		 		
<<<<<<< HEAD
			      		else
						Game.update({ _id: game._id }, { $set :{score : game.score, currentRound:r}},function (err,resultado){	 
							res.redirect ('/finRonda?gameid=' + game._id);
=======
			      				else{
						Game.update({ _id: game._id }, { $set :{score : game.score, currentRound:r}},function (err,resultado){	 
						res.redirect ('/finRonda?gameid=' + game._id);
>>>>>>> branchforwebsocket
        					});
				}else							
					Game.update({ _id: game._id }, { $set :{score : game.score ,currentRound:r}},function (err,resultado){    
						res.redirect('/play?gameid=' + game._id);
					});                	
			}			
		}		//done();
>>>>>>> 1e664068d0134e7b22854ef91ae209742312b07a
	});  
});


router.get('/finRonda',function(req,res){
	var g = Game.findOne({_id:req.query.gameid},function(err,game){
    	if (err)
     	   console.log(err);
    	var currentRound = game.currentRound;
    	var r = game.currentRound;
    	r.__proto__ = Round.prototype;    
    	r.fsm = r.newTrucoFSM(r.fsm.current);
		res.render('finRonda', {g : game});
	});
});

router.post('/finRonda', function(req,res){
	var g = Game.findOne({_id:req.body.gameid},function(err,game){
    	if (err)
			console.log(err);
		game.newRound();		
		var currentRound = game.currentRound;
    	var r = game.currentRound;
    	r.__proto__ = Round.prototype;    
    	r.fsm = r.newTrucoFSM(r.fsm.current);
		
		Game.update({ _id: game._id }, { $set :{score : game.score, currentRound:r}},function (err,res){
			if (err)
				console.log(err);		
		});  
		res.redirect('/play?gameid=' + game._id); 
	});
	
});

//GET resultadogame
router.get('/exit', function(req,res){
    var g = Game.findOne({_id:req.query.gameid},function(err,game){
        if (err){
            console.log(err);
        }
        res.render('exit',{g:game});
    });
});

//POST resultadogame
router.post('/exit', function(req,res){
        res.redirect('/'); //lo llevo de nuevo al inicio
});  




module.exports = router;
