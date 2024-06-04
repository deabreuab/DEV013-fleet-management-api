/* eslint-disable */
import fs from 'fs'
import inquirer from 'inquirer'
import inquirerfuzzypath from 'inquirer-fuzzy-path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
inquirer.registerPrompt('fuzzypath', inquirerfuzzypath)

const answers = async () => {
    const questions = [
        {
            type: 'confirm',
            name: 'validation',
            message: 'Before you begin, please verify that your file is in the Downloads folder of your computer.',
        },
        {
            type: 'fuzzypath',
            name: 'path',
            excludePath: (nodePath: any) => nodePath.startsWith('node_modules'),
            excludeFilter: (nodePath: any) => nodePath == '.',
            itemType: 'directory',
            rootPath: '/mnt/c/Users/namel/Downloads',
            message: 'Select the file in which to search for the data',
            suggestOnly: false,
            depthLimit: 5,
        },
        {
            type: 'checkbox',
            name: 'type',
            message: 'Which table do you want to update?',
            choices: ['Taxis', 'Trajectories'],
        },
    ]
    const answers = await inquirer.prompt(questions)
    console.log('Answers:', answers)
    console.log('Processing...')
    await dataInjection(answers.path, answers.type)
    console.log('Task completed.')
}

const dataInjection = async (path: string, type: string) => {
    try {
        if (!path.includes('taxis') && !path.includes('trajectories')) {
            console.log('No folder or file related to taxis or trajectories table is found.')
            return
        } else if (path.includes('trajectories') && type[0] !== 'Trajectories') {
            console.log('No folder or file related to the trajectories table is found.')
            return
        } else if (path.includes('taxis') && type[0] !== 'Taxis') {
            console.log('No folder or file related to the taxis table is found.')
            return
        }

        const files = fs.readdirSync(path)
        const filesTxt = files.filter((file) => file.includes('.txt'))
        if (filesTxt.length === 0) {
            console.log('No .txt files found in selected folder')
            return
        }

        for (const file of filesTxt) {
            try {
                const fullPath = `${path}/${file}`
                const fileData = fs.readFileSync(fullPath, 'utf8')
                const fileDataSplit = fileData.split('\n')

                if (type[0] === 'Taxis') {
                    const taxiData = fileDataSplit.map((taxi) => {
                        const taxArr = taxi.split(',')
                        return { id: +taxArr[0], plate: taxArr[1] }
                    })
                    const cleanData = taxiData.filter((taxi) => taxi.id !== undefined && taxi.plate !== undefined)
                    await prisma.taxis.createMany({
                        data: cleanData,
                        skipDuplicates: true,
                    })
                } else if (type[0] === 'Trajectories') {
                    const trajectoryData = fileDataSplit.map((trajectory) => {
                        const trajArr = trajectory.split(',')
                        const date = new Date(trajArr[1])
                        const latitude = parseFloat(trajArr[2])
                        const longitude = parseFloat(trajArr[3])
                        return {
                            taxi_id: +trajArr[0],
                            date: !isNaN(date.getTime()) ? date : null,
                            latitude: !isNaN(latitude) ? latitude : null,
                            longitude: !isNaN(longitude) ? longitude : null,
                        }
                    })

                    const cleanData = trajectoryData.filter(
                        (trajectory) =>
                            trajectory.taxi_id &&
                            trajectory.date !== null &&
                            trajectory.latitude !== null &&
                            trajectory.longitude !== null,
                    )

                    await prisma.trajectories.createMany({
                        data: cleanData,
                        skipDuplicates: true,
                    })
                }
            } catch (fileError) {
                console.log('Error processing file:', file)
            }
        }
    } catch (error) {
        console.log('Error reading the folder:', error)
    }
}

answers()

export { dataInjection, answers }