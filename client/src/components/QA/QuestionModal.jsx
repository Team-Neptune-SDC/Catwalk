import React, {useContext, useEffect, useState} from 'react';
import styles from './qa.module.css';
import $ from 'jquery';

import { APIContext } from '../../state/contexts/APIContext';


const QuestionModal = (props) => {
  const { getQuestionsByProductId, addQuestion } = useContext(APIContext);

  const [questionAuth, setQuestionAuth] = useState(true);
  const [nicknameAuth, setNicknameAuth] = useState(true);
  const [emailAuth, setEmailAuth] = useState(true);
  const [submittable, setSubmittable] = useState(true);

  var questionSubmit = true;
  var nicknameSubmit = true;
  var emailSubmit = true;

  var submit = function(data) {
    if (questionSubmit && nicknameSubmit && emailSubmit) {
      setSubmittable(true);
      console.log('submittable');
      addQuestion(data);
      props.closeModal();
    } else {
      setSubmittable(false);
      console.log('not');
    }
  }

  var checkAuth = function(question, nickname, email) {

    if (question.length > 0) {
      setQuestionAuth(true);
      questionSubmit = true;
    } else if (question.length === 0) {
      setQuestionAuth(false);
      questionSubmit = false;
    }

    if (nickname.length > 0) {
      setNicknameAuth(true);
      nicknameSubmit = true;
    } else if (nickname.length === 0) {
      setNicknameAuth(false);
      nicknameSubmit = false;
    }

    if (email.indexOf('@') > 0 && email.indexOf('.com') > 0) {
      setEmailAuth(true);
      emailSubmit = true;
    } else if (email.indexOf('@') < 0 || email.indexOf('.com') < 0) {
      setEmailAuth(false);
      emailSubmit = false;
    }

    var questionData = {
      body: question,
      name: nickname,
      email: email,
      product_id: 17067 //Example, will implement getting pId later
    }

    submit(questionData);
  }

  return(
    <div className={styles.modalcontent}>
      <h2>Ask Your Question</h2>
      <h4>About the {props.productName}</h4>
      <div>
        <div>
          {submittable
            ? null
            : <p className={styles.submiterror}>You must enter the following: </p>
          }
        </div>
        <div className={styles.modaldiv}>
          {questionAuth
            ? <div>
                <span>Your Question: *</span><br/>
                <textarea id='question' className={styles.modalquestion} maxLength='1000' placeholder='Write your question here (1000 character max)'/>
              </div>
            : <div>
                <span className={styles.modaltitlecheck}>Question: *</span><br/>
                <textarea id='question' className={styles.modalquestioncheck} maxLength='1000' placeholder='Write your question here (1000 character max)'/>
              </div>
          }
        </div>
        <div className={styles.modaldiv}>
          {nicknameAuth
            ? <div>
                <span>What is your nickname: * </span><br/>
                <input type='text' id='nickname' className={styles.modaluser} maxLength='60' placeholder='Example: jackson11!'/><br/>
                <span>For privacy reasons, do not use your full name or email address</span>
              </div>
            : <div>
                <span className={styles.modaltitlecheck}>Nickname: * </span><br/>
                <input type='text' id='nickname' className={styles.modalusercheck} maxLength='60' placeholder='Example: jackson11!'/><br/>
                <span>For privacy reasons, do not use your full name or email address</span>
              </div>
          }
        </div>
        <div className={styles.modaldiv}>
          {emailAuth
            ? <div>
                <span>Your email: * </span><br/>
                <input type='text' id='email' className={styles.modaluser} maxLength='60' placeholder='Example: jackson11@gmail.com'/><br/>
                <span>For authentication purposes, you will not be emailed</span>
              </div>
            : <div>
                <span className={styles.modaltitlecheck}>Email: * </span><br/>
                <input type='text' id='email' className={styles.modalusercheck} maxLength='60' placeholder='Example: jackson11@gmail.com'/><br/>
                <span>For authentication purposes, you will not be emailed</span>
              </div>
          }
        </div>
        <div>
          <button className={styles.questionsubmit} onClick={() => {checkAuth($('#question').val(), $('#nickname').val(), $('#email').val())}}>Submit question</button>
        </div>
      </div>
    </div>
  )
};

export default QuestionModal;