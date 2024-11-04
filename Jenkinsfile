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
                withAWS(region: 'ap-south-1', credentials: '8ef6045b-2938-4127-ae53-f54fcdba6d15') {
                    sh 'ls -la build'
                    sh 'aws s3 cp build s3://jenkins-s3-project/ --recursive'
                }
            }
        }
    }
}
