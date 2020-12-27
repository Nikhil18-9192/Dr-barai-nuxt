import Joi from 'joi'

const AddPatientValidation = (data) => {
  const formSchema = Joi.object({
    name: Joi.string().min(3).max(50).label('Patient Name').required(),
    mobile: Joi.number().min(10).label('Mobile Number').required(),
    email: Joi.string().label('Email').required(),
    gender: Joi.string().label('Gender').required(),
    birthDate: Joi.string().label('Birth Date').required(),
    address: Joi.string().max(120).label('Address').required(),
    pincode: Joi.string().max(6).label('Pincode').required(),
    city: Joi.string().label('City').required(),
  }).required()

  return formSchema.validate(data)
}

export { AddPatientValidation }
