var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var ProgramingSkillSchema = new Schema({
    programingSkillName: {
        type: String,
        required: [true, 'Programming skill is required']
    },
    describe: {
        type: String,
        required: [true, 'Description is required']
    }
   
});
var programingSkillModel = mongoose.model('programmingSkillModel', ProgramingSkillSchema);

router.get('/proskills', function(res,req){
      programingSkillModel.find({},).then(function(skills){
            res.json(skills);
      }).catch(next)
});

router.post('/skill', function(req,res){
    programingSkillModel.create(req.body).then(function(skill){
     res.json(skill);
    }).catch(next);
});
router.delete('/skill/:skill', function(req,res){
   programingSkillModel.findOneAndDelete({programingSkillName: req.params.skill}).then(function(skill){
       res.json(skill);
   }).catch(next);
});
router.put('/skill/:skill', function(req,res){
 programingSkillModel.findOneAndUpdate({programingSkillName: req.params.skill},req.body).then(function(){
     programingSkillModel.findOne({programingSkillName: req.params.skill}).then(function(skill){
         res.json(skill);
     }).catch(next);
 });
});

app.use('/api', router);

app.use(function(err,req,res,next){
    res.satus(422).send(err.message);
});

app.listen(port);