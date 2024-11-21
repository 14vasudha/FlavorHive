pipeline {
    agent any
    tools {
        nodejs "NodeJS"
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/14vasudha/FlavorHive.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
    steps {
        sh 'aws s3 sync build/ s3://flavorhive --delete'
    }
}
    }
}
