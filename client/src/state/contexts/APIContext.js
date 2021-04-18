import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { REACT_APP_API_KEY } from '../../config/config';
import { ReviewContext } from './ReviewsContext';
import { QuestionContext } from './QuestionsContext';

export const APIContext = createContext({});

const APIProvider = ({ children }) => {
  const { reviews, setReviews, setFeedbackAlreadyGiven } = useContext(ReviewContext);
  const { questions, setQuestions, setFeedbackGiven } = useContext(QuestionContext);


  const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

  // sample endpoints
  // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=17067
  // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=17067

  // sample request to get all products

  /** ****************************************************************************
  *                      API calls for products
  ***************************************************************************** */
  const getAllProducts = async () => {
    try {
      const products = await axios.get(`${baseURL}/products`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
    } catch (err) {
      console.log(err);
    }
  };

  /** ****************************************************************************
  *                      API calls for QAs
  ***************************************************************************** */

   const getQuestionsByProductId = async () => {
    try {
      const allQuestions = await axios.get(`${baseURL}/qa/questions?product_id=17069`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      setQuestions(allQuestions.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const markQuestionAsHelpful = async (questionId) => {
    try {
      await axios.put(`${baseURL}/qa/questions/${reviewId}/helpful`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getQuestionsByProductId();
      setFeedbackGiven(true);
    } catch (err) {
      console.log(err);
    }
  };

  /** ****************************************************************************
  *                      API calls for reviews
  ***************************************************************************** */
  const getReviewsByProductId = async () => {
    try {
      const allReviews = await axios.get(`${baseURL}/reviews?product_id=17069`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      setReviews(allReviews.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const markReviewAsHelpful = async (reviewId) => {
    try {
      await axios.put(`${baseURL}/reviews/${reviewId}/helpful`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getReviewsByProductId();
      setFeedbackGiven(true);
    } catch (err) {
      console.log(err);
    }
  };
  const reportReview = async (reviewId) => {
    try {
      await axios.put(`${baseURL}/reviews/${reviewId}/report`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getReviewsByProductId();
      setFeedbackGiven(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <APIContext.Provider
      value={{
        getAllProducts,
        getReviewsByProductId,
        markReviewAsHelpful,
        reportReview,
        getQuestionsByProductId,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;
