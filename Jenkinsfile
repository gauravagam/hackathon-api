pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building....'
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh 'rm -rf node_modules'
                    sh 'npm install'
                    sh 'npm audit'
                    sh 'npm test'
                }
            }
        }
        stage('Upload to S3') {
            steps {
                echo 'uploading to s3..'
            }
        }
        stage('Deploy to dev') {
            steps {
                echo 'Deploying to dev env....'
                input('Do you want to proceed?')
            }
        }
        stage('Integration test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy to prod') {
            steps {
                echo 'Deploying to prod env....'
                input('Do you want to proceed?')
            }
        }
    }
}