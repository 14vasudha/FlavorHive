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
                withAWS(region: 'ap-south-1', credentials: '644cff5a-41e8-4b0b-a4f6-d433d549f636') {
                    sh 'ls -la build'
                    sh 'aws s3 cp build s3://jenkins-s3-project/ --recursive'
                }
            }
        }
    }
}
