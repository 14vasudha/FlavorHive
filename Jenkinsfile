pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                nodejs ('Node'){
                  echo 'Building app'
                  sh 'npm install'
                }
            }
        } 
    }
}   
