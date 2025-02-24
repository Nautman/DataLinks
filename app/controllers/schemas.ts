import Joi from "joi"

export const createProgram = Joi.object({
	fingerprint: Joi.string().required(),
	name: Joi.string().required()
})

export const readProgram = Joi.object({
	id: Joi.string(),
	name: Joi.string()
}).xor("id", "name")

export const addSubjectToProgram = Joi.object({
	fingerprint: Joi.string().required(),
	id: Joi.string().required(),
	subject: Joi.string().required() 				// ? The id of the subject
})

export const addContributorToProgram = Joi.object({
	fingerprint: Joi.string().required(),
	id: Joi.string().required(),
	contributor: Joi.string().optional() 			// ? The id of the contributor
})

export const createSubject = Joi.object({
	fingerprint: Joi.string().required(),
	name: Joi.string().required(),
	code: Joi.string().required(),
	description: Joi.string().required(),
	color: Joi.string().required(),
	logo: Joi.string().required(),
})

export const readSubject = Joi.object({
	program: Joi.string().optional(),
	archived: Joi.bool().optional()
})

export const updateSubject = Joi.object({
	fingerprint: Joi.string().required(),
	id: Joi.string().required(),
	name: Joi.string(),
	code: Joi.string(),
	description: Joi.string(),
	color: Joi.string(),
	logo: Joi.string().required()
}).or("name", "code", "description", "logo", "color")

export const createGroup = Joi.object({
	fingerprint: Joi.string().required(),
	parentGroup: Joi.string(),
	name: Joi.string().optional(),
	split: Joi.bool(),
	column: Joi.bool(),
	placement: Joi.number().optional()
})

export const updateGroup = Joi.object({
	fingerprint: Joi.string().required(),
	id: Joi.string().required(),
	name: Joi.string().optional(),
	split: Joi.bool(),
	column: Joi.bool(),
	placement: Joi.number()
})

export const findElementWithId = Joi.object({
	id: Joi.string()
})

export const findElementWithIdFingerPrint = Joi.object({
	fingerprint: Joi.string().required(),
	id: Joi.string()
})

export const findGroupChildElementId = Joi.object({
	fingerprint: Joi.string().required(),
	parentGroupId: Joi.string().required(),
	id: Joi.string().required()
})

export const createLink = Joi.object({
	fingerprint: Joi.string().required(),
	parentGroup: Joi.string(),
	displayText: Joi.string(),
	link: Joi.string(),
	placement: Joi.number().optional()
})

export const createText = Joi.object({
	fingerprint: Joi.string().required(),
	parentGroup: Joi.string(),
	title: Joi.string().optional(),
	text: Joi.string(),
	placement: Joi.number().optional()
})

export const createDeadline = Joi.object({
	fingerprint: Joi.string().required(),
	parentGroup: Joi.string(),
	displayText: Joi.string().optional(),
	deadline: Joi.date().required(),
	start: Joi.date().optional(),
	placement: Joi.number().optional()
})

export const updateLink = Joi.object({
	fingerprint: Joi.string().required(),
	parentGroup: Joi.string().required(),
	id: Joi.string().required(),
	displayText: Joi.string().min(0),
	link: Joi.string().min(0)
}).or("displayText", "link")

export const updateText = Joi.object({
	fingerprint: Joi.string().required(),
	parentGroup: Joi.string().required(),
	id: Joi.string().required(),
	title: Joi.string().optional(),
	text: Joi.string()
}).or("title", "text")

export const updateDeadline = Joi.object({
	fingerprint: Joi.string().required(),
	parentGroup: Joi.string().required(),
	id: Joi.string().required(),
	displayText: Joi.string().min(0),
	deadline: Joi.date().min(5),
	start: Joi.date().min(5)
}).or("displayText", "deadline", "start")

export const nameContributor = Joi.object({
	fingerprint: Joi.string().required(),
	name: Joi.string()
})

export const updateContentPosition = Joi.object({
	fingerprint: Joi.string().required(),
	parentGroup: Joi.string().required(),
	id: Joi.string().required(),
	position: Joi.number().required().min(0)
})

export const mergeContributors = Joi.object({
	fingerprint: Joi.string().required(),
	otherFingerprint: Joi.string().required()
})

export const getContributors = Joi.object({
	program: Joi.string().optional()
})