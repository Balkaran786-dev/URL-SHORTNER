//we can also use classes here to make the structure more scalable and flexible, especially in object oriented applications.


import { generateNanoID } from "../utils/helper.js";
import urlSchema from "../models/shortUrl.model.js";
import { getCustomShorturl, saveShortUrl } from "../dao/shortUrl.js";


export const createShortUrlWithoutUser = async (url)=>{
    const shorturl =  generateNanoID(7)
    if(!shorturl) throw new Error("Short URL not generated")
    await saveShortUrl(shorturl,url)
    return shorturl
} 


export const createShortUrlWithUser = async (url,userId,slug=null)=>{
    const shorturl = slug || generateNanoID(7)
    const exists = await getCustomShorturl(slug)
    if(exists) throw new Error("this custom url already exists")

    await saveShortUrl(shorturl,url,userId)
    return shorturl
} 