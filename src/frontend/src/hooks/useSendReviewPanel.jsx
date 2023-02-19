import React, { useState } from 'react';

const useSendReviewPanel = (reviews) => {
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [reviewsState, setReviewsState] = useState(reviews)
    return {email, setEmail,text, setText,isValidEmail, setIsValidEmail,reviewsState, setReviewsState};
};

export default useSendReviewPanel;