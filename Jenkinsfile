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
                withAWS(region: 'ap-south-1', credentials: '66bdd651-d04e-4007-a814-baad0317d763') {
                    sh 'ls -la build'
                    sh 'aws s3 cp build s3://jenkins-react-project/ --recursive'
                }
            }
        }
    }
}
