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
      stage('S3 Upload') {
            steps {
                withAWS(region: 'ap-south-1', credentials: 'aws-credentials-id') {
                    sh 'ls -la build'
                    sh 'aws s3 cp build s3://flavorhive/ --recursive'
                }
            }
        }
}
}
