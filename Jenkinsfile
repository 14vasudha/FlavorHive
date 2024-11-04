pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'ls'
                sh 'cd build'
                sh 'ls'
            }
        }
        stage('S3 Upload') {
            steps {
                withAWS(region: 'ap-south-1', credentials: 'db2ccc5f-b4f5-4ee4-b404-5679d987302b') {
                    sh 'ls -la build'
                    sh 'aws s3 cp build s3://jenkins-s3-project/ --recursive'
                }
            }
        }
    }
}
