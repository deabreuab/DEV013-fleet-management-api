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
            message:
                'Antes de empezar, por favor verifica que tu archivo este en la carpeta de Descargas de tu computadora',
        },
        {
            type: 'fuzzypath',
            name: 'path',
            excludePath: (nodePath: any) => nodePath.startsWith('node_modules'),
            excludeFilter: (nodePath: any) => nodePath == '.',
            itemType: 'directory',
            rootPath: '/mnt/c/Users/proja/Downloads',
            message: 'Selecciona el archivo en el que buscaremos los datos',
            suggestOnly: false,
            depthLimit: 5,
        },
        {
            type: 'checkbox',
            name: 'type',
            message: 'Que tabla deseas actualizar?',
            choices: ['Taxis', 'Trayectorias'],
        },
    ]
    const answers = await inquirer.prompt(questions)
    console.log('Answers:', answers)
    // console.log('EL PATH', answers.path)
    // console.log('EL TYPE', answers.type)
    console.log('Procesando...')

    await dataInjection(answers.path, answers.type)
    console.log('Tarea completada.')
}

const dataInjection = async (path: string, type: string) => {
    try {
        if (!path.includes('taxis') && !path.includes('trajectories')) {
            console.log('No se encuentra ninguna carpeta o archivo relacionado con la tabla taxis o trayectorias')
            return
        } else if (path.includes('trajectories') && type[0] !== 'Trayectorias') {
            console.log('No se encuentra ninguna carpeta o archivo relacionado con la tabla trayectorias')
            return
        } else if (path.includes('taxis') && type[0] !== 'Taxis') {
            console.log('No se encuentra ninguna carpeta o archivo relacionado con la tabla taxis')
            return
        }

        // Leer todos los archivos del path
        const files = fs.readdirSync(path)
        const filesTxt = files.filter((file) => file.includes('.txt'))

        if (filesTxt.length === 0) {
            console.log('No se encontraron archivos .txt en la carpeta seleccionada')
            return
        }

        console.log('🚀 ~ dataInjection ~ files:', files)

        // Iterar sobre cada archivo .txt encontrado
        for (const file of filesTxt) {
            // Crear la ruta completa al archivo
            const fullPath = `${path}/${file}`

            // Leer el contenido del archivo
            const fileData = fs.readFileSync(fullPath, 'utf8')

            // Dividir el contenido del archivo por líneas
            const fileDataSplit = fileData.split('\n')

            // Procesar según el tipo especificado ('Taxis' o 'Trayectorias')
            if (type[0] === 'Taxis') {
                // Convertir cada línea en datos de taxi
                const taxiData = fileDataSplit.map((taxi) => {
                    const taxArr = taxi.split(',')
                    return { id: +taxArr[0], plate: taxArr[1].trim() }
                })

                // Filtrar datos válidos
                const cleanData = taxiData.filter((taxi) => taxi.id !== undefined && taxi.plate !== undefined)

                // Guardar datos en Prisma
                const createTaxi = await prisma.taxis.createMany({
                    data: cleanData,
                    skipDuplicates: true,
                })

                console.log('🚀 ~ dataInjection ~ createTaxi:', createTaxi)
            } else if (type[0] === 'Trayectorias') {
                // Convertir cada línea en datos de trayectoria
                const trajectoryData = fileDataSplit.map((trajectory) => {
                    const trajArr = trajectory.split(',')
                    return { taxi_id: +trajArr[0], date: new Date(trajArr[1]), latitude: +trajArr[2], longitude: +trajArr[3] }
                })

                // Filtrar datos válidos
                const cleanData = trajectoryData.filter((trajectory) => trajectory.taxi_id !== undefined && trajectory.date !== undefined && trajectory.latitude !== undefined && trajectory.longitude !== undefined)

                // Guardar datos en Prisma
                const createTrajectory = await prisma.trajectories.createMany({
                    data: cleanData,
                    skipDuplicates: true,
                })

                console.log('🚀 ~ dataInjection ~ createTrajectory:', createTrajectory)
            }
        }
    } catch (error) {
        console.log('Error al leer la carpeta:', error)
    }
}

answers()