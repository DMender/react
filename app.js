//todo: add firebase server functionality, and make delete permission exclusive to poster

var posts = ["This single page app is made in React. All of the comments are stored in localStorage on your computer, not an actual server. They can be cleared like cookies."];
var authors = ["Andy"];
if(!!localStorage.comments) {
    posts = JSON.parse(localStorage.comments);
}
if(!!localStorage.auth) {
    authors = JSON.parse(localStorage.auth);
}

/*/
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
}/**/

/*/
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
}/**/

//
class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: posts, author: authors};
        this.deleteComment = this.deleteComment.bind(this);
    }

    deleteComment() {
        authors.splice(this.props.postid, 1);
        localStorage.auth = JSON.stringify(authors);
        posts.splice(this.props.postid, 1);
        localStorage.comments = JSON.stringify(posts);
        window.location.reload();
    }

    render() {
        return (
            <div id="post"><span class="author">{this.state.author[this.props.postid]}</span><p>{this.state.content[this.props.postid]}</p><span onClick={this.deleteComment} class="delete">Delete</span></div>
        );
    }
}/**/

//
class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <textarea placeholder="Leave a comment." id="comment"></textarea>
                <br/>
                <button id="submit" onClick={function() {
                    authors.push("Potential Employer or Client");
                    localStorage.auth = JSON.stringify(authors);
                    posts.push(document.getElementById("comment").value);
                    localStorage.comments = JSON.stringify(posts);
                    window.location.reload();
                    }}>Submit</button>
            </div>
        );
    }
}/**/

function App() {
    const comments = [];
    for (let i in posts) {
        comments.push(<Comment postid={i}/>);
    }
    return (

        <div>
            {comments}
            <br/>
            <Post/>
        </div>
    );
}
  
const domContainer = document.querySelector('#app_container');
const root = ReactDOM.createRoot(domContainer);
    root.render(<App/>);
