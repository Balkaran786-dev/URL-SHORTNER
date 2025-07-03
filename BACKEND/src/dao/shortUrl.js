import urlSchema from "../models/shortUrl.model.js"
import { ConflictError } from "../utils/errorHandler.js";
export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try{
    const newUrl = new urlSchema({
    full_url: longUrl,
    short_url: shortUrl,
  });
  if (userId) { 
    newUrl.user = userId;
  }
  await newUrl.save();  //there is a great need to use await here otherwise error won't be handled properly by catch block.
  }
  catch(err){
    if(err.code == 11000){
      throw new ConflictError("Short URL already exists")
    }
    throw new Error(err)
  }
};

export const getShorturl = async (shortUrl)=>{
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}})
}

export const getCustomShorturl = async (slug)=>{
    return await urlSchema.findOne({short_url:slug}); 
}