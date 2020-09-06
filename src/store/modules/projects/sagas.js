import { all, takeLatest } from 'redux-saga/effects'

function checkProjects() {
  console.log('check projects')
}

export default all([takeLatest('ADD_PROJECT', checkProjects)])
