pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building....'
                sh 'npm --version'
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