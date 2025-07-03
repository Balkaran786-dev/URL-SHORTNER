import wrapAsync from "../utils/TryCatchWrapper.js";
import { getUserUrls } from "../dao/user.dao.js";

export const getAllUserUrls = wrapAsync(async (req, res) => {
  const {_id}= req.user;
  const urls = await getUserUrls(_id);
  res.status(200).json({message:"success", urls:urls });
});