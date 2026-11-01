const logger = (req,res,next) =>{
    const zaman = new Date().toLocaleString('tr-TR');
    console.log(`[${zaman}] ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = logger;