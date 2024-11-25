pipeline {
    agent any
    triggers {
        githubPush() // Automatically triggers the pipeline on a GitHub push event
    }
    environment {
        AWS_ACCESS_KEY_ID = credentials('my-aws-credentials') // replace with your credentials ID
        AWS_SECRET_ACCESS_KEY = credentials('my-aws-credentials') // replace with your credentials ID
        AWS_DEFAULT_REGION = 'ap-south-1'  // specify your AWS region
        VITE_SUPABASE_URL = credentials('database-id')
        VITE_SUPABASE_KEY = credentials('database-key')
    }
    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Use NodeJS tool configured in Jenkins
                    nodejs('NodeJS') {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy to S3') {
            steps {
              echo 'Deploying to AWS S3'
                sh 'aws s3 sync ./dist/ s3://flavorhive --delete'  // Example S3 deploy
            }
            }
        }
    }

