import express from 'express'
import FoodFactsService from '../Service/FoodFactsService.js'

const router = express.Router()

router.get('/:barcode', async(req, res) =>{
    const {barcode} = req.params
    const result = await FoodFactsService(barcode)
    res.json(result)
})

export default router