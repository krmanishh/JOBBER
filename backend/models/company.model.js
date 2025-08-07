import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  
  name:{
    type: String,
    required: true,
    unqiue: true,
  },
  description:{
    type: String,
  },
  website:{
    type: String,
  },
  location:{
    type: String,
  },
  logo:{
    type: String,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  }
}, {timpestaps: true})

export const Company = mongoose.model("Company", companySchema);