'use strict';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZDm2iVa3I6yL8IDVI9jnsf4ytBvNvWks",
  authDomain: "react-4213a.firebaseapp.com",
  projectId: "react-4213a",
  storageBucket: "react-4213a.appspot.com",
  messagingSenderId: "174354638401",
  appId: "1:174354638401:web:0dfdfd005f3b8f5ecd48c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return (
                <button onClick={() => this.setState({ liked: false })} class="clicked">
                    &#128402;
                </button>
            );
        }

        return (
            <button onClick={() => this.setState({ liked: true })}>
                &#128402;
            </button>
        );
    }
}
class UnlikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return (
                <button onClick={() => this.setState({ liked: false })} class="clicked">
                    &#128403;
                </button>
            );
        }

        return (
            <button onClick={() => this.setState({ liked: true })}>
                &#128403;
            </button>
        );
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: localStorage.getItem("comment")};
    }

    render() {
        return (
            <div id="post">
                <p>{this.state.content}</p>
            </div>
        );
    }
}

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <textarea placeholder="Leave a comment." id="comment"></textarea>
                <br/>
                <button id="submit" onClick={function() {localStorage.setItem("comment", document.getElementById("comment").value); window.location.reload()}}>Submit</button>
            </div>
        );
    }
}/**/

function App() {
    return (
        <div>
            <Comment/>
            <br/>
            <Post/>
        </div>
    );
}
  
const domContainer = document.querySelector('#app_container');
const root = ReactDOM.createRoot(domContainer);
root.render(<App/>);