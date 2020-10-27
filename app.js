const express = require('express')
const {TemplateEngine} = require('thymeleaf')
 
let templateEngine = new TemplateEngine();

const PORT = 8500

const app = express();

app.get('/*', (req, res)=>{
    if (req.path.endsWith('.html')) {
        // Render template from file
        let arg = {}
        if (req.query && req.query.arg) {
            try {
                arg = JSON.parse(req.query.arg)
            } catch(e){}
        }
        console.log('...arg', arg)
        templateEngine.processFile('./template' + req.path, arg).then(result => {
            // Do something with the result...
            res.end(result)
        });
    }
    else {
        res.end('error')
    }
})


app.listen(PORT);
console.log('....server start on ' + PORT)