const router = require('express').Router()

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')
const cloudinary = require('cloudinary')
const cloudinary2 = require('../cloudinary');
const Products = require('../models/productModel')


//test

// Upload image only admin can use
router.post('/uploadmany/:id',auth,authAdmin, async(req, res) =>{
    const urls =[]
    const uploader = async (path) =>await cloudinary2.uploads(path,"minishop")
    
    try {

        //console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})
        
        const files = req.files.files;
        //console.log(files)
        /*if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result)=>{
            if(err) throw err;

            removeTmp(file.tempFilePath)

            res.json({public_id: result.public_id, url: result.secure_url})
        })*/

      /*  for(const file of files){
        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result)=>{
            if(err) throw err;
         
          urls.push(result) 
        })
        console.log(urls)
        }*/
        
       
      /* var files = req.files.files
       console.log(files) */ 
      for (const file of files) {
          //  const  {path}  = file;
            const newPath =  uploader(file.tempFilePath)
            newPath.then(async function(result){
               // urls.push(result)
              //  res.json(urls)
                await Products.findOneAndUpdate({product_id:req.params.id},{
                    $push: {images:result}
                })
            })
            
            fs.unlinkSync(file.tempFilePath)
          //  console.log(file.tempFilePath)
          }
          res.json({data:"OK"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// Delete image only admin can use
router.post('/destroy',auth , authAdmin, (req, res) =>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: 'No images Selected'})
        console.log(public_id)
        cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if(err) throw err;

            res.json({msg: "Deleted Image"})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})

router.get('/getimg/:id',async(req,res)=>{
    try{
       console.log(req.params.id)
        const product = await Products.find({_id:req.params.id})
      console.log(product[0].images)
       res.json({data:product[0].images})
    
    }catch{

    }
})


router.post('/upload',auth , authAdmin, (req, res) =>{
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})
        
        const file = req.files.file;
        if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result)=>{
            if(err) throw err;

            removeTmp(file.tempFilePath)

            res.json({public_id: result.public_id, url: result.secure_url})
        })


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})



const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

module.exports = router