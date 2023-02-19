import axios from 'axios'

async function postUrl(url, onOk, onError) {
    axios
        .post(
            process.env.REACT_APP_URL_SEND_ADDRESS,
            {
                url: url,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        )
        .then((response) => {
            onOk(response, url);
        })
        .catch((error) => {
            onError(error, url);
        });
}

async function postQR(file, onOk, onError) {
    axios
        .post(
            process.env.REACT_APP_QR_SEND_ADDRESS,
            {
                image: file,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        )
        .then((response) => {
            onOk(response, file);
        })
        .catch((error) => {
            onError(error, file);
        });
}

async function postReview(url, email, msg, onOk, onError) {
    axios
        .post(
            process.env.REACT_APP_QR_ADD_REVIEWS,
            {
                url: url,
                email: email,
                review: msg,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        )
        .then((response) => {
            onOk(response, url);
        })
        .catch((error) => {
            onError(error, url);
        });
}

export {postUrl, postQR, postReview}