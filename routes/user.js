var models = require('../models');
var User = models.User;
var Day = models.Day;
var Task = models.Task;

exports.login = function(req, res){
  res.render("login", {'title':'Please Log In'});
};

function findGifs(taskArrayLen) {
  var gifs = [];
  var dinos = ['http://www.deviantart.com/download/200757449/dinosaur_gif_by_katetale-d3bixft.gif', 'http://24.media.tumblr.com/tumblr_lw067mFA4K1r81qhto1_400.gif', 'http://25.media.tumblr.com/tumblr_m0ix1zifQF1robyh3o1_500.gif', 'http://bestanimations.com/Animals/Reptiles/Dinosaurs/Dinosaur-01-june.gif', 'http://i595.photobucket.com/albums/tt34/devil_imp101/dinosaur.gif', 'http://vuweb.net/htmlzone/otter/anigrndinosaur3.gif', 'http://bestanimations.com/Animals/Reptiles/Dinosaurs/Dinosaur-03-june.gif', 'http://24.media.tumblr.com/tumblr_m1kvp55znK1r3gew4o1_500.gif', 'http://25.media.tumblr.com/tumblr_liatjh2M1A1qc5i7ro1_250.gif', 'http://24.media.tumblr.com/tumblr_m1euimBWvs1qbbs8oo1_500.gif', 'http://25.media.tumblr.com/tumblr_m45xv6NlPS1rpb68co1_250.gif', 'http://25.media.tumblr.com/tumblr_m3omhxjIZX1qk64f9o1_500.gif', 'http://25.media.tumblr.com/41a26138893d0789d0f18c5d84c5d148/tumblr_mi1h9jKXmg1rcb0yzo1_250.gif', 'http://25.media.tumblr.com/tumblr_m9wj100gUT1rwvpnfo1_500.gif', 'http://24.media.tumblr.com/tumblr_luqskuGhSF1r6aoq4o1_500.gif', 'http://25.media.tumblr.com/tumblr_mcb7sqhUqj1rdz5p2o2_500.gif', 'http://24.media.tumblr.com/5bb397e589aecd4c82ff6842efcbd140/tumblr_mhovz0bxdL1r93xiko1_500.gif', 'http://25.media.tumblr.com/tumblr_lpdjp0ZxJT1qigb37o1_500.gif'];
  for (var i = 0; i < taskArrayLen; i++) {
    var rnum = Math.floor(Math.random() * dinos.length);
        gifs.push(dinos[rnum]);
    //gifs.push('http://24.media.tumblr.com/tumblr_lw067mFA4K1r81qhto1_400.gif');
    //gifs.push('http://www.gifbin.com/random.gif');
  }
  return gifs;
}

exports.toDoList = function(req, res){
  if (!req.session.user) {
    res.redirect('/login');
  }
  else {
    // show user's todo items
    //console.log(req.session.user);
    //res.render("todolist", {'title':"Hello " + req.session.user.username + '!', user:req.session.user, giflist:findGifs(req.session.user.taskList)});
    res.render("todolist", {'title':"Hello " + req.session.user.username + '!   ', user:req.session.user});
  }
}

function makeDays() {
  var days = [];
  var dates = ["Monday 2/18", "Tuesday 2/19", "Wednesday 2/20", "Thursday 2/21", "Friday 2/22", "Saturday 2/23", "Sunday 2/24"];
  console.log(dates);
  for (var i = 0; i < dates.length; i++) {
    var newDay = new Day({'date':dates[i], 'tasklist':[]});
    console.log(newDay);
    days.push(newDay._id);
    newDay.save(function (err) {
      if (err) {
        return console.log(err);
      }
      //days.push(newDay._id);
      //days.push(newDay);
    });
  }
  console.log(days);
  return days;
}

