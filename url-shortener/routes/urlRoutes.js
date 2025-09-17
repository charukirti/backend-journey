import express from 'express'
import { handleGenerateNewShortURL, handleGetAnalytics, handleRedirectUrl } from '../controllers/urlController.js'

const router = express.Router()

router.post('/', handleGenerateNewShortURL)

router.get('/:shortID', handleRedirectUrl)

router.get('/analytics/:shortID', handleGetAnalytics)

export default router