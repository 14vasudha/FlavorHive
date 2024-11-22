pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID ='aws' // Replace with your Jenkins credentials ID
        AWS_SECRET_ACCESS_KEY ='aws'
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
                aws s3 sync dist/ s3://$S3_BUCKET --delete
                '''
            }
        }
    }
}
