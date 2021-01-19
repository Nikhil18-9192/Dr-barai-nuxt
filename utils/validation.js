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
    // selectedDrug: Joi.string().min(3).max(50).label('Drugs').required(),
    dosageFrequency: Joi.string().min(3).max(50).label('Dosage & Frequency'),
    intake: Joi.string().min(3).max(50).label('Intake'),
    duration: Joi.number().label('Duration'),
    instructions: Joi.string().min(3).max(250).label('Instruction'),
  }).required()

  return formSchema.validate(data)
}
const AddVitalSignValidation = (data) => {
  const formSchema = Joi.object({
    weight: Joi.number().label('Weight'),
    systolic: Joi.number().label('systolic'),
    diastolic: Joi.number().label('diastolic'),
    temperature: Joi.number().label('temperature'),
    respiration: Joi.number().label('respiration'),
    pulse: Joi.number().label('respiration'),
  }).required()

  return formSchema.validate(data)
}
const ClinicalNotesValidation = (data) => {
  const formSchema = Joi.object({
    complaints: Joi.string().min(3).max(250).label('complaints'),
    observations: Joi.string().min(3).max(250).label('observations'),
    diagnoses: Joi.string().min(3).max(250).label('diagnoses'),
    notes: Joi.string().min(3).max(250).label('notes'),
  }).required()

  return formSchema.validate(data)
}
const SendSmsModal = (data) => {
  const formSchema = Joi.object({
    message: Joi.string().min(3).max(250).label('Message').required(),
  }).required()

  return formSchema.validate(data)
}

export {
  AddPatientValidation,
  AddPrescriptionValidation,
  AddVitalSignValidation,
  ClinicalNotesValidation,
  SendSmsModal,
}
