pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id') // Replace with your Jenkins credentials ID
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        S3_BUCKET = 'flavorhive'
    }
    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Use NodeJS tool configured in Jenkins
                    nodejs('NodeJS') {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy to S3') {
            steps {
                sh '''
                aws s3 sync build/ s3://$S3_BUCKET --delete
                '''
            }
        }
    }
}
