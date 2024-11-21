pipeline {
    agent any
    environment {
        AWS_REGION = 'ap-south-1' // Replace with your AWS region
        S3_BUCKET = 'flavorhive // Replace with your S3 bucket name
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/14vasudha/FlavorHive.git'  // Replace with your repo URL
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }
        stage('Build React App') {
            steps {
                script {
                    // Build the React app for production
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy to S3') {
            steps {
                script {
                    // Deploy the build folder to S3 using AWS CLI
                    sh '''
                    aws s3 sync ./build/ s3://$S3_BUCKET/ --delete
                    '''
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment to S3 successful!'
        }
        failure {
            echo 'Deployment to S3 failed.'
        }
    }
}
