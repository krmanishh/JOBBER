import { Job } from "../models/job.model";

export const postJob = async(req, res) => {
  try {
    const {title, description, requirements, salary, location, experince, position, companyId} = req.body();

    const userId = req.id;

    if(!title || !description || !requirements || !salary, !location || !experince || !position || !companyId){
      return res.status(400).json({
        message:"Some data is missing while posting the job.",
        success: false,
      })
    }

    const job = await Job.create({
      title, 
      description,
      requirements: requirements.split(","),
      location,
      jobType,
      experienceLevel: experince,
      position,
      company: companyId,
      created_by: userId,
    })

    return res.status(200).json({
      message:"New Job Created Successfully",
      job,
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"Error in posting the Job.",
      success: false,
    })
  }
}

const getAllJobs = async(req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or:[
        {title: {$regex: keyword,$options:"i"}},
        {description: {$regex: keyword, $options:"i"}},
      ]
    };
    const jobs = await Job.find(query);
    if(!jobs){
      return res.status(404).json({
        message:"Job Not Found",
        success: false,
      })
    }
    return res.status(200).json({
      jobs,
      success: true
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in fetching all the jobs.",
      success:false
    })
  }
}