exports.addTask = function(req, res) {
  var params = req.body;
  var newTaskList = [];
  var newGifList = [];
  var dinos = ['http://www.deviantart.com/download/200757449/dinosaur_gif_by_katetale-d3bixft.gif', 'http://24.media.tumblr.com/tumblr_lw067mFA4K1r81qhto1_400.gif', 'http://25.media.tumblr.com/tumblr_m0ix1zifQF1robyh3o1_500.gif', 'http://bestanimations.com/Animals/Reptiles/Dinosaurs/Dinosaur-01-june.gif', 'http://i595.photobucket.com/albums/tt34/devil_imp101/dinosaur.gif', 'http://vuweb.net/htmlzone/otter/anigrndinosaur3.gif', 'http://bestanimations.com/Animals/Reptiles/Dinosaurs/Dinosaur-03-june.gif', 'http://24.media.tumblr.com/tumblr_m1kvp55znK1r3gew4o1_500.gif', 'http://25.media.tumblr.com/tumblr_liatjh2M1A1qc5i7ro1_250.gif', 'http://24.media.tumblr.com/tumblr_m1euimBWvs1qbbs8oo1_500.gif', 'http://25.media.tumblr.com/tumblr_m45xv6NlPS1rpb68co1_250.gif', 'http://25.media.tumblr.com/tumblr_m3omhxjIZX1qk64f9o1_500.gif', 'http://25.media.tumblr.com/41a26138893d0789d0f18c5d84c5d148/tumblr_mi1h9jKXmg1rcb0yzo1_250.gif', 'http://25.media.tumblr.com/tumblr_m9wj100gUT1rwvpnfo1_500.gif', 'http://24.media.tumblr.com/tumblr_luqskuGhSF1r6aoq4o1_500.gif', 'http://25.media.tumblr.com/tumblr_mcb7sqhUqj1rdz5p2o2_500.gif', 'http://24.media.tumblr.com/5bb397e589aecd4c82ff6842efcbd140/tumblr_mhovz0bxdL1r93xiko1_500.gif', 'http://25.media.tumblr.com/tumblr_lpdjp0ZxJT1qigb37o1_500.gif'];
  //var oldTaskList = params['usertasks'];
  //currentUser = User.find({'username':params['username']}).exec(function(err, currentUser) {
    //console.log(currentUser);
    //var oldTaskList = currentUser.taskList;
    //console.log(req.session.user);
    var oldTaskList = req.session.user.taskList;
    var oldGifList = req.session.user.gifList;
    //console.log(oldTaskList);
    for (var i = 0; i < oldTaskList.length; i++) {
      newTaskList.push(oldTaskList[i]);
      newGifList.push(oldGifList[i])};
    //console.log(newTaskList);
    newTaskList.push(params['newtask']);
    var rnum = Math.floor(Math.random() * dinos.length);
    newGifList.push(dinos[rnum]);
    //console.log(newTaskList);
    User.update({'username':params['username']}, {'taskList':newTaskList, 'gifList':newGifList}, function (err) {
          if (err) {
            return console.log("error we couldn't save your new task and gif");
          } 
        })
    existingUser = User.find({'username':params['username']}).exec(function(err, existingUser) {
          req.session.user = existingUser[0];
          res.redirect("/");
        });
  //});
}

exports.completeTask = function(req, res) {
  var params = req.body;
  var index = req.session.user.taskList.indexOf(params['1']);
  var taskList = req.session.user.taskList;
  console.log(taskList);
  var gifList = req.session.user.gifList;
  taskList.splice(index, 1);
  console.log(taskList);
  gifList.splice(index, 1);
  User.update({'username':req.session.user.username}, {'taskList':taskList, 'gifList':gifList}, function (err) {
          if (err) {
            return console.log("error we couldn't delete your task and gif");
          } 
        })
    existingUser = User.find({'username':req.session.user.username}).exec(function(err, existingUser) {
          console.log(err);
          req.session.user = existingUser[0];
          //res.redirect("/");
        });

}

exports.postlogin = function(req, res){
  var params = req.body;
  //var task1 = new Task({'keyword':'hello world'})
  existingUser = User.find({'username':params['username']}).exec(function(err, existingUser) {
  	if (existingUser.length == 0) {
		var newUser = new User({'username':params['username'], 'color':params['color'], 'taskList':['go bananas!'], 'gifList':findGifs(1)}); //, 'dayList':makeDays()
	    newUser.save(function (err) {
        console.log(newUser);
	      if (err) {
          console.log(err);
	        return console.log("error we couldn't create your user");
	      };
      //   User.update({'username':params['username']}, {'dayList':makeDays()}, function (err) {
      //   if (err) {
      //     console.log("error we couldn't save your daylist");
      //   } 
      // })
	      req.session.user = newUser;
	      res.redirect("/");
	    });
	}
    else {
    	User.update({'username':params['username']}, {'color':params['color']}, function (err) {
    	  if (err) {
          return console.log("error we couldn't save your color");
   		  }	
    	})
    	existingUser = User.find({'username':params['username']}).exec(function(err, existingUser) {
    		req.session.user = existingUser[0];
    		res.redirect("/");
    	});
    }
  });
};

exports.destroy = function(req, res) {
  console.log(req.session);
  req.session.destroy();
  console.log(req.session);
  res.redirect('/login');
};