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
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding', 
                    credentialsId: 'b6d800da-a9fb-4d09-81b5-b946d993e45b'
                ]]) {
                    sh 'aws s3 sync build/ s3://flavorhive'
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment to S3 completed successfully!'
        }
        failure {
            echo 'Deployment failed. Check the logs for more details.'
        }
    }
}
