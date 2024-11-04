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
                withAWS(region: 'ap-south-1', credentials: 'c3d086b9-dbb1-46fc-ad7f-b659f015c92b') {
                    sh 'ls -la build'
                    sh 'aws s3 cp build s3://jenkins-s3-project/ --recursive'
                }
            }
        }
    }
}
