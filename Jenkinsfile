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
      stage('Deploy to S3') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials-id']]) {
                    sh 'aws s3 sync build/ s3://flavorhive --delete'
                }
            }
        }
    }
    post {
        success {
            echo 'React app deployed successfully to S3!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
