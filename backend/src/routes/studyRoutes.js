import express from 'express'
import { getStudyMaterial } from '../controllers/studyController.js'

const router = express.Router()

// GET /study?topic=<topic>&mode=<mode>
router.get('/', getStudyMaterial)

export default router