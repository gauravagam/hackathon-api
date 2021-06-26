pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building....'
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh 'rm -rf node_modules'
                    sh 'npm install --only=dev'
                    sh 'npm test'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                input('Do you want to proceed?')
            }
        }
    }
}