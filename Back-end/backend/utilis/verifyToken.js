import Jwt from "jsonwebtoken";
export const verifyToken = (req,res,next)=>{

    const token = req.cookies.accessToken

    if (!token) {
        return res.status(401).json({success:false,message:"Not authorized"})
    }
    // if token exists
    Jwt.verify(token,process.env.JWT_SECRET_KEY, (err, user )=>{
        if (err) {
            res.status(401).json({success:false,message:" token invalid"})
        }

        req.user =user
        next() 
        // don't forget to cll the next method
    })

}
export const verifyUser= (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if (req.user.id === req.params.id || req.user.role=== 'admin') {
            next()
        }else{
            return res.status(401).json({success:false,message:"You are not authenticated"})
        }
    })
}
export const verifyAdmin= (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if ( req.user.role=== 'admin') {
            next()
        }else{
            return res.status(401).json({success:false,message:"You are not authorized"})
        }
    })
}