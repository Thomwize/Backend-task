const path = require('path')
const fs = require('fs')
const http = require('http')
const port = 5000
const server = http.createServer((request , response) =>{
  //creating a dynamic file path
    let filePath = path.join(__dirname, 'website', request.url === '/' ? 'index.html': request.url)
    //creating a dynamic file type
    let contentType = getType(filePath) || 'text/html'

  //creating an error page to make room for error
  let errorPagePath = path.join(__dirname, 'website', '404.html')
  //reading whichever of the files
    fs.readFile(filePath, 'utf8', (err, data)=>{
      //lets catch errors and send a message
      if(err){
        if(err.code ==='ENOENT'){
          //ENOENT is the error code if file cannot be read
          //now we want to load the 404 page in the path declared above
          fs.readFile(errorPagePath, 'utf8', (err,data) =>{
            response.writeHead(200, {'Content-Type': contentType})
            response.end(data)
          })
          
        }
        else{
          response.writeHead(500)
          response.end('A server error has occured')
        }
      }

      //if no error(that is, we can alse use else)
      if(!err){
        response.writeHead(200, {'Content-Type': contentType} )
        response.end(data)
      }
    })
})

//defining that function
function getType(filePath) {
    let extname = path.extname(filePath)
    if (extname === '.js') {
        return 'text/javascript'
    }
    if (extname === '.css') {
        return 'text/css'
    }
    if (extname === '.png') {
        return 'image/png'
    }
    if (extname === '.jpg') {
        return 'image/jpg'
    }
}
server.listen(port, ()=>{
  console.log('server is delivering')
})