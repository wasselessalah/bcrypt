exports.helloUser=async(req,res)=>{
  res.status(200).json({ message: "hello user " });
}



exports.helloUserAdmin=async(req,res)=>{
  res.status(200).json({ message: "hello Admin " });
}