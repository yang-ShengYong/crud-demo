var fs = require('fs')
var Student = require('./students')

//express提供了
var express = require('express')

var router = express.Router()

router.get('/', function (req, res) {
  Student.find(function (err, students) {
    if (err) {
      return res.status(500).send('server error')
    }
    res.render('index.html', {
      fruits: [
        '梨子',
        '瓜子',
        '桃子',
        '西瓜'
      ],
      //从文件中读取的数据一定是字符串，所有得用JSON.parse()
      students: students
    })
  })
})

router.get('/students', function (req, res) {
  Student.find(function (err, students) {
    if (err) {
      return res.status(500).send('server error')
    }
    res.render('index.html', {
      fruits: [
        '梨子',
        '瓜子',
        '桃子',
        '西瓜'
      ],
      //从文件中读取的数据一定是字符串，所有得用JSON.parse()
      students: students
    })
  })
})

router.get('/students/new', function (req, res) {
  res.render('new.html')
})

router.post('/students/new', function (req, res) {
  //1、获取数据
  var student = req.body
  //2、处理
  //  保存到db.json
  Student.save(student, function (err) {
    if (err) {
      return res.status(500).send('server error')
    }
    //3、发送响应
    res.redirect('/students')
  })
})

router.get('/students/edit', function (req, res) {
  Student.findById(parseInt(req.query.id), function (err, student) {
    if (err) {
      return res.status(500).send('server error')
    }
    res.render('edit.html', {
      student : student
    })
  })
})

router.post('/students/edit', function (req, res) {
  Student.updateById(req.body, function (err) {
    if (err) {
      return res.status(500).send('server error')
    }
    res.redirect('/students')
  })
})

router.get('/students/delete', function (req, res) {
  Student.deleteById(req.query.id, function (err) {
    if (err) {
      return res.status(500).send('server error')
    }
    res.redirect('/students')
  })
})

module.exports = router

// 这样也很麻烦
// module.exports = function (app) {
//   app.get('/', function (req, res) {
//     //readFile第二个参数可选,跟data.toString()效果一样
//     fs.readFile('./db.json', 'utf8', function (err, data) {
//       if (err) {
//         return res.status(500).send('server error')
//       }
//       res.render('index.html', {
//         fruits : [
//           '梨子',
//           '瓜子',
//           '桃子',
//           '西瓜'
//         ],
//         //从文件中读取的数据一定是字符串，所有得用JSON.parse()
//         students : JSON.parse(data).students
//       })
//     })

//   })
// }
