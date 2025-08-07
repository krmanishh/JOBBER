import { Company } from "../models/company/model/js";


export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is missing.",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already registered.",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(200).json({
      message:"Company registeres successfully",
      success: true,
    })
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message:"Errort in registering the company",
      success: false,
    })
  }
};

export const getCompany = async(req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({userId});
    if(!companies){
      return res.status(404).json({
        message:"Comapnies not found",
        success: false,
      })
    }
  } catch (error) {
    console.log(error);
  }
}


export const getCompanyById = async(req, res) => {
try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if(!company){
      return res.status(404).json({
        message:"Company Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in fetching the company",
      success: false,
    });
  }
}

export const updateCompany = async(req, res) => {
  try {
    const {name, description, website, location} = req.body;

    const file = req.file;
    //cloudinary setup


    const updateData = {name, description,website, location};

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true})

    if(!company){
      return res.status(404).json({
        message:"Company not found",
        success: false,
      })
    }

    return res.status(200).json({
      message:"Message information Updtaed",
      success: true,
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"Error in updating the company",
      success: false,
    })
  }
}
