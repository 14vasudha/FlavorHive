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
    stage('Build Application') {
            steps {
                // Build the React application
                sh 'npm run build'
            }
        }
        stage('Deploy to S3') {
            steps {
                // Deploy build files to S3
                withAWS(credentials: 'aws-credentials-id', region: 'ap-south-1') {
                    sh 'aws s3 sync build/ s3://flavorhive/ --delete'
                }
            }
        }
    }
}
