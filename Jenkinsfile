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
                withAWS(region: 'ap-south-1', credentials: '87f92de7-7d40-4039-aaae-2bb3bfd9cee7') {
                    sh 'ls -la build'
                    sh 'aws s3 cp build s3://jenkins-s3-project/ --recursive'
                }
            }
        }
    }
}
