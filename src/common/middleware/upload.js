
import multer from 'multer'

export const Upload=(file)=>{
    let storage= multer.diskStorage({
        destination:function (req,file,cb){
            console.log(file)
           cb(null,'upload')
        },
        filename:function (req,file,cb){
             const uniqueSuffix =Date.now()+"-"+Math.round(Math.random()*100)+"-"+file.originalname
             cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })
     return multer({storage})
}