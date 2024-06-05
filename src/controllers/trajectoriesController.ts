/* eslint-disable @typescript-eslint/indent */
import type { RequestHandler } from 'express'
import { getATaxi } from '../services/taxisService'
import {
    createNewTrajectory,
    getAllTrajectories,
    getLastTrajectories,
    deleteATrajectory,
    getTrajectoriesReport,
} from '../services/trajectoriesService'
// import XlsxPopulate from 'xlsx-populate'
import XLSX from 'xlsx'
import path from 'path'
import nodemailer from 'nodemailer'

const createTrajectory: RequestHandler = async (req, res) => {
    /*
    #swagger.tags = ['trajectories']
    #swagger.summary = 'Register new trajectory'
    #swagger.description = 'Add new trajectory to Database'
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/trajectory" } } } }
    #swagger.responses[201] = { description: 'Successful operation', schema: { message: 'Successful operation', data: { $ref: "#/components/schemas/trajectoryResult" } } }
    */
    try {
        const { id, latitude, longitude } = req.body
        const taxi = await getATaxi(+id)
        if (!taxi) {
            return res.status(400).json({
                message: 'No taxi with this ID has been found, please check again the submitted data.',
            })
        }
        const result = await createNewTrajectory(+id, +latitude, +longitude)
        res.status(201).json({
            message: 'Successful operation',
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

const getTrajectoriesFilter: RequestHandler = async (req, res) => {
    /*
    #swagger.tags = ['trajectories']
    #swagger.summary = 'Get trajectories'
    #swagger.description = 'Get trajectories with filters from database'
    */
    try {
        const { page = 1, limit = 10, taxiId, date } = req.query
        const skipResults = (+page - 1) * Number(limit)
        const id = taxiId ? +taxiId : undefined
        const result = await getAllTrajectories(skipResults, +limit, id, date as string)
        res.json({
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

const lastTrajectory: RequestHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query
        const skipResults = (+page - 1) * Number(limit)
        const result = await getLastTrajectories(skipResults, +limit)
        res.json({
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

const deleteTrajectory: RequestHandler = async (req, res) => {
    /*
    #swagger.tags = ['trajectories']
    #swagger.summary = 'Delete trajectory'
    #swagger.description = 'Delete trajectory from database'
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/trajectory" } } } }
    #swagger.responses[200] = { description: 'Successful operation', schema: { message: 'Data deleted successfully', data: { $ref: "#/components/schemas/trajectory" } } }
    */
    try {
        const { trajectoryId } = req.params
        const result = await deleteATrajectory(+trajectoryId)
        res.json({
            message: 'Data deleted successfully',
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

const getTrajectoriesExcel: RequestHandler = async (req, res) => {
    try {
        const { taxiId = 0, date = '', email = '' }: { taxiId?: number, date?: string, email?: string } = req.query
        const result = await getTrajectoriesReport(+taxiId, date)
        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.json_to_sheet(result)
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Trajectories')
        const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '')
        const fileName = `trajectoriesReport_${timestamp}.xlsx`
        const filePath = path.join(__dirname, `../storage/reports/${fileName}`)
        XLSX.writeFile(workbook, filePath)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Trajectories Report',
            text: 'Trajectories Report',
            attachments: [
                {
                    filename: fileName,
                    path: filePath,
                },
            ],
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error)
                res.status(500).send('Error sending email')
            } else {
                res.json({
                    message: 'Email sent successfully',
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

export { createTrajectory, deleteTrajectory, getTrajectoriesFilter, lastTrajectory, getTrajectoriesExcel }
