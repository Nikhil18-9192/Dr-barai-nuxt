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
const AddPrescriptionValidation = (data) => {
  const formSchema = Joi.object({
    selectedDrug: Joi.string().min(3).max(50).label('Drugs').required(),
    dosageFrequency: Joi.string()
      .min(3)
      .max(50)
      .label('Dosage & Frequency')
      .required(),
    intake: Joi.string().min(3).max(250).label('Intake Instruction').required(),
    duration: Joi.number().label('Duration').required(),
  }).required()

  return formSchema.validate(data)
}
const AddVitalSignValidation = (data) => {
  const formSchema = Joi.object({
    weight: Joi.number().label('Weight').required(),
    systolic: Joi.number().label('systolic').required(),
    diastolic: Joi.number().label('diastolic').required(),
    temperature: Joi.number().label('temperature').required(),
    respiration: Joi.number().label('respiration').required(),
  }).required()

  return formSchema.validate(data)
}
const ClinicalNotesValidation = (data) => {
  const formSchema = Joi.object({
    complaints: Joi.string().min(3).max(250).label('complaints').required(),
    observations: Joi.string().min(3).max(250).label('observations').required(),
    diagnoses: Joi.string().min(3).max(250).label('diagnoses').required(),
    notes: Joi.string().min(3).max(250).label('notes').required(),
  }).required()

  return formSchema.validate(data)
}

export {
  AddPatientValidation,
  AddPrescriptionValidation,
  AddVitalSignValidation,
  ClinicalNotesValidation,
}
